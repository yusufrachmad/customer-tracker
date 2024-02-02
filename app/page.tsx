"use client";

import Image from "next/image";
import Navbar from "./navbar";
import {
  Home as HomeIcon,
  Text,
  Files,
  KeyRound,
  Building2,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Sidebar, SidebarItem } from "./sidebar";

export default function Home() {
  const [active, setActive] = useState<string | null>("Beranda");

  const handleClick = (text: string) => {
    setActive(text === active ? null : text);
  };

  return (
    <div>
      <div className="mb-[-4.8rem] relative">
        <Navbar />
      </div>
      <Sidebar>
        <SidebarItem
          icon={<HomeIcon size={20} />}
          text="Beranda"
          active={active === "Beranda"}
          onClick={() => handleClick("Beranda")}
        />
        <SidebarItem
          icon={<Text size={20} />}
          text="Pendaftaran"
          active={active === "Pendaftaran"}
          onClick={() => handleClick("Pendaftaran")}
        />
        <SidebarItem
          icon={<Files size={20} />}
          text="Riwayat"
          active={active === "Riwayat"}
          onClick={() => handleClick("Riwayat")}
        />
        <SidebarItem
          icon={<KeyRound size={20} />}
          text="Akun"
          active={active === "Akun"}
          onClick={() => handleClick("Akun")}
        />
        <SidebarItem
          icon={<Building2 size={20} />}
          text="Apotek"
          active={active === "Apotek"}
          onClick={() => handleClick("Apotek")}
        />
      </Sidebar>
    </div>
  );
}
