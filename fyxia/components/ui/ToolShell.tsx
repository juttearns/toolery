import Link from "next/link";
import { ReactNode } from "react";
import AdSlot from "./AdSlot";
import BannerAd from "./BannerAd";
import RelatedTools from "./RelatedTools";
import { toolIcons, ToolIconSlug } from "@/lib/icons";

export default function ToolShell({
  eyebrow,
  title,
  description,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ToolIconSlug;
  children: ReactNode;
}) {
  const Icon = icon ? toolIcons[icon] : null;
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        All tools
      </Link>

      <div className="mb-6 flex items-start gap-4">
        {Icon && (
          <span className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-teal">
            <Icon className="h-6 w-6" />
          </span>
        )}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal">
            {eyebrow}
          </span>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-fg">
            {title}
          </h1>
          <p className="mt-3 text-muted max-w-xl">{description}</p>
        </div>
      </div>

      <AdSlot id="ad-tool-top" className="mb-8" minHeight={250}>
        <BannerAd />
      </AdSlot>

      {children}

      {icon && <RelatedTools currentSlug={icon} />}

      <AdSlot id="ad-tool-bottom" className="mt-10" minHeight={90} />
    </main>
  );
}
