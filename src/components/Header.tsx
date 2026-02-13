"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Calendar, ChevronRight } from "lucide-react"
import logoMiroIcon from "@/assets/logo-miro-icon.png"

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Tratamientos", to: "/#tratamientos" },
  { label: "Nuevo Paciente", to: "/empezar" },
  { label: "Segunda Opinión", to: "/segunda-opinion" },
  { label: "Portal", to: "/portal" },
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [logoHovered, setLogoHovered] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [mobileMenuOpen])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      role="banner"
    >
      {/* Glass background with gradient - changes on scroll */}
      <motion.div
        className="absolute inset-0 backdrop-blur-xl transition-all duration-500"
        animate={{
          background: isScrolled
            ? "linear-gradient(180deg, rgba(7, 7, 9, 0.98) 0%, rgba(7, 7, 9, 0.95) 100%)"
            : "linear-gradient(180deg, rgba(7, 7, 9, 0.95) 0%, rgba(7, 7, 9, 0.88) 100%)",
          borderBottom: isScrolled ? "1px solid rgba(196, 162, 101, 0.25)" : "1px solid rgba(196, 162, 101, 0.12)",
        }}
        style={{
          boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "none",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 relative">
        <motion.div
          className="flex items-center justify-between"
          animate={{ height: isScrolled ? 60 : 80 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left side: Favicon + Tagline */}
          <Link to="/" className="relative z-10 flex items-center gap-3 group" aria-label="Clínica Miró - Inicio">
            <motion.div
              className="relative"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              animate={{ scale: isScrolled ? 0.9 : 1 }}
            >
              {/* Base logo image */}
              <img
                src={logoMiroIcon || "/placeholder.svg"}
                alt="Clínica Miró"
                className="h-10 md:h-12 w-auto relative z-10"
              />

              {/* Left side gold overlay that disappears on hover */}
              <motion.div
                className="absolute inset-0 z-20 overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at 35% 50%, rgba(7, 7, 9, 0.95) 0%, transparent 50%)",
                  }}
                  animate={{
                    opacity: logoHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(196, 162, 101, 0.4) 0%, transparent 70%)",
                  filter: "blur(10px)",
                  transform: "scale(1.8)",
                }}
                animate={{
                  opacity: logoHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Tagline with animated separator */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.div
                className="h-6 w-[1px]"
                style={{ background: "linear-gradient(180deg, transparent, rgba(196, 162, 101, 0.4), transparent)" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
              <motion.span
                className="text-xs md:text-sm tracking-wide text-white/70 font-light"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <span className="text-gold/90 font-medium">Odontología Predictiva</span>
                <span className="text-white/50 mx-1.5">·</span>
                <span>Santiago</span>
              </motion.span>
            </div>
          </Link>

          {/* Desktop Navigation - Disruptive pill style */}
          <nav className="hidden lg:flex items-center" aria-label="Navegación principal">
            <motion.div
              className="flex items-center gap-1 p-1.5 rounded-full transition-all duration-300"
              style={{
                background: isScrolled ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.04)",
                border: isScrolled ? "1px solid rgba(196, 162, 101, 0.15)" : "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover pill background */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(196, 162, 101, 0.15) 0%, rgba(196, 162, 101, 0.08) 100%)",
                          border: "1px solid rgba(196, 162, 101, 0.2)",
                        }}
                        layoutId="navHover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </motion.div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="tel:+56935572986"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md px-2 py-1"
              animate={{ opacity: isScrolled ? 0.8 : 1 }}
              aria-label="Llamar a Clínica Miró"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="hidden xl:inline">+56 9 3557 2986</span>
            </motion.a>
            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full text-background focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal"
              style={{
                background: "linear-gradient(135deg, hsl(40, 45%, 58%) 0%, hsl(40, 50%, 50%) 100%)",
                boxShadow: isScrolled ? "0 4px 25px rgba(196, 162, 101, 0.35)" : "0 4px 20px rgba(196, 162, 101, 0.25)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 6px 30px rgba(196, 162, 101, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Integración Dentalink próximamente")}
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Agendar
            </motion.button>
          </div>

          {/* Mobile menu button - Creative hamburger */}
          <button
            className="lg:hidden relative z-10 p-2 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="block h-[2px] bg-white rounded-full origin-left"
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 0 : 0,
                  width: mobileMenuOpen ? "100%" : "100%",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] bg-gold rounded-full"
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  x: mobileMenuOpen ? 20 : 0,
                  width: "70%",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] bg-white rounded-full origin-left"
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -2 : 0,
                  width: mobileMenuOpen ? "100%" : "50%",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu - Full screen takeover */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
          >
            {/* Dark backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(7, 7, 9, 0.98) 0%, rgba(7, 7, 9, 0.95) 100%)",
                backdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.nav
              className="relative h-full flex flex-col justify-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Tagline mobile */}
              <motion.p
                className="text-sm text-gold/70 mb-8 tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Odontología Predictiva · Santiago
              </motion.p>

              {/* Nav items */}
              <div className="space-y-2" role="menu">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      className="group flex items-center justify-between py-4 border-b border-white/5 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      <span className="text-2xl font-light text-white/90 group-hover:text-gold transition-colors">
                        {item.label}
                      </span>
                      <ChevronRight
                        className="w-5 h-5 text-white/30 group-hover:text-gold group-hover:translate-x-1 transition-all"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div
                className="mt-12 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="tel:+56935572986"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md px-2 py-1"
                  aria-label="Llamar a Clínica Miró"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  +56 9 3557 2986
                </a>
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-medium rounded-xl text-background focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal"
                  style={{
                    background: "linear-gradient(135deg, hsl(40, 45%, 58%) 0%, hsl(40, 50%, 50%) 100%)",
                  }}
                  onClick={() => alert("Integración Dentalink próximamente")}
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  Agendar Cita
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
