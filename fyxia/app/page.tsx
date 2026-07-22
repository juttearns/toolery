import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import AdSlot from "@/components/ui/AdSlot";
import NativeBannerAd from "@/components/ui/NativeBannerAd";
import { tools, categoryColor, ToolCategory } from "@/lib/tools";
import { toolIcons } from "@/lib/icons";

const sections: { id: ToolCategory; heading: string; blurb: string }[] = [
  {
    id: "local",
    heading: "Local",
    blurb: "Built around Pakistan — Zakat, salary tax, and more on the way.",
  },
  {
    id: "convert",
    heading: "Convert",
    blurb: "Everyday conversions, no ads-covered pop-ups getting in the way.",
  },
  {
    id: "generate",
    heading: "Generate",
    blurb: "Create the thing you need — a code, a password, a count.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal">
          Free · No sign-up · Runs in your browser
        </span>
        <h1 className="font-display mt-4 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
          One toolbox.{" "}
          <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">
            Every calculation.
          </span>
        </h1>
        <p className="mt-5 text-lg text-muted max-w-xl">
          Fyxia is a growing set of free online tools — calculators,
          converters, and generators — built for quick answers without an
          account, an app, or your data ever leaving your browser.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot id="ad-home-top" minHeight={100} className="mb-14">
          <div className="w-full max-w-sm mx-auto">
            <NativeBannerAd />
          </div>
        </AdSlot>
      </div>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mx-auto max-w-6xl px-4 sm:px-6 mb-16 scroll-mt-24"
        >
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <h2 className={`font-display text-2xl font-semibold ${categoryColor[section.id]}`}>
                {section.heading}
              </h2>
              <p className="text-sm text-muted mt-1">{section.blurb}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tools
              .filter((t) => t.category === section.id)
              .map((tool) => {
                const Icon = toolIcons[tool.slug as keyof typeof toolIcons];
                return (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                    <GlassCard className="p-4 h-full flex flex-col items-center text-center gap-2.5">
                      {Icon && (
                        <span
                          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ${categoryColor[tool.category]}`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                      )}
                      <span className="text-sm font-medium leading-snug text-fg">
                        {tool.name}
                      </span>
                    </GlassCard>
                  </Link>
                );
              })}
          </div>

          {section.id === "convert" && (
            <div className="mt-6">
              <AdSlot id="ad-home-native" minHeight={100} />
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
