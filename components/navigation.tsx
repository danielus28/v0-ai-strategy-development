"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AethosLogo } from "@/components/aethos-logo"

const navLinks = [
  { href: "#participacion-normativa", label: "Participación normativa" },
  { href: "#mapa-regional", label: "Mapa regional" },
  { href: "#capacidad", label: "Capacidad" },
  { href: "/metodologia", label: "Metodología" },
]

const SUMARSE_URL = "https://mpago.la/2V9zGis"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur border-b border-border py-3" : "bg-transparent py-6",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Navegación principal">
        <a href="#" className="flex items-center gap-2.5 md:gap-3" aria-label="Aethos AI — Inicio">
          <AethosLogo className="w-10 h-10 md:w-11 md:h-11 text-foreground" />
          <div className="font-heading tracking-[0.18em] uppercase font-semibold text-[14px] md:text-[15px] leading-none">
            AETHOS <span className="text-muted-foreground font-medium">AI</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <a href={SUMARSE_URL} target="_blank" rel="noopener noreferrer">
              Apoyar
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-11 w-11"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur border-b border-border animate-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <a
                href={SUMARSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apoyar
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
