"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

export default function Perfil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const carregarPerfil = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return router.push('/login');
      }

      setUser(session.user);
      setLoading(false);
    };

    carregarPerfil();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-orange-500 font-black italic uppercase tracking-widest">
      Acessando Cadastro...
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-32 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO DA CONTA */}
        <div className="flex justify-between items-end mb-16 border-l-8 border-orange-500 pl-6">
          <div>
            <h1 className="text-5xl font-black uppercase italic leading-none text-white">
              Meu <span className="text-orange-500">Cadastro</span>
            </h1>
            <p className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Dados de Identificação do Atleta</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 transition-colors underline"
          >
            [ Encerrar Sessão ]
          </button>
        </div>

        <section className="grid md:grid-cols-2 gap-8">
          
          {/* CARTÃO: IDENTIFICAÇÃO */}
          <div className="bg-zinc-950 border border-zinc-900 p-8 space-y-6 relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="absolute top-0 right-0 p-2 bg-zinc-900 text-zinc-700 font-black text-[8px] uppercase tracking-widest">
              ID: {user?.id.slice(0, 8)}
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 italic">Informações Base</h2>
              
              <div>
                <label className="text-[9px] text-zinc-600 uppercase font-black mb-1 block">E-mail de Login</label>
                <p className="font-bold text-lg text-zinc-200">{user?.email}</p>
              </div>

              <div>
                <label className="text-[9px] text-zinc-600 uppercase font-black mb-1 block">Data de Ingresso</label>
                <p className="font-bold text-sm text-zinc-400">
                  {new Date(user?.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* CARTÃO: SEGURANÇA E SUPORTE */}
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 p-8">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 italic mb-4">Segurança</h2>
              <p className="text-[10px] text-zinc-500 uppercase leading-relaxed font-bold">
                Sua autenticação é protegida via <span className="text-white">Supabase Auth</span>. 
                Para alterar sua senha ou atualizar dados sensíveis, entre em contato com a gestão da Alavanca Store.
              </p>
            </div>

            <div className="p-8 border-2 border-dashed border-zinc-900 flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Precisa de Suporte Técnico?</p>
              <a href="/contatos" className="text-[10px] text-orange-500 font-black uppercase underline mt-2 hover:text-white transition-colors">Abrir chamado no WhatsApp</a>
            </div>
          </div>

        </section>

        {/* NOTA DE RODAPÉ */}
        <footer className="mt-12 pt-8 border-t border-zinc-900">
            <p className="text-[8px] text-zinc-700 font-bold uppercase tracking-[0.4em] text-center">
                Alavanca Store &copy; 2026 - Proteção de Dados e Privacidade
            </p>
        </footer>
      </div>
    </main>
  );
}