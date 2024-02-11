import ClientLayout from "../components/client_layout";
import PageHeader from "../components/page_header";
import { Search, Download, ChevronRight } from "lucide-react";

export default function Riwayat() {
  return (
    <ClientLayout>
      <PageHeader title="Riwayat" />
      <div className="flex flex-col mx-20">
        <div className="my-5 text-[#bababa]">
          Cek riwayat pembelian obat pasien dengan memasukkan data berikut!
        </div>
        <div className="my-2">
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                id="nik"
                type="radio"
                value=""
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="nik" className="ms-2 text-sm font-medium">
                NIK
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="nama"
                type="radio"
                value=""
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="nama" className="ms-2 text-sm font-medium">
                Nama Lengkap
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="alamat"
                type="radio"
                value=""
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="alamat" className="ms-2 text-sm font-medium">
                Alamat
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="ibu"
                type="radio"
                value=""
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="ibu" className="ms-2 text-sm font-medium">
                Nama Ibu
              </label>
            </div>
          </div>
        </div>
        <div className="flex my-2">
          <label className="relative text-gray-400 focus-within:text-gray-600 block">
            <Search className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />

            <input
              type="text"
              name="email"
              id="email"
              placeholder=""
              className="form-input border rounded-lg border-gray-400 py-2 w-[40rem] px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
            />
          </label>
          <button className="bg-[#0d1282] text-white text-sm h-10 w-20 rounded-md ml-3">
            Cari
          </button>
        </div>
      </div>

      <div className="flex flex-col h-[28rem] relative w-[61rem] mx-20 mt-10">
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
                <div className="flex justify-center">
                  <div className="flex w-5 justify-center bg-[#ffcc00] rounded-md">
                    <ChevronRight size={20} color="#0d1282" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#eef0ff] py-3">
                The Sliding Mr. Bones
              </td>
              <td className="border-b border-[#eef0ff] py-3">3342231234710</td>
              <td className="text-left border-b border-[#eef0ff] py-3">
                Jalan diponegoro
              </td>
              <td className="border-b border-[#eef0ff] py-3">Sri Surendang</td>
              <td className="border-b border-[#eef0ff] py-3">12/10/2023</td>
              <td className="border-b border-[#eef0ff] py-3">
                <div className="flex justify-center">
                  <div className="flex w-5 justify-center bg-[#ffcc00] rounded-md">
                    <ChevronRight size={20} color="#0d1282" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto border-separate border-spacing-0 text-xs">
          <thead className="bg-white">
            <tr>
              <th className="border-l border-b border-t border-slate-400 py-3 rounded-l-lg">
                Nama Lengkap
              </th>
              <th className="border-t border-b border-slate-400 py-3">NIK</th>
              <th className="border-t border-b border-slate-400 py-3">
                Pembelian Terakhir
              </th>
              <th className="border-t border-b border-slate-400 py-3">
                Data Resep
              </th>
              <th className="border-t border-b border-slate-400 py-3">
                Foto Resep
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
              <td className="text-center border-b border-[#eef0ff] py-3">
                12/10/2023
              </td>
              <td className="border-b border-[#eef0ff] py-3 text-left">
                Data resep:
              </td>
              <td className="border-b border-[#eef0ff] py-3">
                <div className="flex justify-center py-3">
                  <Search color="#0d1282" size={18} className="mr-2" />
                  <Download color="#d71313" size={18} className="ml-2" />
                </div>
              </td>
              <td className="border-b border-[#eef0ff] py-3">
                <div className="flex justify-center">
                  <div className="flex w-5 justify-center bg-[#ffcc00] rounded-md">
                    <ChevronRight size={20} color="#0d1282" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#eef0ff] py-3">
                The Sliding Mr. Bones
              </td>
              <td className="border-b border-[#eef0ff] py-3">3342231234710</td>
              <td className="text-center border-b border-[#eef0ff] py-3">
                1961
              </td>
              <td className="border-b border-[#eef0ff] py-3 text-left">
                Data resep:
              </td>
              <td className="border-b border-[#eef0ff] py-3">
                <div className="flex justify-center py-3">
                  <Search color="#0d1282" size={18} className="mr-2" />
                  <Download color="#d71313" size={18} className="ml-2" />
                </div>
              </td>
              <td className="border-b border-[#eef0ff] py-3">
                <div className="flex justify-center">
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
