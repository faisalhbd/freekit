import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ListCleanerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ListCleanerPage() {
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
        <section className="mt-8" aria-label="List Cleaner">
          <ListCleanerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the List Cleaner</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your list</span> — Enter your list items, one per line, into the input textarea. The list can be numbered, bulleted, or plain text.</li>
            <li><span className="text-foreground font-medium">Select cleanup options</span> — Check the operations you want: remove empty lines, trim whitespace, remove duplicates, remove numbering, remove bullet points, sort, or add new formatting.</li>
            <li><span className="text-foreground font-medium">Click Clean List</span> — Press the button to process. All selected operations are applied in the correct order in a single pass.</li>
            <li><span className="text-foreground font-medium">Review the output</span> — Check the item count and verify the cleaned list looks correct. Use Swap for multi-pass processing if needed.</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Click Copy Output to copy the cleaned list to your clipboard.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Remove empty lines and blank entries from lists",
              "Case-insensitive duplicate detection and removal",
              "Trim leading and trailing whitespace from each item",
              "Sort alphabetically A-Z or Z-A",
              "Remove numbering formats (1. 2. 3.) and (1) 2) 3))",
              "Remove bullet points (- * •) from the start of lines",
              "Add sequential numbering to plain lists",
              "Add bullet point prefixes (-) to plain lists",
              "Combine multiple operations in a single pass",
              "Copy, Clear, and Swap buttons for efficient workflow",
              "100% client-side processing — your data never leaves your browser",
              "Works with lists of any size, from a few items to thousands",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding List Cleanup</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Duplicate Detection", d: "The tool uses case-insensitive comparison to find duplicates. This means 'Apple', 'APPLE', and 'apple' are all treated as the same item. Only the first occurrence (with its original casing) is kept. This approach is ideal for most real-world list cleanup scenarios where casing may vary." },
              { t: "Processing Order", d: "Operations are applied in a specific order: trim whitespace first, then remove empty lines, strip numbering and bullets, remove duplicates, sort, and finally add numbering or bullets. This order ensures optimal results — for example, trimming before deduplication catches duplicates that differ only in whitespace." },
              { t: "Numbering Formats", d: "The tool handles the most common numbering formats: '1.' with a period, '1)' with a closing parenthesis, and any digit count. Multi-digit numbers like '10.' and '100.' are fully supported. After removal, you can add clean, sequential numbering starting from 1." },
              { t: "Bullet Point Characters", d: "Three bullet characters are supported for removal: the hyphen (-), asterisk (*), and the Unicode bullet character (•). These cover the vast majority of bullet point formats found in plain text, markdown, email, and copy-pasted content from web pages." },
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
              { t: "Merging Multiple Lists", d: "Combine lists from different sources by pasting them all together, then enabling Remove Duplicates and Trim Whitespace to get a clean, unified list without any repeated entries." },
              { t: "Cleaning Exported Data", d: "Data exported from databases, spreadsheets, or APIs often includes extra formatting, numbering, or blank lines. Use this tool to strip the formatting and get clean data items." },
              { t: "Preparing Dropdown Menus", d: "When building dropdown menus or select options for websites, paste your raw list, clean it up, sort alphabetically, and add numbering for a ready-to-use ordered list." },
              { t: "Organizing Brainstorming Lists", d: "After a brainstorming session, you often end up with duplicate ideas and messy formatting. Clean up the list, remove duplicates, and sort it for a clear overview." },
              { t: "Formatting for Documentation", d: "Convert between numbered and bulleted list formats for different documentation styles. Remove old numbering and add the format required by your style guide." },
              { t: "Cleaning Email Lists", d: "Remove duplicate email addresses, empty lines, and extra whitespace from email lists exported from different systems or manually compiled." },
              { t: "Preparing Data for Import", d: "Clean up list data before importing into databases, CRMs, or other systems. Remove duplicates and trim whitespace to prevent data quality issues." },
              { t: "Reformatting Notes", d: "Convert between bulleted and numbered formats when reorganizing notes from one context (meeting notes) to another (task list)." },
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
          <h2 className="text-2xl font-bold tracking-tight">List Cleanup Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "For a thorough cleanup, enable Remove Empty Lines, Trim Whitespace, and Remove Duplicates together in one pass.",
              "If you want to convert a numbered list to a bulleted list, enable both Remove Numbering and Add Bullet Points.",
              "Use the Swap button for multi-pass operations: first deduplicate and sort, then swap and add numbering.",
              "When combining lists from different sources, paste them all first, then enable Remove Duplicates with Trim Whitespace to catch near-duplicates.",
              "After cleaning, use our <a href=\"/tools/text/word-counter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Word Counter</a> to get additional statistics about your list content.",
              "For lists with embedded commas or complex entries, consider using our <a href=\"/tools/data-conversion/csv-to-json\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">CSV to JSON</a> converter for structured data handling.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-3 text-muted-foreground">
            {[
              "Always review the output after cleanup, especially when using Remove Duplicates. Case-insensitive deduplication may merge items that are actually different in context (e.g., 'US' vs 'us').",
              "Keep a copy of your original list before performing aggressive cleanup operations like duplicate removal or sorting.",
              "When cleaning email lists, enable Trim Whitespace and Remove Empty Lines first, then manually review before enabling Remove Duplicates.",
              "For very large lists, process in batches using the Swap feature to maintain control and verify results at each step.",
              "Use Add Numbering after sorting to create a numbered, alphabetically ordered list — perfect for reference materials and appendices.",
              "After cleaning your list, use our <a href=\"/tools/text-cleanup/remove-duplicate-lines\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Remove Duplicate Lines</a> tool for line-level deduplication if you need exact match (case-sensitive) duplicate removal.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: practice }} />
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
