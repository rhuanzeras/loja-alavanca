import Link from 'next/link';
import { PRODUTOS } from '@/constants/products';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      {/* BANNER ESTILO ADIDAS */}
      <section className="relative h-[90vh] w-full flex items-center justify-start overflow-hidden">
        {/* Imagem de Fundo - Substitua pelo caminho da sua foto de modelo ou ação */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-banner.jpg" 
            alt="Alavanca Training" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        </div>

        {/* Conteúdo do Banner */}
        <div className="relative z-10 px-8 md:px-20 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
            ELEVE O SEU <br />
            <span className="text-orange-500">POTENCIAL</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-zinc-300 font-medium uppercase tracking-wide max-w-lg">
            Equipamentos de alta performance para quem vive a Educação Física.
          </p>
          
          <div className="mt-10">
            <Link 
              href="#produtos" 
              className="bg-white text-black text-xl font-black uppercase px-12 py-5 hover:bg-orange-500 hover:text-white transition-all duration-300 inline-block"
            >
              Compre Agora
            </Link>
          </div>
        </div>
      </section>

      {/* GRADE DE PRODUTOS */}
      <section id="produtos" className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black uppercase italic text-white mb-12 border-l-8 border-orange-500 pl-4">
          Lançamentos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PRODUTOS.map((produto) => (
            <Link 
              key={produto.id} 
              href={`/produto/${produto.id}`}
              className="group bg-zinc-950 border border-zinc-900 p-2 hover:border-orange-500 transition-all duration-500"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                {/* Badge de Preço Flutuante */}
                <div className="absolute bottom-4 left-4 bg-black px-3 py-1">
                  <p className="text-white font-bold text-lg">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-zinc-100 font-bold uppercase text-lg group-hover:text-orange-500 transition-colors">
                  {produto.nome}
                </h3>
                <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">Ver detalhes —&gt;</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}