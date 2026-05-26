"use client"

import { isoMembershipData, COUNTRY_NAMES_ES } from "@/lib/data"
import { useState } from "react"
import { motion } from "motion/react"

type MembershipStatus = "P" | "O" | "None"

export function IsoMembershipSection() {
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
    <section className="py-20 px-6 bg-[#0D0D0D] text-[#F8F6F1] scroll-mt-24" id="participacion-normativa">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A227]/10 text-[#C9A227] rounded-full font-mono text-xs uppercase tracking-wide mb-4">
            Participación normativa
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-balance">
            ¿Dónde se escriben los estándares?
          </h2>
          <p className="text-lg text-[#F8F6F1]/60 max-w-3xl leading-relaxed">
            Sin P-membership, no hay voto técnico ni tracción en propuestas. LATAM tiene voz en los estándares que
            definirán la gobernanza de IA de la próxima década, pero solo si ocupa su lugar en la mesa.
          </p>
        </div>

        <div className="flex items-center gap-6 md:gap-8 mb-8 flex-wrap" role="list" aria-label="Leyenda">
          <div className="flex items-center gap-3" role="listitem">
            <div className="w-3 h-3 rounded-full bg-[#C9A227]" aria-hidden="true" />
            <span className="text-sm font-medium">P-member (voto)</span>
          </div>
          <div className="flex items-center gap-3" role="listitem">
            <div className="w-3 h-3 rounded-full bg-[#F8F6F1]" aria-hidden="true" />
            <span className="text-sm font-medium">O-member (observador)</span>
          </div>
          <div className="flex items-center gap-3" role="listitem">
            <div className="w-3 h-3 rounded-full bg-[#5C5C5A]" aria-hidden="true" />
            <span className="text-sm font-medium">Sin membresía</span>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <h3 className="font-mono text-sm font-semibold tracking-wide uppercase text-[#F8F6F1]/60">
              ISO/IEC JTC 1/SC 42 — Inteligencia artificial
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#C9A227]">{sc42PMemberCount} P</span>
              <span className="text-[#F8F6F1]/30">·</span>
              <span>{sc42OMemberCount} O</span>
            </div>
          </div>

          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-4 md:p-6">
            <LollipopChart
              data={sc42Data.map((d) => ({
                name: d.iso3,
                fullName: COUNTRY_NAMES_ES[d.iso3] || d.country,
                value: d.value,
                highlight: d.highlight,
                status: d.sc42_status as MembershipStatus,
                nationalBody: d.sc42_national_body,
              }))}
              chartId="sc42"
              ariaLabel="Participación de países LATAM en el comité ISO/IEC SC 42 de Inteligencia Artificial"
            />
            <p className="md:hidden text-xs text-[#F8F6F1]/50 mt-3 font-mono">
              ← Desliza para ver más países →
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <h3 className="font-mono text-sm font-semibold tracking-wide uppercase text-[#F8F6F1]/60">
              ISO/IEC JTC 1/SC 27 — Seguridad de la información
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#C9A227]">{sc27PMemberCount} P</span>
              <span className="text-[#F8F6F1]/30">·</span>
              <span>{sc27OMemberCount} O</span>
            </div>
          </div>

          <div className="bg-[#181818] rounded-lg border border-[#2A2A2A] p-4 md:p-6">
            <LollipopChart
              data={sc27Data.map((d) => ({
                name: d.iso3,
                fullName: COUNTRY_NAMES_ES[d.iso3] || d.country,
                value: d.value,
                highlight: d.sc27_status === "P",
                status: d.sc27_status as MembershipStatus,
                nationalBody: d.sc27_national_body,
              }))}
              chartId="sc27"
              ariaLabel="Participación de países LATAM en el comité ISO/IEC SC 27 de Seguridad de la información"
            />
            <p className="md:hidden text-xs text-[#F8F6F1]/50 mt-3 font-mono">
              ← Desliza para ver más países →
            </p>
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
  ariaLabel: string
}

function LollipopChart({ data, chartId, ariaLabel }: LollipopChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const chartHeight = 220
  const chartWidth = Math.max(900, data.length * 36)

  return (
    <div className="overflow-x-auto" role="figure" aria-label={ariaLabel}>
      <div className="min-w-[900px]" style={{ width: chartWidth }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`} className="w-full" style={{ height: chartHeight + 50 }}>
          {[
            { val: 100, label: "P · voto" },
            { val: 60, label: "O · observador" },
            { val: 20, label: "Sin membresía" },
            { val: 0, label: "" },
          ].map(({ val, label }) => {
            const y = chartHeight - (val / 100) * (chartHeight - 40)
            return (
              <g key={val}>
                <line
                  x1={90}
                  y1={y}
                  x2={chartWidth - 20}
                  y2={y}
                  stroke="#2A2A2A"
                  strokeWidth={1}
                  strokeDasharray={val === 0 ? "0" : "4,4"}
                />
                {label && (
                  <text x={84} y={y + 4} fontSize={10} fill="#8A8A88" textAnchor="end" fontFamily="monospace">
                    {label}
                  </text>
                )}
              </g>
            )
          })}

          {data.map((item, idx) => {
            const x = 110 + idx * ((chartWidth - 130) / data.length)
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
                tabIndex={0}
                role="img"
                aria-label={`${item.fullName}: ${
                  item.status === "P" ? "P-member" : item.status === "O" ? "O-member" : "Sin membresía"
                }${item.nationalBody ? `, organismo ${item.nationalBody}` : ""}`}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
              >
                <motion.line
                  x1={x}
                  y1={baseY}
                  x2={x}
                  y2={peakY}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1}
                  initial={{ y2: baseY }}
                  whileInView={{ y2: peakY }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.02 }}
                />

                <motion.circle
                  cx={x}
                  cy={peakY}
                  r={isHovered ? 6 : 4}
                  fill={color}
                  initial={{ cy: baseY, opacity: 0 }}
                  whileInView={{ cy: peakY, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.02 }}
                />

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
                    whileInView={{ cy: peakY }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.02 }}
                  />
                )}

                <text
                  x={x}
                  y={chartHeight + 16}
                  fontSize={9}
                  fill={isHovered ? "#F8F6F1" : "#8A8A88"}
                  textAnchor="end"
                  fontFamily="monospace"
                  fontWeight={item.highlight ? 600 : 400}
                  transform={`rotate(-45, ${x}, ${chartHeight + 16})`}
                >
                  {item.name}
                </text>

                {isHovered && (
                  <g>
                    <rect
                      x={x - 70}
                      y={peakY - 56}
                      width={140}
                      height={44}
                      fill="#0D0D0D"
                      stroke="#C9A227"
                      strokeWidth={1}
                      rx={4}
                    />
                    <text x={x} y={peakY - 40} fontSize={11} fill="#F8F6F1" textAnchor="middle" fontWeight={600}>
                      {item.fullName}
                    </text>
                    <text x={x} y={peakY - 24} fontSize={10} fill="#F8F6F1" textAnchor="middle" opacity={0.75}>
                      {item.status === "P" ? "P-member" : item.status === "O" ? "O-member" : "Sin membresía"}
                      {item.nationalBody && ` · ${item.nationalBody}`}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
