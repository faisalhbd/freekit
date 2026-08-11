import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JsonToCsvTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function JsonToCsvPage() {
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
        <section className="mt-8" aria-label="JSON to CSV Converter">
          <JsonToCsvTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the JSON to CSV Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your JSON</span> — Enter or paste a JSON array of objects into the input textarea. Each object in the array will become a row in the CSV. Click "Load Sample" to try the tool with example nested JSON data.</li>
            <li><span className="text-foreground font-medium">Choose your delimiter</span> — Select comma (standard CSV), semicolon (European format), or tab (TSV) as the column separator. The output updates instantly when you change the delimiter.</li>
            <li><span className="text-foreground font-medium">Toggle options</span> — Enable "Include headers" to add a header row with column names from the JSON keys. Enable "Flatten nested objects" to expand nested objects using dot notation (e.g., address.city).</li>
            <li><span className="text-foreground font-medium">Copy or download</span> — The CSV output appears instantly. Click "Copy CSV" to copy to your clipboard or "Download .csv" to save as a file with UTF-8 BOM encoding for Excel compatibility.</li>
            <li><span className="text-foreground font-medium">Chain conversions</span> — Use the Swap button to move the CSV output back to the input field, then switch to <a href="/tools/data-conversion/csv-to-json" class={`${LINK_CLASS}`}>CSV to JSON Converter</a> to verify the round-trip conversion.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Accepts JSON arrays of objects with any depth of nesting",
              "Flatten nested objects using dot notation (e.g., user.address.city)",
              "Three delimiter options: comma, semicolon, and tab for different use cases",
              "Include or exclude header row for appending to existing CSV files",
              "Proper RFC 4180 quoting for values containing delimiters, quotes, or newlines",
              "UTF-8 BOM in downloaded files for correct Excel encoding detection",
              "Handles objects with different keys — missing keys become empty cells",
              "Row and column count displayed in real-time stats bar",
              "One-click copy to clipboard with visual confirmation",
              "Download as .csv file ready to open in Excel, Google Sheets, or any spreadsheet app",
              "Swap button to pipe output into CSV to JSON converter for round-trip testing",
              "100% client-side processing — no uploads, no server, no tracking",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding JSON to CSV Conversion</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Why Convert JSON to CSV?",
                d: "CSV is the universal format for spreadsheets, data analysis tools, and database imports. Converting JSON to CSV lets you open API responses, application data, or configuration data in Excel, Google Sheets, LibreOffice Calc, or import it into SQL databases, pandas DataFrames, and R data frames.",
              },
              {
                t: "Flattening Nested Objects",
                d: "JSON often contains nested objects like {'user': {'name': 'John', 'address': {'city': 'NYC'}}}. CSV requires a flat structure with columns. The flatten option converts this to columns like user.name, user.address.city, preserving all data in a two-dimensional table format.",
              },
              {
                t: "Handling Inconsistent Schemas",
                d: "Real-world JSON arrays often have objects with different keys. The converter collects all unique keys from all objects to build a complete header. Missing keys in individual objects are represented as empty cells, ensuring a rectangular CSV structure that any spreadsheet tool can open.",
              },
              {
                t: "CSV Quoting and Escaping",
                d: 'When a CSV field contains the delimiter character, double quotes, or newlines, it must be enclosed in double quotes per RFC 4180. Double quotes within values are escaped by doubling them (""). The converter handles this automatically, producing valid CSV that any compliant parser can read.',
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
              { t: "API Response to Spreadsheet", d: "Convert JSON API responses directly into CSV for non-technical team members who need to analyze data in Excel or Google Sheets." },
              { t: "Database Data Export", d: "Convert JSON data from NoSQL databases like MongoDB into CSV format for importing into SQL databases or data warehouses." },
              { t: "Data Analysis Preparation", d: "Prepare JSON datasets for analysis in pandas, R, or Excel by converting to the universally supported CSV format." },
              { t: "Report Generation", d: "Transform application data from JSON into CSV for automated report generation, mail merges, or business intelligence tools." },
              { t: "Configuration Migration", d: "Convert JSON configuration files to CSV for bulk editing in spreadsheets, then convert back to JSON for deployment." },
              { t: "Data Backup and Sharing", d: "Create portable CSV backups of JSON data that can be opened by anyone without specialized software." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">JSON to CSV Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `Before converting, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">JSON Formatter</a> to verify your JSON is valid and well-structured.` },
              { html: `If your JSON has deeply nested structures, enable "Flatten nested objects" to preserve all data. You can also use <a href="/tools/data-conversion/json-to-yaml" class="${LINK_CLASS}">JSON to YAML Converter</a> for a more readable nested format.` },
              { html: `The downloaded CSV includes a UTF-8 BOM marker so Excel detects the correct encoding automatically — no more garbled characters when opening the file.` },
              { html: `For tab-separated output, select Tab as the delimiter. You can then paste the output directly into a spreadsheet and it will split into columns automatically.` },
              { html: `If some objects are missing keys, the CSV will have empty cells for those fields. This is normal behavior — spreadsheets handle empty cells gracefully.` },
              { html: `To validate your original JSON structure before conversion, use <a href="/tools/developer/json-validator" class="${LINK_CLASS}">JSON Validator</a> to check for syntax errors.` },
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
