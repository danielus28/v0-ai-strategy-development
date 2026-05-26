# Plan — Integración de la sección "¿Cómo nos puedes apoyar?" en la landing page

Este plan detalla los aspectos estratégicos, de diseño, de copy y de código técnico para incorporar la nueva sección **"¿Cómo nos puedes apoyar?"** en la landing page del **Observatorio Aethos AI**. 

El objetivo principal es generar un "hook" de alto impacto en la landing page que dirija a los usuarios hacia el subdominio unificado **`apoyo.aethosai.org`**, donde experimentarán un flujo gamificado y guiado por un asistente de Inteligencia Artificial (similar a la experiencia en `https://risk.aethosai.org/`), el cual les orientará de forma dinámica sobre cómo sumarse.

El plan canaliza el interés de la comunidad hacia dos pilares de apoyo fundamentales:
1. **Aporte de tiempo y talento (Voluntariado técnico):** Articulado con la búsqueda de investigadores y el perfil de *Analista de datos* (`SOLICITUD_ANALISTA.md`), canalizado a través del embudo interactivo en `/donaciones/voluntarios`.
2. **Aporte financiero (Donaciones):** Enfocado en la sostenibilidad e independencia del observatorio, canalizado a través de `/donaciones`.

---

## 1. Diseño Visual y UX (Premium Aesthetics)

Para mantener la estética minimalista, limpia e institucional de Aethos AI, la sección se ubicará en la página de inicio justo **antes del Footer** y **después de la Metodología**, actuando como el gran bloque de cierre (CTA final). Esto permite cerrar la experiencia de navegación con una invitación a la acción clara una vez que el usuario ha comprendido el valor del mapa y su metodología.

### Elementos de diseño recomendados:
*   **Grid de 3 Columnas (Tarjetas):** Una distribución equilibrada para las tres vías principales de apoyo (Aporte Financiero, Talento Técnico, Comunidad/Difusión).
*   **Diseño Conectado al Funnel Gamificado:** Cada botón actúa como puerta de entrada a las rutas específicas del asistente conversacional de IA en `apoyo.aethosai.org`.
*   **Glassmorphism & Contrast:** Uso de fondos `bg-card` con bordes sutiles `border-border` sobre el fondo general cálido (`bg-background`).
*   **Acento Oro/Ámbar (`#c9a227`):** Destacar la opción de apoyo principal (donaciones) usando el color insignia del observatorio en su borde y su botón principal.
*   **Animaciones Fluidas:** Micro-interacciones de hover que eleven ligeramente las tarjetas (`hover:-translate-y-1.5 transition-all duration-300`) y entrada animada mediante `motion/react`.
*   **Iconografía Semántica:** Iconos premium de `lucide-react` (`Heart`, `Users` y `Share2`) con estilo uniforme y toques dorados.

---

## 2. Propuesta de Contenido (Copy)

Este bloque se integrará en el archivo de control `Obsidian-1/COPY.md` bajo una nueva sección:

```markdown
## 6.5. ¿Cómo nos puedes apoyar?
`components/support-section.tsx`

- **Eyebrow**: Comunidad e Impacto
- **Headline**: ¿Cómo nos puedes apoyar?
- **Subtítulo**: El Observatorio es una iniciativa independiente y de código abierto. Tú puedes ser parte activa del esfuerzo para mapear y fortalecer la gobernanza de la IA en América Latina.

### Tarjetas de Apoyo:
1. **Apoyo Económico**
   - **Título**: Aporte Financiero
   - **Descripción**: Ayúdanos a financiar los costos de infraestructura, servidores y la mantención del observatorio libre de intereses corporativos.
   - **CTA**: Donar ahora (Redirige a https://apoyo.aethosai.org/donaciones)

2. **Apoyo Técnico**
   - **Título**: Tiempo y Talento
   - **Descripción**: Súmate como analista de datos, investigador/a o desarrollador/a voluntario/a. Nuestro asistente inteligente te guiará para integrarte al equipo técnico.
   - **CTA**: Aplicar como voluntario (Redirige a https://apoyo.aethosai.org/donaciones/voluntarios)

3. **Difusión y Alianzas**
   - **Título**: Comparte e Integra
   - **Descripción**: Utiliza nuestros datos en tus investigaciones, papers u organizaciones. Cítanos y comparte la plataforma para ampliar su impacto regional.
   - **CTA**: Ver Repositorio (Redirige a GitHub)
```

---

## 3. Implementación Técnica

### Paso 1: Crear el componente de React `components/support-section.tsx`

El componente se ha actualizado para apuntar directamente a las rutas correctas del nuevo subdominio interactivo y gamificado (`/donaciones` y `/donaciones/voluntarios`), eliminando los antiguos enlaces de correo.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Heart, Users, Share2, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

