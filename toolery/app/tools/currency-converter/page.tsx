import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import CurrencyConverter from "@/components/tools/CurrencyConverter";

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Convert Pakistani Rupees to major world currencies with editable exchange rates.",
  alternates: { canonical: "/tools/currency-converter" },
  openGraph: {
    title: "Currency Converter | Toolery",
    description: "Convert Pakistani Rupees to major world currencies with editable exchange rates.",
    url: "/tools/currency-converter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Currency Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert Pakistani Rupees to major world currencies with editable exchange rates.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="currency-converter"
        eyebrow="Convert"
        title="Currency Converter"
        description="Convert Pakistani Rupees to major world currencies with editable exchange rates."
      >
        <CurrencyConverter />
      </ToolShell>
    </>
  );
}
