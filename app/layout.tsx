import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PsychoPharm",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src="https://www.gstatic.com/charts/loader.js"
        ></script>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
