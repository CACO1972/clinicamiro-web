import { motion } from "framer-motion";
import { Award, Users, Cpu, GraduationCap } from "lucide-react";

const stats = [
  { value: "30+", label: "Años experiencia", icon: Award },
  { value: "11,000+", label: "Implantes documentados", icon: Users },
  { value: "6", label: "Apps IA activas", icon: Cpu },
  { value: "20", label: "Años docencia", icon: GraduationCap },
];

const DoctorSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Kicker */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--hm-accent,#C9A87C)]" />
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--hm-mid-gray,#999)]">
            El clínico
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: "var(--hm-font-display, 'Outfit', sans-serif)" }}
            >
              Dr. Carlos
              <br />
              <span className="text-[var(--hm-accent,#C9A87C)]">Montoya.</span>
            </h2>
            <p
              className="text-lg md:text-xl italic font-light leading-relaxed mb-6"
              style={{
                fontFamily: "var(--hm-font-serif, 'Cormorant Garamond', serif)",
                color: "var(--hm-mid-gray, #999)",
              }}
            >
              "La confianza no se pide. Se construye con datos, tiempo y transparencia."
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground mb-8 max-w-md">
              Director clínico de Clínica Miró desde 2008. Más de 30 años de
              experiencia y 20 años como docente universitario en la Universidad
              Mayor. Creador del ecosistema HUMANA.AI para odontología predictiva.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2">
              {[
                "Implantología avanzada",
                "Rehabilitación oral",
                "Estética dental",
                "IA aplicada",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[11px] tracking-wide uppercase font-medium"
                  style={{
                    background: "color-mix(in srgb, var(--hm-accent,#C9A87C) 10%, transparent)",
                    color: "var(--hm-accent,#C9A87C)",
                    fontFamily: "var(--hm-font-mono, monospace)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-card p-6 md:p-8 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <stat.icon
                  className="w-5 h-5 mb-4"
                  style={{ color: "var(--hm-accent,#C9A87C)" }}
                />
                <span
                  className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none mb-1"
                  style={{ fontFamily: "var(--hm-font-display, 'Outfit', sans-serif)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] tracking-[0.12em] uppercase mt-1"
                  style={{
                    color: "var(--hm-mid-gray, #999)",
                    fontFamily: "var(--hm-font-mono, monospace)",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
