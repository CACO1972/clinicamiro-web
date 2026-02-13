import { motion } from "framer-motion";
import { 
  AlertCircle, 
  Sparkles, 
  Puzzle, 
  AlignCenter, 
  Shield, 
  HelpCircle 
} from "lucide-react";
import { MOTIVOS_CONSULTA } from "@/lib/constants";
import type { MotivoConsulta } from "@/lib/diagnostico-engine";

const iconMap: Record<string, React.ElementType> = {
  AlertCircle,
  Sparkles,
  Puzzle,
  AlignCenter,
  Shield,
  HelpCircle
};

const colorMap: Record<string, string> = {
  red: 'from-red-500/20 to-red-600/10 border-red-500/30 hover:border-red-500/60',
  gold: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 hover:border-amber-500/60',
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 hover:border-blue-500/60',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-500/60',
  green: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 hover:border-emerald-500/60',
  gray: 'from-gray-500/20 to-gray-600/10 border-gray-500/30 hover:border-gray-500/60',
};

const iconColorMap: Record<string, string> = {
  red: 'text-red-400',
  gold: 'text-amber-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  green: 'text-emerald-400',
  gray: 'text-gray-400',
};

interface MotivoSelectorProps {
  selectedMotivo: MotivoConsulta | null;
  onSelect: (motivo: MotivoConsulta) => void;
}

const MotivoSelector = ({ selectedMotivo, onSelect }: MotivoSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
          ¿Cuál es el motivo principal de tu consulta?
        </h2>
        <p className="text-muted-foreground">
          Selecciona la opción que mejor describe tu situación
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOTIVOS_CONSULTA.map((motivo, index) => {
          const Icon = iconMap[motivo.icono];
          const isSelected = selectedMotivo === motivo.id;
          
          return (
            <motion.button
              key={motivo.id}
              type="button"
              onClick={() => onSelect(motivo.id as MotivoConsulta)}
              className={`
                relative p-5 rounded-xl border-2 text-left transition-all duration-300
                bg-gradient-to-br ${colorMap[motivo.color]}
                ${isSelected 
                  ? 'ring-2 ring-gold ring-offset-2 ring-offset-background scale-[1.02]' 
                  : 'hover:scale-[1.01]'
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-black/20 ${iconColorMap[motivo.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {motivo.titulo}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {motivo.descripcion}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Helper text */}
      <motion.p
        className="text-center text-muted-foreground/60 text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        No te preocupes si no estás seguro/a, podemos ajustar en la evaluación
      </motion.p>
    </div>
  );
};

export default MotivoSelector;
