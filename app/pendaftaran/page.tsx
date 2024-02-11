import ClientLayout from "../components/client_layout";

export default function Pendaftaran() {
  return (
    <>
      <ClientLayout>
        <div className="flex flex-col h-screen relative pt-[-4.8rem]">
          <div className="flex flex-col border-b px-20 h-20 justify-center bg-white">
            <h1 className="text-xl font-bold">Mr. X</h1>
            <h2 className="text-sm">11112222333</h2>
          </div>
          <div className="grid grid-cols-2 gap-y-7 gap-5 mx-20  mt-10">
            <div className="col-span-1">
              <h1 className="text-l">Tanggal Kunjungan</h1>
              <input
                type="date"
                className="w-64 h-12 border-2 border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">Tanggal Resep</h1>
              <input
                type="date"
                className="w-64 h-12 border-2 border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-1 row-span-3">
              <h1 className="text-l">Isi Resep</h1>
              <textarea
                className="w-full h-[16.5rem] border-2 border-gray-300 rounded-md p-2"
                placeholder="Ketikkan resep secara lengkap dan jelas"
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">Nama Dokter</h1>
              <input
                type="text"
                placeholder="Nama Lengkap dan Gelar"
                className="w-full h-12 border-2 border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-1">
              <h1 className="text-l">Alamat Faskes</h1>
              <input
                type="text"
                placeholder="Nama Faskes, Alamat Lengkap"
                className="w-full h-12 border-2 border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-1">
              <div>
                <h1 className="text-l">Unggah Resep</h1>
                <input
                  type="file"
                  className="w-64 border-2 border-gray-300 rounded-md p-2"
                />
                <button className="bg-purple-400 text-white rounded-md p-3 mt-3 ml-2 border-1 border-gray-300 shadow-xl hover:bg-purple-500">
                  Unggah
                </button>
              </div>
            </div>
          </div>
          <div className="flex ml-auto mr-20 mt-20">
            <button className="bg-yellow-400 text-black rounded-md p-3 px-10 border-1 border-gray-300 shadow-xl hover:bg-yellow-300">
              Simpan
            </button>
          </div>
        </div>
      </ClientLayout>
    </>
  );
}
