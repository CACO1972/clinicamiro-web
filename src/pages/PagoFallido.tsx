import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { XCircle, MessageCircle, RotateCcw, CalendarX } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getWhatsAppURL } from "@/lib/constants"

const PagoFallido = () => {
  return (
    <>
      <Helmet>
        <title>Pago no completado | Clínica Miró</title>
        <meta name="description" content="Tu pago no pudo ser procesado. Intenta nuevamente o contáctanos." />
      </Helmet>

      <Header />

      <main
        className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #080A0F 0%, #0A1628 100%)" }}
      >
        <div className="container max-w-lg mx-auto text-center">
          {/* Error icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,77,109,0.1)",
                border: "2px solid rgba(255,77,109,0.35)",
                boxShadow: "0 0 40px rgba(255,77,109,0.2)",
              }}
            >
              <XCircle
                className="w-12 h-12"
                style={{ color: "#FF4D6D" }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-arctic-white mb-4">
            No pudimos procesar tu pago
          </h1>
          <p className="text-steel font-body text-lg mb-2">
            El pago no se completó correctamente.
          </p>
          <p className="text-steel-dim font-body text-sm mb-10">
            No se realizó ningún cobro. Puedes intentarlo de nuevo o contactarnos directamente para ayudarte.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-4">
            <Link
              to="/agendar"
              className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-xl font-body font-semibold text-white transition-all duration-300 btn-electric"
              aria-label="Intentar nuevamente"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              Intentar nuevamente
            </Link>

            <a
              href={getWhatsAppURL("pago-fallido", "Hola, tuve un problema al pagar mi cita y necesito ayuda.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-xl font-body font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
              }}
              aria-label="Contactar al equipo por WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Hablar con el equipo
            </a>

            <Link
              to="/agendar"
              className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-xl font-body font-medium transition-all duration-300 btn-outline-cyan"
              aria-label="Agendar sin pago previo"
            >
              <CalendarX className="w-5 h-5" aria-hidden="true" />
              Agendar sin pago previo
            </Link>

            <Link
              to="/"
              className="text-steel hover:text-arctic-white transition-colors font-body text-sm underline underline-offset-4"
              aria-label="Volver al inicio"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default PagoFallido
