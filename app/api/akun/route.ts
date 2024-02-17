import { registerSchema } from "@/app/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await registerSchema.safeParseAsync(data);

    if (!result.success) {
      return NextResponse.json({
        error: result.error.errors[0].message,
      });
    }

    const { nama, stra, sipa, alamat, nama_apotek, email } = result.data;

    await prisma?.$transaction(async (tx) => {
      await tx.apoteker.update({
        where: {
          id: data.id,
        },
        data: {
          nama_apoteker: nama,
          stra: stra,
          sipa: sipa,
        },
      });

      await tx.apotek.update({
        where: {
          id: data.apotekId_apotek,
        },
        data: {
          nama_apotek: nama_apotek,
          alamat: alamat,
        },
      });

      await tx.user.update({
        where: {
          id: data.id_user,
        },
        data: {
          email: email,
        },
      });
    });

    return NextResponse.json({
      message: "User created successfully.",
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message,
    });
  }
}
