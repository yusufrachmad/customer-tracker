import ClientLayout from "@/app/components/client_layout";
import PageHeader from "@/app/components/page_header";
import DaftarClient from "@/app/components/pendaftaran/daftar";
import prisma from "@/app/lib/db";
import type { Apotek } from "@prisma/client";
import { authServerSession } from "@/app/lib/auth";
import type { User } from "@prisma/client";

const getApotek = async () => {
  const res = await prisma?.apotek.findMany({
    select: {
      id: true,
      nama_apotek: true,
    },
  });

  return res;
};

export default async function Daftar() {
  const session = (await authServerSession()) as User;
  const user = session?.role;
  const apotek = (await getApotek()) as Apotek[];

  return (
    <div>
      <ClientLayout>
        <PageHeader title="Pendaftaran Pasien" />
        <DaftarClient apotek={apotek} user={user} />
      </ClientLayout>
    </div>
  );
}
