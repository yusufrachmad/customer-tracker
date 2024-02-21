"use server";
import { authServerSession } from "../auth";
import { User } from "@/app/page";
import prisma from "../db";

export const addKunjungan = async (formData: FormData) => {
  const session = (await authServerSession()) as User;
  let id_apotek: string;
  let id_apoteker: string;

  if (session.role === "dinkes") {
    id_apotek = formData.get("id_apotek") as string;
  } else if (session.role === "apoteker") {
    id_apotek = (
      await prisma?.apoteker.findFirst({
        where: {
          id_user: session.id,
        },
        select: {
          id_apotek: true,
        },
      })
    )?.id_apotek as string;

    id_apoteker = (
      await prisma?.apoteker.findFirst({
        where: {
          id_user: session.id,
        },
        select: {
          id: true,
        },
      })
    )?.id as string;
  }

  const id_pasien = formData.get("id_pasien");
  const tgl_kunjungan = formData.get("tgl_kunjungan");
  const tgl_resep = formData.get("tgl_resep");
  const alamat_faskes = formData.get("alamat_faskes");
  const nama_dokter = formData.get("nama_dokter");
  const foto_penyerahan = formData.get("foto_penyerahan");
  const status = formData.get("status");

  try {
    await prisma?.$transaction(async (tx) => {
      await tx.kunjungan.create({
        data: {
          id: Math.random().toString(24).substring(7),
          id_pasien: id_pasien as string,
          id_apotek: id_apotek as string,
          id_apoteker: id_apoteker as string,
          tgl_kunjungan: new Date(tgl_kunjungan as string),
          tgl_resep: new Date(tgl_resep as string),
          alamat_faskes: alamat_faskes as string,
          nama_dokter: nama_dokter as string,
          file_penyerahan: foto_penyerahan as string,
        },
      });

      await tx.pasien.update({
        where: {
          id: id_pasien as string,
        },
        data: {
          status: status as string,
        },
      });
    });

    return {
      success: true,
      message: "Berhasil mendaftar",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
