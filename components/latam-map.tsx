"use client"

import { useMemo } from "react"
import { MAP_DOTS, MAP_VIEWBOX } from "@/lib/latam-map-data"

interface LatamMapProps {
  fillByCountry: Record<string, string>
  hoveredCountry: string | null
  selectedCountry: string | null
  onHover: (country: string | null) => void
  onSelect: (country: string) => void
  countryLabels?: Record<string, string>
  noDataColor?: string
}

interface CountryGeom {
  dots: Array<readonly [number, number]>
  bbox: { x: number; y: number; w: number; h: number }
}

const HIT_PADDING = 2.5

export function LatamMap({
  fillByCountry,
  hoveredCountry,
  selectedCountry,
  onHover,
  onSelect,
  countryLabels,
  noDataColor = "#262626",
}: LatamMapProps) {
  const countries = useMemo(() => {
    const map = new Map<string, CountryGeom>()
    for (const [cx, cy, country] of MAP_DOTS) {
      let entry = map.get(country)
      if (!entry) {
        entry = { dots: [], bbox: { x: cx, y: cy, w: 0, h: 0 } }
        map.set(country, entry)
      }
      entry.dots.push([cx, cy])
      const x0 = Math.min(entry.bbox.x, cx)
      const y0 = Math.min(entry.bbox.y, cy)
      const x1 = Math.max(entry.bbox.x + entry.bbox.w, cx)
      const y1 = Math.max(entry.bbox.y + entry.bbox.h, cy)
      entry.bbox = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }
    }
    // Render largest countries first so smaller ones land on top in z-order
    // and win the click when bounding boxes overlap (e.g. MEX vs GTM/BLZ).
    return Array.from(map.entries()).sort(
      (a, b) => b[1].bbox.w * b[1].bbox.h - a[1].bbox.w * a[1].bbox.h,
    )
  }, [])

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      role="img"
      aria-label="Mapa de América Latina y el Caribe con países coloreados según la capa de datos seleccionada"
      style={{ width: "100%", height: "auto", display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {countries.map(([country, geom]) => {
        const active = country === hoveredCountry || country === selectedCountry
        const fill = fillByCountry[country] ?? noDataColor
        const label = countryLabels?.[country] ?? country
        return (
          <g
            key={country}
            data-country={country}
            role="button"
            tabIndex={0}
            aria-label={`${label}. Pulsa para ver detalles.`}
            onMouseEnter={() => onHover(country)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(country)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(country)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect(country)
              }
            }}
            style={{
              cursor: "pointer",
              outline: "none",
              filter: active ? "drop-shadow(0 0 4px rgba(201,162,39,0.9))" : undefined,
              transition: "filter 200ms ease",
            }}
          >
            {/* Invisible hit area: covers the whole cluster bounding box so clicks
                between dots still register on the country. */}
            <rect
              x={geom.bbox.x - HIT_PADDING}
              y={geom.bbox.y - HIT_PADDING}
              width={geom.bbox.w + HIT_PADDING * 2}
              height={geom.bbox.h + HIT_PADDING * 2}
              fill="black"
              fillOpacity={0}
              style={{ pointerEvents: "all" }}
            />
            {geom.dots.map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={active ? 2.8 : 1.8}
                fill={fill}
                stroke={active ? "#C9A227" : "none"}
                strokeWidth={active ? 1.5 : 0}
                style={{ pointerEvents: "none", transition: "fill 250ms ease, r 200ms ease" }}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
