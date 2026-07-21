import { ReactNode } from "react";

/**
 * AdSlot — container for Adsterra ad units.
 *
 * HOW TO WIRE UP ADSTERRA:
 * 1. Get your ad unit script/code from the Adsterra dashboard
 *    (Native Banner, Banner, or Social Bar).
 * 2. Build a small client component that injects it (see
 *    NativeBannerAd.tsx for the pattern) and pass it in as `children`
 *    wherever this slot is rendered.
 * 3. Keep the wrapping div/className so spacing stays consistent
 *    across pages even before an ad is wired up.
 *
 * Slot ids across the site:
 *  - ad-home-top          (homepage, below hero) — live: NativeBannerAd
 *  - ad-home-native        (homepage, inside tool grid)
 *  - ad-tool-top           (every /tools/* page, above the tool)
 *  - ad-tool-bottom        (every /tools/* page, below the tool)
 */
export default function AdSlot({
  id,
  className = "",
  minHeight = 100,
  children,
}: {
  id: string;
  className?: string;
  minHeight?: number;
  children?: ReactNode;
}) {
  return (
    <div
      className={`glass rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <div id={id} className="w-full h-full flex items-center justify-center">
        {children ?? (
          <span className="text-[11px] uppercase tracking-wider text-muted/70">
            Advertisement
          </span>
        )}
      </div>
    </div>
  );
}
