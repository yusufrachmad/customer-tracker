import Image from "next/image";
import Header from "./components/header";
import { authServerSession } from "@/app/lib/auth";
import LoginButton from "./components/beranda/login_button";
import { Text, Files, KeyRound, Building2 } from "lucide-react";
import Circle from "./components/beranda/circle";
import Kunjungan from "./components/beranda/kunjungan";
import { getKunjunganPerTahun } from "@/app/lib/functions";
import prisma from "@/app/lib/db";

export type User = {
  id: string;
  nama: string;
  role: string;
};

const getKunjunganPerBulan = async ({ userId }: { userId: string }) => {
  try {
    const res =
      await prisma.$queryRaw`SELECT public."Kunjungan".id_apotek, nama_apotek, to_char(tgl_kunjungan, 'MM') AS month, COUNT(*) AS count
    FROM public."Kunjungan" JOIN public."Apotek" ON public."Kunjungan".id_apotek = public."Apotek".id JOIN public."Apoteker" ON public."Apotek".id = public."Apoteker".id_apotek
    WHERE to_char(tgl_kunjungan, 'MM') = to_char(current_date, 'MM') AND to_char(tgl_kunjungan, 'YYYY') = to_char(current_date, 'YYYY') AND public."Apoteker".id_user = ${userId}
    GROUP BY public."Kunjungan".id_apotek, nama_apotek, month;`;

    return res;
  } catch (error) {
    console.error("Error fetching kunjungan per bulan:", error);
    return null;
  }
};

export default async function Home() {
  const logo = require("@/public/psychopharm.png").default;
  const session = (await authServerSession()) as User;
  let kunjunganBulanIni =
    session?.role === "dinkes"
      ? await getKunjunganPerTahun()
      : await getKunjunganPerBulan({
          userId: session.id,
        });
  if (kunjunganBulanIni.length === 0) {
    kunjunganBulanIni = [{ jumlah_kunjungan: 0 }];
  }

  return (
    <>
      <Header />
      <div className="flex justify-end items-center pt-10 mr-32">
        <p className="text-md font-bold">Selamat Datang, {session.nama}!</p>
        <LoginButton />
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="flex flex-col">
          <Image src={logo} alt="Psychopharm" width={120} height={120} />
        </div>
        <div
          className={`flex flex-col grid ${
            session?.role === "dinkes" ? "xl:grid-cols-4" : "xl:grid-cols-3"
          } lg:grid-cols-2 gap-x-52 gap-y-10 mt-24`}
        >
          <Circle
            title="Pendaftaran"
            icon={<Text size={80} strokeWidth={0.75} />}
            colors={["bg-[#f0de36]", "hover:bg-yellow-300", "bg-[#b3bbf5]"]}
          />
          <Circle
            title="Riwayat"
            icon={<Files size={80} strokeWidth={1.5} color="white" />}
            colors={["bg-[#0d1282]", "hover:bg-blue-800"]}
          />

          {session?.role === "dinkes" && (
            <Circle
              title="Pelaporan"
              icon={<Building2 size={80} strokeWidth={1.5} color="white" />}
              colors={["bg-[#d71313]", "hover:bg-red-700"]}
            />
          )}
          <Circle
            title={session?.role === "apoteker" ? "Akun" : "Verifikasi Akun"}
            icon={<KeyRound size={80} strokeWidth={1.5} />}
            colors={["bg-[#d9d9d9]", "hover:bg-gray-200"]}
          />
        </div>
      </div>
      <Kunjungan
        jumlahKunjungan={kunjunganBulanIni.reverse()[0].jumlah_kunjungan}
      />
    </>
  );
}
