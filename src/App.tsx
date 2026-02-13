import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader2 } from "lucide-react"

// Pages - lazy loaded
const Index = lazy(() => import("./pages/Index"))
const Empezar = lazy(() => import("./pages/Empezar"))
const SegundaOpinion = lazy(() => import("./pages/SegundaOpinion"))
const Portal = lazy(() => import("./pages/Portal"))
const PortalPaciente = lazy(() => import("./pages/PortalPaciente"))
const PortalProfesional = lazy(() => import("./pages/PortalProfesional"))
const Auth = lazy(() => import("./pages/Auth"))
const Gracias = lazy(() => import("./pages/Gracias"))
const Implantes = lazy(() => import("./pages/servicios/Implantes"))
const Ortodoncia = lazy(() => import("./pages/servicios/Ortodoncia"))
const EsteticaDental = lazy(() => import("./pages/servicios/EsteticaDental"))
const Prevencion = lazy(() => import("./pages/servicios/Prevencion"))
const NotFound = lazy(() => import("./pages/NotFound"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-8 w-8 animate-spin text-gold" />
  </div>
)

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main */}
              <Route path="/" element={<Index />} />
              <Route path="/empezar" element={<Empezar />} />
              <Route path="/segunda-opinion" element={<SegundaOpinion />} />
              <Route path="/gracias" element={<Gracias />} />
              
              {/* Auth & Portals */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/portal-paciente" element={<PortalPaciente />} />
              <Route path="/portal-profesional" element={<PortalProfesional />} />
              
              {/* Servicios */}
              <Route path="/servicios/implantes" element={<Implantes />} />
              <Route path="/servicios/ortodoncia" element={<Ortodoncia />} />
              <Route path="/servicios/estetica-dental" element={<EsteticaDental />} />
              <Route path="/servicios/prevencion" element={<Prevencion />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
