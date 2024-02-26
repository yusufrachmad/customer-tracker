"use client";
import { ChevronRight } from "lucide-react";
import SearchDiv from "@/app/components/search_div";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Kunjungan } from "@/app/riwayat/[id]/page";

export default function RiwayatIndex() {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]) as any[];
  const [searchClicked, setSearchClicked] = useState(false);
  let kunjunganTerakhir = "";

  const handleClick = (id: string) => {
    router.push(`/riwayat/${id}`);
  };

  const handleDaftar = () => {
    router.push("/pendaftaran/daftar");
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        search: e.currentTarget?.search.value,
        radio: e.currentTarget?.inlineradio.value,
      };

      const res = await fetch("/api/riwayat", {
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

  kunjunganTerakhir = handleDate(searchResult[0]?.tgl_kunjungan);

  return (
    <>
      <form onSubmit={handleSearch}>
        <SearchDiv />
      </form>
      <div className="flex flex-col h-[28rem] relative mx-20 mt-4">
        <table className="table-auto border-separate border-spacing-0 text-sm">
          <thead className="bg-white">
            <tr>
              <th className="border-l border-b border-t border-slate-400 py-3 rounded-l-lg">
                Nama Lengkap
              </th>
              <th className="border-t border-b border-slate-400 py-3">NIK</th>
              <th className="border-t border-b border-slate-400 py-3">
                Alamat
              </th>
              <th className="border-t border-b border-slate-400 py-3">
                Nama Ibu
              </th>
              <th className="border-t border-b border-slate-400 py-3">
                Kunjungan Terakhir
              </th>
              <th className="border-r border-t border-b border-slate-400 py-3 rounded-r-lg">
                Aksi
              </th>
            </tr>
          </thead>
          {searchResult.length !== 0 && (
            <tbody className="text-center">
              {searchResult.map((pasien: Kunjungan) => {
                return (
                  <tr key={pasien.Pasien.id}>
                    <td className="border-b border-[#eef0ff] py-3">
                      {pasien.Pasien.nama_pasien}
                    </td>
                    <td className="border-b border-[#eef0ff] py-3">
                      {pasien.Pasien.nik}
                    </td>
                    <td className="text-left border-b border-[#eef0ff] py-3 w-36">
                      {pasien.Pasien.alamat_ktp}
                    </td>
                    <td className="border-b border-[#eef0ff] py-3">
                      {pasien.Pasien.nama_ibu}
                    </td>
                    <td className="border-b border-[#eef0ff] py-3">
                      {kunjunganTerakhir}
                    </td>
                    <td className="border-b border-[#eef0ff] py-3 hover:cursor-pointer">
                      <div className="flex justify-center px-5">
                        <div
                          className="flex w-5 justify-center bg-[#ffcc00] rounded-lg hover:bg-yellow-300"
                          onClick={() => handleClick(pasien.Pasien.id)}
                        >
                          <ChevronRight size={20} color="#0d1282" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {searchClicked && searchResult.length === 0 && (
          <div className="flex flex-col my-[7rem] justify-center items-center">
            <div className=" flex text-center text-[#bababa] text-2xl font-sans">
              Data Tidak Ditemukan, <br />
              Silakan Daftarkan Pasien Baru
            </div>
            <div className="flex mt-24">
              <button
                className="flex bg-[#f0de36] rounded-lg w-24 h-12 hover:bg-yellow-300 justify-center items-center shadow-xl"
                onClick={handleDaftar}
              >
                <p className="text-black text-md">Daftar</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
