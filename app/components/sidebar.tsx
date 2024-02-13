"use client";
import { useRouter, usePathname } from "next/navigation";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="h-screen w-1/5">
      <nav className="flex flex-col h-full bg-white border-r shadow-sm pt-32 bg-[#fafafa]">
        <ul className="flex-1 px-2">{children}</ul>
        <div className="flex pb-20 justify-center">
          <p className="text-gray-400 text-xs font-sans">PsychoPharm</p>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (text: string) => {
    router.push(text === "Beranda" ? "/" : `/${text.toLowerCase()}`);
  };
  const active = pathname === `/${text.toLowerCase()}`;

  return (
    <>
      <li
        className={`flex relative items-center py-2 px-5 my-3 font-medium rounded-md cursor-pointer transition-colors ${
          active ? "bg-[#f0de36]" : "hover:bg-yellow-100 text-gray-700"
        }`}
        onClick={() => handleClick(text)}
      >
        {icon}
        <span className="w-52 ml-3">{text}</span>
      </li>
    </>
  );
}
