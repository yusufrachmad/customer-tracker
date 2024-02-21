import ClientLayout from "@/app/components/client_layout";
import PageHeader from "@/app/components/page_header";
import PasienNonAktifIndex from "@/app/components/pelaporanapotek/pasien";
import { getPasienNonAktif } from "@/app/lib/functions";

export type PasienNonAktif = {
  nama_pasien: string;
  nik: string;
  tgl_nonaktif: string | null;
  Apotek: {
    nama_apotek: string;
  } | null;
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
