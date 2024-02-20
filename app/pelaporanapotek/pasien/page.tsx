import ClientLayout from "@/app/components/client_layout";
import PageHeader from "@/app/components/page_header";
import PasienNonAktifIndex from "@/app/components/pelaporanapotek/pasien";
import prisma from "@/app/lib/db";

export type PasienNonAktif = {
  nama_pasien: string;
  nik: string;
  tgl_nonaktif: string | null;
  Apotek: {
    nama_apotek: string;
  } | null;
};

export const getPasienNonAktif = async () => {
  try {
    const res = await prisma?.pasien.findMany({
      where: {
        status: "nonaktif",
      },
      select: {
        nama_pasien: true,
        nik: true,
        tgl_nonaktif: true,
        Apotek: {
          select: {
            nama_apotek: true,
          },
        },
      },
      orderBy: {
        tgl_nonaktif: "desc",
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching pasien non aktif:", error);
    return;
  }
};

export default async function PasienNonAktif() {
  const pasienNonAktif = (await getPasienNonAktif()) as PasienNonAktif[];

  return (
    <ClientLayout>
      <PageHeader title="Data Pasien Dinonaktifkan" />
      <PasienNonAktifIndex pasienNonAktif={pasienNonAktif} />
    </ClientLayout>
  );
}
