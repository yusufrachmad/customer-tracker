import ClientLayout from "@/app/components/client_layout";
import RiwayatKunjungan from "@/app/components/riwayat/id";
import type { Pasien, Apoteker, Apotek } from "@prisma/client";

export type Kunjungan = {
  id: string;
  id_pasien: string;
  id_apoteker: string;
  id_apotek: string;
  tgl_kunjungan: Date;
  tgl_resep: Date;
  nama_dokter: string;
  alamat_faskes: string;
  status_keaktifan: string;
  file_penyerahan: string;
  Apoteker: Apoteker;
  Apotek: Apotek;
  Pasien: Pasien;
};

const getKunjungan = async (id: string) => {
  let res = await prisma?.kunjungan.findMany({
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

export default async function Page({ params }: { params: { id: string } }) {
  const kunjungan = (await getKunjungan(params.id)) as Kunjungan[];

  return (
    <ClientLayout>
      <RiwayatKunjungan kunjungan={kunjungan} />
    </ClientLayout>
  );
}
