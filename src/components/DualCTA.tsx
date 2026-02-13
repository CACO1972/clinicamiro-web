import { Calendar, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { DENTALINK_URL, getWhatsAppURL } from "@/lib/constants";
import { trackBeginSchedule, trackBeginWhatsApp } from "@/lib/ga4";

interface DualCTAProps {
  className?: string;
  context?: string;
}

const DualCTA = ({ className = "", context = "home" }: DualCTAProps) => {
  const handleAgendar = () => {
    trackBeginSchedule(context);
    window.open(DENTALINK_URL, '_blank');
  };

  const handleWhatsApp = () => {
    trackBeginWhatsApp(context);
    window.open(getWhatsAppURL(context), '_blank');
  };

  return (
    <motion.div
      className={`flex flex-col sm:flex-row gap-3 justify-center mt-10 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <motion.button
        className="cta-primary min-w-[160px]"
        onClick={handleAgendar}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Calendar className="w-4 h-4" />
        <span>Agenda tu Consulta</span>
      </motion.button>
      
      <motion.button
        className="cta-secondary min-w-[140px] inline-flex items-center justify-center gap-2"
        onClick={handleWhatsApp}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp</span>
      </motion.button>
    </motion.div>
  );
};

export default DualCTA;
