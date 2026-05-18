import { ImageResponse } from "next/og";

export const alt = "Takuya Saito — Frontend Engineer Resume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 96px",
        background:
          "linear-gradient(135deg, #f8f7f4 0%, #f5f4f0 50%, #e9e7df 100%)",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
        color: "#3d3d3d",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#7eb0d5",
          }}
        />
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#6b6b6b" }}>
          RESUME
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1 }}>
          Takuya Saito
        </div>
        <div style={{ fontSize: 40, color: "#6b6b6b", lineHeight: 1.2 }}>
          Frontend Engineer · Next.js / React / TypeScript
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#6b6b6b",
          fontSize: 24,
        }}
      >
        <div>resume-tktk7l9.vercel.app</div>
        <div>github.com/tktk7l9</div>
      </div>
    </div>,
    size,
  );
}
