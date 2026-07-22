"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

function numberInput(v: string) {
  const n = parseFloat(v.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export default function ZakatCalculator() {
  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [goldGrams, setGoldGrams] = useState("");
  const [goldRate, setGoldRate] = useState("24000"); // PKR per gram, editable
  const [silverGrams, setSilverGrams] = useState("");
  const [silverRate, setSilverRate] = useState("280"); // PKR per gram, editable
  const [investments, setInvestments] = useState("");
  const [liabilities, setLiabilities] = useState("");

  const { totalAssets, netAssets, zakatDue, nisab, meetsNisab } = useMemo(() => {
    const goldValue = numberInput(goldGrams) * numberInput(goldRate);
    const silverValue = numberInput(silverGrams) * numberInput(silverRate);
    const totalAssets =
      numberInput(cash) + numberInput(bank) + goldValue + silverValue + numberInput(investments);
    const netAssets = Math.max(0, totalAssets - numberInput(liabilities));
    // Nisab: value of 612.36g silver (the lower, more inclusive threshold)
    const nisab = 612.36 * numberInput(silverRate);
    const meetsNisab = netAssets >= nisab && nisab > 0;
    const zakatDue = meetsNisab ? netAssets * 0.025 : 0;
    return { totalAssets, netAssets, zakatDue, nisab, meetsNisab };
  }, [cash, bank, goldGrams, goldRate, silverGrams, silverRate, investments, liabilities]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold mb-4">Your assets</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Cash in hand (PKR)" value={cash} onChange={setCash} />
          <Field label="Bank balance (PKR)" value={bank} onChange={setBank} />
          <Field label="Gold you own (grams)" value={goldGrams} onChange={setGoldGrams} />
          <Field label="Gold rate (PKR / gram)" value={goldRate} onChange={setGoldRate} />
          <Field label="Silver you own (grams)" value={silverGrams} onChange={setSilverGrams} />
          <Field label="Silver rate (PKR / gram)" value={silverRate} onChange={setSilverRate} />
          <Field
            label="Investments / savings (PKR)"
            value={investments}
            onChange={setInvestments}
          />
          <Field
            label="Debts due within the year (PKR)"
            value={liabilities}
            onChange={setLiabilities}
          />
        </div>
        <p className="mt-3 text-xs text-muted">
          Gold and silver rates default to rough market values — update them
          with today's local rate for an accurate figure.
        </p>
      </GlassCard>

      <GlassCard className="p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold mb-4">Result</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <Row label="Total assets" value={`Rs ${fmt(totalAssets)}`} />
          <Row label="Net assets (after debts)" value={`Rs ${fmt(netAssets)}`} />
          <Row label="Nisab threshold (612.36g silver)" value={`Rs ${fmt(nisab)}`} />
          <Row label="Meets Nisab?" value={meetsNisab ? "Yes" : "No"} />
        </div>
        <div className="mt-5 rounded-xl border border-teal/30 bg-teal-400/5 p-4">
          <div className="text-xs uppercase tracking-wider text-muted">
            Zakat payable (2.5%)
          </div>
          <div className="data-num mt-1 text-3xl font-semibold text-fg">
            Rs {fmt(zakatDue)}
          </div>
        </div>
        {!meetsNisab && (
          <p className="mt-3 text-sm text-muted">
            Your net assets are below the Nisab threshold, so Zakat is not
            obligatory this year.
          </p>
        )}
      </GlassCard>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs text-muted">{label}</span>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-fg data-num outline-none focus:border-teal-400/60 transition-colors"
      />
    </label>
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
