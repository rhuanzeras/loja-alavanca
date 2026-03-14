"use client";

import { useState } from 'react';

export default function Contatos() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="mb-16">
          <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">
            Suporte ao Atleta
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
            FALE COM A <br />
            <span className="text-orange-500">ALAVANCA</span>
          </h1>
          <p className="text-zinc-500 max-w-xl uppercase font-bold tracking-widest text-sm">
            Dúvidas sobre tamanhos, entregas ou pedidos personalizados? Nossa equipe está pronta para te atender.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARD WHATSAPP */}
          <a 
            href="https://wa.me/+5587991522785" 
            target="_blank"
            className="group bg-zinc-950 border border-zinc-900 p-10 hover:border-orange-500 transition-all duration-500 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">WhatsApp</h3>
            <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-bold">Atendimento Direto</p>
            <span className="bg-white text-black font-black py-2 px-6 uppercase text-xs group-hover:bg-orange-500 transition-colors">
              Chamar Agora
            </span>
          </a>

          {/* CARD INSTAGRAM */}
          <a 
            href="https://instagram.com/aaa_alavanca" 
            target="_blank"
            className="group bg-zinc-950 border border-zinc-900 p-10 hover:border-orange-500 transition-all duration-500 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">Instagram</h3>
            <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-bold">Novidades e Lançamentos</p>
            <span className="bg-white text-black font-black py-2 px-6 uppercase text-xs group-hover:bg-orange-500 transition-colors">
              Seguir Alavanca
            </span>
          </a>

          {/* CARD LOCALIZAÇÃO/RETIRADA */}
          <div className="group bg-zinc-950 border border-zinc-900 p-10 hover:border-orange-500 transition-all duration-500 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">Retirada</h3>
            <p className="text-zinc-500 text-sm mb-4 uppercase tracking-widest font-bold">Univasf Campus Petrolina</p>
            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">
              Segunda a Sexta • Horário a combinar
            </p>
          </div>

        </div>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <div className="mt-32">
          <h2 className="text-3xl font-black uppercase italic mb-12 border-l-8 border-orange-500 pl-6">Dúvidas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 p-6 border border-zinc-900">
              <h4 className="text-orange-500 font-black uppercase text-sm mb-2 italic">Qual o prazo de produção?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed uppercase font-bold tracking-tighter">
                As camisas personalizadas levam de 10 a 15 dias úteis para ficarem prontas após a confirmação do pagamento, a depender da fábrica contratada.
              </p>
            </div>
            <div className="bg-zinc-950 p-6 border border-zinc-900">
              <h4 className="text-orange-500 font-black uppercase text-sm mb-2 italic">Como funciona a personalização?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed uppercase font-bold tracking-tighter">
                Você preenche o nome e número na página do produto.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}