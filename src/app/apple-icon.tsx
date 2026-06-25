import { ImageResponse } from "next/og";

// Apple touch icon (180x180), generated at build. Next auto-emits the
// <link rel="apple-touch-icon">. The brand bolt on warm paper, matching the
// favicon and OG image palette.
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
          background: "#fbfcfb",
        }}
      >
        <svg width="116" height="116" viewBox="0 0 32 32" fill="#0e8266">
          <path d="M18 3L7 18h7l-2 11 11-15h-7l2-11z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
