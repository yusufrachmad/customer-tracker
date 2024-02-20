"use client";

import { addPatient } from "@/app/lib/actions/addPasien";
import useZodForm from "@/app/hooks/useZodForm";
import { patientRegisterSchema } from "@/app/lib/validation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Apotek } from "@prisma/client";

export default function DaftarClient({
  apotek,
  user,
}: {
  apotek: Apotek[];
  user: string;
}) {
  const { formState } = useZodForm(patientRegisterSchema);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const { data, success, message } = await addPatient(formData);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);

        router.push(`/pendaftaran/${data}`);
      }
    } catch (error: any) {
      console.error(error?.message);
      toast.error("Gagal mendaftar");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {user === "dinkes" ? (
          <div className="col-span-1">
            <h1 className="text-l">Apotek</h1>
            <select
              name="apotek_id"
              className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
            >
              {apotek.map((apotek) => (
                <option key={apotek.id} value={apotek.id}>
                  {apotek.nama_apotek}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
      {formState.errors.root?.message ? (
        <div className="flex mt-4 pl-6">
          <p className="text-red-500 text-sm font-semibold ">
            {formState.errors?.root?.message}
          </p>
        </div>
      ) : null}
      <div className="flex ml-auto mr-20 mt-12 justify-end">
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
