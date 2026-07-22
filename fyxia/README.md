# Fyxia — Free Online Tools

Next.js 16 (App Router) + Tailwind 4. Liquid-glass UI, no sign-up, no backend.
7 tools live: Zakat Calculator, Pakistan Income Tax Calculator (FY 2026-27),
Unit Converter, Currency Converter, QR Code Generator, Password Generator,
Word Counter.

## Deploy on Vercel (no local build needed)

1. Push this folder to a GitHub repo, or drag the unzipped folder into
   Vercel's "Add New Project" -> Import.
2. Vercel auto-detects Next.js (vercel.json pins framework: nextjs) and
   runs `npm install && next build` on its own servers - you don't need
   Node installed locally.
3. Deploy. Done.

If you deploy under a custom domain, update SITE_URL in:
- app/layout.tsx
- app/sitemap.ts
- app/robots.ts

so canonical URLs, sitemap.xml and Open Graph tags point at the real domain
(this matters for SEO - search engines penalize mismatched canonicals).

## Wiring up Adsterra

Ad placeholders are already placed across the site using the AdSlot
component (components/ui/AdSlot.tsx). Each one renders a labeled glass box
so the layout looks right even before ads are added.

Slots currently on the site:
- ad-home-top      - homepage, below the hero
- ad-home-native   - homepage, inside the tool grid
- ad-tool-top      - every /tools/* page, above the tool
- ad-tool-bottom   - every /tools/* page, below the tool

To go live:
1. Get your ad unit code from the Adsterra dashboard (Native Banner, Banner,
   or Social Bar).
2. Open components/ui/AdSlot.tsx and paste the script/iframe code where it
   says "PASTE ADSTERRA CODE HERE" - or target a specific slot id if you
   want different ad units per page.
3. Adsterra scripts write directly into the DOM, so keep them inside the
   plain div already set up as the mount point.
4. Add more <AdSlot id="..." /> anywhere else you want an ad (e.g. inside a
   specific tool's result section).

## SEO already in place

- Per-page title, meta description, canonical URL and Open Graph tags
  (app/tools/*/page.tsx).
- SoftwareApplication JSON-LD structured data on every tool page.
- Auto-generated sitemap.xml (app/sitemap.ts) and robots.txt
  (app/robots.ts).
- Each tool lives at its own crawlable URL (/tools/<slug>) with real
  server-rendered content, not just a client-side app shell.

## Adding a new tool

1. Add an entry to lib/tools.ts (slug, name, short description, category).
2. Create components/tools/YourTool.tsx as a client component.
3. Create app/tools/your-tool-slug/page.tsx - copy an existing tool page
   and swap the title/description/component import.

It'll automatically show up on the homepage and in the sitemap.
