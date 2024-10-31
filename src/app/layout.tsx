import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

export const metadata: Metadata = {
  title: "APS Plus",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ptBR">
      <body
        className={`antialiased bg-[#F7FAFC]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
