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
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
          <input type="hidden" name="id_apotek" value={profile[0].Apotek.id} />
          <input type="hidden" name="id_apoteker" value={profile[0].id} />
        </div>
        {profile.map((data, index) => (
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
                defaultValue={data.nama_apoteker}
                name="nama_apoteker"
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
                defaultValue={data.Apotek.alamat}
                disabled={!isEdit}
                name="alamat"
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
                defaultValue={data.stra}
                disabled={!isEdit}
                name="stra"
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
                defaultValue={data.sipa}
                disabled={!isEdit}
                name="sipa"
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
                defaultValue={data.email}
                disabled={!isEdit}
                name="email"
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
                defaultValue={data.Apotek.nama_apotek}
                disabled={!isEdit}
                name="nama_apotek"
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
