"use client"

import { Component, type ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ErrorInfo } from "@/types"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo)

    // Send to analytics if available
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertTriangle className="h-5 w-5" />
                <CardTitle>Algo salió mal</CardTitle>
              </div>
              <CardDescription>
                Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {import.meta.env.DEV && this.state.error && (
                <div className="p-3 bg-muted rounded-md text-xs font-mono overflow-auto max-h-32">
                  {this.state.error.message}
                </div>
              )}
              <Button onClick={this.handleReset} className="w-full">
                Recargar página
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
