import { useState } from "react"
import { Loader2, CreditCard } from "lucide-react"
import { toast } from "sonner"
import { createFlowPayment } from "@/services/flow"

interface FlowCheckoutButtonProps {
  amount: number
  treatment: string
  email: string
  appointmentData?: Record<string, unknown>
  label?: string
}

const FlowCheckoutButton = ({
  amount,
  treatment,
  email,
  appointmentData,
  label,
}: FlowCheckoutButtonProps) => {
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    try {
      const { url } = await createFlowPayment({
        amount,
        subject: `Clínica Miró - ${treatment}`,
        email,
        treatment,
        appointment_data: appointmentData,
      })
      window.location.href = url
    } catch {
      toast.error("Error al procesar el pago. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      aria-label={label ?? `Pagar ${amount.toLocaleString("es-CL")} con Flow`}
      className="w-full py-4 px-8 rounded-xl font-body font-semibold text-white
        flex items-center justify-center gap-3 transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: loading
          ? "rgba(0,102,255,0.6)"
          : "linear-gradient(135deg, #0066FF 0%, #0052CC 100%)",
        boxShadow: loading ? "none" : "0 4px 20px rgba(0,102,255,0.35)",
      }}
      onMouseEnter={(e) => {
        if (!loading)
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 30px rgba(0,102,255,0.5)"
      }}
      onMouseLeave={(e) => {
        if (!loading)
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 20px rgba(0,102,255,0.35)"
      }}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      ) : (
        <CreditCard className="w-5 h-5" aria-hidden="true" />
      )}
      {label ?? `Pagar $${amount.toLocaleString("es-CL")} con Flow`}
    </button>
  )
}

export default FlowCheckoutButton
