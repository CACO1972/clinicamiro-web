import type { VercelRequest, VercelResponse } from '@vercel/node';

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const SITE_URL = process.env.SITE_URL || 'https://clinicamiro.cl';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, caso_id, tipo_evaluacion, payment_id } = req.body || {};

  try {
    if (action === 'create_preference') {
      const nombres: Record<string, string> = {
        MIRO_ONE: 'Evaluación MIRO ONE — Implantes',
        REVIVE: 'Evaluación REVIVE — Estética',
        ALIGN: 'Evaluación ALIGN — Ortodoncia',
      };

      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            title: nombres[tipo_evaluacion] || 'Evaluación Dental Premium',
            quantity: 1,
            unit_price: 49000,
            currency_id: 'CLP',
          }],
          back_urls: {
            success: `${SITE_URL}/gracias?caso=${caso_id}`,
            failure: `${SITE_URL}/empezar?error=pago`,
            pending: `${SITE_URL}/empezar?pending=1`,
          },
          auto_return: 'approved',
          external_reference: caso_id,
          installments: 3,
          notification_url: `${SITE_URL}/api/mp-webhook`,
        }),
      });
      const data = await response.json();
      return res.json({ success: true, init_point: data.init_point, id: data.id });
    }

    if (action === 'check_status') {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/search?external_reference=${caso_id}`,
        { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } }
      );
      const data = await response.json();
      return res.json({ success: true, payments: data.results });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
