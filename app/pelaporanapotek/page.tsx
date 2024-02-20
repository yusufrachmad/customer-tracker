import ClientLayout from "../components/client_layout";
import PelaporanApotekIndex from "../components/pelaporanapotek";
import prisma from "@/app/lib/db";
import type { PasienNonAktif } from "./pasien/page";
import { getPasienNonAktif } from "./pasien/page";

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

export const getKunjunganPerTahun = async () => {
  const monthNumberToName = (monthNumber: any) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Juni",
      "Juli",
      "Agt",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return months[parseInt(monthNumber) - 1] || "";
  };

  const convertMonthNames = (data: any) => {
    return data.map((entry: typeof data) => {
      const [month] = entry.year_month.split("-");
      return {
        month: monthNumberToName(month),
        jumlah_kunjungan: entry.total_count.toNumber(),
      };
    });
  };

  try {
    const res = await prisma.$queryRaw`WITH MonthlyCounts AS (
        SELECT 
            id_apotek, 
            nama_apotek, 
            to_char(tgl_kunjungan, 'MM-YYYY') AS year_month, 
            COUNT(*) AS count
        FROM public."Kunjungan" 
        JOIN public."Apotek" ON public."Kunjungan".id_apotek = public."Apotek".id
        WHERE to_char(tgl_kunjungan, 'YYYY') = to_char(current_date, 'YYYY')
        GROUP BY id_apotek, nama_apotek, year_month
    )
    SELECT DISTINCT
        year_month,
        SUM(count) OVER (PARTITION BY year_month) AS total_count
    FROM MonthlyCounts;`;

    const convertedData = convertMonthNames(res);

    return convertedData;
  } catch (error) {
    console.error("Error fetching kunjungan per tahun:", error);
    return null;
  }
};

export default async function PelaporanApotek() {
  const kunjunganPerBulan =
    (await getKunjunganPerBulan()) as KunjunganPerBulan[];
  const kunjunganPerTahun =
    (await getKunjunganPerTahun()) as KunjunganPerTahun[];
  const pasienNonAktif = (await getPasienNonAktif()) as PasienNonAktif[];

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
