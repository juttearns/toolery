export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readTime: string;
  relatedTool?: string; // tool slug, for the CTA and internal linking
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-zakat-is-calculated-in-pakistan",
    title: "How Zakat Is Calculated: The Nisab Threshold and the 2.5% Rule",
    excerpt:
      "What Nisab actually means, which assets count toward it, and the exact formula behind the 2.5% Zakat rate.",
    date: "2026-07-21",
    readTime: "6 min read",
    relatedTool: "zakat-calculator",
  },
  {
    slug: "how-emi-is-calculated",
    title: "How EMI Is Calculated: The Math Behind Your Loan Installment",
    excerpt:
      "The formula lenders use to compute your fixed monthly payment, and why the early months of any loan are mostly interest.",
    date: "2026-07-21",
    readTime: "7 min read",
    relatedTool: "loan-calculator",
  },
  {
    slug: "bmi-explained",
    title: "BMI Explained: What It Measures — and What It Doesn't",
    excerpt:
      "Where the BMI formula comes from, why it was never meant to judge one individual, and how to actually read your number.",
    date: "2026-07-21",
    readTime: "5 min read",
    relatedTool: "bmi-calculator",
  },
  {
    slug: "pakistan-income-tax-slabs-fy-2026-27",
    title: "Pakistan Salary Tax Slabs for FY 2026-27, Explained",
    excerpt:
      "A plain-English walkthrough of the salaried income tax slabs for the current tax year, with a worked example.",
    date: "2026-07-21",
    readTime: "6 min read",
    relatedTool: "income-tax-calculator",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
