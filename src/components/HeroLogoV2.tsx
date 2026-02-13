import { motion } from "framer-motion";
import logoMiroVertical from "@/assets/logo-miro-vertical.png";

/**
 * Version 2: Ondas orgánicas fluidas + partículas emanando del centro
 * Más dinamismo con múltiples capas de movimiento
 */
const HeroLogoV2 = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col">
      {/* Animated organic waves background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep base layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 100% at 50% 30%, hsla(43, 70%, 60%, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse 100% 80% at 20% 90%, hsla(100, 12%, 67%, 0.04) 0%, transparent 50%)
            `,
          }}
        />

        {/* Flowing wave 1 - Large, slow horizontal drift */}
        <motion.div
          className="absolute top-[20%] left-0 w-[200%] h-[60%]"
          style={{
            background: "linear-gradient(90deg, transparent, hsla(43, 70%, 60%, 0.08), hsla(43, 75%, 65%, 0.04), transparent)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["-50%", "0%", "-50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Flowing wave 2 - Medium, opposite direction */}
        <motion.div
          className="absolute top-[40%] left-0 w-[200%] h-[40%]"
          style={{
            background: "linear-gradient(90deg, transparent, hsla(43, 65%, 55%, 0.06), hsla(100, 15%, 60%, 0.03), transparent)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsating central orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(43, 70%, 58%, 0.15) 0%, hsla(43, 70%, 55%, 0.05) 30%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Emanating rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              borderColor: `hsla(43, 70%, 55%, ${0.15 - i * 0.04})`,
              width: 200 + i * 150,
              height: 200 + i * 150,
            }}
            animate={{
              scale: [1, 2.5],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.3,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `hsla(43, 70%, ${55 + i * 3}%, 0.6)`,
              left: `${15 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-0 text-center relative z-10">
        {/* Logo with dramatic entrance */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Breathing glow behind logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full -z-10"
            style={{
              background: "radial-gradient(circle, hsla(43, 70%, 55%, 0.25) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo */}
          <motion.img
            src={logoMiroVertical}
            alt="Clínica Miró - Odontología Predictiva"
            className="w-[260px] md:w-[380px] lg:w-[420px] h-auto mx-auto"
            style={{
              filter: "drop-shadow(0 15px 60px hsla(43, 70%, 50%, 0.3))",
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

        {/* Tagline with stagger */}
        <motion.p
          className="mt-10 md:mt-12 text-xs md:text-sm tracking-[0.5em] uppercase font-sans font-light"
          style={{ color: "hsl(var(--gold-muted))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Odontología Predictiva
        </motion.p>

        {/* Animated line */}
        <motion.div
          className="mt-6 md:mt-8 w-20 md:w-32 h-[2px] mx-auto overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Main Headline with word-by-word animation */}
        <motion.h1
          className="mt-8 md:mt-10 text-3xl md:text-5xl lg:text-6xl font-heading font-normal tracking-wide flex flex-wrap justify-center gap-2 md:gap-4"
          style={{ color: "hsl(var(--charcoal))" }}
        >
          {["Repara", "·", "Recupera", "·", "Revive"].map((word, i) => (
            <motion.span
              key={i}
              style={{ color: word === "·" ? "hsl(var(--gold))" : undefined }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 + i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-base md:text-lg font-body font-light leading-relaxed max-w-lg mx-auto"
          style={{ color: "hsla(220, 15%, 30%, 0.85)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          Pioneros en inteligencia artificial predictiva para tratamientos más seguros y personalizados
        </motion.p>

        {/* Closing tagline */}
        <motion.p
          className="mt-8 md:mt-10 text-lg md:text-xl font-heading italic tracking-wide"
          style={{ color: "hsl(var(--gold-dim))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          El futuro de tu sonrisa, hoy
        </motion.p>
      </div>

      {/* Scroll indicator with bounce */}
      <motion.div
        className="relative z-10 pb-10 md:pb-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <motion.span
          className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans font-light"
          style={{ color: "hsla(220, 15%, 40%, 0.5)" }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Descubre más
        </motion.span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5"
          style={{ borderColor: "hsla(43, 70%, 55%, 0.4)" }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2.5 rounded-full"
            style={{ background: "hsl(var(--gold))" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroLogoV2;
