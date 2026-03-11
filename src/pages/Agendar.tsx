import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { ChevronLeft, Check, Calendar, User, CreditCard, Stethoscope } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FlowCheckoutButton from "@/components/FlowCheckoutButton"

interface Tratamiento {
  id: string
  nombre: string
  precio: number
  categoria: string
  icon: string
  requierePago: boolean
  montoPago?: number
}

const TRATAMIENTOS: Tratamiento[] = [
  { id: "implante", nombre: "Implante Unitario", precio: 759000, categoria: "Rehabilitación", icon: "🦷", requierePago: true, montoPago: 50000 },
  { id: "all-on-four", nombre: "All-on-Four", precio: 3945000, categoria: "Rehabilitación", icon: "✨", requierePago: true, montoPago: 200000 },
  { id: "carilla", nombre: "Carilla Dental", precio: 350000, categoria: "Estética", icon: "💎", requierePago: true, montoPago: 50000 },
  { id: "corona", nombre: "Corona Zirconio", precio: 370000, categoria: "Estética", icon: "👑", requierePago: false },
  { id: "ortodoncia-brackets", nombre: "Brackets Estéticos", precio: 990000, categoria: "Ortodoncia", icon: "🎯", requierePago: false },
  { id: "ortodoncia-alineadores", nombre: "Alineadores", precio: 990000, categoria: "Ortodoncia", icon: "🔬", requierePago: false },
  { id: "blanqueamiento", nombre: "Blanqueamiento", precio: 235000, categoria: "Estética", icon: "⚡", requierePago: false },
  { id: "curodont", nombre: "Tratamiento Curodont", precio: 80000, categoria: "Preventivo", icon: "🌱", requierePago: false },
  { id: "higiene", nombre: "Higiene + Ultrasonido", precio: 59000, categoria: "Prevención", icon: "🪥", requierePago: false },
  { id: "evaluacion", nombre: "Evaluación + Diagnóstico IA", precio: 0, categoria: "Diagnóstico", icon: "🧠", requierePago: false },
]

type Slot = { hora: string; profesional: string; disponible: boolean }

interface PatientData {
  nombre: string
  rut: string
  email: string
  telefono: string
}

const steps = [
  { icon: Stethoscope, label: "Tratamiento" },
  { icon: Calendar, label: "Fecha y Hora" },
  { icon: User, label: "Tus Datos" },
  { icon: CreditCard, label: "Confirmar" },
]

const formatCLP = (n: number) =>
  n === 0 ? "Gratis" : `$${n.toLocaleString("es-CL")}`

const validateRUT = (rut: string): boolean => {
  const cleaned = rut.replace(/[.-]/g, "")
  if (cleaned.length < 8) return false
  const body = cleaned.slice(0, -1)
  const dv = cleaned.slice(-1).toLowerCase()
  let sum = 0
  let mul = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * mul
    mul = mul === 7 ? 2 : mul + 1
  }
  const remainder = sum % 11
  const expectedDv = remainder === 1 ? "k" : remainder === 0 ? "0" : String(11 - remainder)
  return dv === expectedDv
}

