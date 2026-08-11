import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfPageExtractorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfPageExtractorPage() {
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
        <section className="mt-8" aria-label="PDF Page Extractor Tool">
          <PdfPageExtractorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Extract Pages from a PDF</h2>
          <p className="text-muted-foreground">
            Extracting specific pages from your PDF takes just a few simple steps. Follow this guide to pull out the pages you need:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF file</span> — Drag and drop a single PDF onto the upload area, or click to browse from your device. The tool will display the total page count and file size so you can confirm the document loaded correctly.
            </li>
            <li>
              <span className="text-foreground font-medium">Select pages to extract</span> — Click on numbered page cards in the visual grid to select individual pages. Use the quick range input (e.g., &quot;1-5, 8, 10-12&quot;) for faster selection. You can also use Select All or Deselect All buttons for bulk operations.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Extract Pages</span> — Hit the extract button and the tool will create a new PDF containing only your selected pages. The process runs entirely in your browser for maximum privacy and speed.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the result</span> — Once extraction is complete, click the Download button to save the new PDF to your device. Need to split the full document into equal parts? Try our{" "}
              <Link href="/tools/pdf/pdf-splitter" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Splitter
              </Link>
              . Want to combine extracted pages with another file? Use our{" "}
              <Link href="/tools/pdf/pdf-merger" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Merger
              </Link>
              . Need to fix page orientation first? Check out our{" "}
              <Link href="/tools/pdf/pdf-rotator" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Rotator
              </Link>.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your PDF never leaves your browser",
              "Interactive page card grid with click-to-select/deselect",
              "Quick range input supporting formats like 1-5, 8, 10-12",
              "Select All and Deselect All buttons for bulk operations",
              "Real-time count of selected pages shown in a badge",
              "Extract any combination of non-consecutive pages into one file",
              "One-click download of the extracted PDF document",
              "Smart page range parser with live preview of selected pages",
              "No watermarks, no sign-up, no usage limits whatsoever",
              "Preserves original quality — no recompression or conversion",
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
                title: "Total Privacy",
                desc: "All extraction happens locally in your browser. Your document is never uploaded to any server, ensuring complete confidentiality for sensitive files like contracts, legal agreements, and financial documents.",
              },
              {
                title: "Precise Page Control",
                desc: "Hand-pick exactly which pages you need using the visual grid or quick range input. Select individual pages, continuous ranges, or any combination — all combined into a single output PDF in order.",
                link: { href: "/tools/pdf/pdf-splitter", label: "Need full splitting? Try PDF Splitter →" },
              },
              {
                title: "Fast & Flexible",
                desc: "Extract pages in seconds without installing software. The extracted file is a standard PDF you can share, print, or edit. Need to combine it with other files? Our PDF Merger makes it easy.",
                link: { href: "/tools/pdf/pdf-merger", label: "Combine extracted pages with PDF Merger →" },
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
              { title: "Pulling Report Sections", desc: "Extract key chapters or data sections from a lengthy annual report to share with stakeholders without sending the entire document." },
              { title: "Extracting Contract Pages", desc: "Pull specific pages from a multi-page contract bundle — such as signature pages, terms, or exhibits — into a focused document." },
              { title: "Creating Study Materials", desc: "Select relevant pages from a textbook or course manual PDF to create focused study guides and handouts for students." },
              { title: "Isolating Invoice Pages", desc: "Extract individual invoice pages from a long monthly billing statement to send to accounting or for record-keeping." },
              { title: "Building Presentations", desc: "Pull specific pages from reports, whitepapers, or manuals to compile into a focused presentation deck." },
              { title: "Legal Document Prep", desc: "Extract specific clauses, exhibits, or appendices from a combined legal filing for review or submission." },
              { title: "Sharing Selective Content", desc: "Share only the most relevant pages of a large document with clients or colleagues instead of overwhelming them with the full file." },
              { title: "Reducing Email Attachments", desc: "Extract just the necessary pages to keep email attachments small and focused, saving bandwidth and improving recipient experience." },
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
              "Check the total page count displayed after uploading to confirm your PDF loaded correctly before making selections.",
              "Use the quick range input for large selections instead of clicking individual pages — typing '1-50' is much faster than clicking 50 page cards.",
              "Keep your original PDF as a backup. If you need to extract a different set of pages later, having the original makes it easy to start over.",
              "Double-check your selection count in the badge before extracting. A quick glance at the selected count helps avoid accidentally including or excluding pages.",
              "Remove password protection from PDFs before extracting, as encrypted files may not be processable in the browser. Use a dedicated PDF unlock tool first.",
              "After extraction, you can use our PDF Merger to combine the extracted pages with pages from other documents, or our PDF Splitter if you need to divide the result further.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /our PDF Merger/g,
                      '<a href="/tools/pdf/pdf-merger" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Merger</a>'
                    ).replace(
                      /our PDF Splitter/g,
                      '<a href="/tools/pdf/pdf-splitter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Splitter</a>'
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
