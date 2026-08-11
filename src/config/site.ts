import type { SiteConfig, SiteLink } from "@/types"

export const siteConfig: SiteConfig = {
  name: "FreeKit",
  description:
    "FreeKit offers 150+ free online tools for developers, SEO professionals, designers, and creators — PDF converters, image editors, calculators, JSON formatters, QR generators and more. Fast, private, and no sign-up required.",
  url: "https://freekit.online",
  ogImage: "https://freekit.online/og-image.png",
  author: "FreeKit Team",
  email: "hello@freekit.online",
  twitter: "https://twitter.com/freekitonline",
  github: "https://github.com/freekitonline",
  links: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
}

export const NAV_LINKS: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "#categories" },
  { label: "About", href: "/about" },
]

export const FOOTER_COLUMNS = [
  {
    title: "Categories",
    links: [
      { label: "SEO Tools", href: "/tools/seo" },
      { label: "Developer Tools", href: "/tools/developer" },
      { label: "Text Tools", href: "/tools/text" },
      { label: "CSS Tools", href: "/tools/css" },
      { label: "Utility Tools", href: "/tools/utility" },
      { label: "Calculators", href: "/tools/calculator" },
    ],
  },
  {
    title: "Popular Tools",
    links: [
      { label: "Word Counter", href: "/tools/text/word-counter" },
      { label: "JSON Formatter", href: "/tools/developer/json-formatter" },
      { label: "Lorem Ipsum Generator", href: "/tools/text/lorem-ipsum-generator" },
      { label: "Password Generator", href: "/tools/utility/password-generator" },
      { label: "Color Converter", href: "/tools/css/color-converter" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
]