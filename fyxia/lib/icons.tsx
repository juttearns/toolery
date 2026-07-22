import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ZakatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18M8 6.5h5.5a2.5 2.5 0 0 1 0 5H8.5a2.5 2.5 0 0 0 0 5H16" />
    </svg>
  );
}

export function TaxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function UnitConverterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h13M17 8l-3-3M17 8l-3 3" />
      <path d="M20 16H7M7 16l3-3M7 16l3 3" />
    </svg>
  );
}

export function CurrencyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="9" r="5.5" />
      <circle cx="15" cy="15" r="5.5" />
    </svg>
  );
}

export function QrIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
      <path d="M14.5 15h2.5v2.5M20.5 14.5v.01M17 20.5h3.5v-3M14.5 20.5v-2.5" />
    </svg>
  );
}

export function PasswordIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WordCounterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16M4 10h16M4 15h10M4 20h6" />
    </svg>
  );
}

export function AmountInWordsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 7h5.5M5 12h3M5 17h4" />
      <path d="M13 6.5h6M13 6.5l2 11M19 6.5l-2 11M13 12h5" />
    </svg>
  );
}

export function AgeCalculatorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8 3v3M16 3v3" />
      <path d="M12 13v3l2 1.3" />
      <circle cx="12" cy="14.5" r="3.4" />
    </svg>
  );
}

export function LoanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="7" width="17" height="11" rx="2" />
      <path d="M3.5 10.5h17" />
      <circle cx="8" cy="14" r="1.6" />
      <path d="M14 14h3.5" />
    </svg>
  );
}

export function PercentageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 18 18 6" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}

export function BmiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M12 11.2V21M8 21h8" />
      <path d="M16 5l2-2M16 5l2.2.6" />
    </svg>
  );
}

export function DiscountIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12.5 12.5 3.5h6a2 2 0 0 1 2 2v6l-9 9a1.5 1.5 0 0 1-2.1 0l-5.9-5.9a1.5 1.5 0 0 1 0-2.1Z" />
      <circle cx="16.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TextCaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 16 8 6l4.5 10M4.7 13h6.6" />
      <path d="M15 10.5a2.5 2.5 0 1 1 2.5 2.5c-1.4 0-2.3.9-2.5 2.2" />
      <path d="M15 16h5" />
    </svg>
  );
}

export function ColorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8 8.5c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6h1.9c2.6 0 4.6-2.1 4.6-4.6C20.5 6.6 16.7 3.5 12 3.5Z" />
      <circle cx="7.3" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.3" cy="7.3" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.8" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M5.5 9.5V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 20v-4a2.5 2.5 0 0 1 5 0v4" />
    </svg>
  );
}

export function DateDiffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="8" height="15" rx="1.6" />
      <rect x="12.5" y="3.5" width="8" height="15" rx="1.6" />
      <path d="M3.5 9h8M12.5 7.5h8" />
      <path d="M6 5v-2M9 5v-2M15 3.5v-2M18 3.5v-2" />
    </svg>
  );
}

export function ImageConvertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="12" height="10" rx="1.6" />
      <circle cx="6.3" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
      <path d="M3 12.5l3.2-3 2.5 2.3 2-1.8 4.3 4" />
      <path d="M17 9.5h4M21 9.5l-2-2M21 9.5l-2 2" />
      <path d="M20 14.5h-4M16 14.5l2-2M16 14.5l2 2" />
    </svg>
  );
}

export function BgRemoveIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="2.5 2.5" />
      <path d="M8 16c0-4 1.8-7 4-7s4 3 4 7" />
      <circle cx="12" cy="8.5" r="2" />
    </svg>
  );
}

export function ImageEnhanceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="13" height="13" rx="1.8" />
      <circle cx="8.5" cy="10" r="1.7" />
      <path d="M4.5 17l4-4 2.5 2.2 3-3.2 3 3" />
      <path d="M19 3.5v3.5M17.3 5.3h3.4" />
      <path d="M20.3 9v2.2M19.2 10.1h2.2" />
    </svg>
  );
}

export const toolIcons = {
  "zakat-calculator": ZakatIcon,
  "income-tax-calculator": TaxIcon,
  "unit-converter": UnitConverterIcon,
  "currency-converter": CurrencyIcon,
  "qr-code-generator": QrIcon,
  "password-generator": PasswordIcon,
  "word-counter": WordCounterIcon,
  "amount-in-words": AmountInWordsIcon,
  "age-calculator": AgeCalculatorIcon,
  "loan-calculator": LoanIcon,
  "percentage-calculator": PercentageIcon,
  "bmi-calculator": BmiIcon,
  "discount-calculator": DiscountIcon,
  "text-case-converter": TextCaseIcon,
  "color-converter": ColorIcon,
  "tip-calculator": TipIcon,
  "date-difference-calculator": DateDiffIcon,
  "image-converter": ImageConvertIcon,
  "background-remover": BgRemoveIcon,
  "image-enhancer": ImageEnhanceIcon,
} as const;

export type ToolIconSlug = keyof typeof toolIcons;
