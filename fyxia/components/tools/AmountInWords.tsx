"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

function chunkToWords(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
  return ONES[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + chunkToWords(n % 100) : "");
}

// Indian/Pakistani numbering: Crore, Lakh, Thousand
function numberToWordsSouthAsian(num: number): string {
  if (num === 0) return "Zero";
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const rest = num;

  const parts: string[] = [];
  if (crore) parts.push(chunkToWords(crore) + " Crore");
  if (lakh) parts.push(chunkToWords(lakh) + " Lakh");
  if (thousand) parts.push(chunkToWords(thousand) + " Thousand");
  if (rest) parts.push(chunkToWords(rest));
  return parts.join(" ").trim();
}

// International numbering: Million, Billion
function numberToWordsInternational(num: number): string {
  if (num === 0) return "Zero";
  const billion = Math.floor(num / 1_000_000_000);
  num %= 1_000_000_000;
  const million = Math.floor(num / 1_000_000);
  num %= 1_000_000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const rest = num;

  const parts: string[] = [];
  if (billion) parts.push(chunkToWords(billion) + " Billion");
  if (million) parts.push(chunkToWords(million) + " Million");
  if (thousand) parts.push(chunkToWords(thousand) + " Thousand");
  if (rest) parts.push(chunkToWords(rest));
  return parts.join(" ").trim();
}

type System = "southAsian" | "international";
type Currency = "PKR" | "USD" | "none";

const CURRENCY_LABEL: Record<Currency, { major: string; minor: string }> = {
  PKR: { major: "Rupees", minor: "Paisa" },
  USD: { major: "Dollars", minor: "Cents" },
  none: { major: "", minor: "" },
};

export default function AmountInWords() {
  const [input, setInput] = useState("1234567.50");
  const [system, setSystem] = useState<System>("southAsian");
  const [currency, setCurrency] = useState<Currency>("PKR");

  const words = useMemo(() => {
    const n = parseFloat(input);
    if (!Number.isFinite(n) || n < 0) return "";

    const whole = Math.floor(n);
    const fraction = Math.round((n - whole) * 100);
    const convert = system === "southAsian" ? numberToWordsSouthAsian : numberToWordsInternational;

    const label = CURRENCY_LABEL[currency];
    let result = convert(whole);
    result += currency !== "none" ? ` ${label.major}` : "";

    if (fraction > 0) {
      result += currency !== "none" ? ` and ${convert(fraction)} ${label.minor}` : ` point ${convert(fraction)}`;
    }
    return result + " Only";
  }, [input, system, currency]);

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <label className="text-xs uppercase tracking-wider text-muted">Amount</label>
        <input
          type="text"
          inputMode="decimal"
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="e.g. 1234567.50"
          className="data-num mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-xl text-fg outline-none border border-white/10 focus:border-teal/50"
        />

        <div className="mt-4 flex flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted mb-1.5">Currency</div>
            <div className="flex gap-2">
              {(["PKR", "USD", "none"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    currency === c ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
                  }`}
                >
                  {c === "none" ? "Plain number" : c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted mb-1.5">Numbering</div>
            <div className="flex gap-2">
              <button
                onClick={() => setSystem("southAsian")}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  system === "southAsian" ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
                }`}
              >
                Lakh / Crore
              </button>
              <button
                onClick={() => setSystem("international")}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  system === "international" ? "bg-teal text-black font-medium" : "glass text-muted hover:text-fg"
                }`}
              >
                Million / Billion
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <div className="text-xs uppercase tracking-wider text-muted">In words</div>
        <p className="font-display mt-2 text-lg sm:text-xl leading-relaxed text-fg">
          {words || "Enter a valid amount above"}
        </p>
      </GlassCard>
    </div>
  );
}
