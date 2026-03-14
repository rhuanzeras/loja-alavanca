import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuramos o cliente usando a variável de ambiente segura
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Verificação de segurança: impede que a API rode sem o token configurado
    if (!process.env.MP_ACCESS_TOKEN) {
      console.error("ERRO: MP_ACCESS_TOKEN não configurado no ambiente.");
      return NextResponse.json({ error: 'Configuração de pagamento ausente' }, { status: 500 });
    }

    const body = {
      items: items.map((item: any) => {
        // Garante que o preço seja um número puro (limpa R$, pontos e vírgulas)
        const precoLimpo = typeof item.preco === 'string' 
          ? parseFloat(item.preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim())
          : item.preco;

        return {
          id: item.id,
          title: `${item.nome} (${item.tamanho})`,
          unit_price: precoLimpo,
          quantity: 1,
          currency_id: 'BRL',
        };
      }),
      back_urls: {
        // URLs do seu site oficial na Netlify
        success: 'https://alavanca.netlify.app/sucesso',
        failure: 'https://alavanca.netlify.app/carrinho',
        pending: 'https://alavanca.netlify.app/carrinho',
      },
      // auto_return removido conforme solicitado
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    return NextResponse.json({ init_point: result.init_point });

  } catch (error: any) {
    console.error("Erro no checkout:", error);
    return NextResponse.json({ error: 'Erro ao processar pagamento' }, { status: 500 });
  }
}