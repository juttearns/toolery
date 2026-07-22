import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import BackgroundRemover from "@/components/tools/BackgroundRemover";

export const metadata: Metadata = {
  title: "Background Remover",
  description:
    "Remove image backgrounds with on-device AI — one photo or a whole batch, nothing uploaded to a server.",
  alternates: { canonical: "/tools/background-remover" },
  openGraph: {
    title: "Background Remover | Fyxia",
    description:
      "Remove image backgrounds with on-device AI — one photo or a whole batch, nothing uploaded to a server.",
    url: "/tools/background-remover",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Background Remover",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Remove image backgrounds with on-device AI — one photo or a whole batch, nothing uploaded to a server.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="background-remover"
        eyebrow="Convert"
        title="Background Remover"
        description="Remove backgrounds with AI, one photo or a whole batch at once — fully on-device."
      >
        <BackgroundRemover />
      </ToolShell>
    </>
  );
}
