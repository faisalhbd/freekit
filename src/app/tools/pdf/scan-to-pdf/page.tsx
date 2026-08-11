import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ScanToPdfTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ScanToPdfPage() {
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
        <section className="mt-8" aria-label="Scan to PDF Tool">
          <ScanToPdfTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Scan Documents to PDF Online</h2>
          <p className="text-muted-foreground">
            Converting your physical documents into PDF takes just a few simple steps. Follow this guide to create your digital document:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your input method</span> — Use the Camera tab to capture images directly from your device's camera, or switch to the Upload tab to add existing scanned image files (JPG, PNG, or WebP) from your device.
            </li>
            <li>
              <span className="text-foreground font-medium">Capture or upload your pages</span> — In Camera mode, point your device at each document page and tap Capture. In Upload mode, drag and drop or browse for scanned images. Add as many pages as you need.
            </li>
            <li>
              <span className="text-foreground font-medium">Reorder and review</span> — Use the up and down arrow buttons to arrange your scanned pages in the correct order. Remove any blurry or unwanted captures with the delete button.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust settings</span> — Select your preferred page size (A4, Letter, or Fit to Image) and orientation (Portrait or Landscape). The settings apply to all pages in the PDF.
            </li>
            <li>
              <span className="text-foreground font-medium">Generate and download</span> — Click Generate PDF and your scanned pages will be combined into a single document. Once complete, click the download button to save the PDF. You can also use our{" "}
              <Link href="/tools/pdf/jpg-to-pdf" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                JPG to PDF
              </Link>{" "}
              tool if you already have images ready, or our{" "}
              <Link href="/tools/pdf/pdf-merger" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Merger
              </Link>{" "}
              to combine the output with other documents. Compress your scans first with our{" "}
              <Link href="/tools/image/image-compressor" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Image Compressor
              </Link>.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Live camera preview with one-click document capture",
              "Upload mode for existing scanned images (JPG, PNG, WebP)",
              "All processing happens in your browser — no server uploads",
              "Page number badges on each scanned page thumbnail",
              "Move up/down buttons for easy page reordering",
              "Remove individual pages with a single click",
              "Page size options: A4, Letter, or Fit to Image",
              "Portrait and Landscape orientation settings",
              "WebP images automatically converted to PNG for compatibility",
              "One-click download with no watermarks, no sign-up, no usage limits",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Benefits */}
        <section className="mt-16 space-y-4" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "No Hardware Scanner Needed",
                desc: "Use your phone, tablet, or laptop camera as a portable document scanner. No expensive scanner hardware or driver software required — just open the tool and start capturing.",
              },
              {
                title: "Complete Privacy",
                desc: "All scanning and PDF generation happens locally in your browser. Your camera feed, captured images, and generated PDFs are never uploaded to any server, ensuring total confidentiality for sensitive documents.",
              },
              {
                title: "Works Anywhere",
                desc: "Fully responsive design works on desktop, tablet, and mobile. Create PDFs on the go, then combine them with our PDF Merger or compress the source images with our Image Compressor.",
                link: { href: "/tools/image/image-compressor", label: "Image Compressor →" },
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                {"link" in item && item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Receipt Digitization", desc: "Scan paper receipts, invoices, and bills into a single PDF for expense tracking, tax preparation, and digital record keeping." },
              { title: "Contract Signing", desc: "Photograph signed contracts, agreements, and NDA documents and combine them into a professional PDF for email submission." },
              { title: "Medical Records", desc: "Digitize doctor's notes, lab results, and prescription pages into organized PDFs for personal health records and insurance claims." },
              { title: "Study Notes", desc: "Capture whiteboard notes, textbook pages, and handwritten study materials into a single PDF for easy reviewing and sharing with classmates." },
              { title: "ID Document Scanning", desc: "Scan passports, driver's licenses, and ID cards to create PDF copies for online applications, verifications, and background checks." },
              { title: "Real Estate Documents", desc: "Digitize property deeds, lease agreements, inspection reports, and floor plans into organized PDF files for clients and archives." },
              { title: "Business Cards", desc: "Scan multiple business cards into one PDF for networking follow-ups, CRM imports, and contact management systems." },
              { title: "Art & Design Portfolios", desc: "Capture sketches, paintings, and physical design work to compile into a PDF portfolio for sharing with clients and galleries." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Ensure good, even lighting when capturing documents with your camera. Avoid harsh shadows and glare from windows or overhead lights for the clearest scans.",
              "Hold your device steady and parallel to the document surface to avoid perspective distortion and blurriness. Rest your elbows on a table or use a document stand for stability.",
              "Place documents on a contrasting, solid-color background (like a dark desk) to make edge detection easier and produce cleaner-looking scanned pages.",
              "Use 'Fit to Image' page size when you want each PDF page to match the exact dimensions of your captured scan, eliminating unwanted white borders around the content.",
              "Review each capture immediately using the thumbnail preview and retake any blurry or poorly framed shots before generating the PDF to save time.",
              "Compress large scanned images before converting if file size is a concern. Our Image Compressor can reduce image sizes while maintaining text readability.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our Image Compressor/g,
                        '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor</a>'
                      )
                      .replace(
                        /our PDF Merger/g,
                        '<a href="/tools/pdf/pdf-merger" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Merger</a>'
                      ),
                  }}
                />
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

        {/* 10. CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
