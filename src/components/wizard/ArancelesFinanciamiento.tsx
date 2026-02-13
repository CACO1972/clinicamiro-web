import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Calculator, CheckCircle2, Info, TrendingUp } from "lucide-react";
import { ARANCELES } from "@/lib/constants";
import { formatPrecioCLP, type DiagnosticoResult } from "@/lib/diagnostico-engine";
import { Slider } from "@/components/ui/slider";

interface ArancelesFinanciamientoProps {
  diagnostico: DiagnosticoResult;
  onPrecioViewed: (precio: number) => void;
}

const ArancelesFinanciamiento = ({ diagnostico, onPrecioViewed }: ArancelesFinanciamientoProps) => {
  const [cuotas, setCuotas] = useState(12);
  const [montoEstimado, setMontoEstimado] = useState(
    Math.round((diagnostico.precioEstimado.min + diagnostico.precioEstimado.max) / 2)
  );

  // Calcular cuota mensual (simulación simple)
  const tasaMensual = 0.018; // 1.8% mensual aproximado
  const cuotaMensual = Math.round(
    (montoEstimado * tasaMensual * Math.pow(1 + tasaMensual, cuotas)) / 
    (Math.pow(1 + tasaMensual, cuotas) - 1)
  );

  const handleMontoChange = (value: number[]) => {
    setMontoEstimado(value[0]);
    onPrecioViewed(value[0]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
          Inversión y Financiamiento
        </h2>
        <p className="text-muted-foreground">
          Transparencia total en aranceles y opciones de pago
        </p>
      </div>

      {/* Evaluación inicial card */}
      <motion.div
        className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {ARANCELES.evaluacion.nombre}
            </h3>
            <p className="text-white/70 text-sm">
              {ARANCELES.evaluacion.descripcion}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gold text-2xl font-bold">
              {formatPrecioCLP(ARANCELES.evaluacion.precio)}
            </p>
            <p className="text-xs text-white/50">Valor referencial</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {ARANCELES.evaluacion.incluye.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/70">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Estimación tratamiento */}
      <motion.div
        className="bg-charcoal/40 border border-border/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              Estimación para {diagnostico.programa.nombre}
            </h3>
            <p className="text-sm text-white/50">
              Rango basado en casos similares
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-white/70 text-sm">
            {formatPrecioCLP(diagnostico.precioEstimado.min)}
          </span>
          <span className="text-gold text-xl font-bold">
            {formatPrecioCLP(montoEstimado)}
          </span>
          <span className="text-white/70 text-sm">
            {formatPrecioCLP(diagnostico.precioEstimado.max)}
          </span>
        </div>

        <Slider
          value={[montoEstimado]}
          min={diagnostico.precioEstimado.min}
          max={diagnostico.precioEstimado.max}
          step={10000}
          onValueChange={handleMontoChange}
          className="mb-2"
        />

        <p className="text-xs text-white/40 text-center mt-2">
          Ajusta el monto para ver opciones de financiamiento
        </p>
      </motion.div>

      {/* Calculadora de cuotas */}
      <motion.div
        className="bg-charcoal/40 border border-border/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Calculator className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-white font-semibold">Simulador de Cuotas</h3>
        </div>

        {/* Cuotas selector */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[3, 6, 12, 24].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCuotas(n)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200
                ${cuotas === n 
                  ? 'border-gold bg-gold/10 text-gold' 
                  : 'border-border/30 text-white/60 hover:border-border/50'
                }
              `}
            >
              <span className="block text-lg font-bold">{n}</span>
              <span className="block text-xs">cuotas</span>
            </button>
          ))}
        </div>

        {/* Resultado */}
        <div className="bg-black/30 rounded-xl p-5 text-center">
          <p className="text-white/50 text-sm mb-1">Tu cuota mensual sería de</p>
          <p className="text-gold text-4xl font-bold mb-1">
            {formatPrecioCLP(cuotaMensual)}
          </p>
          <p className="text-white/40 text-xs">
            {cuotas} cuotas de {formatPrecioCLP(cuotaMensual)} = {formatPrecioCLP(cuotaMensual * cuotas)} total
          </p>
        </div>

        <div className="flex items-start gap-2 mt-4 text-xs text-white/40">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            Simulación referencial. El financiamiento final depende de la evaluación crediticia 
            y puede variar según la institución financiera.
          </p>
        </div>
      </motion.div>

      {/* Métodos de pago */}
      <motion.div
        className="flex items-center justify-center gap-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-charcoal/30 rounded-lg">
          <CreditCard className="w-4 h-4 text-white/50" />
          <span className="text-xs text-white/50">Tarjetas de crédito</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-charcoal/30 rounded-lg">
          <span className="text-xs text-white/50">Transferencia</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-charcoal/30 rounded-lg">
          <span className="text-xs text-white/50">Efectivo</span>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-muted-foreground/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Los valores son referenciales. El presupuesto final se determina en la evaluación clínica.
      </motion.p>
    </div>
  );
};

export default ArancelesFinanciamiento;
