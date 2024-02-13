import { registerSchema } from "@/app/lib/validation";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await registerSchema.safeParseAsync(data);

    if (!result.success) {
      return NextResponse.json({
        error: result.error.errors[0].message,
      });
    }

    const { email, password, nama, stra, sipa } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json({
        error: "User already exist with this email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await bcrypt.hash(randomUUID(), 5);

    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          id: userId,
          email,
          nama: nama,
          password: passwordHash,
          role: "apoteker",
          status: "pending",
        },
      });

      await tx.apoteker.create({
        data: {
          id: "AP" + userId,
          id_user: userId,
          stra: stra,
          sipa: sipa,
          nama_apoteker: nama,
        },
      });
    });

    return NextResponse.json({
      message: "User created successfully.",
    });
  } catch (error) {
    return NextResponse.json({
      error: "System error. Please contact support",
    });
  }
}
