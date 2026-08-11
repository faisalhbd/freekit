import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfSplitterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfSplitterPage() {
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
        <section className="mt-8" aria-label="PDF Splitter Tool">
          <PdfSplitterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Split PDF Files Online</h2>
          <p className="text-muted-foreground">
            Splitting your PDF into smaller files takes just a few simple steps. Follow this guide to separate your document:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF file</span> — Drag and drop a single PDF file onto the upload area, or click the browse button to select a file from your device. The tool will show the total page count and file size.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a split mode</span> — Select from three modes: By Page Range to extract specific pages (e.g., 1-3, 5, 7-10), By Every N Pages to split into equal chunks, or Extract Single Page to pull out one specific page.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Split PDF</span> — Hit the split button and your file will be processed instantly in your browser. A progress bar shows the splitting status.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the results</span> — Once splitting is complete, click the download button for each resulting file, or use Download All to save everything. Need to combine split files later? Use our{" "}
              <Link href="/tools/pdf/pdf-merger" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Merger
              </Link>{" "}
              to rejoin them. Want to extract pages with more control? Try our{" "}
              <Link href="/tools/pdf/pdf-page-extractor" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Page Extractor
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
              "Three split modes: by page range, by every N pages, or single page extraction",
              "Smart page range parser supporting formats like 1-3, 5, 7-10",
              "Visual page grid showing all pages in your document",
              "Real-time page count and file size display after upload",
              "Live preview of selected pages before splitting",
              "Progress bar with percentage during the split process",
              "Download individual files or all results at once",
              "No watermarks, no sign-up, no usage limits",
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
                title: "Complete Privacy",
                desc: "All splitting happens in your browser. Your document is never uploaded to any server, ensuring total confidentiality for sensitive files like contracts, medical records, and financial reports.",
              },
              {
                title: "Flexible Splitting",
                desc: "Three powerful modes give you full control over how your PDF is divided. Extract exact page ranges, create equal-sized chunks, or pull out a single page — whatever your workflow requires.",
              },
              {
                title: "Fast & Reversible",
                desc: "Split documents in seconds without installing software. If you need to recombine the pieces later, use our PDF Merger to join them back together in any order.",
                link: { href: "/tools/pdf/pdf-merger", label: "PDF Merger →" },
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
              { title: "Separating Chapters", desc: "Split a multi-chapter book or manual into individual chapter files for easier reading and distribution." },
              { title: "Extracting Receipts", desc: "Pull individual receipt pages from a long monthly or quarterly bank statement PDF." },
              { title: "Sharing Sections", desc: "Share only the relevant pages of a large report or proposal with colleagues or clients." },
              { title: "Reducing File Size", desc: "Break a large PDF into smaller, more manageable files that are easier to email or upload." },
              { title: "Creating Handouts", desc: "Extract specific pages from a presentation or document to create focused handouts for meetings." },
              { title: "Archiving Records", desc: "Split large annual reports into quarterly or monthly segments for organized digital archiving." },
              { title: "Legal Document Prep", desc: "Separate individual contracts, NDAs, or exhibits from a combined legal document package." },
              { title: "Print Preparation", desc: "Split large documents into smaller sections to print on different paper sizes or trays." },
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
              "Check the total page count displayed after uploading to ensure your PDF loaded correctly before splitting.",
              "When using page ranges, double-check your input. A typo like '1-30' instead of '1-3' can accidentally include many more pages than intended.",
              "Keep your original PDF as a backup. If you need to re-split with different settings, having the original makes it easy to start over.",
              "For very large PDFs (500+ pages), consider using the 'Every N Pages' mode to create manageable chunks instead of extracting complex ranges.",
              "Remove password protection from PDFs before splitting, as encrypted files may not be processable in the browser. You can use a dedicated PDF unlock tool first.",
              "If you plan to share split files via email, use the 'Every N Pages' mode with a small chunk size to stay under common attachment size limits.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /our PDF Merger tool/g,
                      '<a href="/tools/pdf/pdf-merger" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Merger tool</a>'
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
