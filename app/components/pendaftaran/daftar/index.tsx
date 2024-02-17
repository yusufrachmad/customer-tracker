"use client";

import { useState } from "react";
import { addPatient } from "@/app/lib/actions/addPasien";
import useZodForm from "@/app/hooks/useZodForm";
import { patientRegisterSchema } from "@/app/lib/validation";
import { useRouter } from "next/navigation";

export default function DaftarClient() {
  const { formState } = useZodForm(patientRegisterSchema);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const { data, success } = await addPatient(formData);

      if (!success) {
        throw new Error("Gagal menambahkan data");
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);

        router.push(`/pendaftaran/${data}`);
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <div className="flex ml-5 border bg-green-400 justify-center items-center p-4 rounded-lg shadow-lg animate-pulse">
          <p className="text-white text-md font-semibold">
            Data berhasil disimpan
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-y-7 gap-5 mx-20 mt-10">
        <div className="col-span-1">
          <h1 className="text-l">Nama Lengkap</h1>
          <input
            type="text"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
            placeholder="Nama Lengkap"
            name="nama_pasien"
            onError={() => {
              formState.errors.nama_pasien;
            }}
          />
        </div>
        <div className="row-span-5">
          <h1 className="text-l">Alamat Lengkap</h1>
          <textarea
            className="w-full h-[15rem] border-2 border-gray-300 rounded-md p-2"
            placeholder="Alamat Lengkap"
            name="alamat"
            onError={() => {
              formState.errors.alamat;
            }}
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">NIK</h1>
          <input
            type="text"
            placeholder="NIK"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
            name="nik"
            onError={() => {
              formState.errors.nik;
            }}
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">Nama Ibu</h1>
          <input
            type="text"
            className="w-96  h-12 border-2 border-gray-300 rounded-md p-2"
            placeholder="Nama Ibu Kandung"
            name="nama_ibu"
            onError={() => {
              formState.errors.nama_ibu;
            }}
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">Tempat Lahir</h1>
          <input
            type="text"
            placeholder="Tempat Lahir"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
            name="tempat_lahir"
            onError={() => {
              formState.errors.tempat_lahir;
            }}
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">Tanggal Lahir</h1>
          <input
            type="date"
            placeholder="TT-BB-HH"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
            name="tanggal_lahir"
            onError={() => {
              formState.errors.tanggal_lahir;
            }}
          />
        </div>
      </div>
      {formState.errors.root?.message ? (
        <div className="flex mt-4 pl-6">
          <p className="text-red-500 text-sm font-semibold ">
            {formState.errors?.root?.message}
          </p>
        </div>
      ) : null}
      <div className="flex ml-auto mr-20 mt-20 justify-end">
        <button
          className="bg-yellow-400 text-black rounded-md p-3 px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300"
          type="submit"
        >
          Selanjutnya
        </button>
      </div>
    </form>
  );
}
