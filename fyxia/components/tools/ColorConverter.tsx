"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number) {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#2dd4bf");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null), [rgb]);

  function updateFromRgb(part: "r" | "g" | "b", value: string) {
    const n = parseInt(value, 10);
    if (!rgb || !Number.isFinite(n)) return;
    const next = { ...rgb, [part]: Math.max(0, Math.min(255, n)) };
    setHex(rgbToHex(next.r, next.g, next.b));
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={rgb ? hex : "#000000"}
            onChange={(e) => setHex(e.target.value)}
            className="h-16 w-16 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent"
          />
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-muted">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
              placeholder="#2dd4bf"
            />
          </div>
        </div>
      </GlassCard>

      {rgb && hsl ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <GlassCard className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted mb-3">RGB</div>
            <div className="grid grid-cols-3 gap-2">
              {(["r", "g", "b"] as const).map((k) => (
                <div key={k}>
                  <label className="text-[11px] uppercase text-muted">{k.toUpperCase()}</label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[k]}
                    onChange={(e) => updateFromRgb(k, e.target.value)}
                    className="data-num mt-1 w-full rounded-lg bg-white/5 px-2 py-2 text-fg outline-none border border-white/10 focus:border-teal/50"
                  />
                </div>
              ))}
            </div>
            <div className="data-num mt-3 text-sm text-muted">
              rgb({rgb.r}, {rgb.g}, {rgb.b})
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted mb-3">HSL</div>
            <div className="data-num text-lg text-fg">
              hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
            </div>
            <div className="mt-4 h-16 rounded-xl border border-white/10" style={{ background: hex }} />
          </GlassCard>
        </div>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Enter a valid 6-digit hex color (e.g. #2dd4bf).</p>
        </GlassCard>
      )}
    </div>
  );
}
