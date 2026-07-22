import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import AgeCalculator from "@/components/tools/AgeCalculator";

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Find your exact age in years, months and days from your date of birth.",
  alternates: { canonical: "/tools/age-calculator" },
  openGraph: {
    title: "Age Calculator | Fyxia",
    description: "Find your exact age in years, months and days from your date of birth.",
    url: "/tools/age-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Age Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Find your exact age in years, months and days from your date of birth.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="age-calculator"
        eyebrow="Local"
        title="Age Calculator"
        description="Find your exact age in years, months and days from your date of birth."
      >
        <AgeCalculator />
      </ToolShell>
    </>
  );
}
