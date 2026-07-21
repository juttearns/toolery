import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import ZakatCalculator from "@/components/tools/ZakatCalculator";

export const metadata: Metadata = {
  title: "Zakat Calculator",
  description: "Calculate your annual Zakat on cash, gold, silver and savings using the Nisab threshold.",
  alternates: { canonical: "/tools/zakat-calculator" },
  openGraph: {
    title: "Zakat Calculator | Toolery",
    description: "Calculate your annual Zakat on cash, gold, silver and savings using the Nisab threshold.",
    url: "/tools/zakat-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zakat Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate your annual Zakat on cash, gold, silver and savings using the Nisab threshold.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="zakat-calculator"
        eyebrow="Local"
        title="Zakat Calculator"
        description="Calculate your annual Zakat on cash, gold, silver and savings using the Nisab threshold."
      >
        <ZakatCalculator />
      </ToolShell>
    </>
  );
}
