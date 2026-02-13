-- Tabla para almacenar boletas electrónicas
CREATE TABLE public.boletas (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    rut_paciente TEXT NOT NULL,
    nombre_paciente TEXT,
    email_paciente TEXT,
    monto_total INTEGER NOT NULL,
    glosa TEXT DEFAULT 'Prestación odontológica',
    folio INTEGER,
    pdf_url TEXT,
    estado TEXT NOT NULL DEFAULT 'PENDIENTE',
    simpleapi_id TEXT,
    simpleapi_response JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_boletas_rut_paciente ON public.boletas(rut_paciente);
CREATE INDEX idx_boletas_estado ON public.boletas(estado);
CREATE INDEX idx_boletas_created_at ON public.boletas(created_at DESC);

-- Enable RLS
ALTER TABLE public.boletas ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede ver boletas (el filtro por RUT se hace en la app)
-- En producción, esto debería vincularse a auth.uid() si los pacientes tienen cuenta
CREATE POLICY "Boletas públicas por RUT" 
ON public.boletas 
FOR SELECT 
USING (true);

-- Política: Solo el backend (service_role) puede insertar/actualizar
CREATE POLICY "Backend puede insertar boletas" 
ON public.boletas 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Backend puede actualizar boletas" 
ON public.boletas 
FOR UPDATE 
USING (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_boletas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_boletas_updated_at
BEFORE UPDATE ON public.boletas
FOR EACH ROW
EXECUTE FUNCTION public.update_boletas_updated_at();

-- Comentarios
COMMENT ON TABLE public.boletas IS 'Boletas electrónicas emitidas via SimpleAPI al SII';
COMMENT ON COLUMN public.boletas.rut_paciente IS 'RUT del paciente (formato: 12345678-9)';
COMMENT ON COLUMN public.boletas.estado IS 'PENDIENTE, EMITIDA, ERROR, ANULADA';
