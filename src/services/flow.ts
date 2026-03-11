import { supabase } from '@/integrations/supabase/client'

export interface FlowPaymentRequest {
  amount: number
  subject: string
  email: string
  treatment: string
  order_id?: string
  payment_method?: number
  appointment_data?: Record<string, unknown>
}

export const createFlowPayment = async (
  data: FlowPaymentRequest
): Promise<{ url: string; token: string }> => {
  const { data: result, error } = await supabase.functions.invoke('flow-create-payment', {
    body: data,
  })
  if (error) throw error
  return result as { url: string; token: string }
}
