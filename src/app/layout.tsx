import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { generateWebsiteSchema, generateOrganizationSchema, generateFAQSchema, getSiteStats } from "@/lib/tool-engine"
import { siteConfig } from "@/config/site"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const { toolCount } = getSiteStats()

const homeFAQs = [
  { question: "What is FreeKit?", answer: "FreeKit is a collection of free online tools for developers, SEO professionals, designers, students, content creators, and everyday users." },
  { question: "Are all tools completely free?", answer: "Yes. Every tool on FreeKit is free to use without subscriptions or hidden charges." },
  { question: "Do I need to create an account?", answer: "No. You can use all tools instantly without creating an account." },
  { question: "Is my data stored?", answer: "No. Most tools process data locally in your browser, and we do not permanently store your inputs." },
  { question: "Can I use FreeKit on mobile devices?", answer: "Yes. Every tool is fully responsive and works on smartphones, tablets, laptops, and desktop computers." },
  { question: "How often are new tools added?", answer: "We regularly add new tools and improve existing ones based on user feedback and industry needs." },
  { question: "Which browsers are supported?", answer: "FreeKit supports all modern browsers, including Chrome, Edge, Firefox, Safari, and other Chromium-based browsers." },
  { question: "Can I share these tools with others?", answer: "Absolutely. You are welcome to share FreeKit with friends, colleagues, students, and your team." },
]

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free Online Tools for Everyone`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "free online tools",
    "developer tools",
    "SEO tools",
    "text tools",
    "CSS tools",
    "utility tools",
    "calculators",
    "no sign up",
    "browser-based",
    "free tools",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  applicationName: siteConfig.name,
  category: "utilities",
  // Canonical tag — fixes the "Canonical Tag Test: webpage does not use the
  // canonical link tag" SEO failure.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — Free Online Tools for Everyone`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Free Online Tools for Everyone`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Free Online Tools for Everyone`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    // Proper favicon setup — fixes the "Favicon Test: this website either
    // doesn't have a favicon or it has not been referenced correctly" SEO
    // failure. SVG (modern browsers) + ICO (legacy) + apple-touch-icon PNG
    // (iOS home screen) + PWA PNGs cover every platform.
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = generateWebsiteSchema()
  const organizationSchema = generateOrganizationSchema()
  const faqSchema = generateFAQSchema(homeFAQs)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* DNS prefetch hints — small speed win for the third-party origins
            we know we'll contact (Google Analytics). */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>

        {/* Google Analytics via next/script with strategy="afterInteractive".
            This is non-render-blocking and replaces the previous inline
            <script async> + inline gtag config in <head>, addressing the
            "render-blocking resources" SEO failure. The ID can be overridden
            with NEXT_PUBLIC_GA_ID; otherwise the project default is used. */}
        {(() => {
          const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-8S4FMZLJW7"
          return (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    anonymize_ip: true,
                    send_page_view: true
                  });
                `}
              </Script>
            </>
          )
        })()}
      </body>
    </html>
  )
}
