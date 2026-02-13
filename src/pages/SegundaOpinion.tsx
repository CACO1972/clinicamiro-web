import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Scale, FileX, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import FormularioPresupuesto from "@/components/segundaopinion/FormularioPresupuesto";
import FormularioRX from "@/components/segundaopinion/FormularioRX";
import { trackEntryFlow, trackSOSelect } from "@/lib/ga4";

type FlowType = 'selection' | 'presupuesto' | 'rx' | 'success';

const options = [
  {
    id: "presupuesto",
    icon: Scale,
    title: "Comparar Presupuesto",
    description: "Sube tu presupuesto actual y te daremos nuestra valoración detallada con alternativas de tratamiento.",
    color: "gold"
  },
  {
    id: "rx",
    icon: FileX,
    title: "Segunda Opinión con RX",
    description: "Evaluamos tu caso con radiografías existentes para darte una opinión profesional independiente.",
    color: "purple"
  },
];

const SegundaOpinion = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowType>('selection');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    trackEntryFlow('opinion');
  }, []);

  const handleOptionSelect = (optionId: string) => {
    trackSOSelect(optionId as 'presupuesto' | 'rx');
    setCurrentFlow(optionId as FlowType);
  };

  const handleBack = () => {
    setCurrentFlow('selection');
  };

  const handleSuccess = () => {
    setCurrentFlow('success');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (currentFlow) {
      case 'presupuesto':
        return (
          <FormularioPresupuesto 
            onBack={handleBack}
            onSuccess={handleSuccess}
          />
        );
      
      case 'rx':
        return (
          <FormularioRX
            onBack={handleBack}
            onSuccess={handleSuccess}
          />
        );

      case 'success':
        return (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
            </motion.div>
            
            <h2 className="font-serif text-3xl text-white mb-4">
              ¡Gracias por confiar en nosotros!
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Tu solicitud ha sido recibida. Nuestro equipo te contactará pronto.
            </p>
            
            <motion.button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Volver al Inicio
            </motion.button>
          </motion.div>
        );
      
      default:
        return (
          <>
            {/* Header */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gradient-gold mb-4">
                Segunda Opinión
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Elige cómo podemos ayudarte a tomar la mejor decisión
              </p>
            </motion.div>

            {/* Option Cards */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="grid md:grid-cols-2 gap-6">
                {options.map((option, index) => {
                  const Icon = option.icon;
                  const isHovered = hoveredCard === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      className="card-premium p-8 text-left group cursor-pointer relative overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                      onMouseEnter={() => setHoveredCard(option.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onTouchStart={() => setHoveredCard(option.id)}
                      onTouchEnd={() => setTimeout(() => setHoveredCard(null), 1500)}
                      onClick={() => handleOptionSelect(option.id)}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative z-10">
                        <div className={`
                          p-3 rounded-xl inline-flex mb-4 transition-colors duration-300
                          ${option.color === 'gold' 
                            ? 'bg-gold/10 border border-gold/20 group-hover:bg-gold/20' 
                            : 'bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20'
                          }
                        `}>
                          <Icon className={`w-8 h-8 ${option.color === 'gold' ? 'text-gold' : 'text-purple-400'}`} />
                        </div>
                        
                        <h3 className="font-serif text-2xl text-foreground group-hover:text-gold transition-colors duration-300 mb-3">
                          {option.title}
                        </h3>
                        
                        <AnimatePresence>
                          {isHovered && (
                            <motion.p
                              className="text-muted-foreground leading-relaxed"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {option.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Hover glow effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                        style={{
                          background: option.color === 'gold'
                            ? "radial-gradient(ellipse at center, hsla(42, 85%, 55%, 0.08) 0%, transparent 70%)"
                            : "radial-gradient(ellipse at center, hsla(270, 70%, 55%, 0.08) 0%, transparent 70%)",
                        }}
                      />

                      {/* Arrow indicator */}
                      <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        animate={isHovered ? { x: 0 } : { x: -10 }}
                      >
                        <svg 
                          className={`w-6 h-6 ${option.color === 'gold' ? 'text-gold' : 'text-purple-400'}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { label: "Análisis profesional", sublabel: "Por especialistas" },
                { label: "Respuesta rápida", sublabel: "En menos de 48h" },
                { label: "100% confidencial", sublabel: "Datos protegidos" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-charcoal/30 rounded-xl border border-border/20"
                >
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sublabel}</p>
                </div>
              ))}
            </motion.div>

            {/* Note */}
            <motion.p
              className="text-center text-muted-foreground/60 text-sm mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Tu información es tratada con total confidencialidad
            </motion.p>
          </>
        );
    }
  };

  return (
    <>
      <AnimatedBackground />
      
      <main className="min-h-screen flex flex-col px-4 py-8 md:py-12">
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col">
          {/* Back Link - Solo en selección */}
          {currentFlow === 'selection' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Link>
            </motion.div>
          )}

          {/* Main content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFlow}
              className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: currentFlow === 'selection' ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentFlow !== 'selection' && currentFlow !== 'success' ? (
                <div 
                  className="card-premium p-6 md:p-8"
                  style={{ 
                    background: "rgba(12, 12, 15, 0.88)", 
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(196, 162, 101, 0.15)"
                  }}
                >
                  {renderContent()}
                </div>
              ) : (
                renderContent()
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default SegundaOpinion;
