"use client";
import type { Kunjungan } from "@/app/riwayat/[id]/page";
import { useEffect, useState } from "react";
import { updateKunjungan } from "@/app/lib/actions/updateKunjungan";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/modal";
import type { Riwayat } from "@/app/riwayat/[id]/[kunjungan]/page";

export default function DetailKunjungan({
  kunjungan,
  riwayat,
}: {
  kunjungan: Kunjungan;
  riwayat: Riwayat;
}) {
  if (riwayat === null) {
    riwayat = {
      id: "" as string,
      id_kunjungan: kunjungan.id as string,
      id_user: "" as string,
      tgl_perubahan: kunjungan.tgl_kunjungan as Date,
      tgl_kunjungan: kunjungan.tgl_kunjungan as Date,
      tgl_resep: kunjungan.tgl_resep as Date,
      alamat_faskes: kunjungan.alamat_faskes as string,
      nama_dokter: kunjungan.nama_dokter as string,
      file_penyerahan: kunjungan.file_penyerahan as string,
      status: kunjungan.Pasien.status as string,
      User: {
        nama: "" as string,
      },
    };
  }

  const router = useRouter();
  const active = kunjungan.Pasien.status === "aktif";
  const [toggle, setToggle] = useState(active);
  const [status, setStatus] = useState("aktif");
  const [isEditting, setIsEditting] = useState(false);
  const toggleClass = " transform translate-x-7";
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setIsEditting(!isEditting);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      data.append("status", status);
      data.append("id_kunjungan", kunjungan.id);
      data.append("id_pasien", kunjungan.Pasien.id);

      const { success, message } = await updateKunjungan(data);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    } catch (error: any) {
      console.error(error?.message);
      toast.error("Gagal mengubah data");
    }
    setIsEditting(false);
    setShowModal(false);
    router.refresh();
  };

  const handleConfirm = () => {};

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
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

  const handleTimestamp = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate.replace(/-/g, "/");
  };

  return (
    <>
      <div className="flex flex-col border-b px-20 h-20 justify-center bg-white">
        <h1 className="text-xl font-bold">{kunjungan.Pasien.nama_pasien}</h1>
        <h2 className="text-sm">{kunjungan.Pasien.nik}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="id_pasien" value={kunjungan.Pasien.id} />
          <input type="hidden" name="id_kunjungan" value={kunjungan.id} />
        </div>
        <div className="grid grid-cols-2 gap-y-7 gap-5 mx-20 mt-10">
          <div className="col-span-1">
            <h1 className="text-l">Tanggal Kunjungan</h1>
            <input
              type="date"
              className="w-64 h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              defaultValue={
                new Date(kunjungan.tgl_kunjungan).toISOString().split("T")[0]
              }
              disabled={!isEditting}
              name="tgl_kunjungan"
              required
            />
            {String(kunjungan.tgl_kunjungan) !==
              String(riwayat.tgl_kunjungan) && (
              <p className="text-sm">
                <i>
                  <s>{handleDate(String(riwayat.tgl_kunjungan))}</s> diedit oleh{" "}
                  {riwayat.User.nama} pada{" "}
                  {handleTimestamp(String(riwayat.tgl_perubahan))}
                </i>
              </p>
            )}
          </div>
          <div className="col-span-1">
            <h1 className="text-l">Tanggal Resep</h1>
            <input
              type="date"
              className="w-64 h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              defaultValue={
                new Date(kunjungan.tgl_resep).toISOString().split("T")[0]
              }
              disabled={!isEditting}
              name="tgl_resep"
              required
            />
            {String(kunjungan.tgl_resep) !== String(riwayat.tgl_resep) && (
              <p className="text-sm">
                <i>
                  <s>{handleDate(String(riwayat.tgl_resep))}</s> diedit oleh{" "}
                  {riwayat.User.nama} pada{" "}
                  {handleTimestamp(String(riwayat.tgl_perubahan))}
                </i>
              </p>
            )}
          </div>
          <div className="col-span-1 pr-12">
            <h1 className="text-l">Alamat Faskes</h1>
            <input
              type="text"
              placeholder="Nama Faskes, Alamat Lengkap"
              className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              defaultValue={kunjungan.alamat_faskes}
              disabled={!isEditting}
              name="alamat_faskes"
              required
            />
            {kunjungan.alamat_faskes !== riwayat.alamat_faskes && (
              <p className="text-sm">
                <i>
                  <s>{riwayat.alamat_faskes}</s> diedit oleh {riwayat.User.nama}{" "}
                  pada {handleTimestamp(String(riwayat.tgl_perubahan))}
                </i>
              </p>
            )}
          </div>
          <div className="col-span-1 row-span-2">
            <div>
              <h1 className="text-l">Unggah Foto Penyerahan</h1>
              <input
                type="text"
                className="w-64  h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
                defaultValue={kunjungan.file_penyerahan}
                disabled={!isEditting}
                name="file_penyerahan"
              />
              {kunjungan.file_penyerahan !== riwayat.file_penyerahan && (
                <p className="text-sm">
                  <i>
                    <s>{riwayat.file_penyerahan}</s> diedit oleh{" "}
                    {riwayat.User.nama} pada{" "}
                    {handleTimestamp(String(riwayat.tgl_perubahan))}
                  </i>
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1 pr-12">
            <h1 className="text-l">Nama Dokter</h1>
            <input
              type="text"
              placeholder="Nama Lengkap dan Gelar"
              className="w-full h-12 border-2 border-gray-300 rounded-md p-2 mt-3"
              defaultValue={kunjungan.nama_dokter}
              disabled={!isEditting}
              name="nama_dokter"
              required
            />
            {kunjungan.nama_dokter !== riwayat.nama_dokter && (
              <p className="text-sm">
                <i>
                  <s>{riwayat.nama_dokter}</s> diedit oleh {riwayat.User.nama}{" "}
                  pada {handleTimestamp(String(riwayat.tgl_perubahan))}
                </i>
              </p>
            )}
          </div>
          <div className="col-span-1 pt-4">
            <h1 className="text-l">Status Keaktifan</h1>
            <div className="flex items-center mt-4">
              <p className="text-md">Aktif</p>
              <div
                className="md:w-16 md:h-8 w-14 h-8 flex items-center bg-[#d9d9d9] rounded-full p-1 cursor-pointer outline mx-4"
                onClick={() => {
                  if (isEditting) {
                    setToggle(!toggle);
                    setStatus(toggle ? "nonaktif" : "aktif");
                  }
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
            {kunjungan.Pasien.status !== riwayat.status && (
              <p className="text-sm">
                <i>
                  <s>{riwayat.status}</s> diedit oleh {riwayat.User.nama} pada{" "}
                  {handleTimestamp(String(riwayat.tgl_perubahan))}
                </i>
              </p>
            )}
          </div>
        </div>
        <div className="flex ml-auto mr-20 mt-32 justify-end">
          {isEditting ? (
            <div
              className="bg-[#eddd4b] text-black rounded-md px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300 flex flex-col items-center hover:cursor-pointer"
              onClick={handleModalOpen}
            >
              <span>Simpan</span>
              <span>Perubahan</span>
            </div>
          ) : (
            <div
              className="bg-red-600 text-white rounded-md p-3 px-16 border-1 border-gray-300 shadow-xl hover:bg-red-500 hover:cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </div>
          )}
        </div>
        {showModal && (
          <Modal onClose={handleModalClose} onConfirm={handleConfirm}>
            Apakah Anda yakin ingin menyimpan perubahan?
          </Modal>
        )}
      </form>
    </>
  );
}
