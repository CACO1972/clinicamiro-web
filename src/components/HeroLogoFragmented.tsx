import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import logoMiro from "@/assets/logo-miro.png";

// Organic wave component that morphs slowly
const OrganicWave = ({ 
  delay, 
  duration, 
  initialColor, 
  targetColor,
  size,
  startAngle 
}: { 
  delay: number; 
  duration: number; 
  initialColor: string;
  targetColor: string;
  size: number;
  startAngle: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
        background: `radial-gradient(ellipse at center, ${initialColor} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      initial={{ 
        scale: 0.3, 
        opacity: 0,
        rotate: startAngle,
      }}
      animate={{ 
        scale: [0.3, 1.5, 2.5],
        opacity: [0, 0.08, 0],
        rotate: [startAngle, startAngle + 60],
        background: [
          `radial-gradient(ellipse at center, ${initialColor} 0%, transparent 70%)`,
          `radial-gradient(ellipse at center, ${targetColor} 0%, transparent 70%)`,
        ]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Particle that emanates and transforms into wave energy
const EmanatingParticle = ({ 
  index, 
  totalParticles 
}: { 
  index: number; 
  totalParticles: number;
}) => {
  const angle = (index / totalParticles) * Math.PI * 2;
  const distance = 150 + Math.random() * 100;
  const particleDelay = 2.5 + index * 0.15;
  
  // Color palette from brand
  const colors = [
    "hsla(40, 45%, 58%, 0.6)",   // Gold
    "hsla(280, 15%, 60%, 0.5)",  // Lilac
    "hsla(200, 20%, 50%, 0.4)",  // Clinical blue
    "hsla(40, 30%, 70%, 0.5)",   // Light gold
  ];
  
  const color = colors[index % colors.length];
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 3 + Math.random() * 3,
        height: 3 + Math.random() * 3,
        left: "50%",
        top: "50%",
        background: color,
        filter: "blur(1px)",
      }}
      initial={{ 
        x: 0, 
        y: 0, 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        x: [0, Math.cos(angle) * distance * 0.5, Math.cos(angle) * distance],
        y: [0, Math.sin(angle) * distance * 0.5, Math.sin(angle) * distance],
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0.5],
      }}
      transition={{
        duration: 3,
        delay: particleDelay,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeOut",
      }}
    />
  );
};

const HeroLogoFragmented = () => {
  const [showFinalLogo, setShowFinalLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFinalLogo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Create fragments for the explosion/reconstruction effect
  const fragments = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    rotateX: Math.random() * 180 - 90,
    rotateY: Math.random() * 180 - 90,
    rotateZ: Math.random() * 90 - 45,
    translateX: (Math.random() - 0.5) * 600,
    translateY: (Math.random() - 0.5) * 400,
    scale: 0.3 + Math.random() * 0.5,
  })), []);

  // Wave configurations for organic ambient effect
  const waves = useMemo(() => [
    { delay: 2.5, duration: 12, initialColor: "hsla(40, 45%, 58%, 0.15)", targetColor: "hsla(280, 15%, 55%, 0.1)", size: 600, startAngle: 0 },
    { delay: 4, duration: 14, initialColor: "hsla(280, 15%, 60%, 0.12)", targetColor: "hsla(200, 20%, 50%, 0.08)", size: 500, startAngle: 45 },
    { delay: 5.5, duration: 16, initialColor: "hsla(200, 20%, 55%, 0.1)", targetColor: "hsla(40, 35%, 60%, 0.12)", size: 700, startAngle: 90 },
    { delay: 7, duration: 13, initialColor: "hsla(40, 35%, 65%, 0.1)", targetColor: "hsla(280, 20%, 50%, 0.08)", size: 550, startAngle: 135 },
  ], []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] overflow-hidden">
      {/* Deep ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gold glow - pulsing */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(40, 45%, 58%, 0.12) 0%, hsla(40, 45%, 58%, 0.04) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Secondary dark halo */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(0, 0%, 5%, 0.3) 0%, transparent 60%)",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Organic morphing waves - appear after logo settles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {waves.map((wave, i) => (
          <OrganicWave key={i} {...wave} />
        ))}
      </div>

      {/* Emanating particles that feed the waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <EmanatingParticle key={i} index={i} totalParticles={12} />
        ))}
      </div>

      {/* Particle effects during reconstruction */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              background: i % 3 === 0 
                ? "hsla(40, 45%, 58%, 0.9)" 
                : i % 3 === 1 
                ? "hsla(0, 0%, 100%, 0.7)"
                : "hsla(0, 0%, 10%, 0.6)",
            }}
            initial={{ 
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 300,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: [null, 0],
              y: [null, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2,
              delay: 0.3 + i * 0.08,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div className="relative z-10" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          {!showFinalLogo ? (
            /* Fragments animating inward */
            <motion.div
              key="fragments"
              className="relative w-[320px] md:w-[550px] lg:w-[700px]"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {fragments.map((fragment, index) => (
                <motion.img
                  key={fragment.id}
                  src={logoMiro}
                  alt=""
                  className="absolute inset-0 w-full h-auto"
                  style={{
                    transformStyle: "preserve-3d",
                    opacity: 0.15,
                  }}
                  initial={{
                    opacity: 0,
                    rotateX: fragment.rotateX,
                    rotateY: fragment.rotateY,
                    rotateZ: fragment.rotateZ,
                    x: fragment.translateX,
                    y: fragment.translateY,
                    scale: fragment.scale,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: [0, 0.3, 0.15],
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.1 + index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              ))}
              
              {/* Ghost logo that builds up opacity */}
              <motion.img
                src={logoMiro}
                alt="Clínica Miró"
                className="relative w-full h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
            </motion.div>
          ) : (
            /* Final clean logo */
            <motion.div
              key="final"
              className="relative"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.img
                src={logoMiro}
                alt="Clínica Miró - Odontología de Excelencia"
                className="w-[320px] md:w-[550px] lg:w-[700px] h-auto drop-shadow-xl"
                animate={{ 
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Golden line accent */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "50%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
        />
        
        {/* Glow pulse behind logo */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse at center, hsla(40, 45%, 58%, 0.1) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 1, delay: 2 }}
        />
      </div>

      {/* Tagline below logo */}
      <motion.div
        className="relative z-10 mt-10 md:mt-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.3 }}
      >
        <p 
          className="text-sm md:text-base tracking-[0.4em] uppercase font-light"
          style={{ color: "hsla(40, 35%, 45%, 0.9)" }}
        >
          Odontología de Excelencia
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        <span 
          className="text-xs tracking-widest uppercase"
          style={{ color: "hsla(40, 25%, 45%, 0.6)" }}
        >
          Descubre
        </span>
        <motion.div
          className="w-[1px] h-8"
          style={{ background: "linear-gradient(to bottom, hsla(40, 45%, 58%, 0.5), transparent)" }}
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default HeroLogoFragmented;
