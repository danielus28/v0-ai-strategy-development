"use client"

import type React from "react"

import { useState, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  isoMembershipData,
  egdiData,
  gciData,
  gariData,
  iliaData,
  oecdPoliciesData,
  getCountryData,
  type LayerType,
} from "@/lib/data"
import { Button } from "@/components/ui/button"
import { X, Info } from "lucide-react"

const layers: { id: LayerType; label: string; source: string; year: string }[] = [
  { id: "iso", label: "Voz en estándares ISO/IEC", source: "ISO SC 42 / SC 27", year: "2024" },
  { id: "egdi", label: "Madurez de gobierno digital", source: "UN EGDI", year: "2024" },
  { id: "gci", label: "Ciberseguridad", source: "ITU GCI", year: "2024" },
  { id: "gari", label: "Preparación gubernamental IA", source: "Oxford Insights", year: "2023" },
  { id: "ilia", label: "Gobernanza IA LATAM", source: "CEPAL ILIA", year: "2025" },
  { id: "oecd", label: "Políticas de IA", source: "OECD.AI", year: "2024" },
]

// Grid dimensions and dot styling
const DOT_SIZE = 8
const DOT_GAP = 10
const MAP_WIDTH = 320
const MAP_HEIGHT = 520

// Each country is defined by an array of [row, col] coordinates
// The coordinates are designed to form the accurate silhouette of Latin America
const countryDots: Record<string, [number, number][]> = {
  // Mexico - Northwestern region with Baja California
  MEX: [
    // Baja California peninsula
    [0, 4],
    [1, 4],
    [2, 3],
    [3, 3],
    [4, 2],
    [5, 2],
    [6, 2],
    // Northern Mexico
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
    [2, 10],
    [2, 11],
    // Central Mexico
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
    [3, 8],
    [3, 9],
    [3, 10],
    [3, 11],
    [4, 5],
    [4, 6],
    [4, 7],
    [4, 8],
    [4, 9],
    [4, 10],
    [4, 11],
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9],
    [5, 10],
    [5, 11],
    // Southern Mexico / Yucatan
    [6, 7],
    [6, 8],
    [6, 9],
    [6, 10],
    [6, 11],
    [6, 12],
    [6, 13],
    [7, 8],
    [7, 9],
    [7, 10],
    [7, 11],
    [7, 12],
    [7, 13],
    [8, 10],
    [8, 11],
    [8, 12],
  ],
  // Guatemala
  GTM: [
    [9, 10],
    [9, 11],
    [10, 10],
    [10, 11],
  ],
  // Belize
  BLZ: [
    [8, 13],
    [9, 13],
  ],
  // Honduras
  HND: [
    [9, 12],
    [10, 12],
    [10, 13],
  ],
  // El Salvador
  SLV: [
    [11, 10],
    [11, 11],
  ],
  // Nicaragua
  NIC: [
    [11, 12],
    [11, 13],
    [12, 12],
    [12, 13],
  ],
  // Costa Rica
  CRI: [
    [13, 13],
    [13, 14],
  ],
  // Panama
  PAN: [
    [14, 14],
    [14, 15],
    [14, 16],
  ],
  // Cuba
  CUB: [
    [7, 15],
    [7, 16],
    [7, 17],
    [7, 18],
    [8, 16],
    [8, 17],
    [8, 18],
    [8, 19],
  ],
  // Jamaica
  JAM: [
    [10, 16],
    [10, 17],
  ],
  // Haiti
  HTI: [
    [9, 19],
    [9, 20],
    [10, 19],
  ],
  // Dominican Republic
  DOM: [
    [9, 21],
    [9, 22],
    [10, 21],
    [10, 22],
  ],
  // Puerto Rico
  PRI: [[10, 23]],
  // Trinidad and Tobago
  TTO: [[17, 24]],
  // Colombia
  COL: [
    [15, 14],
    [15, 15],
    [15, 16],
    [16, 13],
    [16, 14],
    [16, 15],
    [16, 16],
    [16, 17],
    [17, 13],
    [17, 14],
    [17, 15],
    [17, 16],
    [17, 17],
    [18, 14],
    [18, 15],
    [18, 16],
    [18, 17],
    [19, 15],
    [19, 16],
  ],
  // Venezuela
  VEN: [
    [15, 17],
    [15, 18],
    [15, 19],
    [15, 20],
    [16, 18],
    [16, 19],
    [16, 20],
    [16, 21],
    [16, 22],
    [17, 18],
    [17, 19],
    [17, 20],
    [17, 21],
    [17, 22],
    [18, 18],
    [18, 19],
    [18, 20],
    [18, 21],
    [19, 19],
    [19, 20],
  ],
  // Guyana
  GUY: [
    [16, 23],
    [17, 23],
    [18, 22],
    [18, 23],
  ],
  // Suriname
  SUR: [
    [17, 24],
    [18, 24],
  ],
  // Ecuador
  ECU: [
    [20, 13],
    [20, 14],
    [21, 13],
    [21, 14],
    [22, 14],
  ],
  // Peru
  PER: [
    [20, 15],
    [20, 16],
    [21, 15],
    [21, 16],
    [22, 15],
    [22, 16],
    [22, 17],
    [23, 14],
    [23, 15],
    [23, 16],
    [23, 17],
    [24, 14],
    [24, 15],
    [24, 16],
    [25, 15],
    [25, 16],
  ],
  // Brazil - The largest country
  BRA: [
    // Northern Brazil
    [18, 25],
    [18, 26],
    [19, 21],
    [19, 22],
    [19, 23],
    [19, 24],
    [19, 25],
    [19, 26],
    [19, 27],
    [20, 17],
    [20, 18],
    [20, 19],
    [20, 20],
    [20, 21],
    [20, 22],
    [20, 23],
    [20, 24],
    [20, 25],
    [20, 26],
    [20, 27],
    [20, 28],
    [21, 17],
    [21, 18],
    [21, 19],
    [21, 20],
    [21, 21],
    [21, 22],
    [21, 23],
    [21, 24],
    [21, 25],
    [21, 26],
    [21, 27],
    [21, 28],
    [21, 29],
    // Central Brazil
    [22, 18],
    [22, 19],
    [22, 20],
    [22, 21],
    [22, 22],
    [22, 23],
    [22, 24],
    [22, 25],
    [22, 26],
    [22, 27],
    [22, 28],
    [22, 29],
    [23, 18],
    [23, 19],
    [23, 20],
    [23, 21],
    [23, 22],
    [23, 23],
    [23, 24],
    [23, 25],
    [23, 26],
    [23, 27],
    [23, 28],
    [23, 29],
    [24, 17],
    [24, 18],
    [24, 19],
    [24, 20],
    [24, 21],
    [24, 22],
    [24, 23],
    [24, 24],
    [24, 25],
    [24, 26],
    [24, 27],
    [24, 28],
    [25, 17],
    [25, 18],
    [25, 19],
    [25, 20],
    [25, 21],
    [25, 22],
    [25, 23],
    [25, 24],
    [25, 25],
    [25, 26],
    [25, 27],
    // Southern Brazil
    [26, 18],
    [26, 19],
    [26, 20],
    [26, 21],
    [26, 22],
    [26, 23],
    [26, 24],
    [26, 25],
    [26, 26],
    [27, 19],
    [27, 20],
    [27, 21],
    [27, 22],
    [27, 23],
    [27, 24],
    [27, 25],
    [28, 20],
    [28, 21],
    [28, 22],
    [28, 23],
    [28, 24],
    [29, 21],
    [29, 22],
    [29, 23],
  ],
  // Bolivia
  BOL: [
    [24, 17],
    [25, 17],
    [25, 18],
    [26, 16],
    [26, 17],
    [26, 18],
    [27, 16],
    [27, 17],
    [27, 18],
  ],
  // Paraguay
  PRY: [
    [28, 18],
    [28, 19],
    [29, 18],
    [29, 19],
    [29, 20],
    [30, 19],
  ],
  // Uruguay
  URY: [
    [31, 21],
    [31, 22],
    [32, 21],
  ],
  // Argentina - Long country
  ARG: [
    [28, 16],
    [28, 17],
    [29, 15],
    [29, 16],
    [29, 17],
    [30, 15],
    [30, 16],
    [30, 17],
    [30, 18],
    [31, 15],
    [31, 16],
    [31, 17],
    [31, 18],
    [31, 19],
    [31, 20],
    [32, 15],
    [32, 16],
    [32, 17],
    [32, 18],
    [32, 19],
    [32, 20],
    [33, 14],
    [33, 15],
    [33, 16],
    [33, 17],
    [33, 18],
    [34, 14],
    [34, 15],
    [34, 16],
    [34, 17],
    [35, 13],
    [35, 14],
    [35, 15],
    [35, 16],
    [36, 13],
    [36, 14],
    [36, 15],
    [37, 13],
    [37, 14],
    [38, 13],
    [38, 14],
    [39, 13],
    [40, 13],
    [41, 13],
    [42, 14],
    [43, 15],
  ],
  // Chile - Long thin country along the west coast
  CHL: [
    [26, 15],
    [27, 15],
    [28, 14],
    [28, 15],
    [29, 14],
    [30, 14],
    [31, 14],
    [32, 14],
    [33, 13],
    [34, 13],
    [35, 12],
    [36, 12],
    [37, 12],
    [38, 12],
    [39, 12],
    [40, 12],
    [41, 12],
    [42, 13],
    [43, 14],
  ],
}

