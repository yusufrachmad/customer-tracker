import { NextRequest, NextResponse } from "next/server";
import { authServerSession } from "@/app/lib/auth";
import type { User } from "@/app/page";
import prisma from "@/app/lib/db";

export const POST = async (Request: NextRequest) => {
  const session = (await authServerSession()) as User;

  try {
    const req = await Request.json();
    const { search, radio } = req;
    let apotekId = await prisma?.apoteker.findFirst({
      where: {
        id_user: session.id,
      },
      select: {
        id_apotek: true,
      },
    });

    let fetchResult = [] as any[];

    if (session?.role === "dinkes" || session?.role === "apoteker") {
      const whereCondition = {
        Apotek: {
          id: apotekId?.id_apotek as string,
        },
        Pasien: {
          [radio]: {
            contains: search as string,
          },
        },
      };

      fetchResult = await prisma?.kunjungan.findMany({
        include: {
          Apotek: true,
          Apoteker: true,
          Pasien: true,
        },
        where:
          session?.role === "dinkes" ? whereCondition.Pasien : whereCondition,
        orderBy: {
          tgl_kunjungan: "desc",
        },
      });
    }

    if (fetchResult.length === 0) {
      return NextResponse.json({
        data: fetchResult,
        success: false,
      });
    } else {
      return NextResponse.json({
        data: fetchResult,
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message,
    });
  }
};
