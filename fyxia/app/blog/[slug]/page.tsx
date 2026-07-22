import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/lib/blog";
import { blogContent } from "@/lib/blog-content";
import { tools } from "@/lib/tools";
import { toolIcons } from "@/lib/icons";
import GlassCard from "@/components/ui/GlassCard";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Fyxia`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const Content = blogContent[slug];
  if (!post || !Content) notFound();

  const relatedTool = post.relatedTool
    ? tools.find((t) => t.slug === post.relatedTool)
    : undefined;
  const RelatedIcon = relatedTool
    ? toolIcons[relatedTool.slug as keyof typeof toolIcons]
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Fyxia" },
    publisher: { "@type": "Organization", name: "Fyxia" },
    mainEntityOfPage: `https://fyxia.vercel.app/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/blog"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Blog
        </Link>

        <div className="flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="font-display mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-fg">
          {post.title}
        </h1>

        <div className="article mt-8">
          <Content />
        </div>

        {relatedTool && (
          <Link href={`/tools/${relatedTool.slug}`} className="block mt-10">
            <GlassCard className="p-5 flex items-center gap-4">
              {RelatedIcon && (
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-teal">
                  <RelatedIcon className="h-6 w-6" />
                </span>
              )}
              <div>
                <div className="text-xs uppercase tracking-wider text-muted">
                  Try it yourself
                </div>
                <div className="font-display mt-0.5 font-semibold text-fg">
                  {relatedTool.name}
                </div>
              </div>
            </GlassCard>
          </Link>
        )}
      </main>
    </>
  );
}
