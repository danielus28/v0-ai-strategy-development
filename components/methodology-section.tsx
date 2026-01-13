"use client"

import { ExternalLink } from "lucide-react"

const sources = [
  {
    source: "ISO/IEC (SC 42, SC 27)",
    year: "2024",
    coverage: "Completa",
    limitation: "Solo membresía formal, no participación real",
    url: "https://www.iso.org",
  },
  {
    source: "UN EGDI",
    year: "2024",
    coverage: "Completa",
    limitation: "Índice compuesto, no desagregado por IA",
    url: "https://publicadministration.un.org/egovkb",
  },
  {
    source: "ITU GCI",
    year: "2024",
    coverage: "Completa",
    limitation: "Enfocado en ciberseguridad, no gobernanza IA",
    url: "https://www.itu.int/en/ITU-D/Cybersecurity/Pages/global-cybersecurity-index.aspx",
  },
  {
    source: "Oxford Insights GARI",
    year: "2023",
    coverage: "Completa",
    limitation: "Dataset público más reciente es 2023",
    url: "https://oxfordinsights.com/ai-readiness/ai-readiness-index/",
  },
  {
    source: "OECD.AI",
    year: "2024",
    coverage: "Parcial",
    limitation: "Cobertura desigual en LATAM",
    url: "https://oecd.ai",
  },
  {
    source: "CEPAL ILIA",
    year: "2025",
    coverage: "Parcial",
    limitation: "Datos preliminares, pendiente de validación",
    url: "https://www.cepal.org",
  },
]

export function MethodologySection() {
  return (
    <section className="py-20 px-6 bg-card" id="metodologia">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-sm mb-4">
            Transparencia
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Metodología y Fuentes</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Cada indicador tiene fuente pública, fecha y alcance. Sin datos propietarios ni cajas negras. Metodología
            publicada, transformaciones documentadas, limitaciones declaradas.
          </p>
        </div>

        {/* Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Multi-fuente",
              description: "Cada indicador tiene fuente pública, fecha y alcance documentado.",
            },
            {
              title: "Reproducible",
              description: "Metodología publicada. Transformaciones documentadas. Limitaciones declaradas.",
            },
            {
              title: "Accionable",
              description: "Cada visual termina en 'qué hacer': agenda técnica, comités, pilotos.",
            },
          ].map((principle) => (
            <div key={principle.title} className="p-6 bg-background rounded-lg border border-border">
              <h3 className="font-serif text-lg font-semibold mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Sources Table */}
        <div className="bg-background rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-mono text-sm font-medium">Fuente</th>
                  <th className="text-left p-4 font-mono text-sm font-medium">Año</th>
                  <th className="text-left p-4 font-mono text-sm font-medium">Cobertura</th>
                  <th className="text-left p-4 font-mono text-sm font-medium">Limitaciones</th>
                  <th className="text-left p-4 font-mono text-sm font-medium w-20"></th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{source.source}</td>
                    <td className="p-4 font-mono text-sm">{source.year}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${source.coverage === "Completa" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {source.coverage}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{source.limitation}</td>
                    <td className="p-4">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-secondary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
