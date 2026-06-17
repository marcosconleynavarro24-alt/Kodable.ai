import { ImageResponse } from "next/og";

// Branded social-share image, generated at build time. Applies to every route
// that doesn't define its own. Uses the site palette (cream / ink / one purple).
export const alt =
  "Kodable.ai — bilingual web design for Costa Blanca small businesses";
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
          backgroundColor: "#FAFAF7",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#5B3FA8",
            }}
          />
          <div
            style={{
              fontSize: "30px",
              color: "#0A0A0A",
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
              color: "#0A0A0A",
              maxWidth: "1000px",
            }}
          >
            <span>Websites that get you&nbsp;</span>
            <span style={{ color: "#5B3FA8", fontStyle: "italic" }}>
              found&nbsp;
            </span>
            <span>and win the customer.</span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              color: "#444748",
              maxWidth: "880px",
            }}
          >
            Bilingual web design for Costa Blanca small businesses — booking,
            ordering and messaging built in.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            color: "#444748",
            letterSpacing: "0.04em",
          }}
        >
          English &amp; Spanish · Fixed pricing · Still here after launch
        </div>
      </div>
    ),
    { ...size }
  );
}
