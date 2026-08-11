import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CsvViewerFilterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function CsvViewerFilterPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Component */}
        <section className="mt-8" aria-label="CSV Viewer & Filter">
          <CsvViewerFilterTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the CSV Viewer & Filter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Load your CSV data</span> — Paste CSV data into the textarea, click "Upload File" to select a .csv file from your device, or click "Load Sample" to try with example data. The tool auto-detects the delimiter.</li>
            <li><span className="text-foreground font-medium">Search and filter</span> — Type in the search box to instantly filter rows across all columns. The filter is case-insensitive and matches partial text. A badge shows how many rows match.</li>
            <li><span className="text-foreground font-medium">Sort columns</span> — Click any column header to sort ascending. Click again for descending. A third click removes the sort. Arrow icons indicate the current sort direction.</li>
            <li><span className="text-foreground font-medium">Export results</span> — Click "Export Filtered CSV" to download only the visible (filtered and sorted) rows as a new CSV file. The exported file includes headers and uses the original delimiter.</li>
            <li><span className="text-foreground font-medium">Review stats</span> — The stats bar shows total rows, column count, and the number of matching rows when a filter is active. This helps you quickly understand your dataset.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "RFC 4180 compliant CSV parser — correctly handles quoted fields, escaped quotes, and newlines inside values",
              "Auto-detect delimiter — analyzes your data to pick comma, semicolon, tab, or pipe automatically",
              "Real-time search filter — instant case-insensitive filtering across all columns as you type",
              "Column sorting — click headers to toggle ascending, descending, or unsorted order",
              "Smart numeric sorting — detects numeric columns and sorts them numerically, not alphabetically",
              "Row and column count — always see how much data you're working with",
              "Filtered count badge — shows how many rows match your search query",
              "Export filtered data — download only the matching rows as a properly formatted CSV",
              "File upload support — drag or click to upload .csv, .tsv, or .txt files directly",
              "Scrollable table — handles large datasets with a fixed header and scrollable body",
              "100% client-side — no uploads to servers, no data tracking, complete privacy",
              "Responsive design — works on desktop and mobile with optimized layouts",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Key Concepts */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding CSV Data</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is CSV?",
                d: "CSV (Comma-Separated Values) is a plain text format for tabular data. Each row is a line, columns are separated by a delimiter (usually commas), and the first row often contains headers. It is the most common data exchange format, supported by spreadsheets, databases, and data tools worldwide.",
              },
              {
                t: "Why View CSV Online?",
                d: "Viewing CSV in a browser is faster than opening a spreadsheet application. You get instant search, filtering, and sorting without installing software. It is ideal for quickly inspecting data exports, API responses, or database dumps.",
              },
              {
                t: "Quoted Fields and Special Characters",
                d: "In CSV, fields containing the delimiter, quotes, or newlines must be enclosed in double quotes. Our parser handles these RFC 4180 rules correctly, ensuring accurate display of complex CSV data exported from databases and spreadsheets.",
              },
              {
                t: "Numeric vs Alphabetical Sorting",
                d: "The viewer detects whether a column contains numbers and sorts them numerically (10 comes after 9, not after 1). For mixed or text columns, it uses standard alphabetical ordering. This provides the most intuitive sort behavior for each column type.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Data Exploration", d: "Quickly inspect CSV exports from databases, APIs, or analytics tools without opening a full spreadsheet application. Search, filter, and sort to find the data you need." },
              { t: "Log File Analysis", d: "View and filter structured log files exported as CSV. Search for specific error codes, sort by timestamp, and export the relevant entries for further investigation." },
              { t: "Data Cleaning Prep", d: "Before cleaning data, use the viewer to understand its structure, find anomalies, and identify which rows need attention. Export filtered subsets for targeted cleaning." },
              { t: "Report Review", d: "Review CSV reports from business systems, CRM exports, or survey tools. Filter by department, date range, or any field to focus on relevant data." },
              { t: "QA and Testing", d: "Inspect test result CSV files, filter by pass/fail status, sort by execution time, and export failing test details for bug reports." },
              { t: "Data Sharing", d: "Filter a large dataset to the relevant subset and export it as a clean CSV to share with colleagues or import into another tool like <a href=\"/tools/data-conversion/csv-to-json\" class=\"{LINK_CLASS}\">CSV to JSON Converter</a>." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.d }} />
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">CSV Viewer Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `For very large CSV files, use the search filter to narrow down results before scrolling. The table only renders matching rows, which improves performance.` },
              { html: `If the table looks wrong, your delimiter may be incorrect. The auto-detect feature works well for standard CSV files, but you can check by comparing the column count to what you expect.` },
              { html: `Click a column header twice to sort in descending order — useful for finding the highest or latest values in a dataset.` },
              { html: `The exported CSV preserves quoted fields correctly, so you can safely re-import it into a spreadsheet or database without data corruption.` },
              { html: `After filtering, use the matching count badge to verify your filter is working as expected before exporting.` },
              { html: `If you need to transform CSV data into JSON format, export your filtered results and use <a href="/tools/data-conversion/csv-to-json" class="${LINK_CLASS}">CSV to JSON Converter</a> for the conversion.` },
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip.html }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
