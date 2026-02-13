import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import StaticLogo from "./StaticLogo";

const Footer = () => {
  return (
    <footer 
      className="relative py-16 md:py-20"
      style={{
        background: "linear-gradient(180deg, hsl(240, 8%, 6%) 0%, hsl(240, 10%, 4%) 100%)",
      }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Logo & Description */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <StaticLogo variant="light" className="mb-4" />
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              Más de 15 años transformando sonrisas con tecnología de vanguardia y un equipo comprometido con tu bienestar.
            </p>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+56935572986" 
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-gold transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-gold/70 group-hover:text-gold transition-colors" />
                  <span>+56 9 3557 2986</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:administracion@clinicamiro.cl" 
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-gold transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-gold/70 group-hover:text-gold transition-colors" />
                  <span>administracion@clinicamiro.cl</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Ubicación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Ubicación
            </h4>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 text-gold/70 flex-shrink-0" />
              <div>
                <p>Av. Nueva Providencia 2214</p>
                <p>Piso 18, Of. 1802</p>
                <p>Santiago, Chile</p>
              </div>
            </div>
          </motion.div>

          {/* Horario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Horario
            </h4>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mt-0.5 text-gold/70 flex-shrink-0" />
              <div>
                <p>Lunes - Viernes</p>
                <p className="text-foreground/80">9:00 - 18:00 hrs</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-10 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Bottom row */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>© 2024 Clínica Miró · Odontología de Excelencia</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-gold transition-colors">Términos de Uso</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
