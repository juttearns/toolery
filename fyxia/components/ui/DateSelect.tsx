"use client";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(year: number, month: number) {
  // month is 1-indexed here
  return new Date(year, month, 0).getDate();
}

const selectClass =
  "rounded-xl bg-white/5 px-3 py-3 text-fg outline-none border border-white/10 focus:border-teal/50 appearance-none";

export default function DateSelect({
  value,
  onChange,
  minYear = 1930,
  maxYear = new Date().getFullYear() + 10,
}: {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  minYear?: number;
  maxYear?: number;
}) {
  const [y, m, d] = value.split("-").map((v) => parseInt(v, 10));
  const year = Number.isFinite(y) ? y : new Date().getFullYear();
  const month = Number.isFinite(m) ? m : 1;
  const day = Number.isFinite(d) ? d : 1;

  const maxDay = daysInMonth(year, month);
  const safeDay = Math.min(day, maxDay);

  function emit(nextYear: number, nextMonth: number, nextDay: number) {
    const clampedDay = Math.min(nextDay, daysInMonth(nextYear, nextMonth));
    const pad = (n: number) => String(n).padStart(2, "0");
    onChange(`${nextYear}-${pad(nextMonth)}-${pad(clampedDay)}`);
  }

  const years: number[] = [];
  for (let yr = maxYear; yr >= minYear; yr--) years.push(yr);

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        aria-label="Day"
        value={safeDay}
        onChange={(e) => emit(year, month, parseInt(e.target.value, 10))}
        className={selectClass}
      >
        {Array.from({ length: maxDay }, (_, i) => i + 1).map((dd) => (
          <option key={dd} value={dd}>
            {dd}
          </option>
        ))}
      </select>

      <select
        aria-label="Month"
        value={month}
        onChange={(e) => emit(year, parseInt(e.target.value, 10), safeDay)}
        className={selectClass}
      >
        {MONTHS.map((label, i) => (
          <option key={label} value={i + 1}>
            {label}
          </option>
        ))}
      </select>

      <select
        aria-label="Year"
        value={year}
        onChange={(e) => emit(parseInt(e.target.value, 10), month, safeDay)}
        className={selectClass}
      >
        {years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>
    </div>
  );
}
