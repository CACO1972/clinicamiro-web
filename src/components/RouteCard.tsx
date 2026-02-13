"use client"

import { useState, memo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface RouteCardProps {
  to: string
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  variant?: "dark" | "ivory"
}

const RouteCard = memo(({ to, icon: Icon, title, description, delay = 0, variant = "dark" }: RouteCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const isDark = variant === "dark"

  const styles = {
    dark: {
      card: {
        background: "rgba(10, 10, 14, 0.92)",
        border: "1px solid rgba(196, 162, 101, 0.22)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(196, 162, 101, 0.08)",
      },
      cardHover: {
        background: "rgba(12, 12, 16, 0.95)",
        borderColor: "rgba(196, 162, 101, 0.35)",
        boxShadow: "0 8px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(196, 162, 101, 0.15)",
      },
      iconWrapper: {
        background: "hsla(40, 45%, 58%, 0.12)",
        border: "1px solid hsla(40, 45%, 58%, 0.18)",
      },
      title: "text-white",
      description: "text-lilac-glow",
      glow: "radial-gradient(ellipse at center, hsla(40, 45%, 58%, 0.06) 0%, transparent 70%)",
    },
    ivory: {
      card: {
        background: "rgba(242, 237, 228, 0.85)",
        border: "1px solid rgba(196, 162, 101, 0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(155, 138, 165, 0.08), 0 2px 8px rgba(0,0,0,0.04)",
      },
      cardHover: {
        background: "rgba(247, 244, 238, 0.95)",
        borderColor: "rgba(196, 162, 101, 0.40)",
        boxShadow: "0 8px 32px rgba(196, 162, 101, 0.12), 0 4px 12px rgba(0,0,0,0.06)",
      },
      iconWrapper: {
        background: "hsla(40, 45%, 58%, 1)",
        border: "none",
      },
      title: "text-charcoal",
      description: "text-charcoal/60",
      glow: "radial-gradient(ellipse at center, hsla(40, 45%, 58%, 0.08) 0%, transparent 70%)",
    },
  }

  const currentStyle = styles[variant]

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }}>
      <Link
        to={to}
        className="block p-7 md:p-8 group rounded-xl relative overflow-hidden"
        style={{
          ...currentStyle.card,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 1500)}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={false}
          animate={
            isHovered
              ? {
                  background: currentStyle.cardHover.background,
                  boxShadow: currentStyle.cardHover.boxShadow,
                }
              : {}
          }
          transition={{ duration: 0.35 }}
          style={{
            borderColor: isHovered ? currentStyle.cardHover.borderColor : undefined,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <motion.div
              className="p-2.5 rounded-lg transition-all duration-300"
              style={currentStyle.iconWrapper}
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="w-5 h-5" style={{ color: isDark ? "hsl(40, 45%, 58%)" : "#111111" }} />
            </motion.div>
            <h3
              className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${currentStyle.title}`}
              style={{
                textShadow: isDark ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {title}
            </h3>
          </div>

          <motion.p
            className={`text-sm leading-relaxed pl-[52px] ${currentStyle.description}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              textShadow: isDark ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
            }}
          >
            {description}
          </motion.p>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: currentStyle.glow,
          }}
        />
      </Link>
    </motion.div>
  )
})

RouteCard.displayName = "RouteCard"

export default RouteCard
