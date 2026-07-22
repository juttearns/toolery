"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

type Category = "length" | "weight" | "temperature" | "area" | "volume";

const UNITS: Record<Category, Record<string, number>> = {
  length: { Meters: 1, Kilometers: 1000, Centimeters: 0.01, Miles: 1609.344, Yards: 0.9144, Feet: 0.3048, Inches: 0.0254 },
  weight: { Kilograms: 1, Grams: 0.001, Milligrams: 0.000001, Pounds: 0.453592, Ounces: 0.0283495, Tons: 1000, Maunds: 37.3242 },
  area: { "Square meters": 1, "Square kilometers": 1_000_000, Acres: 4046.86, Marla: 25.2929, Kanal: 505.857, "Square feet": 0.092903 },
  volume: { Liters: 1, Milliliters: 0.001, "Cubic meters": 1000, Gallons: 3.78541, Cups: 0.24 },
  temperature: {}, // handled separately
};

const CATEGORY_LABEL: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  area: "Area",
  volume: "Volume",
};

function convertTemp(value: number, from: string, to: string) {
  let celsius = value;
  if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
  if (from === "Kelvin") celsius = value - 273.15;
  if (to === "Fahrenheit") return (celsius * 9) / 5 + 32;
  if (to === "Kelvin") return celsius + 273.15;
  return celsius;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const units = category === "temperature" ? ["Celsius", "Fahrenheit", "Kelvin"] : Object.keys(UNITS[category]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1] ?? units[0]);
  const [value, setValue] = useState("1");

  function switchCategory(c: Category) {
    setCategory(c);
    const u = c === "temperature" ? ["Celsius", "Fahrenheit", "Kelvin"] : Object.keys(UNITS[c]);
    setFrom(u[0]);
    setTo(u[1] ?? u[0]);
  }

  const result = useMemo(() => {
    const n = parseFloat(value);
    if (!Number.isFinite(n)) return 0;
    if (category === "temperature") return convertTemp(n, from, to);
    const base = n * UNITS[category][from];
    return base / UNITS[category][to];
  }, [value, from, to, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => switchCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              category === c
                ? "bg-teal-400/15 border-teal-400/50 text-fg"
                : "border-white/10 text-muted hover:text-fg"
            }`}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      <GlassCard className="p-5 sm:p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-muted">From</span>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-fg outline-none focus:border-teal-400/60"
            >
              {units.map((u) => (
                <option key={u} value={u} className="bg-[#0a0e1c]">
                  {u}
                </option>
              ))}
            </select>
            <input
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-lg data-num text-fg outline-none focus:border-teal-400/60"
            />
          </div>

          <div>
            <span className="text-xs text-muted">To</span>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-fg outline-none focus:border-teal-400/60"
            >
              {units.map((u) => (
                <option key={u} value={u} className="bg-[#0a0e1c]">
                  {u}
                </option>
              ))}
            </select>
            <div className="mt-2 w-full rounded-lg border border-teal/30 bg-teal-400/5 px-3 py-2.5 text-lg data-num text-fg">
              {Number.isFinite(result) ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
