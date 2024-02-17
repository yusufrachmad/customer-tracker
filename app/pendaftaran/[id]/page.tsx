import ClientLayout from "@/app/components/client_layout";
import KunjunganForm from "@/app/components/pendaftaran/id";
import type { Pasien } from "@prisma/client";

const getPasien = async (id: string) => {
  const res = await prisma?.pasien.findUnique({
    where: {
      id: id,
    },
  });

  if (!res) {
    throw new Error("Pasien not found");
  } else {
    return res;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const pasien: Pasien = await getPasien(params.id);

  return (
    <ClientLayout>
      <KunjunganForm pasien={pasien} />
    </ClientLayout>
  );
}
