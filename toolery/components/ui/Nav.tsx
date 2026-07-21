import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-violet-400 text-[13px] font-bold text-black">
              T
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
              Toolery
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted">
            <Link href="/#local" className="hover:text-fg transition-colors">Local</Link>
            <Link href="/#convert" className="hover:text-fg transition-colors">Convert</Link>
            <Link href="/#generate" className="hover:text-fg transition-colors">Generate</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
