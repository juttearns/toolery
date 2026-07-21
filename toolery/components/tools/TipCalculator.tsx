"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const PRESETS = [10, 15, 20];

export default function TipCalculator() {
  const [bill, setBill] = useState("2400");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("2");

  const result = useMemo(() => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPct) || 0;
    const p = Math.max(1, parseInt(people, 10) || 1);
    if (!Number.isFinite(b) || b <= 0) return null;

    const tipAmount = b * (t / 100);
    const total = b + tipAmount;
    return { tipAmount, total, perPerson: total / p, tipPerPerson: tipAmount / p };
  }, [bill, tipPct, people]);

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted">Bill amount</label>
          <input
            type="text"
            inputMode="decimal"
            value={bill}
            onChange={(e) => setBill(e.target.value.replace(/[^0-9.]/g, ""))}
            className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted">Tip percentage</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setTipPct(String(p))}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  tipPct === String(p) ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
                }`}
              >
                {p}%
              </button>
            ))}
            <input
              type="text"
              inputMode="decimal"
              value={tipPct}
              onChange={(e) => setTipPct(e.target.value.replace(/[^0-9.]/g, ""))}
              className="data-num w-20 rounded-lg bg-white/5 px-3 py-1.5 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted">Number of people</label>
          <input
            type="text"
            inputMode="numeric"
            value={people}
            onChange={(e) => setPeople(e.target.value.replace(/[^0-9]/g, ""))}
            className="data-num mt-2 w-32 rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
          />
        </div>
      </GlassCard>

      {result ? (
        <>
          <GlassCard className="p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-muted mb-2">Each person pays</div>
            <div className="font-display data-num text-3xl sm:text-4xl font-semibold text-teal">
              {fmt(result.perPerson)}
            </div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Total tip" value={fmt(result.tipAmount)} />
            <Stat label="Total bill" value={fmt(result.total)} />
          </div>
        </>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Enter a valid bill amount.</p>
        </GlassCard>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="data-num mt-1 text-xl font-semibold text-fg">{value}</div>
    </div>
  );
}
