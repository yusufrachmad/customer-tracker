"use client";

import SearchBar from "../../search_bar";
import { useState } from "react";
import type { PasienNonAktif } from "@/app/pelaporanapotek/pasien/page";

export default function PasienNonAktifIndex({
  pasienNonAktif,
}: {
  pasienNonAktif: PasienNonAktif[];
}) {
  const [searchResult, setSearchResult] = useState([] as any);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        search: e.currentTarget?.search.value,
      };

      const res = await fetch("/api/pasien/nonaktif", {
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
    <>
      <div className="flex flex-col mx-20">
        <form onSubmit={handleSearch}>
          <SearchBar />
        </form>
        <div className="overflow-y-auto h-[40rem]">
          <table className="table-auto border-separate border-spacing-0 text-xs mt-2 w-full">
            <thead className="bg-white">
              <tr>
                <th className="border-l border-b border-t border-slate-400 py-3 rounded-l-lg">
                  Nama Lengkap
                </th>
                <th className="border-t border-b border-slate-400 py-3">NIK</th>
                <th className="border-t border-b border-slate-400 py-3">
                  Tanggal Nonaktif
                </th>
                <th className="border-r border-t border-b border-slate-400 py-3 rounded-r-lg px-3">
                  Nama Apotek
                </th>
              </tr>
            </thead>
            <tbody>
              {searchClicked &&
                searchResult.length !== 0 &&
                searchResult.map((pasien: PasienNonAktif, index: number) => (
                  <tr className="text-center" key={index}>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {pasien.nama_pasien}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {pasien.nik}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {handleDate(String(pasien.tgl_nonaktif))}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {pasien.Apotek?.nama_apotek}
                    </td>
                  </tr>
                ))}

              {!searchClicked &&
                pasienNonAktif.length !== 0 &&
                pasienNonAktif.map((pasien: PasienNonAktif, index: number) => (
                  <tr className="text-center" key={index}>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {pasien.nama_pasien}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {pasien.nik}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {handleDate(String(pasien.tgl_nonaktif))}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {pasien.Apotek?.nama_apotek}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {pasienNonAktif.length === 0 && (
            <div className="flex flex-col my-[7rem] justify-center items-center">
              <div className=" flex text-center text-[#bababa] text-2xl font-sans">
                Tidak Ada Data
              </div>
            </div>
          )}
          {searchClicked && searchResult.length === 0 && (
            <div className="flex flex-col my-[7rem] justify-center items-center">
              <div className=" flex text-center text-[#bababa] text-2xl font-sans">
                Data Tidak Ditemukan
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
