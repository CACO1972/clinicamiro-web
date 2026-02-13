import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  ArrowLeft, 
  Send,
  Loader2,
  Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ARANCELES, DENTALINK_URL, getWhatsAppURL } from "@/lib/constants";
import { formatPrecioCLP } from "@/lib/diagnostico-engine";
import { trackFormSubmit, trackBeginSchedule, trackBeginWhatsApp } from "@/lib/ga4";

interface FormularioPresupuestoProps {
  onBack: () => void;
  onSuccess: () => void;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  clinicaOrigen: string;
  montoPresupuesto: string;
  comentarios: string;
}

const FormularioPresupuesto = ({ onBack, onSuccess }: FormularioPresupuestoProps) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    clinicaOrigen: "",
    montoPresupuesto: "",
    comentarios: ""
  });
  const [archivos, setArchivos] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => {
      const isPDF = file.type === 'application/pdf';
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 15 * 1024 * 1024; // 15MB max
      return (isPDF || isImage) && isValidSize;
    });

    if (validFiles.length > 0) {
      setArchivos(prev => [...prev, ...validFiles].slice(0, 5));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeFile = (index: number) => {
    setArchivos(prev => prev.filter((_, i) => i !== index));
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    trackFormSubmit('presupuesto', archivos.length > 0);

    // Simular envío (aquí iría la integración real con Supabase/backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  const handleAgendar = () => {
    trackBeginSchedule('segunda-opinion-presupuesto');
    window.open(DENTALINK_URL, '_blank');
  };

  const handleWhatsApp = () => {
    trackBeginWhatsApp('segunda-opinion-presupuesto');
    window.open(getWhatsAppURL('segunda-opinion', 'Hola, quiero una segunda opinión sobre mi presupuesto dental.'), '_blank');
  };

  if (showSuccess) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </motion.div>
        <h2 className="font-serif text-2xl text-white mb-3">
          ¡Solicitud Recibida!
        </h2>
        <p className="text-muted-foreground mb-8">
          Nuestro equipo revisará tu presupuesto y te contactará en menos de 24 horas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={handleAgendar}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-charcoal font-semibold rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agendar Evaluación
          </motion.button>
          <motion.button
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-green-500/50 text-green-400 rounded-xl"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            WhatsApp
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-charcoal/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h2 className="font-serif text-2xl text-white">Comparar Presupuesto</h2>
          <p className="text-sm text-muted-foreground">
            Sube tu presupuesto y te daremos una valoración detallada
          </p>
        </div>
      </div>

      {/* Precio referencial */}
      <motion.div
        className="bg-gold/10 border border-gold/30 rounded-xl p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{ARANCELES.segundaOpinion.nombre}</p>
            <p className="text-sm text-white/60">{ARANCELES.segundaOpinion.descripcion}</p>
          </div>
          <p className="text-gold text-xl font-bold">
            {formatPrecioCLP(ARANCELES.segundaOpinion.precio)}
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-white/80">Nombre completo *</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            placeholder="Tu nombre"
            className={`bg-charcoal/50 border-border/40 ${errors.nombre ? 'border-red-500' : ''}`}
          />
          {errors.nombre && <p className="text-red-400 text-xs">{errors.nombre}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="tu@email.com"
            className={`bg-charcoal/50 border-border/40 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono" className="text-white/80">Teléfono *</Label>
          <Input
            id="telefono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => updateField("telefono", e.target.value)}
            placeholder="+56 9 1234 5678"
            className={`bg-charcoal/50 border-border/40 ${errors.telefono ? 'border-red-500' : ''}`}
          />
          {errors.telefono && <p className="text-red-400 text-xs">{errors.telefono}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinicaOrigen" className="text-white/80">Clínica del presupuesto</Label>
          <Input
            id="clinicaOrigen"
            value={formData.clinicaOrigen}
            onChange={(e) => updateField("clinicaOrigen", e.target.value)}
            placeholder="Nombre de la clínica (opcional)"
            className="bg-charcoal/50 border-border/40"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="montoPresupuesto" className="text-white/80">Monto del presupuesto</Label>
          <Input
            id="montoPresupuesto"
            value={formData.montoPresupuesto}
            onChange={(e) => updateField("montoPresupuesto", e.target.value)}
            placeholder="Ej: $1.500.000 (opcional)"
            className="bg-charcoal/50 border-border/40"
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-3">
        <Label className="text-white/80">Adjuntar presupuesto</Label>
        <motion.div
          className={`
            relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer
            ${isDragging 
              ? 'border-gold bg-gold/10' 
              : 'border-border/40 hover:border-border/60 bg-charcoal/20'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,image/*"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-gold' : 'text-muted-foreground'}`} />
            <p className="text-white/80 text-sm">
              Arrastra archivos o haz clic para seleccionar
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              PDF o imágenes • Máximo 15MB • Hasta 5 archivos
            </p>
          </div>
        </motion.div>

        {/* Files list */}
        <AnimatePresence>
          {archivos.length > 0 && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {archivos.map((file, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-charcoal/30 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <FileText className="w-5 h-5 text-gold" />
                  <span className="text-white/80 text-sm flex-1 truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <Label htmlFor="comentarios" className="text-white/80">Comentarios adicionales</Label>
        <Textarea
          id="comentarios"
          value={formData.comentarios}
          onChange={(e) => updateField("comentarios", e.target.value)}
          placeholder="¿Hay algo específico que quieras que revisemos?"
          className="bg-charcoal/50 border-border/40 min-h-[100px]"
        />
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/70">
          Revisaremos tu presupuesto y te contactaremos con alternativas y nuestra valoración profesional en menos de 24 horas.
        </p>
      </div>

      {/* Submit button */}
      <motion.button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-charcoal font-semibold rounded-xl disabled:opacity-50"
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Enviar Solicitud</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FormularioPresupuesto;
