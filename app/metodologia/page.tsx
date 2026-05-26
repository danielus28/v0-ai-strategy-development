import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MethodologySection } from "@/components/methodology-section"

const GITHUB_URL = "https://github.com/danielus28/v0-ai-strategy-development"

export const metadata: Metadata = {
  title: "Metodología y fuentes",
  description:
    "Cómo se construye el Observatorio Aethos AI: fuentes públicas, transformaciones documentadas, limitaciones declaradas. Datos reproducibles para gobernanza de IA en América Latina.",
  alternates: { canonical: "/metodologia" },
}

export default function MetodologiaPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Volver al observatorio
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-xs uppercase tracking-wide mb-4">
            Metodología completa
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-6 text-balance leading-tight">
            Cómo se construye el Observatorio
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Esta página documenta las decisiones metodológicas, las fuentes utilizadas, sus limitaciones y los criterios
            para construir cada indicador del observatorio. Es la fuente de verdad para cualquier auditoría o
            reproducción del trabajo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              Ver el repositorio
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href="mailto:contacto@aethosai.org?subject=Observatorio%20Aethos%20%E2%80%94%20Metodolog%C3%ADa"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Reportar un error
            </a>
          </div>
        </div>
      </section>

      <MethodologySection />

      <section className="py-16 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Trabajo abierto</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">
            El código del sitio, los datos procesados y las transformaciones aplicadas están disponibles públicamente.
            Cualquier persona puede revisar, sugerir cambios o reportar errores vía pull request en GitHub o por correo.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            github.com/danielus28/v0-ai-strategy-development
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
