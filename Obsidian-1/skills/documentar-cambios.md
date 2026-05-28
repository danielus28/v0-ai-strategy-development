---
name: documentar-cambios
description: Cómo registrar cambios del Observatorio Aethos AI en la bóveda de Obsidian. Úsala al final de cualquier sesión de trabajo en el repo (cambios de código, copy, infraestructura o decisiones de producto) para mantener CHANGELOG.md y devlog/ al día.
---

# Cómo documentar cambios en el Observatorio Aethos AI

Este archivo es una **skill** legible por humanos y por modelos de lenguaje (Claude, GPT, Gemini, etc.). Explica el sistema de documentación de la bóveda Obsidian para que cualquier dev o asistente que se sume al proyecto pueda actualizarla sin reinventar el formato.

---

## Cuándo activar esta skill

Actívala cuando se cumpla **cualquiera** de estas condiciones:

- Terminaste una sesión de trabajo en el repositorio (cambios al código, copy, dependencias, infraestructura).
- Tomaste una decisión técnica o editorial no trivial (cambio de stack, decisión de UX, refactor).
- Fixeaste un bug cuya causa raíz vale la pena recordar.
- Removiste features o archivos.
- El usuario te dice "documenta lo que hicimos", "actualiza el changelog" o equivalente.

No la actives para:
- Pruebas rápidas que no llegan a `main`.
- Cambios de formato/lint sin impacto funcional.
- Conversación sin acciones concretas.

---

## Archivos que mantiene esta skill

Todos viven en `Obsidian-1/`:

1. **`CHANGELOG.md`** — registro cronológico compacto de cambios shippeados. Formato [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).
2. **`devlog/YYYY-MM-DD.md`** — bitácora detallada de una sesión específica. Incluye decisiones, bugs encontrados, pendientes.
3. **`devlog/_TEMPLATE.md`** — plantilla para crear nuevos devlogs. **No editar**; copiarla.

Otros docs editoriales de la bóveda (`COPY.md`, `PLAN_*.md`, `SOLICITUD_*.md`) **no son responsabilidad de esta skill**. Solo se documenta su existencia o cambios estructurales en el CHANGELOG cuando aplica.

---

## Flujo en cada cierre de sesión

### Paso 1 — Actualiza `CHANGELOG.md`

Localiza la sección con la fecha de hoy. Si no existe, créala arriba de la entrada más reciente:

```markdown
## [YYYY-MM-DD]

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Removed
- ...
```

**Categorías**:
- **Added**: features nuevas, archivos creados, dependencias agregadas.
- **Changed**: comportamiento, copy, estructura, dependencias modificadas.
- **Fixed**: bugs corregidos (incluye qué pasaba antes y causa raíz si es no obvia).
- **Removed**: features o archivos eliminados.
- **Security**: solo si hay implicación de seguridad.

**Reglas de escritura**:
- Un bullet por cambio atómico. Verbo al inicio (en pasado o presente continuo, consistente).
- Incluye **archivo:línea** o ruta cuando ayude (`components/hero-section.tsx`).
- Si el cambio se hizo en varias capas, agrupa en un bullet pero menciona las capas (`...en navigation, footer, sitemap`).
- Si el conteo o un valor cambió, registra de→a (`33 → 27 países`).
- **Español natural**, no jerga innecesaria. Pero términos técnicos OK (`SSR`, `bbox`, `pointer-events`).

### Paso 2 — Crea/actualiza el devlog del día

Ruta: `Obsidian-1/devlog/YYYY-MM-DD.md`.

Si no existe, copia `_TEMPLATE.md` como base y llena todas las secciones:

- **Resumen**: 1-2 frases que respondan "¿qué se intentó y por qué importaba?".
- **Lo que se hizo**: lista temática (no estrictamente cronológica). Para cada bloque: archivos tocados, en qué orden, qué resultado.
- **Decisiones clave**: solo decisiones NO obvias. Formato: contexto → opciones consideradas → decisión → por qué (1-2 frases).
- **Lo que se rompió y se arregló**: bugs detectados durante la sesión. Incluye **causa raíz**, no solo el síntoma.
- **Pendientes para próxima sesión**: lista de checkboxes. Si requiere decisión externa, etiquétalo `[BLOQUEADO: <quién decide>]`.
- **Métricas / observaciones**: opcional. Tiempos de build, regresiones, validaciones cualitativas.

