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
  {
    slug: "amount-in-words",
    name: "Amount in Words",
    short: "Convert any number into words — perfect for cheques and invoices.",
    category: "generate",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    short: "Find your exact age in years, months and days from your birth date.",
    category: "local",
  },
  {
    slug: "loan-calculator",
    name: "Loan / EMI Calculator",
    short: "Monthly instalment, total interest and payoff breakdown for any loan.",
    category: "convert",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    short: "Percent of a number, percentage change, and what-percent-is-X-of-Y.",
    category: "generate",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    short: "Body Mass Index from your height and weight, with the healthy range.",
    category: "local",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    short: "Final price, amount saved, and stacked discounts in one go.",
    category: "convert",
  },
  {
    slug: "text-case-converter",
    name: "Text Case Converter",
    short: "UPPERCASE, lowercase, Title Case, camelCase, snake_case and more.",
    category: "generate",
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    short: "Convert between HEX, RGB and HSL with a live preview.",
    category: "convert",
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    short: "Split the bill and tip evenly across any number of people.",
    category: "generate",
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    short: "Days, weeks and months between any two dates.",
    category: "local",
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    short: "Convert images between PNG, JPG and WEBP — right in your browser.",
    category: "convert",
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    short: "Remove image backgrounds with AI, one photo or a whole batch at once.",
    category: "convert",
  },
  {
    slug: "image-enhancer",
    name: "Image Enhancer",
    short: "Auto-enhance or fine-tune brightness, contrast, sharpness and more.",
    category: "convert",
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
