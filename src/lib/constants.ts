// Constantes globales - Clínica Miró
// Datos reales según diagrama de flujo

import type { ClinicInfo, MotivoConsultaOption, UrgenciaOption, Aranceles, Testimonio, LeadMagnet } from "@/types"

// ═══════════════════════════════════════════════════════════════
// CONTACTO Y CONVERSIÓN
// ═══════════════════════════════════════════════════════════════

export const WHATSAPP_NUMBER = "+56935572986"
export const WHATSAPP_NUMBER_DISPLAY = "+56 9 3557 2986"

export const DENTALINK_URL = "https://ff.healthatom.io/41knMr"

export const getWhatsAppURL = (context?: string, message?: string): string => {
  const defaultMessage = message || "Hola, me interesa agendar una consulta en Clínica Miró."
  const contextSuffix = context ? ` [${context}]` : ""
  const fullMessage = encodeURIComponent(defaultMessage + contextSuffix)
  return `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${fullMessage}`
}

export const getWhatsAppURLWithDiagnostico = (programa: string, urgencia: string): string => {
  const message = `Hola, acabo de completar el diagnóstico en la web. Me recomendaron el programa ${programa}. Mi urgencia es: ${urgencia}. Me gustaría más información.`
  return getWhatsAppURL("diagnostico-web", message)
}

// ═══════════════════════════════════════════════════════════════
// INFORMACIÓN DE LA CLÍNICA
// ═══════════════════════════════════════════════════════════════

export const CLINICA_INFO: ClinicInfo = {
  nombre: "Clínica Miró",
  tagline: "Donde la ciencia se encuentra con la belleza de tu sonrisa",
  anosExperiencia: 18,
  direccion: "Av. Presidente Kennedy 5454, Of. 1203, Las Condes, Santiago",
  telefono: "+56 2 2345 6789",
  email: "contacto@clinicamiro.cl",
  horarios: {
    lunesViernes: "09:00 - 19:00",
    sabado: "09:00 - 14:00",
    domingo: "Cerrado",
  },
  social: {
    instagram: "@clinicamiro",
    facebook: "clinicamirosantiago",
    youtube: "clinicamiro",
  },
}

// ═══════════════════════════════════════════════════════════════
// PROMESA (H1 del diagrama)
// ═══════════════════════════════════════════════════════════════

export const PROMESA = {
  titulo: "18 años transformando sonrisas",
  subtitulo: "Renovación total + Inteligencia Artificial + Nuevas instalaciones",
  puntos: [
    "18 años de experiencia clínica de excelencia",
    "Tecnología IA de última generación",
    "Instalaciones completamente renovadas",
    "Equipo de especialistas certificados",
  ],
} as const

// ═══════════════════════════════════════════════════════════════
// MOTIVOS DE CONSULTA
// ═══════════════════════════════════════════════════════════════

export const MOTIVOS_CONSULTA: MotivoConsultaOption[] = [
  {
    id: "dolor",
    titulo: "Dolor o Molestia",
    descripcion: "Tengo dolor de muela, sensibilidad o molestias",
    icono: "AlertCircle",
    color: "red",
  },
  {
    id: "estetica",
    titulo: "Mejorar mi Sonrisa",
    descripcion: "Quiero blanqueamiento, carillas o mejorar la estética",
    icono: "Sparkles",
    color: "gold",
  },
  {
    id: "implantes",
    titulo: "Implantes Dentales",
    descripcion: "Me faltan dientes o necesito rehabilitación",
    icono: "Puzzle",
    color: "blue",
  },
  {
    id: "ortodoncia",
    titulo: "Ortodoncia",
    descripcion: "Quiero alinear mis dientes o corregir mi mordida",
    icono: "AlignCenter",
    color: "purple",
  },
  {
    id: "prevencion",
    titulo: "Prevención y Control",
    descripcion: "Limpieza, revisión general o chequeo preventivo",
    icono: "Shield",
    color: "green",
  },
  {
    id: "otro",
    titulo: "Otro Motivo",
    descripcion: "Mi consulta es por otro tema",
    icono: "HelpCircle",
    color: "gray",
  },
]

// ═══════════════════════════════════════════════════════════════
// OPCIONES DE URGENCIA
// ═══════════════════════════════════════════════════════════════

