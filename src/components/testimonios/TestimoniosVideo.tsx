import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIOS } from "@/lib/constants";
import { trackTestimonioView } from "@/lib/ga4";

interface TestimoniosVideoProps {
  className?: string;
}

const TestimoniosVideo = ({ className = "" }: TestimoniosVideoProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlayVideo = (testimonioId: string, videoUrl: string) => {
    trackTestimonioView(testimonioId);
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIOS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIOS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold text-sm font-medium">Testimonios Reales</span>
          </motion.div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Historias que <span className="text-gradient-gold">Transforman</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conoce las experiencias de pacientes que confiaron en nosotros
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Video Thumbnail */}
            <div className="relative group">
              <div 
                className="relative aspect-video rounded-2xl overflow-hidden bg-charcoal cursor-pointer"
                onClick={() => handlePlayVideo(
                  TESTIMONIOS[currentIndex].id, 
                  TESTIMONIOS[currentIndex].videoUrl
                )}
              >
                {/* Placeholder gradient - replace with real thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center group-hover:bg-gold transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-charcoal ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Treatment badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                  <span className="text-white text-sm font-medium">
                    {TESTIMONIOS[currentIndex].tratamiento}
                  </span>
                </div>

                {/* Gradient overlay for better text visibility */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="relative">
              <Quote className="w-12 h-12 text-gold/20 absolute -top-6 -left-2" />
              
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-white text-xl md:text-2xl font-serif italic leading-relaxed mb-6 relative z-10">
                  "{TESTIMONIOS[currentIndex].cita}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                    <span className="text-gold font-bold text-lg">
                      {TESTIMONIOS[currentIndex].nombre.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {TESTIMONIOS[currentIndex].nombre}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Paciente {TESTIMONIOS[currentIndex].tratamiento}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIOS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-gold w-8' 
                      : 'bg-gold/30 hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Mini testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {TESTIMONIOS.map((testimonio, index) => (
            <motion.button
              key={testimonio.id}
              onClick={() => setCurrentIndex(index)}
              className={`p-5 rounded-xl text-left transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gold/10 border border-gold/40'
                  : 'bg-charcoal/30 border border-border/20 hover:border-border/40'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <span className="text-gold font-bold">
                    {testimonio.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonio.nombre}</p>
                  <p className="text-gold/70 text-xs">{testimonio.tratamiento}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm line-clamp-2">
                "{testimonio.cita}"
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90"
              onClick={handleCloseVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Video container */}
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />

              {/* Close button */}
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimoniosVideo;
