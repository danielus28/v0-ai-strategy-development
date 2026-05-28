---
tags:
  - plan
  - subsitio
  - apoyo
  - donaciones
  - voluntariado
estado: propuesto
versión: 2
relacionado:
  - apoyar-landing
  - analista-datos
---

# Plan — Subsitio de apoyo (`apoyo.aethosai.org`)

> **v2 — enfoque incremental y de validación.** La v1 aspiracional (asistente IA conversacional, gamificación con badges, stack con Supabase + Gemini) está archivada en [[apoyar-subsitio-v1-aspiracional]] como referencia histórica. Se conservó porque algunas piezas (como la calculadora de impacto visual) pueden recuperarse en Fase 2 si los datos justifican la inversión.

---

## Por qué cambiamos de enfoque

1. **Validar antes de sofisticar.** Construir un funnel con IA conversacional + badges + Supabase + n8n antes de tener una sola donación validada invierte 5+ semanas en infraestructura cuyo retorno es desconocido. Si el observatorio no atrae donaciones con un MVP simple, no las atraerá con un MVP elaborado.
2. **UX en donaciones: menos clicks, no más.** La regla empírica (Stripe, GoFundMe, Wikipedia, Patreon, Kiva) es que cada paso entre "interés" y "completar pago" cae la conversión ~10%. Un chatbot que pregunta "¿qué impacto quieres financiar?" antes de mostrar el monto es fricción, no valor.
3. **Audiencia institucional.** Los donantes potenciales del observatorio son gobiernos, instituciones académicas, fundaciones, sector privado consciente y ciudadanía informada. Para esas audiencias, sobriedad institucional > badges digitales. "Socio Fundador" / "Guardián de Datos" suena a NFT drop, no a contribución a política pública regional.
4. **Costos de operación.** APIs como Gemini cobran por llamada. Supabase tiene plan gratuito hasta cierto volumen pero requiere mantenimiento. Empezar sin estos costos protege capital hasta que la data lo justifique.
5. **Tiempo del equipo.** El equipo es pequeño y distribuido (Chile + México + voluntarios). Cada semana invertida en infraestructura es una semana no invertida en curar capas de datos, sumar países al mapa, o publicar análisis. Hay que elegir.

---

## Fase 0 — Landing estática mínima (3–5 días)

### Objetivo

Tener un destino vivo en `apoyo.aethosai.org` que reciba los CTAs desde el observatorio principal y convierta la intención en (a) una donación o (b) una postulación de voluntariado, con la menor fricción posible.

### Arquitectura de rutas

```
apoyo.aethosai.org/
├── /                # Home: por qué apoyar + 2 CTAs (donar | aplicar)
├── /donaciones      # Página de donación: 3 montos sugeridos + 1 botón a pasarela externa
└── /voluntarios     # Página de voluntariado: formulario corto + descripción del proceso
```

Sin `/exito` separado: cada flujo termina con un mensaje de agradecimiento embebido o redirige a la confirmación de la pasarela.

### Páginas en detalle

#### Home (`/`)

- **Hero**: título corto + 1 párrafo de por qué apoyar (independencia, datos abiertos, gobernanza regional).
- **Dos tarjetas grandes** con CTA directo a `/donaciones` o `/voluntarios`. Sin asistente, sin pre-pregunta.
- **Bloque de transparencia**: 3 bullets cortos — "qué hacemos con tus aportes", "código abierto en GitHub", "metodología pública".
- **Footer compartido** con el observatorio (mismo lockup, mismos enlaces).

#### Donaciones (`/donaciones`)

- **Headline**: claro, sin ambigüedad ("Apoyar al observatorio").
- **3 montos sugeridos** ($10 / $25 / $100 USD) + opción "otro monto". Cada monto con una frase corta de impacto tangible ("$25 sostiene el hosting del mapa LATAM por un mes").
- **Una sola pasarela en Fase 0** — recomiendo **GoFundMe** por: %%el problema es que no me deja crear una cuenta%%
  - Cero backend.
  - Confianza de marca internacional.
  - Soporte para tarjetas globales, Apple/Google Pay.
  - Sin costos de cumplimiento PCI ni servidor.
- **Botón único**: "Donar en GoFundMe → " con `target="_blank"`.
- **Bloque de transparencia financiera**: 2-3 líneas explicando dónde se publican los reportes (GitHub o el observatorio cuando tengamos datos reales).

