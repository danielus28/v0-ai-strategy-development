# Copy del sitio — Observatorio Aethos AI

> Documento editable. Comenta o reescribe libremente cada bloque.
> Convenciones:
> - **\[ACTUAL\]**: lo que está hoy en producción/main.
> - **\[PROPUESTA\]**: cambio sugerido aún no aplicado al código.
> - `Ruta del archivo:línea` apunta al origen para que cualquier edición sea fácil de aplicar.

---

## 0. Metadata (SEO / pestaña del navegador)

`app/layout.tsx`

- **Título de pestaña** \[ACTUAL\]
  > Observatorio de Gobernanza de IA en América Latina | Aethos AI
- **Descripción** \[ACTUAL\]
  > ¿Tu país está listo para el cambio? El observatorio mide el punto de partida de los 33 países de América Latina ante la inteligencia artificial y propone una ruta común para nivelar la cancha en gobernanza, capacidad e integración.
- **Open Graph image** — texto sobreimpreso (`app/opengraph-image.tsx`)
  > Observatorio · Gobernanza de **IA** en América Latina
  > Datos públicos y comparables sobre cómo los países de la región se preparan para gobernar la IA.
  > 33 países · 6 capas · 6 fuentes públicas · aethos.ai

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
  > La inteligencia artificial reordena gobiernos, instituciones, empresas y vida cotidiana. El observatorio mide el punto de partida de los 33 países de la región y propone una ruta común para que ninguno se quede atrás.
- **Línea de stats (mono)** \[ACTUAL\]
  > 33 países · 6 capas de datos · 6 fuentes públicas
- **CTAs** \[ACTUAL\]
  - Primario: `Explorar el mapa` → ancla `#mapa-regional`
  - Secundario: `Ver agenda 2026` → ancla `#agenda`
- **Stats grid (4 columnas)** \[ACTUAL\]
  - 33 — Países monitoreados
  - 6 — Capas de datos
  - 6 — Fuentes públicas
  - 2026 — Actualización en curso

---

## 3. Participación normativa (ISO/IEC)

`components/iso-membership-section.tsx`

- **Eyebrow** \[ACTUAL\]
  > Participación normativa

### Headline + subtítulo

- \[ACTUAL\]
  > **¿Dónde se escriben los estándares?**
  > Sin P-membership, no hay voto técnico ni tracción en propuestas. LATAM tiene voz en los estándares que definirán la gobernanza de IA de la próxima década, pero solo si ocupa su lugar en la mesa.

- \[PROPUESTA — opción 2 aprobada\]
  > **¿Cómo participa cada país en la regulación global?**
  > Los comités ISO/IEC SC 42 (inteligencia artificial) y SC 27 (seguridad de la información) son los espacios donde se definen los estándares técnicos del mundo. Mapeamos qué países de la región participan y con qué tipo de membresía.

### Leyenda

- \[ACTUAL\]
  - 🟡 P-member (voto)
  - ⚪ O-member (observador)
  - ⚫ Sin membresía
- \[PROPUESTA\]
  - 🟡 Miembro pleno (con voto)
  - ⚪ Miembro observador
  - ⚫ Sin membresía

### Títulos de gráfico

- \[ACTUAL\]
  - "ISO/IEC JTC 1/SC 42 — Inteligencia artificial"
  - "ISO/IEC JTC 1/SC 27 — Seguridad de la información"

### Hint mobile

- \[ACTUAL\]
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

### Labels de capas (tabs)

| ID | Label corto \[ACTUAL\] | Fuente | Año | Nota |
|---|---|---|---|---|
| iso | Voz en estándares ISO/IEC | ISO SC 42 / SC 27 | 2024 | — |
| egdi | Madurez de gobierno digital | UN EGDI | 2024 | — |
| gci | Ciberseguridad | ITU GCI | 2024 | — |
| gari | Preparación gubernamental IA | Oxford Insights GARI | 2023 | — |
| ilia | Gobernanza IA LATAM | CEPAL ILIA | 2025 | Preliminar |
| oecd | Políticas de IA | OECD.AI | 2024 | Cobertura parcial |

### Acrónimos a explicar (pendiente — feedback del usuario)

- **EGDI** (E-Government Development Index): índice de la ONU que mide la madurez de los servicios digitales del Estado.
- **GCI** (Global Cybersecurity Index): índice de la UIT sobre capacidad nacional de ciberseguridad.
- **GARI** (Government AI Readiness Index): índice de Oxford Insights sobre preparación del gobierno para implementar IA.
- **ILIA** (Índice Latinoamericano de Inteligencia Artificial): índice regional de CEPAL.
- **OECD.AI**: observatorio de políticas de IA de la OCDE.
- **ISO/IEC SC 42**: subcomité internacional que escribe los estándares técnicos de inteligencia artificial.
- **ISO/IEC SC 27**: subcomité internacional que escribe los estándares de seguridad de la información.
- **P-member / O-member**: nivel de membresía en un comité ISO. "P" tiene voto, "O" observa.

