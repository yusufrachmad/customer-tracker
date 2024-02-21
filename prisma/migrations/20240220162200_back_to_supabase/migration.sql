/*
  Warnings:

  - You are about to drop the column `apotekId_apotek` on the `Apoteker` table. All the data in the column will be lost.
  - You are about to drop the column `file_resep` on the `Kunjungan` table. All the data in the column will be lost.
  - You are about to drop the column `isi_resep` on the `Kunjungan` table. All the data in the column will be lost.
  - Added the required column `id_apotek` to the `Apoteker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_penyerahan` to the `Kunjungan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_apotek` to the `Pasien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `Pasien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Pasien` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Apoteker" DROP CONSTRAINT "Apoteker_apotekId_apotek_fkey";

-- AlterTable
ALTER TABLE "Apoteker" DROP COLUMN "apotekId_apotek",
ADD COLUMN     "id_apotek" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kunjungan" DROP COLUMN "file_resep",
DROP COLUMN "isi_resep",
ADD COLUMN     "file_penyerahan" TEXT NOT NULL,
ALTER COLUMN "tgl_kunjungan" SET DATA TYPE DATE,
ALTER COLUMN "tgl_resep" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Pasien" ADD COLUMN     "id_apotek" TEXT NOT NULL,
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tgl_nonaktif" DATE,
ALTER COLUMN "tanggal_lahir" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "RiwayatChangesKunjungan" (
    "id" TEXT NOT NULL,
    "id_kunjungan" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "tgl_perubahan" TIMESTAMP(3) NOT NULL,
    "perubahan" TEXT NOT NULL,

    CONSTRAINT "RiwayatChangesKunjungan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiwayatChangesKunjungan_id_key" ON "RiwayatChangesKunjungan"("id");

-- AddForeignKey
ALTER TABLE "Pasien" ADD CONSTRAINT "Pasien_apotekId_fkey" FOREIGN KEY ("id_apotek") REFERENCES "Apotek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apoteker" ADD CONSTRAINT "Apoteker_id_apotek_fkey" FOREIGN KEY ("id_apotek") REFERENCES "Apotek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatChangesKunjungan" ADD CONSTRAINT "RiwayatChangesKunjungan_id_kunjungan_fkey" FOREIGN KEY ("id_kunjungan") REFERENCES "Kunjungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatChangesKunjungan" ADD CONSTRAINT "RiwayatChangesKunjungan_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
