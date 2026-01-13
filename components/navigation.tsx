"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AethosLogo } from "@/components/aethos-logo"

const navLinks = [
  { href: "#participacion-normativa", label: "Participación Normativa" },
  { href: "#mapa-regional", label: "Mapa Regional" },
  { href: "#capacidad", label: "Capacidad" },
  { href: "#agenda", label: "Agenda 2026" },
  { href: "#metodologia", label: "Metodología" },
]

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
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <AethosLogo className="w-8 h-8 text-foreground" />
          <span className="font-serif text-xl font-semibold">Aethos AI</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Sumarse
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Sumarse
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
