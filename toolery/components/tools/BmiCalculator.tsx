"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

type Units = "metric" | "imperial";

function classify(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-amber" };
  if (bmi < 25) return { label: "Healthy", color: "text-emerald" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber" };
  return { label: "Obese", color: "text-red-400" };
}

export default function BmiCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");
  const [weightLb, setWeightLb] = useState("154");

  const result = useMemo(() => {
    let hM: number;
    let wKg: number;
    if (units === "metric") {
      hM = parseFloat(heightCm) / 100;
      wKg = parseFloat(weightKg);
    } else {
      const totalIn = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
      hM = totalIn * 0.0254;
      wKg = parseFloat(weightLb) * 0.453592;
    }
    if (!Number.isFinite(hM) || !Number.isFinite(wKg) || hM <= 0 || wKg <= 0) return null;
    const bmi = wKg / (hM * hM);
    return { bmi, ...classify(bmi) };
  }, [units, heightCm, weightKg, heightFt, heightIn, weightLb]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["metric", "imperial"] as Units[]).map((u) => (
          <button
            key={u}
            onClick={() => setUnits(u)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              units === u ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
            }`}
          >
            {u === "metric" ? "Metric (cm / kg)" : "Imperial (ft, in / lb)"}
          </button>
        ))}
      </div>

      <GlassCard className="p-5">
        {units === "metric" ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Height (cm)" value={heightCm} onChange={setHeightCm} />
            <Field label="Weight (kg)" value={weightKg} onChange={setWeightKg} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Height (ft)" value={heightFt} onChange={setHeightFt} />
            <Field label="Height (in)" value={heightIn} onChange={setHeightIn} />
            <Field label="Weight (lb)" value={weightLb} onChange={setWeightLb} />
          </div>
        )}
      </GlassCard>

      {result ? (
        <GlassCard className="p-6 text-center">
          <div className="text-xs uppercase tracking-wider text-muted mb-2">Your BMI</div>
          <div className="font-display data-num text-4xl font-semibold text-fg">
            {result.bmi.toFixed(1)}
          </div>
          <div className={`mt-2 text-sm font-semibold ${result.color}`}>{result.label}</div>
        </GlassCard>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Enter a valid height and weight.</p>
        </GlassCard>
      )}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
      />
    </div>
  );
}
