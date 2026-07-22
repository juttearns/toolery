import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import ImageEnhancer from "@/components/tools/ImageEnhancer";

export const metadata: Metadata = {
  title: "Image Enhancer",
  description:
    "Auto-enhance or fine-tune brightness, contrast, saturation, warmth and sharpness — single image or batch.",
  alternates: { canonical: "/tools/image-enhancer" },
  openGraph: {
    title: "Image Enhancer | Fyxia",
    description:
      "Auto-enhance or fine-tune brightness, contrast, saturation, warmth and sharpness — single image or batch.",
    url: "/tools/image-enhancer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Enhancer",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Auto-enhance or fine-tune brightness, contrast, saturation, warmth and sharpness — single image or batch.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="image-enhancer"
        eyebrow="Convert"
        title="Image Enhancer"
        description="Auto-enhance or fine-tune brightness, contrast, sharpness and more."
      >
        <ImageEnhancer />
      </ToolShell>
    </>
  );
}
