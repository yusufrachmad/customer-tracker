import ClientLayout from "@/app/components/client_layout";
import DetailKunjungan from "@/app/components/riwayat/id/id-kunjungan";
import type { Kunjungan } from "@/app/riwayat/[id]/page";
import type { User } from "@prisma/client";
import prisma from "@/app/lib/db";

export type Riwayat = {
  id: string;
  id_kunjungan: string;
  id_user: string;
  tgl_perubahan: Date;
  tgl_kunjungan: Date;
  tgl_resep: Date;
  alamat_faskes: string;
  nama_dokter: string;
  file_penyerahan: string;
  status: string;
  User: User;
};

const getKunjungan = async (id: string) => {
  const res = await prisma?.kunjungan.findFirst({
    where: {
      id_pasien: id,
    },
    include: {
      Apotek: true,
      Apoteker: true,
      Pasien: true,
    },
  });

  return res!;
};

const getRiwayat = async (id: string) => {
  const res = await prisma.riwayatChangesKunjungan.findMany({
    where: {
      id_kunjungan: id,
    },
    orderBy: {
      tgl_perubahan: "desc",
    },
    include: {
      User: true,
    },
  });

  return res!;
};

export default async function Page({ params }: { params: { id: string } }) {
  const kunjungan = (await getKunjungan(params.id)) as Kunjungan;
  const riwayat = (await getRiwayat(kunjungan.id)) as Riwayat[];

  return (
    <ClientLayout>
      <DetailKunjungan kunjungan={kunjungan} riwayat={riwayat} />
    </ClientLayout>
  );
}
