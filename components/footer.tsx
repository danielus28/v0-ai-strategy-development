import { AethosLogo } from "@/components/aethos-logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <AethosLogo className="w-10 h-10 text-foreground" />
              <div className="font-heading tracking-[0.18em] uppercase font-semibold text-[15px] leading-none">
                AETHOS <span className="text-muted-foreground font-medium">AI</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Puente técnico-estratégico para articular participación normativa, evidencia regional e implementación
              demostrable de gobernanza de IA en América Latina y el Caribe.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Observatorio</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#mapa-regional" className="hover:text-foreground transition-colors">
                  Mapa regional
                </a>
              </li>
              <li>
                <a href="#participacion-normativa" className="hover:text-foreground transition-colors">
                  Participación normativa
                </a>
              </li>
              <li>
                <a href="#capacidad" className="hover:text-foreground transition-colors">
                  Capacidad de gobernar
                </a>
              </li>
              <li>
                <a href="/metodologia" className="hover:text-foreground transition-colors">
                  Metodología
                </a>
              </li>
              <li>
                <a href="#apoyar" className="hover:text-foreground transition-colors">
                  Cómo apoyar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://mpago.la/2V9zGis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Apoyar el observatorio
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@aethosai.org?subject=Observatorio%20Aethos%20%E2%80%94%20Consulta"
                  className="hover:text-foreground transition-colors"
                >
                  contacto@aethosai.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Aethos AI · Operación regional desde Chile y México
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            Datos actualizados a {new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </footer>
  )
}
