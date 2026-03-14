import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: "Loja Alavanca",
  description: "Equipamentos de alta performance e personalização",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="bg-black text-white font-sans">
        {/* Apenas a Navbar agora, que já contém o Logo */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}