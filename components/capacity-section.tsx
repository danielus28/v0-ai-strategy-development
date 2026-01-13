"use client"

import { egdiData, gciData, gariData } from "@/lib/data"
import { cn } from "@/lib/utils"

type Dimension = "egdi" | "gci" | "gari"

const dimensions: { id: Dimension; label: string; fullLabel: string; source: string; year: string }[] = [
  {
    id: "egdi",
    label: "EGDI",
    fullLabel: "Gobierno Digital",
    source: "UN E-Government Development Index",
    year: "2024",
  },
  { id: "gci", label: "GCI", fullLabel: "Ciberseguridad", source: "ITU Global Cybersecurity Index", year: "2024" },
  {
    id: "gari",
    label: "GARI",
    fullLabel: "Preparación IA",
    source: "Oxford Government AI Readiness Index",
    year: "2023",
  },
]

export function CapacitySection() {
  return (
    <section className="py-20 px-6 bg-card" id="capacidad">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-sm mb-4">
            Análisis Comparativo
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Capacidad de Gobernar IA</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Tres dimensiones clave para evaluar la preparación de los países de LATAM para gobernar la inteligencia
            artificial de manera efectiva.
          </p>
        </div>

        {/* Dimension Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {dimensions.map((dim) => (
            <DimensionCard key={dim.id} dimension={dim} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DimensionCard({ dimension }: { dimension: (typeof dimensions)[0] }) {
  const getData = () => {
    switch (dimension.id) {
      case "egdi":
        return egdiData
          .map((d) => ({ ...d, score: d.egdi_2024 * 100 }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
      case "gci":
        return gciData
          .map((d) => ({ ...d, score: d.gci_2024 }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
      case "gari":
        return gariData
          .filter((d) => d.gari_score !== null)
          .map((d) => ({ ...d, score: d.gari_score as number }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
    }
  }

  const data = getData()
  const maxScore = Math.max(...data.map((d) => d.score))

  return (
    <div className="bg-background rounded-lg border border-border p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-2xl font-semibold text-accent">{dimension.label}</span>
          <span className="text-sm text-muted-foreground">{dimension.year}</span>
        </div>
        <h3 className="font-serif text-lg font-medium">{dimension.fullLabel}</h3>
        <p className="text-xs text-muted-foreground mt-1">{dimension.source}</p>
      </div>

      {/* Horizontal bar chart */}
      <div className="space-y-3">
        {data.map((item, idx) => {
          const width = (item.score / maxScore) * 100
          const isTop3 = idx < 3

          return (
            <div key={item.iso3} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("font-mono text-xs", isTop3 ? "text-accent font-medium" : "text-muted-foreground")}
                  >
                    {idx + 1}.
                  </span>
                  <span className={cn("text-sm", isTop3 ? "font-medium" : "")}>{item.country}</span>
                </div>
                <span className="font-mono text-sm">{item.score.toFixed(1)}</span>
              </div>

              {/* Dot wave bar */}
              <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 relative overflow-hidden",
                    isTop3 ? "bg-accent" : "bg-primary/60",
                  )}
                  style={{ width: `${width}%` }}
                >
                  {/* Dot pattern overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    <pattern
                      id={`dots-${dimension.id}-${idx}`}
                      x="0"
                      y="0"
                      width="6"
                      height="6"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="3" cy="3" r="1" fill="currentColor" className="text-background" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#dots-${dimension.id}-${idx})`} />
                  </svg>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* View all link */}
      <button className="mt-4 text-sm text-accent hover:underline font-medium">Ver todos los países →</button>
    </div>
  )
}
