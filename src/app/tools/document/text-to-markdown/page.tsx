import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TextToMarkdownTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TextToMarkdownPage() {
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

        <section className="mt-8" aria-label="Text to Markdown Tool">
          <TextToMarkdownTool />
        </section>

        {/* How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert Plain Text to Markdown</h2>
          <p className="text-muted-foreground">
            Transform your plain text into well-structured Markdown in a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Paste or type your plain text</span> — Enter your unstructured text in the left input panel. You can also click Paste to load text from your clipboard, or click Sample to load example text and see the conversion in action.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert to Markdown</span> — The tool analyzes each line and applies smart detection rules to identify headings, lists, links, and formatting patterns.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the output</span> — The converted Markdown appears in the right panel. Check the conversion statistics to see how many headings, lists, and links were detected.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy or download</span> — Copy the Markdown to your clipboard or download it as a .md file. Need to convert from PDF instead? Try our{" "}
              <Link href="/tools/document/pdf-to-markdown" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF to Markdown
              </Link>{" "}
              tool. Want to preview your Markdown? Check our{" "}
              <Link href="/tools/text/markdown-editor-preview" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Markdown Editor & Preview
              </Link>.
            </li>
          </ol>
        </section>

        {/* Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Smart ALL CAPS detection for Heading 1 conversion",
              "Colon-ending line detection for Heading 2 conversion",
              "Bullet point recognition (-, *, •) with proper Markdown syntax",
              "Numbered list auto-formatting (1. or 1) pattern)",
              "URL auto-linking with Markdown link syntax",
              "Bold and italic marker preservation",
              "Underline-to-heading conversion (=== and ---)",
              "Detailed conversion statistics dashboard",
              "Side-by-side input/output for easy comparison",
              "One-click copy and .md file download",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Text to Markdown Converter</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Paste plain text content and the tool will automatically detect headings, lists, and paragraphs.","Review the converted Markdown output to ensure structural elements were detected correctly.","Edit the result with our Markdown Editor Preview for a live side-by-side view.","Convert your Markdown to HTML for web use with our Markdown to HTML tool.","Need to convert PDF content? Use our PDF to Markdown tool for direct PDF conversion.","For HTML content, convert it to Markdown first using our HTML to Markdown tool."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Markdown Editor Preview/g, '<a href="/tools/text/markdown-editor-preview" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Markdown Editor Preview</a>')
                    .replace(/our Markdown to HTML/g, '<a href="/tools/text/markdown-to-html" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Markdown to HTML</a>')
                    .replace(/our PDF to Markdown/g, '<a href="/tools/document/pdf-to-markdown" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">PDF to Markdown</a>')
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
