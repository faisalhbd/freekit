import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RemoveDuplicateLinesTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RemoveDuplicateLinesPage() {
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
        <section className="mt-8" aria-label="Remove Duplicate Lines">
          <RemoveDuplicateLinesTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Remove Duplicate Lines Tool</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text with duplicate lines in the input textarea. Each line is treated as a separate entry, so make sure your items are separated by line breaks.</li>
            <li><span className="text-foreground font-medium">Configure your options</span> — Toggle Case Sensitive, Trim Whitespace, Remove Empty Lines, or Sort Results depending on your needs. The defaults work well for most use cases.</li>
            <li><span className="text-foreground font-medium">Click Remove Duplicates</span> — Press the primary button to process your text. Alternatively, enable Auto-process to see results update in real time as you type.</li>
            <li><span className="text-foreground font-medium">Review the stats</span> — Check the input line count, output line count, and number of duplicates removed to verify the results match your expectations.</li>
            <li><span className="text-foreground font-medium">Copy the output</span> — Use the Copy Output button to copy the cleaned text to your clipboard, or use Swap to move the output back into the input for further processing.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Preserves the original order of first-occurrence lines",
              "Case-sensitive and case-insensitive comparison modes",
              "Trim whitespace option to catch duplicates with extra spacing",
              "Remove empty lines for cleaner output",
              "Sort results alphabetically in a single step",
              "Auto-process mode for real-time results as you type or paste",
              "Detailed statistics: input lines, unique lines, duplicates removed",
              "Swap button to move output back to input for iterative processing",
              "Toggle Sort button to instantly sort existing output",
              "100% client-side processing — your text never leaves your browser",
              "Handles tens of thousands of lines efficiently in-browser",
              "Works on all devices with a responsive mobile-friendly layout",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Duplicate Removal</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Order Preservation vs Sorting", d: "By default, the tool keeps the first occurrence of each unique line in its original position. This is crucial when the sequence of items matters, such as in configuration files, ordered lists, or step-by-step instructions. If alphabetical order is preferred, the Sort Results toggle reorders everything after deduplication — combining two operations into one." },
              { t: "Case Sensitivity in Practice", d: "Case sensitivity determines whether 'Apple' and 'apple' are treated as the same line or different lines. When working with data imported from multiple sources, case variations are common. Disabling case sensitivity consolidates these variants into a single entry, keeping only the first occurrence with its original casing intact." },
              { t: "Whitespace Trimming", d: "Leading and trailing whitespace can cause identical items to be treated as different lines. For example, '  user@email.com' and 'user@email.com  ' would normally be kept as two separate entries. The Trim Whitespace option normalizes spacing before comparison and outputs clean, trimmed lines." },
              { t: "Empty Line Handling", d: "Text copied from documents, PDFs, and spreadsheets often contains extra blank lines that inflate your line count. The Remove Empty Lines option strips these out during the deduplication pass, giving you a compact output with only meaningful content." },
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
              { t: "Email List Cleanup", d: "Remove duplicate email addresses from mailing lists, subscriber exports, or contact databases. Combine with Trim Whitespace to catch entries with accidental leading or trailing spaces." },
              { t: "URL Deduplication", d: "Clean up lists of URLs scraped from websites or extracted from sitemaps. Remove duplicate links before submitting to search engines or running link checks." },
              { t: "Log File Analysis", d: "Extract unique log entries, error messages, or IP addresses from server logs. Quickly identify distinct events by removing repeated log lines." },
              { t: "Data Import Prep", d: "Before importing data into a database or spreadsheet, remove duplicate rows to prevent constraint violations and ensure data integrity in your target system." },
              { t: "Configuration Files", d: "Clean up duplicate directives in server configs (.htaccess, nginx.conf), environment variable files (.env), or INI files where repeated entries can cause unexpected behavior." },
              { t: "Vocabulary and Word Lists", d: "Create unique word lists from text corpora, study materials, or language learning resources. Remove repeated words to build clean vocabulary sets for flashcards or quizzes." },
              { t: "Code and Script Cleanup", d: "Remove duplicate import statements, redundant function definitions, or repeated CSS rules. Works with any text-based code file to keep your source code DRY." },
              { t: "Playlist and Media Lists", d: "Deduplicate song titles, movie names, or podcast episode lists exported from media players. Get a clean count of unique items in your collection." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips with Internal Links */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Duplicate Removal Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After removing duplicates, use our Word Counter to verify the final line and word count of your cleaned text and confirm the results look correct.",
              "If your duplicates are caused by inconsistent casing (e.g., 'John' vs 'john'), disable Case Sensitive mode first, then use our Case Converter to standardize the casing of the remaining lines.",
              "For text with accidental repeated words within a single line, use our Text Replacer to find and remove those in-line duplicates before using this tool for line-level deduplication.",
              "After deduplication, use our Text Sorter to arrange your unique lines alphabetically, reverse-alphabetically, by length, or numerically — giving you more sorting flexibility than the built-in sort option.",
              "When merging two lists, combine them in the input textarea with all items (one per line), then run this tool. Use our Diff Checker to verify that only true duplicates were removed and no unique items were lost.",
              "Enable Trim Whitespace when working with data exported from spreadsheets or CSV files, as these often include invisible trailing spaces or tabs that cause near-duplicates to be missed.",
              "Use the Swap button for iterative cleanup: remove duplicates once, swap the output back to input, change your options (e.g., enable case-insensitive mode), and process again for multi-pass deduplication.",
              "For very large text files, disable Auto-process and use the manual Process button instead. This avoids running the algorithm on every keystroke and provides better performance with large inputs.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Case Converter/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Case Converter</a>')
                    .replace(/our Text Replacer/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Replacer</a>')
                    .replace(/our Text Sorter/g, '<a href="/tools/text/text-sorter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Sorter</a>')
                    .replace(/our Diff Checker/g, '<a href="/tools/text/diff-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Diff Checker</a>')
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
              "Always review your output after deduplication. The tool keeps the first occurrence of each duplicate, so make sure the first instance is the correct or most complete version of the line.",
              "When cleaning email lists or user data, enable both Trim Whitespace and case-insensitive mode to catch the maximum number of duplicates that differ only in spacing or casing.",
              "For data that originated in spreadsheets, watch out for hidden characters like non-breaking spaces (\u00A0) that may not be caught by standard whitespace trimming. Use our Text Replacer to swap them out first.",
              "Back up your original text before aggressive deduplication. You can keep the original in a separate file and compare the before-and-after using our Diff Checker to audit what was removed.",
              "When working with multilingual text, be cautious with case-insensitive mode — some languages have casing rules that may not behave as expected with simple .toLowerCase() comparison.",
              "Use the Sort Results toggle as a verification step: if you sort the output and notice similar items grouped together that should have been caught as duplicates, try enabling Trim Whitespace or disabling case sensitivity and reprocessing.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {practice}
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
