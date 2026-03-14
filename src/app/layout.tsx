import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
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
        {/* O Header fica aqui, em cima de todo o conteúdo */}
        <Header />
        {children}
      </body>
    </html>
  );
}