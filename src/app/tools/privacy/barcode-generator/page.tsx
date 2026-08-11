import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BarcodeGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BarcodeGeneratorPage() {
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
        <section className="mt-8" aria-label="Barcode Generator Tool">
          <BarcodeGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate a Barcode</h2>
          <p className="text-muted-foreground">
            Create a barcode in three simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose a format</span> — Select Code 128 for text, EAN-13 for 13-digit product codes, or UPC-A for 12-digit codes.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your data</span> — Type the text or digits to encode. For EAN-13/UPC-A, the check digit is auto-calculated if omitted.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize and download</span> — Adjust the module width and height, then click Generate. Download the result as a PNG image.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Code 128B encoding (full ASCII printable characters)",
              "EAN-13 with automatic check digit calculation",
              "UPC-A with automatic check digit calculation",
              "Canvas-based rendering with quiet zones",
              "Adjustable module width (1-5 pixels)",
              "Adjustable barcode height (40-300 pixels)",
              "Live preview before download",
              "PNG download with lossless quality",
              "Check digit validation for EAN-13/UPC-A",
              "100% client-side — no server contact",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Format Comparison */}
        <section className="mt-16 space-y-4" aria-label="Format comparison">
          <h2 className="text-2xl font-bold tracking-tight">Barcode Format Comparison</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { format: "Code 128B", chars: "Full ASCII (32-126)", use: "Shipping, inventory, general data", digits: "Any text" },
              { format: "EAN-13", chars: "13 numeric digits", use: "Global retail products", digits: "12-13 digits" },
              { format: "UPC-A", chars: "12 numeric digits", use: "North American retail products", digits: "11-12 digits" },
            ].map((item) => (
              <div key={item.format} className="rounded-xl border border-border bg-card p-5 space-y-3">
                <h3 className="font-semibold">{item.format}</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Characters:</span> {item.chars}</p>
                  <p><span className="font-medium text-foreground">Use case:</span> {item.use}</p>
                  <p><span className="font-medium text-foreground">Input:</span> {item.digits}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Check Digit Calculation */}
        <section className="mt-16 space-y-4" aria-label="Check digit">
          <h2 className="text-2xl font-bold tracking-tight">Check Digit Calculation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">EAN-13 Check Digit</h3>
              <p className="text-sm text-muted-foreground">
                Sum the digits at odd positions (1st, 3rd, etc.) and triple the sum of digits at even positions (2nd, 4th, etc.). Add both sums together. The check digit is (10 - (total mod 10)) mod 10.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">UPC-A Check Digit</h3>
              <p className="text-sm text-muted-foreground">
                Triple the sum of digits at odd positions (1st, 3rd, etc.) and sum the digits at even positions (2nd, 4th, etc.). Add both sums together. The check digit is (10 - (total mod 10)) mod 10.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Product Labeling", desc: "Generate EAN-13 or UPC-A barcodes for retail products, inventory items, or packaging labels that need to be scanned at point-of-sale." },
              { title: "Shipping & Logistics", desc: "Create Code 128 barcodes for shipping labels, tracking numbers, and logistics documents. Code 128 can encode both letters and numbers." },
              { title: "Asset Tracking", desc: "Label company assets (laptops, equipment, furniture) with Code 128 barcodes for easy inventory management and tracking." },
              { title: "Event Tickets", desc: "Generate barcodes for event tickets, boarding passes, or admission wristbands. Code 128 handles alphanumeric ticket codes well." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Technical Details */}
        <section className="mt-16 space-y-4" aria-label="Technical details">
          <h2 className="text-2xl font-bold tracking-tight">Technical Details</h2>
          <p className="text-muted-foreground">
            Barcodes are rendered on an HTML5 Canvas element using pure JavaScript. Each format implements the official encoding specification: Code 128 uses the standard pattern table with proper start code (B), checksum calculation, and stop pattern. EAN-13 and UPC-A use the standard L/G/R encoding patterns with guard bars. The output PNG includes quiet zones (margin areas) on both sides for reliable scanning.
          </p>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
