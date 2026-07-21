import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import DateDifferenceCalculator from "@/components/tools/DateDifferenceCalculator";

export const metadata: Metadata = {
  title: "Date Difference Calculator",
  description: "Find the days, weeks and months between any two dates.",
  alternates: { canonical: "/tools/date-difference-calculator" },
  openGraph: {
    title: "Date Difference Calculator | Toolery",
    description: "Find the days, weeks and months between any two dates.",
    url: "/tools/date-difference-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Date Difference Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Find the days, weeks and months between any two dates.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="date-difference-calculator"
        eyebrow="Local"
        title="Date Difference Calculator"
        description="Days, weeks and months between any two dates."
      >
        <DateDifferenceCalculator />
      </ToolShell>
    </>
  );
}
