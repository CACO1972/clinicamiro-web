import { Link } from "react-router-dom"

interface App {
  icon: string
  name: string
  desc: string
  href: string
  color: "cyan" | "blue" | "violet" | "emerald" | "amber"
}

const apps: App[] = [
  {
    icon: "🦷",
    name: "ImplantX",
    desc: "Predicción de éxito de implantes con IA",
    href: "/servicios/implantes",
    color: "cyan",
  },
  {
    icon: "😊",
    name: "Smile Preview",
    desc: "Simula tu sonrisa antes del tratamiento",
    href: "/empezar",
    color: "blue",
  },
  {
    icon: "🎯",
    name: "Ortho-Predict",
    desc: "Predictor de resultados en ortodoncia",
    href: "/servicios/ortodoncia",
    color: "violet",
  },
  {
    icon: "💰",
    name: "Smart-Finance",
    desc: "Financiamiento inteligente adaptado a ti",
    href: "/empezar",
    color: "emerald",
  },
  {
    icon: "🔬",
    name: "AI Second Opinion",
    desc: "Segunda opinión con inteligencia artificial",
    href: "/segunda-opinion",
    color: "amber",
  },
]

const colorMap: Record<App["color"], { border: string; glow: string; badge: string; text: string }> = {
  cyan: {
    border: "border-cyan-ai/20 hover:border-cyan-ai/60",
    glow: "hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]",
    badge: "bg-cyan-ai/10 text-cyan-ai border border-cyan-ai/30",
    text: "text-cyan-ai",
  },
  blue: {
    border: "border-electric-blue/20 hover:border-electric-blue/60",
    glow: "hover:shadow-[0_0_30px_rgba(0,102,255,0.25)]",
    badge: "bg-electric-blue/10 text-electric-blue border border-electric-blue/30",
    text: "text-electric-blue",
  },
  violet: {
    border: "border-violet-premium/20 hover:border-violet-premium/60",
    glow: "hover:shadow-[0_0_30px_rgba(123,47,255,0.25)]",
    badge: "bg-violet-premium/10 text-violet-premium border border-violet-premium/30",
    text: "text-violet-premium",
  },
  emerald: {
    border: "border-success-emerald/20 hover:border-success-emerald/60",
    glow: "hover:shadow-[0_0_30px_rgba(0,200,150,0.25)]",
    badge: "bg-success-emerald/10 text-success-emerald border border-success-emerald/30",
    text: "text-success-emerald",
  },
  amber: {
    border: "border-warning-amber/20 hover:border-warning-amber/60",
    glow: "hover:shadow-[0_0_30px_rgba(255,184,0,0.25)]",
    badge: "bg-warning-amber/10 text-warning-amber border border-warning-amber/30",
    text: "text-warning-amber",
  },
}

const AppsIASection = () => {
  return (
    <section
      className="py-20 md:py-28 px-4"
      style={{ background: "linear-gradient(180deg, #0D1117 0%, #0A1628 100%)" }}
      aria-labelledby="apps-ia-heading"
    >
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest text-cyan-ai border border-cyan-ai/30 rounded-full bg-cyan-ai/5">
            Inteligencia Artificial Clínica
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-arctic-white mb-4">
            5 Apps de IA activas en tu atención
          </h2>
          <p className="text-steel max-w-xl mx-auto font-body">
            Tecnología de punta que trabaja antes, durante y después de tu tratamiento.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {apps.map((app) => {
            const c = colorMap[app.color]
            return (
              <Link
                key={app.name}
                to={app.href}
                className={`group relative flex flex-col p-6 rounded-2xl
                  bg-white/[0.04] backdrop-blur-sm border transition-all duration-300
                  hover:scale-[1.02] hover:bg-white/[0.07]
                  ${c.border} ${c.glow}`}
                aria-label={`${app.name}: ${app.desc}`}
              >
                {/* Active badge */}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}
                  aria-label="Estado activo"
                >
                  ACTIVO
                </span>

                {/* Icon */}
                <span className="text-3xl mb-4" aria-hidden="true">
                  {app.icon}
                </span>

                {/* Name */}
                <h3 className={`text-base font-display font-bold mb-1.5 ${c.text}`}>
                  {app.name}
                </h3>

                {/* Description */}
                <p className="text-steel text-sm font-body leading-snug">
                  {app.desc}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AppsIASection
