import { getBulanIni } from "../pelaporanapotek";

export default function Kunjungan({
  jumlahKunjungan,
}: {
  jumlahKunjungan: number;
}) {
  const bulanIni = getBulanIni();
  return (
    <div className="flex justify-center items-center mt-24">
      <div className="flex flex-col border-2 p-4 rounded-md shadow-sm">
        Jumlah Kunjungan Bulan {bulanIni}: {jumlahKunjungan}
      </div>
    </div>
  );
}
