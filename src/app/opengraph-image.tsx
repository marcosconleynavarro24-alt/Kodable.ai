import { ImageResponse } from "next/og";

// Branded social-share image, generated at build time. Applies to every route
// that doesn't define its own. Uses the site palette (cool paper / ink / navy).
export const alt =
  "Kodable.ai: AI websites, agents and automations for small businesses";
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
          backgroundColor: "#fbfbfd",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="52" height="52" viewBox="0 0 64 64">
            <path d="M32 32 11.22 20 32 8 52.78 20Z" fill="#000080" />
            <path
              d="M32 8 52.78 20V44L32 56 11.22 44V20Z"
              fill="none"
              stroke="#16182b"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M11.22 20 32 32 52.78 20M32 32v24"
              fill="none"
              stroke="#16182b"
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#16182b",
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            <span>kodable</span>
            <span style={{ color: "#000080" }}>.ai</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "76px",
              lineHeight: 1.05,
              color: "#16182b",
              maxWidth: "1000px",
            }}
          >
            <span>We use AI to scale&nbsp;</span>
            <span style={{ color: "#000080" }}>small businesses.</span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              color: "#4b5266",
              maxWidth: "920px",
            }}
          >
            Websites, AI agents, custom tools and automations, built fast, for
            local businesses.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            color: "#4b5266",
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
