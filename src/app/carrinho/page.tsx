"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Carrinho() {
  const { items, removerItem } = useCartStore();
  const [carregando, setCarregando] = useState(false);

  const total = items.reduce((soma, item) => soma + item.preco, 0);

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
        window.location.href = data.init_point;
      } else {
        alert("Erro ao processar pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na rede. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans p-8">
      <div className="max-w-[1000px] mx-auto py-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">Seu Carrinho</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 bg-zinc-950">
            <p className="text-xl mb-6 opacity-80 uppercase tracking-widest">O carrinho está vazio.</p>
            <Link href="/" className="inline-block bg-orange-500 text-black font-black uppercase tracking-widest py-4 px-10 hover:bg-white transition-all">
              Voltar à Loja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center border border-zinc-900 p-8 bg-zinc-950 gap-6 transition-all hover:border-zinc-700">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black uppercase text-orange-500 italic">{item.nome}</h2>
                  
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <p className="bg-zinc-900 px-3 py-1 border border-zinc-800">
                      Tamanho: <span className="text-white">{item.tamanho}</span>
                    </p>
                    
                    {/* EXIBIÇÃO DA PERSONALIZAÇÃO */}
                    <p className="bg-zinc-900 px-3 py-1 border border-zinc-800">
                      Nome: <span className="text-white">{item.nomePersonalizado || 'N/A'}</span>
                    </p>
                    <p className="bg-zinc-900 px-3 py-1 border border-zinc-800">
                      Número: <span className="text-white">{item.numeroPersonalizado || '00'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                  <p className="text-3xl font-black tracking-tighter italic">
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <button 
                    onClick={() => removerItem(item.id)} 
                    className="text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    Remover Item
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t-4 border-orange-500 pt-8 flex flex-col items-end">
              <div className="text-right mb-8">
                <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-1">Subtotal do Equipamento</p>
                <h3 className="text-5xl font-black uppercase tracking-tighter italic">
                  Total: <span className="text-orange-500">R$ {total.toFixed(2).replace('.', ',')}</span>
                </h3>
              </div>
              
              <button 
                onClick={finalizarCompra}
                disabled={carregando}
                className={`bg-white text-black font-black uppercase tracking-[0.2em] py-6 px-16 transition-all text-xl w-full md:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)] 
                  ${carregando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-black active:scale-95'}`}
              >
                {carregando ? 'Iniciando Checkout...' : 'Finalizar Compra'}
              </button>
              
              <p className="mt-4 text-[9px] text-zinc-600 uppercase tracking-widest">
                Pagamento processado via Mercado Pago • Ambiente Seguro
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}