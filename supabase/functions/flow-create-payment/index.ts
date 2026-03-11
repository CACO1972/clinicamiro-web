import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const FLOW_API_URL = 'https://www.flow.cl/api'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      amount,
      subject,
      email,
      payment_method,
      order_id,
      treatment,
      appointment_data,
    } = await req.json() as {
      amount: number
      subject?: string
      email: string
      payment_method?: number
      order_id?: string
      treatment?: string
      appointment_data?: Record<string, unknown>
    }

    const flowApiKey = Deno.env.get('FLOW_API_KEY')!
    const flowSecretKey = Deno.env.get('FLOW_SECRET_KEY')!
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const siteUrl = Deno.env.get('SITE_URL') ?? 'https://clinicamiro-web.vercel.app'

    const commerceOrder = order_id ?? `MIRO-${Date.now()}`

    const params: Record<string, string> = {
      apiKey: flowApiKey,
      commerceOrder,
      subject: subject ?? `Clínica Miró - ${treatment ?? 'Consulta'}`,
      currency: 'CLP',
      amount: String(amount),
      email,
      paymentMethod: String(payment_method ?? 9),
      urlConfirmation: `${supabaseUrl}/functions/v1/flow-webhook`,
      urlReturn: `${siteUrl}/pago-exitoso`,
    }

    // Build HMAC-SHA256 signature
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

    params['s'] = signature

    const formData = new URLSearchParams(params)
    const flowRes = await fetch(`${FLOW_API_URL}/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })

    const data = await flowRes.json() as { url: string; token: string }
    const paymentUrl = `${data.url}?token=${data.token}`

    // Persist payment record
    const supabase = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    await supabase.from('payments').insert({
      order_id: commerceOrder,
      flow_token: data.token,
      amount,
      email,
      treatment: treatment ?? null,
      status: 'pending',
      appointment_data: appointment_data ?? null,
      created_at: new Date().toISOString(),
    })

    return new Response(
      JSON.stringify({ url: paymentUrl, token: data.token }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
