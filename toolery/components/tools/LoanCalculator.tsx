"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("2000000");
  const [rate, setRate] = useState("14");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const n = parseFloat(years) * 12;
    if (!Number.isFinite(p) || !Number.isFinite(annualRate) || !Number.isFinite(n) || p <= 0 || n <= 0) {
      return null;
    }
    const r = annualRate / 12 / 100;
    const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    // build a light yearly breakdown
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let balance = p;
    for (let year = 1; year <= Math.ceil(n / 12); year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12 && balance > 0.01; m++) {
        const interestPortion = balance * r;
        const principalPortion = Math.min(emi - interestPortion, balance);
        yearInterest += interestPortion;
        yearPrincipal += principalPortion;
        balance -= principalPortion;
      }
      schedule.push({ year, principalPaid: yearPrincipal, interestPaid: yearInterest, balance: Math.max(balance, 0) });
    }

    return { emi, totalPayment, totalInterest, schedule };
  }, [principal, rate, years]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted">Loan amount</label>
          <input
            type="text"
            inputMode="decimal"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9.]/g, ""))}
            className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Annual interest rate (%)</label>
            <input
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ""))}
              className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Loan term (years)</label>
            <input
              type="text"
              inputMode="decimal"
              value={years}
              onChange={(e) => setYears(e.target.value.replace(/[^0-9.]/g, ""))}
              className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
        </div>
      </GlassCard>

      {result ? (
        <>
          <GlassCard className="p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-muted mb-2">Monthly instalment (EMI)</div>
            <div className="font-display data-num text-3xl sm:text-4xl font-semibold text-teal">
              {fmt(result.emi)}
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="Total interest" value={fmt(result.totalInterest)} />
            <Stat label="Total payment" value={fmt(result.totalPayment)} />
          </div>

          <GlassCard className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted mb-3">Yearly breakdown</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted border-b border-white/10">
                    <th className="py-2 pr-3 font-medium">Year</th>
                    <th className="py-2 pr-3 font-medium">Principal paid</th>
                    <th className="py-2 pr-3 font-medium">Interest paid</th>
                    <th className="py-2 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody className="data-num">
                  {result.schedule.map((row) => (
                    <tr key={row.year} className="border-b border-white/5 last:border-none">
                      <td className="py-2 pr-3 text-fg">{row.year}</td>
                      <td className="py-2 pr-3 text-fg">{fmt(row.principalPaid)}</td>
                      <td className="py-2 pr-3 text-muted">{fmt(row.interestPaid)}</td>
                      <td className="py-2 text-fg">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Enter a valid loan amount, rate, and term.</p>
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
