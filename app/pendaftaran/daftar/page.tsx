import ClientLayout from "@/app/components/client_layout";
import PageHeader from "@/app/components/page_header";
import DaftarClient from "@/app/components/pendaftaran/daftar";

export default function Daftar() {
  return (
    <div>
      <ClientLayout>
        <PageHeader title="Pendaftaran Pasien" />
        <DaftarClient />
      </ClientLayout>
    </div>
  );
}
