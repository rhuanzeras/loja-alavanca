"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import supabase from '@/lib/supabase'; // Importação padrão corrigida

export default function Carrinho() {
  const { items, removerItem, clearCart } = useCartStore();
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const total = items.reduce((soma, item) => soma + item.preco, 0);

  const finalizarCompra = async () => {
    if (items.length === 0) return;

    setCarregando(true);
    try {
      // 1. VERIFICAR USUÁRIO (Obrigatório para rastreio)
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Você precisa estar logado para finalizar a compra!");
        router.push('/login');
        return;
      }

      // 2. SALVAR O PEDIDO NO RADAR DO ADMIN
      // Isso faz o pedido "pular" no seu Painel de Vendas instantaneamente
      const { error: dbError } = await supabase
        .from('pedidos')
        .insert([{
          user_id: user.id,
          itens: items, // Grava Nome, Tamanho e Personalização
          total: total,
          status: 'pendente' // Começa como pendente até o Mercado Pago avisar
        }]);

      if (dbError) throw dbError;

      // 3. GERAR O CHECKOUT DO MERCADO PAGO
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Limpa o carrinho local antes de sair para o pagamento
        clearCart(); 
        window.location.href = data.init_point;
      } else {
        alert("Erro ao gerar link de pagamento.");
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      alert("Houve um problema técnico. Tente novamente em instantes.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans p-8 pt-24">
      <div className="max-w-[1000px] mx-auto py-12">
        <header className="border-l-8 border-orange-500 pl-6 mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic text-white">
            Seu <span className="text-orange-500">Carrinho</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Equipamento em preparação</p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-24 border border-zinc-900 bg-zinc-950/50">
            <p className="text-sm mb-8 text-zinc-500 uppercase font-black tracking-widest">Seu arsenal está vazio.</p>
            <Link href="/" className="inline-block bg-white text-black font-black uppercase tracking-widest py-4 px-12 hover:bg-orange-500 hover:text-white transition-all">
              Voltar à Loja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex flex-col md:flex-row justify-between items-start md:items-center border border-zinc-900 p-8 bg-zinc-950 gap-6 transition-all hover:border-orange-500/30 group">
                <div className="space-y-3">
                  <h2 className="text-2xl font-black uppercase text-white italic group-hover:text-orange-500 transition-colors">{item.nome}</h2>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-zinc-900 px-3 py-1 border border-zinc-800 text-[10px] font-black uppercase text-zinc-400">
                      Tam: <span className="text-white">{item.tamanho}</span>
                    </span>
                    {item.nomePersonalizado && (
                      <span className="bg-zinc-900 px-3 py-1 border border-zinc-800 text-[10px] font-black uppercase text-zinc-400">
                        Nome: <span className="text-white">{item.nomePersonalizado}</span>
                      </span>
                    )}
                    {item.numeroPersonalizado && (
                       <span className="bg-zinc-900 px-3 py-1 border border-zinc-800 text-[10px] font-black uppercase text-zinc-400">
                        Nº: <span className="text-white">{item.numeroPersonalizado}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                  <p className="text-3xl font-black tracking-tighter italic text-white">
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <button 
                    onClick={() => removerItem(item.id)} 
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-700 hover:text-red-500 transition-colors underline"
                  >
                    [ Remover ]
                  </button>
                </div>
              </div>
            ))}

            {/* RESUMO E FINALIZAÇÃO */}
            <div className="mt-12 border-t-4 border-orange-500 pt-12 flex flex-col items-end">
              <div className="text-right mb-10">
                <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.4em] mb-2 text-right">Valor Total do Pedido</p>
                <h3 className="text-7xl font-black uppercase tracking-tighter italic leading-none">
                  R$ {total.toFixed(2).replace('.', ',')}
                </h3>
              </div>
              
              <button 
                onClick={finalizarCompra}
                disabled={carregando}
                className={`bg-white text-black font-black uppercase tracking-[0.2em] py-6 px-20 transition-all text-xl w-full md:w-auto
                  ${carregando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500 hover:text-white active:scale-95'}`}
              >
                {carregando ? 'PROCESSANDO...' : 'FINALIZAR COMPRA'}
              </button>
              
              <p className="mt-6 text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
                🔒 Pagamento Criptografado via Mercado Pago
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}