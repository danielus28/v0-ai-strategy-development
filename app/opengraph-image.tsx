import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Observatorio de Gobernanza de IA — Aethos AI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0D0D0D",
          color: "#F8F6F1",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #C9A227 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <svg width="56" height="56" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F8F6F1" strokeWidth="3" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#F8F6F1" strokeWidth="2" />
            <circle cx="50" cy="50" r="13" fill="#C9A227" />
          </svg>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>Aethos AI</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "8px 14px",
              border: "1px solid #C9A227",
              borderRadius: 999,
              fontSize: 18,
              color: "#C9A227",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Observatorio
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            Gobernanza de <span style={{ color: "#C9A227" }}>IA</span> en América Latina
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(248, 246, 241, 0.7)",
              lineHeight: 1.4,
              maxWidth: 900,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Datos públicos y comparables sobre cómo los países de la región se preparan para gobernar la IA.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            fontFamily: "monospace",
            fontSize: 20,
            color: "rgba(248, 246, 241, 0.6)",
          }}
        >
          <div>27 países · 6 capas · 6 fuentes públicas</div>
          <div style={{ color: "#C9A227" }}>aethosai.org</div>
        </div>
      </div>
    ),
    size,
  )
}
