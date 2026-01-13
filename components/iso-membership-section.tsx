"use client"

import { isoMembershipData } from "@/lib/data"
import { useState, useRef } from "react"
import { motion } from "framer-motion"

type MembershipStatus = "P" | "O" | "None"

export function IsoMembershipSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sort by SC42 status and then by country name for consistent visualization
  const sc42Data = [...isoMembershipData]
    .map((d) => ({
      ...d,
      value: d.sc42_status === "P" ? 100 : d.sc42_status === "O" ? 60 : 20,
      highlight: d.sc42_status === "P",
    }))
    .sort((a, b) => b.value - a.value || a.country.localeCompare(b.country))

  const sc27Data = [...isoMembershipData]
    .map((d) => ({
      ...d,
      value: d.sc27_status === "P" ? 100 : d.sc27_status === "O" ? 60 : 20,
      highlight: d.sc27_status === "P",
    }))
    .sort((a, b) => b.value - a.value || a.country.localeCompare(b.country))

  const sc42PMemberCount = isoMembershipData.filter((d) => d.sc42_status === "P").length
  const sc42OMemberCount = isoMembershipData.filter((d) => d.sc42_status === "O").length
  const sc27PMemberCount = isoMembershipData.filter((d) => d.sc27_status === "P").length
  const sc27OMemberCount = isoMembershipData.filter((d) => d.sc27_status === "O").length

  return (
    <section className="py-20 px-6 bg-[#0D0D0D] text-[#F8F6F1]" id="participacion-normativa">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A227]/10 text-[#C9A227] rounded-full font-mono text-sm mb-4">
            Diferenciador
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-balance">
            ¿Dónde se escriben los estándares?
          </h2>
          <p className="text-lg text-[#F8F6F1]/60 max-w-3xl leading-relaxed">
            Sin P-membership, no hay voto técnico ni tracción en propuestas. LATAM tiene voz en los estándares que
            definirán la gobernanza de IA de la próxima década, pero solo si ocupa su lugar en la mesa.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-8 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#C9A227]" />
            <span className="text-sm font-medium">P-member (voto)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#F8F6F1]" />
            <span className="text-sm font-medium">O-member (observador)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#5C5C5A]" />
            <span className="text-sm font-medium">Sin membresía</span>
          </div>
        </div>

        {/* SC 42 Lollipop Chart */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-mono text-sm font-semibold tracking-wide uppercase text-[#F8F6F1]/50">
              ISO/IEC JTC 1/SC 42 — Inteligencia Artificial
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#C9A227]">{sc42PMemberCount} P</span>
              <span className="text-[#F8F6F1]/30">·</span>
              <span>{sc42OMemberCount} O</span>
            </div>
          </div>

          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-6">
            <LollipopChart
              data={sc42Data.map((d) => ({
                name: d.iso3,
                fullName: d.country,
                value: d.value,
                highlight: d.highlight,
                status: d.sc42_status as MembershipStatus,
                nationalBody: d.sc42_national_body,
              }))}
              chartId="sc42"
            />
          </div>
        </div>

        {/* SC 27 Lollipop Chart */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-mono text-sm font-semibold tracking-wide uppercase text-[#F8F6F1]/50">
              ISO/IEC JTC 1/SC 27 — Seguridad de la información
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#C9A227]">{sc27PMemberCount} P</span>
              <span className="text-[#F8F6F1]/30">·</span>
              <span>{sc27OMemberCount} O</span>
            </div>
          </div>

          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-6">
            <LollipopChart
              data={sc27Data.map((d) => ({
                name: d.iso3,
                fullName: d.country,
                value: d.value,
                highlight: d.sc27_status === "P",
                status: d.sc27_status as MembershipStatus,
                nationalBody: d.sc27_national_body,
              }))}
              chartId="sc27"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface LollipopChartProps {
  data: {
    name: string
    fullName: string
    value: number
    highlight: boolean
    status: MembershipStatus
    nationalBody?: string
  }[]
  chartId: string
}

function LollipopChart({ data, chartId }: LollipopChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const chartHeight = 200
  const chartWidth = Math.max(900, data.length * 36)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]" style={{ width: chartWidth }}>
        {/* SVG Chart */}
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="w-full" style={{ height: chartHeight + 40 }}>
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = chartHeight - (val / 100) * (chartHeight - 40)
            return (
              <g key={val}>
                <line
                  x1={40}
                  y1={y}
                  x2={chartWidth - 20}
                  y2={y}
                  stroke="#2A2A2A"
                  strokeWidth={1}
                  strokeDasharray={val === 0 ? "0" : "4,4"}
                />
                <text x={32} y={y + 4} fontSize={10} fill="#5C5C5A" textAnchor="end" fontFamily="monospace">
                  {val === 100 ? "P" : val === 60 ? "O" : val === 0 ? "—" : ""}
                </text>
              </g>
            )
          })}

          {/* Lollipops */}
          {data.map((item, idx) => {
            const x = 60 + idx * ((chartWidth - 80) / data.length)
            const normalizedValue = item.value / 100
            const peakY = chartHeight - normalizedValue * (chartHeight - 40)
            const baseY = chartHeight
            const isHovered = hoveredIdx === idx
            const color = item.status === "P" ? "#C9A227" : item.status === "O" ? "#F8F6F1" : "#5C5C5A"

            return (
              <g
                key={`${chartId}-${item.name}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Stem line */}
                <motion.line
                  x1={x}
                  y1={baseY}
                  x2={x}
                  y2={peakY}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1}
                  initial={{ y2: baseY }}
                  animate={{ y2: peakY }}
                  transition={{ duration: 0.5, delay: idx * 0.02 }}
                />

                {/* Peak circle */}
                <motion.circle
                  cx={x}
                  cy={peakY}
                  r={isHovered ? 6 : 4}
                  fill={color}
                  initial={{ cy: baseY, opacity: 0 }}
                  animate={{ cy: peakY, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.02 }}
                />

                {/* Glow effect for P-members */}
                {item.highlight && (
                  <motion.circle
                    cx={x}
                    cy={peakY}
                    r={isHovered ? 12 : 8}
                    fill="none"
                    stroke={color}
                    strokeWidth={1}
                    opacity={0.3}
                    initial={{ cy: baseY }}
                    animate={{ cy: peakY }}
                    transition={{ duration: 0.5, delay: idx * 0.02 }}
                  />
                )}

                {/* Country label (rotated) */}
                <text
                  x={x}
                  y={chartHeight + 16}
                  fontSize={9}
                  fill={isHovered ? "#F8F6F1" : "#5C5C5A"}
                  textAnchor="end"
                  fontFamily="monospace"
                  fontWeight={item.highlight ? 600 : 400}
                  transform={`rotate(-45, ${x}, ${chartHeight + 16})`}
                >
                  {item.name}
                </text>

                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={x - 60}
                      y={peakY - 50}
                      width={120}
                      height={40}
                      fill="#0D0D0D"
                      stroke="#C9A227"
                      strokeWidth={1}
                      rx={4}
                    />
                    <text x={x} y={peakY - 34} fontSize={11} fill="#F8F6F1" textAnchor="middle" fontWeight={600}>
                      {item.fullName}
                    </text>
                    <text x={x} y={peakY - 20} fontSize={10} fill="#F8F6F1" textAnchor="middle" opacity={0.7}>
                      {item.status === "P" ? "P-member" : item.status === "O" ? "O-member" : "Sin membresía"}
                      {item.nationalBody && ` · ${item.nationalBody}`}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Base dot-wave decoration */}
          {Array.from({ length: Math.floor((chartWidth - 80) / 8) }).map((_, i) => (
            <circle
              key={i}
              cx={60 + i * 8}
              cy={chartHeight + 2}
              r={1.5}
              fill="#2A2A2A"
              opacity={0.5 + Math.sin(i * 0.3) * 0.3}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
