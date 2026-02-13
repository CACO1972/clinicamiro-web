import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  FileText, 
  Clock, 
  Shield,
  Mail,
  Phone,
  Loader2,
  LogIn,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import DualCTA from "@/components/DualCTA";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEntryFlow } from "@/lib/ga4";
import { CLINICA_INFO } from "@/lib/constants";

type PortalState = 'landing' | 'login' | 'verify';

const features = [
  {
    icon: Calendar,
    title: "Gestiona tus Citas",
    description: "Agenda, confirma o reprograma tus citas"
  },
  {
    icon: FileText,
    title: "Historial Clínico",
    description: "Accede a tus tratamientos y documentos"
  },
  {
    icon: Clock,
    title: "Recordatorios",
    description: "Notificaciones de próximas citas"
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Tus datos protegidos con encriptación"
  }
];

const Portal = () => {
  const [portalState, setPortalState] = useState<PortalState>('landing');
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    trackEntryFlow('portal');
  }, []);

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Por favor ingresa tu email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simular verificación
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setPortalState('verify');
  };

  const renderContent = () => {
    switch (portalState) {
      case 'login':
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md mx-auto"
          >
            <div 
              className="card-premium p-8"
              style={{ 
                background: "rgba(12, 12, 15, 0.88)", 
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(196, 162, 101, 0.15)"
              }}
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-xl bg-gold/10 border border-gold/20 mb-4">
                  <LogIn className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-serif text-2xl text-white mb-2">Acceder al Portal</h2>
                <p className="text-muted-foreground text-sm">
                  Te enviaremos un código de verificación
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email registrado</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="tu@email.com"
                      className={`bg-charcoal/50 border-border/40 pl-10 ${error ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-charcoal font-semibold rounded-xl disabled:opacity-50"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Continuar</span>
                  )}
                </motion.button>

                <button
                  onClick={() => setPortalState('landing')}
                  className="w-full text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  ← Volver
                </button>
              </div>

              <p className="text-center text-muted-foreground/60 text-xs mt-6">
                ¿No tienes cuenta? Serás registrado en tu primera visita a la clínica.
              </p>
            </div>
          </motion.div>
        );

      case 'verify':
        return (
          <motion.div
            key="verify"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div 
              className="card-premium p-8 max-w-md mx-auto"
              style={{ 
                background: "rgba(12, 12, 15, 0.88)", 
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(196, 162, 101, 0.15)"
              }}
            >
              <motion.div
                className="inline-flex p-4 rounded-full bg-gold/10 border border-gold/20 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-8 h-8 text-gold" />
              </motion.div>

              <h2 className="font-serif text-2xl text-white mb-3">
                Revisa tu correo
              </h2>
              <p className="text-muted-foreground mb-6">
                Hemos enviado un código de verificación a<br />
                <span className="text-gold">{email}</span>
              </p>

              <div className="p-4 bg-charcoal/30 rounded-xl border border-border/20 mb-6">
                <p className="text-white/70 text-sm">
                  <strong className="text-gold">Próximamente:</strong> El portal completo estará disponible en las próximas semanas. 
                  Por ahora, puedes contactarnos directamente.
                </p>
              </div>

              <DualCTA context="portal-login" />

              <button
                onClick={() => {
                  setPortalState('landing');
                  setEmail("");
                }}
                className="mt-6 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                ← Volver al inicio
              </button>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="inline-flex p-4 rounded-2xl bg-gold/10 border border-gold/20 mb-6">
              <User className="w-10 h-10 text-gold" />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gradient-gold mb-4">
              Portal Paciente
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
              Tu espacio personal para gestionar tu salud dental
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="p-4 rounded-xl bg-charcoal/30 border border-border/20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                    <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Login CTA */}
            <motion.button
              onClick={() => setPortalState('login')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold rounded-xl mb-6"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="w-5 h-5" />
              <span>Acceder a mi Portal</span>
            </motion.button>

            <p className="text-muted-foreground text-sm mb-8">
              ¿Primera vez? Serás registrado automáticamente en tu primera visita.
            </p>

            {/* Contact info */}
            <div className="card-premium p-6">
              <p className="text-white/80 mb-4">
                ¿Necesitas ayuda? Contáctanos directamente:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`tel:${CLINICA_INFO.telefono}`}
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-glow transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CLINICA_INFO.telefono}</span>
                </a>
                <a 
                  href={`mailto:${CLINICA_INFO.email}`}
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-glow transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{CLINICA_INFO.email}</span>
                </a>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <>
      <AnimatedBackground />
      
      <main className="min-h-screen flex flex-col px-4 py-12 md:py-20">
        <div className="container max-w-2xl mx-auto flex-1 flex flex-col">
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
              <span>Volver</span>
            </Link>
          </motion.div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </>
  );
};

export default Portal;
