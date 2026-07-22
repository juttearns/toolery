"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generate(length: number, opts: Record<keyof typeof SETS, boolean>) {
  const pool = (Object.keys(opts) as (keyof typeof SETS)[])
    .filter((k) => opts[k])
    .map((k) => SETS[k])
    .join("");
  if (!pool) return "";
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => pool[b % pool.length]).join("");
}

function strengthLabel(length: number, activeSets: number) {
  const score = length * activeSets;
  if (score < 40) return { label: "Weak", color: "text-amber" };
  if (score < 80) return { label: "Good", color: "text-teal" };
  return { label: "Strong", color: "text-emerald" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const activeSets = Object.values(opts).filter(Boolean).length;
  const strength = useMemo(() => strengthLabel(length, activeSets), [length, activeSets]);

  function regenerate() {
    setPassword(generate(length, opts));
    setCopied(false);
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, opts]);

  function copy() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 sm:p-6">
        <div
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-4 data-num text-lg sm:text-xl text-fg break-all cursor-pointer"
          onClick={copy}
          title="Click to copy"
        >
          {password || "Select at least one character type"}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className={`text-xs font-semibold ${strength.color}`}>{strength.label}</span>
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-fg hover:border-white/30 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={regenerate}
              className="rounded-full bg-gradient-to-r from-teal-400 to-violet-400 px-3 py-1.5 text-xs font-semibold text-black hover:opacity-90 transition-opacity"
            >
              Regenerate
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">Length</span>
          <span className="data-num text-sm text-fg">{length}</span>
        </div>
        <input
          type="range"
          min={6}
          max={48}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />

        <div className="grid grid-cols-2 gap-3 mt-5">
          {(Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
            <label key={k} className="flex items-center gap-2 text-sm text-fg">
              <input
                type="checkbox"
                checked={opts[k]}
                onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))}
                className="accent-teal-400"
              />
              <span className="capitalize">{k === "numbers" ? "Numbers" : k === "symbols" ? "Symbols" : k + "case"}</span>
            </label>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
