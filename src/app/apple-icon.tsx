import { ImageResponse } from "next/og";

// Apple touch icon (180x180), generated at build. Next auto-emits the
// <link rel="apple-touch-icon">. The reversed cube mark inside the ink
// rounded square, matching KodableNewLogo-appicon.svg. The interior stem is
// dropped at this size, same call as the favicon.
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
          background: "#16182b",
          borderRadius: "40px",
        }}
      >
        <svg width="122" height="122" viewBox="0 0 64 64">
          <path d="M32 32 11.22 20 32 8 52.78 20Z" fill="#6b6be0" />
          <path
            d="M32 8 52.78 20V44L32 56 11.22 44V20Z"
            fill="none"
            stroke="#fbfbfd"
            strokeWidth="6.4"
            strokeLinejoin="round"
          />
          <path
            d="M11.22 20 32 32 52.78 20"
            fill="none"
            stroke="#fbfbfd"
            strokeWidth="6.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
