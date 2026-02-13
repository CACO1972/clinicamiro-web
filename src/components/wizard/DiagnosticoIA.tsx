import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { type DiagnosticoResult } from "@/lib/diagnostico-engine";

interface DiagnosticoIAProps {
  diagnostico: DiagnosticoResult | null;
  isAnalyzing: boolean;
}

const analysisSteps = [
  { id: 1, text: "Analizando síntomas reportados...", duration: 800 },
  { id: 2, text: "Procesando patrones clínicos...", duration: 1000 },
  { id: 3, text: "Evaluando nivel de urgencia...", duration: 700 },
  { id: 4, text: "Generando recomendación personalizada...", duration: 900 },
];

const DiagnosticoIA = ({ diagnostico, isAnalyzing }: DiagnosticoIAProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      setCurrentStep(0);
      setShowResult(false);
      
      let stepIndex = 0;
      const runSteps = () => {
        if (stepIndex < analysisSteps.length) {
          setCurrentStep(stepIndex + 1);
          setTimeout(() => {
            stepIndex++;
            runSteps();
          }, analysisSteps[stepIndex].duration);
        } else {
          setTimeout(() => setShowResult(true), 500);
        }
      };
      
      setTimeout(runSteps, 300);
    }
  }, [isAnalyzing]);

  if (!showResult && isAnalyzing) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        {/* Animated brain */}
        <motion.div
          className="relative mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-purple-500/20 flex items-center justify-center">
            <Brain className="w-12 h-12 text-gold" />
          </div>
          
          {/* Orbiting particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gold/60"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 120 * Math.PI / 180) * 50, 0],
                y: [0, Math.sin(i * 120 * Math.PI / 180) * 50, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Progress steps */}
        <div className="space-y-3 w-full max-w-sm">
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: currentStep >= step.id ? 1 : 0.3,
                x: 0 
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                ${currentStep > step.id 
                  ? 'bg-green-500' 
                  : currentStep === step.id 
                    ? 'bg-gold' 
                    : 'bg-charcoal/50'
                }
              `}>
                {currentStep > step.id ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : currentStep === step.id ? (
                  <motion.div
                    className="w-2 h-2 bg-black rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                ) : (
                  <div className="w-2 h-2 bg-white/30 rounded-full" />
                )}
              </div>
              <span className={`text-sm ${currentStep >= step.id ? 'text-white' : 'text-white/40'}`}>
                {step.text}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted-foreground text-sm mt-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Powered by HUMANA.AI
        </motion.p>
      </div>
    );
  }

  if (!diagnostico) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success header */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <Sparkles className="w-8 h-8 text-green-400" />
          </motion.div>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
            Análisis Completado
          </h2>
          <p className="text-muted-foreground">
            Basado en tus síntomas, te recomendamos:
          </p>
        </div>

        {/* Recommended program card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gold text-sm uppercase tracking-wider mb-1">
                  Programa Recomendado
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-white">
                  {diagnostico.programa.nombre}
                </h3>
                <p className="text-gold/80 italic">
                  {diagnostico.programa.tagline}
                </p>
              </div>
              
              {/* Confidence badge */}
              <div className="bg-gold/20 px-3 py-1.5 rounded-full">
                <span className="text-gold text-sm font-medium">
                  {Math.round(diagnostico.confidence * 100)}% match
                </span>
              </div>
            </div>

            <p className="text-white/80 mb-6">
              {diagnostico.programa.descripcion}
            </p>

            {/* Tags */}
            {diagnostico.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {diagnostico.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Recomendaciones */}
            {diagnostico.recomendaciones.length > 0 && (
              <div className="space-y-2 mb-6">
                {diagnostico.recomendaciones.map((rec, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2 text-sm text-white/70"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Analysis summary */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center p-4 bg-charcoal/30 rounded-xl">
            <p className="text-2xl font-bold text-gold">{diagnostico.tagsCount}</p>
            <p className="text-xs text-muted-foreground">Factores analizados</p>
          </div>
          <div className="text-center p-4 bg-charcoal/30 rounded-xl">
            <p className="text-2xl font-bold text-gold capitalize">
              {diagnostico.urgencia.replace('-', ' ')}
            </p>
            <p className="text-xs text-muted-foreground">Nivel de urgencia</p>
          </div>
          <div className="text-center p-4 bg-charcoal/30 rounded-xl">
            <p className="text-2xl font-bold text-gold">IA</p>
            <p className="text-xs text-muted-foreground">Análisis HUMANA</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiagnosticoIA;
