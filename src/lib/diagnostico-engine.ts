// Motor de Diagnóstico IA - Clínica Miró
// Genera route_key basado en síntomas para recomendar programa Exclusivo Miró

export type MotivoConsulta = 
  | 'dolor'
  | 'estetica'
  | 'implantes'
  | 'ortodoncia'
  | 'prevencion'
  | 'segunda-opinion'
  | 'otro';

export type Urgencia = 'inmediata' | 'esta-semana' | 'este-mes' | 'solo-consulta';

export interface SintomaOption {
  id: string;
  label: string;
  motivos: MotivoConsulta[];
  weight: number;
  tags: string[];
}

export const SINTOMAS: SintomaOption[] = [
  // Dolor
  { id: 'dolor-muela', label: 'Dolor de muela', motivos: ['dolor'], weight: 3, tags: ['urgencia', 'endodoncia'] },
  { id: 'dolor-encia', label: 'Dolor de encía', motivos: ['dolor', 'prevencion'], weight: 2, tags: ['periodontal'] },
  { id: 'sensibilidad', label: 'Sensibilidad al frío/calor', motivos: ['dolor', 'prevencion'], weight: 2, tags: ['caries', 'sensibilidad'] },
  { id: 'dolor-mandibula', label: 'Dolor de mandíbula', motivos: ['dolor', 'ortodoncia'], weight: 2, tags: ['atm', 'bruxismo'] },
  { id: 'inflamacion', label: 'Inflamación o hinchazón', motivos: ['dolor'], weight: 3, tags: ['urgencia', 'infeccion'] },
  
  // Estética
  { id: 'dientes-amarillos', label: 'Dientes amarillos/manchados', motivos: ['estetica'], weight: 1, tags: ['blanqueamiento'] },
  { id: 'dientes-chuecos', label: 'Dientes chuecos', motivos: ['estetica', 'ortodoncia'], weight: 2, tags: ['alineacion'] },
  { id: 'espacios', label: 'Espacios entre dientes', motivos: ['estetica', 'ortodoncia'], weight: 2, tags: ['diastema'] },
  { id: 'sonrisa-gingival', label: 'Mucha encía al sonreír', motivos: ['estetica'], weight: 1, tags: ['gummy-smile'] },
  { id: 'diente-roto', label: 'Diente roto o astillado', motivos: ['estetica', 'dolor'], weight: 2, tags: ['restauracion'] },
  { id: 'forma-dientes', label: 'No me gusta la forma de mis dientes', motivos: ['estetica'], weight: 1, tags: ['carillas'] },
  
  // Implantes
  { id: 'falta-diente', label: 'Me falta uno o más dientes', motivos: ['implantes'], weight: 3, tags: ['edentulismo'] },
  { id: 'protesis-incomoda', label: 'Prótesis incómoda', motivos: ['implantes'], weight: 2, tags: ['rehabilitacion'] },
  { id: 'diente-flojo', label: 'Diente muy flojo', motivos: ['implantes', 'prevencion'], weight: 3, tags: ['periodontal', 'extraccion'] },
  
  // Ortodoncia
  { id: 'mordida-mala', label: 'Mordida incorrecta', motivos: ['ortodoncia'], weight: 2, tags: ['maloclusion'] },
  { id: 'apretamiento', label: 'Aprieto los dientes', motivos: ['ortodoncia', 'dolor'], weight: 2, tags: ['bruxismo'] },
  
  // Prevención
  { id: 'sangrado-encias', label: 'Sangrado de encías', motivos: ['prevencion'], weight: 2, tags: ['periodontal', 'gingivitis'] },
  { id: 'mal-aliento', label: 'Mal aliento', motivos: ['prevencion'], weight: 1, tags: ['halitosis'] },
  { id: 'revision-general', label: 'Revisión general', motivos: ['prevencion'], weight: 1, tags: ['checkup'] },
  { id: 'limpieza', label: 'Necesito una limpieza', motivos: ['prevencion'], weight: 1, tags: ['profilaxis'] },
];

export interface ProgramaExclusivoMiro {
  id: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  url: string;
  keywords: string[];
}

