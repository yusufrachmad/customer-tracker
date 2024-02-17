import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <>
      <div className="flex mt-5 mb-2">
        <label className="relative text-gray-400 focus-within:text-gray-600 block">
          <Search className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type="text"
            name="search"
            className="form-input border rounded-lg border-gray-400 py-2 w-[40rem] px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none block pl-14 focus:outline-none"
          />
        </label>
        <button
          className="bg-[#0d1282] text-white text-sm h-10 w-20 rounded-md ml-3"
          type="submit"
        >
          Cari
        </button>
      </div>
    </>
  );
}
