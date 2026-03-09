import { motion } from "framer-motion";
import { Suspense } from "react";
import FogBackground from "./FogBackground";
import logoM from "@/assets/logo-miro-m.png";

interface SplashProps {
  onComplete: () => void;
}

const Splash = ({ onComplete }: SplashProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#080808" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.9, delay: 3.2 }}
      onAnimationComplete={onComplete}
    >
      <Suspense fallback={null}>
        <FogBackground className="z-0 opacity-30" />
      </Suspense>

      {/* Overlay sutil */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,162,101,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">

        {/* Logo M */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <img
            src={logoM}
            alt="Clínica Miró"
            style={{ width: "clamp(100px, 22vw, 180px)", height: "auto", filter: "brightness(1.05)" }}
          />
        </motion.div>

        {/* Línea separadora */}
        <motion.div
          className="w-12 h-px mb-6"
          style={{ background: "linear-gradient(90deg, transparent, rgba(196,162,101,0.6), transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />

        {/* Nombre */}
        <motion.p
          className="font-serif tracking-[0.3em] uppercase text-sm"
          style={{ color: "rgba(196,162,101,0.7)", fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Clínica Miró
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-2 text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Outfit', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          Odontología Predictiva
        </motion.p>

      </div>
    </motion.div>
  );
};

export default Splash;
