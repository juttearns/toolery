import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import ImageConverter from "@/components/tools/ImageConverter";

export const metadata: Metadata = {
  title: "Image Converter",
  description: "Convert images between PNG, JPG and WEBP — right in your browser, nothing uploaded.",
  alternates: { canonical: "/tools/image-converter" },
  openGraph: {
    title: "Image Converter | Fyxia",
    description: "Convert images between PNG, JPG and WEBP — right in your browser, nothing uploaded.",
    url: "/tools/image-converter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert images between PNG, JPG and WEBP — right in your browser, nothing uploaded.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="image-converter"
        eyebrow="Convert"
        title="Image Converter"
        description="Convert images between PNG, JPG and WEBP — right in your browser."
      >
        <ImageConverter />
      </ToolShell>
    </>
  );
}
