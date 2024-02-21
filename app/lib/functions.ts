import prisma from "@/app/lib/db";

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

export const getPasienNonAktif = async () => {
  try {
    const res = await prisma?.pasien.findMany({
      where: {
        status: "nonaktif",
      },
      select: {
        nama_pasien: true,
        nik: true,
        tgl_nonaktif: true,
        Apotek: {
          select: {
            nama_apotek: true,
          },
        },
      },
      orderBy: {
        tgl_nonaktif: "desc",
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching pasien non aktif:", error);
    return;
  }
};

export const sliceData = (data: any, start: number, end: number) => {
  const slicedData = data.slice(start, end);

  return slicedData;
};
