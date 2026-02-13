import { motion } from "framer-motion";
import { Shield, CreditCard, FileText } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Sin sorpresas",
    description: "Presupuestos claros y detallados antes de cada tratamiento.",
  },
  {
    icon: CreditCard,
    title: "Facilidades de pago",
    description: "Opciones flexibles adaptadas a tus necesidades.",
  },
  {
    icon: FileText,
    title: "Todo documentado",
    description: "Acceso digital a tu historial y documentos.",
  },
];

const TransparenciaSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Transparent background - relies on ScrollBackground ivory layer */}

      {/* Subtle lilac ambient glow */}
      <div 
        className="absolute top-[10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, rgba(155, 138, 165, 0.10) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Gold accent line at transition point */}
      <div 
        className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[30%] h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(196, 162, 101, 0.35) 50%, transparent 100%)`,
        }}
      />

      <div className="container max-w-4xl mx-auto px-4 relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p 
            className="uppercase tracking-[0.25em] text-xs font-sans font-medium mb-4"
            style={{ color: "rgba(196, 162, 101, 0.85)" }}
          >
            Nuestro Compromiso
          </p>
          <h2 
            className="font-serif text-3xl md:text-4xl mb-4"
            style={{ color: "#111111" }}
          >
            Transparencia <span style={{ fontStyle: "italic", color: "rgba(196, 162, 101, 1)" }}>Total</span>
          </h2>
          <p 
            className="text-base md:text-lg max-w-md mx-auto"
            style={{ color: "rgba(17, 17, 17, 0.60)" }}
          >
            Aranceles claros y financiamiento accesible
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center p-6 md:p-8 rounded-xl"
              style={{
                background: "rgba(242, 237, 228, 0.85)",
                border: "1px solid rgba(196, 162, 101, 0.25)",
                boxShadow: "0 4px 24px rgba(155, 138, 165, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 32px rgba(196, 162, 101, 0.12), 0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div 
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-5"
                style={{
                  background: "rgba(196, 162, 101, 1)",
                  boxShadow: "0 4px 12px rgba(196, 162, 101, 0.25)",
                }}
              >
                <feature.icon className="w-5 h-5" style={{ color: "#111111" }} />
              </div>
              <h3 
                className="font-serif text-lg md:text-xl mb-3"
                style={{ color: "#111111" }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: "rgba(17, 17, 17, 0.60)" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransparenciaSection;
