import { useState, useEffect } from "react";
import { UserPlus, FileSearch, User } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ScrollBackground from "@/components/ScrollBackground";
import Splash from "@/components/Splash";
import RouteCard from "@/components/RouteCard";
import DualCTA from "@/components/DualCTA";
import ExclusivoMiro from "@/components/ExclusivoMiro";
import SimulacionDemo from "@/components/SimulacionDemo";
import TransparenciaSection from "@/components/TransparenciaSection";
import TestimoniosVideo from "@/components/testimonios/TestimoniosVideo";
import LeadMagnets from "@/components/LeadMagnets";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackViewHome } from "@/lib/ga4";
import { PROMESA } from "@/lib/constants";
// Versiones del Hero - cambia aquí para probar:
// import HeroLogo from "@/components/HeroLogo";          // V1: Original
// import HeroLogo from "@/components/HeroLogoV2";        // V2: Ondas fluidas + partículas
// import HeroLogo from "@/components/HeroLogoV3";        // V3: Aurora boreal + vórtice
// import HeroLogo from "@/components/HeroLogoHybrid";    // Híbrido: V2 + V3 combinados
import HeroLogo from "@/components/HeroLogoUltimate";     // Ultimate: Spotlights + partículas + diamantes

const routes = [
  {
    to: "/empezar",
    icon: UserPlus,
    title: "Nuevo Paciente",
    description: "Comienza tu experiencia con nosotros. Te guiaremos paso a paso para encontrar el tratamiento que necesitas.",
  },
  {
    to: "/segunda-opinion",
    icon: FileSearch,
    title: "Segunda Opinión",
    description: "Compara un presupuesto de otra clínica o solicita una segunda opinión profesional sobre un diagnóstico que ya tengas.",
  },
  {
    to: "/portal",
    icon: User,
    title: "Portal Paciente",
    description: "Espacio exclusivo para pacientes actuales o anteriores. Accede a tu historial, citas y documentos.",
  },
];

const Index = () => {
  const hasSeenSplash = sessionStorage.getItem("hasSeenSplash") === "true";
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);
  const [contentVisible, setContentVisible] = useState(hasSeenSplash);

  useEffect(() => {
    // Track home view
    if (contentVisible) {
      trackViewHome();
    }
  }, [contentVisible]);

  useEffect(() => {
    if (hasSeenSplash) return;
    
    // Fallback timeout in case animation doesn't complete
    const timeout = setTimeout(() => {
      setShowSplash(false);
      setContentVisible(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [hasSeenSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
    setTimeout(() => setContentVisible(true), 100);
  };

  return (
    <>
      <Helmet>
        <title>Clínica Miró | Odontología de Lujo y Excelencia en Santiago</title>
        <meta 
          name="description" 
          content="Donde la ciencia se encuentra con la belleza de tu sonrisa. Especialistas en implantes y estética dental en Santiago, Chile." 
        />
        <link rel="canonical" href="https://clinicamiro.cl" />
      </Helmet>

      <ScrollBackground />
      
      {showSplash && <Splash onComplete={handleSplashComplete} />}

      {contentVisible && (
        <>
          <Header />
          
          <main className="min-h-screen flex flex-col">
            {/* HERO SECTION - Logo Protagonist */}
            <section 
              className="relative"
              aria-label="Bienvenida a Clínica Miró"
            >
              <h1 className="sr-only">Clínica Miró - {PROMESA.titulo}</h1>
              <HeroLogo />
              
              {/* Promesa - H1 visible */}
              <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
                <p className="text-gold text-sm uppercase tracking-widest mb-2">
                  {PROMESA.titulo}
                </p>
                <p className="text-muted-foreground text-lg">
                  {PROMESA.subtitulo}
                </p>
              </div>
            </section>

            {/* DARK SECTION - Route Cards & Treatments */}
            <section className="px-4 py-16 md:py-24" aria-label="Servicios principales">
              <div className="container max-w-4xl mx-auto">
                {/* Route Cards */}
                <nav className="grid gap-6 md:gap-8" aria-label="Opciones de navegación">
                  {routes.map((route, index) => (
                    <RouteCard
                      key={route.to}
                      {...route}
                      delay={0.2 + index * 0.15}
                      variant="dark"
                    />
                  ))}
                </nav>

                {/* Exclusivo Miró Section */}
                <ExclusivoMiro />

                {/* Simulación Demo */}
                <SimulacionDemo />

                {/* Dual CTA */}
                <DualCTA />
              </div>
            </section>

            {/* Transparencia Section - Light transition */}
            <TransparenciaSection />

            {/* Testimonios en Video */}
            <TestimoniosVideo />

            {/* Lead Magnets / Guías descargables */}
            <LeadMagnets />
          </main>

          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
