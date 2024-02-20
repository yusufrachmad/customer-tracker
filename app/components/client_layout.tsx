import { authServerSession } from "@/app/lib/auth";
import Header from "./header";
import { Sidebar, SidebarItem } from "./sidebar";
import {
  Home as HomeIcon,
  Text,
  Files,
  KeyRound,
  Building2,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

interface User {
  role: string;
}

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await authServerSession()) as User;
  return (
    <>
      <div className="mb-[-4.8rem] relative">
        <Header />
      </div>

      <div className="flex bg-[#fafafa]">
        <Sidebar>
          <SidebarItem icon={<HomeIcon size={20} />} text="Beranda" />
          <SidebarItem icon={<Text size={20} />} text="Pendaftaran" />
          <SidebarItem icon={<Files size={20} />} text="Riwayat" />
          {session?.role === "dinkes" ? (
            <SidebarItem icon={<KeyRound size={20} />} text="Verifikasi Akun" />
          ) : (
            <SidebarItem icon={<KeyRound size={20} />} text="Akun" />
          )}
          {session?.role === "dinkes" && (
            <SidebarItem
              icon={<Building2 size={20} />}
              text="Pelaporan Apotek"
            />
          )}
        </Sidebar>
        <div className="pt-[4.8rem] w-4/5">{children}</div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </>
  );
}
