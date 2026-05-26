"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Map, Calendar } from "lucide-react"
import { motion } from "motion/react"

const HEADLINE_WORDS = [
  "La",
  "gobernanza",
  "de",
  "IA",
  "en",
  "América",
  "Latina,",
  "con",
  "evidencia.",
]

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#C4C4C2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 text-sm text-muted-foreground px-3 py-1.5 border border-border rounded-full bg-background/60 mb-8"
        >
          <span
            className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0_3px_rgba(201,162,39,0.18)]"
            aria-hidden="true"
          />
          Observatorio LATAM · Edición 2026
        </motion.div>

        <h1
          id="hero-title"
          className="font-heading font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-[-0.02em] mb-6 text-balance"
        >
          {HEADLINE_WORDS.map((word, i) => {
            const isAccent = word === "evidencia."
            return (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.6,
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                }}
                className={`inline-block mr-[0.25em] ${isAccent ? "text-accent" : ""}`}
              >
                {word}
              </motion.span>
            )
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 text-pretty"
        >
          Datos públicos y comparables sobre cómo 33 países de América Latina y el Caribe se preparan para gobernar la
          inteligencia artificial. Para reguladores, organismos técnicos, investigación e industria.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="font-mono text-sm text-foreground/70 mb-12"
        >
          33 países · 6 capas de datos · 6 fuentes públicas
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium gap-2"
            onClick={() => scrollTo("mapa-regional")}
          >
            <Map className="w-5 h-5" aria-hidden="true" />
            Explorar el mapa
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium gap-2 bg-transparent"
          >
            <a href="#agenda">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              Ver agenda 2026
            </a>
          </Button>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: "33", label: "Países monitoreados" },
            { value: "6", label: "Capas de datos" },
            { value: "6", label: "Fuentes públicas" },
            { value: "2026", label: "Actualización en curso" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-medium text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
