import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid").default(""),
  password: z
    .string()
    .min(6, "Password minimal terdiri dari 6 karakter")
    .default(""),
});

const registerSchema = z.object({
  email: z.string().email("Email tidak valid").default(""),
  stra: z.string().min(5, "Nomor STRA harus diisi").default(""),
  sipa: z.string().min(5, "Nomor SIPA harus diisi").default(""),
  nama: z.string().min(2, "Nama harus diisi").default(""),
  password: z
    .string()
    .min(6, "Password minimal terdiri dari 6 karakter")
    .default(""),
  alamat: z.string().min(5, "Alamat harus diisi").default(""),
  nama_apotek: z.string().min(5, "Nama Apotek harus diisi").default(""),
});

const patientRegisterSchema = z.object({
  nama_pasien: z.string().min(2, "Nama hasur diisi").default(""),
  nik: z.string().min(5, "NIK harus diisi").default(""),
  nama_ibu: z.string().min(5, "Nama Ibu harus diisi").default(""),
  tempat_lahir: z.string().min(2, "Tempat lahir harus diisi").default(""),
  tanggal_lahir: z
    .date()
    .min(new Date(1900, 1, 1), "Tanggal lahir tidak valid"),
  alamat: z.string().min(5, "Alamat harus diisi").default(""),
});

export { registerSchema, loginSchema, patientRegisterSchema, z };
