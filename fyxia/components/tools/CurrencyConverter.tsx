"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

// Approximate PKR value of 1 unit of each currency (mid-2026).
// Editable by the user — treat as a starting point, not a live feed.
const DEFAULT_RATES: Record<string, number> = {
  USD: 277.7,
  GBP: 355.4,
  EUR: 300.1,
  SAR: 74.05,
  AED: 75.6,
  INR: 3.31,
  CNY: 38.6,
  CAD: 202.5,
};

export default function CurrencyConverter() {
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [amount, setAmount] = useState("100");
  const [currency, setCurrency] = useState("USD");
  const [direction, setDirection] = useState<"toPkr" | "fromPkr">("toPkr");

  const result = useMemo(() => {
    const n = parseFloat(amount.replace(/,/g, "")) || 0;
    const rate = rates[currency] ?? 0;
    return direction === "toPkr" ? n * rate : n / rate;
  }, [amount, currency, rates, direction]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-PK", { maximumFractionDigits: 2 }).format(n);

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setDirection("toPkr")}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              direction === "toPkr"
                ? "bg-teal-400/15 border-teal-400/50 text-fg"
                : "border-white/10 text-muted hover:text-fg"
            }`}
          >
            Currency → PKR
          </button>
          <button
            onClick={() => setDirection("fromPkr")}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              direction === "fromPkr"
                ? "bg-teal-400/15 border-teal-400/50 text-fg"
                : "border-white/10 text-muted hover:text-fg"
            }`}
          >
            PKR → Currency
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-muted">
              {direction === "toPkr" ? "Amount" : "Amount (PKR)"}
            </span>
            <input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-lg data-num text-fg outline-none focus:border-teal-400/60"
            />
          </div>
          <div>
            <span className="text-xs text-muted">Currency</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-fg outline-none focus:border-teal-400/60"
            >
              {Object.keys(rates).map((c) => (
                <option key={c} value={c} className="bg-[#0a0e1c]">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-teal/30 bg-teal-400/5 p-4">
          <div className="text-xs uppercase tracking-wider text-muted">Result</div>
          <div className="data-num mt-1 text-2xl font-semibold text-fg">
            {direction === "toPkr" ? `Rs ${fmt(result)}` : `${fmt(result)} ${currency}`}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5 sm:p-6">
        <h2 className="font-display text-sm font-semibold mb-3 text-muted uppercase tracking-wider">
          Rates used (PKR per unit) — edit if needed
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(rates).map(([code, rate]) => (
            <label key={code} className="block">
              <span className="text-xs text-muted">{code}</span>
              <input
                inputMode="decimal"
                value={rate}
                onChange={(e) =>
                  setRates((r) => ({ ...r, [code]: parseFloat(e.target.value) || 0 }))
                }
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-sm data-num text-fg outline-none focus:border-teal-400/60"
              />
            </label>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          Rates are approximate starting points, not a live feed. For actual
          transactions, check your bank or exchange's current rate.
        </p>
      </GlassCard>
    </div>
  );
}
