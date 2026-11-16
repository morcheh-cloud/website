import { ImageResponse } from "next/og"

import { site } from "@/site"

// Social preview images. They are rendered to PNG outside the page's CSS, so
// the palette is copied here from the tokens in globals.css.
const c = {
  void: "#06070d",
  line: "#222639",
  dust: "#8e94b0",
  lumen: "#eef0fa",
  indigo: "#3e63dd",
  honey: "#f5b544",
}

export const ogSize = { width: 1200, height: 630 }
export const ogType = "image/png"

export function ogImage({
  kicker,
  title,
  note,
}: {
  kicker: string
  title: string
  note?: string
}) {
  const host = new URL(site.url).host
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: `radial-gradient(ellipse 90% 70% at 50% -10%, ${c.indigo}66, transparent 70%), radial-gradient(ellipse 70% 40% at 50% 115%, ${c.honey}40, transparent 70%), ${c.void}`,
        color: c.lumen,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 99,
              background: c.honey,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: c.honey,
            }}
          />
          <div
            style={{
              width: 26,
              height: 22,
              borderRadius: 99,
              background: c.honey,
            }}
          />
        </div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 28, color: c.dust, marginLeft: 8 }}>
          {kicker}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 60 : 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -2,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${c.line}`,
          paddingTop: 28,
          fontSize: 26,
          color: c.dust,
        }}
      >
        <span>{note ?? "Free and open-source server control panel"}</span>
        <span>{host}</span>
      </div>
    </div>,
    ogSize,
  )
}
