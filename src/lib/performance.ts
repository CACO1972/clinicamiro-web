// Performance monitoring utilities

export const measurePerformance = (metricName: string, startMark: string, endMark: string) => {
  if (typeof window === "undefined" || !window.performance) return

  try {
    window.performance.measure(metricName, startMark, endMark)
    const measure = window.performance.getEntriesByName(metricName)[0]

    if (import.meta.env.DEV) {
      console.log(`[Performance] ${metricName}: ${measure.duration.toFixed(2)}ms`)
    }

    // Send to analytics
    if (window.gtag) {
      window.gtag("event", "timing_complete", {
        name: metricName,
        value: Math.round(measure.duration),
        event_category: "Performance",
      })
    }

    // Cleanup
    window.performance.clearMarks(startMark)
    window.performance.clearMarks(endMark)
    window.performance.clearMeasures(metricName)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[Performance] Failed to measure ${metricName}:`, error)
    }
  }
}

export const markPerformance = (markName: string) => {
  if (typeof window === "undefined" || !window.performance) return
  window.performance.mark(markName)
}

// Web Vitals tracking
export const reportWebVitals = (metric: { name: string; value: number; id: string }) => {
  if (window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    })
  }

  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value)
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
