import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jipldlklzobiytkvxokf.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(200).end();

  const { type, data } = req.body || {};
  if (type !== 'payment') return res.status(200).json({ ok: true });

  try {
    const paymentRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${data.id}`,
      { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } }
    );
    const payment = await paymentRes.json();

    const estado = payment.status === 'approved' ? 'aprobado'
      : payment.status === 'pending' ? 'pendiente'
      : 'rechazado';

    await supabase.from('pagos_4p').upsert({
      caso_id: payment.external_reference,
      monto: payment.transaction_amount,
      estado,
      referencia_mp: String(payment.id),
      metodo: 'mercado_pago',
    }, { onConflict: 'referencia_mp' });

    if (estado === 'aprobado') {
      await supabase.from('casos_4p')
        .update({ etapa: 'pago_confirmado', updated_at: new Date().toISOString() })
        .eq('id', payment.external_reference);
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
