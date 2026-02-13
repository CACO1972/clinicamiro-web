import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileImage, 
  X, 
  CheckCircle2, 
  ArrowLeft, 
  Send,
  Loader2,
  AlertCircle,
  Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ARANCELES, DENTALINK_URL, getWhatsAppURL } from "@/lib/constants";
import { formatPrecioCLP } from "@/lib/diagnostico-engine";
import { trackFormSubmit, trackBeginSchedule, trackBeginWhatsApp } from "@/lib/ga4";

interface FormularioRXProps {
  onBack: () => void;
  onSuccess: () => void;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  edad: string;
  motivoConsulta: string;
  aceptaTerminos: boolean;
}

const FormularioRX = ({ onBack, onSuccess }: FormularioRXProps) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
    motivoConsulta: "",
    aceptaTerminos: false
  });
  const [radiografias, setRadiografias] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'radiografias', string>>>({});

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
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 20 * 1024 * 1024; // 20MB max para RX
      return isImage && isValidSize;
    });

    if (validFiles.length > 0) {
      const newFiles = [...radiografias, ...validFiles].slice(0, 10);
      setRadiografias(newFiles);

      // Generate previews
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => [...prev, e.target?.result as string].slice(0, 10));
        };
        reader.readAsDataURL(file);
      });

      if (errors.radiografias) {
        setErrors(prev => ({ ...prev, radiografias: undefined }));
      }
    }
  }, [radiografias, errors.radiografias]);

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
    setRadiografias(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData | 'radiografias', string>> = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (radiografias.length === 0) newErrors.radiografias = "Debes subir al menos una radiografía";
    if (!formData.aceptaTerminos) newErrors.aceptaTerminos = "Debes aceptar los términos";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setIsSubmitting(true);
    trackFormSubmit('rx', radiografias.length > 0);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2500));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  const handleAgendar = () => {
    trackBeginSchedule('segunda-opinion-rx');
    window.open(DENTALINK_URL, '_blank');
  };

  const handleWhatsApp = () => {
    trackBeginWhatsApp('segunda-opinion-rx');
    window.open(getWhatsAppURL('segunda-opinion-rx', 'Hola, acabo de enviar mis radiografías para una segunda opinión. ¿Cuándo pueden revisarlas?'), '_blank');
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
          ¡Radiografías Recibidas!
        </h2>
        <p className="text-muted-foreground mb-2">
          Nuestros especialistas analizarán tus imágenes.
        </p>
        <p className="text-gold text-sm mb-8">
          Te contactaremos con nuestra opinión en menos de 48 horas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={handleAgendar}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-charcoal font-semibold rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agendar Evaluación Presencial
          </motion.button>
          <motion.button
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-green-500/50 text-green-400 rounded-xl"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Consultar por WhatsApp
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
          <h2 className="font-serif text-2xl text-white">Segunda Opinión con RX</h2>
          <p className="text-sm text-muted-foreground">
            Evaluamos tu caso con tus radiografías existentes
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
            <p className="text-sm text-white/60">Análisis remoto de radiografías</p>
          </div>
          <p className="text-gold text-xl font-bold">
            {formatPrecioCLP(ARANCELES.segundaOpinion.precio)}
          </p>
        </div>
      </motion.div>

      {/* File Upload - Mandatory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white/80 flex items-center gap-2">
            <FileImage className="w-4 h-4 text-gold" />
            Radiografías *
          </Label>
          <span className="text-xs text-muted-foreground">{radiografias.length}/10</span>
        </div>
        
        <motion.div
          className={`
            relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
            ${isDragging 
              ? 'border-gold bg-gold/10' 
              : errors.radiografias
                ? 'border-red-500/50 bg-red-500/5'
                : 'border-border/40 hover:border-border/60 bg-charcoal/20'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-gold' : 'text-muted-foreground'}`} />
            <p className="text-white/80 font-medium">
              Sube tus radiografías dentales
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Panorámicas, periapicales, TAC dental
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              JPG, PNG o DICOM • Máximo 20MB por imagen • Hasta 10 archivos
            </p>
          </div>
        </motion.div>

        {errors.radiografias && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.radiografias}</span>
          </div>
        )}

        {/* Previews grid */}
        <AnimatePresence>
          {previews.length > 0 && (
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-5 gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {previews.map((preview, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-charcoal/50 group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <img
                    src={preview}
                    alt={`RX ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Form fields */}
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
          <Label htmlFor="edad" className="text-white/80">Edad</Label>
          <Input
            id="edad"
            type="number"
            value={formData.edad}
            onChange={(e) => updateField("edad", e.target.value)}
            placeholder="Ej: 35"
            className="bg-charcoal/50 border-border/40"
          />
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
      </div>

      {/* Motivo consulta */}
      <div className="space-y-2">
        <Label htmlFor="motivoConsulta" className="text-white/80">
          ¿Qué diagnóstico te dieron o qué tratamiento te propusieron?
        </Label>
        <Textarea
          id="motivoConsulta"
          value={formData.motivoConsulta}
          onChange={(e) => updateField("motivoConsulta", e.target.value)}
          placeholder="Cuéntanos sobre el diagnóstico que recibiste y qué dudas tienes..."
          className="bg-charcoal/50 border-border/40 min-h-[100px]"
        />
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-white/70">
          <p className="mb-1">
            <strong>Importante:</strong> La opinión se basa en las imágenes proporcionadas.
          </p>
          <p>
            Para un diagnóstico definitivo, puede ser necesaria una evaluación clínica presencial.
          </p>
        </div>
      </div>

      {/* Terms checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox
          checked={formData.aceptaTerminos}
          onCheckedChange={(checked) => updateField("aceptaTerminos", checked as boolean)}
          className="mt-1 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
        />
        <span className="text-sm text-white/70">
          Acepto que mis radiografías sean revisadas por el equipo de Clínica Miró para fines de diagnóstico. 
          Entiendo que esta es una opinión profesional basada en imágenes y no reemplaza una evaluación clínica completa.
        </span>
      </label>
      {errors.aceptaTerminos && (
        <p className="text-red-400 text-xs">{errors.aceptaTerminos}</p>
      )}

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
            <span>Enviando radiografías...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Solicitar Segunda Opinión</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FormularioRX;
