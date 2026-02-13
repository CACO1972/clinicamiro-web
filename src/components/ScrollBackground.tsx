import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollBackground = () => {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform scroll progress to background opacity
  // 0-0.15: Cream (start)
  // 0.15-0.35: Transition to warm charcoal
  // 0.35-0.70: Warm charcoal
  // 0.70-0.85: Transition to cream
  // 0.85-1: Cream (end)
  
  const creamOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.70, 0.85, 1],
    [1, 1, 0, 0, 1, 1]
  );

  const darkOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.70, 0.85, 1],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* CREAM LAYER - visible at start and end */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          opacity: creamOpacity,
          background: `
            radial-gradient(ellipse 70% 50% at 20% 20%, hsla(43, 70%, 60%, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 45% at 80% 80%, hsla(100, 12%, 67%, 0.08) 0%, transparent 45%),
            linear-gradient(180deg, 
              hsl(40, 35%, 98%) 0%, 
              hsl(40, 30%, 97%) 50%,
              hsl(38, 25%, 96%) 100%
            )
          `
        }}
      >
        {/* Subtle animated shapes for cream */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(43, 70%, 60%, 0.15) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(100, 12%, 67%, 0.12) 0%, transparent 55%)",
            filter: "blur(70px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[30%] w-[350px] h-[250px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(43, 70%, 60%, 0.1) 0%, transparent 50%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      {/* DARK LAYER - visible in middle */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          opacity: darkOpacity,
          background: `
            radial-gradient(ellipse 60% 50% at 15% 10%, hsla(43, 70%, 60%, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 45% at 85% 15%, hsla(100, 12%, 67%, 0.1) 0%, transparent 45%),
            radial-gradient(ellipse 55% 40% at 50% 90%, hsla(200, 20%, 70%, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, 
              hsl(220, 15%, 12%) 0%, 
              hsl(220, 12%, 14%) 40%, 
              hsl(220, 10%, 16%) 100%
            )
          `,
          backgroundSize: "200% 200%",
        }}
      >
        {/* Floating champagne orb */}
        <motion.div
          className="absolute top-[5%] left-[8%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(43, 70%, 60%, 0.15) 0%, transparent 55%)",
            filter: "blur(90px)",
          }}
          animate={{
            opacity: [0.4, 0.75, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating sage orb */}
        <motion.div
          className="absolute top-[10%] right-[8%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(100, 12%, 67%, 0.1) 0%, transparent 50%)",
            filter: "blur(80px)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Clinical subtle orb */}
        <motion.div
          className="absolute bottom-[8%] left-[25%] w-[450px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(200, 20%, 70%, 0.08) 0%, transparent 50%)",
            filter: "blur(70px)",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
        />

        {/* Secondary sage ambient */}
        <motion.div
          className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(100, 12%, 67%, 0.06) 0%, transparent 50%)",
            filter: "blur(60px)",
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollBackground;
