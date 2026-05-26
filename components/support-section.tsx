"use client"

import { Button } from "@/components/ui/button"
import { Heart, Users, Share2, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

const SUPPORT_CHANNELS = [
  {
    id: "donaciones",
    icon: Heart,
    title: "Aporte Financiero",
    description: "Ayúdanos a financiar los costos de infraestructura, servidores y la mantención del observatorio libre de intereses corporativos y comerciales.",
    ctaText: "Donar ahora",
    ctaHref: "https://apoyo.aethosai.org/donaciones",
    isPrimary: true,
  },
  {
    id: "voluntariado",
    icon: Users,
    title: "Tiempo y Talento",
    description: "Súmate como analista de datos, investigador/a o desarrollador/a voluntario/a. Nuestro asistente inteligente te guiará para integrarte a las mesas de trabajo.",
    ctaText: "Postular como voluntario",
    ctaHref: "https://apoyo.aethosai.org/donaciones/voluntarios",
    isPrimary: false,
  },
  {
    id: "difusion",
    icon: Share2,
    title: "Comparte e Integra",
    description: "Utiliza nuestros datos en tus investigaciones, reportes o papers. Comparte la plataforma y ayúdanos a visibilizar la voz de LATAM.",
    ctaText: "Ver repositorio",
    ctaHref: "https://github.com/danielus28/v0-ai-strategy-development",
    isPrimary: false,
  },
]

export function SupportSection() {
  return (
    <section className="py-24 px-6 bg-background scroll-mt-24" id="apoyar">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full font-mono text-xs uppercase tracking-wide mb-4"
          >
            Comunidad e Impacto
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-balance tracking-tight"
          >
            ¿Cómo nos puedes apoyar?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed text-pretty"
          >
            El Observatorio Aethos AI es una plataforma independiente y abierta. Tú puedes ser parte activa del esfuerzo por nivelar la cancha en la gobernanza de la IA en América Latina.
          </motion.p>
        </div>

        {/* Tarjetas de Canales */}
        <div className="grid md:grid-cols-3 gap-8">
          {SUPPORT_CHANNELS.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col justify-between p-8 rounded-xl border transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-md ${
                  channel.isPrimary
                    ? "border-accent bg-card shadow-[0_0_0_1px_rgba(201,162,39,0.1)]"
                    : "border-border bg-card/60 hover:bg-card hover:border-muted-foreground/30"
                }`}
              >
                {channel.isPrimary && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-2.5 py-0.5 bg-accent text-accent-foreground font-mono text-[10px] uppercase font-semibold tracking-wider rounded-sm">
                    Recomendado
                  </div>
                )}

                <div>
                  {/* Icono */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${
                    channel.isPrimary ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                  }`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  {/* Textos */}
                  <h3 className="font-heading text-xl font-semibold mb-3 tracking-tight">
                    {channel.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    {channel.description}
                  </p>
                </div>

                {/* Botón de Acción */}
                <Button
                  asChild
                  variant={channel.isPrimary ? "default" : "outline"}
                  className={`w-full font-medium gap-2 ${
                    channel.isPrimary 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground border-transparent"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  }`}
                >
                  <a href={channel.ctaHref} target="_blank" rel="noopener noreferrer">
                    {channel.ctaText}
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
