import { motion } from "framer-motion";
import { useMemo } from "react";
import logoMiroVertical from "@/assets/logo-miro-vertical.png";

/**
 * Versión Híbrida: Combina lo mejor de V2 y V3
 * - Aurora cónica rotando de V3
 * - Ondas fluidas de V2
 * - Anillos emanando de V2
 * - Rayos de luz de V3
 * - Partículas flotantes de V2
 * - Optimizado para móviles
 */

const FloatingParticle = ({ index }: { index: number }) => {
  const position = useMemo(() => ({
    left: `${10 + index * 12}%`,
    top: `${25 + (index % 4) * 18}%`,
  }), [index]);

  return (
    <motion.div
      className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
      style={{
        background: `hsla(43, 70%, ${55 + index * 4}%, 0.5)`,
        ...position,
      }}
      animate={{
        y: [-15, 15, -15],
        x: [-8, 8, -8],
        opacity: [0.2, 0.7, 0.2],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 4 + index * 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
    />
  );
};

const HeroLogoHybrid = () => {
  const particles = useMemo(() => [...Array(6)], []);

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-cream flex flex-col">
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 100% at 50% 20%, hsla(43, 70%, 60%, 0.07) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 90% 90%, hsla(100, 12%, 65%, 0.04) 0%, transparent 45%)
            `,
          }}
        />

        {/* Flowing wave 1 - from V2 */}
        <motion.div
          className="absolute top-[15%] left-0 w-[200%] h-[50%]"
          style={{
            background: "linear-gradient(90deg, transparent, hsla(43, 70%, 60%, 0.07), hsla(43, 75%, 65%, 0.03), transparent)",
            filter: "blur(50px)",
          }}
          animate={{
            x: ["-50%", "0%", "-50%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Flowing wave 2 - opposite direction */}
        <motion.div
          className="absolute top-[45%] left-0 w-[200%] h-[35%]"
          style={{
            background: "linear-gradient(90deg, transparent, hsla(43, 65%, 55%, 0.05), hsla(100, 15%, 60%, 0.025), transparent)",
            filter: "blur(70px)",
          }}
          animate={{
            x: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating conic vortex - from V3 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px]"
          style={{
            background: "conic-gradient(from 0deg, transparent, hsla(43, 70%, 55%, 0.06), transparent, hsla(43, 65%, 50%, 0.04), transparent)",
            filter: "blur(35px)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Central pulsing core */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(43, 70%, 58%, 0.18) 0%, hsla(43, 70%, 55%, 0.06) 35%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Emanating rings - from V2 */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              borderColor: `hsla(43, 70%, 55%, ${0.12 - i * 0.03})`,
              width: 120 + i * 100,
              height: 120 + i * 100,
            }}
            animate={{
              scale: [1, 2.8],
              opacity: [0.35, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Light rays - from V3, simplified for mobile */}
        <div className="hidden sm:block">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                width: "1.5px",
                height: "28vh",
                background: `linear-gradient(to top, transparent, hsla(43, 70%, 55%, 0.25), transparent)`,
                transform: `translate(-50%, -100%) rotate(${i * 72}deg)`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scaleY: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        {/* Floating particles - from V2, reduced for performance */}
        {particles.map((_, i) => (
          <FloatingParticle key={`particle-${i}`} index={i} />
        ))}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 md:py-0 text-center relative z-10">
        
        {/* Logo container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Multi-layer glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[380px] md:h-[380px] rounded-full -z-10"
            style={{
              background: "radial-gradient(circle, hsla(43, 70%, 55%, 0.28) 0%, hsla(43, 70%, 55%, 0.08) 45%, transparent 65%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[520px] md:h-[520px] rounded-full -z-20"
            style={{
              background: "radial-gradient(circle, hsla(43, 70%, 55%, 0.08) 0%, transparent 55%)",
            }}
            animate={{
              scale: [1.05, 0.95, 1.05],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Logo with float */}
          <motion.img
            src={logoMiroVertical}
            alt="Clínica Miró - Odontología Predictiva"
            className="w-[160px] sm:w-[220px] md:w-[320px] lg:w-[380px] h-auto mx-auto"
            style={{
              filter: "drop-shadow(0 12px 45px hsla(43, 70%, 50%, 0.28))",
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="mt-5 sm:mt-7 md:mt-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.p
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.45em] md:tracking-[0.55em] uppercase font-sans font-light"
            style={{ color: "hsl(var(--gold))" }}
            initial={{ y: 25 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            Odontología Predictiva
          </motion.p>
        </motion.div>

        {/* Animated line with shimmer */}
        <motion.div
          className="mt-4 sm:mt-5 md:mt-7 w-14 sm:w-20 md:w-32 h-[1px] sm:h-[2px] mx-auto relative overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)",
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(0, 0%, 100%, 0.7), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.5,
            }}
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mt-5 sm:mt-7 md:mt-10 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-normal tracking-wide"
          style={{ color: "hsl(var(--charcoal))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-0">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Repara
            </motion.span>
            <motion.span 
              className="hidden sm:inline mx-2 md:mx-3 lg:mx-4" 
              style={{ color: "hsl(var(--gold))" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.55 }}
            >
              ·
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.65 }}
            >
              Recupera
            </motion.span>
            <motion.span 
              className="hidden sm:inline mx-2 md:mx-3 lg:mx-4" 
              style={{ color: "hsl(var(--gold))" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.8 }}
            >
              ·
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              Revive
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 sm:mt-5 md:mt-8 text-xs sm:text-sm md:text-base lg:text-lg font-body font-light leading-relaxed max-w-[280px] sm:max-w-sm md:max-w-lg mx-auto px-1"
          style={{ color: "hsla(220, 15%, 30%, 0.88)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1 }}
        >
          Pioneros en inteligencia artificial predictiva para tratamientos más seguros
        </motion.p>

        {/* Closing tagline with shimmer */}
        <motion.div
          className="mt-5 sm:mt-6 md:mt-10 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 2.4 }}
        >
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl font-heading italic tracking-wide"
            style={{ color: "hsl(var(--gold-dim))" }}
          >
            El futuro de tu sonrisa, hoy
          </p>
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(43, 70%, 70%, 0.28), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2.5,
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 pb-6 sm:pb-10 md:pb-14 flex flex-col items-center gap-2 sm:gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.8 }}
      >
        <motion.span
          className="text-[8px] sm:text-[9px] md:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-sans font-light"
          style={{ color: "hsla(220, 15%, 40%, 0.55)" }}
          animate={{ opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Descubre más
        </motion.span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-4 h-7 sm:w-5 sm:h-9 md:w-6 md:h-10 rounded-full border sm:border-2 flex items-start justify-center p-1 sm:p-1.5"
            style={{ borderColor: "hsla(43, 70%, 55%, 0.4)" }}
          >
            <motion.div
              className="w-1 h-1.5 sm:w-1.5 sm:h-2 md:w-1.5 md:h-2.5 rounded-full"
              style={{ background: "hsl(var(--gold))" }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroLogoHybrid;
