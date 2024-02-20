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

export const ADD = async (Request: NextRequest) => {
  const session = (await authServerSession()) as User;
  try {
    const req = await Request.json();
    const { nama_pasien, nik, nama_ibu, tempat_lahir, tanggal_lahir, alamat } =
      req;
    const id = Math.random().toString(36).substring(7);
    const res = await prisma?.apoteker.findFirst({
      where: {
        id_user: session.id,
      },
      select: {
        id: true,
      },
    });

    await prisma?.pasien.create({
      data: {
        id: id as string,
        nama_pasien: nama_pasien as string,
        nik: nik as string,
        nama_ibu: nama_ibu as string,
        tempat_lahir: tempat_lahir as string,
        tanggal_lahir: new Date(tanggal_lahir as string),
        alamat_ktp: alamat as string,
        id_apotek: res?.id as string,
        status: "aktif",
      },
    });

    return NextResponse.json({
      data: id,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.message,
    });
  }
};
