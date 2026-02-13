import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AnimatedBackground from "@/components/AnimatedBackground";

const Ortodoncia = () => {
  const beneficios = [
    "Alineadores transparentes personalizados",
    "Ortodoncia convencional cuando corresponde",
    "Planificación digital con simulación 3D",
    "Enfoque en estética facial y estabilidad",
    "Resultados medibles y predecibles",
  ];

  return (
    <>
      <Helmet>
        <title>Ortodoncia Inteligente en Santiago | Alineadores y Brackets | Clínica Miró</title>
        <meta 
          name="description" 
          content="Ortodoncia de lujo con alineadores invisibles y tecnología IA en Santiago. Tratamiento personalizado para una sonrisa perfecta. Agende su evaluación en Clínica Miró." 
        />
        <link rel="canonical" href="https://clinicamiro.cl/servicios/ortodoncia" />
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
            <p className="tagline mb-4">ALIGN</p>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-gradient-gold mb-4">
              Ortodoncia Inteligente en Santiago
            </h1>
            <p className="text-lilac text-lg md:text-xl max-w-2xl mx-auto">
              Alineadores transparentes u ortodoncia convencional según lo que tu caso 
              realmente necesita. Plan medible, estético y personalizado.
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
              Tecnología y Precisión para tu Sonrisa
            </h2>
            
            <p className="text-lilac-glow text-base md:text-lg leading-relaxed mb-6">
              En Clínica Miró no creemos en soluciones únicas. ALIGN es nuestro programa 
              de ortodoncia que combina alineadores transparentes de última generación con 
              ortodoncia convencional cuando es lo más indicado para tu caso.
            </p>

            <p className="text-lilac-glow text-base md:text-lg leading-relaxed mb-8">
              Priorizamos la biología, la estética facial y la estabilidad a largo plazo. 
              Cada tratamiento es planificado digitalmente con simulación 3D para que 
              veas tu resultado antes de comenzar.
            </p>

            <h2 className="font-serif text-xl md:text-2xl text-white mb-4">
              Ventajas del Programa ALIGN
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
              Comienza tu Transformación
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
                href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20información%20sobre%20ortodoncia"
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

export default Ortodoncia;