### Paso 3 — Verificación final

Antes de cerrar:
- [ ] El CHANGELOG tiene una entrada para la fecha de hoy con al menos una categoría.
- [ ] El devlog del día existe en `devlog/` con todas las secciones llenas (incluso si dicen "sin novedad").
- [ ] Las rutas, archivos y conteos mencionados son correctos (verifica con `ls`, `grep` o lectura directa antes de afirmar).
- [ ] Si removiste algo en el código, está en `Removed` del CHANGELOG, no solo en `Changed`.

---

## Qué incluir y qué excluir

### Sí incluir
- El **porqué** no obvio de una decisión.
- Alternativas que se consideraron y se descartaron.
- Causa raíz de bugs.
- Trade-offs aceptados (qué se ganó / qué se perdió).
- Convenciones nuevas que el equipo debe seguir hacia adelante.
- Rutas/archivos/comandos clave para reproducir el trabajo.

### No incluir
- El **qué** que cualquiera puede leer del `git diff`.
- Cambios cosméticos de formato/lint.
- Detalles de implementación que viven mejor en comentarios del código.
- Conversación o quejas (esto va en notas personales, no en docs públicas).
- Información sensible (claves, emails personales, datos de donantes).

---

## Ejemplo mínimo de buena entrada

### CHANGELOG.md

```markdown
## [2026-06-15]

### Changed
- Migración del paquete `motion` de v12 a v13. Sin cambios de API en el código del observatorio; verificación manual de animaciones en hero y mapa.

### Fixed
- Tooltip del glosario quedaba detrás del modal del panel del país en mobile. Causa raíz: z-index del Radix Portal sobrescrito por el panel. Fix: subir z-index del TooltipContent a `z-[60]`.
```

### devlog/2026-06-15.md

```markdown
---
fecha: 2026-06-15
autor: María (voluntaria)
sesion: Upgrade motion v13 + fix tooltip mobile
---

# Devlog — 2026-06-15

## Resumen
Upgrade de dependencia menor + un bug visual en mobile que ya se había reportado dos veces.

## Lo que se hizo
- **Motion v13**: `package.json` actualizado, `bun install`, smoke test en /, /metodologia.
- **Tooltip z-index**: detectado en iPhone 13 Safari. Cambio en `components/ui/tooltip.tsx:18`.

## Decisiones clave
- **Decisión**: subir z-index sólo del TooltipContent, no de todo el Portal.
  - Por qué: el Portal es compartido por otros componentes Radix que sí queremos detrás de modales.

## Lo que se rompió y se arregló
- **Tooltip oculto en mobile**: ya descrito arriba.

## Pendientes
- [ ] Probar tooltip en Android Chrome (no tengo acceso, pasarlo a otro voluntario).
```

---

## Notas para LLMs

- Si el usuario te pide solo "actualiza el CHANGELOG", omite el devlog (asume que él lo escribirá manualmente).
- Si te pide solo "documenta esta sesión", actualiza **ambos** archivos.
- Cuando tengas duda sobre la fecha, usa la fecha actual del sistema, no inventes.
- Cuando agregues archivos o decisiones desconocidas, **léelos primero** del repo o pregunta. No alucines rutas.
- Las convenciones de la bóveda (comentarios `%%texto%%`, frontmatter en devlogs) son específicas de Obsidian; respétalas.

---

## Documentos relacionados

- [[CHANGELOG]] — el archivo principal que esta skill mantiene
- [[_TEMPLATE|plantilla de devlog]] — para crear nuevas entradas
- [[2026-05-26|ejemplo de devlog completo]]
- [[README]] — índice general de la bóveda
