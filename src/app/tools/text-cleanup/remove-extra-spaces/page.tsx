import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RemoveExtraSpacesTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RemoveExtraSpacesPage() {
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
        <section className="mt-8" aria-label="Remove Extra Spaces">
          <RemoveExtraSpacesTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Remove Extra Spaces Tool</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text with extra spaces, tabs, or messy formatting into the input textarea. The tool works with text of any length.</li>
            <li><span className="text-foreground font-medium">Select your cleanup options</span> — Check the boxes for the types of cleanup you want: remove extra spaces between words, trim leading/trailing spaces, remove tabs, remove blank lines, or normalize line breaks.</li>
            <li><span className="text-foreground font-medium">Click Clean Up Text</span> — Press the button to process your text. The cleaned output will appear in the right panel instantly.</li>
            <li><span className="text-foreground font-medium">Review the stats</span> — Check how many characters, words, and lines were removed to understand the scope of the cleanup.</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Use the Copy Output button to copy the cleaned text to your clipboard, or use Swap to move it back for further processing.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Remove extra spaces between words while preserving single spaces",
              "Trim leading and trailing whitespace from each line",
              "Strip all tab characters from text",
              "Remove blank and empty lines for compact output",
              "Normalize mixed line break formats (CRLF, CR, LF) to LF",
              "Detailed statistics showing characters, words, and lines removed",
              "Copy output, Clear, and Swap buttons for efficient workflow",
              "100% client-side processing — your text never leaves your browser",
              "Works with any text size — from a single line to full documents",
              "Responsive design that works on desktop, tablet, and mobile",
              "No sign-up, no limits, no server processing",
              "Combines multiple cleanup operations in a single pass",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Text Cleanup</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Extra Spaces Between Words", d: "When text is copied between applications, multiple spaces can appear between words due to formatting differences. This tool collapses any sequence of two or more spaces into a single space, restoring clean readability without losing word separation." },
              { t: "Leading and Trailing Whitespace", d: "Lines often have invisible spaces at the start or end — caused by indentation, copy-paste artifacts, or editor quirks. Trimming these ensures consistent formatting and prevents issues when the text is used in code, databases, or web forms." },
              { t: "Tab Characters", d: "Tabs are invisible characters that can cause unpredictable rendering when text is pasted into different environments. Removing tabs and replacing them with spaces (or removing them entirely) ensures consistent appearance across all platforms." },
              { t: "Line Break Normalization", d: "Different operating systems use different line endings: Windows uses CRLF, Unix uses LF, and old Macs use CR. Normalizing all line breaks to a single format prevents display issues and ensures consistent line counting." },
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
              { t: "Cleaning Copied Text", d: "Text copied from PDFs, emails, or web pages often contains extra spaces and inconsistent formatting. Use this tool to normalize the text before pasting it into documents, spreadsheets, or content management systems." },
              { t: "Preparing Data for Import", d: "Before importing text data into databases, CSV files, or spreadsheets, clean up extra whitespace to prevent field alignment issues, parsing errors, and duplicate entries caused by trailing spaces." },
              { t: "Code Cleanup", d: "Remove extra spaces, tabs, and blank lines from code snippets before sharing or committing. This is especially useful for code copied from PDFs, documentation, or chat messages." },
              { t: "Email and Newsletter Formatting", d: "Ensure your email content has consistent spacing by removing extra spaces and blank lines before sending. This improves readability across email clients and prevents formatting glitches." },
              { t: "Content Migration", d: "When migrating content between CMS platforms, text often accumulates formatting artifacts. Use this tool to clean up the text before importing it into your new platform." },
              { t: "API and JSON Data", d: "Clean up text payloads before sending them to APIs. Extra whitespace in string fields can cause validation errors, unexpected results, or wasted bandwidth." },
              { t: "Academic and Research Papers", d: "Clean up text extracted from PDF research papers before using it in literature reviews, citations, or analysis tools. Remove artifacts from copy-paste that affect word counts and readability." },
              { t: "Social Media Posts", d: "Remove accidental extra spaces from social media posts before publishing. Clean text looks more professional and is easier for your audience to read and engage with." },
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
          <h2 className="text-2xl font-bold tracking-tight">Text Cleanup Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Enable all options at once for a thorough cleanup — removing extra spaces, trimming lines, stripping tabs, removing blank lines, and normalizing line breaks in a single pass.",
              "After cleaning spaces, use our Word Counter to verify the final word count of your text matches your expectations.",
              "If your text has inconsistent casing after cleanup, use our Case Converter to standardize uppercase, lowercase, or title case formatting.",
              "For text with duplicate content, use our Remove Duplicate Lines tool after space cleanup to get a fully deduplicated, clean result.",
              "When working with code, enable the 'Remove All Tabs' option to eliminate indentation artifacts, then paste into your editor and reformat with your preferred style.",
              "Use the Swap button for multi-pass cleanup: clean spaces first, swap output to input, then enable additional options like blank line removal for a second pass.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Case Converter/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Case Converter</a>')
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
              "Always review the output after cleanup. While the tool preserves intentional single spaces, certain specialized text (like code with intentional multiple spaces) may need manual review.",
              "Keep a copy of your original text before performing aggressive cleanup operations, especially for important documents or data files.",
              "When cleaning text for database imports, enable both 'Trim leading/trailing spaces' and 'Remove extra spaces' to ensure data consistency.",
              "For text originating from PDF files, consider enabling all cleanup options — PDFs often introduce extra spaces, tabs, and irregular line breaks.",
              "Use the statistics display to verify the cleanup scope. If an unexpectedly large number of characters were removed, double-check that the result is correct.",
              "After cleaning, use our Line Break Remover if you need to further consolidate line breaks into a specific format for your target application.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: practice
                    .replace(/our Line Break Remover/g, '<a href="/tools/text-cleanup/line-break-remover" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Line Break Remover</a>')
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
