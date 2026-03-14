"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Carrinho() {
  const { items, removerItem } = useCartStore();
  const [carregando, setCarregando] = useState(false);

  // Esta função soma automaticamente o preço de tudo o que está no carrinho
  const total = items.reduce((soma, item) => soma + item.preco, 0);

  // FUNÇÃO DE CHECKOUT CONECTADA À API
  const finalizarCompra = async () => {
    if (items.length === 0) return;

    setCarregando(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Redireciona o cliente para o Mercado Pago
        window.location.href = data.init_point;
      } else {
        alert("Erro ao processar pagamento. Verifique se o Token do Mercado Pago está no .env.local");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na rede. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-orange-500 font-sans p-8">
      <div className="max-w-[1000px] mx-auto py-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-white">Seu Carrinho</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 bg-zinc-950">
            <p className="text-xl mb-6 opacity-80">O seu carrinho está vazio.</p>
            <Link href="/" className="inline-block bg-white text-orange-500 font-black uppercase tracking-widest py-4 px-10 hover:bg-gray-200 transition-all">
              Voltar às Compras
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center border border-zinc-900 p-6 bg-zinc-950 gap-4">
                <div>
                  <h2 className="text-xl font-bold uppercase mb-1 text-white">{item.nome}</h2>
                  <p className="opacity-80 text-sm uppercase tracking-wider">Tamanho: <span className="text-orange-500 font-bold">{item.tamanho}</span></p>
                  <p className="opacity-80 text-sm uppercase tracking-wider">Nome: <span className="text-orange-500 font-bold">{item.nomePersonalizado}</span></p>
                  <p className="opacity-80 text-sm uppercase tracking-wider">Número: <span className="text-orange-500 font-bold">{item.numeroPersonalizado}</span></p>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                  <p className="text-2xl font-bold text-white">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                  <button 
                    onClick={() => removerItem(item.id)} 
                    className="text-sm font-bold underline hover:text-white uppercase tracking-wider text-orange-500"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t border-zinc-900 pt-8 flex flex-col items-end">
              <h3 className="text-3xl font-black uppercase mb-6 text-white">
                Total: <span className="text-orange-500">R$ {total.toFixed(2).replace('.', ',')}</span>
              </h3>
              
              {/* BOTÃO CORRIGIDO COM onClick E LOADING */}
              <button 
                onClick={finalizarCompra}
                disabled={carregando}
                className={`bg-white text-orange-500 font-black uppercase tracking-widest py-5 px-12 transition-all text-xl w-full md:w-auto 
                  ${carregando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-white active:scale-95'}`}
              >
                {carregando ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}