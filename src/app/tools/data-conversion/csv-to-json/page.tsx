import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CsvToJsonTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function CsvToJsonPage() {
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
        <section className="mt-8" aria-label="CSV to JSON Converter">
          <CsvToJsonTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the CSV to JSON Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your CSV data</span> — Enter or paste comma-separated values into the input textarea. You can also copy data directly from a spreadsheet, a text file, or a database export. Click "Load Sample" to try the tool with example data.</li>
            <li><span className="text-foreground font-medium">Select the delimiter</span> — Choose the character that separates your values: comma, semicolon, tab, or pipe. You can also click "Auto-detect" and the tool will analyze your CSV to find the most likely delimiter automatically.</li>
            <li><span className="text-foreground font-medium">Configure options</span> — Toggle "First row as header" if your CSV has column names in the first row. Choose between "Array of Objects" (each row becomes a JSON object with named keys) and "Array of Arrays" (simple nested arrays). Select 2 or 4 space indentation.</li>
            <li><span className="text-foreground font-medium">Get your JSON</span> — The JSON output appears instantly as you type or change options. Copy it to your clipboard with one click, or download it as a .json file. The stats bar shows the number of rows and columns detected.</li>
            <li><span className="text-foreground font-medium">Swap or clear</span> — Use the Swap button to move the JSON output back into the input field (useful for chaining with <a href="/tools/data-conversion/json-to-csv" class={`${LINK_CLASS}`}>JSON to CSV Converter</a>). Use Clear to reset everything and start over.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "RFC 4180 compliant CSV parser — correctly handles quoted fields, escaped quotes, and newlines inside values",
              "Four delimiter options: comma, semicolon, tab, and pipe with one-click auto-detection",
              "First row as header toggle — convert to named JSON objects or keep as raw arrays",
              "Two output formats: Array of Objects for structured data or Array of Arrays for simple tabular data",
              "Configurable indentation: 2 spaces or 4 spaces to match your project style guide",
              "Row and column count displayed in real-time stats bar",
              "One-click copy to clipboard with visual confirmation feedback",
              "Download as .json file with UTF-8 encoding for direct use in projects",
              "Swap button to pipe output back to input for format chaining",
              "100% client-side processing — no uploads, no server, no tracking",
              "Handles CSV exported from Excel, Google Sheets, databases, and APIs",
              "Responsive design with side-by-side panels on desktop and stacked on mobile",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding CSV and JSON</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is CSV?",
                d: "CSV (Comma-Separated Values) is a plain text format for tabular data where each row is a line and columns are separated by a delimiter. It is one of the most common data exchange formats, supported by spreadsheets, databases, and data processing tools. CSV files use .csv extension and are universally compatible across operating systems and applications.",
              },
              {
                t: "What is JSON?",
                d: "JSON (JavaScript Object Notation) is a lightweight data format that uses human-readable text to represent structured data as objects and arrays. It is the standard format for web APIs, configuration files, and data interchange in modern applications. JSON supports strings, numbers, booleans, null, objects, and arrays.",
              },
              {
                t: "Why Convert CSV to JSON?",
                d: "JSON is the preferred format for web development, APIs, and modern applications. Converting CSV to JSON enables you to use spreadsheet data in JavaScript applications, feed data to REST APIs, populate frontend components, or import data into NoSQL databases like MongoDB that natively use JSON.",
              },
              {
                t: "Array of Objects vs Array of Arrays",
                d: "Array of Objects (e.g., [{name: \"John\", age: \"30\"}]) is ideal when your CSV has headers and you want named keys for each value. Array of Arrays (e.g., [[\"John\", \"30\"]]) is better for simple numeric data or when you want to preserve the raw tabular structure without naming each column.",
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
              { t: "API Data Preparation", d: "Convert CSV exports from your database or spreadsheet into JSON format for use in REST API requests, GraphQL mutations, or server-side data processing." },
              { t: "Frontend Development", d: "Transform CSV data into JSON to populate charts, tables, or dynamic content in React, Vue, or Angular applications." },
              { t: "Database Migration", d: "Convert legacy CSV data files into JSON format for importing into MongoDB, CouchDB, or other document-based databases that use JSON natively." },
              { t: "Configuration Files", d: "Convert CSV-based configuration data into JSON config files used by Node.js, TypeScript, and other modern development tools." },
              { t: "Data Analysis", d: "Convert CSV survey results, analytics exports, or research data into JSON for processing with JavaScript-based data analysis libraries." },
              { t: "Testing and Mocking", d: "Create JSON mock data from CSV fixtures for unit testing, integration testing, or API mocking in development environments." },
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
          <h2 className="text-2xl font-bold tracking-tight">CSV to JSON Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `If your CSV has complex nested data, first flatten it in a spreadsheet, then convert. For the reverse process, use <a href="/tools/data-conversion/json-to-csv" class="${LINK_CLASS}">JSON to CSV Converter</a>.` },
              { html: `After converting, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">JSON Formatter</a> to re-indent or minify the output with additional formatting options.` },
              { html: `If the output looks wrong, try the Auto-detect button to find the correct delimiter — many European CSV exports use semicolons instead of commas.` },
              { html: `When exporting from Excel or Google Sheets, save as CSV (UTF-8) to preserve special characters. The converter handles UTF-8 encoded text correctly.` },
              { html: `For data validation after conversion, use <a href="/tools/developer/json-validator" class="${LINK_CLASS}">JSON Validator</a> to ensure the output is syntactically correct.` },
              { html: `Use the Array of Arrays format when you need to preserve the exact column order or when working with numeric-only tabular data like matrices or grids.` },
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
