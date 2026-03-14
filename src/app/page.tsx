import Link from 'next/link';
import { PRODUTOS } from '@/constants/products';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      {/* BANNER ESTILO ADIDAS / ALAVANCA */}
      <section className="relative h-[90vh] w-full flex items-center justify-start overflow-hidden">
        {/* Imagem de Fundo - Dica: use uma foto da Camisa Laranja em ação aqui */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/produtos/banner-hero.jpg" 
            alt="Alavanca Training" 
            className="w-full h-full object-cover opacity-50"
          />
          {/* Gradiente mais denso para destacar o texto branco */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Conteúdo do Banner */}
        <div className="relative z-10 px-8 md:px-20 max-w-4xl">
          <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">
            Coleção
          </span>
          <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
            MOSTRE A SUA <br />
            <span className="text-orange-500">TORCIDA</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-zinc-400 font-bold uppercase tracking-tight max-w-lg leading-tight">
            PRODUTOS PARA ATLETAS E TORCEDORES QUE CARREGAM A ALAVANCA NO PEITO.
          </p>
          
          <div className="mt-12">
            <Link 
              href="#produtos" 
              className="bg-white text-black text-xl font-black uppercase px-14 py-6 hover:bg-orange-500 hover:text-white transition-all duration-300 inline-block shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform hover:-translate-y-1"
            >
              Compre Agora
            </Link>
          </div>
        </div>
      </section>

      {/* GRADE DE PRODUTOS */}
      <section id="produtos" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 border-l-8 border-orange-500 pl-6">
          <h2 className="text-5xl font-black uppercase italic text-white leading-none">
            Lançamentos
          </h2>
          <span className="text-zinc-600 font-bold uppercase tracking-widest text-xs hidden md:block">
            {PRODUTOS.length} PRODUTOS DISPONÍVEIS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PRODUTOS.map((produto) => (
            <Link 
              key={produto.id} 
              href={`/produto/${produto.id}`}
              className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-orange-500 transition-all duration-500"
            >
              {/* Container da Imagem */}
              <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                
                {/* Badge de Preço Flutuante Estilizado */}
                <div className="absolute bottom-0 left-0 bg-orange-500 px-4 py-2">
                  <p className="text-black font-black text-xl italic">
                    {produto.tipo === 'acessorio' ? 'A PARTIR DE ' : ''}
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>

              {/* Info do Produto */}
              <div className="p-6 bg-zinc-950 flex-grow border-t border-zinc-900">
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2 block">
                  {produto.tipo === 'camisa' ? 'Vestuário de Jogo' : 'Acessório Oficial'}
                </span>
                <h3 className="text-zinc-100 font-black uppercase text-2xl group-hover:text-orange-500 transition-colors leading-none mb-4">
                  {produto.nome}
                </h3>
                <div className="flex items-center text-white font-bold text-xs uppercase tracking-widest">
                  <span className="border-b-2 border-orange-500 pb-1">Ver Detalhes</span>
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RODAPÉ SIMPLES PARA FECHAR O VISUAL */}
      <footer className="py-20 border-t border-zinc-900 text-center">
        <p className="text-zinc-700 font-black uppercase tracking-[0.5em] text-sm">
          Alavanca Store © 2026 • Performance & Estilo
        </p>
      </footer>
    </main>
  );
}