import Link from "next/link";
import type { PasienNonAktif } from "@/app/pelaporanapotek/pasien/page";
import Chart from "./chart";
import type {
  KunjunganPerBulan,
  KunjunganPerTahun,
} from "@/app/pelaporanapotek/page";

export const getBulanIni = () => {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const bulanIni = bulan[new Date().getMonth()];
  return bulanIni;
};

export default function PelaporanApotekIndex({
  perMonth,
  perTahun,
  pasienNonAktif,
}: {
  perMonth: KunjunganPerBulan[];
  perTahun: KunjunganPerTahun[];
  pasienNonAktif: PasienNonAktif[];
}) {
  const bulanIni = getBulanIni();
  const handleDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate.replace(/-/g, "/");
  };

  return (
    <div className="flex flex-col mx-20 mt-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 border-2 rounded-md p-5">
          <div className="flex flex-col">
            <h1 className="text-l text-center mb-5">
              Jumlah Kunjungan per Apotek Bulan {bulanIni}{" "}
              {new Date().getFullYear()}
            </h1>
            <div className="overflow-auto h-52">
              <div className="flex justify-center mb-5">
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="border-2 p-2">Nama Apotek</th>
                      <th className="border-2 p-2">Jumlah Kunjungan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perMonth.length !== 0 ? (
                      perMonth.map((item, index) => (
                        <tr key={index}>
                          <td className="border-2 p-2">{item.nama_apotek}</td>
                          <td className="border-2 p-2 text-center">
                            {Number(item.count)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="border-2 p-2 text-center">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 border-2 p-3 rounded-md">
          <Link href="/pelaporanapotek/pasien">
            <div className="flex flex-col bg-[#ffe7e7] text-left h-full p-1 hover:cursor-pointer">
              <p>Pasien Dinonaktifkan</p>
              {pasienNonAktif.length === 0 ? (
                <p className="mt-8 text-[#cf3e0e]">
                  Tidak ada pasien yang dinonaktifkan
                </p>
              ) : (
                <>
                  <p className="text-[#cf3e0e] mt-8">
                    {pasienNonAktif[0].Apotek?.nama_apotek}
                  </p>
                  <p className="text-[#cf3e0e] ">
                    NIK: {pasienNonAktif[0].nik}
                  </p>
                  <p className="text-[#cf3e0e] ">
                    Nama: {pasienNonAktif[0].nama_pasien}
                  </p>
                  <p className="text-[#cf3e0e] ">
                    Tanggal Nonaktif:{" "}
                    {handleDate(String(pasienNonAktif[0].tgl_nonaktif))}
                  </p>
                </>
              )}
            </div>
          </Link>
        </div>
        <div className="col-span-2 border-2 p-6 rounded-md h-80">
          <div className="flex flex-col">
            <h1 className="text-l text-left mb-4 ml-6">
              Jumlah Kunjungan Kabupaten Sleman
            </h1>
            <div className="flex justify-center">
              <Chart perTahun={perTahun} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
