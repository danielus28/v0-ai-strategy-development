import Link from "next/link"
import { ArrowRight, FileText, Github } from "lucide-react"

const GITHUB_URL = "https://github.com/danielus28/v0-ai-strategy-development"

export function MethodologyTeaser() {
  return (
    <section className="py-20 px-6 bg-card scroll-mt-24" id="metodologia">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-xs uppercase tracking-wide mb-4">
            Transparencia
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-balance">Metodología y fuentes</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Cada indicador del observatorio tiene fuente pública, fecha y alcance documentado. Sin datos propietarios ni
            cajas negras. Limitaciones declaradas explícitamente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
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

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/metodologia"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            Ver metodología completa
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            Repositorio en GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
