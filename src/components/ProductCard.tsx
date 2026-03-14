"use client";
import Image from 'next/image';
import { Produto } from '@/constants/products';

export default function ProductCard({ produto }: { produto: Produto }) {
  return (
    <div className="group bg-zinc-950 border border-zinc-900 overflow-hidden hover:border-orange-500 transition-all duration-500">
      <div className="relative h-80 w-full overflow-hidden">
        <Image 
          src={produto.imagem} 
          alt={produto.nome}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>
      
      <div className="p-6">
        <span className="text-xs uppercase tracking-widest text-zinc-500">{produto.categoria}</span>
        <h3 className="text-xl font-black uppercase text-white mt-1 group-hover:text-orange-500 transition-colors">
          {produto.nome}
        </h3>
        <p className="text-orange-500 font-bold text-2xl mt-2">
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </p>
        
        <button className="w-full mt-6 bg-white text-black font-black uppercase py-3 tracking-tighter hover:bg-orange-500 transition-colors">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}