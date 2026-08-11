import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TextCleanerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TextCleanerPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />

        <section className="mt-8" aria-label="Text Cleaner">
          <TextCleanerTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Text Cleaner</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your text</span> — Enter or paste any messy text into the input area.</li>
            <li><span className="text-foreground font-medium">Select cleaning options</span> — Enable the options that match your needs, or click "Select All" for a thorough clean.</li>
            <li><span className="text-foreground font-medium">Click Clean All</span> — The tool processes your text and shows the cleaned result.</li>
            <li><span className="text-foreground font-medium">Review the stats</span> — Compare before/after character, word, and line counts.</li>
            <li><span className="text-foreground font-medium">Copy or swap</span> — Use "Copy Output" to grab the result, or "Swap to Input" to chain multiple cleanings.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "10 customizable cleaning options with descriptions",
              "Zero-width character detection (\\u200B, \\u200C, \\u200D, \\uFEFF)",
              "Encoding artifact repair for common mojibake patterns",
              "HTML tag stripping while preserving text content",
              "Non-printable character removal (control codes)",
              "Before/after stats: characters, words, and lines",
              "Select All / Deselect All for quick option toggling",
              "Copy Output and Swap to Input for chaining operations",
              "100% client-side processing — your text stays private",
              "Responsive grid layout for cleaning options",
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
              { t: "Cleaning Copy-Pasted Web Text", d: "Text copied from websites often contains invisible formatting, extra spaces, and zero-width characters. This tool strips all of that in one click." },
              { t: "Pre-Processing for Database Import", d: "Before importing CSV or JSON data into a database, remove trailing whitespace, normalize line endings, and strip non-printable characters to prevent import errors." },
              { t: "Fixing Encoding Issues", d: "If you see garbled characters like Ã©, â€˜, or â€” in your text, the encoding fix option converts them back to the correct Unicode characters." },
              { t: "Cleaning Code Comments or Logs", d: "Remove extra indentation, trailing whitespace, and blank lines from code snippets, log files, or configuration files before committing or sharing." },
              { t: "Preparing Text for Translation", d: "Clean up source text by removing HTML remnants, zero-width characters, and extra whitespace before sending it to translation tools or services." },
              { t: "Sanitizing User Input", d: "Developers can use this tool to understand and test what kinds of invisible characters and formatting issues might exist in user-submitted text data." },
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Text Cleaner</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Preview changes before applying — the tool shows a live diff so you can see exactly what will be cleaned.","Use the extra spaces remover before pasting content into forms that reject multiple spaces.","Clean up line breaks in copied text using our Line Break Remover for clean single-line output.","Remove duplicate entries from lists with our Remove Duplicate Lines tool.","Find and replace specific text patterns with our Text Replacer tool for targeted cleaning.","Check your cleaned text word count using our Word Counter before submitting.","For sorting cleaned lists alphabetically, try our Text Sorter tool."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Line Break Remover/g, '<a href="/tools/text-cleanup/line-break-remover" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Line Break Remover</a>')
                    .replace(/our Remove Duplicate Lines/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Duplicate Lines</a>')
                    .replace(/our Text Replacer/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Replacer</a>')
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Remove Extra Spaces/g, '<a href="/tools/text-cleanup/remove-extra-spaces" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Extra Spaces</a>')
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
