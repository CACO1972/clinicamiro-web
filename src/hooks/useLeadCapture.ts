import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LeadData {
  nombre: string;
  apellido?: string;
  email: string;
  telefono: string;
}

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_path: string;
}

interface UseLeadCaptureResult {
  submitLead: (data: LeadData) => Promise<{ ok: boolean; error?: string }>;
  isSubmitting: boolean;
  utmParams: UTMParams;
}

// Obtener cookie por nombre
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function useLeadCapture(): UseLeadCaptureResult {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: 'direct',
    utm_medium: '',
    utm_campaign: '',
    landing_path: '/',
  });

  // Capturar UTMs al montar el hook
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || 'direct',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      landing_path: window.location.pathname,
    });
  }, []);

  const submitLead = useCallback(async (data: LeadData): Promise<{ ok: boolean; error?: string }> => {
    setIsSubmitting(true);
    
    try {
      // Obtener cookies de Meta (fbc y fbp)
      const fbc = getCookie('_fbc');
      const fbp = getCookie('_fbp');

      const payload = {
        nombre: data.nombre,
        apellido: data.apellido || '',
        email: data.email,
        telefono: data.telefono,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        landing_path: utmParams.landing_path,
        event_source_url: window.location.href,
        fbc,
        fbp,
      };

      console.log('Enviando lead:', payload);

      const { data: response, error } = await supabase.functions.invoke('lead', {
        body: payload,
      });

      if (error) {
        console.error('Error enviando lead:', error);
        return { ok: false, error: error.message };
      }

      console.log('Lead enviado exitosamente:', response);
      return { ok: true };
    } catch (error) {
      console.error('Error en submitLead:', error);
      return { ok: false, error: 'Error al enviar el formulario' };
    } finally {
      setIsSubmitting(false);
    }
  }, [utmParams]);

  return {
    submitLead,
    isSubmitting,
    utmParams,
  };
}
