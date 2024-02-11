"use client";
import { useRouter } from "next/navigation";
import LoginRegister from "../components/login_register";
import { registerSchema } from "../lib/validation";
import useZodForm from "@/app/hooks/useZodForm";

export default function Register() {
  const router = useRouter();
  const { formState, register, setError } = useZodForm(registerSchema);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = {
        email: event.currentTarget.email.value,
        stra: event.currentTarget.stra.value,
        sipa: event.currentTarget.sipa.value,
        nama: event.currentTarget.nama.value,
        password: event.currentTarget.password.value,
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
        setError("root", {
          message: json.error,
        });
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      setError("root", {
        message: error?.message,
      });
    }
  };

  return (
    <>
      <LoginRegister>
        <div className="px-6 pt-6 pb-2">
          <form onSubmit={onSubmit}>
            <div className="mt-2">
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
              {formState.errors.root?.message ? (
                <div className="flex mt-4 pl-6">
                  <p className="text-red-500 text-sm font-semibold ">
                    {formState.errors?.root?.message}
                  </p>
                </div>
              ) : null}
              <div className="flex justify-center pb-1">
                <button
                  className="bg-[#0d1282] text-white items-center w-40 h-10 rounded-3xl mt-4 hover:bg-blue-900"
                  type="submit"
                >
                  Daftar
                </button>
              </div>
            </div>
          </form>
        </div>
      </LoginRegister>
    </>
  );
}
