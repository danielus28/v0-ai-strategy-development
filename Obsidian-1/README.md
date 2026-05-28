---
tags:
  - bóveda
  - índice
  - observatorio
---

# Bóveda editorial — Observatorio Aethos AI

Documentos de trabajo del proyecto. Esta bóveda es la **fuente de verdad editorial** del observatorio: el copy del sitio se decide aquí antes de aplicarse al código, los planes se discuten aquí antes de ejecutarse, y los devlogs registran qué pasó en cada sesión.

> **Cómo usar esta bóveda con un modelo de lenguaje (Claude/GPT/Gemini):** lee primero `skills/documentar-cambios.md`. Esa skill explica cuándo y cómo actualizar `CHANGELOG.md` y `devlog/`.

---

## Estructura

```
Obsidian-1/
├── README.md                    # este archivo
├── CHANGELOG.md                 # registro cronológico de cambios shippeados
├── COPY.md                      # fuente de verdad del copy del sitio
├── planes/                      # rutas de trabajo propuestas o en curso
│   ├── apoyar-landing.md          # sección "¿Cómo nos puedes apoyar?" del homepage
│   ├── apoyar-subsitio.md         # plan completo del subsitio apoyo.aethosai.org
│   └── jam-pri.md                 # opciones para sumar Jamaica y Puerto Rico al mapa
├── solicitudes/                 # búsquedas de talento, vacantes, ayudas
│   └── analista-datos.md          # texto editorial para reclutar analista voluntario/a
├── skills/                      # instrucciones para LLMs y asistentes
│   └── documentar-cambios.md      # cómo escribir entradas en CHANGELOG y devlog
└── devlog/                      # bitácora detallada por sesión
    ├── _TEMPLATE.md               # plantilla reusable (no editar; copiar)
    └── 2026-05-26.md              # bitácora de la sesión inicial
```

---

## Carpetas y para qué sirve cada una

### `planes/`
Documentos que describen rutas de trabajo aún no ejecutadas, o en proceso de discusión. Cuando un plan se completa, mover una versión final como referencia a `decisiones/` (cuando creemos esa carpeta) o archivar con prefijo `archived-`.

### `solicitudes/`
Posts de reclutamiento o búsquedas de ayuda específicas. Pueden ser para voluntariado, alianzas, financiamiento, etc. Texto editable en español pensado para publicarse en LinkedIn, X/Twitter, listservs o GitHub Discussions.

### `skills/`
Instrucciones especializadas para modelos de lenguaje (Claude, GPT, Gemini) y devs humanos sobre cómo realizar tareas recurrentes en este proyecto. Cada skill tiene frontmatter `name` + `description` para que pueda activarse desde Claude Code Skills u otros sistemas de routing.

### `devlog/`
Bitácora detallada por sesión de trabajo. Formato: un archivo por sesión, nombrado por fecha (`YYYY-MM-DD.md`). La plantilla `_TEMPLATE.md` describe las secciones; el ejemplo `2026-05-26.md` muestra el nivel de detalle esperado.

---

## Convenciones

- **Idioma**: español. Términos técnicos OK pero priorizar legibilidad.
- **Comentarios inline de Obsidian**: `%%texto%%` se usa para feedback del usuario sobre cada bloque. Un LLM que lea estos archivos debe procesarlos como instrucciones.
- **Wikilinks vs Markdown links**: dentro de la bóveda usamos paths Markdown estándar (`../solicitudes/analista-datos.md`) para que el documento sea legible en cualquier renderer. Obsidian también soporta wikilinks `[[nombre]]` si prefieres usarlos manualmente.
- **Frontmatter**: los devlogs tienen frontmatter YAML (`fecha`, `autor`, `sesion`). Las skills tienen frontmatter Claude Code Skills (`name`, `description`).
- **Nombres de archivo**: `kebab-case.md`. Sin prefijos tipo `PLAN_` (redundante con la carpeta).

---

## Flujo típico de trabajo

1. **Idea / decisión** → discutir en una sesión, crear un devlog del día con resumen.
2. **Plan accionable** → si la idea requiere ejecución multi-sesión, crear un MD en `planes/`.
3. **Cambio de copy** → editar `COPY.md`, marcar bloques con `[PROPUESTA]` y comentarios `%%...%%`.
4. **Implementación** → aplicar al código del repo, actualizar `COPY.md` a `[ACTUAL]`.
5. **Cierre de sesión** → actualizar `CHANGELOG.md` y `devlog/YYYY-MM-DD.md` siguiendo `skills/documentar-cambios.md`.

---

## Entradas relacionadas

- Para entender la identidad visual y técnica del proyecto: leer `COPY.md` + `CHANGELOG.md` (entrada inicial).
- Para sumarte como dev/voluntario: leer `solicitudes/analista-datos.md`.
- Para saber qué planes están en discusión: revisar `planes/` (especialmente los marcados `[Unreleased]` en `CHANGELOG.md`).

---

## Documentos relacionados

- [[CHANGELOG]] — registro shippeado de cambios
- [[COPY]] — fuente editorial del sitio
- [[skills/documentar-cambios|skill: documentar cambios]] — cómo escribir entradas de CHANGELOG y devlog
- [[planes/apoyar-landing]] — sección "¿Cómo nos puedes apoyar?" del homepage
- [[planes/apoyar-subsitio]] — plan completo del subsitio apoyo.aethosai.org
- [[planes/jam-pri]] — opciones para sumar Jamaica y Puerto Rico al mapa
- [[solicitudes/analista-datos]] — solicitud editorial para reclutar analista voluntario/a
- [[devlog/2026-05-26]] — bitácora de la sesión inicial
- [[devlog/_TEMPLATE|plantilla de devlog]]
