"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { getCountryData, type LayerType } from "@/lib/data"
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

// Pre-calculate ALL colors for ALL countries for ALL layers - ONCE
const COLOR_MAP: Record<LayerType, Record<string, string>> = {} as any

function initializeColorMap() {
    if (Object.keys(COLOR_MAP).length > 0) return // Already initialized

    const countries = ['ARG', 'BRA', 'CHL', 'COL', 'MEX', 'PER', 'URY', 'PRY', 'BOL', 'ECU',
        'VEN', 'GUY', 'SUR', 'GTM', 'HND', 'SLV', 'NIC', 'CRI', 'PAN', 'BLZ',
        'CUB', 'DOM', 'HTI', 'JAM', 'TTO', 'PRI']

    layers.forEach(layer => {
        COLOR_MAP[layer.id] = {}
        countries.forEach(country => {
            COLOR_MAP[layer.id][country] = getColorForCountry(country, layer.id)
        })
    })
}

function getColorForCountry(iso3: string, layer: LayerType): string {
    const data = getCountryData(iso3)
    if (!data) return "#4A4A4A"

    let value: number | undefined
    let max: number

    switch (layer) {
        case "iso":
            return data.sc42_status === "P" ? "#C9A227" :
                data.sc42_status === "O" ? "#8A8A6A" : "#4A4A4A"
        case "egdi":
            value = data.egdi_2024
            max = 1
            break
        case "gci":
            value = data.gci_2024
            max = 100
            break
        case "gari":
            value = data.gari_score ?? undefined
            max = 100
            break
        case "ilia":
            value = data.ilia_governance_score
            max = 100
            break
        case "oecd":
            value = data.total_policies
            max = 50
            break
        default:
            return "#4A4A4A"
    }

    if (value === undefined || value === null) return "#4A4A4A"

    const ratio = Math.min(value / max, 1)

    if (ratio >= 0.8) return "#C9A227"
    if (ratio >= 0.6) return "#D4B84A"
    if (ratio >= 0.4) return "#8A8A6A"
    if (ratio >= 0.2) return "#6B6B6B"
    return "#4A4A4A"
}

export function LatamMapSection() {
    const [activeLayer, setActiveLayer] = useState<LayerType>("gari")
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const svgContainerRef = useRef<HTMLDivElement>(null)

    const selectedCountryData = selectedCountry ? getCountryData(selectedCountry) : null
    const activeLayerInfo = layers.find((l) => l.id === activeLayer)

    // Initialize color map once
    useEffect(() => {
        initializeColorMap()
    }, [])

    // Load SVG once and setup event listeners once
    useEffect(() => {
        const loadSVG = async () => {
            if (!svgContainerRef.current) return

            try {
                const response = await fetch('/latam-map.svg')
                const svgText = await response.text()
                svgContainerRef.current.innerHTML = svgText

                const svg = svgContainerRef.current.querySelector('svg')
                if (!svg) return

                svg.style.width = '100%'
                svg.style.height = 'auto'
                svg.style.maxWidth = '700px'

                // Setup event listeners once
                const circles = svg.querySelectorAll('[data-country]')
                circles.forEach((circle) => {
                    const country = circle.getAttribute('data-country')
                    if (!country) return

                    const el = circle as SVGCircleElement
                    el.style.cursor = 'pointer'
                    el.style.transition = 'all 0.2s ease'

                    // Add classes for CSS styling
                    el.classList.add('map-circle')
                    el.setAttribute('data-country-code', country)

                    // Event listeners
                    el.addEventListener('mouseenter', () => setHoveredCountry(country))
                    el.addEventListener('mouseleave', () => setHoveredCountry(null))
                    el.addEventListener('click', () => setSelectedCountry(country))
                })

                // Apply initial colors
                applyColors(svg, activeLayer)
            } catch (error) {
                console.error('Failed to load SVG:', error)
            }
        }

        loadSVG()
    }, [])

    // Apply colors via direct style - but only when layer changes
    const applyColors = (svg: SVGElement, layer: LayerType) => {
        const circles = svg.querySelectorAll('[data-country]')
        circles.forEach((circle) => {
            const country = circle.getAttribute('data-country')
            if (country && COLOR_MAP[layer]?.[country]) {
                (circle as SVGCircleElement).style.fill = COLOR_MAP[layer][country]
            }
        })
    }

    // Update colors when layer changes - single DOM query
    useEffect(() => {
        if (!svgContainerRef.current) return
        const svg = svgContainerRef.current.querySelector('svg')
        if (!svg) return

        applyColors(svg, activeLayer)
    }, [activeLayer])

    // Update hover/select visual states - optimized with early return
    useEffect(() => {
        if (!svgContainerRef.current) return
        if (!hoveredCountry && !selectedCountry) return // Early exit if nothing selected

        const svg = svgContainerRef.current.querySelector('svg')
        if (!svg) return

        const circles = svg.querySelectorAll('[data-country]')

        circles.forEach((circle) => {
            const country = circle.getAttribute('data-country')
            const el = circle as SVGCircleElement

            if (country === hoveredCountry || country === selectedCountry) {
                el.style.stroke = '#C9A227'
                el.style.strokeWidth = '1.5'
                el.style.filter = 'drop-shadow(0 0 3px rgba(201, 162, 39, 0.8))'
                el.setAttribute('r', '2.8')
            } else {
                el.style.stroke = 'none'
                el.style.strokeWidth = '0'
                el.style.filter = 'none'
                el.setAttribute('r', '1.8')
            }
        })
    }, [hoveredCountry, selectedCountry])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (mapContainerRef.current) {
            const rect = mapContainerRef.current.getBoundingClientRect()
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }
    }

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
                            <Info className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                            <div className="font-mono text-sm text-[#F8F6F1]/70 flex items-center flex-wrap gap-x-2">
                                <span className="font-medium text-[#F8F6F1]">{activeLayerInfo?.label}</span>
                                <span>·</span>
                                <span>{activeLayerInfo?.source} ({activeLayerInfo?.year})</span>
                            </div>
                        </div>

                        {/* SVG Map */}
                        <div
                            ref={mapContainerRef}
                            className="relative flex justify-center py-8"
                            onMouseMove={handleMouseMove}
                        >
                            <div
                                ref={svgContainerRef}
                                className="relative w-full flex justify-center"
                                style={{ maxWidth: '700px' }}
                            />

                            {/* Hover tooltip */}
                            <AnimatePresence>
                                {hoveredCountry && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute pointer-events-none z-20 px-3 py-2 bg-[#0D0D0D] border border-[#C9A227] rounded-lg shadow-lg"
                                        style={{
                                            left: Math.min(mousePos.x + 15, (mapContainerRef.current?.clientWidth || 0) - 150),
                                            top: Math.max(mousePos.y - 40, 10),
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
                                <div className="flex gap-2.5 items-end">
                                    {[
                                        { color: "#C9A227", label: "Alto" },
                                        { color: "#D4B84A", label: "" },
                                        { color: "#8A8A6A", label: "Medio" },
                                        { color: "#6B6B6B", label: "" },
                                        { color: "#4A4A4A", label: "Bajo" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-1.5">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                            {item.label && <span className="text-[9px] text-[#F8F6F1]/50 font-mono leading-none">{item.label}</span>}
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
