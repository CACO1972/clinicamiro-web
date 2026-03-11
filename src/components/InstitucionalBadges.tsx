import { useEffect, useRef, useState } from "react"

const partners = [
  {
    name: "NYU Dentistry",
    shortName: "NYU",
    fullName: "New York University College of Dentistry",
    country: "Estados Unidos",
  },
  {
    name: "Loma Linda University",
    shortName: "LLU",
    fullName: "Loma Linda University School of Dentistry",
    country: "Estados Unidos",
  },
  {
    name: "NIC Chile",
    shortName: "NIC",
    fullName: "NIC Chile Research Labs",
    country: "Chile",
  },
]

const InstitucionalBadges = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 px-4"
      style={{ background: "linear-gradient(180deg, #080A0F 0%, #0A1628 100%)" }}
      aria-labelledby="institucional-heading"
    >
      <div className="container max-w-5xl mx-auto text-center">
        {/* Header */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest text-steel border border-steel/20 rounded-full bg-steel/5">
            Respaldo Científico
          </span>
          <h2
            id="institucional-heading"
            className="text-3xl md:text-4xl font-display font-bold text-arctic-white mb-4"
          >
            Respaldados por la ciencia
          </h2>
          <p className="text-steel max-w-xl mx-auto font-body mb-14">
            Protocolos basados en evidencia científica internacional
          </p>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className={`flex flex-col items-center gap-3 group cursor-default transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
              aria-label={partner.fullName}
            >
              {/* Logo badge */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center
                  bg-white/[0.04] border border-white/10
                  filter grayscale group-hover:grayscale-0
                  transition-all duration-500
                  group-hover:border-electric-blue/40
                  group-hover:shadow-[0_0_24px_rgba(0,102,255,0.2)]"
              >
                <span className="text-3xl font-display font-black text-steel group-hover:text-arctic-white transition-colors duration-500">
                  {partner.shortName}
                </span>
              </div>

              {/* Name */}
              <div>
                <p className="text-sm font-body font-medium text-steel group-hover:text-arctic-white transition-colors">
                  {partner.name}
                </p>
                <p className="text-xs text-steel-dim font-body mt-0.5">{partner.country}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className={`mt-16 flex items-center gap-6 justify-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-steel/30" />
          <p className="text-xs text-steel-dim font-body uppercase tracking-widest">
            Formación internacional · Evidencia clínica
          </p>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-steel/30" />
        </div>
      </div>
    </section>
  )
}

export default InstitucionalBadges
