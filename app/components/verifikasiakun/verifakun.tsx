"use client";
import { verifikasiAkun } from "@/app/lib/actions/verifikasiAkun";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Modal from "../modal";

type Apoteker = {
  id: string;
  id_user: string;
  nama_apoteker: string;
};

export default function VerifAkun({ apoteker }: { apoteker: Apoteker }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { status } = await verifikasiAkun(apoteker.id_user);

      if (status === 200) {
        toast.success("Apoteker berhasil diverifikasi");
      } else {
        toast.error("Gagal verifikasi apoteker");
      }
    } catch (error: any) {
      console.error(error?.message);
    }
    router.refresh();
  };

  return (
    <div>
      <div className="flex justify-center px-5">
        <button
          className="flex w-5 justify-center bg-[#ffcc00] hover:cursor-pointer hover:bg-yellow-300"
          onClick={handleModalOpen}
        >
          <Check size={20} color="#0d1282" />
        </button>
        {showModal && (
          <Modal onClose={handleModalClose} onConfirm={handleSubmit}>
            <p>Apakah anda yakin untuk verifikasi {apoteker.nama_apoteker}?</p>
          </Modal>
        )}
      </div>
    </div>
  );
}
