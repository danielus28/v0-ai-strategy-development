---
tags:
  - copy
  - editorial
  - sitio
  - observatorio
---

# Copy del sitio — Observatorio Aethos AI

> Documento editable. Comenta o reescribe libremente cada bloque.
> Convenciones:
> - **\[ACTUAL\]**: lo que está hoy en producción/main.
> - **\[PROPUESTA\]**: cambio sugerido aún no aplicado al código.
> - `Ruta del archivo:línea` apunta al origen para que cualquier edición sea fácil de aplicar.
> - Comentarios inline de Obsidian: `%%texto%%` (los lee Claude para procesar feedback).
>
> **Última actualización**: 2026-05-26 — aplicados todos los cambios marcados por el usuario en esta sesión.

---

## 0. Metadata (SEO / pestaña del navegador)

`app/layout.tsx`

- **Título de pestaña** \[ACTUAL\]
  > Observatorio de gobernanza de la inteligencia artificial en América Latina | Aethos AI
- **Descripción** \[ACTUAL\]
  > ¿Tu país está listo para el cambio? El observatorio mide el estado legal, político y técnico de los 25 países de América Latina ante la inteligencia artificial y propone una ruta común para nivelar la cancha en gobernanza, capacidad e integración.
- **Open Graph image** — texto sobreimpreso (`app/opengraph-image.tsx`) \[ACTUAL\]
  > Observatorio · Gobernanza de **IA** en América Latina
  > Datos públicos y comparables sobre cómo los países de la región se preparan para gobernar la IA.
  > 25 países · 6 capas · 6 fuentes públicas · aethosai.org

---

## 1. Header / Navegación

`components/navigation.tsx`

- **Lockup** \[ACTUAL\]
  > AETHOS AI _(con "AI" en gris cálido)_
- **Enlaces de navegación** \[ACTUAL\]
  - Participación normativa → `#participacion-normativa`
  - Mapa regional → `#mapa-regional`
  - Capacidad → `#capacidad`
  - Agenda 2026 → `#agenda`
  - Metodología → `#metodologia`
- **CTA derecho** \[ACTUAL\]
  > Sumarse

---

## 2. Hero

`components/hero-section.tsx`

- **Eyebrow** \[ACTUAL\]
  > América Latina ante la IA
- **Headline animado palabra por palabra** \[ACTUAL\]
  > ¿Tu país está listo para el **cambio?** _(palabra "cambio?" en dorado)_
- **Subtítulo** \[ACTUAL\]
  > La inteligencia artificial reordena gobiernos, instituciones, empresas y la vida cotidiana. El observatorio mide el estado de los 25 países de la región y propone una ruta común para que ninguno se quede atrás.
- **Línea de stats (mono)** \[ACTUAL\]
  > 25 países · 6 capas de datos · 6 fuentes públicas
- **CTAs** \[ACTUAL\]
  - Primario: `Explorar el mapa` → ancla `#mapa-regional`
  - Secundario: `Ver agenda 2026` → ancla `#agenda`
- **Stats grid (4 columnas)** \[ACTUAL\]
  - 25 — Países monitoreados
  - 6 — Capas de datos
  - 6 — Fuentes públicas
  - 2026 — Actualización en curso

---

## 3. Participación normativa (ISO/IEC)

`components/iso-membership-section.tsx`

- **Eyebrow** \[ACTUAL\]
  > Participación normativa

### Headline + subtítulo \[ACTUAL — opción 2 aplicada\]

> **¿Cómo participa cada país en la regulación global?**
> Los comités ISO/IEC SC 42 (inteligencia artificial) y SC 27 (seguridad de la información) son los espacios donde se definen los estándares técnicos del mundo. Mapeamos qué países de la región participan y con qué tipo de membresía.

### Leyenda \[ACTUAL — términos en español aplicados\]

- 🟡 Miembro pleno (con voto)
- ⚪ Miembro observador
- ⚫ Sin membresía

