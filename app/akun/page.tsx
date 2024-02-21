import ClientLayout from "../components/client_layout";
import { authServerSession } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import Form from "@/app/akun/form";

interface User {
  id: string;
  email: string;
}

export type Profile = {
  id: string;
  nama_apoteker: string;
  stra: string;
  sipa: string;
  email: string;
  Apotek: {
    id: string;
    nama_apotek: string;
    alamat: string;
  };
};

async function getProfile(session: User | null) {
  const res = await prisma.apoteker.findFirst({
    where: {
      id_user: session?.id,
    },
    include: {
      Apotek: true,
    },
  });

  if (!res?.Apotek) {
    throw new Error("Profile not found");
  }

  const profile: Profile = {
    id: res.id,
    nama_apoteker: res.nama_apoteker,
    stra: res.stra,
    sipa: res.sipa,
    email: session?.email || "",
    Apotek: {
      id: res.Apotek.id,
      alamat: res.Apotek.alamat,
      nama_apotek: res.Apotek.nama_apotek,
    },
  };

  return profile;
}

export default async function Akun() {
  const session = (await authServerSession()) as User | null;
  const profile: Profile[] = [await getProfile(session)];

  return (
    <ClientLayout>
      <Form profile={profile} />
    </ClientLayout>
  );
}
