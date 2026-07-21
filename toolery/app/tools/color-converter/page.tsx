import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import ColorConverter from "@/components/tools/ColorConverter";

export const metadata: Metadata = {
  title: "Color Converter",
  description: "Convert between HEX, RGB and HSL color codes with a live preview.",
  alternates: { canonical: "/tools/color-converter" },
  openGraph: {
    title: "Color Converter | Toolery",
    description: "Convert between HEX, RGB and HSL color codes with a live preview.",
    url: "/tools/color-converter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Color Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert between HEX, RGB and HSL color codes with a live preview.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="color-converter"
        eyebrow="Convert"
        title="Color Converter"
        description="Convert between HEX, RGB and HSL with a live preview."
      >
        <ColorConverter />
      </ToolShell>
    </>
  );
}
