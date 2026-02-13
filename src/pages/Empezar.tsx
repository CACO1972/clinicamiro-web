"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import AnimatedBackground from "@/components/AnimatedBackground"

// Wizard Steps
import MotivoSelector from "@/components/wizard/MotivoSelector"
import SintomasUrgencia from "@/components/wizard/SintomasUrgencia"
import FotoUploader from "@/components/wizard/FotoUploader"
import DiagnosticoIA from "@/components/wizard/DiagnosticoIA"
import ArancelesFinanciamiento from "@/components/wizard/ArancelesFinanciamiento"
import RutaRecomendada from "@/components/wizard/RutaRecomendada"

// Engine & Tracking
import {
  generarDiagnostico,
  type MotivoConsulta,
  type Urgencia,
  type DiagnosticoResult,
} from "@/lib/diagnostico-engine"
import {
  trackEntryFlow,
  trackSelectComplaint,
  trackSelectSymptoms,
  trackUploadImage,
  trackAIResultReady,
  trackViewFinancing,
  trackRouteRecommended,
  trackBeginSchedule,
  trackBeginWhatsApp,
} from "@/lib/ga4"

const STEPS = [
  { number: 1, title: "Motivo", description: "¿Qué te trae aquí?" },
  { number: 2, title: "Síntomas", description: "Cuéntanos más" },
  { number: 3, title: "Fotos", description: "Opcional" },
  { number: 4, title: "Diagnóstico", description: "Análisis IA" },
  { number: 5, title: "Inversión", description: "Transparencia" },
  { number: 6, title: "Tu Ruta", description: "Siguiente paso" },
]

