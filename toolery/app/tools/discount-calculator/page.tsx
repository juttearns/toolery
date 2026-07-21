import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import DiscountCalculator from "@/components/tools/DiscountCalculator";

export const metadata: Metadata = {
  title: "Discount Calculator",
  description: "Final price, amount saved, and stacked discounts calculated instantly.",
  alternates: { canonical: "/tools/discount-calculator" },
  openGraph: {
    title: "Discount Calculator | Toolery",
    description: "Final price, amount saved, and stacked discounts calculated instantly.",
    url: "/tools/discount-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Discount Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Final price, amount saved, and stacked discounts calculated instantly.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="discount-calculator"
        eyebrow="Convert"
        title="Discount Calculator"
        description="Final price, amount saved, and stacked discounts in one go."
      >
        <DiscountCalculator />
      </ToolShell>
    </>
  );
}
