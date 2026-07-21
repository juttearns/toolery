import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import TipCalculator from "@/components/tools/TipCalculator";

export const metadata: Metadata = {
  title: "Tip Calculator",
  description: "Split the bill and tip evenly across any number of people.",
  alternates: { canonical: "/tools/tip-calculator" },
  openGraph: {
    title: "Tip Calculator | Toolery",
    description: "Split the bill and tip evenly across any number of people.",
    url: "/tools/tip-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tip Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Split the bill and tip evenly across any number of people.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="tip-calculator"
        eyebrow="Generate"
        title="Tip Calculator"
        description="Split the bill and tip evenly across any number of people."
      >
        <TipCalculator />
      </ToolShell>
    </>
  );
}
