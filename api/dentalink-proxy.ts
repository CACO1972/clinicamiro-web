import type { VercelRequest, VercelResponse } from '@vercel/node';

const DENTALINK_TOKEN = process.env.DENTALINK_TOKEN || 'q9QsnoKG1tBoOZqJnvgqZ0tFIbH3LVNznPJWQPrJ';
const DENTALINK_BASE = 'https://api.dentalink.healthatom.com/api/v1';
const SUCURSAL_ID = process.env.DENTALINK_SUCURSAL || '1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, date, duration, dentista_id, paciente_id, hora, motivo } = 
    req.method === 'POST' ? req.body : req.query;

  try {
    if (action === 'get_slots') {
      const response = await fetch(
        `${DENTALINK_BASE}/agendas?id_sucursal=${SUCURSAL_ID}&fecha=${date}`,
        { headers: { Authorization: `Token ${DENTALINK_TOKEN}` } }
      );
      const data = await response.json();
      return res.json({ success: true, slots: data });
    }

    if (action === 'create_cita') {
      const response = await fetch(`${DENTALINK_BASE}/citas`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${DENTALINK_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_paciente: paciente_id,
          id_dentista: dentista_id,
          id_sucursal: parseInt(SUCURSAL_ID),
          fecha: date,
          hora: hora,
          duracion: duration || 45,
          motivo: motivo || 'Evaluación HUMANA.AI',
        }),
      });
      const data = await response.json();
      return res.json({ success: true, cita: data });
    }

    if (action === 'get_dentistas') {
      const response = await fetch(
        `${DENTALINK_BASE}/dentistas?id_sucursal=${SUCURSAL_ID}`,
        { headers: { Authorization: `Token ${DENTALINK_TOKEN}` } }
      );
      const data = await response.json();
      return res.json({ success: true, dentistas: data });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
