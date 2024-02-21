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

    let fetchResult;

    if (session?.role === "dinkes") {
      fetchResult = await prisma?.pasien.findMany({
        where: {
          [radio]: {
            contains: search as string,
          },
        },
      });
    } else if (session?.role === "apoteker") {
      fetchResult = await prisma?.pasien.findMany({
        include: {
          Apotek: {
            include: {
              Apoteker: true,
            },
          },
        },
        where: {
          Apotek: {
            id: apotekId?.id_apotek as string,
          },
          [radio]: {
            contains: search as string,
          },
        },
      });
    }

    return NextResponse.json({
      data: fetchResult,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message,
    });
  }
};
