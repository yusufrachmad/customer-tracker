"use client";
import SearchBar from "../search_bar";
import { useState, useEffect } from "react";
import type { Apoteker } from "@/app/verifikasiakun/page";
import VerifAkun from "./verifakun";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../pagination";
import { sliceData } from "../riwayat/id";
import PageHeader from "../page_header";

export default function VerifikasiAkunIndex({
  apoteker,
}: {
  apoteker: Apoteker[];
}) {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([] as any);
  const [searchClicked, setSearchClicked] = useState(false);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [slicedData, setSlicedData] = useState([] as Apoteker[]);
  const totalPage = Math.ceil(apoteker.length / 3);

  useEffect(() => {
    router.push(`?page=${currentPage}`, {
      scroll: false,
    });

    const dataPerPage = sliceData(
      apoteker,
      (currentPage - 1) * 3,
      currentPage * 3
    );

    setSlicedData(dataPerPage);
  }, [currentPage]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        search: e.currentTarget?.search.value,
      };

      const res = await fetch("/api/apoteker", {
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
      <PageHeader title="Verifikasi Akun Apoteker" />
      <div className="flex flex-col mx-20 mt-2">
        <form onSubmit={handleSearch}>
          <SearchBar />
        </form>
        <div className="overflow-y-auto h-[40rem] w-full">
          <table className="table-auto border-separate border-spacing-0 text-sm mt-2 w-full">
            <thead className="bg-white">
              <tr>
                <th className="border-l border-b border-t border-slate-400 py-3 rounded-l-lg">
                  Nama Lengkap
                </th>
                <th className="border-t border-b border-slate-400 py-3">
                  STRA
                </th>
                <th className="border-t border-b border-slate-400 py-3">
                  SIPA
                </th>
                <th className="border-t border-b border-slate-400 py-3">
                  Data Apotek
                </th>
                <th className="border-t border-b border-slate-400 py-3">
                  Email
                </th>
                <th className="border-r border-t border-b border-slate-400 py-3 rounded-r-lg">
                  Verifikasi
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {slicedData.length !== 0 &&
                slicedData.map((apoteker) => (
                  <tr key={apoteker.id}>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {apoteker.nama_apoteker}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {apoteker.stra}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24 w-36">
                      {apoteker.sipa}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-[7.5rem] text-left w-52">
                      Apotek: {apoteker.Apotek.nama_apotek}
                      <br />
                      Alamat: {apoteker.Apotek.alamat}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      {apoteker.User.email}
                    </td>
                    <td className="bg-white border-b-4 border-[#f6f6f6] pt-3 pb-24">
                      <VerifAkun apoteker={apoteker} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {slicedData.length !== 0 && (
          <Pagination currentPage={currentPage} total={totalPage} />
        )}
        {apoteker.length === 0 && (
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
    </>
  );
}
