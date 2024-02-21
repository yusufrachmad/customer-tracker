"use server";
import prisma from "@/app/lib/db";

export const verifikasiAkun = async (id: string) => {
  try {
    await prisma?.user.update({
      where: {
        id: id,
      },
      data: {
        status: "terverifikasi",
      },
    });

    return { status: 200 };
  } catch (error: any) {
    console.error(error?.message);
    return { status: 500, data: null };
  }
};
