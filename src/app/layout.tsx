import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wanadigital.com"),
  title: {
    default: "Wana Digital | Jasa Desain Grafis & Digital Profesional Bali",
    template: "%s | Wana Digital",
  },
  description:
    "Wana Digital – Studio desain grafis & digital profesional di Bali. Layanan logo, brand identity, desain media sosial, packaging, web development, dan mobile app. Wujudkan ide Anda menjadi karya visual yang memukau.",
  keywords: [
    "jasa desain grafis",
    "desain logo",
    "brand identity",
    "desain media sosial",
    "jasa desain bali",
    "web development bali",
    "wana digital",
    "studio desain bali",
    "graphic design indonesia",
    "desain kemasan",
  ],
  verification: {
    google: "YI4NyyLDNnPkTUEZFFHPSFRP6uQvPUUPb1RAaYQ_sT0",
  },
  authors: [{ name: "Wana Digital", url: "https://wanadigital.com" }],
  creator: "Wana Digital",
  publisher: "Wana Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://wanadigital.com",
    siteName: "Wana Digital",
    title: "Wana Digital | Jasa Desain Grafis & Digital Profesional Bali",
    description:
      "Studio desain grafis & digital profesional di Bali. Logo, brand identity, social media, web development, dan mobile app.",
    images: [
      {
        url: "/asset/Logo Wana Digital.png",
        width: 1200,
        height: 630,
        alt: "Wana Digital – Jasa Desain Grafis Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wana Digital | Jasa Desain Grafis & Digital Profesional Bali",
    description:
      "Studio desain grafis & digital profesional di Bali. Logo, brand identity, social media, web development, dan mobile app.",
    images: ["/asset/Logo Wana Digital.png"],
  },
  alternates: {
    canonical: "https://wanadigital.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Wana Digital",
    url: "https://wanadigital.com",
    logo: "https://wanadigital.com/asset/Logo Wana Digital.png",
    description:
      "Studio desain grafis & digital profesional di Bali. Layanan logo, brand identity, desain media sosial, packaging, web development, dan mobile app.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    areaServed: "Indonesia",
    serviceType: [
      "Logo Design",
      "Brand Identity",
      "Social Media Design",
      "Print & Packaging Design",
      "Web Development",
      "Mobile App Development",
    ],
    sameAs: [],
  };

  return (
    <html
      lang="id"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-serif">{children}</body>
    </html>
  );
}
