"use client";

import { useEffect, useRef, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

type Format = "image/png" | "image/jpeg" | "image/webp";

const FORMAT_LABEL: Record<Format, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WEBP",
};
const FORMAT_EXT: Record<Format, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);
  const [format, setFormat] = useState<Format>("image/png");
  const [quality, setQuality] = useState(90);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlsRef = useRef<{ source: string | null; result: string | null }>({
    source: null,
    result: null,
  });

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      if (urls.source) URL.revokeObjectURL(urls.source);
      if (urls.result) URL.revokeObjectURL(urls.result);
    };
  }, []);

  function handleFile(f: File | null) {
    setError(null);
    setResultUrl(null);
    setResultSize(null);
    if (urlsRef.current.source) URL.revokeObjectURL(urlsRef.current.source);
    if (urlsRef.current.result) URL.revokeObjectURL(urlsRef.current.result);
    urlsRef.current.result = null;

    if (!f) {
      setFile(null);
      setSourceUrl(null);
      setDimensions(null);
      urlsRef.current.source = null;
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    const url = URL.createObjectURL(f);
    urlsRef.current.source = url;
    setFile(f);
    setSourceUrl(url);

    const img = new Image();
    img.onload = () => {
      setDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      imgRef.current = img;
    };
    img.onerror = () => setError("Couldn't read that image.");
    img.src = url;
  }

  function convert() {
    const img = imgRef.current;
    if (!img || !dimensions) return;
    setConverting(true);
    setError(null);

    const canvas = document.createElement("canvas");
    canvas.width = dimensions.w;
    canvas.height = dimensions.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas isn't supported in this browser.");
      setConverting(false);
      return;
    }
    if (format === "image/jpeg") {
      // JPEG has no transparency channel — flatten onto white first
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        setConverting(false);
        if (!blob) {
          setError("This browser couldn't produce that format — try a different one.");
          return;
        }
        if (urlsRef.current.result) URL.revokeObjectURL(urlsRef.current.result);
        const url = URL.createObjectURL(blob);
        urlsRef.current.result = url;
        setResultUrl(url);
        setResultSize(blob.size);
      },
      format,
      format === "image/png" ? undefined : quality / 100
    );
  }

  const outName = file ? file.name.replace(/\.[^.]+$/, "") : "image";

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <label className="text-xs uppercase tracking-wider text-muted">Choose an image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-teal/90"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <p className="mt-3 text-xs text-muted">
          Everything happens in your browser — the image is never uploaded anywhere.
        </p>
      </GlassCard>

      {sourceUrl && dimensions && (
        <>
          <GlassCard className="p-5">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sourceUrl}
                alt="Selected file preview"
                className="w-full sm:w-40 rounded-xl border border-white/10 object-contain"
              />
              <div className="space-y-1 text-sm text-muted">
                <div className="text-fg">{file?.name}</div>
                <div className="data-num">
                  {dimensions.w} × {dimensions.h}px
                </div>
                {file && <div className="data-num">{formatBytes(file.size)}</div>}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 space-y-4">
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-muted">Convert to</div>
              <div className="flex gap-2">
                {(Object.keys(FORMAT_LABEL) as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      format === f ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
                    }`}
                  >
                    {FORMAT_LABEL[f]}
                  </button>
                ))}
              </div>
            </div>

            {format !== "image/png" && (
              <div>
                <label className="text-xs uppercase tracking-wider text-muted">
                  Quality — {quality}%
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                  className="mt-2 w-full"
                />
              </div>
            )}

            <button
              onClick={convert}
              disabled={converting}
              className="w-full rounded-xl bg-teal py-3 text-sm font-semibold text-black transition-opacity disabled:opacity-60"
            >
              {converting ? "Converting…" : `Convert to ${FORMAT_LABEL[format]}`}
            </button>
          </GlassCard>
        </>
      )}

      {resultUrl && resultSize !== null && (
        <GlassCard className="p-5">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl}
              alt="Converted file preview"
              className="w-full sm:w-40 rounded-xl border border-white/10 object-contain"
            />
            <div className="space-y-2 text-sm">
              <div className="data-num text-muted">{formatBytes(resultSize)}</div>
              <a
                href={resultUrl}
                download={`${outName}.${FORMAT_EXT[format]}`}
                className="inline-flex items-center rounded-lg bg-teal px-4 py-2 text-sm font-medium text-black"
              >
                Download {FORMAT_EXT[format].toUpperCase()}
              </a>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
