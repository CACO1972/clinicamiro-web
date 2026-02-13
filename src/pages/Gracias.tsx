import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";

const Gracias = () => {
  return (
    <>
      <AnimatedBackground />
      
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="container max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gold/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-gold" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-serif text-3xl md:text-4xl font-semibold text-gradient-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ¡Gracias por tu interés!
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lilac text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo
            en las próximas 24 horas hábiles para agendar tu consulta.
          </motion.p>

          {/* Contact Options */}
          <motion.div
            className="card-premium p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ background: "rgba(12, 12, 15, 0.85)", backdropFilter: "blur(16px)" }}
          >
            <p className="text-muted-foreground mb-4">¿Necesitas atención inmediata?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+56223456789"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/40 px-6 py-3 text-white hover:bg-gold/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar ahora</span>
              </a>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Gracias;
