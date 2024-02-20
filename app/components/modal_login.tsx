import React from "react";
import Backdrop from "./backdrop";

type ModalProps = {
  onClose: any;
  onConfirm: any;
};

export default function ModalLogin({ onClose, onConfirm }: ModalProps) {
  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[26rem] max-w-3xl mx-auto my-6">
          {/*content*/}
          <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pt-6 pl-6 pr-6">
            {/*body*/}
            <div className="relative p-6 flex-auto text-center font-bold">
              Mohon maaf, akun Anda belum diverifikasi oleh Dinas Kesehatan
              Kabupaten Sleman silakan hubungi petugas terkait untuk meminta
              verifikasi
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center p-4">
              <button
                className="bg-[#0d1282] text-white active:bg-navy-400 font-bold text-sm px-12 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                style={{ transition: "all .15s ease" }}
                onClick={onConfirm}
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
