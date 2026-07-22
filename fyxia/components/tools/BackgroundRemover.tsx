"use client";

import { useEffect, useRef, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

type Status = "queued" | "processing" | "done" | "error";

interface Item {
  id: string;
  file: File;
  status: Status;
  sourceUrl: string;
  resultUrl?: string;
  resultBlob?: Blob;
  error?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function BackgroundRemover() {
  const [items, setItems] = useState<Item[]>([]);
  const [running, setRunning] = useState(false);
  const [progressLabel, setProgressLabel] = useState<string | null>(null);
  const [progressPct, setProgressPct] = useState(0);
  const [zipping, setZipping] = useState(false);
  const urlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next: Item[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => {
        const sourceUrl = URL.createObjectURL(f);
        urlsRef.current.add(sourceUrl);
        return {
          id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
          file: f,
          status: "queued" as Status,
          sourceUrl,
        };
      });
    setItems((prev) => [...prev, ...next]);
  }

  async function processAll() {
    setRunning(true);
    setProgressLabel("Loading AI model…");
    setProgressPct(0);

    const { removeBackground } = await import("@imgly/background-removal");

    // Process one at a time — this runs a real neural network on-device,
    // so doing them in parallel would fight over CPU/GPU and memory.
    for (const item of items) {
      if (item.status === "done") continue;

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "processing" } : i))
      );
      setProgressLabel(`Removing background — ${item.file.name}`);

      try {
        const blob = await removeBackground(item.file, {
          model: "isnet_quint8",
          output: { format: "image/png" },
          progress: (_key: string, current: number, total: number) => {
            if (total > 0) setProgressPct(Math.round((current / total) * 100));
          },
        });
        const resultUrl = URL.createObjectURL(blob);
        urlsRef.current.add(resultUrl);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "done", resultUrl, resultBlob: blob }
              : i
          )
        );
      } catch (err) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: "error",
                  error: err instanceof Error ? err.message : "Failed",
                }
              : i
          )
        );
      }
    }

    setProgressLabel(null);
    setRunning(false);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function outName(file: File) {
    return file.name.replace(/\.[^.]+$/, "") + "-no-bg.png";
  }

  async function downloadAllAsZip() {
    const done = items.filter((i) => i.status === "done" && i.resultBlob);
    if (done.length === 0) return;
    setZipping(true);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      done.forEach((i) => {
        zip.file(outName(i.file), i.resultBlob as Blob);
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "background-removed.zip";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  }

  const doneCount = items.filter((i) => i.status === "done").length;
  const queuedCount = items.filter((i) => i.status === "queued").length;

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <label className="text-xs uppercase tracking-wider text-muted">
          Choose one or more images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => addFiles(e.target.files)}
          className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-teal file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-teal/90"
        />
        <p className="mt-3 text-xs text-muted">
          Runs fully on-device using an on-browser AI model — nothing is
          uploaded anywhere. The first image downloads the model (~40MB,
          cached after that); every image after is fast.
        </p>
      </GlassCard>

      {items.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={processAll}
              disabled={running || queuedCount === 0}
              className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-black transition-opacity disabled:opacity-60"
            >
              {running
                ? "Processing…"
                : queuedCount === 0
                  ? "All done"
                  : `Remove background${items.length > 1 ? "s" : ""} (${items.length})`}
            </button>
            {doneCount > 1 && (
              <button
                onClick={downloadAllAsZip}
                disabled={zipping}
                className="glass glass-hover rounded-xl px-5 py-2.5 text-sm font-medium text-fg disabled:opacity-60"
              >
                {zipping ? "Zipping…" : `Download all (${doneCount}) as ZIP`}
              </button>
            )}
          </div>

          {running && progressLabel && (
            <GlassCard className="p-4">
              <div className="flex items-center justify-between text-xs text-muted mb-2">
                <span>{progressLabel}</span>
                <span className="data-num">{progressPct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-teal transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </GlassCard>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <GlassCard key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm text-fg">{item.file.name}</div>
                    <div className="data-num text-xs text-muted">
                      {formatBytes(item.file.size)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-xs text-muted hover:text-fg"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div
                    className="rounded-lg border border-white/10 bg-black/20 bg-[length:12px_12px] bg-[image:repeating-conic-gradient(#00000000_0_25%,#ffffff08_0_50%)] flex items-center justify-center"
                    style={{ minHeight: 120 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.sourceUrl}
                      alt="Original"
                      className="max-h-32 w-full object-contain"
                    />
                  </div>
                  <div
                    className="rounded-lg border border-white/10 flex items-center justify-center"
                    style={{
                      minHeight: 120,
                      backgroundImage:
                        "repeating-conic-gradient(#ffffff14 0 25%, #00000000 0 50%)",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    {item.status === "done" && item.resultUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.resultUrl}
                        alt="Background removed"
                        className="max-h-32 w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-muted">
                        {item.status === "processing"
                          ? "Processing…"
                          : item.status === "error"
                            ? "Failed"
                            : "Queued"}
                      </span>
                    )}
                  </div>
                </div>

                {item.status === "done" && item.resultUrl && (
                  <a
                    href={item.resultUrl}
                    download={outName(item.file)}
                    className="mt-3 inline-flex items-center rounded-lg bg-teal px-3 py-1.5 text-xs font-medium text-black"
                  >
                    Download PNG
                  </a>
                )}
                {item.status === "error" && (
                  <p className="mt-3 text-xs text-red-400">{item.error}</p>
                )}
              </GlassCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
