"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("2500");
  const [discount1, setDiscount1] = useState("20");
  const [discount2, setDiscount2] = useState("0");

  const result = useMemo(() => {
    const p = parseFloat(price);
    const d1 = parseFloat(discount1) || 0;
    const d2 = parseFloat(discount2) || 0;
    if (!Number.isFinite(p) || p <= 0) return null;

    const afterFirst = p * (1 - d1 / 100);
    const final = afterFirst * (1 - d2 / 100);
    const saved = p - final;
    const effectivePct = (saved / p) * 100;

    return { final, saved, effectivePct };
  }, [price, discount1, discount2]);

  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted">Original price</label>
          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
            className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Discount (%)</label>
            <input
              type="text"
              inputMode="decimal"
              value={discount1}
              onChange={(e) => setDiscount1(e.target.value.replace(/[^0-9.]/g, ""))}
              className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Extra discount (%, optional)</label>
            <input
              type="text"
              inputMode="decimal"
              value={discount2}
              onChange={(e) => setDiscount2(e.target.value.replace(/[^0-9.]/g, ""))}
              className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
        </div>
      </GlassCard>

      {result ? (
        <>
          <GlassCard className="p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-muted mb-2">You pay</div>
            <div className="font-display data-num text-3xl sm:text-4xl font-semibold text-teal">
              {fmt(result.final)}
            </div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="You save" value={fmt(result.saved)} />
            <Stat label="Effective discount" value={`${fmt(result.effectivePct)}%`} />
          </div>
        </>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Enter a valid original price.</p>
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
