"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { getCountryData, COUNTRY_NAMES_ES, type LayerType } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { X, Info } from "lucide-react"

const layers: { id: LayerType; label: string; source: string; year: string; note?: string }[] = [
  { id: "iso", label: "Voz en estándares ISO/IEC", source: "ISO SC 42 / SC 27", year: "2024" },
  { id: "egdi", label: "Madurez de gobierno digital", source: "UN EGDI", year: "2024" },
  { id: "gci", label: "Ciberseguridad", source: "ITU GCI", year: "2024" },
  { id: "gari", label: "Preparación gubernamental IA", source: "Oxford Insights GARI", year: "2023" },
  { id: "ilia", label: "Gobernanza IA LATAM", source: "CEPAL ILIA", year: "2025", note: "Preliminar" },
  { id: "oecd", label: "Políticas de IA", source: "OECD.AI", year: "2024", note: "Cobertura parcial" },
]

const NO_DATA = "no-data"
type Bucket = "high" | "medium-high" | "medium" | "medium-low" | "low" | typeof NO_DATA

const BUCKET_COLORS: Record<Bucket, string> = {
  high: "#C9A227",
  "medium-high": "#D4B84A",
  medium: "#A89358",
  "medium-low": "#7A6E48",
  low: "#4F4838",
  [NO_DATA]: "#262626",
}

const BUCKET_LABELS: Record<Bucket, string> = {
  high: "Alto",
  "medium-high": "Medio-alto",
  medium: "Medio",
  "medium-low": "Medio-bajo",
  low: "Bajo",
  [NO_DATA]: "Sin datos",
}

function getBucket(iso3: string, layer: LayerType): Bucket {
  const data = getCountryData(iso3)
  if (!data) return NO_DATA

  if (layer === "iso") {
    if (data.sc42_status === "P") return "high"
    if (data.sc42_status === "O") return "medium-high"
    if (data.sc42_status === "None") return "low"
    return NO_DATA
  }

  let value: number | undefined
  let max = 100
  switch (layer) {
    case "egdi":
      value = data.egdi_2024
      max = 1
      break
    case "gci":
      value = data.gci_2024
      break
    case "gari":
      value = data.gari_score
      break
    case "ilia":
      value = data.ilia_governance_score
      break
    case "oecd":
      value = data.total_policies
      max = 50
      break
  }
  if (value === undefined || value === null) return NO_DATA
  const ratio = Math.min(value / max, 1)
  if (ratio >= 0.8) return "high"
  if (ratio >= 0.6) return "medium-high"
  if (ratio >= 0.4) return "medium"
  if (ratio >= 0.2) return "medium-low"
  return "low"
}

const COUNTRIES = [
  "ARG", "BRA", "CHL", "COL", "MEX", "PER", "URY", "PRY", "BOL", "ECU",
  "VEN", "GUY", "SUR", "GTM", "HND", "SLV", "NIC", "CRI", "PAN", "BLZ",
  "CUB", "DOM", "HTI", "JAM", "TTO", "PRI",
]

