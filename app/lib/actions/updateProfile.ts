"use server";
import { authServerSession } from "../auth";
import type { User } from "@prisma/client";
import prisma from "../db";

export const updateProfile = async (formData: FormData) => {
  const session = (await authServerSession()) as User | null;
  const nama = formData.get("nama_apoteker");
  const stra = formData.get("stra");
  const sipa = formData.get("sipa");
  const alamat = formData.get("alamat");
  const nama_apotek = formData.get("nama_apotek");
  const email = formData.get("email");
  const id_apotek = formData.get("id_apotek");
  const id_apoteker = formData.get("id_apoteker");

  await prisma?.$transaction(async (tx) => {
    await tx.apoteker.update({
      where: {
        id: id_apoteker as string,
      },
      data: {
        nama_apoteker: nama as string,
        stra: stra as string,
        sipa: sipa as string,
      },
    });

    await tx.apotek.update({
      where: {
        id: id_apotek as string,
      },
      data: {
        nama_apotek: nama_apotek as string,
        alamat: alamat as string,
      },
    });

    await tx.user.update({
      where: {
        id: session?.id,
      },
      data: {
        email: email as string,
      },
    });
  });

  return {
    success: true,
  };
};
