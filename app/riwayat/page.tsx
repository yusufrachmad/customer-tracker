import ClientLayout from "../components/client_layout";
import PageHeader from "../components/page_header";
import { ChevronRight } from "lucide-react";
import SearchDiv from "../components/search_div";

export default function Riwayat() {
  return (
    <ClientLayout>
      <PageHeader title="Riwayat" />
      <SearchDiv />

      <div className="flex flex-col h-[28rem] relative mx-20 mt-4">
        <table className="table-auto border-separate border-spacing-0 text-xs">
          <thead className="bg-white">
            <tr>
              <th className="border-l border-b border-t border-slate-400 py-3 rounded-l-lg">
                Nama Lengkap
              </th>
              <th className="border-t border-b border-slate-400 py-3">NIK</th>
              <th className="border-t border-b border-slate-400 py-3">
                Alamat
              </th>
              <th className="border-t border-b border-slate-400 py-3">
                Nama Ibu
              </th>
              <th className="border-t border-b border-slate-400 py-3">
                Pembelian Terakhir
              </th>
              <th className="border-r border-t border-b border-slate-400 py-3 rounded-r-lg">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="border-b border-[#eef0ff] py-3">
                The Sliding Mr. Bones
              </td>
              <td className="border-b border-[#eef0ff] py-3">3342231234710</td>
              <td className="text-left border-b border-[#eef0ff] py-3">
                Jalan solo raya
              </td>
              <td className="border-b border-[#eef0ff] py-3">Sri Surendang</td>
              <td className="border-b border-[#eef0ff] py-3">12/10/2023</td>
              <td className="border-b border-[#eef0ff] py-3">
                <div className="flex justify-center px-5">
                  <div className="flex w-5 justify-center bg-[#ffcc00] rounded-md">
                    <ChevronRight size={20} color="#0d1282" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ClientLayout>
  );
}
