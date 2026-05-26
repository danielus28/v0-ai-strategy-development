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

export function LatamMap({
  fillByCountry,
  hoveredCountry,
  selectedCountry,
  onHover,
  onSelect,
  countryLabels,
  noDataColor = "#262626",
}: LatamMapProps) {
  const dotsByCountry = useMemo(() => {
    const map = new Map<string, Array<readonly [number, number]>>()
    for (const [cx, cy, country] of MAP_DOTS) {
      let arr = map.get(country)
      if (!arr) {
        arr = []
        map.set(country, arr)
      }
      arr.push([cx, cy])
    }
    return Array.from(map.entries())
  }, [])

  return (
    <svg
      viewBox={MAP_VIEWBOX}
      role="img"
      aria-label="Mapa de América Latina y el Caribe con países coloreados según la capa de datos seleccionada"
      style={{ width: "100%", height: "auto", display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {dotsByCountry.map(([country, dots]) => {
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
            {dots.map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={active ? 2.8 : 1.8}
                fill={fill}
                stroke={active ? "#C9A227" : "none"}
                strokeWidth={active ? 1.5 : 0}
                style={{ transition: "fill 250ms ease, r 200ms ease" }}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