function getColorForLayer(iso3: string, layer: LayerType): string {
  switch (layer) {
    case "iso": {
      const data = isoMembershipData.find((d) => d.iso3 === iso3)
      if (!data) return "#4A4A4A"
      if (data.sc42_status === "P") return "#C9A227"
      if (data.sc42_status === "O") return "#F8F6F1"
      return "#6B6B6B"
    }
    case "egdi": {
      const data = egdiData.find((d) => d.iso3 === iso3)
      if (!data) return "#4A4A4A"
      const score = data.egdi_2024
      if (score >= 0.8) return "#C9A227"
      if (score >= 0.7) return "#D4B84A"
      if (score >= 0.6) return "#8A8A6A"
      if (score >= 0.5) return "#6B6B6B"
      return "#4A4A4A"
    }
    case "gci": {
      const data = gciData.find((d) => d.iso3 === iso3)
      if (!data) return "#4A4A4A"
      const score = data.gci_2024
      if (score >= 80) return "#C9A227"
      if (score >= 60) return "#D4B84A"
      if (score >= 40) return "#8A8A6A"
      if (score >= 25) return "#6B6B6B"
      return "#4A4A4A"
    }
    case "gari": {
      const data = gariData.find((d) => d.iso3 === iso3)
      if (!data || data.gari_score === null) return "#4A4A4A"
      const score = data.gari_score
      if (score >= 55) return "#C9A227"
      if (score >= 45) return "#D4B84A"
      if (score >= 35) return "#8A8A6A"
      if (score >= 28) return "#6B6B6B"
      return "#4A4A4A"
    }
    case "ilia": {
      const data = iliaData.find((d) => d.iso3 === iso3)
      if (!data) return "#4A4A4A"
      const score = data.ilia_governance_score
      if (score >= 75) return "#C9A227"
      if (score >= 60) return "#D4B84A"
      if (score >= 40) return "#8A8A6A"
      if (score >= 25) return "#6B6B6B"
      return "#4A4A4A"
    }
    case "oecd": {
      const data = oecdPoliciesData.find((d) => d.iso3 === iso3)
      if (!data) return "#4A4A4A"
      const policies = data.total_policies
      if (policies >= 50) return "#C9A227"
      if (policies >= 25) return "#D4B84A"
      if (policies >= 15) return "#8A8A6A"
      if (policies >= 5) return "#6B6B6B"
      return "#4A4A4A"
    }
    default:
      return "#4A4A4A"
  }
}

