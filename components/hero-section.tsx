"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Map, Users } from "lucide-react"

export function HeroSection() {
  const scrollToMap = () => {
    document.getElementById("mapa-regional")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-30">
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
        {/* Headline */}
        <div className="mb-8 min-h-[4rem] flex items-center justify-center">
          <TypewriterEffect
            words={[
              { text: "Observatorio", className: "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight" },
              { text: "de", className: "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight" },
              { text: "Gobernanza", className: "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight" },
              { text: "de", className: "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight" },
              { text: "IA", className: "font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-accent" },
            ]}
            className="text-center"
            cursorClassName="bg-accent"
          />
        </div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6 text-pretty"
        >
          Mostramos dónde está América Latina para decidir, entre todos, hacia dónde vamos.
        </motion.p>

        {/* Dato ancla */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="font-mono text-sm text-foreground/70 mb-12"
        >
          33 países · 6 indicadores · Datos abiertos
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium gap-2"
            onClick={scrollToMap}
          >
            <Map className="w-5 h-5" />
            Explorar el mapa
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium gap-2 bg-transparent"
            onClick={scrollToContact}
          >
            <Users className="w-5 h-5" />
            Descargar datos
          </Button>
        </motion.div>

        {/* Stats preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: "33", label: "Países monitoreados" },
            { value: "6", label: "Capas de datos" },
            { value: "8", label: "Fuentes públicas" },
            { value: "2024", label: "Datos actualizados" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-medium text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
