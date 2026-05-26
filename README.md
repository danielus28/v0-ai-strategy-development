# Observatorio de Gobernanza de IA en América Latina — Aethos AI

> [!NOTE]  
> Este proyecto es una iniciativa de desarrollo abierto y de autoría del **Equipo de Aethos AI** (operando regionalmente desde Chile y México). Actúa como un puente técnico-estratégico para articular la participación normativa, proveer evidencia regional y facilitar la implementación demostrable de gobernanza de Inteligencia Artificial en América Latina y el Caribe.

[![Desplegado en Vercel](https://img.shields.io/badge/Desplegado%20en-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-ai-strategy-development.vercel.app/)
[![Hecho con v0](https://img.shields.io/badge/Diseñado%20con-v0.app-black?style=for-the-badge)](https://v0.app)
[![Tecnologías](https://img.shields.io/badge/Stack-Next.js%20%7C%20React%20%7C%20TailwindCSS%20%7C%20TypeScript-blue?style=for-the-badge)](#pila-tecnológica)

El observatorio recopila, estructura y expone visualmente el punto de partida de los países de América Latina ante la IA, facilitando la colaboración y permitiendo a los tomadores de decisiones diseñar una ruta común de gobernanza.

---

## 📂 Estructura del Repositorio

El proyecto sigue una arquitectura moderna basada en **Next.js (App Router)** y **Tailwind CSS**. A continuación se detalla la composición y propósito de cada directorio clave dentro del repositorio:

```yaml
├── app/                   # Enrutamiento y páginas principales del sitio (Next.js App Router)
│   ├── layout.tsx         # Configuración del diseño base global, metadatos SEO y Viewport
│   ├── globals.css        # Carga de directivas de Tailwind CSS, fuentes y variables de color
│   ├── page.tsx           # Página de inicio del Observatorio (Dashboard interactivo principal)
│   ├── metodologia/       # Sección detallada sobre la metodología y fuentes de datos
│   │   └── page.tsx       # Vista pública de fuentes de verdad, alcances y limitaciones declaradas
│   ├── sitemap.ts         # Generador de mapas del sitio dinámicos para optimización SEO
│   └── robots.ts          # Configuración de rastreo e indexación para buscadores
│
├── components/            # Componentes visuales y módulos de la interfaz de usuario
│   ├── ui/                # Componentes atómicos y reutilizables (botones, tooltips, efectos tipográficos)
│   │   ├── button.tsx
│   │   ├── tooltip.tsx
│   │   └── typewriter-effect.tsx
│   ├── navigation.tsx     # Barra de navegación superior responsiva y lockup de marca
│   ├── hero-section.tsx   # Banner principal animado de bienvenida y estadísticas de resumen
│   ├── iso-membership-section.tsx # Visualización de participación técnica de LATAM en comités ISO
│   ├── latam-map.tsx      # Lógica de renderizado del mapa dinámico e interactivo
│   ├── latam-map-section-new.tsx # Sección principal del mapa regional interactivo con capas de datos
│   ├── capacity-section.tsx # Sección comparativa de dimensiones clave en capacidad institucional de IA
│   ├── methodology-teaser.tsx   # Avance persuasivo con enlace hacia la metodología completa
│   ├── methodology-section.tsx  # Desglose de principios de reproducibilidad y tabla de fuentes
│   ├── support-section.tsx     # Bloque interactivo para apoyo e integración de investigadores
│   ├── footer.tsx         # Pie de página con copyright, procedencia y enlaces informativos
│   └── aethos-logo.tsx    # Logotipo vectorial SVG de Aethos AI
│
├── lib/                   # Lógica de negocio, utilidades y bases de datos locales
│   ├── data.ts            # Base de datos local con perfiles de países, scores, capas y metadata descriptiva
│   ├── latam-map-data.ts  # Coordenadas, geometría y metadatos específicos del mapa interactivo SVG
│   └── utils.ts           # Funciones de utilidad común (combinación dinámica de clases con `cn`)
│
├── public/                # Recursos estáticos servidos de forma directa
│   ├── latam-map.svg      # Mapa SVG vectorial base que representa a los países de América Latina
│   └── (iconos)           # Isotipos y logotipos para navegadores y dispositivos (favicon, apple-icon, etc.)
│
├── COPY.md                # Documento vivo de referencia y copywritting editable del sitio
└── package.json           # Declaración de scripts de ejecución, compilación y dependencias
```

> [!NOTE]  
> Las carpetas y archivos de configuración personal (como notas del equipo y bases de conocimiento locales bajo `Obsidian-1/` o similares) se encuentran excluidos mediante el archivo `.gitignore` para mantener un código fuente limpio y enfocado exclusivamente en la aplicación.

---

## 🛠️ Pila Tecnológica

El Observatorio está construido sobre cimientos modernos de desarrollo web front-end para garantizar interactividad fluida, accesibilidad y tiempos de carga óptimos:

*   **Framework Principal**: [Next.js 15+](https://nextjs.org/) con **React 19** y soporte nativo para renderizado en servidor (SSR) y optimización estática.
*   **Lenguaje de Programación**: [TypeScript](https://www.typescriptlang.org/) para un desarrollo robusto y tipado estático seguro.
*   **Diseño y Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) para una estilización rápida y responsiva mediante utilidades y diseño moderno.
*   **Animaciones**: [Motion](https://motion.dev/) (anteriormente Framer Motion) para transiciones y micro-interacciones suaves y profesionales.
*   **Iconografía**: [Lucide React](https://lucide.dev/) para iconos vectoriales consistentes y ligeros.
*   **Primitivas UI**: [Radix UI](https://www.radix-ui.com/) para garantizar accesibilidad (a11y) nativa en tooltips, menús y diálogos.

---

## ⚙️ Desarrollo Local

Para correr este proyecto en tu entorno local, asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y tu gestor de paquetes favorito (`pnpm`, `npm` o `yarn`).

### 1. Clonar el repositorio
```bash
git clone https://github.com/danielus28/v0-ai-strategy-development.git
cd v0-ai-strategy-development
```

### 2. Instalar dependencias
Se recomienda utilizar `pnpm` por su rapidez y compatibilidad con el archivo de bloqueo existente:
```bash
pnpm install
# O en su defecto
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
pnpm dev
# O en su defecto
npm run dev
```

Abre tu navegador e ingresa a [http://localhost:3000](http://localhost:3000) para ver la aplicación ejecutándose en tiempo real.

### 4. Compilación para Producción
Para validar que todo compile correctamente o preparar la versión optimizada para distribución:
```bash
pnpm build
# O en su defecto
npm run build
```

---

## 📋 Metodología e Indicadores Monitoreados

El observatorio evalúa a los países a través de **6 capas de datos independientes** basadas íntegramente en fuentes públicas y auditables:

1.  **Voz en Estándares ISO/IEC (2024)**: Mapeo de membresías técnico-normativas en subcomités clave como el *ISO/IEC JTC 1/SC 42* (Inteligencia Artificial).
2.  **Gobierno Digital / UN EGDI (2024)**: Índice de Desarrollo de Gobierno Electrónico de las Naciones Unidas.
3.  **Capacidad de Ciberseguridad / ITU GCI (2024)**: Índice de Ciberseguridad de la Unión Internacional de Telecomunicaciones.
4.  **Preparación Gubernamental para IA / Oxford GARI (2023)**: Índice que evalúa qué tan preparado está el sector público para implementar herramientas de inteligencia artificial.
5.  **Gobernanza de IA / CEPAL ILIA (2025)**: Evaluaciones preliminares derivadas del Índice Latinoamericano de Inteligencia Artificial.
6.  **Políticas de IA / OECD.AI (2024)**: Instrumentos de política pública y estrategias nacionales declaradas ante el observatorio de la OCDE.

Para conocer en detalle los límites de los datos, unidades y cómo reportar discrepancias, por favor visita la sección pública del sitio o lee la página de [/metodologia](https://v0-ai-strategy-development.vercel.app/metodologia).

---

## 🤝 Contacto y Trabajo Abierto

El código de este observatorio es completamente abierto. Invitamos a investigadores, ingenieros y hacedores de políticas públicas a participar:

*   **Contacto directo**: [contacto@aethosai.org](mailto:contacto@aethosai.org)
*   **Reportar errores o proponer mejoras**: Crea un *Issue* o envía un *Pull Request* en este repositorio.
*   **Autoría**: © 2026 **Aethos AI**. Todos los derechos reservados. Operación regional coordinada desde Chile y México.