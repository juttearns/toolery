import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import AmountInWords from "@/components/tools/AmountInWords";

export const metadata: Metadata = {
  title: "Amount in Words",
  description: "Convert any number into words — perfect for cheques and invoices. Supports Lakh/Crore and Million/Billion.",
  alternates: { canonical: "/tools/amount-in-words" },
  openGraph: {
    title: "Amount in Words | Fyxia",
    description: "Convert any number into words — perfect for cheques and invoices.",
    url: "/tools/amount-in-words",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Amount in Words",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert any number into words — perfect for cheques and invoices.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="amount-in-words"
        eyebrow="Generate"
        title="Amount in Words"
        description="Convert any number into words — perfect for cheques and invoices."
      >
        <AmountInWords />
      </ToolShell>
    </>
  );
}