export const PROGRAMAS_EXCLUSIVO_MIRO: ProgramaExclusivoMiro[] = [
  {
    id: 'implant-one',
    nombre: 'Implant One',
    tagline: 'Implantes en un día',
    descripcion: 'Diagnóstico, planificación y ejecución en un solo flujo. Carga inmediata cuando es viable.',
    url: '/servicios/implantes',
    keywords: ['implantes', 'edentulismo', 'extraccion', 'rehabilitacion', 'protesis']
  },
  {
    id: 'revive-face-smile',
    nombre: 'Revive FACE.SMILE™',
    tagline: 'Análisis Biométrico Dentofacial IA',
    descripcion: 'Diseño integral de rostro y sonrisa con inteligencia artificial.',
    url: '/servicios/estetica-dental',
    keywords: ['estetica', 'carillas', 'blanqueamiento', 'gummy-smile', 'restauracion', 'diastema']
  },
  {
    id: 'align',
    nombre: 'ALIGN',
    tagline: 'Ortodoncia Inteligente',
    descripcion: 'Alineadores u ortodoncia convencional según tu caso. Plan medible y personalizado.',
    url: '/servicios/ortodoncia',
    keywords: ['ortodoncia', 'alineacion', 'maloclusion', 'bruxismo', 'atm']
  },
  {
    id: 'zero-caries',
    nombre: 'ZERO CARIES',
    tagline: 'Prevención Regenerativa',
    descripcion: 'Detección temprana con IA y tratamiento regenerativo con Curodont.',
    url: '/servicios/prevencion',
    keywords: ['prevencion', 'caries', 'periodontal', 'gingivitis', 'halitosis', 'checkup', 'profilaxis', 'sensibilidad']
  }
];

export interface DiagnosticoResult {
  routeKey: string;
  programa: ProgramaExclusivoMiro;
  confidence: number;
  tags: string[];
  tagsCount: number;
  urgencia: Urgencia;
  recomendaciones: string[];
  precioEstimado: {
    min: number;
    max: number;
  };
}

// Motor de diagnóstico principal
export function generarDiagnostico(
  motivo: MotivoConsulta,
  sintomasIds: string[],
  urgencia: Urgencia,
  tieneFoto: boolean
): DiagnosticoResult {
  // Recolectar todos los tags de los síntomas seleccionados
  const sintomasSeleccionados = SINTOMAS.filter(s => sintomasIds.includes(s.id));
  const allTags = sintomasSeleccionados.flatMap(s => s.tags);
  const uniqueTags = [...new Set(allTags)];
  
  // Calcular scores para cada programa
  const scores = PROGRAMAS_EXCLUSIVO_MIRO.map(programa => {
    let score = 0;
    
    // Match por keywords
    uniqueTags.forEach(tag => {
      if (programa.keywords.includes(tag)) {
        score += 2;
      }
    });
    
    // Bonus por motivo directo
    if (motivo === 'implantes' && programa.id === 'implant-one') score += 5;
    if (motivo === 'estetica' && programa.id === 'revive-face-smile') score += 5;
    if (motivo === 'ortodoncia' && programa.id === 'align') score += 5;
    if (motivo === 'prevencion' && programa.id === 'zero-caries') score += 5;
    
    // Penalización/bonus por urgencia
    if (urgencia === 'inmediata' && programa.id === 'implant-one') score += 2;
    if (urgencia === 'solo-consulta' && programa.id === 'zero-caries') score += 2;
    
    return { programa, score };
  });
  
  // Ordenar por score y tomar el mejor
  scores.sort((a, b) => b.score - a.score);
  const bestMatch = scores[0];
  const totalPossibleScore = uniqueTags.length * 2 + 5 + 2;
  const confidence = Math.min(0.95, (bestMatch.score / Math.max(totalPossibleScore, 1)) + 0.3);
  
  // Generar recomendaciones
  const recomendaciones: string[] = [];
  
  if (urgencia === 'inmediata') {
    recomendaciones.push('Tu caso requiere atención prioritaria. Te contactaremos en las próximas horas.');
  }
  
  if (tieneFoto) {
    recomendaciones.push('Gracias por compartir imágenes. Nuestro equipo las revisará para un diagnóstico más preciso.');
  }
  
  if (allTags.includes('periodontal')) {
    recomendaciones.push('Detectamos indicadores periodontales. Una evaluación temprana puede prevenir complicaciones.');
  }
  
  if (allTags.includes('bruxismo')) {
    recomendaciones.push('El bruxismo puede causar desgaste dental. Evaluaremos opciones de protección.');
  }
  
  // Estimar precio según programa
  const precios: Record<string, { min: number; max: number }> = {
    'implant-one': { min: 890000, max: 2500000 },
    'revive-face-smile': { min: 450000, max: 3500000 },
    'align': { min: 1200000, max: 4500000 },
    'zero-caries': { min: 85000, max: 350000 }
  };
  
  return {
    routeKey: bestMatch.programa.id,
    programa: bestMatch.programa,
    confidence,
    tags: uniqueTags,
    tagsCount: uniqueTags.length,
    urgencia,
    recomendaciones,
    precioEstimado: precios[bestMatch.programa.id] || { min: 100000, max: 500000 }
  };
}

// Formatear precio chileno
export function formatPrecioCLP(precio: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(precio);
}

// Obtener síntomas filtrados por motivo
export function getSintomasPorMotivo(motivo: MotivoConsulta): SintomaOption[] {
  return SINTOMAS.filter(s => s.motivos.includes(motivo) || motivo === 'otro');
}

export default {
  SINTOMAS,
  PROGRAMAS_EXCLUSIVO_MIRO,
  generarDiagnostico,
  formatPrecioCLP,
  getSintomasPorMotivo
};
