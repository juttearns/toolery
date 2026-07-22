import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import PercentageCalculator from "@/components/tools/PercentageCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator",
  description: "Percent of a number, percentage change, and what-percent-is-X-of-Y — all in one tool.",
  alternates: { canonical: "/tools/percentage-calculator" },
  openGraph: {
    title: "Percentage Calculator | Fyxia",
    description: "Percent of a number, percentage change, and what-percent-is-X-of-Y — all in one tool.",
    url: "/tools/percentage-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Percentage Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Percent of a number, percentage change, and what-percent-is-X-of-Y — all in one tool.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="percentage-calculator"
        eyebrow="Generate"
        title="Percentage Calculator"
        description="Percent of a number, percentage change, and what-percent-is-X-of-Y."
      >
        <PercentageCalculator />
      </ToolShell>
    </>
  );
}