### Estados de la escala (buckets) \[PROPUESTA — depende de simplificación]

- Alto / Medio-alto / Medio / Medio-bajo / Bajo / Sin datos → reducir a:
- Alto / Medio / Bajo / Sin datos

### Panel lateral del país

- **Estado vacío** \[ACTUAL\]
  > **Selecciona un país**
  > Haz clic o pulsa Enter sobre cualquier país del mapa para ver su perfil completo.
- **Sección de membresía** \[ACTUAL\]
  > Membresía ISO/IEC
  > - SC 42 (IA): P-member / O-member / Sin membresía
  > - SC 27 (Cyber): P-member / O-member / Sin membresía
- **Indicadores numéricos** \[ACTUAL\]
  > EGDI 2024 · GCI 2024 · GARI 2023 · ILIA 2025
- **Bloque OECD.AI** \[ACTUAL\]
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

### Tarjetas de dimensión

| Label | Full label \[ACTUAL\] | Fuente |
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

### Hitos (timeline)

| Trimestre | Título \[ACTUAL\] | Descripción \[ACTUAL\] | Estado |
|---|---|---|---|
| Q1 2026 | Lanzamiento v1.0 del Observatorio | Publicación con 6 capas core de datos. | En progreso |
| Q2 2026 | Propuesta técnica a SC 42 | Envío vía INN (Chile) o DGN (México). | Pendiente |
| Q2 2026 | Pilotos de gobernanza | 2 pilotos documentados con instituciones públicas o empresas. | Pendiente |
| Q3 2026 | Primer reporte trimestral | Análisis de tendencias y recomendaciones. | Pendiente |
| Q4 2026 | Capas aspiracionales | Integración de participación real y sandboxes regulatorios. | Pendiente |
| Q4 2026 | Retrospectiva anual | Segundo reporte trimestral + balance del año. | Pendiente |

### CTA bloque inferior

- **Título** \[ACTUAL\]
  > ¿Quieres sumarte a la agenda?
- **Texto** \[ACTUAL\]
  > Buscamos profesionales, investigadores e instituciones comprometidos con la gobernanza responsable de IA en LATAM. Cuéntanos tu perfil y te integramos al grupo de trabajo técnico.
- **CTAs** \[ACTUAL\]
  - `Contactar al equipo` → `mailto:contacto@aethos.ai`
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

### Tres principios

- **Multi-fuente** \[ACTUAL\]
  > Seis fuentes públicas independientes, validadas por organismos internacionales.
- **Reproducible** \[ACTUAL\]
  > Metodología publicada. Transformaciones documentadas. Limitaciones declaradas.
- **Accionable** \[ACTUAL\]
  > Cada visualización termina en "qué hacer": agenda técnica, comités, pilotos.

### Tabla de fuentes

| Fuente \[ACTUAL\] | Año | Cobertura | Limitación |
|---|---|---|---|
| ISO/IEC (SC 42, SC 27) | 2024 | Completa | Solo membresía formal, no participación real en propuestas técnicas. |
| UN EGDI | 2024 | Completa | Índice compuesto, no desagregado por IA. |
| ITU GCI | 2024 | Completa | Enfocado en ciberseguridad, no gobernanza de IA. |
| Oxford Insights GARI | 2023 | Completa | Dataset público más reciente es 2023. |
| OECD.AI | 2024 | Parcial | Cobertura desigual; usamos datos disponibles para 8 países LATAM. |
| CEPAL ILIA | 2025 | Parcial | Datos preliminares; sujetos a validación. |

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
  - contacto@aethos.ai
- **Línea inferior** \[ACTUAL\]
  > © {año} Aethos AI · Operación regional desde Chile y México
  > Datos actualizados a {mes año}

---

## 9. Pendientes / preguntas abiertas

- [ ] Confirmar dominio definitivo para canonical/sitemap/JSON-LD (hoy: `https://aethos.ai`).
- [ ] Confirmar conteo de países: hero dice "33 países", SVG tiene 25 (faltan JAM, PRI; sobra BHS). ¿Actualizar SVG o copy?
- [ ] Definir si labels de leyenda deben ser "P-member" o "Miembro pleno" (decisión editorial).
- [ ] Definir si reducimos buckets del mapa de 6 a 4 niveles (alto/medio/bajo/sin datos).
- [ ] ¿Glosario expandible flotante para cada acrónimo, o solo en sección Metodología?
- [ ] Revisar si "Aethos AI" como nombre vs "Observatorio Aethos AI" como producto debe distinguirse mejor en el header.
