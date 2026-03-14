import Link from 'next/link';

export default function Banner() {
  return (
    <section className="relative w-full h-[70vh] bg-zinc-950 flex items-center overflow-hidden border-b border-zinc-900">
      {/* Imagem de Fundo com Opacidade para não brigar com o texto */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/banner-hero.HEIC" 
          alt="Alavanca Performance" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm mb-4 block">
          Nova Coleção 2026
        </span>
        
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
          ALAVANQUE SEU <br />
          <span className="text-orange-500">DESEMPENHO</span>
        </h1>

        <p className="text-zinc-400 max-w-lg text-lg mb-10 uppercase font-medium tracking-wide">
          Equipamentos de alta performance para quem não aceita menos que o topo.
        </p>

        <Link 
          href="/produto/camisa-alavanca-laranja"
          className="inline-block bg-orange-500 text-black font-black uppercase tracking-widest py-5 px-12 hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
        >
          Garantir minha Pro Laranja
        </Link>
      </div>
    </section>
  );
}