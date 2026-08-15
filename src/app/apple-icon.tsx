import { ImageResponse } from "next/og";

// Apple touch icon (180x180), generated at build. Next auto-emits the
// <link rel="apple-touch-icon">. The reversed ring mark inside the ink
// rounded square, matching KodableNewLogo-appicon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16221f",
          borderRadius: "40px",
        }}
      >
        <svg width="122" height="122" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="20"
            fill="none"
            stroke="#fbfcfb"
            strokeWidth="6.4"
            strokeLinecap="round"
          />
          <path
            d="M44 16a20 20 0 0 1 0 32"
            fill="none"
            stroke="#4bd0a8"
            strokeWidth="6.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