const Agendar = () => {
  const [step, setStep] = useState(0)
  const [selectedTratamiento, setSelectedTratamiento] = useState<Tratamiento | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [patient, setPatient] = useState<PatientData>({ nombre: "", rut: "", email: "", telefono: "" })
  const [rutError, setRutError] = useState("")
  const [booking, setBooking] = useState(false)
  const navigate = useNavigate()

  const next = () => setStep((s) => Math.min(s + 1, 3))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const fetchSlots = async (fecha: string) => {
    if (!selectedTratamiento) return
    setLoadingSlots(true)
    setSlots([])
    try {
      const { data, error } = await supabase.functions.invoke("agenda-options", {
        body: { fecha, tratamiento: selectedTratamiento.id },
      })
      if (error) throw error
      setSlots((data as Slot[]) ?? [])
    } catch {
      toast.error("No se pudieron cargar los horarios. Intenta de nuevo.")
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleDateChange = (fecha: string) => {
    setSelectedDate(fecha)
    setSelectedSlot(null)
    void fetchSlots(fecha)
  }

  const handleRUTChange = (val: string) => {
    setPatient((p) => ({ ...p, rut: val }))
    if (val.length > 7) {
      setRutError(validateRUT(val) ? "" : "RUT inválido")
    } else {
      setRutError("")
    }
  }

  const confirmBooking = async () => {
    if (!selectedTratamiento || !selectedDate || !selectedSlot) return
    setBooking(true)
    try {
      const appointmentData = {
        tratamiento: selectedTratamiento.id,
        tratamientoNombre: selectedTratamiento.nombre,
        fecha: selectedDate,
        hora: selectedSlot.hora,
        profesional: selectedSlot.profesional,
        paciente: patient,
      }
      const { error } = await supabase.functions.invoke("agenda-book", {
        body: appointmentData,
      })
      if (error) throw error
      toast.success("¡Cita reservada con éxito! Te contactaremos pronto.")
      void navigate("/gracias")
    } catch {
      toast.error("No se pudo reservar la cita. Por favor intenta de nuevo.")
    } finally {
      setBooking(false)
    }
  }

  const isPatientValid =
    patient.nombre.trim().length > 2 &&
    patient.email.includes("@") &&
    patient.telefono.trim().length >= 8 &&
    (patient.rut === "" || validateRUT(patient.rut))

  // Generate next 14 days (excluding Sundays)
  const availableDates = Array.from({ length: 21 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  }).filter((d) => d.getDay() !== 0)

  return (
    <>
      <Helmet>
        <title>Agendar Cita | Clínica Miró</title>
        <meta name="description" content="Agenda tu cita en Clínica Miró. Selecciona tratamiento, fecha y hora disponible." />
      </Helmet>

      <Header />

      <main
        className="min-h-screen pt-24 pb-16 px-4"
        style={{ background: "linear-gradient(180deg, #080A0F 0%, #0A1628 100%)" }}
      >
        <div className="container max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-steel hover:text-arctic-white transition-colors mb-8 font-body text-sm"
            aria-label="Volver al inicio"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          {/* Page title */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-arctic-white mb-2">
            Agenda tu cita
          </h1>
          <p className="text-steel font-body mb-10">
            4 pasos simples para reservar con un especialista.
          </p>

          {/* Stepper */}
          <nav aria-label="Pasos del proceso" className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isCompleted = i < step
              const isCurrent = i === step
              return (
                <div key={s.label} className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex flex-col items-center gap-1 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isCompleted
                          ? "bg-cyan-ai border-cyan-ai text-obsidian"
                          : isCurrent
                          ? "border-electric-blue bg-electric-blue/10 text-electric-blue"
                          : "border-steel-dim bg-white/5 text-steel-dim"
                      }`}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-body truncate max-w-[60px] text-center ${
                        isCurrent ? "text-arctic-white" : isCompleted ? "text-cyan-ai" : "text-steel-dim"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-px flex-1 transition-all duration-300 ${
                        i < step ? "bg-cyan-ai" : "bg-steel-dim/30"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Step content */}
          <div className="glass-dark rounded-2xl p-6 md:p-8">
            {/* Step 0: Treatment selection */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-display font-bold text-arctic-white mb-6">
                  ¿Qué tratamiento necesitas?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TRATAMIENTOS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTratamiento(t)}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        selectedTratamiento?.id === t.id
                          ? "border-electric-blue bg-electric-blue/10"
                          : "border-steel-dim/30 bg-white/[0.03] hover:border-steel/50 hover:bg-white/[0.06]"
                      }`}
                      aria-pressed={selectedTratamiento?.id === t.id}
                      aria-label={`${t.nombre} - ${formatCLP(t.precio)}`}
                    >
                      <span className="text-2xl mt-0.5" aria-hidden="true">{t.icon}</span>
                      <div className="min-w-0">
                        <p className="font-body font-semibold text-arctic-white text-sm truncate">
                          {t.nombre}
                        </p>
                        <p className="text-xs text-steel mt-0.5">{t.categoria}</p>
                        <p className={`text-sm font-semibold mt-1 ${t.precio === 0 ? "text-success-emerald" : "text-cyan-ai"}`}>
                          {formatCLP(t.precio)}
                        </p>
                      </div>
                      {selectedTratamiento?.id === t.id && (
                        <Check className="w-4 h-4 text-electric-blue ml-auto mt-1 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={next}
                    disabled={!selectedTratamiento}
                    className="btn-electric disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Continuar a selección de fecha"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Date & time */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-display font-bold text-arctic-white mb-2">
                  Elige fecha y horario
                </h2>
                <p className="text-steel font-body text-sm mb-6">
                  Tratamiento: <span className="text-cyan-ai font-semibold">{selectedTratamiento?.nombre}</span>
                </p>

                {/* Date picker */}
                <div className="mb-6">
                  <label className="block text-sm font-body font-medium text-steel mb-3">
                    Selecciona una fecha
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {availableDates.slice(0, 14).map((d) => {
                      const dateStr = d.toISOString().split("T")[0]
                      const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
                      const isSelected = selectedDate === dateStr
                      return (
                        <button
                          key={dateStr}
                          onClick={() => handleDateChange(dateStr)}
                          className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-xs font-body transition-all duration-200 ${
                            isSelected
                              ? "bg-electric-blue border-electric-blue text-white"
                              : "border-steel-dim/30 bg-white/[0.03] text-steel hover:border-electric-blue/50 hover:text-arctic-white"
                          }`}
                          aria-pressed={isSelected}
                          aria-label={dateStr}
                        >
                          <span className="font-semibold text-sm">{d.getDate()}</span>
                          <span className="opacity-70">{dayNames[d.getDay()]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-body font-medium text-steel mb-3">
                      Horarios disponibles
                    </label>
                    {loadingSlots ? (
                      <p className="text-steel text-sm animate-pulse">Cargando horarios...</p>
                    ) : slots.length === 0 ? (
                      <div className="text-center py-8 text-steel">
                        <p className="text-sm">No hay horarios disponibles para esta fecha.</p>
                        <p className="text-xs mt-1 text-steel-dim">Prueba con otro día.</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {slots.map((slot) => (
                          <button
                            key={slot.hora}
                            onClick={() => setSelectedSlot(slot)}
                            disabled={!slot.disponible}
                            className={`px-4 py-2 rounded-lg text-sm font-body font-medium border transition-all duration-200 ${
                              selectedSlot?.hora === slot.hora
                                ? "bg-cyan-ai/20 border-cyan-ai text-cyan-ai"
                                : slot.disponible
                                ? "border-steel-dim/40 text-steel hover:border-cyan-ai/60 hover:text-arctic-white"
                                : "border-steel-dim/20 text-steel-dim cursor-not-allowed opacity-40"
                            }`}
                            aria-pressed={selectedSlot?.hora === slot.hora}
                            aria-disabled={!slot.disponible}
                            aria-label={`Horario ${slot.hora}`}
                          >
                            {slot.hora}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 flex gap-3 justify-between">
                  <button onClick={back} className="btn-outline-cyan" aria-label="Volver al paso anterior">
                    Atrás
                  </button>
                  <button
                    onClick={next}
                    disabled={!selectedDate || !selectedSlot}
                    className="btn-electric disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Continuar a datos del paciente"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Patient data */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-display font-bold text-arctic-white mb-6">
                  Tus datos
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-body font-medium text-steel mb-1.5">
                      Nombre completo <span className="text-error-coral">*</span>
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      value={patient.nombre}
                      onChange={(e) => setPatient((p) => ({ ...p, nombre: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-steel-dim/30 text-arctic-white placeholder-steel-dim font-body text-sm focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                      placeholder="Juan Pérez García"
                      autoComplete="name"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="rut" className="block text-sm font-body font-medium text-steel mb-1.5">
                      RUT (opcional)
                    </label>
                    <input
                      id="rut"
                      type="text"
                      value={patient.rut}
                      onChange={(e) => handleRUTChange(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border font-body text-sm text-arctic-white placeholder-steel-dim focus:outline-none transition-all ${
                        rutError
                          ? "border-error-coral/60 focus:border-error-coral"
                          : "border-steel-dim/30 focus:border-electric-blue/60 focus:bg-white/[0.08]"
                      }`}
                      placeholder="12.345.678-9"
                      autoComplete="off"
                    />
                    {rutError && (
                      <p className="mt-1 text-xs text-error-coral font-body" role="alert">
                        {rutError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-body font-medium text-steel mb-1.5">
                      Email <span className="text-error-coral">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={patient.email}
                      onChange={(e) => setPatient((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-steel-dim/30 text-arctic-white placeholder-steel-dim font-body text-sm focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                      placeholder="juan@ejemplo.cl"
                      autoComplete="email"
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-body font-medium text-steel mb-1.5">
                      Teléfono <span className="text-error-coral">*</span>
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      value={patient.telefono}
                      onChange={(e) => setPatient((p) => ({ ...p, telefono: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-steel-dim/30 text-arctic-white placeholder-steel-dim font-body text-sm focus:outline-none focus:border-electric-blue/60 focus:bg-white/[0.08] transition-all"
                      placeholder="+56 9 1234 5678"
                      autoComplete="tel"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-3 justify-between">
                  <button onClick={back} className="btn-outline-cyan" aria-label="Volver al paso anterior">
                    Atrás
                  </button>
                  <button
                    onClick={next}
                    disabled={!isPatientValid}
                    className="btn-electric disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Continuar a confirmación"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm & Pay */}
            {step === 3 && selectedTratamiento && selectedSlot && (
              <div>
                <h2 className="text-xl font-display font-bold text-arctic-white mb-6">
                  Confirmar reserva
                </h2>

                {/* Summary card */}
                <div className="glass-blue rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-steel">Tratamiento</span>
                    <span className="text-arctic-white font-medium">{selectedTratamiento.nombre}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-steel">Fecha</span>
                    <span className="text-arctic-white font-medium">
                      {new Date(selectedDate + "T12:00:00").toLocaleDateString("es-CL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-steel">Hora</span>
                    <span className="text-arctic-white font-medium">{selectedSlot.hora}</span>
                  </div>
                  {selectedSlot.profesional && (
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-steel">Profesional</span>
                      <span className="text-arctic-white font-medium">{selectedSlot.profesional}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-steel">Paciente</span>
                    <span className="text-arctic-white font-medium">{patient.nombre}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-steel font-body text-sm">Precio referencial</span>
                    <span className="text-cyan-ai font-semibold">{formatCLP(selectedTratamiento.precio)}</span>
                  </div>
                </div>

                {/* Payment / Confirm section */}
                {selectedTratamiento.requierePago && selectedTratamiento.montoPago ? (
                  <div>
                    <p className="text-steel text-sm font-body mb-4">
                      Para confirmar tu cita se requiere un anticipo de{" "}
                      <span className="text-cyan-ai font-semibold">
                        {formatCLP(selectedTratamiento.montoPago)}
                      </span>{" "}
                      mediante Flow.
                    </p>
                    <FlowCheckoutButton
                      amount={selectedTratamiento.montoPago}
                      treatment={selectedTratamiento.nombre}
                      email={patient.email}
                      appointmentData={{
                        tratamiento: selectedTratamiento.id,
                        fecha: selectedDate,
                        hora: selectedSlot.hora,
                        profesional: selectedSlot.profesional,
                        paciente: patient,
                      }}
                      label={`Reservar con $${selectedTratamiento.montoPago.toLocaleString("es-CL")}`}
                    />
                  </div>
                ) : (
                  <button
                    onClick={confirmBooking}
                    disabled={booking}
                    className="w-full btn-electric flex items-center justify-center gap-2 disabled:opacity-50"
                    aria-label="Confirmar reserva de cita"
                  >
                    {booking ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Reservando...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        Confirmar cita
                      </>
                    )}
                  </button>
                )}

                <div className="mt-4">
                  <button onClick={back} className="btn-outline-cyan w-full" aria-label="Volver al paso anterior">
                    Atrás
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Agendar