### Títulos de gráfico \[ACTUAL\]

- "ISO/IEC JTC 1/SC 42 — Inteligencia artificial" _(SC 42 con tooltip glosario)_
- "ISO/IEC JTC 1/SC 27 — Seguridad de la información" _(SC 27 con tooltip glosario)_

### Hint mobile \[ACTUAL\]

> ← Desliza para ver más países →

---

## 4. Mapa regional LATAM

`components/latam-map-section-new.tsx`

- **Eyebrow** \[ACTUAL\]
  > Visualización regional
- **Headline** \[ACTUAL\]
  > Mapa regional LATAM
- **Subtítulo** \[ACTUAL\]
  > Explora seis capas comparables de datos sobre gobernanza de IA en la región. Cambia entre capas y selecciona un país para ver su perfil completo.

### Labels de capas (tabs) \[ACTUAL — reescritos con descripciones legibles\]

| ID | Label corto | Fuente | Año | Descripción mostrada en panel info |
|---|---|---|---|---|
| iso | Voz en estándares internacionales | ISO/IEC SC 42 y SC 27 | 2024 | Si un país tiene voto en los comités técnicos donde se escriben los estándares internacionales de IA y ciberseguridad. |
| egdi | Gobierno digital | Naciones Unidas (EGDI) | 2024 | Qué tan desarrollados están los servicios digitales del Estado, según el índice EGDI de la ONU. |
| gci | Ciberseguridad | UIT (GCI) | 2024 | Capacidad nacional para enfrentar amenazas de ciberseguridad, según el índice GCI de la UIT. |
| gari | Preparación del gobierno para la IA | Oxford Insights (GARI) | 2023 | Qué tan preparado está el gobierno para adoptar inteligencia artificial. |
| ilia | Madurez en gobernanza de IA | CEPAL (ILIA) | 2025 (Preliminar) | Avance en políticas y gobernanza de IA en América Latina. |
| oecd | Políticas de IA registradas | OCDE (OECD.AI) | 2024 (Cobertura parcial) | Cantidad de políticas de inteligencia artificial registradas oficialmente ante la OCDE. |

### Glosario flotante \[ACTUAL — implementado\]

Todos los acrónimos (EGDI, GCI, GARI, ILIA, OECD.AI, ISO/IEC, SC 42, SC 27) ahora muestran un tooltip con definición + fuente al pasar el cursor o pulsar Enter. Componente: `components/glossary-term.tsx`.

### Estados de la escala (buckets) \[ACTUAL — reducidos a 4\]

- Alto / Medio / Bajo / Sin datos
- Hints contextuales: "Avance regional destacado" / "Avance intermedio" / "Avance limitado" / "Indicador no disponible"

### Panel lateral del país \[ACTUAL\]

- **Estado vacío**
  > **Selecciona un país**
  > Haz clic o pulsa Enter sobre cualquier país del mapa para ver su perfil completo.
- **Sección de membresía**
  > Membresía ISO/IEC
  > - SC 42 (IA): Miembro pleno / Miembro observador / Sin membresía
  > - SC 27 (Cyber): Miembro pleno / Miembro observador / Sin membresía
- **Indicadores numéricos** _(cada sigla con tooltip glosario)_
  > EGDI 2024 · GCI 2024 · GARI 2023 · ILIA 2025
- **Bloque OECD.AI**
  > Políticas OECD.AI
  > [N] políticas registradas

---

## 5. Capacidad institucional

`components/capacity-section.tsx`

- **Eyebrow** \[ACTUAL\]
  > Capacidad institucional
- **Headline** \[ACTUAL\]
  > Capacidad para gobernar IA
