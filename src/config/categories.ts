import type { CategoryConfig, CategorySlug } from "@/types"

export const CATEGORIES: CategoryConfig[] = [
  {
    name: "Image Tools",
    slug: "image",
    shortDescription: "Compress, resize, and convert images for free — all processing happens in your browser.",
    longDescription:
      "Free online image tools for compressing, resizing, and converting images. All processing happens directly in your browser — your files never leave your device. Supports PNG, JPG, WebP and more.",
    icon: "Image",
    color: "hsl(340, 75%, 50%)",
    metaTitle: "Free Online Image Tools | FreeKit",
    metaDescription:
      "Compress, resize, and convert images online for free. No upload to server — all processing in your browser. Fast, private, and no sign-up required.",
    order: 1,
  },
  {
    name: "SEO Tools",
    slug: "seo",
    shortDescription: "Optimize your website for search engines with free SEO analysis and generation tools.",
    longDescription:
      "Comprehensive suite of free SEO tools to help you analyze, optimize, and improve your website's search engine performance. From meta tag generation to keyword analysis, boost your rankings with these powerful utilities.",
    icon: "Search",
    color: "hsl(142, 71%, 45%)",
    metaTitle: "Free SEO Tools Online | FreeKit",
    metaDescription:
      "Free online SEO tools including meta tag generators, keyword analyzers, and more. Optimize your website for search engines with no sign-up required.",
    order: 2,
  },
  {
    name: "Developer Tools",
    slug: "developer",
    shortDescription: "Essential developer utilities for formatting, converting, and debugging code.",
    longDescription:
      "Powerful developer tools for everyday programming tasks. Format JSON, encode/decode data, generate test data, and more — all running entirely in your browser with zero server processing.",
    icon: "Code",
    color: "hsl(221, 83%, 53%)",
    metaTitle: "Free Developer Tools Online | FreeKit",
    metaDescription:
      "Free online developer tools including JSON formatter, Base64 encoder, UUID generator, and more. All processing happens in your browser — fast and private.",
    order: 3,
  },
  {
    name: "Text Tools",
    slug: "text",
    shortDescription: "Transform, analyze, and format text with powerful text processing tools.",
    longDescription:
      "A collection of free text processing tools for writers, developers, and content creators. Count words, generate lorem ipsum, convert case, remove duplicates, and perform dozens of text operations instantly.",
    icon: "Type",
    color: "hsl(47, 96%, 53%)",
    metaTitle: "Free Text Tools Online | FreeKit",
    metaDescription:
      "Free online text tools including word counter, case converter, lorem ipsum generator, and more. Transform and analyze text instantly in your browser.",
    order: 4,
  },
  {
    name: "CSS Tools",
    slug: "css",
    shortDescription: "Design and debug CSS with visual tools for colors, gradients, shadows, and layouts.",
    longDescription:
      "Visual CSS tools that make styling easier. Generate colors, build gradients, create shadows, and experiment with CSS properties using intuitive interfaces. Perfect for designers and developers.",
    icon: "Palette",
    color: "hsl(280, 67%, 55%)",
    metaTitle: "Free CSS Tools Online | FreeKit",
    metaDescription:
      "Free online CSS tools including color picker, gradient generator, box shadow designer, and more. Build beautiful styles visually with no sign-up required.",
    order: 5,
  },
  {
    name: "Utility Tools",
    slug: "utility",
    shortDescription: "Everyday utilities for hashing, encoding, generating, and converting data.",
    longDescription:
      "General-purpose utility tools for everyday tasks. Generate passwords, create QR codes, convert timestamps, hash data, and more. All tools are free, fast, and work directly in your browser.",
    icon: "Wrench",
    color: "hsl(25, 95%, 53%)",
    metaTitle: "Free Utility Tools Online | FreeKit",
    metaDescription:
      "Free online utility tools including password generator, QR code generator, timestamp converter, and more. Fast, private, and no sign-up required.",
    order: 6,
  },
  {
    name: "Calculators",
    slug: "calculator",
    shortDescription: "Mathematical and conversion calculators for developers and everyday use.",
    longDescription:
      "Free online calculators for math, conversions, and developer-related computations. From percentage calculators to unit converters, get instant results with no sign-up required.",
    icon: "Calculator",
    color: "hsl(190, 90%, 50%)",
    metaTitle: "Free Online Calculators | FreeKit",
    metaDescription:
      "Free online calculators for math, percentage, unit conversion, and more. Get instant results with no sign-up required.",
    order: 7,
  },
  {
    name: "PDF & Document Tools",
    slug: "pdf",
    shortDescription: "Merge, split, convert, and rotate PDFs entirely in your browser.",
    longDescription:
      "Free online PDF tools for merging, splitting, converting, rotating, and extracting pages from PDF documents. All processing happens in your browser — your files never leave your device.",
    icon: "FileText",
    color: "hsl(0, 72%, 51%)",
    metaTitle: "Free PDF Tools Online | FreeKit",
    metaDescription:
      "Free online PDF tools including merger, splitter, converter, rotator, and more. All processing in your browser — fast, private, and no sign-up required.",
    order: 8,
  },
  {
    name: "OCR & Image Workflow",
    slug: "ocr",
    shortDescription: "Extract text from images, remove backgrounds, crop, and convert image formats.",
    longDescription:
      "Free OCR and image workflow tools. Extract text from images and screenshots, remove backgrounds, crop images, generate favicons, strip EXIF metadata, and convert SVG to PNG — all in your browser.",
    icon: "ScanLine",
    color: "hsl(160, 60%, 45%)",
    metaTitle: "Free OCR & Image Tools Online | FreeKit",
    metaDescription:
      "Free online OCR and image tools including image to text, background remover, image cropper, favicon generator, and more. All processing in your browser.",
    order: 9,
  },
  {
    name: "Creator & Marketing Tools",
    slug: "creator",
    shortDescription: "Create OG images, email signatures, UTM links, memes, and marketing content.",
    longDescription:
      "Free creator and marketing tools for social media and content creation. Generate OG images, email signatures, UTM links, memes, collages, thumbnails, and more — all in your browser.",
    icon: "Megaphone",
    color: "hsl(330, 75%, 50%)",
    metaTitle: "Free Creator & Marketing Tools | FreeKit",
    metaDescription:
      "Free online creator tools including OG image generator, email signature maker, UTM builder, meme generator, and more. Create marketing content instantly in your browser.",
    order: 10,
  },
  {
    name: "Text Cleanup Tools",
    slug: "text-cleanup",
    shortDescription: "Clean, format, and fix text with one-click text processing utilities.",
    longDescription:
      "Free text cleanup and writing productivity tools. Remove extra spaces, fix line breaks, generate slugs, estimate reading time, count sentences, format lists, find duplicate words, and convert text to tables — all instantly in your browser.",
    icon: "Eraser",
    color: "hsl(45, 93%, 47%)",
    metaTitle: "Free Text Cleanup Tools Online | FreeKit",
    metaDescription:
      "Free online text cleanup tools including space remover, line break fixer, slug generator, reading time calculator, and more. Clean and format text instantly.",
    order: 11,
  },
  {
    name: "Data & File Conversion",
    slug: "data-conversion",
    shortDescription: "Convert between CSV, JSON, YAML, SQL, and other data formats.",
    longDescription:
      "Free data and file conversion tools for developers and analysts. Convert CSV to JSON, JSON to YAML, format SQL, convert HTML to Markdown, and parse cron expressions — all in your browser.",
    icon: "ArrowLeftRight",
    color: "hsl(200, 70%, 50%)",
    metaTitle: "Free Data & File Conversion Tools | FreeKit",
    metaDescription:
      "Free online data conversion tools including CSV to JSON, JSON to YAML, SQL formatter, HTML to Markdown, and more. Convert data formats instantly.",
    order: 12,
  },
  {
    name: "Finance Calculators",
    slug: "finance",
    shortDescription: "Profit, ROI, interest, salary, and business finance calculators.",
    longDescription:
      "Free finance calculators for business and personal use. Calculate profit margins, markup, commission, compound interest, ROI, break-even points, salary conversions, and overtime pay — all in your browser.",
    icon: "DollarSign",
    color: "hsl(150, 70%, 40%)",
    metaTitle: "Free Finance Calculators Online | FreeKit",
    metaDescription:
      "Free online finance calculators including profit margin, ROI, compound interest, salary converter, and more. Calculate business finances instantly.",
    order: 13,
  },
  {
    name: "Business Docs & Templates",
    slug: "business",
    shortDescription: "Create resumes, invoices, quotes, timesheets, and business cards.",
    longDescription:
      "Free business document generators. Create professional resumes, invoices, quotes, timesheets, business cards, and payslips — all in your browser with instant download.",
    icon: "Briefcase",
    color: "hsl(215, 50%, 45%)",
    metaTitle: "Free Business Document Tools | FreeKit",
    metaDescription:
      "Free online business tools including resume builder, invoice generator, quote generator, timesheet calculator, and more. Create professional docs instantly.",
    order: 14,
  },
  {
    name: "Privacy & Security Tools",
    slug: "privacy",
    shortDescription: "Check password strength, encrypt files, verify checksums, and scan QR codes.",
    longDescription:
      "Free privacy and security tools that run entirely in your browser. Check password strength, encrypt files locally, remove PDF metadata, verify file checksums, scan QR codes, and generate barcodes.",
    icon: "ShieldCheck",
    color: "hsl(260, 60%, 55%)",
    metaTitle: "Free Privacy & Security Tools | FreeKit",
    metaDescription:
      "Free online privacy tools including password strength checker, file encryptor, checksum verifier, QR scanner, and more. All processing in your browser.",
    order: 15,
  },
  {
    name: "Media Tools",
    slug: "media",
    shortDescription: "Transfer files wirelessly, stream media, and manage multimedia content.",
    longDescription:
      "Free media tools for wireless file transfer and multimedia management. Transfer files between devices using WebRTC peer-to-peer connections with QR code pairing — no cables, no cloud uploads, no apps needed.",
    icon: "MonitorSmartphone",
    color: "hsl(265, 70%, 55%)",
    metaTitle: "Free Media Tools Online | FreeKit",
    metaDescription:
      "Free online media tools including PC to phone file transfer. Wirelessly transfer files between devices with WebRTC and QR codes — no cables, no uploads.",
    order: 16,
  },
  {
    name: "Device Tools",
    slug: "device",
    shortDescription: "Test speakers, microphone, webcam, screen, and measure internet speed.",
    longDescription:
      "Free device testing and diagnostic tools. Test your speakers, microphone, webcam, and touchscreen. Check for dead pixels, measure internet speed, monitor noise levels, and test your hearing — all running directly in your browser with no software to install.",
    icon: "Smartphone",
    color: "hsl(195, 85%, 45%)",
    metaTitle: "Free Device Testing Tools Online | FreeKit",
    metaDescription:
      "Free online device tools for testing speakers, microphone, webcam, screen, and more. Check dead pixels, test hearing, measure noise level, and run internet speed tests.",
    order: 17,
  },
  {
    name: "Document Tools",
    slug: "document",
    shortDescription: "Convert PDFs to Markdown, plain text to Markdown, and extract ZIP files.",
    longDescription:
      "Free document processing tools. Convert PDF files to Markdown format, transform plain text into structured Markdown, and extract ZIP archives — all processing happens in your browser for maximum privacy and speed.",
    icon: "FileStack",
    color: "hsl(30, 80%, 50%)",
    metaTitle: "Free Document Tools Online | FreeKit",
    metaDescription:
      "Free online document tools including PDF to Markdown converter, text to Markdown converter, and ZIP file extractor. All processing in your browser.",
    order: 18,
  },
  {
    name: "QR Code Tools",
    slug: "qr",
    shortDescription: "Generate QR codes for WiFi, URLs, vCards, and more.",
    longDescription:
      "Free QR code generation tools. Create QR codes for WiFi networks, URLs, contacts, and more. Download as PNG or SVG with customizable colors and sizes. All processing happens in your browser — fast, private, and no sign-up required.",
    icon: "QrCode",
    color: "hsl(160, 70%, 40%)",
    metaTitle: "Free QR Code Tools Online | FreeKit",
    metaDescription:
      "Free online QR code tools including WiFi QR generator and URL QR generator. Create custom QR codes instantly in your browser with no sign-up required.",
    order: 19,
  },
]

export const CATEGORY_MAP: Record<CategorySlug, CategoryConfig> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<CategorySlug, CategoryConfig>

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategoriesSorted(): CategoryConfig[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order)
}
