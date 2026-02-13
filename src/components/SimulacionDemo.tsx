import { motion } from "framer-motion";

const SimulacionDemo = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="tagline mb-4">Tecnología Exclusiva</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Simulación de Sonrisa <span className="brand-italic text-gold">IA</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
            Visualiza tu nueva sonrisa antes de comenzar cualquier tratamiento. 
            Nuestra tecnología de inteligencia artificial analiza tu rostro y 
            simula resultados realistas en tiempo real.
          </p>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <span>Análisis facial biométrico completo</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <span>Simulación en tiempo real de tratamientos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <span>Comparativa antes y después instantánea</span>
            </li>
          </ul>
        </motion.div>

        {/* Video Embed */}
        <motion.div
          className="order-1 lg:order-2 flex justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="relative"
            style={{
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(196, 162, 101, 0.15)",
            }}
          >
            <iframe
              src="https://c8bde054-ed5b-44ab-acf3-7d73c7757b52.lovableproject.com/showcase"
              width="360"
              height="640"
              frameBorder="0"
              allow="autoplay"
              loading="lazy"
              className="rounded-2xl"
              style={{
                border: "1px solid rgba(196, 162, 101, 0.25)",
              }}
              title="Simulación de Sonrisa IA - Clínica Miró Estética Dental Santiago"
            />
            {/* Decorative glow */}
            <div 
              className="absolute -inset-2 -z-10 rounded-3xl opacity-50"
              style={{
                background: "radial-gradient(ellipse at center, rgba(196, 162, 101, 0.15) 0%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimulacionDemo;
