import type { Metadata } from "next"
import { Link, Type, Wifi, Mail, Phone, MessageSquare } from "lucide-react"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { QRCodeGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function QRCodeGeneratorPage() {
  const schemas = getSchemas()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Breadcrumb + Hero */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Interface */}
        <section className="mt-8" aria-label="QR Code Generator Tool">
          <QRCodeGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate a QR Code Online</h2>
          <p className="text-muted-foreground">
            Creating a QR code takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your data type</span> — Select a tab for the type of content: URL, Text, Wi-Fi, Email, Phone, or SMS. Each type is encoded in the standard format so scanners automatically open the right app.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your data</span> — Type the URL, text, Wi-Fi credentials, email address, phone number, or other content you want to encode in the QR code.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the appearance</span> — Adjust the image size (128–1024px), error correction level, margin, and colors. Choose between PNG (raster) and SVG (vector) output format.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Generate QR Code</span> — Your QR code is instantly generated in your browser. Preview it on screen to verify it looks correct.
            </li>
            <li>
              <span className="text-foreground font-medium">Download your QR code</span> — Download the QR code as PNG or SVG. For SVG, you can also copy the SVG markup to your clipboard for embedding in websites and documents.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "6 data types: URL, Plain Text, Wi-Fi, Email, Phone Number, and SMS",
              "Customizable image size from 128px to 1024px with quick presets (Web, Print, Large, XL)",
              "4 error correction levels: Low (L), Medium (M), Quartile (Q), High (H)",
              "Custom foreground and background colors with color picker and hex input",
              "Adjustable margin (quiet zone) from 0 to 8 modules",
              "PNG (raster) and SVG (vector) output formats",
              "Copy SVG code to clipboard for easy embedding in websites",
              "Wi-Fi QR codes with SSID, password, and encryption type (WPA/WEP/Open)",
              "Data length counter to stay within QR code capacity limits",
              "100% browser-based — no server, no tracking, no data collection",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. QR Code Data Types */}
        <section className="mt-16 space-y-4" aria-label="Data types">
          <h2 className="text-2xl font-bold tracking-tight">Supported QR Code Data Types</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Link className="size-4 text-primary" />
                URL / Website
              </h3>
              <p className="text-sm text-muted-foreground">
                Encode any website URL. When scanned, the user&apos;s phone will automatically open
                the link in their browser. Perfect for sharing website links, product pages,
                social profiles, and portfolio links.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Type className="size-4 text-primary" />
                Plain Text
              </h3>
              <p className="text-sm text-muted-foreground">
                Encode any text message, note, or information. The text is displayed directly
                when scanned. Useful for sharing short messages, coupons, serial numbers,
                or any free-form text content.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Wifi className="size-4 text-primary" />
                Wi-Fi Credentials
              </h3>
              <p className="text-sm text-muted-foreground">
                Encode Wi-Fi network name (SSID), password, and encryption type. When scanned,
                the phone automatically connects to the network without typing. Perfect for
                homes, offices, cafes, and events.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                Email Address
              </h3>
              <p className="text-sm text-muted-foreground">
                Encode an email address with optional subject and body. When scanned, the phone
                opens the email app with the recipient, subject, and body pre-filled. Great for
                contact information and customer support.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                Phone Number
              </h3>
              <p className="text-sm text-muted-foreground">
                Encode a phone number in international format. When scanned, the phone&apos;s
                dialer opens with the number pre-filled. Useful for business cards, advertisements,
                and contact information.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare className="size-4 text-primary" />
                SMS Message
              </h3>
              <p className="text-sm text-muted-foreground">
                Encode a phone number with an optional pre-written message. When scanned, the
                messaging app opens with the number and message ready to send. Great for
                promotions, surveys, and quick communication.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Business Cards", desc: "Add a QR code to your business card that links to your website, LinkedIn profile, or contact information." },
              { title: "Restaurant Menus", desc: "Create QR codes for digital menus that diners can scan to view on their phones without physical menus." },
              { title: "Event Tickets & Badges", desc: "Generate QR codes for event tickets, check-in badges, and attendee identification for conferences and workshops." },
              { title: "Product Packaging", desc: "Place QR codes on product packaging linking to instructions, warranties, or product registration pages." },
              { title: "WiFi Network Sharing", desc: "Create Wi-Fi QR codes for guests, customers, or visitors to connect to your network without asking for the password." },
              { title: "Social Media Profiles", desc: "Generate QR codes for your Instagram, Twitter/X, YouTube, or TikTok profiles for easy sharing." },
              { title: "Digital Payment Links", desc: "Create QR codes for PayPal, Stripe, or payment gateway links for quick customer payments." },
              { title: "App Downloads", desc: "Link QR codes directly to App Store or Google Play download pages for your mobile applications." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips for Best Results */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Best QR Code Results</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Keep your encoded data under 300 characters for the best scanning reliability and smallest QR code.",
              "Use the High (H) error correction level for printed QR codes that may be partially damaged or dirty.",
              "Use SVG format for print materials — it scales perfectly to any size without losing quality.",
              "Always test your QR code with multiple devices and scanning apps before distributing it.",
              "Ensure sufficient contrast between the foreground and background colors for reliable scanning.",
              "Add adequate margin (quiet zone) around your QR code — at least 2 modules (default) for best results.",
              "Use a URL shortener for very long links to keep your QR code simple and easy to scan.",
              "For Wi-Fi QR codes, double-check the SSID and password before generating to avoid errors.",
              "Use our Password Generator to create strong Wi-Fi passwords, then encode them in QR codes for secure sharing.",
              "Use our Base64 Encoder to encode data before placing it in QR codes for specialized applications.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (Password Generator)/,
                      '<a href="/tools/utility/password-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Base64 Encoder)/,
                      '<a href="/tools/developer/base64-encoder" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 9. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* 10. CEO / Hire Me CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
