import ClientLayout from "../components/client_layout";
import VerifikasiAkunIndex from "../components/verifikasiakun";
import prisma from "@/app/lib/db";
import type { User, Apotek } from "@prisma/client";

export type Apoteker = {
  id: string;
  id_user: string;
  nama_apoteker: string;
  stra: string;
  sipa: string;
  User: User;
  Apotek: Apotek;
};

const getApoteker = async () => {
  const res = await prisma?.apoteker.findMany({
    where: {
      User: {
        status: "pending",
        role: "apoteker",
      },
    },
    include: {
      User: true,
      Apotek: true,
    },
  });

  return res!;
};

export default async function VerifikasiAkun() {
  const apoteker: Apoteker[] = await getApoteker();
  return (
    <>
      <ClientLayout>
        <VerifikasiAkunIndex apoteker={apoteker} />
      </ClientLayout>
    </>
  );
}
