"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

type Mode = "percentOf" | "isWhatPercent" | "percentChange";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("percentOf");

  const [a1, setA1] = useState("15");
  const [b1, setB1] = useState("200");

  const [a2, setA2] = useState("50");
  const [b2, setB2] = useState("200");

  const [a3, setA3] = useState("200");
  const [b3, setB3] = useState("250");

  const resultPercentOf = useMemo(() => {
    const p = parseFloat(a1);
    const of = parseFloat(b1);
    if (!Number.isFinite(p) || !Number.isFinite(of)) return null;
    return (p / 100) * of;
  }, [a1, b1]);

  const resultIsWhatPercent = useMemo(() => {
    const x = parseFloat(a2);
    const y = parseFloat(b2);
    if (!Number.isFinite(x) || !Number.isFinite(y) || y === 0) return null;
    return (x / y) * 100;
  }, [a2, b2]);

  const resultChange = useMemo(() => {
    const from = parseFloat(a3);
    const to = parseFloat(b3);
    if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) return null;
    return ((to - from) / Math.abs(from)) * 100;
  }, [a3, b3]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: "percentOf" as Mode, label: "% of a number" },
          { id: "isWhatPercent" as Mode, label: "X is what % of Y" },
          { id: "percentChange" as Mode, label: "% change" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              mode === m.id ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "percentOf" && (
        <GlassCard className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-fg">
            <NumberField value={a1} onChange={setA1} suffix="%" />
            <span className="text-muted">of</span>
            <NumberField value={b1} onChange={setB1} />
            <span className="text-muted">=</span>
            <span className="data-num text-xl font-semibold text-teal">
              {resultPercentOf !== null ? resultPercentOf.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}
            </span>
          </div>
        </GlassCard>
      )}

      {mode === "isWhatPercent" && (
        <GlassCard className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-fg">
            <NumberField value={a2} onChange={setA2} />
            <span className="text-muted">is what % of</span>
            <NumberField value={b2} onChange={setB2} />
            <span className="text-muted">=</span>
            <span className="data-num text-xl font-semibold text-teal">
              {resultIsWhatPercent !== null ? resultIsWhatPercent.toLocaleString(undefined, { maximumFractionDigits: 4 }) + "%" : "—"}
            </span>
          </div>
        </GlassCard>
      )}

      {mode === "percentChange" && (
        <GlassCard className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-fg">
            <span className="text-muted">From</span>
            <NumberField value={a3} onChange={setA3} />
            <span className="text-muted">to</span>
            <NumberField value={b3} onChange={setB3} />
            <span className="text-muted">=</span>
            <span
              className={`data-num text-xl font-semibold ${
                resultChange !== null && resultChange < 0 ? "text-amber" : "text-emerald"
              }`}
            >
              {resultChange !== null
                ? (resultChange > 0 ? "+" : "") + resultChange.toLocaleString(undefined, { maximumFractionDigits: 4 }) + "%"
                : "—"}
            </span>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

function NumberField({
  value,
  onChange,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.-]/g, ""))}
        className="data-num w-32 rounded-xl bg-white/5 px-4 py-2.5 text-fg outline-none border border-white/10 focus:border-teal/50"
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">{suffix}</span>}
    </div>
  );
}
