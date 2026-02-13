import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, X, CheckCircle, Loader2, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LEAD_MAGNETS } from "@/lib/constants";
import { trackLeadMagnetDownload } from "@/lib/ga4";

interface LeadMagnetsProps {
  className?: string;
}

const LeadMagnets = ({ className = "" }: LeadMagnetsProps) => {
  const [selectedGuide, setSelectedGuide] = useState<typeof LEAD_MAGNETS[0] | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOpenModal = (guide: typeof LEAD_MAGNETS[0]) => {
    setSelectedGuide(guide);
    setShowSuccess(false);
    setError("");
  };

  const handleCloseModal = () => {
    setSelectedGuide(null);
    setEmail("");
    setError("");
    setShowSuccess(false);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Por favor ingresa tu email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (selectedGuide) {
      trackLeadMagnetDownload(selectedGuide.id);
    }

    setIsSubmitting(false);
    setShowSuccess(true);

    // Auto-cerrar después de mostrar éxito
    setTimeout(() => {
      if (selectedGuide) {
        // En producción, aquí se abriría el PDF
        // window.open(selectedGuide.pdfUrl, '_blank');
      }
      handleCloseModal();
    }, 2000);
  };

  // Colores para las tarjetas
  const cardColors = [
    { bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20', icon: 'text-blue-400' },
    { bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/20', icon: 'text-purple-400' },
    { bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20', icon: 'text-emerald-400' },
  ];

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <BookOpen className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">Recursos Gratuitos</span>
          </motion.div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Guías <span className="text-gradient-gold">Descargables</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Información profesional para que tomes las mejores decisiones sobre tu salud dental
          </p>
        </motion.div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {LEAD_MAGNETS.map((guide, index) => {
            const colors = cardColors[index % cardColors.length];
            
            return (
              <motion.div
                key={guide.id}
                className={`
                  relative group cursor-pointer rounded-2xl overflow-hidden
                  bg-gradient-to-br ${colors.bg} border ${colors.border}
                  hover:border-gold/40 transition-all duration-300
                `}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleOpenModal(guide)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl mb-4 flex items-center justify-center
                    bg-black/20 ${colors.icon}
                  `}>
                    <FileText className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold transition-colors">
                    {guide.titulo}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {guide.descripcion}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-gold group-hover:gap-3 transition-all">
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Descargar Gratis</span>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="100" cy="0" r="80" fill="currentColor" className={colors.icon} />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          className="text-center text-muted-foreground/60 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Contenido elaborado por especialistas de Clínica Miró
        </motion.p>
      </div>

      {/* Download Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleCloseModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md bg-charcoal border border-gold/20 rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              <div className="p-8">
                {showSuccess ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <h3 className="font-serif text-xl text-white mb-2">¡Listo!</h3>
                    <p className="text-muted-foreground text-sm">
                      Tu guía se descargará en segundos
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl text-white mb-2">
                        {selectedGuide.titulo}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Ingresa tu email para recibir la guía
                      </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white/80">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="tu@email.com"
                          className={`bg-charcoal/50 border-border/40 ${error ? 'border-red-500' : ''}`}
                        />
                        {error && <p className="text-red-400 text-xs">{error}</p>}
                      </div>

                      <motion.button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-charcoal font-semibold rounded-xl disabled:opacity-50"
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Procesando...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5" />
                            <span>Descargar Guía</span>
                          </>
                        )}
                      </motion.button>

                      <p className="text-muted-foreground/60 text-xs text-center">
                        Al descargar aceptas recibir información de Clínica Miró. 
                        Puedes darte de baja cuando quieras.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LeadMagnets;
