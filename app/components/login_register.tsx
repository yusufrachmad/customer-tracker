"use client";
import { useRouter, usePathname } from "next/navigation";
import Header from "./header";
import Image from "next/image";

export default function LoginRegister({
  children,
}: {
  children: React.ReactNode;
}) {
  const logo = require("@/public/psychopharm.png").default;
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (text: string) => {
    router.push(`/${text.toLowerCase()}`);
  };

  return (
    <>
      <div className="mb-[-4.8rem] relative">
        <Header />
      </div>

      <div
        className={`h-screen ${
          pathname === "/login"
            ? "bg-gradient-to-b from-[#0D1282E5] to-[#D71313A1]"
            : "bg-gradient-to-t from-[#0D1282E5] to-[#D71313A1]"
        } z-0`}
      >
        <div
          className={`flex ${
            pathname === "/login" ? "pt-36" : "pt-[6.5rem]"
          } justify-center`}
        >
          <div className="flex flex-col items-center">
            <Image src={logo} alt="Psychopharm" width={100} height={100} />
            <div className="mt-8 w-[35rem] border bg-white rounded-2xl py-4 shadow-2xl">
              <div className="-mb-px flex justify-center py-3">
                <button
                  className={`mr-[-2rem] rounded-3xl inline-flex items-center justify-center w-56 py-1 border-2 border-[#0d1282] text-xs ${
                    pathname === "/login"
                      ? "text-white bg-[#0d1282] z-10"
                      : "bg-[#c2c3df] text-[#0d1282] hover:text-gray-600"
                  }`}
                  onClick={() => handleClick("login")}
                >
                  <p className="font-black">Masuk</p>
                </button>
                <button
                  className={`ml-[-2rem] rounded-3xl inline-flex items-center justify-center w-56 py-1 border-2 border-[#0d1282] text-xs ${
                    pathname === "/register"
                      ? "text-white bg-[#0d1282] z-10"
                      : "bg-[#c2c3df] text-[#0d1282] hover:text-gray-600"
                  }`}
                  onClick={() => handleClick("register")}
                >
                  <p className="font-black">Daftar</p>
                </button>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
