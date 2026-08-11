import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TextSorterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TextSorterPage() {
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
        <section className="mt-8" aria-label="Text Sorter">
          <TextSorterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Text Sorter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any multi-line text in the input textarea. Each line is treated as a separate entry, so ensure your items are separated by line breaks.</li>
            <li><span className="text-foreground font-medium">Choose a sort method</span> — Select A→Z for alphabetical ascending, Z→A for descending, 0→9 for numerical ascending, 9→0 for numerical descending, or Random to shuffle lines.</li>
            <li><span className="text-foreground font-medium">Configure your options</span> — Toggle Case Sensitive, Trim Lines, Remove Duplicates, or Remove Empty Lines as needed for your specific use case.</li>
            <li><span className="text-foreground font-medium">Click Sort</span> — Press the primary Sort button to process your text. Alternatively, enable Auto-sort to see results update in real time as you type or paste.</li>
            <li><span className="text-foreground font-medium">Copy the output</span> — Use the Copy Output button to copy the sorted text to your clipboard, or use Swap to move the output back into the input for further processing.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Five sort methods: alphabetical ascending/descending, numerical ascending/descending, and random shuffle",
              "Case-sensitive and case-insensitive sorting modes",
              "Trim whitespace from lines before sorting for accurate results",
              "Remove duplicate lines in a single step alongside sorting",
              "Remove empty lines for clean, compact output",
              "Auto-sort mode for real-time results as you type or paste",
              "Detailed statistics: total lines, unique lines, empty lines removed",
              "Swap button to move output back to input for multi-pass processing",
              "Fisher-Yates shuffle algorithm for unbiased randomization",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Text Sorting</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Alphabetical vs Numerical Sorting", d: "Alphabetical sorting compares each line as a string, character by character. This means '10 apples' would come before '2 oranges' because '1' has a lower character value than '2'. Numerical sorting extracts the leading number from each line and sorts by numeric value, so '2 oranges' correctly comes before '10 apples'. Always choose the mode that matches your data type." },
              { t: "Case Sensitivity and Sort Order", d: "In case-sensitive mode, uppercase letters sort before lowercase due to their lower Unicode values (A=65, a=97). This means 'Apple', 'Banana', 'apple', 'banana' is the case-sensitive order. In case-insensitive mode, both are compared as lowercase, producing a more intuitive 'Apple', 'apple', 'Banana', 'banana' order." },
              { t: "The Fisher-Yates Shuffle", d: "The Random option uses the Fisher-Yates shuffle algorithm, which is the gold standard for unbiased randomization. It iterates through the array from the last element to the first, swapping each element with a randomly chosen element from the remaining unshuffled portion. This guarantees every possible permutation is equally likely." },
              { t: "Deduplication During Sorting", d: "When Remove Duplicates is enabled, the tool first filters out duplicate lines before sorting. The first occurrence of each unique line is preserved. Combined with case-insensitive mode, lines like 'Hello' and 'hello' are treated as the same entry. This two-in-one approach saves you from running a separate deduplication step." },
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
              { t: "Organizing Name Lists", d: "Sort attendee lists, contact databases, or employee directories alphabetically for easy lookup. Use case-insensitive mode for mixed-casing data." },
              { t: "Sorting Log Files", d: "Arrange server log entries, error messages, or event timestamps in a consistent order for faster analysis and debugging." },
              { t: "Numbered Item Lists", d: "Sort numbered lists, version numbers, or score rankings using numerical sorting to ensure correct numeric ordering rather than lexicographic." },
              { t: "CSV and Spreadsheet Data", d: "Sort rows of CSV-exported data by a specific column. Paste the column, sort it, and paste it back into your spreadsheet." },
              { t: "Playlist Randomization", d: "Use the Random shuffle to randomize song lists, quiz question orders, or any sequence where you want a different arrangement each time." },
              { t: "Cleaning Up URL Lists", d: "Sort and deduplicate lists of URLs from sitemaps, web scrapes, or bookmarks. Remove duplicates and empty lines in one pass." },
              { t: "Preparing Data for Import", d: "Sort and clean data before importing into databases or CRMs. Consistent alphabetical ordering helps identify duplicates and missing entries." },
              { t: "Sorting Vocabulary Lists", d: "Arrange word lists, glossaries, or dictionary entries alphabetically for study materials, documentation, or reference guides." },
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
          <h2 className="text-2xl font-bold tracking-tight">Sorting Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Before sorting, use our Remove Duplicate Lines tool to clean up your text first, especially if you have many duplicates that could skew your sorted results.",
              "After sorting, use our Word Counter to verify the final line and word count of your sorted text and confirm the output looks correct.",
              "If your data has inconsistent spacing around items, enable the Trim Lines option before sorting to ensure lines are compared by their actual content rather than incidental whitespace.",
              "For data that needs both deduplication and sorting, enable the Remove Duplicates toggle to handle both operations in a single step instead of using two separate tools.",
              "Use our Diff Checker to compare your sorted output against the original input and verify that no lines were accidentally lost or modified during the sort.",
              "If you need to standardize the casing of your text before or after sorting, use our Text Replacer to convert uppercase to lowercase or apply consistent title casing across all lines.",
              "For multi-pass processing, use the Swap button to move the sorted output back into the input, change the sort method (e.g., switch from alphabetical to numerical), and sort again.",
              "When sorting mixed data that contains both text and numbers, try both alphabetical and numerical modes to see which produces the most useful order for your specific dataset.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Remove Duplicate Lines/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Duplicate Lines</a>')
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Diff Checker/g, '<a href="/tools/text/diff-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Diff Checker</a>')
                    .replace(/our Text Replacer/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Replacer</a>')
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
              "Always review the first few lines of your sorted output to verify the sort order matches your expectations, especially when working with mixed-case or numerical data.",
              "For lists with leading numbers (e.g., '1. Item', '10. Item'), always use numerical sorting. Alphabetical sorting would place '10. Item' before '2. Item'.",
              "When working with data from multiple sources, enable both Trim Lines and case-insensitive mode to catch near-duplicates caused by inconsistent spacing or casing.",
              "Use the Swap button for iterative refinement: sort alphabetically, swap back, then sort numerically to explore different orderings of the same data without re-pasting.",
              "If your text contains international characters (accented letters, non-Latin scripts), verify the sort order is correct for your locale, as Unicode sorting may differ from locale-specific expectations.",
              "For very large texts with tens of thousands of lines, disable Auto-sort and use the manual Sort button to avoid performance issues from repeated re-sorting on every keystroke.",
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
