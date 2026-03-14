"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Sucesso() {
  const limparCarrinho = useCartStore((state) => state.limparCarrinho);

  // Limpa o carrinho assim que a página carrega, pois a venda foi concluída
  useEffect(() => {
    limparCarrinho();
  }, [limparCarrinho]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center font-sans">
      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(249,115,22,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
        PEDIDO <span className="text-orange-500">CONFIRMADO</span>
      </h1>
      
      <p className="text-lg opacity-70 max-w-md mb-10 tracking-wide uppercase">
        Obrigado por escolher a Alavanca. O seu novo equipamento já está entrando em produção.
      </p>

      <Link 
        href="/" 
        className="bg-orange-500 text-black font-black uppercase tracking-widest py-4 px-10 hover:bg-white transition-all duration-300 active:scale-95"
      >
        Voltar para a Loja
      </Link>
    </main>
  );
}