import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfMergerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfMergerPage() {
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
        <section className="mt-8" aria-label="PDF Merger Tool">
          <PdfMergerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Merge PDF Files Online</h2>
          <p className="text-muted-foreground">
            Combining your PDF files takes just a few simple steps. Follow this guide to merge your documents:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF files</span> — Drag and drop multiple PDF files onto the upload area, or click the browse button to select files from your device. You can add as many files as you need.
            </li>
            <li>
              <span className="text-foreground font-medium">Reorder if needed</span> — Use the drag handles or the up/down arrow buttons to arrange your files in the desired order. The pages will appear in the merged document exactly as listed.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Merge PDFs</span> — Hit the merge button and your files will be combined instantly in your browser. A progress bar shows the merging status.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the result</span> — Once merging is complete, click the download button to save your combined PDF. Need to split the result later? Use our{" "}
              <Link href="/tools/pdf/pdf-splitter" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Splitter
              </Link>{" "}
              to separate it into individual pages. Want to extract specific pages? Try our{" "}
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
              "Client-side processing — your PDFs never leave your browser",
              "Drag and drop file upload for quick adding",
              "Drag-to-reorder handles for easy file arrangement",
              "Move up/down buttons as an alternative reordering method",
              "Shows page count and file size for each uploaded PDF",
              "Real-time progress bar during the merge process",
              "Support for unlimited number of PDF files",
              "No watermarks, no sign-up, no usage limits",
              "Preserves original quality — no recompression or conversion",
              "One-click download of the merged document",
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
                desc: "All merging happens in your browser. Your documents are never uploaded to any server, ensuring total confidentiality for sensitive files like contracts and financial reports.",
              },
              {
                title: "Save Time",
                desc: "Merge multiple PDFs in seconds without installing any software. No need to open a PDF editor, rearrange pages manually, or wait for online services to process your files.",
              },
              {
                title: "Professional Results",
                desc: "Get a perfectly combined PDF with no quality loss. If you need to fine-tune the result, use our PDF Splitter to separate pages or our PDF Page Extractor to pull out specific sections.",
                link: { href: "/tools/pdf/pdf-page-extractor", label: "PDF Page Extractor →" },
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
              { title: "Combining Reports", desc: "Merge quarterly or monthly reports into a single annual document for easy sharing and archiving." },
              { title: "Assembling Invoices", desc: "Combine multiple invoice PDFs into one file for streamlined accounting and record-keeping." },
              { title: "Merging Scanned Pages", desc: "Join multiple scanned document pages into a single PDF, perfect for digitized paper records." },
              { title: "Creating Proposals", desc: "Combine cover letters, portfolios, and supporting documents into one professional proposal PDF." },
              { title: "Compiling Research Papers", desc: "Merge multiple research papers, references, and appendices into a single comprehensive document." },
              { title: "Contract Packages", desc: "Combine NDAs, terms of service, and main contracts into a single document for client signing." },
              { title: "Student Assignments", desc: "Merge homework sheets, notes, and reference materials into one organized submission file." },
              { title: "E-book Chapter Assembly", desc: "Combine individually saved chapters or sections into a complete e-book or manual." },
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
              "Always verify the page order before merging — use the drag handles or arrow buttons to arrange files exactly as you want them in the final document.",
              "Keep your original PDF files as backups. If you need to undo a merge or restructure, having the originals makes it easy to start over.",
              "For very large merges (50+ files), consider merging in smaller batches. Our PDF Splitter can help you break down the result if needed later.",
              "Remove password protection from PDFs before merging, as encrypted files may not be processable in the browser. You can use a dedicated PDF unlock tool first.",
              "Check the total page count displayed in the file list to ensure all your files were loaded correctly before starting the merge.",
              "If the merged file is too large to email, consider splitting it into smaller parts using our PDF Splitter tool, or compressing it with a PDF compression tool.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /our PDF Splitter tool/g,
                      '<a href="/tools/pdf/pdf-splitter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Splitter tool</a>'
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
