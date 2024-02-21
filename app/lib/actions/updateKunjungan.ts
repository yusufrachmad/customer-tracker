"use server";
import { authServerSession } from "../auth";
import { User } from "@/app/page";
import prisma from "../db";

export const updateKunjungan = async (formData: FormData) => {
  const session = (await authServerSession()) as User;

  const id_kunjungan = formData.get("id_kunjungan");
  const id_pasien = formData.get("id_pasien");
  const tgl_kunjungan = formData.get("tgl_kunjungan");
  const tgl_resep = formData.get("tgl_resep");
  const alamat_faskes = formData.get("alamat_faskes");
  const nama_dokter = formData.get("nama_dokter");
  const foto_penyerahan = formData.get("file_penyerahan");
  const status = formData.get("status");

  try {
    const res = await prisma?.kunjungan.findFirst({
      where: {
        id: id_kunjungan as string,
      },
    });

    const statusPasien = await prisma?.pasien.findFirst({
      where: {
        id: id_pasien as string,
      },
    });

    await prisma?.$transaction(async (tx) => {
      await tx.riwayatChangesKunjungan.create({
        data: {
          id: Math.random().toString(24).substring(7),
          id_kunjungan: id_kunjungan as string,
          id_user: session.id as string,
          tgl_perubahan: new Date(),
          tgl_kunjungan: res?.tgl_kunjungan ?? new Date(),
          tgl_resep: res?.tgl_resep ?? new Date(),
          alamat_faskes: res?.alamat_faskes ?? "",
          nama_dokter: res?.nama_dokter ?? "",
          file_penyerahan: res?.file_penyerahan ?? "",
          status: statusPasien?.status ?? "",
        },
      });

      await tx.kunjungan.update({
        where: {
          id: id_kunjungan as string,
        },
        data: {
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
          tgl_nonaktif: status === "nonaktif" ? new Date() : null,
        },
      });
    });

    return {
      success: true,
      message: "Berhasil diupdate",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
