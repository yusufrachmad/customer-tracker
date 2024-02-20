"use client";
import React from "react";
import { useState } from "react";
import { registerSchema } from "@/app/lib/validation";
import useZodForm from "@/app/hooks/useZodForm";
import Modal from "@/app/components/modal";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/lib/actions/updateProfile";
import type { Profile } from "./page";

const Form = ({ profile }: { profile: Profile[] }) => {
  const router = useRouter();
  const { formState } = useZodForm(registerSchema);
  const [form, setForm] = useState(profile);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (index: number, key: string, value: string) => {
    const formData = [...form];
    if (key in formData[index]) {
      formData[index][key as keyof Profile] = value;
    }
    if (key in formData[index].Apotek) {
      formData[index].Apotek[key as keyof Profile["Apotek"]] = value;
    }
    setForm(formData);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEdit(false);
    setShowModal(false);
    router.refresh();
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex border-b px-20 h-20 justify-between items-center bg-[#ffffff]">
        <h2 className="text-xl font-bold">Profil Apoteker</h2>
        {isEdit ? null : (
          <button
            className="flex bg-[#f0de36] rounded-lg w-32 h-10 px-4 ml-10 hover:bg-yellow-300 justify-center items-center shadow-lg"
            onClick={() => handleEdit()}
          >
            <p className="text-black text-md">Edit</p>
          </button>
        )}
      </div>
      <form action={updateProfile}>
        <div>
          <input type="hidden" name="id_apotek" value={form[0].Apotek.id} />
          <input type="hidden" name="id_apoteker" value={form[0].id} />
        </div>
        {form.map((data, index) => (
          <div
            className="grid grid-cols-2 gap-y-7 gap-5 mx-20 mt-10"
            key={index}
          >
            <div className="col-span-1">
              <h1 className="text-l">Nama Lengkap</h1>
              <input
                type="text"
                className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
                placeholder="Nama Lengkap"
                value={data.nama_apoteker}
                name="nama_apoteker"
                onChange={(e) => {
                  handleChange(index, "nama_apoteker", e.target.value);
                }}
                disabled={!isEdit}
                onError={() => {
                  formState.errors.nama;
                }}
              />
            </div>
            <div className="row-span-5">
              <h1 className="text-l">Alamat Apotek</h1>
              <textarea
                className="w-full h-[15rem] border-2 border-gray-300 rounded-md p-2"
                placeholder="Alamat Apotek"
                value={data.Apotek.alamat}
                disabled={!isEdit}
                name="alamat"
                onChange={(e) => {
                  handleChange(index, "alamat", e.target.value);
                }}
                onError={() => {
                  formState.errors.alamat;
                }}
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">No. STRA</h1>
              <input
                type="text"
                className="w-96  h-12 border-2 border-gray-300 rounded-md p-2"
                placeholder="No. STRA"
                value={data.stra}
                disabled={!isEdit}
                name="stra"
                onChange={(e) => {
                  handleChange(index, "stra", e.target.value);
                }}
                onError={() => {
                  formState.errors.stra;
                }}
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">No. SIPA</h1>
              <input
                type="text"
                placeholder="No. SIPA"
                className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
                value={data.sipa}
                disabled={!isEdit}
                name="sipa"
                onChange={(e) => {
                  handleChange(index, "sipa", e.target.value);
                }}
                onError={() => {
                  formState.errors.sipa;
                }}
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">Email</h1>
              <input
                type="text"
                placeholder="Email"
                className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
                value={data.email}
                disabled={!isEdit}
                name="email"
                onChange={(e) => {
                  handleChange(index, "email", e.target.value);
                }}
                onError={() => {
                  formState.errors.email;
                }}
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">Nama Apotek</h1>
              <input
                type="text"
                placeholder="Nama Apotek"
                className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
                value={data.Apotek.nama_apotek}
                disabled={!isEdit}
                name="nama_apotek"
                onChange={(e) => {
                  handleChange(index, "nama_apotek", e.target.value);
                }}
                onError={() => {
                  formState.errors.nama_apotek;
                }}
              />
            </div>
          </div>
        ))}
        {formState.errors.root?.message ? (
          <div className="flex mt-4 pl-6">
            <p className="text-red-500 text-sm font-semibold ">
              {formState.errors?.root?.message}
            </p>
          </div>
        ) : null}
        {isEdit ? (
          <div className="flex ml-auto mr-20 mt-20 justify-end">
            <button
              className="bg-yellow-400 text-black rounded-md p-3 px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300"
              onClick={handleModalOpen}
            >
              Simpan
            </button>
          </div>
        ) : null}
        {showModal && (
          <Modal onClose={handleModalClose} onConfirm={handleSubmit}>
            <p>Apakah anda yakin untuk update data?</p>
          </Modal>
        )}
      </form>
    </>
  );
};

export default Form;