> **Nota sobre GoFundMe**: requiere cuenta de retiro en país soportado (EE.UU., España, UK, etc.). Si el equipo legal está en Chile/México, evaluar **Mercado Pago**%%mercado pago es más sencillo de implementar que stripe?%% o **PayPal Giving Fund** como alternativas. Decisión fuera del scope de este plan — lo define el equipo legal/financiero. Una vez decidido, basta con cambiar el botón. No bloquea el lanzamiento de la página estática.

#### Voluntarios (`/voluntarios`)

- **Headline**: "Suma tu tiempo y talento".
- **Texto corto**: 1-2 párrafos sobre qué tipo de aportes buscamos (curaduría de datos, traducción, difusión, análisis). Apuntar a [[analista-datos]] para el rol estrella.%%no necesariamente, necesitamos marketing, analista, cientificos de datos, entre otros%%
- **Formulario de aplicación** — usar servicio externo (cero backend):
  - **Tally** ([tally.so](https://tally.so)) — recomendado: gratuito, sin marca, exporta a Google Sheets/Notion.
  - Alternativas: Formspree, Google Forms, Typeform (más limitado en plan free). %%buena idea usemos google form y ya%%
- **Campos del formulario** (mínimos):
  - Nombre, país, correo.
  - Área de interés (multi-select: datos, política, diseño, código, comunicación, otro).
  - Disponibilidad estimada (horas/semana).
  - Link a portafolio / GitHub / LinkedIn (opcional).
  - Mensaje libre (opcional).
- **Auto-respuesta**: el formulario envía un correo automático al postulante con próximos pasos + un CTA opcional a "apoyar también con una donación".

### Identidad visual

Heredada del observatorio principal. Sin reinventar.

- Tipografía: IBM Plex Sans + Inter + IBM Plex Mono.
- Paleta: fondo crema `#f8f6f1` (light) / negro `#0d0d0d` (dark), acento dorado `#c9a227`.
- Lockup `AETHOS AI` con tracking expandido, igual al observatorio.
- Componentes UI reutilizados (botones, tarjetas con `border-border`, animaciones sutiles con motion).
- Sin glassmorphism agresivo ni glows reactivos. Sobriedad > sofisticación visual.

### Stack técnico

| Capa                       | Decisión                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Frontend                   | Next.js (App Router, React, TypeScript) — igual al observatorio                                                    |
| Styling                    | Tailwind CSS v4 — heredado                                                                                         |
| Animaciones                | `motion` — heredado, uso mínimo (fade-in, hover sutil)                                                             |
| Pasarela de pago           | Externa: GoFundMe / Mercado Pago / PayPal. **No** desarrollar pasarela propia en Fase 0. %%esto hay que checarlo%% |
| Formulario de voluntariado | Google form (zero backend)                                                                                         |
| Backend                    | **Ninguno** en Fase 0                                                                                              |
| Analítica                  | Vercel Analytics (built-in, sin cookies) + Plausible si queremos eventos custom                                    |
| Hosting                    | Vercel, mismo proyecto o subproyecto del observatorio                                                              |
| Dominio                    | Subdominio `apoyo.aethosai.org` apuntando al deployment                                                            |

### Métricas a instrumentar desde día 1

- Visitas únicas a `/`, `/donaciones`, `/voluntarios`.
- Click-through rate de los CTAs del observatorio al subsitio.
- Tasa de conversión: visitas a `/donaciones` → clicks al botón de pasarela externa.
- Tasa de conversión: visitas a `/voluntarios` → envíos de formulario.
- Fuente de tráfico (orgánico / referido del observatorio / RRSS / directo).
- Montos donados (cuando la pasarela lo exponga vía API o reporte semanal manual).

### Entregables de Fase 0

- [ ] Repo del subsitio (o ruta `/apoyo` dentro del observatorio principal — decisión técnica menor).
- [ ] Tres páginas (`/`, `/donaciones`, `/voluntarios`) shipeadas a producción.
- [ ] Pasarela de pago externa configurada y probada con una donación de prueba.
- [ ] Formulario de voluntariado configurado y probado con un envío de prueba.
- [ ] DNS del subdominio `apoyo.aethosai.org` apuntando al deployment.
- [ ] Botón "Apoyar" del observatorio principal redirige correctamente.
- [ ] Vercel Analytics activado.
- [ ] Entrada en [[CHANGELOG]] documentando el lanzamiento.

---

## Fase 1 — Medir (4-8 semanas tras el lanzamiento)

### Objetivo

Recoger evidencia sobre **qué funciona y qué no**, antes de invertir en sofisticación.

### Acciones

- Revisión semanal de métricas (apartar 30 min/semana).
- **A/B test simple** del copy del CTA principal en `/donaciones` (3 variantes, no más).
- Iteración manual del copy / orden de montos / micro-copy según data.
- Encuesta voluntaria al final del formulario de voluntariado: "¿qué te trajo aquí?" → ayuda a entender el canal más efectivo.
- Sin tocar el stack.

### Criterios de éxito

Estos son hipótesis a validar, no metas. Si se cumplen, justifican Fase 2:

- **Donaciones**: ≥10 donaciones en 8 semanas. Si pasa esto, hay señal real de demanda.
- **Voluntariado**: ≥15 aplicaciones cualificadas en 8 semanas. Si pasa esto, el observatorio es atractivo como causa.
- **Tráfico**: ≥30% del tráfico del observatorio principal clickea en alguno de los CTAs "Apoyar".

Si **no** se cumplen, antes de invertir más:
- Revisar copy y oferta de valor.
- Probar canales nuevos (newsletter, alianzas con universidades, prensa especializada).
- Considerar que tal vez el observatorio aún no tiene masa crítica de usuarios para soportar un funnel de donaciones; foco vuelve al producto principal.

---

## Fase 2 — Sofisticación condicional (solo si la data lo pide)

Sin compromiso de fechas. Cada bloque se activa por un **trigger** observado en Fase 1.

| Trigger observado | Acción que se justifica |
|---|---|
| ≥50 donaciones/mes recurrentes | Implementar gestión de donantes (Supabase + emails automáticos de agradecimiento + reporte mensual de impacto). |
| ≥20 aplicaciones de voluntariado/mes | Dashboard interno de gestión de postulaciones (mover de Tally a tabla propia en Supabase) + pipeline de onboarding. |
| ≥100 aplicaciones/mes y triage es bottleneck | Matchmaking automático perfil↔rol con LLM (Gemini API o equivalente). Aquí sí entra IA, ya con problema validado. |
| Donantes piden ver "qué financia mi monto" antes de pagar | Calculadora de impacto visual con slider y mapa LATAM iluminándose (recuperable de [[apoyar-subsitio-v1-aspiracional]]). |
| Audiencia más joven crece (RRSS, universitarios) | Considerar elementos de gamificación ligera: certificado descargable para voluntarios activos (no badges de logros artificiales). |
| Confianza institucional consolidada | Pasarela propia (Stripe + Mercado Pago integrados) en vez de redirección externa, para facturación formal y donaciones corporativas. |

**Importante**: Fase 2 no es "construir todo lo de v1 pero después". Es construir solo lo que la data específica pida, con prioridad clara. Resistir el feature creep.

---

## Lo que NO está en este plan (decisión deliberada)

- **Asistente conversacional IA**: añade fricción para audiencia que ya decidió donar, costo operativo recurrente, complejidad técnica.
- **Sistema de badges / logros**: choque tonal con audiencia institucional. Si queremos prueba social, hacemos un wall of supporters público (consentido) en una página `/apoyaron`.
- **Calculadora de impacto dinámica con animaciones**: bonita pero no necesaria para validar. Recuperable en Fase 2.
- **Múltiples pasarelas simultáneas (Stripe + Mercado Pago + GoFundMe + PayPal)**: una sola en Fase 0. Decidir cuál cuando el equipo legal/financiero lo confirme. Pivotar es cambiar una URL.
- **Backend propio / Supabase / Zapier / Webhooks**: cero infraestructura en Fase 0. Tally + GoFundMe + Vercel Analytics es suficiente.

---

## Documentos relacionados

- [[apoyar-subsitio-v1-aspiracional]] — versión previa con asistente IA y gamificación, conservada para referencia histórica y para recuperar piezas si la data lo justifica
- [[apoyar-landing]] — sección del homepage del observatorio que dirige tráfico a este subsitio
- [[analista-datos]] — solicitud editorial del rol estrella de voluntariado, referenciada desde `/voluntarios`
- [[CHANGELOG]] — registro de cuándo se lanza la Fase 0
- [[COPY|copy del observatorio]] — coherencia editorial y de identidad visual
- [[2026-05-26|devlog con la crítica al plan v1]]
- [[README]] — índice de la bóveda
%%con estos comentarios me parece que a lo mejor no necesitamos un subsitio para lo de apoyo hasta no validar que recibimos donaciones y hay interés%%