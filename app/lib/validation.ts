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
});

export { registerSchema, loginSchema, z };
