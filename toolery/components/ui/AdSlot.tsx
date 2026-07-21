/**
 * AdSlot — placeholder container for Adsterra ad units.
 *
 * HOW TO WIRE UP ADSTERRA:
 * 1. Get your ad unit script/iframe code from the Adsterra dashboard
 *    (Native Banner, Banner, or Social Bar).
 * 2. Paste it inside the matching <div id="..."> below, or drop the
 *    <script> tag directly where the comment says PASTE HERE.
 * 3. Keep the wrapping div/className so spacing + the "Advertisement"
 *    label stay consistent across pages.
 *
 * Slot ids already placed across the site:
 *  - ad-home-top          (homepage, below hero)
 *  - ad-home-native        (homepage, inside tool grid)
 *  - ad-tool-top           (every /tools/* page, above the tool)
 *  - ad-tool-bottom        (every /tools/* page, below the tool)
 */
export default function AdSlot({
  id,
  className = "",
  minHeight = 100,
}: {
  id: string;
  className?: string;
  minHeight?: number;
}) {
  return (
    <div
      className={`glass rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <div id={id} className="w-full h-full flex items-center justify-center">
        {/* PASTE ADSTERRA CODE HERE */}
        <span className="text-[11px] uppercase tracking-wider text-muted/70">
          Advertisement
        </span>
      </div>
    </div>
  );
}
