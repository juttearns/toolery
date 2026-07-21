"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#local", label: "Local" },
  { href: "/#convert", label: "Convert" },
  { href: "/#generate", label: "Generate" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-violet-400 text-[13px] font-bold text-black">
              T
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
              Toolery
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-sm text-muted">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-fg transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-5 w-5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="glass sm:hidden mt-2 rounded-2xl px-4 py-3 flex flex-col text-sm text-muted">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 border-b border-white/5 last:border-none hover:text-fg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
