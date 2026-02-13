import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnimatedBackground from "@/components/AnimatedBackground";

const Prevencion = () => {
  const beneficios = [
    "Diagnóstico de caries asistido por IA",
    "Detección temprana antes del dolor",
    "Tratamiento regenerativo con Curodont",
    "Intervención mínimamente invasiva",
    "Evita procedimientos agresivos",
  ];

  return (
    <>
      <Helmet>
        <title>Prevención Dental con IA en Santiago | Zero Caries | Clínica Miró</title>
        <meta 
          name="description" 
          content="Prevención dental con diagnóstico IA y tratamiento regenerativo en Santiago. Detectamos caries antes de que duelan. Agende su evaluación en Clínica Miró." 
        />
        <link rel="canonical" href="https://clinicamiro.cl/servicios/prevencion" />
      </Helmet>
      
      <AnimatedBackground />
      
      <main className="min-h-screen px-4 py-8 md:py-12">
        <div className="container max-w-4xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.header
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="tagline mb-4">ZERO CARIES</p>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-gradient-gold mb-4">
              Prevención Dental con IA en Santiago
            </h1>
            <p className="text-lilac text-lg md:text-xl max-w-2xl mx-auto">
              Detectamos y tratamos caries antes de que duelan. 
              Diagnóstico asistido por IA y enfoque regenerativo.
            </p>
          </motion.header>

          {/* Main Content */}
          <motion.article
            className="card-premium p-8 md:p-12 mb-8"
            style={{ background: "rgba(12, 12, 15, 0.85)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">
              Odontología Preventiva de Nueva Generación
            </h2>
            
            <p className="text-lilac-glow text-base md:text-lg leading-relaxed mb-6">
              ZERO CARIES revoluciona la prevención dental con inteligencia artificial 
              que detecta lesiones en etapas tempranas, cuando aún pueden ser tratadas 
              de forma conservadora y sin dolor.
            </p>

            <p className="text-lilac-glow text-base md:text-lg leading-relaxed mb-8">
              Utilizamos tecnología regenerativa como Curodont para tratar caries 
              incipientes sin necesidad de fresado. Nuestro enfoque prioriza la 
              intervención mínimamente invasiva, preservando la estructura dental natural.
            </p>

            <h2 className="font-serif text-xl md:text-2xl text-white mb-4">
              El Programa ZERO CARIES
            </h2>

            <ul className="space-y-3 mb-8">
              {beneficios.map((beneficio, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-lilac-glow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>{beneficio}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          {/* CTA Section */}
          <motion.section
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-serif text-xl md:text-2xl text-white mb-6">
              Protege tu Sonrisa Hoy
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/empezar"
                className="cta-primary inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar Evaluación</span>
              </Link>
              <a
                href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20información%20sobre%20prevención%20dental"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Prevencion;
