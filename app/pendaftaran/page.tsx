import ClientLayout from "../components/client_layout";
import PageHeader from "../components/page_header";
import PendaftaranIndex from "../components/pendaftaran";

export default function Pendaftaran() {
  return (
    <>
      <ClientLayout>
        <PageHeader title="Pendaftaran" />
        <PendaftaranIndex />
      </ClientLayout>
    </>
  );
}