export function LatamMapSection() {
  const [activeLayer, setActiveLayer] = useState<LayerType>("gari")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const selectedCountryData = useMemo(() => {
    if (!selectedCountry) return null
    return getCountryData(selectedCountry)
  }, [selectedCountry])

  const activeLayerInfo = layers.find((l) => l.id === activeLayer)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  // Generate all dots with country assignments
  const allDots = useMemo(() => {
    const dots: { row: number; col: number; country: string | null; color: string }[] = []

    // Create a map of positions to countries
    const positionMap = new Map<string, string>()
    Object.entries(countryDots).forEach(([country, positions]) => {
      positions.forEach(([row, col]) => {
        positionMap.set(`${row}-${col}`, country)
      })
    })

    // Generate dots for all positions that have countries
    positionMap.forEach((country, key) => {
      const [row, col] = key.split("-").map(Number)
      dots.push({
        row,
        col,
        country,
        color: getColorForLayer(country, activeLayer),
      })
    })

    return dots
  }, [activeLayer])

  return (
    <section className="py-20 px-6 bg-[#0D0D0D] text-[#F8F6F1]" id="mapa-regional">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A227]/10 text-[#C9A227] rounded-full font-mono text-sm mb-4">
            Pieza Central
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-balance">Mapa Regional LATAM</h2>
          <p className="text-lg text-[#F8F6F1]/60 max-w-3xl leading-relaxed">
            Explora las diferentes capas de datos sobre gobernanza de IA en la región. Selecciona un país para ver su
            perfil completo.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Map Area */}
          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-6">
            {/* Layer Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeLayer === layer.id
                      ? "bg-[#C9A227] text-[#0D0D0D]"
                      : "bg-[#2A2A2A] text-[#F8F6F1]/70 hover:bg-[#3A3A3A] hover:text-[#F8F6F1]",
                  )}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            {/* Active layer info */}
            <div className="mb-6 p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] flex items-center gap-3">
              <Info className="w-4 h-4 text-[#C9A227]" />
              <div className="font-mono text-sm text-[#F8F6F1]/70">
                <span className="font-medium text-[#F8F6F1]">{activeLayerInfo?.label}</span>
                <span className="mx-2">·</span>
                <span>
                  {activeLayerInfo?.source} ({activeLayerInfo?.year})
                </span>
              </div>
            </div>

            {/* Dot Matrix Map */}
            <div ref={mapRef} className="relative flex justify-center py-8" onMouseMove={handleMouseMove}>
              <div
                className="relative"
                style={{
                  width: MAP_WIDTH,
                  height: MAP_HEIGHT,
                }}
              >
                {allDots.map(({ row, col, country, color }, idx) => {
                  const isHovered = hoveredCountry === country
                  const isSelected = selectedCountry === country

                  return (
                    <motion.div
                      key={`${row}-${col}`}
                      className="absolute rounded-full cursor-pointer"
                      style={{
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        left: col * DOT_GAP,
                        top: row * DOT_GAP,
                        backgroundColor: color,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isHovered || isSelected ? 1.3 : 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.002,
                      }}
                      onMouseEnter={() => country && setHoveredCountry(country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => country && setSelectedCountry(country)}
                    />
                  )
                })}
              </div>

              {/* Hover tooltip */}
              <AnimatePresence>
                {hoveredCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute pointer-events-none z-10 px-3 py-2 bg-[#0D0D0D] border border-[#C9A227] rounded-lg shadow-lg"
                    style={{
                      left: Math.min(mousePos.x + 15, (mapRef.current?.clientWidth || 0) - 150),
                      top: mousePos.y - 10,
                    }}
                  >
                    <div className="font-mono text-xs text-[#C9A227]">{hoveredCountry}</div>
                    <div className="text-sm font-medium text-[#F8F6F1]">
                      {getCountryData(hoveredCountry)?.country || hoveredCountry}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Color Legend */}
              <div className="absolute bottom-4 left-4 bg-[#0D0D0D]/95 backdrop-blur p-4 rounded-lg border border-[#2A2A2A]">
                <div className="text-xs font-mono font-medium mb-3 text-[#F8F6F1]/50 uppercase tracking-wide">
                  Escala
                </div>
                <div className="flex gap-3 items-center">
                  {[
                    { color: "#C9A227", label: "Alto" },
                    { color: "#D4B84A", label: "" },
                    { color: "#8A8A6A", label: "Medio" },
                    { color: "#6B6B6B", label: "" },
                    { color: "#4A4A4A", label: "Bajo" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label && <span className="text-[9px] text-[#F8F6F1]/50 font-mono">{item.label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Country Drawer */}
          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-6">
            <AnimatePresence mode="wait">
              {selectedCountryData ? (
                <motion.div
                  key={selectedCountryData.iso3}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold">{selectedCountryData.country}</h3>
                      <span className="font-mono text-sm text-[#C9A227]">{selectedCountryData.iso3}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCountry(null)}
                      className="h-8 w-8 p-0 text-[#F8F6F1]/50 hover:text-[#F8F6F1] hover:bg-[#2A2A2A]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* ISO Membership */}
                    <div className="p-4 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A]">
                      <div className="text-xs font-mono text-[#F8F6F1]/50 mb-3 uppercase tracking-wide">
                        Membresía ISO
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-2 text-[#F8F6F1]/70">SC 42 (IA)</div>
                          <div
                            className={cn(
                              "inline-block px-3 py-1.5 rounded text-xs font-mono font-medium",
                              selectedCountryData.sc42_status === "P"
                                ? "bg-[#C9A227] text-[#0D0D0D]"
                                : selectedCountryData.sc42_status === "O"
                                  ? "bg-[#F8F6F1] text-[#0D0D0D]"
                                  : "bg-[#2A2A2A] text-[#F8F6F1]/50",
                            )}
                          >
                            {selectedCountryData.sc42_status === "P"
                              ? "P-member"
                              : selectedCountryData.sc42_status === "O"
                                ? "O-member"
                                : "Sin membresía"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2 text-[#F8F6F1]/70">SC 27 (Cyber)</div>
                          <div
                            className={cn(
                              "inline-block px-3 py-1.5 rounded text-xs font-mono font-medium",
                              selectedCountryData.sc27_status === "P"
                                ? "bg-[#C9A227] text-[#0D0D0D]"
                                : selectedCountryData.sc27_status === "O"
                                  ? "bg-[#F8F6F1] text-[#0D0D0D]"
                                  : "bg-[#2A2A2A] text-[#F8F6F1]/50",
                            )}
                          >
                            {selectedCountryData.sc27_status === "P"
                              ? "P-member"
                              : selectedCountryData.sc27_status === "O"
                                ? "O-member"
                                : "Sin membresía"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="space-y-3">
                      {selectedCountryData.egdi_2024 !== undefined && (
                        <ScoreBar label="EGDI 2024" value={selectedCountryData.egdi_2024} max={1} />
                      )}
                      {selectedCountryData.gci_2024 !== undefined && (
                        <ScoreBar label="GCI 2024" value={selectedCountryData.gci_2024} max={100} />
                      )}
                      {selectedCountryData.gari_score !== undefined && selectedCountryData.gari_score !== null && (
                        <ScoreBar label="GARI 2023" value={selectedCountryData.gari_score} max={100} />
                      )}
                      {selectedCountryData.ilia_governance_score !== undefined && (
                        <ScoreBar label="ILIA 2025" value={selectedCountryData.ilia_governance_score} max={100} />
                      )}
                    </div>

                    {/* OECD Policies */}
                    {selectedCountryData.total_policies !== undefined && selectedCountryData.total_policies > 0 && (
                      <div className="p-4 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A]">
                        <div className="text-xs font-mono text-[#F8F6F1]/50 mb-2 uppercase tracking-wide">
                          Políticas OECD.AI
                        </div>
                        <div className="text-2xl font-bold text-[#C9A227]">{selectedCountryData.total_policies}</div>
                        <div className="text-sm text-[#F8F6F1]/50">políticas registradas</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-4">
                    <Info className="w-8 h-8 text-[#F8F6F1]/30" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Selecciona un país</h3>
                  <p className="text-sm text-[#F8F6F1]/50 max-w-[250px]">
                    Haz clic en cualquier país del mapa para ver su perfil completo de gobernanza de IA.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100
  const displayValue = max === 1 ? value.toFixed(3) : value.toFixed(1)

  return (
    <div className="p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-[#F8F6F1]/50 uppercase tracking-wide">{label}</span>
        <span className="font-mono text-sm font-medium text-[#C9A227]">{displayValue}</span>
      </div>
      <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #C9A227 0%, #D4B84A 100%)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
