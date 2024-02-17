"use client";
import type { Pasien } from "@prisma/client";
import { useState } from "react";

export default function KunjunganForm({ pasien }: { pasien: Pasien }) {
  const [toggle, setToggle] = useState(true);
  const [status, setStatus] = useState("aktif");
  const toggleClass = " transform translate-x-7";
  return (
    <>
      <div className="flex flex-col border-b px-20 h-20 justify-center bg-white">
        <h1 className="text-xl font-bold">{pasien.nama_pasien}</h1>
        <h2 className="text-sm">{pasien.nik}</h2>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-y-7 gap-5 mx-20 mt-10">
          <div className="col-span-1">
            <h1 className="text-l">Tanggal Kunjungan</h1>
            <input
              type="date"
              className="w-64 h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
            />
          </div>
          <div className="col-span-1">
            <h1 className="text-l">Tanggal Resep</h1>
            <input
              type="date"
              className="w-64 h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
            />
          </div>
          <div className="col-span-1 pr-12">
            <h1 className="text-l">Alamat Faskes</h1>
            <input
              type="text"
              placeholder="Nama Faskes, Alamat Lengkap"
              className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <div>
              <h1 className="text-l">Unggah Foto Penyerahan</h1>
              <input
                type="file"
                className="w-64 border-2 border-gray-300 rounded-md p-2"
              />
              <button className="bg-purple-400 text-white rounded-md p-3 mt-3 ml-2 border-1 border-gray-300 shadow-xl hover:bg-purple-500">
                Unggah
              </button>
            </div>
          </div>
          <div className="col-span-1 pr-12">
            <h1 className="text-l">Nama Dokter</h1>
            <input
              type="text"
              placeholder="Nama Lengkap dan Gelar"
              className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
            />
          </div>
          <div className="col-span-1 pt-4">
            <h1 className="text-l">Status Keaktifan</h1>
            <div className="flex items-center mt-4">
              <p className="text-md">Aktif</p>
              <div
                className="md:w-16 md:h-8 w-14 h-8 flex items-center bg-[#d9d9d9] rounded-full p-1 cursor-pointer outline mx-4"
                onClick={() => {
                  setToggle(!toggle);
                  setStatus(toggle ? "aktif" : "nonaktif");
                }}
              >
                <div
                  className={
                    "bg-[#ffcc00] outline md:w-7 md:h-7 h-6 w-6 rounded-full shadow-md transform duration-300 ease-in-out " +
                    (toggle ? null : toggleClass)
                  }
                ></div>
              </div>
              <p className="text-md">Nonaktif</p>
            </div>
          </div>
        </div>
        <div className="flex ml-auto mr-20 mt-32 justify-end">
          <button className="bg-yellow-400 text-black rounded-md p-3 px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300">
            Simpan
          </button>
        </div>
      </form>
    </>
  );
}
