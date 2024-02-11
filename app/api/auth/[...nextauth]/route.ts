import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { decode, encode } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { loginSchema } from "@/app/lib/validation";
import bcrypt from "bcrypt";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";

interface Context {
  params: { nextauth: string[] };
}

export const authOptionsWrapper = (request: NextRequest, context: Context) => {
  const { params } = context;
  const prisma = new PrismaClient();
  const isCredentialsCallback =
    params?.nextauth?.includes("callback") &&
    params.nextauth.includes("credentials") &&
    request.method === "POST";

  return [
    request,
    context,
    {
      adapter: PrismaAdapter(prisma),
      providers: [
        CredentialsProvider({
          credentials: {
            email: { label: "email", type: "text" },
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
                throw new Error("User account does not exist");
              }

              const passwordsMatch = await bcrypt.compare(
                password,
                user?.password!
              );

              if (!passwordsMatch) {
                throw new Error("Password is not correct");
              }

              return user as any;
            } catch (error) {
              if (
                error instanceof PrismaClientInitializationError ||
                error instanceof PrismaClientKnownRequestError
              ) {
                throw new Error("System error. Please contact support");
              }

              throw error;
            }
          },
        }),
      ],
      callbacks: {
        async signIn({ user }) {
          if (isCredentialsCallback) {
            if (user) {
              const sessionToken = randomUUID();
              const sessionExpiry = new Date(
                Date.now() + 60 * 60 * 24 * 30 * 1000
              );

              await prisma.session.create({
                data: {
                  id_session: "SE" + sessionToken,
                  token: sessionToken,
                  id_user: user.id_user,
                  expires: sessionExpiry,
                },
              });
              cookies().set("next-auth.session-token", sessionToken, {
                expires: sessionExpiry,
              });
            }
          }
          return true;
        },
        async redirect({ baseUrl }) {
          return baseUrl;
        },
      },
      secret: process.env.NEXTAUTH_SECRET,
      jwt: {
        maxAge: 60 * 60 * 24 * 30,
        encode: async (arg) => {
          if (isCredentialsCallback) {
            const cookie = cookies().get("next-auth.session-token");

            if (cookie) return cookie.value;
            return "";
          }

          return encode(arg);
        },
        decode: async (arg) => {
          if (isCredentialsCallback) {
            return null;
          }
          return decode(arg);
        },
      },
      debug: process.env.NODE_ENV === "development",
      events: {
        async signOut({ session }) {
          const { sessionToken = "" } = session as unknown as {
            sessionToken?: string;
          };

          if (sessionToken) {
            await prisma.session.deleteMany({
              where: {
                token: sessionToken,
              },
            });
          }
        },
      },
    } as AuthOptions,
  ] as const;
};

async function handler(request: NextRequest, context: Context) {
  console.log(context);
  return NextAuth(...authOptionsWrapper(request, context));
}

export { handler as GET, handler as POST };