const NavigationButtons = memo(
  ({
    currentStep,
    canProceed,
    isAnalyzing,
    stepsLength,
    onBack,
    onNext,
  }: {
    currentStep: number
    canProceed: boolean
    isAnalyzing: boolean
    stepsLength: number
    onBack: () => void
    onNext: () => void
  }) => (
    <motion.div
      className="flex justify-between gap-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        disabled={currentStep === 1}
        className={`
        inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium
        transition-all duration-300
        ${
          currentStep === 1
            ? "opacity-40 cursor-not-allowed border-border/20 text-muted-foreground"
            : "border-gold/30 text-white bg-transparent hover:bg-gold/10 hover:border-gold/50"
        }
      `}
        whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
        whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Anterior</span>
      </motion.button>

      {/* Next/Submit Button */}
      {currentStep < stepsLength ? (
        <motion.button
          onClick={onNext}
          disabled={!canProceed || isAnalyzing}
          className={`
          inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold
          flex-1 max-w-xs transition-all duration-300
          ${
            !canProceed || isAnalyzing
              ? "bg-charcoal/50 text-muted-foreground cursor-not-allowed"
              : "bg-gold text-charcoal hover:bg-gold-glow"
          }
        `}
          style={
            canProceed && !isAnalyzing
              ? {
                  boxShadow: "0 4px 20px hsla(40, 45%, 58%, 0.25)",
                }
              : {}
          }
          whileHover={
            canProceed && !isAnalyzing
              ? {
                  scale: 1.02,
                  boxShadow: "0 8px 30px hsla(40, 45%, 58%, 0.35)",
                }
              : {}
          }
          whileTap={canProceed && !isAnalyzing ? { scale: 0.98 } : {}}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analizando...</span>
            </>
          ) : (
            <>
              <span>{currentStep === 3 ? "Analizar con IA" : currentStep === 5 ? "Ver mi ruta" : "Continuar"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      ) : null}
    </motion.div>
  ),
)

NavigationButtons.displayName = "NavigationButtons"

const Empezar = () => {
  // State
  const [currentStep, setCurrentStep] = useState(1)
  const [motivo, setMotivo] = useState<MotivoConsulta | null>(null)
  const [sintomas, setSintomas] = useState<string[]>([])
  const [urgencia, setUrgencia] = useState<Urgencia | null>(null)
  const [fotos, setFotos] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnostico, setDiagnostico] = useState<DiagnosticoResult | null>(null)

  const { toast } = useToast()

  // Track entry on mount
  useEffect(() => {
    trackEntryFlow("nuevo")
  }, [])

  // Validation
  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return motivo !== null
      case 2:
        return urgencia !== null // Síntomas son opcionales, pero urgencia es requerida
      case 3:
        return true // Fotos son opcionales
      case 4:
        return diagnostico !== null && !isAnalyzing
      case 5:
        return diagnostico !== null
      case 6:
        return true
      default:
        return false
    }
  }, [currentStep, motivo, urgencia, diagnostico, isAnalyzing])

  // Navigation
  const handleNext = useCallback(async () => {
    if (!canProceed()) {
      toast({
        title: "Completa este paso",
        description: "Por favor selecciona una opción para continuar",
        variant: "destructive",
      })
      return
    }

    // Track events per step
    if (currentStep === 1 && motivo) {
      trackSelectComplaint(motivo)
    }

    if (currentStep === 2 && urgencia) {
      trackSelectSymptoms(sintomas, urgencia)
    }

    if (currentStep === 3) {
      trackUploadImage(fotos.length > 0)
      // Iniciar análisis IA
      setIsAnalyzing(true)
      setCurrentStep(4)

      // Simular delay de análisis
      setTimeout(() => {
        if (motivo && urgencia) {
          const result = generarDiagnostico(motivo, sintomas, urgencia, fotos.length > 0)
          setDiagnostico(result)
          trackAIResultReady(result.routeKey, result.tagsCount)
        }
        setIsAnalyzing(false)
      }, 3500)
      return
    }

    if (currentStep === 5 && diagnostico) {
      trackRouteRecommended(diagnostico.programa.nombre)
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [canProceed, currentStep, motivo, sintomas, urgencia, fotos, diagnostico, toast])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const handleMotivoSelect = useCallback((selected: MotivoConsulta) => {
    setMotivo(selected)
    // Auto-advance after short delay for better UX
    setTimeout(() => {
      if (selected) {
        trackSelectComplaint(selected)
        setCurrentStep(2)
      }
    }, 300)
  }, [])

  const handlePrecioViewed = (precio: number) => {
    trackViewFinancing(precio)
  }

  const handleAgendar = () => {
    trackBeginSchedule("funnel-nuevo-paciente")
  }

  const handleWhatsApp = () => {
    if (diagnostico) {
      trackBeginWhatsApp(`funnel-${diagnostico.programa.id}`)
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <MotivoSelector selectedMotivo={motivo} onSelect={handleMotivoSelect} />

      case 2:
        return motivo ? (
          <SintomasUrgencia
            motivo={motivo}
            selectedSintomas={sintomas}
            selectedUrgencia={urgencia}
            onSintomasChange={setSintomas}
            onUrgenciaChange={setUrgencia}
          />
        ) : null

      case 3:
        return <FotoUploader files={fotos} onFilesChange={setFotos} />

      case 4:
        return <DiagnosticoIA diagnostico={diagnostico} isAnalyzing={isAnalyzing} />

      case 5:
        return diagnostico ? (
          <ArancelesFinanciamiento diagnostico={diagnostico} onPrecioViewed={handlePrecioViewed} />
        ) : null

      case 6:
        return diagnostico ? (
          <RutaRecomendada diagnostico={diagnostico} onAgendar={handleAgendar} onWhatsApp={handleWhatsApp} />
        ) : null

      default:
        return null
    }
  }

  return (
    <>
      <AnimatedBackground />

      <main className="min-h-screen flex flex-col px-4 py-6 md:py-10">
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Volver</span>
            </Link>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Paso {currentStep} de {STEPS.length}
              </p>
              <p className="text-sm text-gold font-medium">{STEPS[currentStep - 1].title}</p>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-1.5 bg-charcoal/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--gold-dim)), hsl(var(--gold)), hsl(var(--gold-glow)))",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Steps Indicator - Horizontal Pills */}
          <motion.div
            className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {STEPS.map((step) => (
              <button
                key={step.number}
                onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                disabled={step.number > currentStep}
                className={`
                  flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300
                  ${
                    step.number === currentStep
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : step.number < currentStep
                        ? "bg-lilac/20 text-lilac border border-lilac/30 cursor-pointer hover:bg-lilac/30"
                        : "bg-charcoal/30 text-muted-foreground border border-border/20 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <span className="flex items-center gap-1.5">
                  {step.number < currentStep ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className="w-4 text-center">{step.number}</span>
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div
                className="card-premium p-6 md:p-8 min-h-[450px]"
                style={{
                  background: "rgba(12, 12, 15, 0.88)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(196, 162, 101, 0.15)",
                }}
              >
                {renderStepContent()}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <NavigationButtons
            currentStep={currentStep}
            canProceed={canProceed()}
            isAnalyzing={isAnalyzing}
            stepsLength={STEPS.length}
            onBack={handleBack}
            onNext={handleNext}
          />

          {/* Footer info */}
          <motion.p
            className="text-center text-muted-foreground/40 text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Tu información es confidencial y está protegida por HUMANA.AI
          </motion.p>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

export default Empezar
