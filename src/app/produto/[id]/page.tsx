"use client";

import { use, useState, useEffect } from "react";
import { PRODUTOS } from '@/constants/products';
import { useCartStore } from '@/store/cartStore';
import supabase from '@/lib/supabase'; //

export default function PaginaProduto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const produto = PRODUTOS.find(p => p.id === resolvedParams.id);
  const adicionarAoCarrinho = useCartStore((state) => state.adicionarItem);

  // ESTADOS GERAIS
  const [tamanho, setTamanho] = useState('G');
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(produto?.opcoes ? produto.opcoes[0] : null);
  
  // ESTADO DE ESTOQUE (Tempo Real)
  const [estoque, setEstoque] = useState<number | null>(null);

  // LOGICA DE TEMPO REAL
  useEffect(() => {
    if (!produto) return;

    // 1. Busca inicial do estoque
    const buscarEstoqueInicial = async () => {
      const { data } = await supabase
        .from('estoque')
        .select('quantidade')
        .eq('produto_id', produto.id)
        .single();
      
      if (data) setEstoque(data.quantidade);
    };

    buscarEstoqueInicial();

    // 2. Ouvir mudanças em tempo real
    const canal = supabase
      .channel(`estoque-${produto.id}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'estoque',
        filter: `produto_id=eq.${produto.id}` 
      }, (payload) => {
        setEstoque(payload.new.quantidade);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [produto]);

  if (!produto) return <div className="text-white p-8">Produto não encontrado.</div>;

  const precoFinal = opcaoSelecionada ? opcaoSelecionada.preco : produto.preco;
  const esgotado = estoque !== null && estoque <= 0;

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col md:flex-row gap-12 items-center justify-center">
      <div className="w-full max-w-md">
        <img src={produto.imagem} alt={produto.nome} className="w-full border border-zinc-900 shadow-2xl" />
      </div>

      <div className="max-w-md w-full">
        <h1 className="text-5xl font-black uppercase text-orange-500 italic mb-2 leading-none">{produto.nome}</h1>
        
        {/* STATUS DE ESTOQUE */}
        <div className="mb-4">
          {estoque === null ? (
            <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Sincronizando estoque...</span>
          ) : esgotado ? (
            <span className="text-[10px] bg-red-600 text-white px-2 py-1 font-black uppercase tracking-widest">Esgotado</span>
          ) : (
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
              Estoque disponível: <span className="text-orange-500">{estoque} unidades</span>
            </span>
          )}
        </div>

        <p className="text-zinc-400 mb-8">{produto.descricao}</p>

        {/* --- SE FOR CAMISA: MOSTRA TAMANHOS --- */}
        {produto.tipo === 'camisa' && (
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest mb-3 text-zinc-500 font-black">Tamanho</p>
            <div className="flex gap-3 flex-wrap">
              {['PP', 'P', 'M', 'G', 'GG', 'XG'].map((t) => (
                <button key={t} onClick={() => setTamanho(t)}
                  className={`w-12 h-12 border-2 font-black transition-all ${tamanho === t ? 'bg-orange-500 border-orange-500 text-black' : 'border-zinc-800 hover:border-orange-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- SE FOR ACESSÓRIO: MOSTRA OPÇÕES DE KIT --- */}
        {produto.tipo === 'acessorio' && produto.opcoes && (
          <div className="mb-8 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Escolha sua Opção</p>
            {produto.opcoes.map((opcao) => (
              <button key={opcao.label} onClick={() => setOpcaoSelecionada(opcao)}
                className={`w-full p-4 border-2 text-left font-bold uppercase tracking-widest transition-all ${opcaoSelecionada?.label === opcao.label ? 'border-orange-500 bg-orange-500 text-black' : 'border-zinc-800 hover:border-orange-700'}`}
              >
                <div className="flex justify-between">
                  <span>{opcao.label}</span>
                  <span>R$ {opcao.preco.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* --- PERSONALIZAÇÃO --- */}
        <div className="mb-8 space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Personalização</p>

          {produto.tipo === 'camisa' && (
          <input 
            type="text" 
            placeholder="NOME NA GRAVAÇÃO/ESTAMPA" 
            value={nome}
            onChange={(e) => setNome(e.target.value.toUpperCase())} // CORRIGIDO: Agora altera o estado 'nome'
            className="w-full bg-zinc-950 border-2 border-zinc-800 p-4 font-bold uppercase tracking-widest focus:border-orange-500 outline-none"
          />
)}
          
          {produto.tipo === 'camisa' && (
            <input 
              type="text" 
              maxLength={2} 
              placeholder="NÚMERO" 
              value={numero}
              onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))}
              className="w-40 bg-zinc-950 border-2 border-zinc-800 p-4 font-bold uppercase tracking-widest focus:border-orange-500 outline-none"
            />
          )}
        </div>

        <p className="text-5xl font-black mb-8 italic">R$ {precoFinal.toFixed(2).replace('.', ',')}</p>

        <button 
          disabled={esgotado}
          onClick={() => {
            adicionarAoCarrinho({
              ...produto,
              id: opcaoSelecionada ? `${produto.id}-${opcaoSelecionada.label}` : produto.id,
              nome: opcaoSelecionada ? `${produto.nome} (${opcaoSelecionada.label})` : produto.nome,
              preco: precoFinal,
              tamanho: produto.tipo === 'camisa' ? tamanho : 'ÚNICO',
              nomePersonalizado: nome || 'SEM NOME',
              numeroPersonalizado: produto.tipo === 'camisa' ? (numero || '00') : 'N/A'
            });
            alert("ADICIONADO AO CARRINHO!");
          }}
          className={`w-full font-black uppercase py-6 tracking-[0.2em] transition-all duration-300 shadow-lg 
            ${esgotado ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-orange-500 hover:text-white active:scale-95'}`}
        >
          {esgotado ? "Produto Esgotado" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </main>
  );
}