- **Subtítulo** \[ACTUAL\]
  > Tres dimensiones clave para evaluar la preparación de los países de LATAM. Mostramos el top 10 regional; puedes ver el detalle país por país en el [mapa](#mapa-regional).

### Tarjetas de dimensión \[ACTUAL — siglas con tooltip glosario\]

| Label | Full label | Fuente |
|---|---|---|
| EGDI | Gobierno digital | UN E-Government Development Index — 2024 |
| GCI | Ciberseguridad | ITU Global Cybersecurity Index — 2024 |
| GARI | Preparación IA | Oxford Government AI Readiness Index — 2023 |

---

## 6. Agenda 2026

`components/agenda-section.tsx`

- **Eyebrow** \[ACTUAL\]
  > Roadmap 2026
- **Headline** \[ACTUAL\]
  > Agenda Aethos 2026
- **Subtítulo** \[ACTUAL\]
  > Compromisos medibles para posicionar la voz de LATAM en los estándares globales de gobernanza de IA durante los próximos doce meses.

### Hitos (timeline) \[ACTUAL\]

| Trimestre | Título | Descripción | Estado |
|---|---|---|---|
| Q1 2026 | Lanzamiento v1.0 del Observatorio | Publicación con 6 capas core de datos. | En progreso |
| Q2 2026 | Propuesta técnica a SC 42 | Envío vía INN (Chile) o DGN (México). | Pendiente |
| Q2 2026 | Pilotos de gobernanza | 2 pilotos documentados con instituciones públicas o empresas. | Pendiente |
| Q3 2026 | Primer reporte trimestral | Análisis de tendencias y recomendaciones. | Pendiente |
| Q4 2026 | Capas aspiracionales | Integración de participación real y sandboxes regulatorios. | Pendiente |
| Q4 2026 | Retrospectiva anual | Segundo reporte trimestral + balance del año. | Pendiente |

### CTA bloque inferior \[ACTUAL\]

- **Título**: ¿Quieres sumarte a la agenda?
- **Texto**:
  > Buscamos profesionales voluntarios, investigadores e instituciones comprometidos con la gobernanza responsable de IA en LATAM. Cuéntanos tu perfil y te integramos al grupo de trabajo técnico.
- **CTAs**:
  - `Contactar al equipo` → `mailto:contacto@aethosai.org`
  - `Ver metodología` → `#metodologia`

---

## 7. Metodología y fuentes

`components/methodology-section.tsx`

- **Eyebrow** \[ACTUAL\]
  > Transparencia
- **Headline** \[ACTUAL\]
  > Metodología y fuentes
- **Subtítulo** \[ACTUAL\]
  > Cada indicador tiene fuente pública, fecha y alcance documentado. Sin datos propietarios ni cajas negras. Limitaciones declaradas explícitamente.

### Tres principios \[ACTUAL\]

- **Multi-fuente** — Seis fuentes públicas independientes, validadas por organismos internacionales.
- **Reproducible** — Metodología publicada. Transformaciones documentadas. Limitaciones declaradas.
- **Accionable** — Cada visualización termina en "qué hacer": agenda técnica, comités, pilotos.

### Tabla de fuentes \[ACTUAL — siglas con tooltip glosario\]

| Fuente | Año | Cobertura | Limitación |
|---|---|---|---|
| ISO/IEC (SC 42, SC 27) | 2024 | Completa | Solo membresía formal, no participación real en propuestas técnicas. |
| ONU · EGDI | 2024 | Completa | Índice compuesto, no desagregado por IA. |
| UIT · GCI | 2024 | Completa | Enfocado en ciberseguridad, no gobernanza de IA. |
| Oxford Insights · GARI | 2023 | Completa | Dataset público más reciente es 2023. |
| OECD.AI | 2024 | Parcial | Cobertura desigual; usamos datos disponibles para 8 países LATAM. |
| CEPAL · ILIA | 2025 | Parcial | Datos preliminares; sujetos a validación. |

---

## 8. Footer

`components/footer.tsx`

- **Texto de marca** \[ACTUAL\]
  > AETHOS AI
  > Puente técnico-estratégico para articular participación normativa, evidencia regional e implementación demostrable de gobernanza de IA en América Latina y el Caribe.
- **Columna Observatorio** \[ACTUAL\]
  - Mapa regional → `#mapa-regional`
  - Participación normativa → `#participacion-normativa`
  - Capacidad de gobernar → `#capacidad`
  - Metodología → `#metodologia`
- **Columna Contacto** \[ACTUAL\]
  - Agenda 2026 → `#agenda`
  - contacto@aethosai.org
- **Línea inferior** \[ACTUAL\]
  > © {año} Aethos AI · Operación regional desde Chile y México
  > Datos actualizados a {mes año}

---

## 9. Cambios aplicados en esta iteración (2026-05-26)

- [x] Dominio actualizado: `aethos.ai` → `aethosai.org` (layout, sitemap, robots, JSON-LD, opengraph-image, emails).
- [x] Conteo de países: `33` → `25` (alineado con el SVG actual del mapa).
- [x] Hero subtítulo: "y la vida cotidiana", "mide el estado de".
- [x] Meta title: "Observatorio de gobernanza de la inteligencia artificial en América Latina | Aethos AI".
- [x] Meta description: incluye "estado legal, político y técnico".
- [x] Participación normativa: copy opción 2 aplicado.
- [x] Términos en español: "P-member" → "Miembro pleno", "O-member" → "Miembro observador" en toda la UI.
- [x] CTA agenda: "profesionales voluntarios" agregado.
- [x] Glosario flotante: tooltips de Radix UI sobre EGDI, GCI, GARI, ILIA, OECD.AI, ISO/IEC, SC 42, SC 27 en methodology, capacity, iso-membership y panel del mapa.
- [x] Buckets del mapa: 6 → 4 niveles (alto/medio/bajo/sin datos) con mejor contraste.
- [x] Bug del click: ahora se puede seleccionar país clickeando en cualquier parte del cluster (no solo sobre los dots).

---

## 10. Pendientes / preguntas abiertas

- [ ] **Revisar metodología completa del proyecto** (mencionado por el usuario). El SVG cubre 25 países; `COUNTRY_NAMES_ES` lista 34; falta decidir el alcance final (incluir/excluir microestados del Caribe, agregar PRI/JAM al SVG). %%creo que para esto hay qye hacer una página exclusiva de la metodología
- [ ] Decidir naming futuro: "Aethos AI" → "Aethos IA" / "Aethos Inteligencia Artificial" (señalar como producto LATAM). %%Esto no es nuestro problema ahora %%
- [ ] Definir si el TooltipProvider debe vivir en `app/layout.tsx` (uno global) vs uno por GlossaryTerm (actual — overhead mínimo). %%lo que genere una mejor UX%%
- [ ] Revisar copy del componente "Cumplimiento" del mapa cuando se incorporen JAM y PRI al SVG. %% ¿cómo lo hacemos?%%

%%En general vamos muy bien, quedan cosas muy finas que hilar, por ejemplo, eliminemos la agenda del observatorio, y lo que te decía poner la metodología en otra página, con la liga de github, necesito que generes una solicitud de ayuda para un analista de datos, lo otro es que en lo de sumarse vamos a generar un funnel para recivir donaciones, el funnel va a estar en otro proyecto, asociado al subdominio apoyo.aethosai.org%%

---

## Documentos relacionados

- [[README]] — índice de la bóveda
- [[CHANGELOG]] — registro de cuándo se aplicaron estos cambios al código
- [[planes/apoyar-landing]] — copy de la sección "¿Cómo nos puedes apoyar?"
- [[planes/apoyar-subsitio]] — copy del futuro subsitio apoyo.aethosai.org
- [[solicitudes/analista-datos]] — referencia del rol de analista
- [[devlog/2026-05-26]] — bitácora de los cambios editoriales aplicados
