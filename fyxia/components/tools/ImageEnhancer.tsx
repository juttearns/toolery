"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import {
  DEFAULT_SETTINGS,
  EnhanceSettings,
  loadImageToCanvas,
  runEnhancePipeline,
} from "@/lib/image-enhance";

type BatchStatus = "queued" | "processing" | "done" | "error";
interface BatchItem {
  id: string;
  file: File;
  status: BatchStatus;
  resultUrl?: string;
  resultBlob?: Blob;
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  displayValue: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-wider text-muted">{label}</span>
        <span className="data-num text-fg">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="mt-1.5 w-full"
      />
    </div>
  );
}

export default function ImageEnhancer() {
  const [files, setFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState<EnhanceSettings>(DEFAULT_SETTINGS);
  const [batch, setBatch] = useState<BatchItem[]>([]);
  const [running, setRunning] = useState(false);
  const [zipping, setZipping] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const urlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const renderPreview = useCallback(() => {
    const source = sourceCanvasRef.current;
    const preview = previewCanvasRef.current;
    if (!source || !preview) return;
    preview.width = source.width;
    preview.height = source.height;
    const ctx = preview.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(source, 0, 0);
    runEnhancePipeline(preview, settings);
  }, [settings]);

  // Load the first file into an off-screen source canvas whenever the
  // file list changes.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (files.length === 0) {
        sourceCanvasRef.current = null;
        return;
      }
      const canvas = await loadImageToCanvas(files[0]);
      if (!cancelled) sourceCanvasRef.current = canvas;
      renderPreview();
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [files, renderPreview]);

  // Re-render the preview whenever settings change.
  useEffect(() => {
    renderPreview();
  }, [renderPreview]);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const imgs = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    setFiles(imgs);
    setBatch(
      imgs.map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
        file: f,
        status: "queued",
      }))
    );
  }

  function update<K extends keyof EnhanceSettings>(key: K, value: EnhanceSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function outName(file: File) {
    return file.name.replace(/\.[^.]+$/, "") + "-enhanced.png";
  }

  async function processBatch() {
    setRunning(true);
    for (const item of batch) {
      setBatch((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "processing" } : i))
      );
      try {
        const canvas = await loadImageToCanvas(item.file);
        runEnhancePipeline(canvas, settings);
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        if (!blob) throw new Error("Failed to render");
        const url = URL.createObjectURL(blob);
        urlsRef.current.add(url);
        setBatch((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "done", resultUrl: url, resultBlob: blob }
              : i
          )
        );
      } catch {
        setBatch((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "error" } : i))
        );
      }
    }
    setRunning(false);
  }

  async function downloadAllAsZip() {
    const done = batch.filter((i) => i.status === "done" && i.resultBlob);
    if (done.length === 0) return;
    setZipping(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      done.forEach((i) => zip.file(outName(i.file), i.resultBlob as Blob));
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "enhanced-images.zip";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS);
  }

  const doneCount = batch.filter((i) => i.status === "done").length;
  const isBatch = files.length > 1;

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <label className="text-xs uppercase tracking-wider text-muted">
          Choose one image to fine-tune, or several for batch enhancing
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => addFiles(e.target.files)}
          className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-teal/90"
        />
        <p className="mt-3 text-xs text-muted">
          Everything is processed on-device — nothing is uploaded anywhere.
        </p>
      </GlassCard>

      {files.length > 0 && (
        <>
          {!isBatch && (
            <GlassCard className="p-3">
              <canvas
                ref={previewCanvasRef}
                className="w-full rounded-xl border border-white/10"
              />
            </GlassCard>
          )}

          <GlassCard className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted">
                Adjustments
              </div>
              <button
                onClick={reset}
                className="text-xs text-muted hover:text-fg"
              >
                Reset
              </button>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-fg">
              <input
                type="checkbox"
                checked={settings.autoEnhance}
                onChange={(e) => update("autoEnhance", e.target.checked)}
                className="h-4 w-4 accent-teal-400"
              />
              Auto-enhance (stretch levels automatically)
            </label>

            <Slider
              label="Brightness"
              value={settings.brightness}
              min={50}
              max={150}
              onChange={(v) => update("brightness", v)}
              displayValue={`${settings.brightness - 100 >= 0 ? "+" : ""}${settings.brightness - 100}`}
            />
            <Slider
              label="Contrast"
              value={settings.contrast}
              min={50}
              max={150}
              onChange={(v) => update("contrast", v)}
              displayValue={`${settings.contrast - 100 >= 0 ? "+" : ""}${settings.contrast - 100}`}
            />
            <Slider
              label="Saturation"
              value={settings.saturation}
              min={0}
              max={200}
              onChange={(v) => update("saturation", v)}
              displayValue={`${settings.saturation - 100 >= 0 ? "+" : ""}${settings.saturation - 100}`}
            />
            <Slider
              label="Warmth"
              value={settings.warmth}
              min={-100}
              max={100}
              onChange={(v) => update("warmth", v)}
              displayValue={`${settings.warmth >= 0 ? "+" : ""}${settings.warmth}`}
            />
            <Slider
              label="Sharpen"
              value={settings.sharpen}
              min={0}
              max={100}
              onChange={(v) => update("sharpen", v)}
              displayValue={`${settings.sharpen}`}
            />
          </GlassCard>

          {!isBatch ? (
            <button
              onClick={async () => {
                const preview = previewCanvasRef.current;
                if (!preview) return;
                const blob: Blob | null = await new Promise((resolve) =>
                  preview.toBlob(resolve, "image/png")
                );
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = outName(files[0]);
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full rounded-xl bg-teal py-3 text-sm font-semibold text-black"
            >
              Download enhanced image
            </button>
          ) : (
            <>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={processBatch}
                  disabled={running}
                  className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-black transition-opacity disabled:opacity-60"
                >
                  {running
                    ? "Processing…"
                    : `Apply to all ${files.length} images`}
                </button>
                {doneCount > 0 && (
                  <button
                    onClick={downloadAllAsZip}
                    disabled={zipping}
                    className="glass glass-hover rounded-xl px-5 py-2.5 text-sm font-medium text-fg disabled:opacity-60"
                  >
                    {zipping ? "Zipping…" : `Download all (${doneCount}) as ZIP`}
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {batch.map((item) => (
                  <GlassCard key={item.id} className="p-3">
                    <div className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/20 flex items-center justify-center">
                      {item.resultUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.resultUrl}
                          alt={item.file.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted">
                          {item.status === "processing" ? "Processing…" : "Queued"}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 truncate text-xs text-muted">
                      {item.file.name}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
