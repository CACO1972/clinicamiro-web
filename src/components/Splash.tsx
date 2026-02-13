import { motion } from "framer-motion";
import { Suspense } from "react";
import FogBackground from "./FogBackground";

interface SplashProps {
  onComplete: () => void;
}

const Splash = ({ onComplete }: SplashProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(45, 30%, 96%) 0%, hsl(43, 35%, 92%) 100%)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 3.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Three.js Fog Background - Vanta.js style */}
      <Suspense fallback={null}>
        <FogBackground className="z-0" />
      </Suspense>

      {/* Overlay gradient for better text readability */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, hsla(45, 30%, 96%, 0.6) 0%, transparent 70%),
            radial-gradient(ellipse 100% 100% at 50% 100%, hsla(43, 35%, 92%, 0.8) 0%, transparent 50%)
          `,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* MIRÓ - Static text, no pulsation */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-light tracking-[0.15em]"
          style={{
            color: "hsl(35, 45%, 30%)",
            textShadow: "0 0 80px hsla(43, 50%, 50%, 0.4), 0 4px 30px hsla(35, 40%, 30%, 0.2)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          MIRÓ
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="mt-8 w-16 md:w-24 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsla(35, 45%, 40%, 0.6), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Tagline */}
        <motion.p
          className="mt-8 text-base md:text-lg lg:text-xl font-heading font-light italic tracking-wide max-w-md"
          style={{ color: "hsla(35, 30%, 35%, 0.9)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Bienvenido a una nueva experiencia en odontología
        </motion.p>
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + (i % 4) * 15}%`,
              background: "hsla(43, 60%, 55%, 0.7)",
              boxShadow: "0 0 10px hsla(43, 60%, 55%, 0.5)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
              y: [0, -60, -120],
            }}
            transition={{
              duration: 4,
              delay: 0.8 + i * 0.25,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Splash;
