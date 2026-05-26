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

const SITE_URL = "https://aethosai.org"
const SITE_NAME = "Observatorio Aethos AI"
const SITE_TITLE = "Observatorio de gobernanza de la inteligencia artificial en América Latina | Aethos AI"
const SITE_DESCRIPTION =
  "¿Tu país está listo para el cambio? El observatorio mide el estado legal, político y técnico de los 25 países de América Latina ante la inteligencia artificial y propone una ruta común para nivelar la cancha en gobernanza, capacidad e integración."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Observatorio Aethos AI",
  },
  description: SITE_DESCRIPTION,
  generator: "Next.js",
  applicationName: SITE_NAME,
  category: "Política pública e inteligencia artificial",
  keywords: [
    "observatorio IA",
    "gobernanza de IA",
    "inteligencia artificial América Latina",
    "regulación IA LATAM",
    "política pública IA",
    "estándares ISO IEC",
    "ISO SC 42",
    "EGDI",
    "GARI",
    "ITU GCI",
    "CEPAL ILIA",
    "OECD.AI",
    "Aethos AI",
  ],
  authors: [{ name: "Aethos AI", url: SITE_URL }],
  creator: "Aethos AI",
  publisher: "Aethos AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "es_LA",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@aethos_ai",
  },
}

export const viewport: Viewport = {
  themeColor: "#C9A227",
  width: "device-width",
  initialScale: 1,
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aethos AI",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Aethos AI articula evidencia regional, participación normativa e implementación demostrable de gobernanza de inteligencia artificial en América Latina y el Caribe.",
    areaServed: {
      "@type": "Place",
      name: "América Latina y el Caribe",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name: "Aethos AI",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Observatorio de Gobernanza de IA LATAM",
    description:
      "Indicadores comparables de gobernanza de IA para 25 países de América Latina y el Caribe en seis capas: participación ISO/IEC, EGDI, GCI, GARI, ILIA y OECD.AI.",
    keywords: [
      "gobernanza IA",
      "América Latina",
      "ISO SC 42",
      "EGDI",
      "GARI",
      "OECD.AI",
      "CEPAL ILIA",
    ],
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", name: "Aethos AI" },
    spatialCoverage: { "@type": "Place", name: "América Latina y el Caribe" },
    temporalCoverage: "2023/2026",
  },
]

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
