"use client";
import { signIn } from "next-auth/react";
import LoginRegister from "../components/login_register";
import { loginSchema } from "../lib/validation";
import useZodForm from "@/app/hooks/useZodForm";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ModalLogin from "../components/modal_login";

export default function Login() {
  const { formState, register, setError } = useZodForm(loginSchema);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const router = useRouter();
  useEffect(() => {
    if (formState.errors.root?.message === "not-verified") {
      setShowModal(true);
    }
  }, [formState.errors.root?.message]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

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
        setIsSubmitting(false);
        setShowModal(true);
        setError("root", {
          message: res.error,
        });
      } else {
        router.push("/");
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
            {formState.errors.root?.message !== "not-verified" ? (
              <div className="flex mt-4 pl-6">
                <p className="text-red-500 text-sm font-semibold ">
                  {formState.errors?.root?.message}
                </p>
              </div>
            ) : null}
            {showModal && formState.errors.root?.message === "not-verified" && (
              <ModalLogin
                onClose={handleCloseModal}
                onConfirm={handleCloseModal}
              />
            )}
            <div className="flex justify-end pr-5 mt-3">
              <button className="float-right text-sm text-gray-500 hover:text-gray-700">
                Lupa kata sandi?
              </button>
            </div>
            <div className="flex justify-center pt-1 pb-10">
              <button
                className="bg-[#0d1282] text-white items-center w-40 h-10 rounded-3xl mt-4 hover:bg-blue-900"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </LoginRegister>
    </>
  );
}
