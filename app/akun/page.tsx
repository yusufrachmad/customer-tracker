import { getServerSession } from "next-auth";
import ClientLayout from "../components/client_layout";
import PageHeader from "../components/page_header";
import { authOptionsWrapper } from "@/app/api/auth/[...nextauth]/route";
import {
  signOut,
  useSession,
  SessionProvider,
  getSession,
} from "next-auth/react";
import { cookies, headers } from "next/headers";

export default async function Akun() {
  const session = await getServerSession(
    authOptionsWrapper({ headers: headers(), cookies: cookies() } as any, {
      params: { nextauth: ["session"] },
    })[2]
  );
  if (!session) {
    console.log("Session not found");
  }
  return (
    <ClientLayout>
      <PageHeader title="Akun" />
      <div className="px-6 pt-6 pb-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </ClientLayout>
  );
}
