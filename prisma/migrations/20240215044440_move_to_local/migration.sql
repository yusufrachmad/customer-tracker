/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pasien" (
    "id" TEXT NOT NULL,
    "nama_pasien" TEXT NOT NULL,
    "alamat_ktp" TEXT NOT NULL,
    "nama_ibu" TEXT NOT NULL,
    "tempat_lahir" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apoteker" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "nama_apoteker" TEXT NOT NULL,
    "sipa" TEXT NOT NULL,
    "stra" TEXT NOT NULL,
    "apotekId_apotek" TEXT,

    CONSTRAINT "Apoteker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengawas" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "nama_pengawas" TEXT NOT NULL,
    "nip" INTEGER NOT NULL,

    CONSTRAINT "Pengawas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apotek" (
    "id" TEXT NOT NULL,
    "nama_apotek" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,

    CONSTRAINT "Apotek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelaporan" (
    "id_laporan" TEXT NOT NULL,
    "id_apotek" TEXT NOT NULL,
    "id_apoteker" TEXT NOT NULL,
    "jml_kunjungan" INTEGER NOT NULL,
    "kunjungan_berisiko" INTEGER NOT NULL,

    CONSTRAINT "Pelaporan_pkey" PRIMARY KEY ("id_laporan")
);

-- CreateTable
CREATE TABLE "Kunjungan" (
    "id" TEXT NOT NULL,
    "id_pasien" TEXT NOT NULL,
    "id_apotek" TEXT NOT NULL,
    "id_apoteker" TEXT NOT NULL,
    "tgl_kunjungan" TIMESTAMP(3) NOT NULL,
    "tgl_resep" TIMESTAMP(3) NOT NULL,
    "nama_dokter" TEXT NOT NULL,
    "isi_resep" TEXT NOT NULL,
    "file_resep" TEXT NOT NULL,
    "alamat_faskes" TEXT NOT NULL,

    CONSTRAINT "Kunjungan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_id_key" ON "Pasien"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Apoteker_id_key" ON "Apoteker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pengawas_id_key" ON "Pengawas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Apotek_id_key" ON "Apotek"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pelaporan_id_laporan_key" ON "Pelaporan"("id_laporan");

-- CreateIndex
CREATE UNIQUE INDEX "Kunjungan_id_key" ON "Kunjungan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apoteker" ADD CONSTRAINT "Apoteker_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apoteker" ADD CONSTRAINT "Apoteker_apotekId_apotek_fkey" FOREIGN KEY ("apotekId_apotek") REFERENCES "Apotek"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengawas" ADD CONSTRAINT "Pengawas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelaporan" ADD CONSTRAINT "Pelaporan_id_apotek_fkey" FOREIGN KEY ("id_apotek") REFERENCES "Apotek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelaporan" ADD CONSTRAINT "Pelaporan_id_apoteker_fkey" FOREIGN KEY ("id_apoteker") REFERENCES "Apoteker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kunjungan" ADD CONSTRAINT "Kunjungan_id_pasien_fkey" FOREIGN KEY ("id_pasien") REFERENCES "Pasien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kunjungan" ADD CONSTRAINT "Kunjungan_id_apotek_fkey" FOREIGN KEY ("id_apotek") REFERENCES "Apotek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kunjungan" ADD CONSTRAINT "Kunjungan_id_apoteker_fkey" FOREIGN KEY ("id_apoteker") REFERENCES "Apoteker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
