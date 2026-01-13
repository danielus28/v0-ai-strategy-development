import { AethosLogo } from "@/components/aethos-logo"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <AethosLogo className="w-8 h-8 text-foreground" />
              <span className="font-serif text-xl font-semibold">Aethos AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Puente técnico-estratégico para articular participación normativa, evidencia regional e implementación
              demostrable de gobernanza de IA en LATAM.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Observatorio</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#mapa-regional" className="hover:text-foreground transition-colors">
                  Mapa Regional
                </a>
              </li>
              <li>
                <a href="#participacion-normativa" className="hover:text-foreground transition-colors">
                  Participación Normativa
                </a>
              </li>
              <li>
                <a href="#capacidad" className="hover:text-foreground transition-colors">
                  Capacidad de Gobernar
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-foreground transition-colors">
                  Metodología
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#agenda" className="hover:text-foreground transition-colors">
                  Agenda 2026
                </a>
              </li>
              <li>
                <a href="mailto:contacto@aethos.ai" className="hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Aethos AI. Chile + México. Datos actualizados a enero 2026.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
