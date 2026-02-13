import { motion } from "framer-motion";
import { Clock, AlertTriangle, Calendar, Info } from "lucide-react";
import { URGENCIAS } from "@/lib/constants";
import { getSintomasPorMotivo, type MotivoConsulta, type Urgencia } from "@/lib/diagnostico-engine";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SintomasUrgenciaProps {
  motivo: MotivoConsulta;
  selectedSintomas: string[];
  selectedUrgencia: Urgencia | null;
  onSintomasChange: (sintomas: string[]) => void;
  onUrgenciaChange: (urgencia: Urgencia) => void;
}

const urgenciaIcons: Record<string, React.ElementType> = {
  inmediata: AlertTriangle,
  'esta-semana': Clock,
  'este-mes': Calendar,
  'solo-consulta': Info
};

const urgenciaColors: Record<string, string> = {
  inmediata: 'border-red-500/40 hover:border-red-500/70 bg-red-500/5',
  'esta-semana': 'border-orange-500/40 hover:border-orange-500/70 bg-orange-500/5',
  'este-mes': 'border-blue-500/40 hover:border-blue-500/70 bg-blue-500/5',
  'solo-consulta': 'border-gray-500/40 hover:border-gray-500/70 bg-gray-500/5'
};

const SintomasUrgencia = ({ 
  motivo, 
  selectedSintomas, 
  selectedUrgencia,
  onSintomasChange,
  onUrgenciaChange 
}: SintomasUrgenciaProps) => {
  const sintomasDisponibles = getSintomasPorMotivo(motivo);

  const toggleSintoma = (sintomaId: string) => {
    if (selectedSintomas.includes(sintomaId)) {
      onSintomasChange(selectedSintomas.filter(id => id !== sintomaId));
    } else {
      onSintomasChange([...selectedSintomas, sintomaId]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Síntomas Section */}
      <div>
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
            ¿Qué síntomas presentas?
          </h2>
          <p className="text-muted-foreground text-sm">
            Selecciona todos los que apliquen (opcional)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
          {sintomasDisponibles.map((sintoma, index) => {
            const isSelected = selectedSintomas.includes(sintoma.id);
            
            return (
              <motion.div
                key={sintoma.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <label
                  className={`
                    flex items-center gap-3 p-4 rounded-xl border cursor-pointer
                    transition-all duration-200
                    ${isSelected 
                      ? 'border-gold/60 bg-gold/10' 
                      : 'border-border/40 bg-charcoal/30 hover:border-border/60 hover:bg-charcoal/50'
                    }
                  `}
                >
                  <Checkbox
                    id={sintoma.id}
                    checked={isSelected}
                    onCheckedChange={() => toggleSintoma(sintoma.id)}
                    className="data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                  />
                  <Label 
                    htmlFor={sintoma.id}
                    className="flex-1 cursor-pointer text-white/90 text-sm font-normal"
                  >
                    {sintoma.label}
                  </Label>
                </label>
              </motion.div>
            );
          })}
        </div>

        {selectedSintomas.length > 0 && (
          <motion.p
            className="text-gold text-sm mt-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {selectedSintomas.length} síntoma{selectedSintomas.length > 1 ? 's' : ''} seleccionado{selectedSintomas.length > 1 ? 's' : ''}
          </motion.p>
        )}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-4 text-muted-foreground text-xs uppercase tracking-wider">
            Urgencia
          </span>
        </div>
      </div>

      {/* Urgencia Section */}
      <div>
        <div className="text-center mb-6">
          <h2 className="font-serif text-xl md:text-2xl text-white mb-2">
            ¿Qué tan pronto necesitas atención?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {URGENCIAS.map((urgencia, index) => {
            const Icon = urgenciaIcons[urgencia.id];
            const isSelected = selectedUrgencia === urgencia.id;
            
            return (
              <motion.button
                key={urgencia.id}
                type="button"
                onClick={() => onUrgenciaChange(urgencia.id as Urgencia)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all duration-300
                  ${urgenciaColors[urgencia.id]}
                  ${isSelected 
                    ? 'ring-2 ring-gold ring-offset-2 ring-offset-background' 
                    : ''
                  }
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}

                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-gold' : 'text-white/60'}`} />
                  <div>
                    <h3 className="font-medium text-white text-sm mb-1">
                      {urgencia.titulo}
                    </h3>
                    <p className="text-xs text-white/50">
                      {urgencia.descripcion}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(196, 162, 101, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(196, 162, 101, 0.5);
        }
      `}</style>
    </div>
  );
};

export default SintomasUrgencia;
