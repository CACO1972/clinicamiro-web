import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { CheckCircle, MessageCircle, User } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getWhatsAppURL } from "@/lib/constants"

const PagoExitoso = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Pago Exitoso | Clínica Miró</title>
        <meta name="description" content="Tu pago fue procesado con éxito y tu cita está confirmada." />
      </Helmet>

      <Header />

      <main
        className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #080A0F 0%, #0A1628 100%)" }}
      >
        <div className="container max-w-lg mx-auto text-center">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(0,200,150,0.12)",
                border: "2px solid rgba(0,200,150,0.4)",
                boxShadow: "0 0 40px rgba(0,200,150,0.25)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              <CheckCircle
                className="w-12 h-12"
                style={{ color: "#00C896" }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-arctic-white mb-4">
            ¡Cita confirmada!
          </h1>
          <p className="text-steel font-body text-lg mb-2">
            Tu pago fue procesado con éxito.
          </p>
          <p className="text-steel-dim font-body text-sm mb-10">
            Te enviaremos un correo con los detalles de tu cita. Si tienes preguntas, contáctanos por WhatsApp.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-4">
            <a
              href={getWhatsAppURL("pago-exitoso", "Hola, acabo de confirmar mi cita y me gustaría más información.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-xl font-body font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
              }}
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Contactar por WhatsApp
            </a>

            <Link
              to="/portal-paciente"
              className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-xl font-body font-semibold transition-all duration-300 btn-outline-cyan"
              aria-label="Ver mi Portal de Paciente"
            >
              <User className="w-5 h-5" aria-hidden="true" />
              Ver mi Portal
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

export default PagoExitoso
