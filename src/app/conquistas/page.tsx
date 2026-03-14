import { CONQUISTAS } from '@/constants/achievements';

export default function Conquistas() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* CABEÇALHO DA PÁGINA */}
        <div className="mb-20">
          <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">
            Nossa História de Luta
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
            GALERIA DE <br />
            <span className="text-orange-500 text-outline">VITÓRIAS</span>
          </h1>
          <div className="h-2 w-24 bg-orange-500"></div>
        </div>

        {/* GRADE DE TROFÉUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONQUISTAS.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-zinc-950 border border-zinc-900 p-8 hover:border-orange-500 transition-all duration-500 overflow-hidden"
            >
              {/* Efeito de brilho ao fundo */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>

              <div className="relative z-10">
                <p className={`text-4xl font-black italic mb-2 ${item.cor}`}>
                  {item.posicao}
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">
                  {item.titulo}
                </h3>
                <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
                  {item.evento}
                </p>
                
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  {item.descricao}
                </p>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Categoria: {item.categoria}
                  </span>
                </div>
              </div>

              {/* Detalhe estético: número no fundo */}
              <span className="absolute bottom-[-20px] right-2 text-9xl font-black text-white/[0.03] italic pointer-events-none">
                {item.posicao.split('º')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* MENSAGEM DE INCENTIVO */}
        <div className="mt-32 text-center border-t border-zinc-900 pt-20">
          <h2 className="text-3xl font-black uppercase italic mb-4">O Próximo Troféu pode ser seu</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-10 uppercase tracking-widest text-sm font-bold">
            Faça parte da nossa história. Jogue com os produtos oficiais e sinta o peso da Alavanca.
          </p>
          <a 
            href="/#produtos" 
            className="inline-block bg-white text-black font-black uppercase tracking-widest py-4 px-10 hover:bg-orange-500 transition-all"
          >
            Ver Coleção de Jogo
          </a>
        </div>

      </div>
    </main>
  );
}
