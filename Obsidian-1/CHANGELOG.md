---
tags:
  - changelog
  - cambios
  - observatorio
---

# Changelog — Observatorio Aethos AI

Todos los cambios notables del observatorio se documentan aquí. Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).

> Versionado: por fecha mientras estemos en pre-release. Cuando lancemos v1.0 pública migramos a SemVer.
> Audiencia: developers, voluntarios, futuros mantenedores. Lenguaje conciso en español.
> Cómo escribir: ver `skills/documentar-cambios.md` en esta bóveda.

---

## [Unreleased]

### Pendientes
- Conectar dominio `aethosai.org` en Vercel (DNS + SSL).
- **Decidir si lanzar el subsitio `apoyo.aethosai.org` ahora o posponerlo** hasta validar que hay interés real / donaciones. El enfoque ya está decidido (Fase 0 incremental, ver `planes/apoyar-subsitio.md`), pero queda la duda editorial de si conviene construirlo antes de tener señal de demanda. [BLOQUEADO: equipo editorial]
- Ampliar el reclutamiento de voluntariado más allá del analista de datos: también marketing, científicos de datos, comunicación (ver comentarios en `planes/apoyar-subsitio.md`).
- Sumar microestados del Caribe (BHS, BRB, LCA, ATG, GRD, KNA, VCT, DMA) si la metodología los incluye en el alcance.
- Reclutar analista de datos voluntario/a (ver `solicitudes/analista-datos.md`).
- Auditoría de accesibilidad (contraste AA, navegación por teclado, lectores de pantalla).

---

## [2026-05-28]

> Entrada retroactiva: documenta trabajo que se shippeó al código entre el 26 y el 28 de mayo pero que no se había registrado (el cierre de sesión con la skill `documentar-cambios` se había saltado).

### Changed
- CTA de donaciones conectado a Mercado Pago (`https://mpago.la/2V9zGis`) en vez del subsitio `apoyo.aethosai.org` (que aún no existe). Aplicado en los 3 puntos de entrada: tarjeta "Aporte Financiero" (`components/support-section.tsx`), botón "Apoyar" del header (`components/navigation.tsx`) y enlace "Apoyar el observatorio" del footer (`components/footer.tsx`). Resuelve el cabo suelto de pasarela (GoFundMe estaba bloqueado por creación de cuenta).
- Copy de la tarjeta de donaciones: agregada frase de impacto concreta ("Con $300 MXN nos ayudas a pagar servicios web y el apoyo de profesionales"). En `components/support-section.tsx`.
- CTA de voluntariado conectado directo al Google Form (`https://docs.google.com/forms/d/e/1FAIpQLScq2ty5lQfqjbfSiTHT7Dz9jeNpj4-I_cKZAqP3MKwdxS3Hwg/viewform`) en vez del subsitio `apoyo.aethosai.org/voluntarios` (que aún no existe). Permite captar talento ya, sin esperar al subsitio. En `components/support-section.tsx`.
- Copy de la tarjeta de voluntariado: se eliminó la promesa de un "asistente inteligente" (residuo del plan v1 aspiracional descartado) y se ampliaron los roles (analista, científico/a de datos, marketing, comunicación, diseño, desarrollo). En `components/support-section.tsx`.
- Enfoque del subsitio de apoyo: se adoptó el plan **v2 incremental** (`planes/apoyar-subsitio.md`) sobre el plan aspiracional v1 (asistente IA conversacional, gamificación con badges, Supabase + Gemini). Razón: validar demanda con un MVP estático sin backend antes de invertir 5+ semanas en infraestructura de retorno desconocido. El subsitio define 3 rutas: `/`, `/donaciones`, `/voluntarios`.
- URLs de los CTA de apoyo alineadas a la nueva arquitectura de rutas del subsitio: CTA primario `https://apoyo.aethosai.org/donaciones` → `https://apoyo.aethosai.org/`; CTA de voluntariado `…/donaciones/voluntarios` (ruta anidada errónea) → `…/voluntarios`. En `components/footer.tsx` y `components/support-section.tsx`.
- `Obsidian-1/COPY.md`: agregado frontmatter de tags y sección "Documentos relacionados" (sin cambios de copy del sitio).

