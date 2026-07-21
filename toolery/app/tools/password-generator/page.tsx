import type { Metadata } from "next";
import ToolShell from "@/components/ui/ToolShell";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Generate strong, random passwords with full control over length and character types.",
  alternates: { canonical: "/tools/password-generator" },
  openGraph: {
    title: "Password Generator | Toolery",
    description: "Generate strong, random passwords with full control over length and character types.",
    url: "/tools/password-generator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Password Generator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Generate strong, random passwords with full control over length and character types.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolShell
        icon="password-generator"
        eyebrow="Generate"
        title="Password Generator"
        description="Generate strong, random passwords with full control over length and character types."
      >
        <PasswordGenerator />
      </ToolShell>
    </>
  );
}
