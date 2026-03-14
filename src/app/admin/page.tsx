"use client";

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import Link from 'next/link';

export default function PainelVendas() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarPedidos = async () => {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setPedidos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarPedidos();

    // REAL-TIME: O "radar" da Alavanca Store
    const canal = supabase
      .channel('vendas_realtime')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'pedidos' }, 
        (payload) => {
          setPedidos((atual) => [payload.new, ...atual]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(canal); };
  }, []);

  const atualizarStatus = async (id: string, novoStatus: string) => {
    await supabase.from('pedidos').update({ status: novoStatus }).eq('id', id);
    carregarPedidos();
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-orange-500 font-black italic">CONECTANDO AO RADAR DE VENDAS...</div>;

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12 border-l-8 border-orange-500 pl-6">
          <div>
            <h1 className="text-5xl font-black uppercase italic leading-none text-white">
              Painel de <span className="text-orange-500">Vendas</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-2">Monitoramento em Tempo Real</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black italic text-white">{pedidos.length}</p>
            <p className="text-[10px] font-black uppercase text-zinc-600">Pedidos Totais</p>
          </div>
        </header>

        <div className="space-y-4">
          {pedidos.length === 0 ? (
            <div className="border border-zinc-900 p-20 text-center bg-zinc-950">
              <p className="text-zinc-600 font-black uppercase tracking-widest italic">Aguardando a primeira venda da Alavanca...</p>
            </div>
          ) : (
            pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col lg:flex-row justify-between gap-8 hover:border-orange-500/40 transition-all group">
                
                {/* STATUS E DATA */}
                <div className="min-w-[200px] space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full animate-pulse ${pedido.status === 'pendente' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{pedido.status}</span>
                  </div>
                  <h2 className="text-xl font-black uppercase italic">ID #{pedido.id.slice(0, 8)}</h2>
                  <p className="text-[10px] font-bold text-zinc-700 uppercase">{new Date(pedido.created_at).toLocaleString('pt-BR')}</p>
                  
                  <select 
                    onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                    value={pedido.status}
                    className="w-full bg-black border border-zinc-800 p-2 text-[10px] font-black uppercase text-orange-500 outline-none focus:border-orange-500"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                    <option value="produzindo">Em Produção</option>
                    <option value="enviado">Enviado</option>
                  </select>
                </div>

                {/* DETALHES DOS PRODUTOS */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pedido.itens?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-zinc-900/30 p-4 border border-zinc-800/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-1 bg-orange-500/10 text-orange-500 text-[8px] font-black">X1</div>
                      <p className="font-black uppercase text-xs mb-2 text-zinc-300">{item.nome}</p>
                      <div className="flex gap-4 text-[9px] font-bold uppercase text-zinc-500">
                        <span>Tam: <b className="text-white">{item.tamanho}</b></span>
                        <span>Personalização: <b className="text-white">{item.nomePersonalizado || 'N/A'} - {item.numeroPersonalizado || '00'}</b></span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FINANCEIRO */}
                <div className="lg:text-right flex flex-col justify-center lg:border-l border-zinc-900 lg:pl-12 min-w-[150px]">
                  <p className="text-zinc-600 uppercase text-[9px] font-black mb-1">Total do Pedido</p>
                  <p className="text-3xl font-black italic text-orange-500">R$ {pedido.total?.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}