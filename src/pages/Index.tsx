import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ChevronDown } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import NeuralBackground from "@/components/NeuralBackground"
import AppsIASection from "@/components/AppsIASection"
import InstitucionalBadges from "@/components/InstitucionalBadges"
import ExclusivoMiro from "@/components/ExclusivoMiro"
import ModeloPredictivo from "@/components/ModeloPredictivo"
import SimulacionDemo from "@/components/SimulacionDemo"
import TransparenciaSection from "@/components/TransparenciaSection"
import DoctorSection from "@/components/DoctorSection"
import TestimoniosVideo from "@/components/testimonios/TestimoniosVideo"
import LeadMagnets from "@/components/LeadMagnets"
import LocationSection from "@/components/LocationSection"
import Splash from "@/components/Splash"
import { trackViewHome } from "@/lib/ga4"

const badges = [
  {
    icon: "🧠",
    label: "IA Predictiva",
    style: {
      background: "rgba(123,47,255,0.12)",
      border: "1px solid rgba(123,47,255,0.35)",
      color: "#B98FFF",
    },
  },
  {
    icon: "🏆",
    label: "NYU + Loma Linda Certified",
    style: {
      background: "rgba(0,102,255,0.1)",
      border: "1px solid rgba(0,102,255,0.35)",
      color: "#6699FF",
    },
  },
  {
    icon: "⭐",
    label: "+2000 pacientes tratados",
    style: {
      background: "rgba(0,212,255,0.08)",
      border: "1px solid rgba(0,212,255,0.3)",
      color: "#00D4FF",
    },
  },
]

const Index = () => {
  const hasSeenSplash = sessionStorage.getItem("hasSeenSplash") === "true"
  const [showSplash, setShowSplash] = useState(!hasSeenSplash)
  const [contentVisible, setContentVisible] = useState(hasSeenSplash)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (contentVisible) {
      trackViewHome()
    }
  }, [contentVisible])

  useEffect(() => {
    if (hasSeenSplash) return
    const timeout = setTimeout(() => {
      setShowSplash(false)
      setContentVisible(true)
      sessionStorage.setItem("hasSeenSplash", "true")
    }, 4000)
    return () => clearTimeout(timeout)
  }, [hasSeenSplash])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem("hasSeenSplash", "true")
    setTimeout(() => setContentVisible(true), 100)
  }

  const scrollToContent = () => {
    if (heroRef.current) {
      const nextSection = heroRef.current.nextElementSibling
      nextSection?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <Helmet>
        <title>Clínica Miró | La primera clínica dental con IA predictiva de Chile</title>
        <meta
          name="description"
          content="Clínica Miró — La primera clínica dental con inteligencia artificial predictiva de Chile. Diagnóstico claro. Sin presiones. Agenda tu evaluación hoy."
        />
        <link rel="canonical" href="https://clinicamiro.cl" />
      </Helmet>

      {showSplash && <Splash onComplete={handleSplashComplete} />}

      {contentVisible && (
        <>
          <Header />

          <main>
            {/* HERO SECTION */}
            <section
              ref={heroRef}
              className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
              style={{ background: "#080A0F" }}
              aria-label="Bienvenida a Clínica Miró"
            >
              <NeuralBackground />

              {/* Radial glow accent */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,102,255,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 container max-w-4xl mx-auto px-4 pt-28 pb-20 text-center">
                {/* Floating badges */}
                <div
                  className="flex flex-wrap items-center justify-center gap-3 mb-10"
                  aria-label="Certificaciones"
                >
                  {badges.map((badge, i) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium badge-float"
                      style={{ ...badge.style, animationDelay: `${-i * 2}s`, backdropFilter: "blur(8px)" }}
                    >
                      <span aria-hidden="true">{badge.icon}</span>
                      {badge.label}
                    </span>
                  ))}
                </div>

                {/* Headline */}
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  <span className="text-gradient-blue">La primera clínica dental</span>
                  <br />
                  <span className="text-arctic-white">con inteligencia artificial</span>
                  <br />
                  <span className="text-gradient-blue">predictiva de Chile</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-steel font-body font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                  Si entiendes lo que tienes, confías.{" "}
                  <span className="text-arctic-white/80">Diagnóstico claro. Sin presiones.</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/agendar"
                    className="btn-electric inline-flex items-center gap-2 text-base"
                    aria-label="Comenzar mi evaluación dental"
                  >
                    Comenzar mi evaluación
                    <ChevronDown className="w-4 h-4 -rotate-90" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/portal"
                    className="btn-outline-cyan inline-flex items-center gap-2 text-base"
                    aria-label="Ver Portal Paciente"
                  >
                    Ver Portal Paciente
                  </Link>
                </div>
              </div>

              {/* Scroll indicator */}
              <button
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-steel-dim scroll-indicator"
                onClick={scrollToContent}
                aria-label="Desplazarse hacia abajo"
              >
                <span className="text-xs font-body tracking-widest uppercase">Explorar</span>
                <ChevronDown className="w-5 h-5" aria-hidden="true" />
              </button>
            </section>

            <div style={{ background: "#0D1117" }}>
              <ExclusivoMiro />
            </div>

            <div style={{ background: "#0A1628" }}>
              <ModeloPredictivo />
            </div>

            <AppsIASection />

            <div style={{ background: "#0D1117" }}>
              <SimulacionDemo />
            </div>

            <TransparenciaSection />

            <DoctorSection />

            <InstitucionalBadges />

            <TestimoniosVideo />

            <LeadMagnets />
          </main>

          <LocationSection />
          <Footer />
          <WhatsAppFloat />
        </>
      )}
    </>
  )
}

export default Index
