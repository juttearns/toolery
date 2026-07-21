import { ReactNode } from "react";
import AdSlot from "./AdSlot";

export default function ToolShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal">
          {eyebrow}
        </span>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-fg">
          {title}
        </h1>
        <p className="mt-3 text-muted max-w-xl">{description}</p>
      </div>

      <AdSlot id="ad-tool-top" className="mb-8" minHeight={90} />

      {children}

      <AdSlot id="ad-tool-bottom" className="mt-10" minHeight={90} />
    </main>
  );
}
