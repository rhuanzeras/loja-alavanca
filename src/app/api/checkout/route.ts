import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicialização do cliente
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // 1. Validação de Segurança
    if (!process.env.MP_ACCESS_TOKEN) {
      console.error("❌ ERRO: MP_ACCESS_TOKEN não configurado.");
      return NextResponse.json({ error: 'Configuração de pagamento ausente' }, { status: 500 });
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    // 2. Mapeamento de itens para o padrão do Mercado Pago
    const body = {
      items: items.map((item: any) => {
        // Limpeza de preço ultra-segura
        let precoLimpo = 0;
        if (typeof item.preco === 'string') {
          // Remove R$, espaços e ajusta separadores decimais
          const valorFormatado = item.preco.replace(/[^0-9,.]/g, '').replace(',', '.');
          precoLimpo = parseFloat(valorFormatado);
        } else {
          precoLimpo = item.preco;
        }

        return {
          id: String(item.id),
          title: `${item.nome} - Tam: ${item.tamanho}${item.nomePersonalizado ? ` (${item.nomePersonalizado})` : ''}`,
          unit_price: Number(precoLimpo),
          quantity: 1,
          currency_id: 'BRL',
        };
      }),
      back_urls: {
        success: 'https://alavanca.netlify.app/sucesso',
        failure: 'https://alavanca.netlify.app/carrinho',
        pending: 'https://alavanca.netlify.app/carrinho',
      },
      // Identificador para você saber que veio da Alavanca Store
      statement_descriptor: "ALAVANCA STORE",
      expires: false
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    // Retorna o link oficial de pagamento
    return NextResponse.json({ init_point: result.init_point });

  } catch (error: any) {
    // 3. Log de erro detalhado para o seu terminal
    console.error("❌ Erro detalhado no Mercado Pago:", {
      message: error.message,
      cause: error.cause,
      details: error.stack
    });

    return NextResponse.json({ 
      error: 'Erro ao processar pagamento',
      details: error.message 
    }, { status: 500 });
  }
}