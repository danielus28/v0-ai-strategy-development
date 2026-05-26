import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"
import { GlossaryTerm } from "@/components/glossary-term"

interface SourceRow {
  source: ReactNode
  sourceKey: string
  year: string
  coverage: "Completa" | "Parcial"
  limitation: string
  url: string
}

const sources: SourceRow[] = [
  {
    source: (
      <>
        <GlossaryTerm term="ISO/IEC">ISO/IEC</GlossaryTerm> (<GlossaryTerm term="SC 42">SC 42</GlossaryTerm>,{" "}
        <GlossaryTerm term="SC 27">SC 27</GlossaryTerm>)
      </>
    ),
    sourceKey: "iso",
    year: "2024",
    coverage: "Completa",
    limitation: "Solo membresía formal, no participación real en propuestas técnicas.",
    url: "https://www.iso.org",
  },
  {
    source: (
      <>
        ONU · <GlossaryTerm term="EGDI">EGDI</GlossaryTerm>
      </>
    ),
    sourceKey: "egdi",
    year: "2024",
    coverage: "Completa",
    limitation: "Índice compuesto, no desagregado por IA.",
    url: "https://publicadministration.un.org/egovkb",
  },
  {
    source: (
      <>
        UIT · <GlossaryTerm term="GCI">GCI</GlossaryTerm>
      </>
    ),
    sourceKey: "gci",
    year: "2024",
    coverage: "Completa",
    limitation: "Enfocado en ciberseguridad, no gobernanza de IA.",
    url: "https://www.itu.int/en/ITU-D/Cybersecurity/Pages/global-cybersecurity-index.aspx",
  },
  {
    source: (
      <>
        Oxford Insights · <GlossaryTerm term="GARI">GARI</GlossaryTerm>
      </>
    ),
    sourceKey: "gari",
    year: "2023",
    coverage: "Completa",
    limitation: "Dataset público más reciente es 2023.",
    url: "https://oxfordinsights.com/ai-readiness/ai-readiness-index/",
  },
  {
    source: <GlossaryTerm term="OECD.AI">OECD.AI</GlossaryTerm>,
    sourceKey: "oecd",
    year: "2024",
    coverage: "Parcial",
    limitation: "Cobertura desigual; usamos datos disponibles para 8 países LATAM.",
    url: "https://oecd.ai",
  },
  {
    source: (
      <>
        CEPAL · <GlossaryTerm term="ILIA">ILIA</GlossaryTerm>
      </>
    ),
    sourceKey: "ilia",
    year: "2025",
    coverage: "Parcial",
    limitation: "Datos preliminares; sujetos a validación.",
    url: "https://www.cepal.org",
  },
]

export function MethodologySection() {
  return (
    <section className="py-20 px-6 bg-card scroll-mt-24" id="metodologia">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-xs uppercase tracking-wide mb-4">
            Transparencia
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Metodología y fuentes</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Cada indicador tiene fuente pública, fecha y alcance documentado. Sin datos propietarios ni cajas negras.
            Limitaciones declaradas explícitamente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Multi-fuente",
              description: "Seis fuentes públicas independientes, validadas por organismos internacionales.",
            },
            {
              title: "Reproducible",
              description: "Metodología publicada. Transformaciones documentadas. Limitaciones declaradas.",
            },
            {
              title: "Accionable",
              description: "Cada visualización termina en 'qué hacer': comités técnicos, pilotos, recomendaciones.",
            },
          ].map((principle) => (
            <div key={principle.title} className="p-6 bg-background rounded-lg border border-border">
              <h3 className="font-heading text-lg font-semibold mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:block bg-background rounded-lg border border-border overflow-hidden">
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
              {sources.map((source) => (
                <tr key={source.sourceKey} className="border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-medium">{source.source}</td>
                  <td className="p-4 font-mono text-sm">{source.year}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${
                        source.coverage === "Completa" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
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
                      aria-label={`Abrir fuente ${source.source} en nueva pestaña`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-secondary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {sources.map((source) => (
            <a
              key={source.sourceKey}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-background rounded-lg border border-border hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="font-medium">{source.source}</h4>
                  <p className="font-mono text-xs text-muted-foreground">{source.year}</p>
                </div>
                <span
                  className={`shrink-0 inline-block px-2 py-0.5 rounded text-xs font-mono ${
                    source.coverage === "Completa" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {source.coverage}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{source.limitation}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-accent">
                Ver fuente <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
