// Global type definitions for Clínica Miró

import type { LucideIcon } from "lucide-react"

// Navigation
export interface NavItem {
  label: string
  to: string
  icon?: LucideIcon
  description?: string
}

// Clinic Information
export interface ClinicInfo {
  nombre: string
  tagline: string
  anosExperiencia: number
  direccion: string
  telefono: string
  email: string
  horarios: {
    lunesViernes: string
    sabado: string
    domingo: string
  }
  social: {
    instagram: string
    facebook: string
    youtube: string
  }
}

// Motivo de consulta
export interface MotivoConsultaOption {
  id: string
  titulo: string
  descripcion: string
  icono: string
  color: string
}

// Urgencia
export interface UrgenciaOption {
  id: string
  titulo: string
  descripcion: string
  prioridad: number
}

// Arancel
export interface ArancelItem {
  nombre: string
  precio: number
  descripcion: string
  incluye: string[]
}

export interface Aranceles {
  evaluacion: ArancelItem
  segundaOpinion: ArancelItem
  urgencia: ArancelItem
}

// Testimonio
export interface Testimonio {
  id: string
  nombre: string
  tratamiento: string
  videoUrl: string
  thumbnailUrl: string
  cita: string
  fecha: string
}

// Lead Magnet
export interface LeadMagnet {
  id: string
  titulo: string
  descripcion: string
  pdfUrl: string
  thumbnail: string
}

// Analytics
export interface GAEvent {
  event: string
  params?: Record<string, string | number | boolean>
}

export interface ErrorInfo {
  componentStack: string
}
