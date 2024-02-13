"use client";
import { signIn } from "next-auth/react";
import LoginRegister from "../components/login/login_register";
import { loginSchema } from "../lib/validation";
import useZodForm from "@/app/hooks/useZodForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const { formState, register, setError } = useZodForm(loginSchema);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      };

      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setError("root", {
          message: res.error,
        });
      } else {
        router.push("/");
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
        <div className="px-6 pt-6 pb-3">
          <form onSubmit={onSubmit}>
            <div className="mt-3">
              <div className="px-6 py-2">
                <p className="font-black text-sm">Email</p>
                <input
                  type="text"
                  {...register("email")}
                  className="form-control w-full h-7 border-b-2 border-black focus:outline-none"
                  onError={() => {
                    formState.errors.email;
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
            </div>
            {formState.errors.root?.message ? (
              <div className="flex mt-4 pl-6">
                <p className="text-red-500 text-sm font-semibold ">
                  {formState.errors?.root?.message}
                </p>
              </div>
            ) : null}
            <div className="flex justify-end pr-5 mt-3">
              <button className="float-right text-sm text-gray-500 hover:text-gray-700">
                Lupa kata sandi?
              </button>
            </div>
            <div className="flex justify-center pt-1 pb-10">
              <button
                className="bg-[#0d1282] text-white items-center w-40 h-10 rounded-3xl mt-4 hover:bg-blue-900"
                type="submit"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </LoginRegister>
    </>
  );
}
