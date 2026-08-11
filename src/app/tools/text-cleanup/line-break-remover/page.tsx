import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { LineBreakRemoverTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function LineBreakRemoverPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Component */}
        <section className="mt-8" aria-label="Line Break Remover">
          <LineBreakRemoverTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Line Break Remover Tool</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text containing line breaks, paragraph breaks, or newlines into the input textarea.</li>
            <li><span className="text-foreground font-medium">Choose a mode</span> — Select how you want to handle line breaks: remove all, remove double breaks, convert to spaces, or convert to comma-separated values.</li>
            <li><span className="text-foreground font-medium">Click Process Text</span> — The tool instantly processes your text and displays the result in the output panel.</li>
            <li><span className="text-foreground font-medium">Review the stats</span> — See how many line breaks were processed to understand the scope of changes.</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Use the Copy Output button to copy the processed text, or Swap to move it back for further processing.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Four processing modes: remove all, remove double, convert to spaces, convert to comma-separated",
              "Handles all line break types: LF, CRLF, and CR across platforms",
              "Detailed statistics showing the number of line breaks processed",
              "Copy output, Clear, and Swap buttons for efficient workflow",
              "100% client-side processing — your text never leaves your browser",
              "Works with any text size — from a few lines to full documents",
              "Responsive design for desktop, tablet, and mobile devices",
              "No sign-up, no limits, completely free to use",
              "Preserves paragraph structure with double-line-break removal mode",
              "One-click conversion to comma-separated format for lists and tags",
              "Instant processing with no server round-trips",
              "Intuitive radio-button interface for mode selection",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Line Breaks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Line Break Types (LF, CRLF, CR)", d: "Different operating systems use different line ending characters: Unix and macOS use LF (\\n), Windows uses CRLF (\\r\\n), and classic Mac OS used CR (\\r). When text is moved between systems, mixed line endings can cause display issues. This tool normalizes all types before processing." },
              { t: "Preserving Paragraph Structure", d: "The 'Remove double line breaks' mode is designed for documents with intentional paragraph separations. It collapses multiple consecutive blank lines into a single line break, preserving paragraph boundaries while cleaning up excessive vertical spacing." },
              { t: "Converting to Spaces vs Removing", d: "Removing line breaks joins lines directly: 'Hello\\nWorld' becomes 'HelloWorld'. Converting to spaces preserves word boundaries: 'Hello\\nWorld' becomes 'Hello World'. For most text content, converting to spaces produces more readable results." },
              { t: "Comma-Separated Conversion", d: "Converting lines to comma-separated values is useful for turning vertical lists into horizontal inline formats. This is commonly needed for tags in CMS platforms, function arguments in code, SQL IN clauses, and spreadsheet imports where items need to be comma-delimited." },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Cleaning Email Content", d: "Email clients often add extra line breaks to wrap text at 70-80 characters. Use the 'Convert to spaces' mode to unwrap email text into natural paragraphs before replying or forwarding." },
              { t: "Formatting for Spreadsheets", d: "Convert vertical lists into comma-separated values for easy paste into spreadsheet cells, CSV files, or database import tools." },
              { t: "Preparing Copy for Social Media", d: "Remove unintended line breaks from social media posts that were copied from documents or emails. Use 'Convert to spaces' to keep words readable." },
              { t: "Code Snippet Formatting", d: "Join split code lines into single statements, or convert error log entries into comma-separated lists for analysis." },
              { t: "Data Migration", d: "When migrating data between systems, normalize line breaks to prevent formatting issues. Ensure consistent data format across platforms." },
              { t: "Content Aggregation", d: "Combine text from multiple sources that use different line break conventions. Normalize everything into a consistent format before publishing." },
              { t: "SEO Meta Description Cleanup", d: "Remove line breaks from meta descriptions and title tags copied from CMS editors, ensuring clean single-line output for HTML attributes." },
              { t: "Chat and Message Formatting", d: "Clean up text copied from chat applications, Slack, Discord, or messaging platforms that often insert excessive line breaks in copied content." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Line Break Removal Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use 'Remove all line breaks' when you need text as a single continuous string — for example, for HTML attributes, JSON values, or URL parameters.",
              "Use 'Convert to spaces' instead of 'Remove all' to avoid accidentally joining words together. This preserves word boundaries and produces more readable results.",
              "For content with meaningful paragraph breaks, use 'Remove double line breaks' to clean up spacing while keeping paragraph structure intact.",
              "After removing line breaks, use our Remove Extra Spaces tool to clean up any double spaces that may have been created where line breaks were adjacent to existing spaces.",
              "For text with duplicate lines after line break removal, chain this tool with our Remove Duplicate Lines tool for a comprehensive cleanup.",
              "When converting to comma-separated format, enable 'Remove blank lines' first (or use Swap to reprocess) to avoid empty items in your comma-separated list.",
              "Use the Swap button for multi-pass processing: convert to spaces first, then swap and use a different mode for further refinement.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Remove Extra Spaces/g, '<a href="/tools/text-cleanup/remove-extra-spaces" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Extra Spaces</a>')
                    .replace(/our Remove Duplicate Lines/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Duplicate Lines</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-3 text-muted-foreground">
            {[
              "Always review the output after processing. Removing all line breaks can join words that should be separated, especially if the original text had spaces at line boundaries.",
              "For text from PDFs, use 'Convert to spaces' first to unwrap lines, then use our Remove Extra Spaces tool to clean up any resulting double spaces.",
              "When working with code, be careful with 'Remove all line breaks' — this will break multi-line code into a single line. Only use this for single-line string values.",
              "Keep a copy of your original text before processing if you are working with important or irreplaceable content.",
              "For batch processing, use the Swap button to iteratively apply different modes: first convert to spaces, then swap and process again with another mode as needed.",
              "When preparing text for databases, always use 'Convert to spaces' rather than 'Remove all' to maintain data integrity and avoid merging adjacent words.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: practice
                    .replace(/our Remove Extra Spaces/g, '<a href="/tools/text-cleanup/remove-extra-spaces" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Extra Spaces</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
