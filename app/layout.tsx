import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://aethos.ai"),
  title: "Observatorio de Gobernanza de IA | Aethos AI",
  description:
    "Datos públicos y comparables sobre cómo los países de América Latina y el Caribe se preparan para gobernar la inteligencia artificial.",
  generator: "Next.js",
  applicationName: "Observatorio Aethos AI",
  keywords: [
    "IA",
    "inteligencia artificial",
    "gobernanza",
    "LATAM",
    "América Latina",
    "estándares",
    "ISO",
    "regulación",
    "política pública",
  ],
  authors: [{ name: "Aethos AI", url: "https://aethos.ai" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Observatorio de Gobernanza de IA | Aethos AI",
    description: "Gobernanza con evidencia. Voz regional en estándares de IA.",
    type: "website",
    locale: "es_LA",
    siteName: "Observatorio Aethos AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Observatorio de Gobernanza de IA | Aethos AI",
    description: "Gobernanza con evidencia. Voz regional en estándares de IA.",
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
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
