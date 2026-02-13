import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import FogBackground from "./FogBackground";

/**
 * ULTIMATE HERO: Basado en BIENVENIDA-FINAL.html pero mejorado
 * - Fondo FOG estilo Vanta.js con Three.js
 * - Spotlights cónicos animados
 * - Sistema de partículas con canvas + conexiones
 * - Líneas de acento geométricas
 * - Diamantes flotantes
 * - Efecto shimmer en texto
 */

// ═══════════════════════════════════════════════════════════════
// PARTICLE CANVAS COMPONENT
// ═══════════════════════════════════════════════════════════════
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
    pulse: number;
  }>>([]);
  const animationRef = useRef<number>();

  const colors = useMemo(() => ['#C9A87C', '#E8D5B5', '#D4BC9A', '#F5F0E8'], []);

  const createParticle = useCallback((width: number, height: number) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.4,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.4 + 0.15,
    color: colors[Math.floor(Math.random() * colors.length)],
    pulse: Math.random() * Math.PI * 2
  }), [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize particles on resize
      const particleCount = window.innerWidth < 640 ? 40 : 70;
      particlesRef.current = Array.from({ length: particleCount }, () => 
        createParticle(canvas.width, canvas.height)
      );
    };

    const drawConnections = () => {
      const particles = particlesRef.current;
      const connectionDistance = window.innerWidth < 640 ? 80 : 120;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#C9A87C';
            ctx.globalAlpha = 0.06 * (1 - distance / connectionDistance);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawConnections();

      particlesRef.current.forEach(p => {
        // Update
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.012;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        const pulseOpacity = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = pulseOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.8 }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════
// SPOTLIGHT COMPONENT
// ═══════════════════════════════════════════════════════════════
const Spotlight = ({ rotation, duration, delay }: { rotation: number; duration: number; delay: number }) => (
  <motion.div
    className="absolute left-0 right-0 mx-auto top-0 w-[320px] sm:w-[500px] md:w-[650px]"
    style={{
      height: '95vh',
      maxHeight: '800px',
      background: `conic-gradient(
        from 0deg at 50% -5%,
        transparent 42%,
        rgba(201, 168, 124, 0.35) 47%,
        rgba(232, 213, 181, 0.65) 50%,
        rgba(201, 168, 124, 0.35) 53%,
        transparent 58%
      )`,
      borderRadius: '0 0 50% 50%',
      transformOrigin: '50% 0',
      filter: 'blur(12px)',
    }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: 0.85,
      scale: 1,
      rotate: rotation,
    }}
    transition={{
      opacity: { duration: 1.5, delay },
      scale: { duration: 1.5, delay },
      rotate: { duration: 1.5, delay },
    }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'inherit',
        borderRadius: 'inherit',
      }}
      animate={{
        rotate: [-3, 3, -3],
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// ACCENT LINES COMPONENT
// ═══════════════════════════════════════════════════════════════
const AccentLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Horizontal lines */}
    {[8, 14, 20, 28, 35].map((top, i) => (
      <motion.div
        key={`h-${i}`}
        className="absolute left-0 right-0 mx-auto h-[1px]"
        style={{
          top: `${top}%`,
          background: 'linear-gradient(90deg, transparent, rgba(201, 168, 124, 0.12), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 + i * 0.1 }}
      />
    ))}
    
    {/* Vertical lines - hidden on mobile */}
    <div className="hidden sm:block">
      {[-18, -12, 12, 18].map((offset, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 w-[1px] h-[60%]"
          style={{
            left: `calc(50% + ${offset}%)`,
            background: 'rgba(201, 168, 124, 0.1)',
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 + i * 0.1, ease: "easeOut" }}
        />
      ))}
    </div>

    {/* Intersection dots */}
    {[
      { top: '20%', left: 'calc(50% - 18%)' },
      { top: '20%', left: 'calc(50% + 18%)' },
      { top: '28%', left: 'calc(50% - 18%)' },
      { top: '28%', left: 'calc(50% + 18%)' },
    ].map((pos, i) => (
      <motion.div
        key={`dot-${i}`}
        className="absolute hidden sm:block w-1 h-1 rounded-full bg-gold"
        style={pos}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
      />
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// DIAMOND COMPONENT
// ═══════════════════════════════════════════════════════════════
const Diamond = ({ size, translateX, translateY, delay }: { 
  size: number; 
  translateX: string; 
  translateY: string; 
  delay: number;
}) => (
  <motion.div
    className="absolute left-0 right-0 mx-auto"
    style={{
      width: size,
      height: size,
      bottom: '-15%',
      transform: `translateX(${translateX}) translateY(${translateY}) rotate(45deg)`,
      background: '#0f0e0c',
      boxShadow: `
        -8px -2px 4px -9px rgba(201, 168, 124, 0.8),
        inset 0 0 0 2px rgba(201, 168, 124, 0.6),
        inset 3px 4px 4px -3px rgba(232, 213, 181, 0.4),
        inset 80px 80px 16px -80px rgba(201, 168, 124, 0.15)
      `,
    }}
    initial={{ y: 200, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {/* Inner pattern */}
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        background: `repeating-radial-gradient(
          at 100% 100%,
          transparent 0%,
          rgba(201, 168, 124, 0.08) 2px,
          transparent 4px
        )`,
        borderBottomRightRadius: '100%',
      }}
    />
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// MID SPOT (Central glowing orb)
// ═══════════════════════════════════════════════════════════════
const MidSpot = () => (
  <motion.div
    className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full z-20"
    style={{
      background: '#0a0908',
      boxShadow: '0 0 16px 2px rgba(201, 168, 124, 0.7)',
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    whileHover={{ scale: 1.2, boxShadow: '0 0 24px 4px rgba(201, 168, 124, 1)' }}
  >
    {/* Pulse ring */}
    <motion.div
      className="absolute -inset-1.5 rounded-full border border-gold/30"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.6, 0, 0.6],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
const HeroLogoUltimate = () => {
  return (
    <div 
      className="relative w-full min-h-[100svh] overflow-hidden flex flex-col"
      style={{
        background: '#0a0908',
      }}
    >
      {/* Three.js FOG Background - Vanta.js style */}
      <Suspense fallback={null}>
        <FogBackground className="z-0 opacity-70" variant="dark" />
      </Suspense>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <Spotlight rotation={22} duration={17} delay={0.3} />
        <Spotlight rotation={-22} duration={14} delay={0.5} />
        <Spotlight rotation={0} duration={21} delay={0.7} />
      </div>

      {/* Accent lines */}
      <AccentLines />

      {/* Mid spot */}
      <MidSpot />

      {/* ═══════════════════════════════════════════════════════════════
         MAIN CONTENT
         ═══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10">
        
        {/* Bienvenido a */}
        <motion.div
          className="mb-2 sm:mb-3"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <p 
            className="text-xs sm:text-sm font-heading italic font-light tracking-[0.15em] relative"
            style={{
              background: 'linear-gradient(0deg, #C9A87C 0%, #E8D5B5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {/* Left line */}
            <span 
              className="absolute right-[120%] top-1/2 w-10 sm:w-16 h-[1px] opacity-40"
              style={{ background: 'linear-gradient(-90deg, #C9A87C 0%, transparent 100%)' }}
            />
            Bienvenido a
            {/* Right line */}
            <span 
              className="absolute left-[120%] top-1/2 w-10 sm:w-16 h-[1px] opacity-40"
              style={{ background: 'linear-gradient(90deg, #C9A87C 0%, transparent 100%)' }}
            />
          </p>
        </motion.div>

        {/* CLÍNICA MIRÓ */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Blur shadow */}
          <motion.h1
            className="absolute inset-0 text-center font-heading font-light select-none pointer-events-none"
            style={{
              filter: 'blur(18px)',
              opacity: 0.4,
            }}
          >
            <span 
              className="block text-xs sm:text-sm tracking-[0.4em] mb-1"
              style={{ color: '#C9A87C' }}
            >
              CLÍNICA
            </span>
            <span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em]"
              style={{ color: '#F5F0E8' }}
            >
              MIRÓ
            </span>
          </motion.h1>

          {/* Main text with shimmer */}
          <h1 className="text-center font-heading font-light relative">
            <motion.span 
              className="block text-xs sm:text-sm tracking-[0.4em] mb-1"
              style={{ color: '#C9A87C' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              CLÍNICA
            </motion.span>
            <motion.span 
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] relative"
              style={{
                background: 'linear-gradient(0deg, #E8D5B5 30%, #F5F0E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 20px rgba(201, 168, 124, 0.3)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              MIRÓ
              {/* Shimmer effect */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 3,
                }}
              >
                MIRÓ
              </motion.span>
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-body font-light text-center leading-relaxed"
          style={{
            background: 'linear-gradient(0deg, #C9A87C 0%, #E8D5B5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Donde la ciencia se encuentra<br />
          con la belleza de tu sonrisa
        </motion.p>

        {/* Powered by */}
        <motion.div
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span 
            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase"
            style={{ color: 'rgba(201, 168, 124, 0.5)' }}
          >
            Powered by <strong style={{ color: '#C9A87C', fontWeight: 500 }}>HUMANA.AI</strong>
          </span>
        </motion.div>
      </div>

      {/* Diamonds at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none overflow-hidden z-[5]">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(0deg, #0a0908 60%, transparent 100%)',
          }}
        />
        
        <Diamond size={180} translateX="-80px" translateY="30px" delay={2} />
        <Diamond size={140} translateX="-20px" translateY="0" delay={1.8} />
        <Diamond size={180} translateX="80px" translateY="40px" delay={2.2} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <motion.span
          className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase font-sans font-light"
          style={{ color: 'rgba(201, 168, 124, 0.5)' }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Descubre
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-4 h-7 sm:w-5 sm:h-9 rounded-full border flex items-start justify-center p-1"
            style={{ borderColor: 'rgba(201, 168, 124, 0.4)' }}
          >
            <motion.div
              className="w-1 h-1.5 sm:w-1.5 sm:h-2 rounded-full"
              style={{ background: '#C9A87C' }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroLogoUltimate;
