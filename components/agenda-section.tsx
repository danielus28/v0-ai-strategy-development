"use client"

import { Check, Clock, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const milestones = [
  {
    quarter: "Q1 2026",
    title: "Lanzamiento v1.0 del Observatorio",
    description: "Publicación con 6 capas core de datos",
    status: "in-progress" as const,
  },
  {
    quarter: "Q2 2026",
    title: "Propuesta técnica a SC 42",
    description: "Envío vía INN (Chile) o DGN (México)",
    status: "pending" as const,
  },
  {
    quarter: "Q2 2026",
    title: "Pilotos de gobernanza",
    description: "2 pilotos documentados con instituciones públicas o empresas",
    status: "pending" as const,
  },
  {
    quarter: "Q3 2026",
    title: "Primer reporte trimestral",
    description: "Análisis de tendencias y recomendaciones",
    status: "pending" as const,
  },
  {
    quarter: "Q4 2026",
    title: "Capas aspiracionales",
    description: "Integración de participación real y sandboxes",
    status: "pending" as const,
  },
  {
    quarter: "Q4 2026",
    title: "Retrospectiva anual",
    description: "Segundo reporte trimestral + balance del año",
    status: "pending" as const,
  },
]

export function AgendaSection() {
  return (
    <section className="py-20 px-6" id="agenda">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-sm mb-4">
            Compromisos Medibles
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Agenda Aethos 2026</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Nuestro roadmap de 12 meses para posicionar la voz de LATAM en los estándares globales de gobernanza de IA.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative flex gap-6">
                {/* Status indicator */}
                <div
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    milestone.status === "completed"
                      ? "bg-accent text-accent-foreground"
                      : milestone.status === "in-progress"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {milestone.status === "completed" ? (
                    <Check className="w-5 h-5" />
                  ) : milestone.status === "in-progress" ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>

                {/* Content */}
                <div className={cn("flex-1 pb-8 pt-1", idx === milestones.length - 1 && "pb-0")}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm bg-secondary px-2 py-0.5 rounded">{milestone.quarter}</span>
                    {milestone.status === "in-progress" && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">En progreso</span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-primary text-primary-foreground rounded-lg">
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl font-semibold mb-3">¿Quieres contribuir a la agenda?</h3>
            <p className="text-primary-foreground/80 mb-6">
              Únete a nuestro grupo de trabajo técnico. Buscamos profesionales, investigadores e instituciones
              comprometidas con la gobernanza responsable de IA en LATAM.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:contacto@aethos.ai"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Contactar equipo
              </a>
              <a
                href="#metodologia"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground/10 text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                Ver metodología
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
