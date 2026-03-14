"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore'; 
// Usando ../ para garantir que ele ache a pasta store

export default function Header() {
  // Conecta com a memória global do carrinho
  const items = useCartStore((state) => state.items);

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-zinc-900 bg-black text-orange-500">
      
      {/* LOGO E NOME */}
      <Link href="/" className="flex items-center gap-3 group">
        <Image 
          src="/logo.png" 
          alt="Logo Alavanca" 
          width={40} 
          height={40} 
          className="object-contain group-hover:scale-110 transition-transform" 
        />
        <span className="text-2xl font-black tracking-tighter uppercase">
          ALAVANCA
        </span>
      </Link>

      {/* LINKS DE NAVEGAÇÃO */}
      <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest">
        <Link href="/" className="hover:text-white transition">Produtos</Link>
        <Link href="#" className="hover:text-white transition">Contatos</Link>
        <Link href="#" className="hover:text-white transition">Premiações</Link>
      </div>

      {/* CONTADOR DO CARRINHO */}
      <Link 
        href="/carrinho" 
        className="text-sm font-bold underline hover:text-white transition uppercase tracking-wider"
      >
        CARRINHO ({items.length})
      </Link>
      
    </nav>
  );
}