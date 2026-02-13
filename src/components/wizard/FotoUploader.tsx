import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, Image as ImageIcon, CheckCircle } from "lucide-react";

interface FotoUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const FotoUploader = ({ files, onFilesChange }: FotoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB max
      return isImage && isValidSize;
    });

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles].slice(0, 5); // Max 5 files
      onFilesChange(updatedFiles);

      // Generate previews
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => [...prev, e.target?.result as string].slice(0, 5));
        };
        reader.readAsDataURL(file);
      });
    }
  }, [files, onFilesChange]);

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

  const removeFile = useCallback((index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }, [files, onFilesChange]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
          ¿Tienes fotos de tu caso?
        </h2>
        <p className="text-muted-foreground">
          Opcional: Las imágenes nos ayudan a darte un diagnóstico más preciso
        </p>
      </div>

      {/* Dropzone */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300
          ${isDragging 
            ? 'border-gold bg-gold/10' 
            : 'border-border/40 hover:border-border/60 bg-charcoal/20'
          }
          ${files.length >= 5 ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: files.length < 5 ? 1.01 : 1 }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={files.length >= 5}
        />

        <div className="text-center">
          <motion.div
            className={`
              inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
              ${isDragging ? 'bg-gold/20' : 'bg-charcoal/50'}
            `}
            animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
          >
            {isDragging ? (
              <Upload className="w-8 h-8 text-gold" />
            ) : (
              <Camera className="w-8 h-8 text-muted-foreground" />
            )}
          </motion.div>

          <p className="text-white font-medium mb-2">
            {isDragging ? 'Suelta las imágenes aquí' : 'Arrastra imágenes o haz clic para seleccionar'}
          </p>
          <p className="text-muted-foreground text-sm">
            JPG, PNG o HEIC • Máximo 10MB por imagen • Hasta 5 fotos
          </p>
        </div>
      </motion.div>

      {/* Previews */}
      <AnimatePresence mode="popLayout">
        {previews.length > 0 && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {previews.map((preview, index) => (
              <motion.div
                key={index}
                className="relative group aspect-square rounded-xl overflow-hidden bg-charcoal/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Number badge */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <div className="bg-charcoal/30 border border-border/30 rounded-xl p-5">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-gold" />
          Tips para mejores fotos
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Usa buena iluminación (luz natural es ideal)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Toma fotos de frente, perfil y sonriendo</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Si tienes radiografías, también puedes subirlas</span>
          </li>
        </ul>
      </div>

      {/* Skip option */}
      <motion.p
        className="text-center text-muted-foreground/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Este paso es opcional. Puedes continuar sin subir fotos.
      </motion.p>
    </div>
  );
};

export default FotoUploader;
