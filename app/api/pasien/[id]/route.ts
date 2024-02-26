import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export const POST = async (
  Request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const req = await Request.json();
  const { search } = req;

  try {
    const res = await prisma?.kunjungan.findMany({
      where: {
        id_pasien: params.id,
        OR: [
          {
            nama_dokter: {
              contains: search as string,
            },
          },
        ],
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
