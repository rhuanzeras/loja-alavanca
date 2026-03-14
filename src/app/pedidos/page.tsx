"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import Link from 'next/link';

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const carregarPedidos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return router.push('/login');
      }

      const { data: orders, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (orders) setPedidos(orders);
      setLoading(false);
    };

    carregarPedidos();
  }, [router]);

  // Função para calcular o prazo (Ex: 15 dias úteis após a compra)
  const calcularPrazo = (dataCriacao: string) => {
    const data = new Date(dataCriacao);
    data.setDate(data.getDate() + 15); // Adiciona 15 dias de produção/entrega
    return data.toLocaleDateString('pt-BR');
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white p-6 pt-24 md:p-12 md:pt-32">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <header className="mb-12 border-l-8 border-white pl-6">
          <h1 className="text-5xl font-black uppercase italic leading-none">
            Rastreio de <span className="text-orange-500">pedidos</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-2">Acompanhe a produção e entrega do seu equipamento</p>
        </header>

        {pedidos.length === 0 ? (
          <div className="bg-zinc-950 border border-zinc-900 p-20 text-center">
            <p className="text-zinc-600 font-black uppercase italic tracking-widest text-sm">Nenhum pedido encontrado no seu CPF/E-mail.</p>
            <Link href="/" className="inline-block mt-8 bg-orange-500 text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-all">
              Ir para a Loja
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-zinc-950 border border-zinc-900 overflow-hidden group hover:border-orange-500/50 transition-all">
                
                {/* BARRA SUPERIOR DO CARD */}
                <div className="bg-zinc-900/50 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-zinc-900">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Pedido <span className="text-white">#{pedido.id.slice(0, 8)}</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Realizado em: <span className="text-white">{new Date(pedido.created_at).toLocaleDateString('pt-BR')}</span>
                  </span>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                  
                  {/* COLUNA 1: PRODUTOS */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Itens do Pedido</h3>
                    <div className="space-y-2">
                      {pedido.itens?.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between border-b border-zinc-900 pb-2">
                          <p className="text-sm font-bold uppercase italic">{item.nome} <span className="text-zinc-500">({item.tamanho})</span></p>
                          <p className="text-sm font-black">x1</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COLUNA 2: STATUS DE PAGAMENTO */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Financeiro</h3>
                    <div className="bg-black p-4 border border-zinc-900">
                      <p className="text-[9px] text-zinc-600 font-black uppercase mb-1">Status de Pagamento</p>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${pedido.status === 'pago' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                        <p className="font-black uppercase italic text-sm">{pedido.status}</p>
                      </div>
                      <p className="mt-4 text-[9px] text-zinc-600 font-black uppercase mb-1">Total Pago</p>
                      <p className="font-black text-lg text-white">R$ {pedido.total?.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  {/* COLUNA 3: ENTREGA */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Logística</h3>
                    <div className="bg-zinc-900/20 p-4 border border-zinc-900">
                      <p className="text-[9px] text-zinc-600 font-black uppercase mb-1">Previsão de Entrega</p>
                      <p className="font-black text-white text-lg italic">Até {calcularPrazo(pedido.created_at)}</p>
                      
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <p className="text-[8px] text-zinc-500 font-bold leading-tight uppercase">
                          * O prazo pode variar conforme a produção do lote da atlética.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* FOOTER DO CARD */}
                <div className="bg-zinc-900/30 px-8 py-3 flex justify-end">
                   <Link href="/contatos" className="text-[9px] font-black uppercase tracking-tighter text-zinc-600 hover:text-white transition-colors">
                     Teve algum problema? [ Chamar no WhatsApp ]
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
