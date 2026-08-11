import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { UrlQrGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function UrlQrGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />

        <section className="mt-8" aria-label="URL QR Code Generator">
          <UrlQrGeneratorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the URL QR Code Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your URL</span> — Enter the full web address including https:// or http://.</li>
            <li><span className="text-foreground font-medium">Choose a quick preset</span> — Select Business Card, Poster, or Billboard for optimal sizing, or manually set custom options.</li>
            <li><span className="text-foreground font-medium">Customize appearance</span> — Adjust foreground/background colors and error correction level.</li>
            <li><span className="text-foreground font-medium">Generate and Download</span> — Click "Generate QR Code" then download the PNG file.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "URL validation — ensures input starts with http:// or https://",
              "4 error correction levels (L/M/Q/H) for different use cases",
              "3 quick size presets: Business Card (256px), Poster (512px), Billboard (1024px)",
              "Custom foreground and background colors for branding",
              "One-click PNG download with timestamped filename",
              "Real-time error correction level descriptions",
              "100% client-side — URLs never leave your browser",
              "Responsive design for all screen sizes",
              "Supports any URL length within QR code capacity limits",
              "High contrast color warning for scanning reliability",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Business Cards", d: "Add a QR code linking to your portfolio, LinkedIn, or company website so contacts can reach you instantly." },
              { t: "Restaurant Menus", d: "Link to your digital menu page — update the menu online without reprinting new QR codes." },
              { t: "Event Flyers & Posters", d: "Drive attendees to your event registration page, ticket purchase, or event details website." },
              { t: "Product Packaging", d: "Link to product manuals, support pages, or instructional videos directly from physical packaging." },
              { t: "Social Media Profiles", d: "Create QR codes for Instagram, Twitter/X, or TikTok profiles to share on presentations or printed materials." },
              { t: "App Download Links", d: "Direct users to the App Store or Google Play listing for your mobile application." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using URL QR Code Generator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Test your shortened URL in a browser before generating the QR code to ensure it works.","Use high contrast colors for better scan reliability — dark foreground on light background works best.","Download the QR code in PNG format for digital use or SVG for print materials.","For WiFi sharing, try our dedicated WiFi QR Code Generator with network name and password fields.","Scan the generated QR code to verify it opens the correct URL using our QR Code Scanner.","Need barcodes for products? Use our Barcode Generator for standard retail formats."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our QR Code Generator/g, '<a href="/tools/utility/qr-code-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">QR Code Generator</a>')
                    .replace(/our QR Code Scanner/g, '<a href="/tools/privacy/qr-code-scanner" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">QR Code Scanner</a>')
                    .replace(/our WiFi QR Code Generator/g, '<a href="/tools/qr/wifi-qr-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">WiFi QR Code Generator</a>')
                    .replace(/our Barcode Generator/g, '<a href="/tools/privacy/barcode-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Barcode Generator</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
