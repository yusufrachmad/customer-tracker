import ClientLayout from "@/app/components/client_layout";
import DetailKunjungan from "@/app/components/riwayat/id/id-kunjungan";
import type { Kunjungan } from "@/app/riwayat/[id]/page";

const getKunjungan = async (id: string) => {
  const res = await prisma?.kunjungan.findFirst({
    where: {
      id_pasien: id,
    },
    include: {
      Apotek: true,
      Apoteker: true,
      Pasien: true,
    },
  });

  return res!;
};

export default async function Page({ params }: { params: { id: string } }) {
  const kunjungan = (await getKunjungan(params.id)) as Kunjungan;

  return (
    <ClientLayout>
      <DetailKunjungan kunjungan={kunjungan} />
    </ClientLayout>
  );
}
