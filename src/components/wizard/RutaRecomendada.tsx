import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowRight, Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { DENTALINK_URL, getWhatsAppURLWithDiagnostico } from "@/lib/constants";
import { type DiagnosticoResult, formatPrecioCLP } from "@/lib/diagnostico-engine";
import { trackBeginSchedule, trackBeginWhatsApp } from "@/lib/ga4";

interface RutaRecomendadaProps {
  diagnostico: DiagnosticoResult;
  onAgendar: () => void;
  onWhatsApp: () => void;
}

const RutaRecomendada = ({ diagnostico, onAgendar, onWhatsApp }: RutaRecomendadaProps) => {
  const whatsappUrl = getWhatsAppURLWithDiagnostico(
    diagnostico.programa.nombre,
    diagnostico.urgencia
  );

  const handleAgendar = () => {
    trackBeginSchedule('funnel-nuevo-paciente');
    onAgendar();
    window.open(DENTALINK_URL, '_blank');
  };

  const handleWhatsApp = () => {
    trackBeginWhatsApp(`funnel-${diagnostico.programa.id}`);
    onWhatsApp();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sparkles className="w-8 h-8 text-gold" />
        </motion.div>
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
          ¡Tu ruta está lista!
        </h2>
        <p className="text-muted-foreground">
          El siguiente paso es agendar tu evaluación
        </p>
      </div>

      {/* Summary card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-charcoal to-charcoal/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <p className="text-gold text-xs uppercase tracking-wider mb-1">
                Tu programa recomendado
              </p>
              <h3 className="font-serif text-2xl text-white mb-1">
                {diagnostico.programa.nombre}
              </h3>
              <p className="text-white/60 text-sm italic">
                {diagnostico.programa.tagline}
              </p>
            </div>
            <Link
              to={diagnostico.programa.url}
              className="text-gold text-sm hover:text-gold-glow transition-colors flex items-center gap-1"
            >
              Ver más <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-black/20 rounded-xl">
            <div className="text-center">
              <p className="text-lg font-bold text-white">
                {formatPrecioCLP(diagnostico.precioEstimado.min)}
              </p>
              <p className="text-xs text-white/40">Desde</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-lg font-bold text-gold">
                {Math.round(diagnostico.confidence * 100)}%
              </p>
              <p className="text-xs text-white/40">Compatibilidad</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white capitalize">
                {diagnostico.urgencia.replace('-', ' ')}
              </p>
              <p className="text-xs text-white/40">Urgencia</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 p-4 bg-charcoal/30 rounded-xl">
          <div className="p-2 rounded-lg bg-green-500/20">
            <Shield className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Evaluación con IA</p>
            <p className="text-xs text-white/50">Diagnóstico avanzado</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-charcoal/30 rounded-xl">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">45 minutos</p>
            <p className="text-xs text-white/50">Duración evaluación</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-charcoal/30 rounded-xl">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Plan personalizado</p>
            <p className="text-xs text-white/50">Incluido</p>
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="space-y-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Primary CTA - Agendar */}
        <motion.button
          type="button"
          onClick={handleAgendar}
          className="w-full relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gold text-charcoal font-semibold">
            <Calendar className="w-5 h-5" />
            <span>Agendar Evaluación Online</span>
          </div>
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Secondary CTA - WhatsApp */}
        <motion.button
          type="button"
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Consultar por WhatsApp</span>
        </motion.button>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        className="flex items-center justify-center gap-6 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2 text-xs text-white/40">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Datos seguros</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Sin compromiso</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Respuesta inmediata</span>
        </div>
      </motion.div>

      {/* Powered by */}
      <motion.p
        className="text-center text-muted-foreground/40 text-xs pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Powered by HUMANA.AI • Clínica Miró © 2024
      </motion.p>
    </div>
  );
};

export default RutaRecomendada;
