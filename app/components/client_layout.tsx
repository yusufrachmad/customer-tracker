"use client";
import Header from "./header";
import { Sidebar, SidebarItem } from "./sidebar";
import {
  Home as HomeIcon,
  Text,
  Files,
  KeyRound,
  Building2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (text: string) => {
    router.push(text === "Beranda" ? "/" : `/${text.toLowerCase()}`);
  };
  return (
    <div>
      <div className="mb-[-4.8rem] relative">
        <Header />
      </div>

      <div className="flex bg-[#fafafa]">
        <Sidebar>
          <SidebarItem
            icon={<HomeIcon size={20} />}
            text="Beranda"
            active={pathname === "/"}
            onClick={() => handleClick("Beranda")}
          />
          <SidebarItem
            icon={<Text size={20} />}
            text="Pendaftaran"
            active={pathname === "/pendaftaran"}
            onClick={() => handleClick("Pendaftaran")}
          />
          <SidebarItem
            icon={<Files size={20} />}
            text="Riwayat"
            active={pathname === "/riwayat"}
            onClick={() => handleClick("Riwayat")}
          />
          <SidebarItem
            icon={<KeyRound size={20} />}
            text="Akun"
            active={pathname === "/akun"}
            onClick={() => handleClick("Akun")}
          />
          <SidebarItem
            icon={<Building2 size={20} />}
            text="Apotek"
            active={pathname === "/apotek"}
            onClick={() => handleClick("Apotek")}
          />
        </Sidebar>
        <div className="pt-[4.8rem] w-4/5">{children}</div>
      </div>
    </div>
  );
}
