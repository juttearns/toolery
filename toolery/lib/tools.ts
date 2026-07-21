export type ToolCategory = "local" | "convert" | "generate";

export interface ToolMeta {
  slug: string;
  name: string;
  short: string;
  category: ToolCategory;
}

export const categoryLabel: Record<ToolCategory, string> = {
  local: "Local",
  convert: "Convert",
  generate: "Generate",
};

export const categoryColor: Record<ToolCategory, string> = {
  local: "text-emerald",
  convert: "text-teal",
  generate: "text-violet",
};

export const tools: ToolMeta[] = [
  {
    slug: "zakat-calculator",
    name: "Zakat Calculator",
    short: "Work out your annual Zakat on cash, gold, silver and savings.",
    category: "local",
  },
  {
    slug: "income-tax-calculator",
    name: "Pakistan Income Tax Calculator",
    short: "FY 2026-27 salary tax slabs — monthly and annual tax, instantly.",
    category: "local",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    short: "Length, weight, temperature, area and volume, all in one place.",
    category: "convert",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    short: "Convert PKR to major world currencies with editable rates.",
    category: "convert",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    short: "Turn any link or text into a downloadable QR code.",
    category: "generate",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    short: "Strong, random passwords with full control over length and characters.",
    category: "generate",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    short: "Words, characters, sentences and reading time as you type.",
    category: "generate",
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
