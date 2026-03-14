"use client";

import { useState } from 'react';
import supabase from '@/lib/supabase'; // Sem as chaves!
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login e cadastro
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Estados dos campos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [contato, setContato] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // --- LÓGICA DE LOGIN ---
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Erro ao entrar: " + error.message);
      } else {
        // Se for o seu e-mail de admin, vai para o painel
        if (email === "admalavanca@corujete.com") router.push('/admin');
        else router.push('/');
      }
    } else {
      // --- LÓGICA DE CADASTRO ---
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        alert("Erro no cadastro: " + error.message);
      } else if (data.user) {
        // Salva dados extras na tabela 'perfis' que criamos
        const { error: profileError } = await supabase.from('perfis').insert([{
          id: data.user.id,
          nome_completo: nome.toUpperCase(),
          cpf,
          data_nascimento: nascimento,
          contato,
          email
        }]);

        if (profileError) alert("Erro ao salvar perfil: " + profileError.message);
        else {
          alert("Conta criada! Verifique seu e-mail para confirmar.");
          setIsLogin(true);
        }
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-[450px] bg-zinc-950 border border-zinc-900 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* ELEMENTO ESTÉTICO */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
            {isLogin ? 'Acesso ' : 'Cadastro '} 
            <span className="text-orange-500">{isLogin ? 'store' : 'de Elite'}</span>
          </h1>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Alavanca Store • official
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          
          {!isLogin && (
            <>
              <input type="text" placeholder="NOME COMPLETO" required
                onChange={e => setNome(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-4 font-bold uppercase text-sm outline-none focus:border-orange-500 transition-all" />
              
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="CPF" required
                  onChange={e => setCpf(e.target.value)}
                  className="bg-black border border-zinc-800 p-4 font-bold text-sm outline-none focus:border-orange-500" />
                <input type="date" required
                  onChange={e => setNascimento(e.target.value)}
                  className="bg-black border border-zinc-800 p-4 font-bold text-sm outline-none focus:border-orange-500 text-zinc-500" />
              </div>

              <input type="tel" placeholder="WHATSAPP" required
                onChange={e => setContato(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-4 font-bold text-sm outline-none focus:border-orange-500" />
            </>
          )}

          <input type="email" placeholder="E-MAIL" required
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-4 font-bold text-sm outline-none focus:border-orange-500" />

          <input type="password" placeholder="SENHA" required
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 p-4 font-bold text-sm outline-none focus:border-orange-500" />

          <button type="submit" disabled={loading}
            className="w-full bg-white text-black font-black uppercase py-5 tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-50">
            {loading ? 'PROCESSANDO...' : isLogin ? 'ENTRAR' : 'FINALIZAR CADASTRO'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-orange-500 transition-colors"
          >
            {isLogin ? 'Ainda não tem conta? Cadastre-se' : 'Já possui conta? Faça login'}
          </button>
          
          <div className="block pt-4 border-t border-zinc-900">
            <Link href="/" className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-700 hover:text-white transition-colors">
              ← Voltar para a vitrine
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}