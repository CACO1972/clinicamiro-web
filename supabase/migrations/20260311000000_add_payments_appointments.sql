-- ═══════════════════════════════════════════════════════════════
-- Migration: Add payments and appointments tables
-- ═══════════════════════════════════════════════════════════════

-- Tabla de pagos Flow
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  flow_token TEXT,
  amount INTEGER NOT NULL,
  email TEXT NOT NULL,
  treatment TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  flow_data JSONB,
  appointment_data JSONB,
  patient_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Service role full access on payments"
  ON public.payments
  USING (true)
  WITH CHECK (true);

-- Updated_at trigger for payments
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS payments_updated_at ON public.payments;
CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Tabla de citas
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES auth.users(id),
  dentalink_id TEXT,
  treatment TEXT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  profesional TEXT,
  status TEXT DEFAULT 'scheduled',
  payment_id UUID REFERENCES public.payments(id),
  patient_name TEXT,
  patient_rut TEXT,
  patient_email TEXT,
  patient_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own appointments"
  ON public.appointments
  FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Service role full access on appointments"
  ON public.appointments
  USING (true)
  WITH CHECK (true);
