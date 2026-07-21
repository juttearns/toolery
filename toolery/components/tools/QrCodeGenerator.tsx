"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import GlassCard from "@/components/ui/GlassCard";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://");
  const [fg, setFg] = useState("#0a0e1c");
  const [bg, setBg] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!text.trim()) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    QRCode.toCanvas(
      canvas,
      text,
      { width: 280, margin: 2, color: { dark: fg, light: bg } },
      (err) => setError(err ? "Couldn't generate a QR code for this input." : "")
    );
  }, [text, fg, bg]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 sm:p-6">
        <label className="block">
          <span className="text-xs text-muted">Link or text to encode</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-fg outline-none focus:border-teal-400/60 resize-none"
          />
        </label>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2">
            <span className="text-xs text-muted">Foreground</span>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-6 w-10 bg-transparent" />
          </label>
          <label className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2">
            <span className="text-xs text-muted">Background</span>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-6 w-10 bg-transparent" />
          </label>
        </div>
      </GlassCard>

      <GlassCard className="p-5 sm:p-6 flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="rounded-xl" />
        {error && <p className="text-sm text-amber">{error}</p>}
        <button
          onClick={download}
          className="rounded-full bg-gradient-to-r from-teal-400 to-violet-400 px-5 py-2 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
        >
          Download PNG
        </button>
      </GlassCard>
    </div>
  );
}
