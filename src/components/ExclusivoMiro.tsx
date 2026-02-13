import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Treatment {
  id: string;
  name: string;
  tagline?: string;
  fadeText: string;
  modalText: string;
  disclaimer?: string;
  accent?: "gold-intense" | "gold-curve" | "gold-grid" | "gold-clinical";
  url?: string;
}

const accentStyles: Record<string, React.CSSProperties> = {
  "gold-intense": {
    background: "linear-gradient(90deg, rgba(196, 162, 101, 0.35) 0%, rgba(196, 162, 101, 0.08) 60%, transparent 100%)",
  },
  "gold-curve": {
    background: "linear-gradient(135deg, rgba(196, 162, 101, 0.25) 0%, rgba(155, 138, 165, 0.08) 50%, transparent 100%)",
    borderRadius: "0 0 50% 0",
  },
  "gold-grid": {
    background: `
      linear-gradient(90deg, rgba(196, 162, 101, 0.20) 0%, transparent 60%),
      repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(196, 162, 101, 0.05) 8px, rgba(196, 162, 101, 0.05) 9px)
    `,
  },
  "gold-clinical": {
    background: "linear-gradient(90deg, rgba(196, 162, 101, 0.25) 0%, rgba(159, 183, 198, 0.15) 40%, transparent 70%)",
  },
};

const treatments: Treatment[] = [
  {
    id: "implant-one",
    name: "Implant One",
    tagline: "Implantes en un día",
    fadeText: "Diagnóstico, planificación y ejecución en un solo flujo. Carga inmediata solo si es técnicamente y biológicamente viable.",
    modalText: "Implant One integra 25 años de experiencia clínica con planificación digital e IA. Si la carga inmediata no es recomendable, el paciente igual sale con una solución provisional estética y funcional.",
    disclaimer: "*La carga inmediata depende de criterios clínicos y biológicos.",
    accent: "gold-intense",
    url: "/servicios/implantes",
  },
  {
    id: "revive",
    name: "Revive FACE.SMILE™",
    tagline: "Análisis Biométrico Dentofacial IA",
    fadeText: "No diseñamos solo dientes: diseñamos el rostro completo. IA dentofacial analiza proporciones faciales y dentales.",
    modalText: "Integra estética dental y facial con análisis IA para un plan único, natural y medible.",
    accent: "gold-curve",
    url: "/servicios/estetica-dental",
  },
  {
    id: "align",
    name: "ALIGN",
    tagline: "Ortodoncia Inteligente",
    fadeText: "Alineadores u ortodoncia convencional según lo que tu caso realmente necesita. Plan medible, estético y personalizado.",
    modalText: "Desde alineadores transparentes hasta ortodoncia convencional cuando corresponde. Priorizamos biología, estética facial y estabilidad a largo plazo.",
    accent: "gold-grid",
    url: "/servicios/ortodoncia",
  },
  {
    id: "zero-caries",
    name: "ZERO CARIES",
    tagline: "Prevención Regenerativa",
    fadeText: "Detectamos y tratamos caries antes de que duelan. Diagnóstico asistido por IA y enfoque regenerativo con Curodont.",
    modalText: "ZERO CARIES busca intervención temprana y mínimamente invasiva cuando el caso lo permite, evitando procedimientos agresivos.",
    accent: "gold-clinical",
    url: "/servicios/prevencion",
  },
];

