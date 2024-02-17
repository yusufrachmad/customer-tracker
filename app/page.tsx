import Image from "next/image";
import Header from "./components/header";
import { authServerSession } from "@/app/lib/auth";
import LoginButton from "./components/beranda/login_button";
import { Text, Files, KeyRound, Building2 } from "lucide-react";
import Circle from "./components/beranda/circle";
import Kunjungan from "./components/beranda/kunjungan";

interface User {
  nama: string;
  role: string;
}

export default async function Home() {
  const logo = require("@/public/psychopharm.png").default;
  const session = (await authServerSession()) as User;
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
      <Kunjungan />
    </>
  );
}
