import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, Eye, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Datos del modelo 4P (del documento "Odontología Predictiva") ───
const pilares = [
  {
    letra: "P",
    nombre: "Predictiva",
    descripcion: "Detectamos riesgo antes de los síntomas. Caries incipiente (ICDAS 1–2), pérdida ósea presintomática, patrones de alineación progresiva.",
    icon: Brain,
    color: "rgba(196,162,101,0.9)",
  },
  {
    letra: "P",
    nombre: "Preventiva",
    descripcion: "Intervención temprana y mínimamente invasiva. Curodont, remineralización, protocolos personalizados antes de que el problema avance.",
    icon: Shield,
    color: "rgba(159,183,198,0.85)",
  },
  {
    letra: "P",
    nombre: "Personalizada",
    descripcion: "Protocolos de anestesia, analgesia, timing y seguimiento ajustados al perfil clínico y psicoemocional único de cada paciente.",
    icon: Users,
    color: "rgba(196,162,101,0.75)",
  },
  {
    letra: "P",
    nombre: "Participativa",
    descripcion: "El paciente ve, entiende y co-decide. Radiografía aumentada, documento Explica, overlay visual. Sin abstracciones.",
    icon: Eye,
    color: "rgba(159,183,198,0.75)",
  },
];

const fases = [
  { n: "01", titulo: "Recepción", tiempo: "10 min", desc: "Verificación, registro, instrucciones de RX." },
  { n: "02", titulo: "Radiología", tiempo: "15 min", desc: "Panorámica + telerradiografía o CBCT. Control de calidad." },
  { n: "03", titulo: "Ingreso al box", tiempo: "5 min", desc: "Saludo, recap del motivo. Preparación consentimiento IA." },
  { n: "04", titulo: "IA en vivo", tiempo: "10 min", desc: "La IA procesa en pantalla frente al paciente. Él ve el análisis." },
  { n: "05", titulo: "Examen clínico", tiempo: "20 min", desc: "El clínico valida, corrobora o descarta lo que mostró la IA." },
  { n: "06", titulo: "Plan + Explica", tiempo: "15 min", desc: "PDF generado. Diagnóstico, alternativas, presupuesto desglosado." },
  { n: "07", titulo: "Resolución", tiempo: "10 min", desc: "Paciente elige. Acuerdo económico. Firma presupuesto." },
  { n: "08", titulo: "Agenda inteligente", tiempo: "5 min", desc: "Sistema sugiere 3–5 opciones. Paciente elige. Preferencias guardadas." },
  { n: "09", titulo: "Cierre", tiempo: "5 min", desc: "Resumen, WhatsApp directo del Dr. Montoya. Acompañamiento en puerta." },
  { n: "10", titulo: "Post-visita", tiempo: "5 min", desc: "PDF Explica por email/WhatsApp. Instrucciones. Registro en Dentalink." },
];

const metricas = [
  { label: "Detección temprana", valor: "+40–60%", sub: "vs. diagnóstico tradicional", color: "gold" },
  { label: "Variabilidad diagnóstica", valor: "−40%", sub: "con documento Explica", color: "clinical" },
  { label: "Retención de paciente", valor: ">70%", sub: "paciente que entiende su plan", color: "gold" },
  { label: "Casos documentados", valor: "11,000+", sub: "implantes con seguimiento", color: "clinical" },
];

