import Link from "next/link";

const links = [
  { href: "/tools/zakat-calculator", label: "Zakat Calculator" },
  { href: "/tools/income-tax-calculator", label: "Income Tax Calculator" },
  { href: "/tools/unit-converter", label: "Unit Converter" },
  { href: "/tools/currency-converter", label: "Currency Converter" },
  { href: "/tools/qr-code-generator", label: "QR Code Generator" },
  { href: "/tools/password-generator", label: "Password Generator" },
  { href: "/tools/word-counter", label: "Word Counter" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="font-display text-lg font-semibold text-fg">Fyxia</div>
          <p className="mt-2 text-sm text-muted max-w-xs">
            Free, no-signup tools for everyday calculations, conversions and
            generators. Built for Pakistan, useful anywhere.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            All tools
          </div>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-fg transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            About
          </div>
          <p>
            Every tool runs in your browser — nothing you type is uploaded or
            stored. No account needed, ever.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Fyxia. All calculations are estimates — verify anything financial or legal with an official source.
      </div>
    </footer>
  );
}
