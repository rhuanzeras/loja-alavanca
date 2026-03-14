import Link from 'next/link';
import Image from 'next/image';

// Simulando nossos produtos com foco esportivo e premiações
const produtos = [
  { id: 1, nome: 'Camisa de Futebol Oficial', preco: 'R$ 149,90', categoria: 'FUTEBOL' },
  { id: 2, nome: 'Troféu em Acrílico - 1º Lugar', preco: 'R$ 89,90', categoria: 'PREMIAÇÃO' },
  { id: 3, nome: 'Medalha de Xadrez Premium', preco: 'R$ 25,00', categoria: 'JOGOS' },
  { id: 4, nome: 'Camisa Vôlei Minimalista', preco: 'R$ 79,90', categoria: 'VÔLEI' },
];

export default function Home() {
  return (
    // Colocamos o text-orange-500 aqui para que todo o texto do site puxe o laranja por padrão
    <main className="min-h-screen bg-black text-orange-500 font-sans">
      
     

      {/* Hero Section */}
      <header className="relative w-full h-[70vh] bg-zinc-950 flex flex-col items-center justify-center text-center p-8 border-b border-zinc-900">
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
            Domine o <br/> Jogo
          </h1>
          <p className="text-lg opacity-80 mb-10 max-w-2xl font-medium">
            Venha mostrar que você é um verdadeiro fã da atlética que mais vence.
          </p>
          
          {/* BOTÃO BRANCO COM TEXTO LARANJA */}
          <Link href="#produtos" className="bg-white text-orange-500 font-black uppercase tracking-widest py-4 px-10 hover:bg-gray-200 transition-all hover:scale-105 duration-200">
            Comprar Agora
          </Link>
        </div>
      </header>

      {/* Seção de Produtos */}
      <section id="produtos" className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Destaques
          </h2>
          <Link href="#" className="text-sm font-bold underline hover:text-white transition hidden md:block uppercase tracking-wider">
            Ver tudo
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {produtos.map((produto) => (
            <div key={produto.id} className="group cursor-pointer flex flex-col">
              <div className="w-full aspect-square bg-zinc-900 flex items-center justify-center text-zinc-800 text-6xl group-hover:bg-zinc-800 transition-colors duration-300 relative overflow-hidden">
                 
                 {/* ETIQUETA BRANCA COM TEXTO LARANJA */}
                 <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-white text-orange-500 px-3 py-1 z-10">
                    {produto.categoria}
                 </span>
                 
                 <span className="group-hover:scale-110 transition-transform duration-500">IMG</span>
              </div>
              
              <div className="pt-5 pb-6">
                <h3 className="text-lg font-bold group-hover:text-white transition-colors mb-1 uppercase tracking-tight">
                  {produto.nome}
                </h3>
                <p className="font-medium text-lg opacity-90">{produto.preco}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
}