"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface GlossaryEntry {
  label: string
  definition: string
  source?: string
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  EGDI: {
    label: "EGDI — E-Government Development Index",
    definition:
      "Índice de la ONU que mide qué tan desarrollados están los servicios digitales del Estado en cada país.",
    source: "Naciones Unidas",
  },
  GCI: {
    label: "GCI — Global Cybersecurity Index",
    definition:
      "Índice de la Unión Internacional de Telecomunicaciones que mide la capacidad nacional para enfrentar amenazas de ciberseguridad.",
    source: "UIT",
  },
  GARI: {
    label: "GARI — Government AI Readiness Index",
    definition:
      "Índice de Oxford Insights que mide qué tan preparado está el gobierno de cada país para adoptar inteligencia artificial.",
    source: "Oxford Insights",
  },
  ILIA: {
    label: "ILIA — Índice Latinoamericano de Inteligencia Artificial",
    definition: "Índice regional que mide la madurez en políticas y gobernanza de IA en América Latina.",
    source: "CEPAL",
  },
  "OECD.AI": {
    label: "OECD.AI",
    definition:
      "Observatorio de la OCDE que recopila políticas oficiales de inteligencia artificial registradas por gobiernos.",
    source: "OCDE",
  },
  "SC 42": {
    label: "ISO/IEC JTC 1/SC 42",
    definition:
      "Subcomité internacional que escribe los estándares técnicos de inteligencia artificial. Su trabajo orienta la regulación de IA en el mundo.",
    source: "ISO/IEC",
  },
  "SC 27": {
    label: "ISO/IEC JTC 1/SC 27",
    definition:
      "Subcomité internacional que escribe los estándares de seguridad de la información, ciberseguridad y privacidad.",
    source: "ISO/IEC",
  },
  "ISO/IEC": {
    label: "ISO/IEC",
    definition:
      "Organización Internacional de Normalización y Comisión Electrotécnica Internacional. Publican los estándares técnicos que adopta la mayoría de los países.",
  },
  EGOV: {
    label: "Gobierno digital",
    definition: "Conjunto de servicios e infraestructura digital que un Estado ofrece a su ciudadanía.",
  },
}

interface GlossaryTermProps {
  term: keyof typeof GLOSSARY | string
  children?: ReactNode
  className?: string
}

export function GlossaryTerm({ term, children, className }: GlossaryTermProps) {
  const entry = GLOSSARY[term]
  if (!entry) {
    return <>{children ?? term}</>
  }
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-help underline decoration-dotted decoration-current/50 underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-sm",
              className,
            )}
          >
            {children ?? term}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="font-medium mb-1">{entry.label}</div>
          <div className="text-xs text-[#F8F6F1]/80 leading-relaxed">{entry.definition}</div>
          {entry.source && (
            <div className="text-[10px] uppercase tracking-wide text-[#C9A227] font-mono mt-1.5">
              Fuente: {entry.source}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
