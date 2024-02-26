import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export const POST = async (Request: NextRequest) => {
  const req = await Request.json();
  const { search } = req;

  try {
    const res = await prisma?.pasien.findMany({
      where: {
        status: "nonaktif",
        nama_pasien: {
          contains: search as string,
        },
      },
      select: {
        nama_pasien: true,
        nik: true,
        tgl_nonaktif: true,
        Apotek: {
          select: {
            nama_apotek: true,
          },
        },
      },
      orderBy: {
        tgl_nonaktif: "desc",
      },
    });

    return NextResponse.json({
      data: res,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message,
    });
  }
};
