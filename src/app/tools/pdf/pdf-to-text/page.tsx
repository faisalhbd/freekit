import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfToTextTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfToTextPage() {
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
        <section className="mt-8" aria-label="PDF to Text Tool">
          <PdfToTextTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Extract Text from PDF Files Online</h2>
          <p className="text-muted-foreground">
            Converting your PDF to plain text takes just a few simple steps. Follow this guide to extract all the text content:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF file</span> — Drag and drop a PDF file onto the upload area, or click the browse button to select a file from your device. The tool will show the total page count and file size.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Extract Text</span> — Hit the extract button and the tool will process every page of your PDF right in your browser. A progress bar shows the extraction status.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the results</span> — View extraction statistics (pages, characters, words, lines) and browse the extracted text. Switch between "All Pages" and "Page by Page" view to find the content you need.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy or download</span> — Use "Copy to Clipboard" to paste the text into any application, or "Download TXT" to save it as a plain text file. Need to split the PDF first? Try our{" "}
              <Link href="/tools/pdf/pdf-splitter" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Splitter
              </Link>{" "}
              to extract specific pages. Working with scanned documents? Use our{" "}
              <Link href="/tools/ocr/image-to-text-ocr" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Image to Text OCR
              </Link>{" "}
              tool instead. Want to count words in the extracted text? Check our{" "}
              <Link href="/tools/text/word-counter" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Word Counter
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
              "Fast text extraction using the pdfjs-dist library",
              "Page-by-page view with individual tabs for each page's text",
              "All Pages view showing the complete extracted document at once",
              "Extraction statistics: pages, characters, words, and lines",
              "One-click copy to clipboard for instant pasting",
              "Download as plain text (.txt) file",
              "Smart line break detection preserving paragraph structure",
              "Progress bar with percentage during extraction",
              "No watermarks, no sign-up, no usage limits",
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
                desc: "All text extraction happens in your browser. Your PDF is never uploaded to any server, ensuring total confidentiality for sensitive documents like contracts, legal filings, and financial reports.",
              },
              {
                title: "Instant Reuse",
                desc: "Copy extracted text directly to your clipboard or download it as a TXT file. Paste it into Word, Google Docs, email, or any other application without manual retyping.",
              },
              {
                title: "Detailed Statistics",
                desc: "Get a comprehensive overview of your extracted content with page count, character count, word count, and line count. Useful for content analysis and document management.",
                link: { href: "/tools/text/word-counter", label: "Word Counter →" },
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
              { title: "Content Editing", desc: "Extract text from PDFs to edit content in a word processor instead of retyping the entire document from scratch." },
              { title: "Research & Citation", desc: "Pull quotes, passages, and data points from academic papers and reports for use in your own research and citations." },
              { title: "Data Migration", desc: "Convert PDF-based content into plain text for importing into databases, CMS platforms, or other digital systems." },
              { title: "Translation Preparation", desc: "Extract text to send to translation tools or services, avoiding the need to manually copy text from each page." },
              { title: "Accessibility", desc: "Convert PDF content into plain text for screen readers, text-to-speech tools, or braille display devices." },
              { title: "Content Analysis", desc: "Extract text to perform word frequency analysis, keyword density checks, or readability scoring on PDF documents." },
              { title: "Archive Indexing", desc: "Extract text from archived PDF documents to create searchable plain text indexes for document management systems." },
              { title: "Email & Messaging", desc: "Pull text from PDF attachments to paste into emails, Slack messages, or other communication tools." },
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
              "Verify your PDF is text-based (not a scanned image) before extracting. You can check by trying to select text in a PDF viewer — if you can highlight individual words, the text is embedded and will extract correctly.",
              "Use the Page by Page view to quickly locate and review text from specific pages without scrolling through the entire document.",
              "For very large PDFs, the extraction may take a few moments depending on your device's performance. Be patient and let the progress bar complete before interacting with the results.",
              "If the extracted text has unexpected line breaks, this is due to how the PDF stores text positioning. The output preserves content faithfully even if the visual line breaks differ from the original layout.",
              "After extraction, use our Word Counter tool to analyze word frequency, readability, and other text metrics on the extracted content.",
              "Keep your original PDF as a reference. The extracted plain text does not preserve formatting, images, or layout — only the raw text content is captured.",
              "If your PDF is password-protected, remove the protection first before uploading. Encrypted PDFs cannot be processed in the browser without the password.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our Word Counter tool/g,
                        '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Word Counter tool</a>'
                      )
                      .replace(
                        /Image to Text OCR tool/g,
                        '<a href="/tools/ocr/image-to-text-ocr" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Image to Text OCR tool</a>'
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
