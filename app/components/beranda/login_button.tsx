"use client";

import { signOut } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      className="border bg-[#cc3300] rounded-lg w-20 h-9 px-4 ml-10 hover:bg-red-700"
      onClick={() => signOut()}
    >
      <p className="text-white text-sm">Keluar</p>
    </button>
  );
}