export function LatamMapSection() {
  const [activeLayer, setActiveLayer] = useState<LayerType>("gari")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [svgLoaded, setSvgLoaded] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)

  const selectedCountryData = selectedCountry ? getCountryData(selectedCountry) : null
  const activeLayerInfo = layers.find((l) => l.id === activeLayer)

  const bucketMap = useMemo(() => {
    const map: Record<LayerType, Record<string, Bucket>> = {} as any
    layers.forEach((l) => {
      map[l.id] = {}
      COUNTRIES.forEach((iso) => {
        map[l.id][iso] = getBucket(iso, l.id)
      })
    })
    return map
  }, [])

  useEffect(() => {
    let cancelled = false
    const handlers: Array<{ el: SVGCircleElement; type: string; fn: EventListenerOrEventListenerObject }> = []

    const loadSVG = async () => {
      if (!svgContainerRef.current) return
      try {
        const response = await fetch("/latam-map.svg")
        const svgText = await response.text()
        if (cancelled || !svgContainerRef.current) return
        svgContainerRef.current.innerHTML = svgText

        const svg = svgContainerRef.current.querySelector("svg")
        if (!svg) return
        svg.style.width = "100%"
        svg.style.height = "auto"
        svg.style.maxWidth = "700px"
        svg.setAttribute("role", "img")
        svg.setAttribute("aria-label", "Mapa de América Latina y el Caribe con países coloreados según la capa de datos seleccionada")

        const circles = svg.querySelectorAll<SVGCircleElement>("[data-country]")
        circles.forEach((circle: SVGCircleElement) => {
          const country = circle.getAttribute("data-country")
          if (!country) return
          const el = circle
          el.style.cursor = "pointer"
          el.style.transition = "fill 0.3s ease, r 0.2s ease, stroke 0.2s ease"
          el.setAttribute("tabindex", "0")
          el.setAttribute("role", "button")
          el.setAttribute("aria-label", `${COUNTRY_NAMES_ES[country] || country}. Pulsa para ver detalles.`)

          const enter = () => setHoveredCountry(country)
          const leave = () => setHoveredCountry(null)
          const click = () => setSelectedCountry(country)
          const key = (e: Event) => {
            const ke = e as KeyboardEvent
            if (ke.key === "Enter" || ke.key === " ") {
              ke.preventDefault()
              setSelectedCountry(country)
            }
          }
          el.addEventListener("mouseenter", enter)
          el.addEventListener("mouseleave", leave)
          el.addEventListener("focus", enter)
          el.addEventListener("blur", leave)
          el.addEventListener("click", click)
          el.addEventListener("keydown", key)
          handlers.push(
            { el, type: "mouseenter", fn: enter },
            { el, type: "mouseleave", fn: leave },
            { el, type: "focus", fn: enter },
            { el, type: "blur", fn: leave },
            { el, type: "click", fn: click },
            { el, type: "keydown", fn: key },
          )
        })

        setSvgLoaded(true)
      } catch (error) {
        console.error("Failed to load SVG:", error)
      }
    }

    loadSVG()

    return () => {
      cancelled = true
      handlers.forEach(({ el, type, fn }) => el.removeEventListener(type, fn))
    }
  }, [])

  useEffect(() => {
    if (!svgLoaded || !svgContainerRef.current) return
    const svg = svgContainerRef.current.querySelector("svg")
    if (!svg) return
    const circles = svg.querySelectorAll<SVGCircleElement>("[data-country]")
    circles.forEach((circle: SVGCircleElement) => {
      const country = circle.getAttribute("data-country")
      if (!country) return
      const bucket = (bucketMap[activeLayer]?.[country] ?? NO_DATA) as Bucket
      circle.style.fill = BUCKET_COLORS[bucket]
    })
  }, [activeLayer, svgLoaded, bucketMap])

  useEffect(() => {
    if (!svgLoaded || !svgContainerRef.current) return
    const svg = svgContainerRef.current.querySelector("svg")
    if (!svg) return
    const circles = svg.querySelectorAll<SVGCircleElement>("[data-country]")
    circles.forEach((circle: SVGCircleElement) => {
      const country = circle.getAttribute("data-country")
      const el = circle
      const active = country === hoveredCountry || country === selectedCountry
      if (active) {
        el.style.stroke = "#C9A227"
        el.style.strokeWidth = "1.5"
        el.style.filter = "drop-shadow(0 0 4px rgba(201, 162, 39, 0.9))"
        el.setAttribute("r", "2.8")
      } else {
        el.style.stroke = "none"
        el.style.strokeWidth = "0"
        el.style.filter = "none"
        el.setAttribute("r", "1.8")
      }
    })
  }, [hoveredCountry, selectedCountry, svgLoaded])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  return (
    <section className="py-20 px-6 bg-[#0D0D0D] text-[#F8F6F1] scroll-mt-24" id="mapa-regional">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A227]/10 text-[#C9A227] rounded-full font-mono text-xs uppercase tracking-wide mb-4">
            Visualización regional
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-balance">Mapa regional LATAM</h2>
          <p className="text-lg text-[#F8F6F1]/60 max-w-3xl leading-relaxed">
            Explora seis capas comparables de datos sobre gobernanza de IA en la región. Cambia entre capas y selecciona
            un país para ver su perfil completo.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-4 md:p-6">
            <div role="tablist" aria-label="Capas de datos" className="flex flex-wrap gap-2 mb-6">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  role="tab"
                  aria-selected={activeLayer === layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]",
                    activeLayer === layer.id
                      ? "bg-[#C9A227] text-[#0D0D0D]"
                      : "bg-[#2A2A2A] text-[#F8F6F1]/70 hover:bg-[#3A3A3A] hover:text-[#F8F6F1]",
                  )}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            <div className="mb-6 p-3 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#C9A227] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div className="font-mono text-sm text-[#F8F6F1]/70 flex items-center flex-wrap gap-x-2">
                <span className="font-medium text-[#F8F6F1]">{activeLayerInfo?.label}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeLayerInfo?.source} ({activeLayerInfo?.year})
                </span>
                {activeLayerInfo?.note && (
                  <span className="ml-1 px-2 py-0.5 rounded text-xs bg-[#C9A227]/15 text-[#C9A227]">
                    {activeLayerInfo.note}
                  </span>
                )}
              </div>
            </div>

            <div ref={mapContainerRef} className="relative flex justify-center py-8" onMouseMove={handleMouseMove}>
              <div ref={svgContainerRef} className="relative w-full flex justify-center" style={{ maxWidth: "700px" }} />

              <AnimatePresence>
                {hoveredCountry && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute pointer-events-none z-20 px-3 py-2 bg-[#0D0D0D] border border-[#C9A227] rounded-lg shadow-lg"
                    style={{
                      left: Math.min(mousePos.x + 15, (mapContainerRef.current?.clientWidth || 0) - 160),
                      top: Math.max(mousePos.y - 50, 10),
                    }}
                  >
                    <div className="font-mono text-xs text-[#C9A227]">{hoveredCountry}</div>
                    <div className="text-sm font-medium text-[#F8F6F1]">
                      {COUNTRY_NAMES_ES[hoveredCountry] || getCountryData(hoveredCountry)?.country || hoveredCountry}
                    </div>
                    <div className="text-xs text-[#F8F6F1]/60 mt-1">
                      {BUCKET_LABELS[(bucketMap[activeLayer]?.[hoveredCountry] ?? NO_DATA) as Bucket]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-2 pt-4 border-t border-[#2A2A2A]">
              <div className="text-xs font-mono text-[#F8F6F1]/50 uppercase tracking-wide mb-3">
                Escala — {activeLayerInfo?.label}
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {(["high", "medium-high", "medium", "medium-low", "low", NO_DATA] as Bucket[]).map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-full ring-1 ring-[#F8F6F1]/10"
                      style={{ backgroundColor: BUCKET_COLORS[b] }}
                      aria-hidden="true"
                    />
                    <span className="text-xs text-[#F8F6F1]/70">{BUCKET_LABELS[b]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-6 min-h-[400px]">
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
                      <h3 className="font-serif text-2xl font-semibold">
                        {COUNTRY_NAMES_ES[selectedCountryData.iso3] || selectedCountryData.country}
                      </h3>
                      <span className="font-mono text-sm text-[#C9A227]">{selectedCountryData.iso3}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCountry(null)}
                      className="h-11 w-11 p-0 text-[#F8F6F1]/70 hover:text-[#F8F6F1] hover:bg-[#2A2A2A]"
                      aria-label="Cerrar perfil de país"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A]">
                      <div className="text-xs font-mono text-[#F8F6F1]/50 mb-3 uppercase tracking-wide">
                        Membresía ISO/IEC
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
                    <Info className="w-8 h-8 text-[#F8F6F1]/30" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">Selecciona un país</h3>
                  <p className="text-sm text-[#F8F6F1]/50 max-w-[250px]">
                    Haz clic o pulsa Enter sobre cualquier país del mapa para ver su perfil completo.
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
        <span className="text-xs font-mono text-[#F8F6F1]/60 uppercase tracking-wide">{label}</span>
        <span className="font-mono text-sm font-medium text-[#C9A227]">{displayValue}</span>
      </div>
      <div
        className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #C9A227 0%, #D4B84A 100%)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
