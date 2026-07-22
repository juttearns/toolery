import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import LoanCalculator from "@/components/tools/LoanCalculator";

export const metadata: Metadata = {
  title: "Loan / EMI Calculator",
  description: "Calculate monthly instalment (EMI), total interest and payoff breakdown for any loan.",
  alternates: { canonical: "/tools/loan-calculator" },
  openGraph: {
    title: "Loan / EMI Calculator | Fyxia",
    description: "Calculate monthly instalment (EMI), total interest and payoff breakdown for any loan.",
    url: "/tools/loan-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Loan / EMI Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate monthly instalment (EMI), total interest and payoff breakdown for any loan.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="loan-calculator"
        eyebrow="Convert"
        title="Loan / EMI Calculator"
        description="Calculate your monthly instalment, total interest and full payoff breakdown."
      >
        <LoanCalculator />
      </ToolShell>
    </>
  );
}
