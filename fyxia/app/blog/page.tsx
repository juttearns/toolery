import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English explainers on Zakat, EMI, BMI, and Pakistan income tax — the math behind Fyxia's calculators.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Fyxia",
    description:
      "Plain-English explainers on Zakat, EMI, BMI, and Pakistan income tax — the math behind Fyxia's calculators.",
    url: "/blog",
  },
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <span className="text-xs font-semibold uppercase tracking-wider text-teal">
        Blog
      </span>
      <h1 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-fg">
        The math behind the calculators
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Plain-English explainers for the formulas Fyxia&rsquo;s tools run on
        — no jargon, no fluff, just how the numbers actually work.
      </p>

      <div className="mt-10 space-y-4">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <GlassCard className="p-5 sm:p-6">
              <div className="flex items-center gap-3 text-xs text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-display mt-2 text-xl font-semibold text-fg">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
