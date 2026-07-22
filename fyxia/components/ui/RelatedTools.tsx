import Link from "next/link";
import GlassCard from "./GlassCard";
import { tools } from "@/lib/tools";
import { toolIcons } from "@/lib/icons";

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return null;

  const sameCategory = tools.filter(
    (t) => t.slug !== currentSlug && t.category === current.category
  );
  const others = tools.filter(
    (t) => t.slug !== currentSlug && t.category !== current.category
  );
  const list = [...sameCategory, ...others].slice(0, 3);
  if (list.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-wider text-muted mb-3">
        Related tools
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {list.map((tool) => {
          const Icon = toolIcons[tool.slug as keyof typeof toolIcons];
          return (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <GlassCard className="p-4 h-full">
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="h-4 w-4 shrink-0 text-teal" />}
                  <span className="text-sm font-medium text-fg">{tool.name}</span>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
