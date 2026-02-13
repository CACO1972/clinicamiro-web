import { motion } from "framer-motion";
import logoMiroVertical from "@/assets/logo-miro-vertical.png";

const HeroLogo = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col">
      {/* Animated organic background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 80% at 50% 20%, hsla(43, 70%, 60%, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 20% 80%, hsla(100, 12%, 67%, 0.05) 0%, transparent 40%),
              radial-gradient(ellipse 70% 50% at 80% 70%, hsla(43, 65%, 55%, 0.04) 0%, transparent 45%)
            `,
          }}
        />

        {/* Animated wave 1 - Large and slow */}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] rounded-[50%]"
          style={{
            background: "radial-gradient(ellipse at center, hsla(43, 70%, 60%, 0.06) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: ["-50%", "-48%", "-50%"],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated wave 2 - Medium */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[50%] rounded-[50%]"
          style={{
            background: "radial-gradient(ellipse at center, hsla(43, 75%, 65%, 0.08) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 2, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Animated wave 3 - Inner glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(43, 70%, 58%, 0.12) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content - perfectly centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-0 text-center">
        {/* Logo with entrance animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Soft glow behind logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full -z-10"
            style={{
              background: "radial-gradient(circle, hsla(43, 70%, 60%, 0.2) 0%, transparent 55%)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo */}
          <img
            src={logoMiroVertical}
            alt="Clínica Miró - Odontología Predictiva"
            className="w-[220px] md:w-[320px] lg:w-[380px] h-auto mx-auto"
            style={{
              filter: "drop-shadow(0 10px 50px hsla(43, 70%, 50%, 0.25))",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-8 md:mt-10 text-xs md:text-sm tracking-[0.4em] uppercase font-sans font-light"
          style={{ color: "hsl(var(--gold-muted))" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Odontología Predictiva
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-6 md:mt-8 w-16 md:w-24 h-[1px] mx-auto"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />

        {/* Main Headline */}
        <motion.h1
          className="mt-8 md:mt-10 text-3xl md:text-5xl lg:text-6xl font-heading font-normal tracking-wide"
          style={{ color: "hsl(var(--charcoal))" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <span>Repara</span>
          <span className="mx-3 md:mx-4" style={{ color: "hsl(var(--gold))" }}>·</span>
          <span>Recupera</span>
          <span className="mx-3 md:mx-4" style={{ color: "hsl(var(--gold))" }}>·</span>
          <span>Revive</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-base md:text-lg font-body font-light leading-relaxed max-w-lg mx-auto"
          style={{ color: "hsla(220, 15%, 30%, 0.85)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Pioneros en inteligencia artificial predictiva para tratamientos más seguros y personalizados
        </motion.p>

        {/* Closing tagline */}
        <motion.p
          className="mt-8 md:mt-10 text-lg md:text-xl font-heading italic tracking-wide"
          style={{
            color: "hsl(var(--gold-dim))",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          El futuro de tu sonrisa, hoy
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 pb-10 md:pb-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <span
          className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans font-light"
          style={{ color: "hsla(220, 15%, 40%, 0.5)" }}
        >
          Descubre más
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border flex items-start justify-center p-1"
          style={{ borderColor: "hsla(43, 70%, 55%, 0.35)" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "hsl(var(--gold))" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroLogo;
