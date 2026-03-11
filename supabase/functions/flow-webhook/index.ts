import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const FLOW_API_URL = 'https://www.flow.cl/api'

interface FlowPaymentStatus {
  status: number
  amount: number
  payer: string
  [key: string]: unknown
}

interface PaymentRecord {
  appointment_data: Record<string, unknown> | null
  [key: string]: unknown
}

serve(async (req: Request) => {
  try {
    const body = await req.formData()
    const token = body.get('token') as string

    if (!token) {
      return new Response('Missing token', { status: 400 })
    }

    const flowApiKey = Deno.env.get('FLOW_API_KEY')!
    const flowSecretKey = Deno.env.get('FLOW_SECRET_KEY')!
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!

    // Build status query signature
    const params: Record<string, string> = { apiKey: flowApiKey, token }
    const sortedKeys = Object.keys(params).sort()
    const toSign = sortedKeys.map((k) => `${k}${params[k]}`).join('')
    const encoder = new TextEncoder()
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(flowSecretKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    )
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(toSign))
    const signature = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    const statusUrl = `${FLOW_API_URL}/payment/getStatus?apiKey=${flowApiKey}&token=${token}&s=${signature}`
    const statusRes = await fetch(statusUrl)
    const payment = await statusRes.json() as FlowPaymentStatus

    const supabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    if (payment.status === 2) {
      // Payment confirmed
      await supabase
        .from('payments')
        .update({ status: 'paid', flow_data: payment })
        .eq('flow_token', token)

      // Retrieve full record for appointment data
      const { data: paymentRecord } = await supabase
        .from('payments')
        .select('*')
        .eq('flow_token', token)
        .single<PaymentRecord>()

      // Book appointment in Dentalink if data available
      if (paymentRecord?.appointment_data) {
        await fetch(`${supabaseUrl}/functions/v1/agenda-book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          },
          body: JSON.stringify(paymentRecord.appointment_data),
        })
      }

      // Notify patient via WhatsApp
      await fetch(`${supabaseUrl}/functions/v1/whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        },
        body: JSON.stringify({
          phone: payment.payer,
          message: `✅ Pago confirmado por $${payment.amount.toLocaleString('es-CL')} CLP. Tu cita en Clínica Miró está reservada.`,
        }),
      })
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('flow-webhook error:', message)
    return new Response('Error', { status: 500 })
  }
})