export const URGENCIAS: UrgenciaOption[] = [
  {
    id: "inmediata",
    titulo: "Urgente - Lo antes posible",
    descripcion: "Necesito atención en las próximas 24-48 horas",
    prioridad: 1,
  },
  {
    id: "esta-semana",
    titulo: "Esta semana",
    descripcion: "Puedo esperar algunos días",
    prioridad: 2,
  },
  {
    id: "este-mes",
    titulo: "Este mes",
    descripcion: "No es urgente, pero quiero agendarme pronto",
    prioridad: 3,
  },
  {
    id: "solo-consulta",
    titulo: "Solo quiero información",
    descripcion: "Estoy evaluando opciones",
    prioridad: 4,
  },
]

// ═══════════════════════════════════════════════════════════════
// ARANCELES REFERENCIALES
// ═══════════════════════════════════════════════════════════════

export const ARANCELES: Aranceles = {
  evaluacion: {
    nombre: "Evaluación Integral con IA",
    precio: 45000,
    descripcion: "Diagnóstico completo con tecnología de inteligencia artificial",
    incluye: [
      "Examen clínico completo",
      "Análisis con IA diagnóstica",
      "Fotografías intraorales",
      "Plan de tratamiento personalizado",
      "Presupuesto detallado",
    ],
  },
  segundaOpinion: {
    nombre: "Segunda Opinión Profesional",
    precio: 35000,
    descripcion: "Revisión de diagnóstico o presupuesto existente",
    incluye: [
      "Análisis de documentación existente",
      "Evaluación clínica",
      "Informe comparativo",
      "Recomendaciones alternativas",
    ],
  },
  urgencia: {
    nombre: "Atención de Urgencia",
    precio: 55000,
    descripcion: "Atención prioritaria para casos urgentes",
    incluye: [
      "Atención en menos de 24 horas",
      "Diagnóstico de emergencia",
      "Tratamiento paliativo si corresponde",
      "Derivación a especialista si es necesario",
    ],
  },
}

// ═══════════════════════════════════════════════════════════════
// TESTIMONIOS (Datos placeholder - reemplazar con reales)
// ═══════════════════════════════════════════════════════════════

export const TESTIMONIOS: Testimonio[] = [
  {
    id: "testimonio-1",
    nombre: "María González",
    tratamiento: "Implant One",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    thumbnailUrl: "/testimonios/maria-thumb.jpg",
    cita: "Recuperé mi sonrisa en un solo día. El equipo es increíble.",
    fecha: "2024-06-15",
  },
  {
    id: "testimonio-2",
    nombre: "Carlos Rodríguez",
    tratamiento: "Revive FACE.SMILE™",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    thumbnailUrl: "/testimonios/carlos-thumb.jpg",
    cita: "La simulación con IA me mostró exactamente cómo quedaría. Sin sorpresas.",
    fecha: "2024-08-22",
  },
  {
    id: "testimonio-3",
    nombre: "Andrea Muñoz",
    tratamiento: "ALIGN",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    thumbnailUrl: "/testimonios/andrea-thumb.jpg",
    cita: "Los alineadores fueron perfectos para mi estilo de vida. Nadie notó que los usaba.",
    fecha: "2024-10-10",
  },
]

// ═══════════════════════════════════════════════════════════════
// LEAD MAGNETS / GUÍAS
// ═══════════════════════════════════════════════════════════════

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: "guia-implantes",
    titulo: "Guía Completa de Implantes Dentales",
    descripcion: "Todo lo que necesitas saber antes de decidir",
    pdfUrl: "/guias/guia-implantes-2024.pdf",
    thumbnail: "/guias/thumb-implantes.jpg",
  },
  {
    id: "guia-ortodoncia",
    titulo: "¿Brackets o Alineadores?",
    descripcion: "Compara opciones y encuentra la mejor para ti",
    pdfUrl: "/guias/guia-ortodoncia-2024.pdf",
    thumbnail: "/guias/thumb-ortodoncia.jpg",
  },
  {
    id: "guia-blanqueamiento",
    titulo: "Secretos del Blanqueamiento Profesional",
    descripcion: "Por qué no todos los blanqueamientos son iguales",
    pdfUrl: "/guias/guia-blanqueamiento-2024.pdf",
    thumbnail: "/guias/thumb-blanqueamiento.jpg",
  },
]

export default {
  WHATSAPP_NUMBER,
  WHATSAPP_NUMBER_DISPLAY,
  DENTALINK_URL,
  getWhatsAppURL,
  getWhatsAppURLWithDiagnostico,
  CLINICA_INFO,
  PROMESA,
  MOTIVOS_CONSULTA,
  URGENCIAS,
  ARANCELES,
  TESTIMONIOS,
  LEAD_MAGNETS,
}
