import { ImageResponse } from "next/og";

// Branded social-share image, generated at build time. Applies to every route
// that doesn't define its own. Uses the site palette (warm paper / ink / emerald).
export const alt =
  "Kodable.ai — AI websites, agents and automations for small businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbfcfb",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#0e8266">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
          </svg>
          <div
            style={{
              fontSize: "30px",
              color: "#16221f",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Kodable.ai
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "76px",
              lineHeight: 1.05,
              color: "#16221f",
              maxWidth: "1000px",
            }}
          >
            <span>We use AI to scale&nbsp;</span>
            <span style={{ color: "#0e8266" }}>small businesses.</span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              color: "#4b5c56",
              maxWidth: "920px",
            }}
          >
            Websites, AI agents, custom tools and automations — built fast, for
            local businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            color: "#4b5c56",
            letterSpacing: "0.04em",
          }}
        >
          Free consultation · Built in days, not months · Still here after launch
        </div>
      </div>
    ),
    { ...size }
  );
}
