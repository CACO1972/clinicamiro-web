import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERIFY_TOKEN = process.env.WA_VERIFY_TOKEN || 'clinica_miro_verify_2026';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).end();
  }

  // Incoming messages (POST)
  if (req.method === 'POST') {
    const { entry } = req.body || {};
    // Log webhook for now
    console.log('WhatsApp webhook:', JSON.stringify(entry));
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
