import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import LiquidBackground from "@/components/ui/LiquidBackground";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://fyxia.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fyxia — Free Online Tools, No Sign-up",
    template: "%s | Fyxia",
  },
  description:
    "Free calculators, converters and generators — Zakat calculator, Pakistan income tax calculator, unit & currency converters, QR code generator, password generator and more. No sign-up, no data stored.",
  keywords: [
    "free online tools",
    "zakat calculator",
    "pakistan income tax calculator",
    "unit converter",
    "currency converter",
    "qr code generator",
    "password generator",
    "word counter",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Fyxia",
    title: "Fyxia — Free Online Tools, No Sign-up",
    description:
      "Free calculators, converters and generators. Everything runs in your browser — no account, no data stored.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fyxia — Free Online Tools, No Sign-up",
    description:
      "Free calculators, converters and generators. No sign-up, no data stored.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LiquidBackground />
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
