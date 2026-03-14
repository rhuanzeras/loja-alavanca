"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import supabase from '@/lib/supabase';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Para evitar erros de hidratação
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { items } = useCartStore();
  const totalItens = items.length;
  const router = useRouter();

  const ADMIN_EMAIL = "admalavanca@corujete.com";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);

    // BUSCA DE SESSÃO MELHORADA
    const initAuth = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
        setUser(session?.user ?? null);
        if (!session) setIsMenuOpen(false);
      });

      return subscription;
    };

    const authSub = initAuth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
      authSub.then(sub => sub.unsubscribe());
    };
  }, []);

  // Só renderiza os dados do usuário após o componente estar "montado" no navegador
  if (!mounted) return null;

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/95 backdrop-blur-md border-b border-zinc-900 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4 group text-white">
          <div className="relative w-12 h-12 p-1 transition-transform group-hover:scale-110">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black italic tracking-tighter uppercase">
              ALAVANCA<span className="text-orange-500">STORE</span>
            </span>
          </div>
        </Link>

        {/* NAVEGAÇÃO E BOTÕES */}
        <div className="flex items-center gap-4 md:gap-8">
          
          <div className="hidden md:flex gap-6 items-center border-r border-zinc-800 pr-8 font-black uppercase tracking-widest text-[10px]">
            <Link href="/quem-somos" className="text-zinc-400 hover:text-orange-500 transition-colors">Quem Somos?</Link>
            <Link href="/conquistas" className="text-zinc-400 hover:text-orange-500 transition-colors">Conquistas</Link>
            <Link href="/contatos" className="text-zinc-400 hover:text-orange-500 transition-colors">Contatos</Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4 relative" ref={menuRef}>
            
            {/* ÁREA DO PERFIL */}
            <div className="relative">
              <button 
                onClick={() => {
                  console.log("Usuário atual:", user); // Log para você ver no F12 se ele te reconheceu
                  if (user) {
                    setIsMenuOpen(!isMenuOpen);
                  } else {
                    router.push('/login');
                  }
                }}
                className={`p-2 transition-all hover:scale-110 outline-none ${user ? 'text-orange-500' : 'text-white hover:text-orange-500'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* JANELA FLUTUANTE - AQUI ESTÁ O REPARO */}
              {isMenuOpen && user && (
                <div className="absolute right-0 mt-4 w-60 bg-zinc-950 border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.9)] py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-zinc-900 mb-1">
                    <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">
                      {isAdmin ? 'Acesso Administrativo' : 'Área do Atleta'}
                    </p>
                    <p className="text-[11px] font-bold text-white truncate">{user.email}</p>
                  </div>

                  {/* OPÇÕES PARA TODOS OS LOGADOS (ATLETAS E ADMINS) */}
                  <Link href="/perfil" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-900 hover:text-orange-500">
                    Minha Conta
                  </Link>
                  
                  <Link href="/pedidos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-zinc-900 hover:text-orange-500">
                    Meus Pedidos
                  </Link>

                  {/* OPÇÕES EXCLUSIVAS PARA ADMIN */}
                  {isAdmin && (
                    <div className="mt-1 border-t border-orange-500/20 pt-1">
                      <Link href="/admin/produtos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:bg-orange-500 hover:text-black">
                        Gerenciar Produtos
                      </Link>
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:bg-orange-500 hover:text-black">
                        Painel de Vendas
                      </Link>
                    </div>
                  )}

                  <button 
                    onClick={handleLogout}
                    className="w-full text-left mt-1 border-t border-zinc-900 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10"
                  >
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>

            {/* CARRINHO */}
            <Link href="/carrinho" className="relative group flex items-center bg-white text-black px-4 py-2 md:py-3 font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">Carrinho</span>
              {totalItens > 0 && (
                <span className="ml-2 bg-orange-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] animate-bounce">
                  {totalItens}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}