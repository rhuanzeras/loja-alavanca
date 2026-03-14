"use client"; // Diz ao Next.js que esta página tem interatividade (botões, inputs)

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore'; // <-- Importação do nosso carrinho global

export default function ProdutoDetalhes() {
  // Guardando as escolhas do cliente
  const [tamanho, setTamanho] = useState('');
  const [nomePersonalizado, setNomePersonalizado] = useState('');
  const [numeroPersonalizado, setNumeroPersonalizado] = useState('');

  // Puxando a função de adicionar da nossa "memória global"
  const adicionarItem = useCartStore((state) => state.adicionarItem);

  // Função para adicionar ao carrinho real
  const adicionarAoCarrinho = () => {
    if (!tamanho) {
      alert("Por favor, selecione um tamanho!");
      return;
    }
    
    // Dispara o item para a memória global do Zustand
    adicionarItem({
      id: Date.now().toString(), // Gera um ID único baseado na data/hora
      nome: 'Camisa de Futebol Oficial',
      preco: 149.90,
      tamanho,
      nomePersonalizado: nomePersonalizado || 'Sem nome',
      numeroPersonalizado: numeroPersonalizado || 'Sem número',
      quantidade: 1
    });
    
    alert("Produto adicionado ao carrinho da Alavanca!");
  };

  return (
    <main className="min-h-screen bg-black text-orange-500 font-sans pb-20">
      
      {/* Navegação Simples (Voltar) */}
      <nav className="p-8 border-b border-zinc-900">
        <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-white transition flex items-center gap-2">
          <span>← Voltar para a loja</span>
        </Link>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        
        {/* LADO ESQUERDO: Imagem do Produto */}
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-[4/5] bg-zinc-900 flex items-center justify-center text-zinc-800 text-6xl relative">
            <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-white text-orange-500 px-3 py-1">
              Futebol
            </span>
            <span>FOTO DA CAMISA</span>
          </div>
        </div>

        {/* LADO DIREITO: Informações e Compra */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            Camisa de Futebol Oficial
          </h1>
          <p className="text-2xl font-bold mb-8 opacity-90">R$ 149,90</p>

          <p className="text-lg opacity-80 mb-10">
            Vista as cores da Alavanca. Camisa de alta performance, tecido respirável e corte atlético. Personalize com seu nome e número para dominar o jogo.
          </p>

          {/* SELEÇÃO DE TAMANHO */}
          <div className="mb-8">
            <p className="font-bold uppercase tracking-widest mb-3">Tamanho</p>
            <div className="flex gap-3">
              {['P', 'M', 'G', 'GG'].map((size) => (
                <button
                  key={size}
                  onClick={() => setTamanho(size)}
                  className={`w-12 h-12 flex items-center justify-center font-bold uppercase transition-all border-2 
                    ${tamanho === size 
                      ? 'bg-white text-orange-500 border-white scale-110' // Selecionado: Branco
                      : 'bg-transparent text-orange-500 border-orange-500 hover:bg-zinc-900' // Não selecionado: Vazado laranja
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* PERSONALIZAÇÃO (Inputs de texto) */}
          <div className="mb-10 p-6 border border-zinc-800 bg-zinc-950">
            <p className="font-bold uppercase tracking-widest mb-4">Personalização (Opcional)</p>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm uppercase tracking-wider mb-1 opacity-80">Nome nas costas</label>
                <input 
                  type="text" 
                  placeholder="Ex: ALAVANCA"
                  value={nomePersonalizado}
                  onChange={(e) => setNomePersonalizado(e.target.value)}
                  className="w-full bg-black border border-orange-500 text-orange-500 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-orange-800/50 uppercase"
                  maxLength={15}
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider mb-1 opacity-80">Número</label>
                <input 
                  type="number" 
                  placeholder="Ex: 10"
                  value={numeroPersonalizado}
                  onChange={(e) => setNumeroPersonalizado(e.target.value)}
                  className="w-full bg-black border border-orange-500 text-orange-500 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-orange-800/50"
                  min="0"
                  max="99"
                />
              </div>
            </div>
          </div>

          {/* BOTÃO DE COMPRAR */}
          <button 
            onClick={adicionarAoCarrinho}
            className="w-full bg-white text-orange-500 font-black uppercase tracking-widest py-5 hover:bg-gray-200 transition-all active:scale-95 text-xl"
          >
            Adicionar ao Carrinho
          </button>

        </div>
      </div>
    </main>
  );
}