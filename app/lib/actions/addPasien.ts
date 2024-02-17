"use server";
import type { Pasien } from "@prisma/client";

export const addPatient = async (formData: FormData) => {
  const nama_pasien = formData.get("nama_pasien");
  const nik = formData.get("nik");
  const nama_ibu = formData.get("nama_ibu");
  const tempat_lahir = formData.get("tempat_lahir");
  const tanggal_lahir = formData.get("tanggal_lahir");
  const alamat = formData.get("alamat");
  const id = Math.random().toString(36).substring(7);

  try {
    await prisma?.pasien.create({
      data: {
        id: id as string,
        nama_pasien: nama_pasien as string,
        nik: nik as string,
        nama_ibu: nama_ibu as string,
        tempat_lahir: tempat_lahir as string,
        tanggal_lahir: new Date(tanggal_lahir as string),
        alamat_ktp: alamat as string,
      } as Pasien,
    });

    return {
      data: id,
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
