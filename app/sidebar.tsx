import { useState, useEffect } from "react";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="h-screen w-64">
      <nav className="flex flex-col h-full bg-white border-r shadow-sm pt-32">
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
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <>
      <li
        className={`flex relative items-center py-2 px-5 my-3 font-medium rounded-md cursor-pointer transition-colors ${
          active
            ? "bg-gradient-to-tr from-yellow-300 to-yellow-200"
            : "hover:bg-yellow-100 text-gray-700"
        }`}
        onClick={onClick}
      >
        {icon}
        <span className="w-52 ml-3">{text}</span>
      </li>
    </>
  );
}
