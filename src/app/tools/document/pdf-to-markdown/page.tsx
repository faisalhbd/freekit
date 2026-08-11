import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfToMarkdownTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfToMarkdownPage() {
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
        <ToolHeader tool={toolConfig} />

        <section className="mt-8" aria-label="PDF to Markdown Tool">
          <PdfToMarkdownTool />
        </section>

        {/* How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert PDF to Markdown Online</h2>
          <p className="text-muted-foreground">
            Converting your PDF to Markdown is quick and easy. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF file</span> — Drag and drop a PDF onto the upload area, or click to browse. The tool shows the page count and file size.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert to Markdown</span> — The tool processes each page, analyzing font sizes to detect headings, lists, and paragraphs. A progress bar tracks the conversion.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the Markdown output</span> — Check the extracted Markdown in the text area. Stats show the number of headings, list items, paragraphs, and characters found.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy or download</span> — Copy the Markdown to your clipboard or download it as a .md file. Need to convert plain text to Markdown? Try our{" "}
              <Link href="/tools/document/text-to-markdown" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Text to Markdown
              </Link>{" "}
              tool. Want to render your Markdown as HTML? Check our{" "}
              <Link href="/tools/text/markdown-to-html" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Markdown to HTML
              </Link>{" "}
              converter.
            </li>
          </ol>
        </section>

        {/* Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your PDF never leaves your browser",
              "Smart heading detection based on font size analysis",
              "List item conversion with proper Markdown bullet syntax",
              "Paragraph detection preserving document structure",
              "Conversion statistics: pages, headings, lists, paragraphs",
              "One-click copy to clipboard for instant use",
              "Download as .md file for direct use in Markdown editors",
              "Progress bar with page-level tracking",
              "Drag and drop file upload support",
              "No watermarks, no sign-up, no usage limits",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using PDF to Markdown Converter</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["PDFs with selectable text convert much better than scanned images — ensure your PDF is text-based.","For scanned PDFs, use OCR software first, then convert the resulting text to Markdown.","The converted Markdown preserves headings, lists, and links — review and adjust formatting as needed.","Edit your converted Markdown with our Markdown Editor Preview for live rendering.","Convert your Markdown back to HTML using our Markdown to HTML tool for web publishing.","Need to convert the other direction? Try our Text to Markdown tool for plain text conversion."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Markdown Editor Preview/g, '<a href="/tools/text/markdown-editor-preview" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Markdown Editor Preview</a>')
                    .replace(/our Markdown to HTML/g, '<a href="/tools/text/markdown-to-html" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Markdown to HTML</a>')
                    .replace(/our Text to Markdown/g, '<a href="/tools/document/text-to-markdown" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text to Markdown</a>')
                    .replace(/our HTML to Markdown/g, '<a href="/tools/text/html-to-markdown" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">HTML to Markdown</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="Frequently asked questions">
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