const TreatmentCard = ({ treatment, onOpenModal, index }: { treatment: Treatment; onOpenModal: () => void; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const accentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden group cursor-pointer min-h-[260px] md:min-h-[280px] flex flex-col rounded-2xl"
      style={{
        background: "rgba(10, 10, 14, 0.92)",
        border: "1px solid rgba(196, 162, 101, 0.22)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(196, 162, 101, 0.08)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      whileHover={{
        boxShadow: "0 8px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(196, 162, 101, 0.15)",
        borderColor: "rgba(196, 162, 101, 0.35)",
        background: "rgba(12, 12, 16, 0.95)",
        y: -4,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Parallax background layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          y: backgroundY,
          scale: 1.2,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${index % 2 === 0 ? '30%' : '70%'} 50%, rgba(196, 162, 101, 0.08) 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      {/* Micro-brand accent line with parallax opacity */}
      {treatment.accent && (
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            ...accentStyles[treatment.accent],
            opacity: accentOpacity,
          }}
        />
      )}

      {/* Clinical blue dot for ZERO CARIES */}
      {treatment.accent === "gold-clinical" && (
        <div 
          className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full"
          style={{ background: "rgba(159, 183, 198, 0.85)" }}
        />
      )}

      {/* Base content - hidden when hovered */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div 
            className="flex-1 flex flex-col justify-center items-center p-8 md:p-10 relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 drop-shadow-sm" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}>
              {treatment.name}
            </h3>
            {treatment.tagline && (
              <p className="text-gold text-sm md:text-base brand-italic" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{treatment.tagline}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade overlay with full content on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center text-center p-6 z-20"
            style={{
              background: "linear-gradient(180deg, rgba(8, 8, 12, 0.98) 0%, rgba(12, 12, 18, 0.98) 100%)",
              backdropFilter: "blur(14px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Title in overlay */}
            <h3 className="font-serif text-xl md:text-2xl text-white mb-3" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}>
              {treatment.name}
            </h3>
            {treatment.tagline && (
              <p className="text-gold text-sm brand-italic mb-4" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>{treatment.tagline}</p>
            )}
            
            {/* Description text */}
            <p className="text-white/90 text-sm leading-relaxed font-light flex-1" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              {treatment.fadeText}
            </p>
            
            {/* CTA Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
              }}
              className="mt-4 text-xs px-5 py-2.5 rounded-lg border border-gold/40 text-white bg-transparent font-sans font-medium uppercase tracking-wide"
              style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
              whileHover={{ borderColor: "rgba(196, 162, 101, 0.7)", background: "rgba(196, 162, 101, 0.12)", scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver cómo funciona
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TreatmentModal = ({ treatment, onClose }: { treatment: Treatment; onClose: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.08
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.85, 
      opacity: 0, 
      y: 40,
      rotateX: 10
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-1000"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop with blur animation */}
      <motion.div 
        className="absolute inset-0 bg-black/85"
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(12px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/30"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      
      {/* Modal content */}
      <motion.div
        className="relative bg-card border border-gold/25 rounded-2xl p-6 md:p-8 max-w-lg w-full overflow-hidden"
        style={{
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(196, 162, 101, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
        variants={modalVariants}
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(196, 162, 101, 0.15) 0%, transparent 50%, rgba(196, 162, 101, 0.1) 100%)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Header */}
        <motion.h3 
          className="font-serif text-2xl md:text-3xl font-semibold text-gradient-gold mb-2"
          variants={itemVariants}
        >
          {treatment.name}
        </motion.h3>
        {treatment.tagline && (
          <motion.p 
            className="text-gold/80 text-sm italic mb-4"
            variants={itemVariants}
          >
            {treatment.tagline}
          </motion.p>
        )}

        {/* Content */}
        <motion.p 
          className="text-foreground/90 leading-relaxed mb-6"
          variants={itemVariants}
        >
          {treatment.modalText}
        </motion.p>

        {/* Disclaimer */}
        {treatment.disclaimer && (
          <motion.p 
            className="text-muted-foreground text-xs mb-6 italic"
            variants={itemVariants}
          >
            {treatment.disclaimer}
          </motion.p>
        )}

        {/* Dual CTA */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3"
          variants={itemVariants}
        >
          <Link
            to="/empezar"
            className="cta-primary flex-1 inline-flex items-center justify-center"
          >
            <Calendar className="w-5 h-5" />
            <span>Agendar</span>
          </Link>
          {treatment.url && (
            <Link
              to={treatment.url}
              className="cta-secondary flex-1 inline-flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Más información</span>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ExclusivoMiro = () => {
  const [activeModal, setActiveModal] = useState<Treatment | null>(null);

  return (
    <section className="py-16 md:py-24">
      {/* Section header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="tagline mb-4">Tratamientos Exclusivos</p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
          Exclusivo <span className="brand-italic">Miró</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
          Tratamientos únicos, personalizables y pioneros en Chile.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        {treatments.map((treatment, index) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            index={index}
            onOpenModal={() => setActiveModal(treatment)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <TreatmentModal
            treatment={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExclusivoMiro;
