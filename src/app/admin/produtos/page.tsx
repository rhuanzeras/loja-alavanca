"use client";

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase'; // CORREÇÃO: Import sem chaves { }
import Link from 'next/link';

export default function GerenciarProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('camisa');
  const [loading, setLoading] = useState(false);

  const fetchProdutos = async () => {
    const { data } = await supabase
      .from('produtos')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const adicionarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('produtos')
      .insert([{ 
        nome: nome.toUpperCase(), 
        preco: parseFloat(preco),
        categoria: categoria 
      }]);

    if (error) {
      alert("Erro ao cadastrar: " + error.message);
    } else {
      setNome('');
      setPreco('');
      fetchProdutos();
      alert("Equipamento cadastrado com sucesso!");
    }
    setLoading(false);
  };

  const deletarProduto = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este item do estoque?")) {
      const { error } = await supabase.from('produtos').delete().eq('id', id);
      if (error) alert("Erro ao deletar: " + error.message);
      else fetchProdutos();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-end mb-12 border-l-8 border-orange-500 pl-6">
          <h1 className="text-5xl font-black uppercase italic leading-none text-white">
            Gestão de <span className="text-orange-500">Estoque</span>
          </h1>
          <Link href="/admin" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white underline">
            [ Voltar para Vendas ]
          </Link>
        </div>

        {/* FORMULÁRIO DE CADASTRO */}
        <section className="bg-zinc-950 border border-zinc-900 p-8 mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 italic">Novo Equipamento</h2>
          <form onSubmit={adicionarProduto} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase text-zinc-600 mb-2 block">Nome da Peça</label>
              <input 
                value={nome} 
                onChange={e => setNome(e.target.value)}
                placeholder="EX: CAMISA TITULAR 2026"
                className="w-full bg-black border-2 border-zinc-900 p-4 font-bold outline-none focus:border-orange-500 transition-all uppercase"
                required 
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-zinc-600 mb-2 block">Preço (R$)</label>
              <input 
                type="number" 
                step="0.01" 
                value={preco} 
                onChange={e => setPreco(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border-2 border-zinc-900 p-4 font-bold outline-none focus:border-orange-500 transition-all"
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-white text-black font-black uppercase py-4 tracking-widest hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 h-[58px]"
            >
              {loading ? 'SALVANDO...' : 'CADASTRAR'}
            </button>
          </form>
        </section>

        {/* LISTAGEM DE PRODUTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map(p => (
            <div key={p.id} className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col justify-between group hover:border-orange-500/50 transition-all">
              <div className="mb-6">
                <span className="text-[9px] font-black bg-zinc-900 px-2 py-1 text-zinc-500 uppercase tracking-widest">Equipamento</span>
                <h3 className="text-2xl font-black uppercase italic mt-2 leading-tight">{p.nome}</h3>
                <p className="text-orange-500 font-black text-xl mt-1 italic">R$ {p.preco.toFixed(2).replace('.', ',')}</p>
              </div>
              
              <div className="flex justify-between items-center border-t border-zinc-900 pt-4">
                <span className="text-[9px] font-bold text-zinc-700 uppercase">Estoque: {p.estoque || 0}</span>
                <button 
                  onClick={() => deletarProduto(p.id)} 
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 transition-colors underline"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}