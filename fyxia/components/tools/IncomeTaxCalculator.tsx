"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

// FY 2026-27 (Tax Year 2027) salaried slabs, effective 1 July 2026,
// per Finance Bill 2026 / Budget 2026-27. Surcharge on salaried income
// has been abolished for this year. Verify against final FBR notification.
const SLABS = [
  { upTo: 600_000, rate: 0, base: 0, from: 0 },
  { upTo: 1_200_000, rate: 0.01, base: 0, from: 600_000 },
  { upTo: 2_200_000, rate: 0.11, base: 6_000, from: 1_200_000 },
  { upTo: 3_200_000, rate: 0.2, base: 116_000, from: 2_200_000 },
  { upTo: 4_100_000, rate: 0.25, base: 316_000, from: 3_200_000 },
  { upTo: 5_600_000, rate: 0.29, base: 541_000, from: 4_100_000 },
  { upTo: 7_000_000, rate: 0.32, base: 976_000, from: 5_600_000 },
  { upTo: Infinity, rate: 0.35, base: 1_424_000, from: 7_000_000 },
];

function computeTax(annual: number) {
  const slab = SLABS.find((s) => annual <= s.upTo) ?? SLABS[SLABS.length - 1];
  if (annual <= 600_000) return 0;
  return slab.base + (annual - slab.from) * slab.rate;
}

export default function IncomeTaxCalculator() {
  const [mode, setMode] = useState<"monthly" | "annual">("monthly");
  const [salary, setSalary] = useState("");

  const { annualIncome, annualTax, monthlyTax, takeHomeMonthly, effectiveRate } =
    useMemo(() => {
      const raw = parseFloat(salary.replace(/,/g, "")) || 0;
      const annualIncome = mode === "monthly" ? raw * 12 : raw;
      const annualTax = computeTax(annualIncome);
      const monthlyTax = annualTax / 12;
      const takeHomeMonthly = annualIncome / 12 - monthlyTax;
      const effectiveRate = annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0;
      return { annualIncome, annualTax, monthlyTax, takeHomeMonthly, effectiveRate };
    }, [salary, mode]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(Math.max(0, n));

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          {(["monthly", "annual"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                mode === m
                  ? "bg-teal-400/15 border-teal-400/50 text-fg"
                  : "border-white/10 text-muted hover:text-fg"
              }`}
            >
              {m === "monthly" ? "Monthly salary" : "Annual salary"}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="text-xs text-muted">
            Gross {mode} salary (PKR)
          </span>
          <input
            inputMode="decimal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="0"
            className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-lg text-fg data-num outline-none focus:border-teal-400/60 transition-colors"
          />
        </label>
      </GlassCard>

      <GlassCard className="p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold mb-4">Result</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm mb-5">
          <Row label="Annual taxable income" value={`Rs ${fmt(annualIncome)}`} />
          <Row label="Effective tax rate" value={`${effectiveRate.toFixed(1)}%`} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Stat label="Monthly tax" value={`Rs ${fmt(monthlyTax)}`} />
          <Stat label="Annual tax" value={`Rs ${fmt(annualTax)}`} accent />
          <Stat label="Monthly take-home" value={`Rs ${fmt(takeHomeMonthly)}`} />
        </div>
      </GlassCard>

      <p className="text-xs text-muted">
        Based on the salaried-individual slabs proposed in the Federal Budget
        2026-27 (Finance Bill 2026), effective 1 July 2026, tax year 2027.
        These figures are estimates for planning only — confirm your exact
        deduction with your employer's payroll or the FBR.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2">
      <span className="text-muted">{label}</span>
      <span className="data-num text-fg">{value}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent ? "border-teal/30 bg-teal-400/5" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="data-num mt-1 text-xl font-semibold text-fg">{value}</div>
    </div>
  );
}
