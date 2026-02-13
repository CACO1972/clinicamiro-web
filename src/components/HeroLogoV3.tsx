import { motion } from "framer-motion";
import { useMemo } from "react";
import logoMiroVertical from "@/assets/logo-miro-vertical.png";

/**
 * Version 3: Efecto "Aurora Boreal" con gradientes morphing
 * Ultra dinámico con ondas de luz que fluyen constantemente
 */

const AuroraWave = ({ delay, duration, color1, color2, top, rotation }: {
  delay: number;
  duration: number;
  color1: string;
  color2: string;
  top: string;
  rotation: number;
}) => (
  <motion.div
    className="absolute left-0 w-[300%] h-[40%]"
    style={{
      top,
      background: `linear-gradient(${rotation}deg, transparent 20%, ${color1} 40%, ${color2} 60%, transparent 80%)`,
      filter: "blur(100px)",
      transform: `rotate(${rotation}deg)`,
    }}
    animate={{
      x: ["-66%", "0%", "-66%"],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
);

const HeroLogoV3 = () => {
  // Reducir ondas en móvil para mejor rendimiento
  const auroraWaves = useMemo(() => [
    { delay: 0, duration: 20, color1: "hsla(43, 70%, 55%, 0.15)", color2: "hsla(43, 80%, 65%, 0.08)", top: "10%", rotation: -5 },
    { delay: 3, duration: 25, color1: "hsla(43, 65%, 50%, 0.12)", color2: "hsla(100, 15%, 60%, 0.06)", top: "40%", rotation: 3 },
    { delay: 6, duration: 18, color1: "hsla(43, 75%, 60%, 0.1)", color2: "hsla(43, 70%, 55%, 0.05)", top: "70%", rotation: -2 },
  ], []);

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-cream flex flex-col">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 100% at 50% 0%, hsla(43, 60%, 55%, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 100% 100%, hsla(100, 15%, 60%, 0.04) 0%, transparent 40%)
            `,
          }}
        />

        {/* Aurora waves - optimizado para móvil */}
        {auroraWaves.map((wave, i) => (
          <AuroraWave key={i} {...wave} />
        ))}

        {/* Central vortex effect - tamaño reducido en móvil */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[1000px] md:h-[1000px]"
          style={{
            background: "conic-gradient(from 0deg, transparent, hsla(43, 70%, 55%, 0.08), transparent, hsla(43, 65%, 50%, 0.05), transparent)",
            filter: "blur(40px)",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulsing core - optimizado */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(43, 70%, 55%, 0.2) 0%, hsla(43, 70%, 55%, 0.08) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Light rays - solo 4 en móvil, 6 en desktop */}
        <div className="hidden sm:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                width: "2px",
                height: "30vh",
                background: `linear-gradient(to top, transparent, hsla(43, 70%, 55%, 0.3), transparent)`,
                transform: `translate(-50%, -100%) rotate(${i * 60}deg)`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        {/* Rayos simplificados para móvil */}
        <div className="block sm:hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                width: "1px",
                height: "25vh",
                background: `linear-gradient(to top, transparent, hsla(43, 70%, 55%, 0.25), transparent)`,
                transform: `translate(-50%, -100%) rotate(${i * 90}deg)`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content - padding ajustado para móvil */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-0 text-center relative z-10">
        {/* Logo with 3D rotation entrance */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Multi-layer glow - tamaños optimizados */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] rounded-full -z-10"
            style={{
              background: "radial-gradient(circle, hsla(43, 70%, 55%, 0.3) 0%, hsla(43, 70%, 55%, 0.1) 40%, transparent 60%)",
            }}
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[550px] md:h-[550px] rounded-full -z-20"
            style={{
              background: "radial-gradient(circle, hsla(43, 70%, 55%, 0.1) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Logo - tamaño responsive optimizado */}
          <motion.img
            src={logoMiroVertical}
            alt="Clínica Miró - Odontología Predictiva"
            className="w-[180px] sm:w-[240px] md:w-[340px] lg:w-[400px] h-auto mx-auto"
            style={{
              filter: "drop-shadow(0 15px 50px hsla(43, 70%, 50%, 0.3))",
            }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-12 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] uppercase font-sans font-light"
            style={{ color: "hsl(var(--gold))" }}
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Odontología Predictiva
          </motion.p>
        </motion.div>

        {/* Animated gradient line */}
        <motion.div
          className="mt-4 sm:mt-6 md:mt-8 w-16 sm:w-24 md:w-40 h-[1px] sm:h-[2px] mx-auto relative overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
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
              background: "linear-gradient(90deg, transparent, hsla(255, 100%, 100%, 0.8), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
          />
        </motion.div>

        {/* Main Headline - stack en móvil, inline en desktop */}
        <motion.h1
          className="mt-6 sm:mt-8 md:mt-12 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-normal tracking-wide"
          style={{ color: "hsl(var(--charcoal))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Repara
            </motion.span>
            <motion.span 
              className="hidden sm:inline mx-2 md:mx-4" 
              style={{ color: "hsl(var(--gold))" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.7 }}
            >
              ·
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              Recupera
            </motion.span>
            <motion.span 
              className="hidden sm:inline mx-2 md:mx-4" 
              style={{ color: "hsl(var(--gold))" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2 }}
            >
              ·
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.1 }}
            >
              Revive
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle - texto más pequeño y con padding lateral */}
        <motion.p
          className="mt-5 sm:mt-6 md:mt-10 text-sm sm:text-base md:text-lg lg:text-xl font-body font-light leading-relaxed max-w-xs sm:max-w-md md:max-w-xl mx-auto px-2"
          style={{ color: "hsla(220, 15%, 30%, 0.9)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          Pioneros en inteligencia artificial predictiva para tratamientos más seguros
        </motion.p>

        {/* Closing tagline with shimmer */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-12 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading italic tracking-wide"
            style={{ color: "hsl(var(--gold-dim))" }}
          >
            El futuro de tu sonrisa, hoy
          </p>
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(43, 70%, 70%, 0.3), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator - más compacto en móvil */}
      <motion.div
        className="relative z-10 pb-8 sm:pb-12 md:pb-16 flex flex-col items-center gap-2 sm:gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.2 }}
      >
        <motion.span
          className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-sans font-light"
          style={{ color: "hsla(220, 15%, 40%, 0.6)" }}
        >
          Descubre más
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-5 h-9 sm:w-6 sm:h-10 md:w-7 md:h-12 rounded-full border sm:border-2 flex items-start justify-center p-1.5 sm:p-2"
            style={{ borderColor: "hsl(var(--gold))", opacity: 0.5 }}
          >
            <motion.div
              className="w-1.5 h-2 sm:w-2 sm:h-3 rounded-full"
              style={{ background: "hsl(var(--gold))" }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroLogoV3;
