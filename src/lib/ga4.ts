// GA4 Analytics - Clínica Miró
// Implementación completa según diagrama de flujo

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || "G-XXXXXXXXXX"

// Inicializar GA4
export const initGA4 = () => {
  if (typeof window === "undefined") return

  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.warn("[GA4] Using placeholder measurement ID. Set VITE_GA4_MEASUREMENT_ID in .env")
    return
  }

  // Cargar script de GA4
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })

  console.log("[GA4] Initialized with ID:", GA_MEASUREMENT_ID)
}

// Helper para enviar eventos
const sendEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params)
    if (import.meta.env.DEV) {
      console.log(`[GA4] ${eventName}`, params)
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// EVENTOS DE ENTRADA (IN)
// ═══════════════════════════════════════════════════════════════

export const trackViewHome = () => {
  sendEvent("view_home")
}

export const trackEntryFlow = (flow: "nuevo" | "opinion" | "portal") => {
  sendEvent("entry_flow", { flow_type: flow })
}

// ═══════════════════════════════════════════════════════════════
// EVENTOS FUNNEL NUEVO PACIENTE (NP)
// ═══════════════════════════════════════════════════════════════

export const trackSelectComplaint = (complaint: string) => {
  sendEvent("select_complaint", { complaint_type: complaint })
}

export const trackSelectSymptoms = (symptoms: string[], urgency: string) => {
  sendEvent("select_symptoms", {
    symptoms: symptoms.join(","),
    urgency,
    symptoms_count: symptoms.length,
  })
}

export const trackUploadImage = (hasImage: boolean) => {
  sendEvent("upload_image", { has_image: hasImage })
}

export const trackAIResultReady = (routeKey: string, tagsCount: number) => {
  sendEvent("ai_result_ready", {
    route_key: routeKey,
    tags_count: tagsCount,
  })
}

export const trackViewFinancing = (amount?: number) => {
  sendEvent("view_financing", { amount })
}

export const trackRouteRecommended = (program: string) => {
  sendEvent("route_recommended", { recommended_program: program })
}

// ═══════════════════════════════════════════════════════════════
// EVENTOS SEGUNDA OPINIÓN (SO)
// ═══════════════════════════════════════════════════════════════

export const trackSOSelect = (type: "presupuesto" | "rx") => {
  sendEvent("so_select", { opinion_type: type })
}

export const trackFormSubmit = (type: "presupuesto" | "rx", hasFiles: boolean) => {
  sendEvent("form_submit", {
    form_type: type,
    has_files: hasFiles,
  })
}

// ═══════════════════════════════════════════════════════════════
// EVENTOS DE CONVERSIÓN (CONV)
// ═══════════════════════════════════════════════════════════════

export const trackBeginSchedule = (source: string) => {
  sendEvent("begin_schedule", { source })
}

export const trackBeginWhatsApp = (context: string) => {
  sendEvent("begin_whatsapp", { context })
}

// ═══════════════════════════════════════════════════════════════
// EVENTOS DE OPERACIONES (OPS)
// ═══════════════════════════════════════════════════════════════

export const trackAppointmentConfirmed = (appointmentId: string) => {
  sendEvent("appointment_confirmed", { appointment_id: appointmentId })
}

export const trackReminderSent = (appointmentId: string, reminderType: string) => {
  sendEvent("reminder_sent", {
    appointment_id: appointmentId,
    reminder_type: reminderType,
  })
}

export const trackReschedule = (appointmentId: string) => {
  sendEvent("reschedule", { appointment_id: appointmentId })
}

export const trackAttended = (appointmentId: string) => {
  sendEvent("attended", { appointment_id: appointmentId })
}

export const trackNoShow = (appointmentId: string) => {
  sendEvent("no_show", { appointment_id: appointmentId })
}

// ═══════════════════════════════════════════════════════════════
// EVENTOS ADICIONALES
// ═══════════════════════════════════════════════════════════════

export const trackExclusivoMiroView = (program: string) => {
  sendEvent("exclusivo_miro_view", { program })
}

export const trackTestimonioView = (testimonioId: string) => {
  sendEvent("testimonio_view", { testimonio_id: testimonioId })
}

export const trackLeadMagnetDownload = (guideId: string) => {
  sendEvent("lead_magnet_download", { guide_id: guideId })
}

export const trackVideoTourStart = () => {
  sendEvent("video_tour_start")
}

export const trackVideoTourComplete = () => {
  sendEvent("video_tour_complete")
}

export const trackSimulacionStart = () => {
  sendEvent("simulacion_start")
}

export const trackPaymentInitiated = (amount: number, service: string) => {
  sendEvent("payment_initiated", { amount, service })
}

export const trackPaymentCompleted = (amount: number, service: string) => {
  sendEvent("payment_completed", { amount, service })
}

// Page view tracking
export const trackPageView = (pagePath: string, pageTitle: string) => {
  sendEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  })
}

export default {
  initGA4,
  trackViewHome,
  trackEntryFlow,
  trackSelectComplaint,
  trackSelectSymptoms,
  trackUploadImage,
  trackAIResultReady,
  trackViewFinancing,
  trackRouteRecommended,
  trackSOSelect,
  trackFormSubmit,
  trackBeginSchedule,
  trackBeginWhatsApp,
  trackAppointmentConfirmed,
  trackReminderSent,
  trackReschedule,
  trackAttended,
  trackNoShow,
  trackPageView,
}
