import SearchBar from "./search_bar";

export default function SearchDiv() {
  return (
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
              name="inlineradio"
              value="nik"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label htmlFor="nik" className="ms-2 text-sm font-medium">
              NIK
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="nama_pasien"
              type="radio"
              name="inlineradio"
              value="nama_pasien"
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
              name="inlineradio"
              value="alamat_ktp"
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
              name="inlineradio"
              value="nama_ibu"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="ibu" className="ms-2 text-sm font-medium">
              Nama Ibu
            </label>
          </div>
        </div>
      </div>
      <SearchBar />
    </div>
  );
}
