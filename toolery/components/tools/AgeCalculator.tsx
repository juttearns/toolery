"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

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

export default function AgeCalculator() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const [dob, setDob] = useState("2000-01-01");
  const [asOf, setAsOf] = useState(todayStr);

  const result = useMemo(() => {
    const birth = new Date(dob + "T00:00:00");
    const target = new Date(asOf + "T00:00:00");
    if (Number.isNaN(birth.getTime()) || Number.isNaN(target.getTime()) || birth > target) return null;

    const { years, months, days } = diffYMD(birth, target);
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    const daysToBirthday = Math.round((nextBirthday.getTime() - target.getTime()) / 86400000);

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToBirthday };
  }, [dob, asOf]);

  return (
    <div className="space-y-6">
      <GlassCard className="p-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Date of birth</label>
            <input
              type="date"
              value={dob}
              max={todayStr}
              onChange={(e) => setDob(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted">Age as of</label>
            <input
              type="date"
              value={asOf}
              onChange={(e) => setAsOf(e.target.value)}
              className="mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-fg outline-none border border-white/10 focus:border-teal/50"
            />
          </div>
        </div>
      </GlassCard>

      {result ? (
        <>
          <GlassCard className="p-6 text-center">
            <div className="text-xs uppercase tracking-wider text-muted mb-2">Your age is</div>
            <div className="font-display data-num text-3xl sm:text-4xl font-semibold text-fg">
              {result.years}
              <span className="text-lg text-muted font-sans ml-1 mr-3">yrs</span>
              {result.months}
              <span className="text-lg text-muted font-sans ml-1 mr-3">mos</span>
              {result.days}
              <span className="text-lg text-muted font-sans ml-1">days</span>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Total months" value={result.totalMonths} />
            <Stat label="Total weeks" value={result.totalWeeks} />
            <Stat label="Total days" value={result.totalDays} />
            <Stat label="Total hours" value={result.totalHours} />
          </div>

          <GlassCard className="p-4 text-center">
            <span className="text-muted text-sm">
              {result.daysToBirthday === 0
                ? "🎂 Birthday is today!"
                : `${result.daysToBirthday} day${result.daysToBirthday === 1 ? "" : "s"} until next birthday`}
            </span>
          </GlassCard>
        </>
      ) : (
        <GlassCard className="p-5">
          <p className="text-muted text-sm">Pick a date of birth that isn&apos;t after the &ldquo;age as of&rdquo; date.</p>
        </GlassCard>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="data-num mt-1 text-xl font-semibold text-fg">{value.toLocaleString()}</div>
    </div>
  );
}
