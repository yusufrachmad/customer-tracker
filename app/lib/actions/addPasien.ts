"use server";
import type { Pasien } from "@prisma/client";
import prisma from "../db";
import { authServerSession } from "../auth";
import type { User } from "@/app/page";

const getPatient = async (nik: string) => {
  const res = await prisma?.pasien.findFirst({
    where: {
      nik: nik,
      AND: {
        status: "aktif",
      },
    },
    include: {
      Apotek: true,
    },
  });

  return res!;
};

export const addPatient = async (formData: FormData) => {
  const session = (await authServerSession()) as User;
  let id_apotek;

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
    )?.id_apotek;
  }

  const nama_pasien = formData.get("nama_pasien");
  const nik = formData.get("nik");
  const nama_ibu = formData.get("nama_ibu");
  const tempat_lahir = formData.get("tempat_lahir");
  const tanggal_lahir = formData.get("tanggal_lahir");
  const alamat = formData.get("alamat");
  const id = Math.random().toString(36).substring(7);
  const checkPatient = await getPatient(nik as string);
  if (checkPatient !== null) {
    return {
      success: false,
      message: `Pasien sudah terdaftar di ${checkPatient.Apotek.nama_apotek} `,
    };
  } else {
    try {
      const res = await prisma?.pasien.create({
        data: {
          id: id as string,
          nama_pasien: nama_pasien as string,
          nik: nik as string,
          nama_ibu: nama_ibu as string,
          tempat_lahir: tempat_lahir as string,
          tanggal_lahir: new Date(tanggal_lahir as string),
          alamat_ktp: alamat as string,
          id_apotek: id_apotek as string,
          status: "aktif",
        } as Pasien,
      });

      if (!res) {
        return {
          success: false,
          message: "Gagal mendaftar",
        };
      } else {
        return {
          data: id,
          success: true,
          message: "Berhasil mendaftar",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: "Gagal mendaftar",
      };
    }
  }
};
