import ClientLayout from "../components/client_layout";
import { authServerSession } from "@/app/lib/auth";

export default async function Akun() {
  const session = await authServerSession();

  return (
    <ClientLayout>
      <div className="flex border-b px-20 h-20 justify-between items-center bg-[#ffffff]">
        <h2 className="text-xl font-bold">Profil Apoteker</h2>
        <button className="flex bg-[#f0de36] rounded-lg w-32 h-10 px-4 ml-10 hover:bg-yellow-300 justify-center items-center shadow-lg">
          <p className="text-black text-md">Edit</p>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-7 gap-5 mx-20 mt-10">
        <div className="col-span-1">
          <h1 className="text-l">Nama Lengkap</h1>
          <input
            type="text"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
            placeholder="Nama Lengkap"
          />
        </div>
        <div className="row-span-5">
          <h1 className="text-l">Alamat Apotek</h1>
          <textarea
            className="w-full h-[15rem] border-2 border-gray-300 rounded-md p-2"
            placeholder="Alamat Apotek"
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">No. STRA</h1>
          <input
            type="text"
            className="w-96  h-12 border-2 border-gray-300 rounded-md p-2"
            placeholder="No. STRA"
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">No. SIPA</h1>
          <input
            type="text"
            placeholder="No. SIPA"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">Email</h1>
          <input
            type="text"
            placeholder="Email"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="col-span-1">
          <h1 className="text-l">Apotek</h1>
          <input
            type="text"
            placeholder="Nama Apotek"
            className="w-96 h-12 border-2 border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      {/* <div className="flex ml-auto mr-20 mt-20 justify-end">
        <button className="bg-yellow-400 text-black rounded-md p-3 px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300">
          Simpan
        </button>
      </div> */}
    </ClientLayout>
  );
}
