import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Observatorio de Gobernanza de IA | Aethos AI",
  description:
    "Medimos participación normativa, madurez institucional y preparación de ecosistemas para que LATAM sea referencia en gobernabilidad de IA.",
  generator: "Aethos AI",
  keywords: ["IA", "gobernanza", "LATAM", "inteligencia artificial", "estándares", "ISO", "regulación"],
  authors: [{ name: "Aethos AI", url: "https://aethos.ai" }],
  openGraph: {
    title: "Observatorio de Gobernanza de IA | Aethos AI",
    description: "Gobernanza con evidencia. Voz regional en estándares de IA.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#C9A227",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
