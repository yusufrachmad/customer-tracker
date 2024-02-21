"use client";
import { useRouter } from "next/navigation";

export default function Circle({
  title,
  icon,
  colors,
}: {
  title: string;
  icon: React.ReactNode;
  colors: string[];
}) {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  const paths: { [key: string]: string } = {
    Beranda: "/",
    Pendaftaran: "/pendaftaran",
    Riwayat: "/riwayat",
    Akun: "/akun",
    Pelaporan: "/pelaporanapotek",
    "Verifikasi Akun": "/verifikasiakun",
  };

  return (
    <div className="col-span-1">
      <div
        className={`flex border rounded-full justify-center ${colors[0]} shadow-2xl hover:cursor-pointer ${colors[1]}`}
        onClick={() => handleClick(paths[title])}
      >
        <div
          className={`flex justify-center items-center w-24 h-24 ${colors[2]} rounded-xl m-11`}
        >
          {icon}
        </div>
      </div>
      <div className="flex justify-center mt-10 font-bold">{title}</div>
    </div>
  );
}
