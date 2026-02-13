import { ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

/**
 * OptimizedImage - Componente de imagen con lazy loading y alt-text optimizado para SEO
 * Todas las imágenes deben usar este componente para garantizar Fluidez Premium de carga
 */
const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ className, alt, loading = "lazy", decoding = "async", ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={cn("", className)}
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };
