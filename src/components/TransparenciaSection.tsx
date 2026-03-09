import { motion } from "framer-motion";
import { FileText, Scale, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const razones = [
  {
    icon: Scale,
    title: "Tres dentistas, tres presupuestos distintos",
    copy: "Es un hecho documentado: la variabilidad diagnóstica en odontología llega al 40%. En Miró usamos IA para que el criterio sea el mismo siempre — no la intuición del día.",
  },
  {
    icon: MessageSquare,
    title: "\"No entendí por qué necesitaba todo eso\"",
    copy: "El documento Explica te entrega por escrito el diagnóstico en lenguaje tuyo, las alternativas disponibles, los riesgos de cada una, y el presupuesto desglosado. Te lo llevas.",
  },
  {
    icon: FileText,
    title: "\"Me dijeron que era urgente y tenía miedo\"",
    copy: "La urgencia real siempre se documenta con datos. Radiografía aumentada, overlay visual de lo que se propone hacer, firma del clínico. Sin presión, con evidencia.",
  },
];

const TransparenciaSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* Ambient */}
      <div
        className="absolute top-[10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(196,162,101,0.08) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[30%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(196,162,101,0.3), transparent)" }}
      />

      <div className="container max-w-4xl mx-auto px-4 relative z-10 pt-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.25em] text-xs font-mono mb-5" style={{ color: "rgba(196,162,101,0.75)" }}>
            Por qué eligen Miró
          </p>
          <h2 className="font-serif text-3xl md:text-5xl mb-5 leading-tight" style={{ color: "#111" }}>
            Si entiendes lo que tienes,<br />
            <span style={{ fontStyle: "italic", color: "rgba(196,162,101,1)" }}>confías.</span>
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(17,17,17,0.52)", fontFamily: "'Outfit', sans-serif" }}>
            La mayoría de nuestros pacientes llegaron con un presupuesto de otra clínica que no entendían — y sin saber a quién creerle. Aquí el diagnóstico se explica, se escribe y se documenta. Tú decides.
          </p>
        </motion.div>

        {/* Cards — las 3 situaciones del paciente defraudado */}
        <div className="flex flex-col gap-5 mb-16">
          {razones.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="flex items-start gap-5 p-6 md:p-8 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(196,162,101,0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(196,162,101,0.1)", border: "1px solid rgba(196,162,101,0.22)" }}
              >
                <r.icon size={18} style={{ color: "rgba(196,162,101,0.85)" }} />
              </div>
              <div>
                <h3 className="font-serif text-lg md:text-xl mb-2" style={{ color: "#111" }}>
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(17,17,17,0.52)", fontFamily: "'Outfit', sans-serif" }}>
                  {r.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA central */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-serif text-xl md:text-2xl italic mb-2" style={{ color: "rgba(17,17,17,0.65)" }}>
            "Cuando un paciente entiende su diagnóstico y sus opciones,{" "}
            <span style={{ color: "rgba(196,162,101,0.9)" }}>confía.</span>"
          </p>
          <p className="text-xs font-mono tracking-[0.15em] mb-8" style={{ color: "rgba(17,17,17,0.28)" }}>
            — DR. CARLOS MONTOYA · DIRECTOR CLÍNICO
          </p>

          <Link
            to="/segunda-opinion"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-sans text-sm font-medium transition-all duration-300"
            style={{
              background: "rgba(196,162,101,0.1)",
              border: "1px solid rgba(196,162,101,0.4)",
              color: "rgba(196,162,101,0.9)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,162,101,0.18)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,162,101,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,162,101,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,162,101,0.4)";
            }}
          >
            Trae tu presupuesto — lo revisamos juntos
          </Link>

          <p className="mt-3 text-xs font-mono" style={{ color: "rgba(17,17,17,0.22)", letterSpacing: "0.1em" }}>
            Segunda Opinión · Sin costo · Sin compromiso
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default TransparenciaSection;