### Added
- Plan v2 del subsitio de apoyo (`planes/apoyar-subsitio.md`): Fase 0 (landing estática, pasarela externa, formulario Google Form) → Fase 1 (medir) → Fase 2 (sofisticación condicional por triggers de datos).

### Removed
- Plan v1 aspiracional del subsitio dejó de ser la ruta vigente: archivado como referencia histórica en `planes/apoyar-subsitio-v1-aspiracional.md` (renombrado desde `PLAN_SUBSITIO_APOYAR.md`).

---

## [2026-05-26 — tarde]

### Changed
- Reorganización de la bóveda Obsidian en carpetas temáticas: `planes/`, `solicitudes/`, `skills/`. Archivos renombrados de `SCREAMING_SNAKE_CASE.md` a `kebab-case.md`. Nuevo `README.md` como índice navegable de la bóveda.

---

## [2026-05-26]

### Added
- Página dedicada `/metodologia` (`app/metodologia/page.tsx`) con detalle completo de fuentes, principios y link al repositorio en GitHub.
- Componente `MethodologyTeaser` en homepage como resumen + CTA hacia `/metodologia`.
- Sección "¿Cómo nos puedes apoyar?" (`components/support-section.tsx`) con 3 canales: aporte financiero, voluntariado, difusión. Apunta al subdominio `apoyo.aethosai.org`.
- Glosario flotante (`components/glossary-term.tsx`) con tooltips Radix UI sobre EGDI, GCI, GARI, ILIA, OECD.AI, ISO/IEC, SC 42, SC 27. Aplicado en methodology, capacity, iso-membership y panel del mapa.
- Componente `Tooltip` reutilizable (`components/ui/tooltip.tsx`) basado en `@radix-ui/react-tooltip` con estilo Aethos.
- Favicon SVG adaptive (`app/icon.svg`) que invierte stroke según `prefers-color-scheme`.
- Apple touch icon (`app/apple-icon.svg`) con fondo crema cálido y logo Aethos.
- Sitemap dinámico (`app/sitemap.ts`) y `robots.ts` autogenerados.
- Structured data JSON-LD: Organization + WebSite + Dataset inyectados en `<body>`.
- Bóveda Obsidian (`Obsidian-1/`) con `COPY.md` editable, planes (`planes/jam-pri.md`, `planes/apoyar-landing.md`, `planes/apoyar-subsitio.md`) y solicitudes (`solicitudes/analista-datos.md`).
- Países Jamaica (JAM) y Puerto Rico (PRI) al SVG (`public/latam-map.svg`) y a `lib/latam-map-data.ts`. Total: 27 países.
- Datos extraídos del SVG a TypeScript (`lib/latam-map-data.ts`) — fuente de verdad para el render del mapa.

