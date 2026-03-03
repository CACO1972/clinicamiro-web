import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-20 md:py-32 border-t" style={{ borderColor: "var(--hm-light-gray, #EBEBEB)" }}>
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
            Ubicación
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] mb-12"
          style={{ fontFamily: "var(--hm-font-display, 'Outfit', sans-serif)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Encuéntranos
          <br />
          <span className="text-[var(--hm-accent,#C9A87C)]">aquí.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            className="rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[400px]"
            style={{ border: "1px solid var(--hm-light-gray, #EBEBEB)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8!2d-70.6100!3d-33.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf6a4f0b0001%3A0x0!2sAv.+Nueva+Providencia+2214%2C+Providencia%2C+Regi%C3%B3n+Metropolitana!5e0!3m2!1ses!2scl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Clínica Miró"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              {
                icon: MapPin,
                label: "Dirección",
                value: "Av. Nueva Providencia 2214, Of. 189",
                sub: "Providencia, Santiago, Chile",
              },
              {
                icon: Phone,
                label: "WhatsApp",
                value: "+56 9 3557 2986",
                sub: "Pacientes existentes",
                href: "https://wa.me/56935572986",
              },
              {
                icon: Clock,
                label: "Horario",
                value: "Lun-Vie 9:00 - 19:00",
                sub: "Sáb 9:00 - 14:00",
              },
              {
                icon: Mail,
                label: "Email",
                value: "implantes@clinicamiro.cl",
                href: "mailto:implantes@clinicamiro.cl",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "color-mix(in srgb, var(--hm-accent,#C9A87C) 10%, transparent)",
                  }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "var(--hm-accent,#C9A87C)" }} />
                </div>
                <div>
                  <span
                    className="text-[10px] tracking-[0.12em] uppercase block mb-1"
                    style={{
                      color: "var(--hm-mid-gray,#999)",
                      fontFamily: "var(--hm-font-mono, monospace)",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sm hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-semibold text-sm">{item.value}</span>
                  )}
                  {item.sub && (
                    <span className="block text-xs mt-0.5" style={{ color: "var(--hm-mid-gray,#999)" }}>
                      {item.sub}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
