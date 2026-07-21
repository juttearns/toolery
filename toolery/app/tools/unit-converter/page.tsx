import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import UnitConverter from "@/components/tools/UnitConverter";

export const metadata: Metadata = {
  title: "Unit Converter",
  description: "Convert length, weight, temperature, area and volume between metric and imperial units.",
  alternates: { canonical: "/tools/unit-converter" },
  openGraph: {
    title: "Unit Converter | Toolery",
    description: "Convert length, weight, temperature, area and volume between metric and imperial units.",
    url: "/tools/unit-converter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Unit Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert length, weight, temperature, area and volume between metric and imperial units.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="unit-converter"
        eyebrow="Convert"
        title="Unit Converter"
        description="Convert length, weight, temperature, area and volume between metric and imperial units."
      >
        <UnitConverter />
      </ToolShell>
    </>
  );
}
