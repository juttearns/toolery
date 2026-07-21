import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import WordCounter from "@/components/tools/WordCounter";

export const metadata: Metadata = {
  title: "Word Counter",
  description: "Count words, characters, sentences and estimated reading time as you type.",
  alternates: { canonical: "/tools/word-counter" },
  openGraph: {
    title: "Word Counter | Toolery",
    description: "Count words, characters, sentences and estimated reading time as you type.",
    url: "/tools/word-counter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Word Counter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Count words, characters, sentences and estimated reading time as you type.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="word-counter"
        eyebrow="Generate"
        title="Word Counter"
        description="Count words, characters, sentences and estimated reading time as you type."
      >
        <WordCounter />
      </ToolShell>
    </>
  );
}