// ─── Sub-componente: Pilar 4P ───
const PilarCard = ({ pilar, index }: { pilar: typeof pilares[0]; index: number }) => {
  const Icon = pilar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col p-6 rounded-xl overflow-hidden group"
      style={{
        background: "rgba(10,10,14,0.85)",
        border: "1px solid rgba(196,162,101,0.14)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Glow de fondo al hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${pilar.color.replace("0.9","0.06")} 0%, transparent 60%)` }}
      />

      {/* Letra grande decorativa */}
      <span
        className="absolute -top-3 -right-2 font-serif text-[96px] leading-none select-none pointer-events-none"
        style={{ color: pilar.color.replace("0.9","0.07"), fontFamily:"'Cormorant Garamond', serif" }}
      >
        {pilar.letra}
      </span>

      {/* Icono */}
      <div className="mb-4 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${pilar.color.replace("0.9","0.12")}`, border: `1px solid ${pilar.color.replace("0.9","0.25")}` }}>
        <Icon size={18} style={{ color: pilar.color }} />
      </div>

      <h3 className="font-serif text-xl md:text-2xl mb-2" style={{ color: pilar.color }}>
        {pilar.nombre}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Outfit', sans-serif" }}>
        {pilar.descripcion}
      </p>
    </motion.div>
  );
};

// ─── Sub-componente: Fase protocolo ───
const FaseItem = ({ fase, index }: { fase: typeof fases[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    className="flex items-start gap-4 group"
  >
    {/* Número + línea vertical */}
    <div className="flex flex-col items-center flex-shrink-0 mt-1">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
        style={{ background: "rgba(196,162,101,0.1)", border: "1px solid rgba(196,162,101,0.3)", color: "rgba(196,162,101,0.9)" }}
      >
        {fase.n}
      </div>
      {index < fases.length - 1 && (
        <div className="w-px flex-1 mt-1 min-h-[24px]" style={{ background: "rgba(196,162,101,0.12)" }} />
      )}
    </div>

    {/* Contenido */}
    <div className="pb-5">
      <div className="flex items-center gap-3 mb-1">
        <span className="font-sans font-semibold text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{fase.titulo}</span>
        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(196,162,101,0.08)", color: "rgba(196,162,101,0.6)", border: "1px solid rgba(196,162,101,0.15)" }}>{fase.tiempo}</span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Outfit', sans-serif" }}>{fase.desc}</p>
    </div>
  </motion.div>
);

// ─── Componente principal ───
const ModeloPredictivo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">

      {/* Fondo sutil parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(196,162,101,0.04) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(159,183,198,0.03) 0%, transparent 50%)" }} />
      </motion.div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">

        {/* ── Kicker ── */}
        <motion.div
          className="flex items-center gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(196,162,101,0.8)" }} />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(196,162,101,0.6)" }}>
            Modelo Clínico · Evidencia Científica
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl mb-4 leading-[1.05]" style={{ color: "rgba(255,255,255,0.92)" }}>
            Odontología{" "}
            <span className="brand-italic" style={{ color: "rgba(196,162,101,0.9)" }}>Predictiva</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Outfit', sans-serif" }}>
            No agregamos IA sobre el modelo clásico. Reconfiguramos el modelo completo hacia un paradigma 4P: anticipar la enfermedad antes de los síntomas y justificar cada decisión con datos, no con intuición.
          </p>
        </motion.div>

        {/* ── Grid 4P ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-24">
          {pilares.map((p, i) => <PilarCard key={p.nombre} pilar={p} index={i} />)}
        </div>

        {/* ── Separador texto ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "rgba(196,162,101,0.3)" }} />
            <Zap size={14} style={{ color: "rgba(196,162,101,0.6)" }} />
            <div className="h-px w-12" style={{ background: "rgba(196,162,101,0.3)" }} />
          </div>
          <h3 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: "rgba(255,255,255,0.85)" }}>
            Evaluación Premium · <span className="brand-italic">90 minutos</span>
          </h3>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}>
            Un protocolo de 10 fases estandarizado. Todo el equipo lo ejecuta idénticamente. El paciente sale con un plan claro, escrito, firmado y con imágenes propias.
          </p>
        </motion.div>

        {/* ── Protocolo 10 fases ── */}
        <div className="grid md:grid-cols-2 gap-x-12 mb-24">
          <div>{fases.slice(0, 5).map((f, i) => <FaseItem key={f.n} fase={f} index={i} />)}</div>
          <div>{fases.slice(5).map((f, i) => <FaseItem key={f.n} fase={f} index={i + 5} />)}</div>
        </div>

        {/* ── Métricas de impacto ── */}
        <motion.div
          className="rounded-2xl p-8 md:p-12 mb-16"
          style={{ background: "rgba(10,10,14,0.9)", border: "1px solid rgba(196,162,101,0.14)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-8" style={{ color: "rgba(196,162,101,0.5)" }}>
            Impacto clínico esperado · Validado en 500+ casos Miró
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metricas.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="font-serif text-3xl md:text-4xl mb-1"
                  style={{ color: m.color === "gold" ? "rgba(196,162,101,0.9)" : "rgba(159,183,198,0.85)" }}
                >
                  {m.valor}
                </div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Outfit', sans-serif" }}>
                  {m.label}
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Outfit', sans-serif" }}>
                  {m.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Cita + CTA ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <blockquote
            className="font-serif text-xl md:text-2xl italic mb-2 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            "La IA no cierra la conversación clínica.{" "}
            <span style={{ color: "rgba(196,162,101,0.85)" }}>La abre.</span>"
          </blockquote>
          <p className="text-xs font-mono mb-10" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
            — Dr. Carlos Montoya · Clínica Miró · 2026
          </p>

          <Link
            to="/empezar"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-sans font-medium text-sm transition-all duration-300 group"
            style={{
              background: "rgba(196,162,101,0.12)",
              border: "1px solid rgba(196,162,101,0.35)",
              color: "rgba(196,162,101,0.9)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,162,101,0.18)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,162,101,0.55)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(196,162,101,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,162,101,0.35)";
            }}
          >
            Agenda tu Evaluación Premium
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <p className="mt-4 text-xs font-mono" style={{ color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
            $49.000 CLP · 90 minutos · Abona al tratamiento
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ModeloPredictivo;
