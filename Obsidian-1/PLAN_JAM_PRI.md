# Plan — Sumar Jamaica (JAM) y Puerto Rico (PRI) al mapa LATAM

> Por qué importan: el subtítulo del observatorio habla de "los países de la región"; ambas islas son parte de la región y hoy faltan del SVG. El componente original los listaba pero el SVG nunca se generó con ellos.

---

## Cómo está hecho el mapa hoy

El SVG actual (`public/latam-map.svg`) es un **mapa de puntos**: cada país está representado por un cluster de `<circle>` posicionados sobre la silueta del territorio. La grilla está espaciada cada ~5.92 unidades en un viewBox de `440 × 468.81`.

Cada dot tiene:
```svg
<circle class="dot" cx="X" cy="Y" r="1.8" data-country="ISO3" />
```

Los dots se generaron con un script externo (probablemente Python + GeoPandas + Shapely) a partir de un shapefile o GeoJSON. **No tenemos ese script aquí.**

---

## Opciones para sumar JAM y PRI

### Opción A — Regenerar el SVG desde un GeoJSON oficial *(recomendada, profesional)*

Pedir/escribir un pequeño script (Python o Node) que:

1. Lea un GeoJSON de LATAM + Caribe (ej: `naturalearth_lowres` filtrado por región, o un dataset de la ONU/OEA).
2. Para cada país, samplee puntos dentro del polígono con una grilla hex de spacing 5.92.
3. Reproyecte coordenadas geográficas → coordenadas del viewBox 440 × 468.81.
4. Escriba el nuevo `latam-map.svg` con todos los países que queramos incluir (incluyendo JAM, PRI, BHS, JAM, BRB, etc.).
5. Re-ejecute la extracción a `lib/latam-map-data.ts` (ya tenemos el bash script en el comentario del archivo).

**Pros:** reproducible, escalable, calidad consistente.
**Contras:** requiere ~1-2 horas de scripting. Idealmente lo hace el/la analista de datos que estamos reclutando.

### Opción B — Agregar manualmente los clusters al SVG *(rápida, parche)*

1. Identificar visualmente la posición aproximada de JAM (al sur de Cuba) y PRI (al este de DOM) en el viewBox actual.
2. Agregar 3-5 dots para cada uno con `cx/cy` calculados a ojo, asegurándose que no se solapen con CUB ni DOM.
3. Re-correr la extracción a `lib/latam-map-data.ts`.

Posiciones aproximadas (a verificar visualmente):
- **JAM** (Jamaica): `cx ≈ 245, cy ≈ 175` (al SO de CUB)
- **PRI** (Puerto Rico): `cx ≈ 305, cy ≈ 175` (al E de DOM)

Cada uno con 2-3 dots para que se vea como una pequeña isla:
```svg
<g id="JAM">
  <circle class="dot" cx="243" cy="175" r="1.8" data-country="JAM"/>
  <circle class="dot" cx="249" cy="175" r="1.8" data-country="JAM"/>
</g>

<g id="PRI">
  <circle class="dot" cx="303" cy="175" r="1.8" data-country="PRI"/>
  <circle class="dot" cx="309" cy="175" r="1.8" data-country="PRI"/>
</g>
```

**Pros:** se hace en 10 minutos.
**Contras:** estética inconsistente con el resto (clusters más pequeños), posición aproximada, no escalable si después se quiere agregar más microestados.

### Opción C — Usar un mapa hex preexistente *(mediano)*

Datasets como [d3-composite-projections](https://github.com/rveciana/d3-composite-projections) o [topojson/world-atlas](https://github.com/topojson/world-atlas) tienen geometrías oficiales. Adaptar uno de estos a nuestro formato de dots requiere scripting similar a la Opción A pero parte de datos validados.

---

## Decisión recomendada

1. **Corto plazo (esta semana):** Opción B — agregar JAM y PRI manualmente para no esperar. Actualizar el copy de "25 países" a "27 países" en hero, metadata, opengraph-image, sitemap y JSON-LD.

2. **Mediano plazo (próximo sprint):** Opción A — cuando el/la analista de datos se sume al equipo, regenerar todo el SVG desde fuente oficial. Permite también incluir microestados del Caribe (BRB, LCA, ATG, GRD, KNA, VCT, DMA) si decidimos cubrirlos.

---

## Pasos para ejecutar Opción B (cuando confirmes)

Cuando decidas, te puedo:

1. Editar `public/latam-map.svg` agregando los `<g id="JAM">` y `<g id="PRI">` con dots manuales.
2. Re-ejecutar la extracción a `lib/latam-map-data.ts` con el comando:
   ```bash
   { echo '// Auto-generated from public/latam-map.svg. Edit the SVG, then re-run the extraction.'
     echo 'export const MAP_VIEWBOX = "0 0 440 468.81" as const'
     echo ''
     echo 'export type MapDot = readonly [cx: number, cy: number, country: string]'
     echo ''
     echo 'export const MAP_DOTS: ReadonlyArray<MapDot> = ['
     grep -oE 'cx="[0-9.]+" cy="[0-9.]+" r="[0-9.]+" data-country="[A-Z]+"' public/latam-map.svg \
       | sed -E 's|cx="([0-9.]+)" cy="([0-9.]+)" r="[0-9.]+" data-country="([A-Z]+)"|  [\1, \2, "\3"],|'
     echo '] as const'
     echo ''
     echo 'export const MAP_COUNTRIES: ReadonlyArray<string> = ['
     grep -oE 'data-country="[A-Z]+"' public/latam-map.svg | sed -E 's|data-country="([A-Z]+)"|\1|' | sort -u | sed -E 's|^(.+)$|  "\1",|'
     echo '] as const'
   } > lib/latam-map-data.ts
   ```
3. Actualizar el conteo de países a 27 en hero, metadata, opengraph-image.

¿Procedemos con la Opción B mientras esperamos el/la analista, o prefieres esperar a tener Opción A bien hecha?
