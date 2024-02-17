import { NextRequest, NextResponse } from "next/server";

export const POST = async (Request: NextRequest) => {
  try {
    const req = await Request.json();
    const { search, radio } = req;

    let fetchResult;

    if (radio === "nama") {
      fetchResult = await prisma?.pasien.findMany({
        where: {
          nama_pasien: {
            contains: search as string,
          },
        },
      });
    } else if (radio === "nik") {
      fetchResult = await prisma?.pasien.findMany({
        where: {
          nik: {
            contains: search as string,
          },
        },
      });
    } else if (radio === "alamat") {
      fetchResult = await prisma?.pasien.findMany({
        where: {
          alamat_ktp: {
            contains: search as string,
          },
        },
      });
    } else if (radio === "nama_ibu") {
      fetchResult = await prisma?.pasien.findMany({
        where: {
          nama_ibu: {
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
  try {
    const req = await Request.json();
    const { nama_pasien, nik, nama_ibu, tempat_lahir, tanggal_lahir, alamat } =
      req;
    const id = Math.random().toString(36).substring(7);

    await prisma?.pasien.create({
      data: {
        id: id as string,
        nama_pasien: nama_pasien as string,
        nik: nik as string,
        nama_ibu: nama_ibu as string,
        tempat_lahir: tempat_lahir as string,
        tanggal_lahir: new Date(tanggal_lahir as string),
        alamat_ktp: alamat as string,
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
