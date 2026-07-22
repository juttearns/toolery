import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import TextCaseConverter from "@/components/tools/TextCaseConverter";

export const metadata: Metadata = {
  title: "Text Case Converter",
  description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and more.",
  alternates: { canonical: "/tools/text-case-converter" },
  openGraph: {
    title: "Text Case Converter | Fyxia",
    description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and more.",
    url: "/tools/text-case-converter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Text Case Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case and more.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="text-case-converter"
        eyebrow="Generate"
        title="Text Case Converter"
        description="UPPERCASE, lowercase, Title Case, camelCase, snake_case and more — tap to copy."
      >
        <TextCaseConverter />
      </ToolShell>
    </>
  );
}
