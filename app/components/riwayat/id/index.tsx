"use client";
import PageHeader from "../../page_header";
import SearchBar from "../../search_bar";
import { Search, Download, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Kunjungan } from "@/app/riwayat/[id]/page";
import { useEffect, useState } from "react";
import Pagination from "../../pagination";

export const sliceData = (data: any, start: number, end: number) => {
  const slicedData = data.slice(start, end);

  return slicedData;
};

export default function RiwayatKunjungan({
  kunjungan,
}: {
  kunjungan: Kunjungan[];
}) {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([] as any);
  const [searchClicked, setSearchClicked] = useState(false);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [slicedData, setSlicedData] = useState([] as Kunjungan[]);
  const totalPage = Math.ceil(kunjungan.length / 2);

  useEffect(() => {
    router.push(`?page=${currentPage}`, {
      scroll: false,
    });

    const dataPerPage = sliceData(
      kunjungan,
      (currentPage - 1) * 2,
      currentPage * 2
    );

    setSlicedData(dataPerPage);
  }, [currentPage]);

  const handleDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate.replace(/-/g, "/");
  };

  const handleClick = (id: string) => {
    router.push(`/riwayat/${kunjungan[0].Pasien.id}/` + id);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        search: e.currentTarget?.search.value,
      };

      const res = await fetch("/api/pasien/" + kunjungan[0].Pasien.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      setSearchResult(json.data);
      setSearchClicked(true);
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <>
      <PageHeader title={kunjungan[0].Pasien.nama_pasien} />
      <div className="flex flex-col mx-20 mt-2">
        <form onSubmit={handleSearch}>
          <SearchBar />
        </form>
        <div className="overflow-y-auto h-[40rem] w-full">
          <table className="table-auto border-separate border-spacing-0 text-xs mt-2 w-full">
            <thead className="bg-white">
              <tr>
                <th className="border-l border-b border-t border-slate-400 py-3 rounded-l-lg">
                  Nama Lengkap
                </th>
                <th className="border-t border-b border-slate-400 py-3">NIK</th>
                <th className="border-t border-b border-slate-400 py-3">
                  Kunjungan Terakhir
                </th>
                <th className="border-t border-b border-slate-400 py-3">
                  Status Keaktifan
                </th>
                <th className="border-t border-b border-slate-400 py-3">
                  Foto Penyerahan
                </th>
                <th className="border-r border-t border-b border-slate-400 py-3 rounded-r-lg px-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {slicedData.map((kunj) => (
                <tr key={kunj.id}>
                  <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-40">
                    {kunj.Pasien.nama_pasien}
                  </td>
                  <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-40">
                    {kunj.Pasien.nik}
                  </td>
                  <td className="bg-white text-center border-b-4 border-[#f6f6f6] pt-3 pb-40">
                    {handleDate(String(kunj.tgl_kunjungan))}
                  </td>
                  <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-40 text-left w-52">
                    Dokter: {kunj.nama_dokter}
                    <br />
                    Alamat Faskes: {kunj.alamat_faskes}
                    <br />
                    Tanggal Resep: {handleDate(String(kunj.tgl_resep))}
                    <br />
                    <br />
                    Status: {kunj.Pasien.status?.charAt(0).toUpperCase() ?? ""}
                    {kunj.Pasien.status?.slice(1) ?? ""}
                    <br />
                    <i>Apotek: {kunj.Apotek.nama_apotek}</i>
                    <br />
                    <i>Apoteker: {kunj.Apoteker.nama_apoteker}</i>
                    <br />
                  </td>
                  <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-40">
                    <div className="flex justify-center py-3">
                      <Search color="#0d1282" size={18} className="mr-2" />
                      <Download color="#d71313" size={18} className="ml-2" />
                    </div>
                  </td>
                  <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-40">
                    <div className="flex justify-center">
                      <div
                        className="flex w-5 justify-center bg-[#ffcc00] rounded-md hover:cursor-pointer hover:bg-yellow-300"
                        onClick={() => handleClick(kunj.id)}
                      >
                        <ChevronRight size={20} color="#0d1282" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={totalPage} currentPage={currentPage} />
      </div>
    </>
  );
}
