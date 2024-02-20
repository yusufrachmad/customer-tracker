import ClientLayout from "../components/client_layout";
import PageHeader from "../components/page_header";
import RiwayatIndex from "../components/riwayat";

export default function Pendaftaran() {
  return (
    <>
      <ClientLayout>
        <PageHeader title="Riwayat" />
        <RiwayatIndex />
      </ClientLayout>
    </>
  );
}
