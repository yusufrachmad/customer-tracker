"use client";
import type { Pasien } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import FileUpload from "@/app/components/file_upload";
import { addKunjungan } from "@/app/lib/actions/addKunjungan";
import toast from "react-hot-toast";

export default function KunjunganForm({ pasien }: { pasien: Pasien }) {
  const [toggle, setToggle] = useState(true);
  const [status, setStatus] = useState("aktif");
  const toggleClass = " transform translate-x-7";
  const [blob, setBlob] = useState("");

  const handleData = (data: string) => {
    setBlob(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = new FormData(e.currentTarget);
      data.append("id_pasien", pasien.id);
      data.append("foto_penyerahan", blob);
      data.append("status", status);

      const { success, message } = await addKunjungan(data);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    } catch (error: any) {
      console.error(error?.message);
      toast.error("Gagal mendaftar");
    }
  };

  return (
    <>
      <div className="flex flex-col border-b px-20 h-20 justify-center bg-white">
        <h1 className="text-xl font-bold">{pasien.nama_pasien}</h1>
        <h2 className="text-sm">{pasien.nik}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-7 gap-5 mx-20 mt-10">
          <div className="col-span-1">
            <h1 className="text-l">Tanggal Kunjungan</h1>
            <input
              type="date"
              className="w-64 h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              name="tgl_kunjungan"
            />
          </div>
          <div className="col-span-1">
            <h1 className="text-l">Tanggal Resep</h1>
            <input
              type="date"
              className="w-64 h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              name="tgl_resep"
            />
          </div>
          <div className="col-span-1 pr-12">
            <h1 className="text-l">Alamat Faskes</h1>
            <input
              type="text"
              placeholder="Nama Faskes, Alamat Lengkap"
              className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              name="alamat_faskes"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <FileUpload onData={handleData} />
          </div>
          <div className="col-span-1 pr-12">
            <h1 className="text-l">Nama Dokter</h1>
            <input
              type="text"
              placeholder="Nama Lengkap dan Gelar"
              className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              name="nama_dokter"
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
          <button
            className="bg-[#eddd4b] text-black rounded-md p-3 px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300"
            type="submit"
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
}
