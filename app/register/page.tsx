"use client";
import { useRouter } from "next/navigation";
import LoginRegister from "../components/login_register";
import { registerSchema } from "../lib/validation";
import useZodForm from "@/app/hooks/useZodForm";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const { formState, register, setError } = useZodForm(registerSchema);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = {
        email: event.currentTarget.email.value,
        stra: event.currentTarget.stra.value,
        sipa: event.currentTarget.sipa.value,
        nama: event.currentTarget.nama.value,
        password: event.currentTarget.password.value,
        nama_apotek: event.currentTarget.nama_apotek.value,
        alamat: event.currentTarget.alamat.value,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.error) {
        setIsSubmitting(false);
        setError("root", {
          message: json.error,
        });
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      setIsSubmitting(false);
      setError("root", {
        message: error?.message,
      });
    }
  };

  return (
    <>
      <LoginRegister>
        <div className="px-6 pt-2 pb-2">
          <form onSubmit={onSubmit}>
            <div className="">
              <div className="px-6 py-2">
                <p className="font-black text-sm">Email</p>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.email;
                  }}
                />
              </div>
              <div className="px-6 py-2">
                <p className="font-black text-sm">Nomor STRA</p>
                <input
                  type="text"
                  {...register("stra")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.stra;
                  }}
                />
              </div>
              <div className="px-6 py-2">
                <p className="font-black text-sm">Nomor SIPA</p>
                <input
                  type="text"
                  {...register("sipa")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.sipa;
                  }}
                />
              </div>
              <div className="px-6 py-2">
                <p className="font-black text-sm">Nama Lengkap</p>
                <input
                  type="text"
                  {...register("nama")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.nama;
                  }}
                />
              </div>
              <div className="px-6 py-2">
                <p className="font-black text-sm">Kata Sandi</p>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.password;
                  }}
                />
              </div>
              <div className="px-6 py-2">
                <p className="font-black text-sm">Nama Apotek</p>
                <input
                  type="text"
                  {...register("nama_apotek")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.password;
                  }}
                />
              </div>
              <div className="px-6 py-2">
                <p className="font-black text-sm">Alamat Apotek</p>
                <input
                  type="text"
                  {...register("alamat")}
                  className="w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.password;
                  }}
                />
              </div>
              {formState.errors.root?.message ? (
                <div className="flex mt-1 pl-6">
                  <p className="text-red-500 text-sm font-semibold ">
                    {formState.errors?.root?.message}
                  </p>
                </div>
              ) : null}
              <div className="flex justify-center">
                <button
                  className="bg-[#0d1282] text-white items-center w-40 h-10 rounded-3xl mt-3 hover:bg-blue-900"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Daftar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </LoginRegister>
    </>
  );
}
