"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import DateSelect from "@/components/ui/DateSelect";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function DateDifferenceCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);

  const result = useMemo(() => {
    const a = new Date(start + "T00:00:00");
    const b = new Date(end + "T00:00:00");
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;

    const earlier = a <= b ? a : b;
    const later = a <= b ? b : a;
    const { years, months, days } = diffYMD(earlier, later);
    const totalDays = Math.round((later.getTime() - earlier.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return { years, months, days, totalDays, totalWeeks, totalMonths, reversed: a > b };
  }, [start, end]);

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Start date</label>
            <div className="mt-2">
              <DateSelect value={start} onChange={setStart} />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">End date</label>
            <div className="mt-2">
              <DateSelect value={end} onChange={setEnd} />
            </div>
          </div>
        </div>
      </GlassCard>

      {result ? (
        <>
          <GlassCard className="p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-muted mb-2">Difference</div>
            <div className="font-display data-num text-3xl sm:text-4xl font-semibold text-fg">
              {result.years}
              <span className="text-lg text-muted font-sans ml-1 mr-3">yrs</span>
              {result.months}
              <span className="text-lg text-muted font-sans ml-1 mr-3">mos</span>
              {result.days}
              <span className="text-lg text-muted font-sans ml-1">days</span>
            </div>
          </GlassCard>

          <div className="grid grid-cols-3 gap-3">
            <Stat label="Total months" value={result.totalMonths} />
            <Stat label="Total weeks" value={result.totalWeeks} />
            <Stat label="Total days" value={result.totalDays} />
          </div>
        </>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Pick two valid dates.</p>
        </GlassCard>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="data-num mt-1 text-xl font-semibold text-fg">{value.toLocaleString()}</div>
    </div>
  );
}
