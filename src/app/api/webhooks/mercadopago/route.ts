import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // O Mercado Pago envia várias notificações. Queremos apenas as de 'payment'
    if (body.type === 'payment') {
      const paymentId = body.data.id;

      // Buscamos os detalhes reais do pagamento para confirmar se foi aprovado
      const payment = new Payment(client);
      const data = await payment.get({ id: paymentId });

      if (data.status === 'approved') {
        console.log(`✅ Pagamento Aprovado! ID: ${paymentId}`);
        console.log(`💰 Valor: R$ ${data.transaction_amount}`);
        console.log(`📧 Cliente: ${data.payer?.email}`);

        // AQUI você conectaria com seu banco de dados (Prisma, Supabase, etc.)
        // Ex: await db.pedido.update({ where: { id: ... }, data: { pago: true } })
      }
    }

    // É OBRIGATÓRIO responder com 200 OK para o Mercado Pago não achar que deu erro
    return new NextResponse(null, { status: 200 });

  } catch (error) {
    console.error("Erro no Webhook:", error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}