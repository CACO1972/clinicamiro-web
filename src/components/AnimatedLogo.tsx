import { motion } from "framer-motion";
import logoMiroVertical from "@/assets/logo-miro-vertical.png";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = "" }: AnimatedLogoProps) => {
  return (
    <motion.div 
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <img
        src={logoMiroVertical}
        alt="Clínica Miró - Odontología de Excelencia"
        className="w-full max-w-[400px] md:max-w-[500px] h-auto"
        style={{
          filter: "drop-shadow(0 4px 30px hsla(43, 70%, 50%, 0.25))",
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