### Changed
- Tipografía heading: `IBM Plex Serif` → `IBM Plex Sans` para homologar con sitio Aethos AI principal.
- Lockup del header: `Aethos AI` (font-serif, lowercase) → `AETHOS AI` (uppercase, `tracking-[0.18em]`, "AI" en `text-muted-foreground`).
- Hero copy a variante C: `¿Tu país está listo para el cambio?` con animación palabra por palabra (motion + blur entry).
- Copy de Participación normativa a opción 2 pedagógica: `¿Cómo participa cada país en la regulación global?` + explicación de SC 42/SC 27.
- Terminología en español: `P-member` → `Miembro pleno`, `O-member` → `Miembro observador` en toda la UI (iso-membership, panel del mapa, aria-labels, chart axis, tooltips).
- Conteo de países: `33` → `25` → `27` (alineado al SVG real tras incorporar JAM y PRI).
- Dominio: `aethos.ai` → `aethosai.org` en layout, sitemap, robots, JSON-LD, opengraph-image, emails de footer y agenda.
- Mapa LATAM refactorizado: `fetch + innerHTML` → SVG inline declarativo en React. SSR-friendly, indexable por Google, sin layout thrashing.
- Eventos del mapa: 1196 `addEventListener` imperativos → 27 handlers React por país (event delegation via `<g>`).
- Escala de colores del mapa: 6 buckets → 4 niveles (alto / medio / bajo / sin datos) con paleta dorado→carbón de mayor contraste.
- Panel de info del mapa: ahora muestra descripción legible en español de cada capa + fuente + año + nota.
- `TooltipProvider` global en `app/layout.tsx` (un provider único vs uno por GlossaryTerm — menos overhead, animaciones más consistentes).
- Hero CTA secundario: `Ver agenda 2026` → `Conocer la metodología` (link a `/metodologia`).
- Navigation CTA primario: `Sumarse` → `Apoyar` (link a `https://apoyo.aethosai.org/donaciones`).
- Subtítulo del hero refinado: "y la vida cotidiana" y "mide el estado de los 27 países" reemplazaron versiones anteriores.

### Fixed
- Build de Vercel fallaba con `Module not found: Can't resolve 'motion/react'` — `framer-motion@12.24.10` no expone el módulo `motion/react`; se reemplazó la dependencia por `motion@^12.0.0` (rebrand oficial).
- Click en huecos entre dots del mapa no seleccionaba el país — agregado `<rect>` invisible por país que cubre el bounding box completo del cluster como hit area.
- Z-order del mapa: países pequeños (GTM, BLZ, SLV, CRI) iban detrás de México en el DOM y no se podían seleccionar — ahora los `<g>` se ordenan por bbox area descendente (grandes primero, pequeños encima).
- Layout thrashing en hover del mapa: cada movimiento del cursor mutaba `.style` de 1196 circles → ahora todo declarativo, React reconcilia solo los circles del país activo.
- `drop-shadow` aplicado a cada circle en hover (costoso) → ahora aplicado al `<g>` del país activo (1 filter en lugar de N).
- Tipos huérfanos `medium-high` y `medium-low` removidos del componente del mapa tras simplificar buckets.

### Removed
- Sección Agenda (`AgendaSection`) y archivo `components/agenda-section.tsx`.
- Referencias a `#agenda` en navigation, footer, hero, sitemap y JSON-LD.
- `TypewriterEffect` del hero (reemplazado por animación palabra por palabra con motion + blur entry). El archivo `components/ui/typewriter-effect.tsx` quedó huérfano y puede eliminarse.
- Dependencia `framer-motion` del `package.json` (reemplazada por `motion`).
- Hito Q1-Q4 2026 de la agenda (información ya no visible en el sitio; queda registrada en este changelog y en el COPY.md por referencia).

---

## Plantilla para nuevas entradas

```markdown
## [YYYY-MM-DD]

### Added
- Funcionalidad o archivo nuevo.

### Changed
- Comportamiento, copy, dependencia o estructura modificada.

### Fixed
- Bug corregido (incluye qué pasaba antes y cuál fue la causa raíz).

### Removed
- Funcionalidad o archivo eliminado.

### Security
- Solo si hay implicaciones de seguridad.
```

---

## Documentos relacionados

- [[README]] — índice de la bóveda
- [[COPY]] — fuente editorial del sitio
- [[skills/documentar-cambios|cómo escribir entradas aquí]]
- [[devlog/2026-05-26]] — sesión que produjo la primera entrada
- [[planes/jam-pri]] — plan parcialmente ejecutado (JAM y PRI ya sumados)
- [[planes/apoyar-landing]] — plan ejecutado (sección SupportSection)
- [[planes/apoyar-subsitio]] — plan en revisión (subsitio de apoyo)
- [[solicitudes/analista-datos]] — solicitud editorial
