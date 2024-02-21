import ClientLayout from "../components/client_layout";
import PelaporanApotekIndex from "../components/pelaporanapotek";
import prisma from "@/app/lib/db";
import type { PasienNonAktif } from "./pasien/page";
import { getPasienNonAktif } from "../lib/functions";
import { getKunjunganPerTahun } from "../lib/functions";

export type KunjunganPerBulan = {
  id_apotek: string;
  nama_apotek: string;
  month: string;
  count: number;
};

export type KunjunganPerTahun = {
  month: string;
  jumlah_kunjungan: number;
};

const getKunjunganPerBulan = async () => {
  try {
    const res =
      await prisma.$queryRaw`SELECT id_apotek, nama_apotek, to_char(tgl_kunjungan, 'MM') AS month, COUNT(*) AS count
    FROM public."Kunjungan" JOIN public."Apotek" ON public."Kunjungan".id_apotek = public."Apotek".id
    WHERE to_char(tgl_kunjungan, 'MM') = to_char(current_date, 'MM') AND to_char(tgl_kunjungan, 'YYYY') = to_char(current_date, 'YYYY')
    GROUP BY id_apotek, nama_apotek, month;`;

    return res;
  } catch (error) {
    console.error("Error fetching kunjungan per bulan:", error);
    return null;
  }
};

export default async function PelaporanApotek() {
  const kunjunganPerBulan =
    (await getKunjunganPerBulan()) as KunjunganPerBulan[];
  const kunjunganPerTahun =
    (await getKunjunganPerTahun()) as KunjunganPerTahun[];
  const pasienNonAktif = (await getPasienNonAktif()) as PasienNonAktif[];
  if (kunjunganPerTahun.length === 0) {
    kunjunganPerTahun.push({ month: "", jumlah_kunjungan: 0 });
  }

  return (
    <>
      <ClientLayout>
        <div className="flex flex-col border-b px-20 h-20 justify-center bg-white">
          <h1 className="text-xl font-bold">Pelaporan</h1>
        </div>
        <PelaporanApotekIndex
          perMonth={kunjunganPerBulan}
          perTahun={kunjunganPerTahun}
          pasienNonAktif={pasienNonAktif}
        />
      </ClientLayout>
    </>
  );
}
