import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import IncomeTaxCalculator from "@/components/tools/IncomeTaxCalculator";

export const metadata: Metadata = {
  title: "Pakistan Income Tax Calculator (FY 2026-27)",
  description: "Estimate your monthly and annual income tax on salary using the latest FBR slabs for FY 2026-27.",
  alternates: { canonical: "/tools/income-tax-calculator" },
  openGraph: {
    title: "Pakistan Income Tax Calculator (FY 2026-27) | Fyxia",
    description: "Estimate your monthly and annual income tax on salary using the latest FBR slabs for FY 2026-27.",
    url: "/tools/income-tax-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pakistan Income Tax Calculator (FY 2026-27)",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Estimate your monthly and annual income tax on salary using the latest FBR slabs for FY 2026-27.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="income-tax-calculator"
        eyebrow="Local"
        title="Pakistan Income Tax Calculator (FY 2026-27)"
        description="Estimate your monthly and annual income tax on salary using the latest FBR slabs for FY 2026-27."
      >
        <IncomeTaxCalculator />
      </ToolShell>
    </>
  );
}
