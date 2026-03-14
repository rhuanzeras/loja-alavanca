use client;
import { useState } from react;
import { supabase } from @libsupabase;

export default function Cadastro() {
  const [formData, setFormData] = useState({
    email , password , nome , cpf , nascimento , contato 
  });

  const handleCadastro = async (e React.FormEvent) = {
    e.preventDefault();

     1. Cria o usuário no Supabase Auth (E-mail e Senha)
    const { data, error } = await supabase.auth.signUp({
      email formData.email,
      password formData.password,
    });

    if (error) return alert(Erro no cadastro  + error.message);

    if (data.user) {
       2. Salva os dados extras na nossa tabela 'perfis'
      const { error profileError } = await supabase
        .from('perfis')
        .insert([{
          id data.user.id,
          nome_completo formData.nome,
          cpf formData.cpf,
          data_nascimento formData.nascimento,
          contato formData.contato,
          email formData.email
        }]);

      if (profileError) alert(Erro ao salvar perfil  + profileError.message);
      else alert(Conta criada com sucesso! Verifique seu e-mail.);
    }
  };

  return (
    main className=min-h-screen bg-black text-white p-8 pt-32 flex justify-center
      form onSubmit={handleCadastro} className=max-w-md w-full space-y-4
        h1 className=text-4xl font-black uppercase italic text-orange-500 mb-8Criar Contah1
        
        input type=text placeholder=NOME COMPLETO required
          onChange={e = setFormData({...formData, nome e.target.value.toUpperCase()})}
          className=w-full bg-zinc-900 border border-zinc-800 p-4 font-bold uppercase outline-none focusborder-orange-500 
        
        div className=grid grid-cols-2 gap-4
          input type=text placeholder=CPF (SÓ NÚMEROS) required
            onChange={e = setFormData({...formData, cpf e.target.value})}
            className=bg-zinc-900 border border-zinc-800 p-4 font-bold outline-none focusborder-orange-500 
          
          input type=date required
            onChange={e = setFormData({...formData, nascimento e.target.value})}
            className=bg-zinc-900 border border-zinc-800 p-4 font-bold outline-none focusborder-orange-500 text-zinc-400 
        div

        input type=tel placeholder=WHATSAPP  CONTATO required
          onChange={e = setFormData({...formData, contato e.target.value})}
          className=w-full bg-zinc-900 border border-zinc-800 p-4 font-bold outline-none focusborder-orange-500 

        input type=email placeholder=E-MAIL required
          onChange={e = setFormData({...formData, email e.target.value})}
          className=w-full bg-zinc-900 border border-zinc-800 p-4 font-bold outline-none focusborder-orange-500 

        input type=password placeholder=SENHA required
          onChange={e = setFormData({...formData, password e.target.value})}
          className=w-full bg-zinc-900 border border-zinc-800 p-4 font-bold outline-none focusborder-orange-500 

        button type=submit className=w-full bg-orange-500 text-black font-black py-5 uppercase hoverbg-white transition-all
          Finalizar Cadastro
        button
      form
    main
  );
}