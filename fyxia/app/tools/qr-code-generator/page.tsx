import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Turn any link or text into a downloadable QR code, with custom colors.",
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    title: "QR Code Generator | Fyxia",
    description: "Turn any link or text into a downloadable QR code, with custom colors.",
    url: "/tools/qr-code-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QR Code Generator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Turn any link or text into a downloadable QR code, with custom colors.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="qr-code-generator"
        eyebrow="Generate"
        title="QR Code Generator"
        description="Turn any link or text into a downloadable QR code, with custom colors."
      >
        <QrCodeGenerator />
      </ToolShell>
    </>
  );
}
