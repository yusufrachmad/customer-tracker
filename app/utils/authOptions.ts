import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/db";
import { loginSchema } from "@/app/lib/validation";
import bcrypt from "bcrypt";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const result = await loginSchema.safeParseAsync(credentials);

          if (!result.success) {
            throw new Error(result.error.errors[0].message);
          }

          const { email, password } = result.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            throw new Error("Pengguna tidak ditemukan");
          }

          if (user.role === "apoteker" && user.status !== "terverifikasi") {
            throw new Error("not-verified");
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user?.password!
          );

          if (!passwordsMatch) {
            throw new Error("Kata sandi salah");
          }

          return user as any;
        } catch (error) {
          if (
            error instanceof PrismaClientInitializationError ||
            error instanceof PrismaClientKnownRequestError
          ) {
            throw new Error("Sistem galat. Silahkan hubungi admin.");
          }

          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const sessionToken = randomUUID();
        const sessionExpiry = new Date(Date.now() + 60 * 60 * 24 * 30);
        token.id = user.id;
        token.role = user.role;
        token.nama = user.nama;
        token.email = user.email;
        token.sessionToken = sessionToken;

        await prisma.session.create({
          data: {
            id: "SE" + new Date().getTime(),
            token: sessionToken,
            id_user: user.id,
            expires: sessionExpiry,
          },
        });

        cookies().set("next-auth.session-token", sessionToken, {
          expires: sessionExpiry,
        });
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user = {
        id: token.id,
        role: token.role,
        nama: token.nama,
        email: token.email,
        sessionToken: token.sessionToken,
      };
      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  events: {
    async signOut({ token }: any) {
      if (token) {
        await prisma.session.deleteMany({
          where: {
            token: token.sessionToken,
          },
        });
        cookies().delete("next-auth.session-token");
      }
    },
  },
};