const SUPPORT_CHANNELS = [
  {
    id: "donaciones",
    icon: Heart,
    title: "Aporte Financiero",
    description: "Ayúdanos a financiar los costos de infraestructura, servidores y la mantención del observatorio libre de intereses corporativos y comerciales.",
    ctaText: "Donar ahora",
    ctaHref: "https://apoyo.aethosai.org/donaciones",
    isPrimary: true,
  },
  {
    id: "voluntariado",
    icon: Users,
    title: "Tiempo y Talento",
    description: "Súmate como analista de datos, investigador/a o desarrollador/a voluntario/a. Nuestro asistente inteligente te guiará para integrarte a las mesas de trabajo.",
    ctaText: "Postular como voluntario",
    ctaHref: "https://apoyo.aethosai.org/donaciones/voluntarios",
    isPrimary: false,
  },
  {
    id: "difusion",
    icon: Share2,
    title: "Comparte e Integra",
    description: "Utiliza nuestros datos en tus investigaciones, reportes o papers. Comparte la plataforma y ayúdanos a visibilizar la voz de LATAM.",
    ctaText: "Ver repositorio",
    ctaHref: "https://github.com/danielus28/v0-ai-strategy-development",
    isPrimary: false,
  },
]

export function SupportSection() {
  return (
    <section className="py-24 px-6 bg-background scroll-mt-24" id="apoyar">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-xs uppercase tracking-wide mb-4"
          >
            Comunidad e Impacto
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-balance tracking-tight"
          >
            ¿Cómo nos puedes apoyar?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            El Observatorio Aethos AI es una plataforma independiente y abierta. Tú puedes ser parte activa del esfuerzo por nivelar la cancha en la gobernanza de la IA en América Latina.
          </motion.p>
        </div>

        {/* Tarjetas de Canales */}
        <div className="grid md:grid-cols-3 gap-8">
          {SUPPORT_CHANNELS.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col justify-between p-8 rounded-xl border transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-md ${
                  channel.isPrimary
                    ? "border-accent bg-card shadow-[0_0_0_1px_rgba(201,162,39,0.1)]"
                    : "border-border bg-card/60 hover:bg-card hover:border-muted-foreground/30"
                }`}
              >
                {channel.isPrimary && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-2.5 py-0.5 bg-accent text-accent-foreground font-mono text-[10px] uppercase font-semibold tracking-wider rounded-sm">
                    Recomendado
                  </div>
                )}

                <div>
                  {/* Icono */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${
                    channel.isPrimary ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                  }`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  {/* Textos */}
                  <h3 className="font-heading text-xl font-semibold mb-3 tracking-tight">
                    {channel.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    {channel.description}
                  </p>
                </div>

                {/* Botón de Acción */}
                <Button
                  asChild
                  variant={channel.isPrimary ? "default" : "outline"}
                  className={`w-full font-medium gap-2 ${
                    channel.isPrimary 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground border-transparent"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  }`}
                >
                  <a href={channel.ctaHref} target="_blank" rel="noopener noreferrer">
                    {channel.ctaText}
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
```

### Paso 2: Integrar el componente en la página principal (`app/page.tsx`)

Modificar el archivo `app/page.tsx` para importar y renderizar la nueva sección:

```diff
  import { CapacitySection } from "@/components/capacity-section"
  import { MethodologyTeaser } from "@/components/methodology-teaser"
+ import { SupportSection } from "@/components/support-section"
  import { Footer } from "@/components/footer"
  
  export default function ObservatorioPage() {
    return (
      <main className="min-h-screen">
        <Navigation />
        <HeroSection />
        <IsoMembershipSection />
        <LatamMapSection />
        <CapacitySection />
        <MethodologyTeaser />
+       <SupportSection />
        <Footer />
      </main>
    )
  }
```

### Paso 3: Ajustes de navegación (`components/navigation.tsx` y `components/footer.tsx`)

*   **Header Link:** Mantener el botón del extremo superior derecho que dice **"Apoyar"**, pero actualizar su enlace para apuntar a la landing de donaciones interactiva: `https://apoyo.aethosai.org/donaciones`.
*   **Mobile Navigation:** Se puede agregar un enlace adicional en el footer o en el menú de navegación que salte en scroll-smooth al ancla `#apoyar`.
*   **Footer Link:** Agregar el ancla en la columna de enlaces rápidos en el footer (`components/footer.tsx`):
    ```diff
    - Metodología → `#metodologia`
    + Cómo apoyar → `#apoyar`
    ```

---

## 4. Plan de Pruebas y Validación (QA)

Una vez implementada esta sección, se ejecutarán las siguientes verificaciones:

1.  **Validación de Responsive Design:** Comprobación visual de que la grilla colapse correctamente de 3 columnas a 1 columna en pantallas móviles (Safari/Chrome en iOS/Android) sin desbordamientos de texto.
2.  **Verificación de Enlaces del Embudo (Funnel):** Probar que todos los enlaces apunten exactamente a sus destinos correspondientes (`/donaciones` y `/donaciones/voluntarios`) abriendo en pestañas nuevas (`target="_blank"`) y de forma segura.
3.  **Accesibilidad (a11y):** Asegurar que las tarjetas e iconos tengan las etiquetas `aria-hidden` y contrastes de color correctos según estándares WCAG AA.
