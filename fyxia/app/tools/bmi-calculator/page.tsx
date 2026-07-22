import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import BmiCalculator from "@/components/tools/BmiCalculator";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index from height and weight, with the healthy range.",
  alternates: { canonical: "/tools/bmi-calculator" },
  openGraph: {
    title: "BMI Calculator | Fyxia",
    description: "Calculate your Body Mass Index from height and weight, with the healthy range.",
    url: "/tools/bmi-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMI Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate your Body Mass Index from height and weight, with the healthy range.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="bmi-calculator"
        eyebrow="Local"
        title="BMI Calculator"
        description="Body Mass Index from your height and weight, with the healthy range."
      >
        <BmiCalculator />
      </ToolShell>
    </>
  );
}
