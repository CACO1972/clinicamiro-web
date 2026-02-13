# Clínica Miró - Odontología Predictiva

Sistema web de gestión de pacientes y diagnóstico asistido por IA para Clínica Miró, Santiago de Chile.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/carlos-s-projects-27483619/v0-clinicamiroproductioncompleto)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/QWkth3Df5wZ)

## Características Principales

- **Wizard de Diagnóstico IA**: Sistema de 6 pasos que guía al paciente desde el motivo de consulta hasta la recomendación de tratamiento
- **4 Programas Exclusivos Miró**:
  - Implant One (Implantes en un día)
  - Revive FACE.SMILE™ (Análisis biométrico con IA)
  - ALIGN (Ortodoncia inteligente)
  - ZERO CARIES (Prevención regenerativa)
- **Segunda Opinión Digital**: Revisión de presupuestos y radiografías
- **Portal del Paciente**: Acceso a historial, citas y documentos
- **Analytics GA4**: Tracking completo del funnel de conversión
- **Responsive Design**: Optimizado para mobile, tablet y desktop

## Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel
- **3D Graphics**: Three.js + @react-three/fiber

## Instalación y Desarrollo

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/clinica-miro-production.git
cd clinica-miro-production

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar variables en .env
# VITE_GA4_MEASUREMENT_ID=tu-id-de-ga4
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:8080

# Build
npm run build        # Compila para producción

# Preview
npm run preview      # Vista previa de build de producción

# Lint
npm run lint         # Ejecuta ESLint
```

## Configuración de Producción

### Variables de Entorno Requeridas

Agregar en Vercel o en archivo `.env`:

```env
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Configuración de GA4

1. Crear propiedad GA4 en Google Analytics
2. Obtener el Measurement ID (formato: G-XXXXXXXXXX)
3. Agregar el ID a las variables de entorno
4. El tracking se inicializa automáticamente al cargar la app

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── wizard/         # Pasos del wizard de diagnóstico
│   ├── segundaopinion/ # Formularios de segunda opinión
│   ├── testimonios/    # Sistema de testimonios en video
│   └── ui/            # Componentes UI de shadcn
├── pages/              # Páginas principales
│   ├── Index.tsx       # Landing page
│   ├── Empezar.tsx     # Wizard completo
│   ├── SegundaOpinion.tsx
│   └── servicios/      # Páginas de servicios
├── lib/                # Utilidades y lógica
│   ├── ga4.ts          # Sistema de analytics
│   ├── diagnostico-engine.ts  # Motor de diagnóstico IA
│   ├── constants.ts    # Constantes globales
│   └── utils.ts        # Utilidades generales
└── types/              # Definiciones TypeScript
```

## Funcionalidades Clave

### Motor de Diagnóstico IA

El sistema analiza:
- Motivo de consulta del paciente
- Síntomas seleccionados
- Nivel de urgencia
- Imágenes subidas (opcional)

Y genera:
- Recomendación de programa específico
- Estimación de inversión
- Tags de diagnóstico
- Nivel de confianza del análisis

### Sistema de Analytics

Eventos rastreados:
- Entrada por cada flujo (nuevo, opinión, portal)
- Progreso en wizard (6 pasos)
- Conversiones (agendar, WhatsApp)
- Descargas de lead magnets
- Visualizaciones de testimonios

### Accesibilidad

- Navegación por teclado completa
- ARIA labels en todos los componentes interactivos
- Skip links para lectores de pantalla
- Contraste WCAG AA compliant
- Focus indicators visibles

## SEO

- Meta tags completos (Open Graph, Twitter Cards)
- Schema.org markup (MedicalClinic)
- Sitemap automático
- Canonical URLs
- Optimización de imágenes

## Optimización de Performance

- Lazy loading de páginas
- Code splitting automático
- React.memo en componentes pesados
- Debounce/throttle en eventos
- Error boundaries
- Suspense para carga progresiva

## Seguridad

- Variables de entorno para datos sensibles
- Validación de formularios
- Sanitización de inputs
- Headers de seguridad en Vercel

## Contribuir

Este proyecto está en desarrollo activo. Para cambios mayores:

1. Fork el repositorio
2. Crea una rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Propiedad de Clínica Miró. Todos los derechos reservados.

## Contacto

**Clínica Miró**
- Web: https://clinicamiro.cl
- WhatsApp: +56 9 3557 2986
- Email: contacto@clinicamiro.cl
- Dirección: Av. Presidente Kennedy 5454, Of. 1203, Las Condes, Santiago

---

**Built with ❤️ using v0.app**
