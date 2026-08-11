import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TextToTableConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TextToTableConverterPage() {
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
        <section className="mt-8" aria-label="Text to Table Converter">
          <TextToTableConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Text to Table Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your data</span> — Enter tab, comma, semicolon, or pipe-separated data into the input textarea, one row per line.</li>
            <li><span className="text-foreground font-medium">Select the delimiter</span> — Choose Tab, Comma, Semicolon, Pipe, or Custom from the delimiter buttons.</li>
            <li><span className="text-foreground font-medium">Configure options</span> — Toggle 'First row as header' if your first row contains column names. Enable 'Trim whitespace' to clean cell values.</li>
            <li><span className="text-foreground font-medium">View the HTML preview</span> — A rendered HTML table appears showing how your table will look.</li>
            <li><span className="text-foreground font-medium">Copy the code</span> — Use 'Copy Markdown' or 'Copy HTML' to get the table code for your document or website.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Supports Tab, Comma, Semicolon, and Pipe (|) delimiters",
              "Custom delimiter option for any separator character",
              "Real-time HTML table preview with proper styling",
              "Markdown table output with header separator row",
              "First row as header toggle for <th> and markdown headers",
              "Trim whitespace option for clean cell values",
              "Automatic column normalization for uneven data",
              "One-click copy for both Markdown and HTML code",
              "HTML output with proper thead/tbody structure",
              "Pastes directly from Excel/Google Sheets (tab-delimited)",
              "100% client-side processing — your data never leaves your browser",
              "No sign-up, no limits, completely free",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Text-to-Table Conversion</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Delimited Data Format", d: "Delimited data uses a specific character to separate values. The most common are tabs (from spreadsheets), commas (CSV files), semicolons (European CSV), and pipes (some database exports). Each row is on a new line, and columns are separated by the delimiter character." },
              { t: "HTML Table Structure", d: "HTML tables use <table>, <thead>, <tbody>, <tr>, <th>, and <td> elements. The generated HTML uses semantic structure with headers in <thead> and data in <tbody>. Border classes are included for immediate visual styling." },
              { t: "Markdown Table Syntax", d: "Markdown tables use pipes (|) to separate columns and hyphens (---) to separate headers from data. The second line is always the separator row. Markdown tables are supported by GitHub, GitLab, Notion, and most modern documentation platforms." },
              { t: "Column Normalization", d: "When rows have different numbers of columns, the tool pads shorter rows with empty cells. This ensures the generated table is rectangular and well-formed, preventing rendering issues in browsers and Markdown parsers." },
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
              { t: "Converting Spreadsheet Data", d: "Copy data from Excel or Google Sheets and paste it directly. The tab-delimited format is automatically handled, producing clean Markdown or HTML tables for documentation." },
              { t: "Markdown Documentation", d: "Convert CSV or tabular data into Markdown table syntax for use in GitHub README files, GitLab wikis, Notion pages, or any Markdown-based documentation system." },
              { t: "Web Development", d: "Generate properly structured HTML table code from delimited data. The output includes semantic thead/tbody structure with border styling classes ready for copy-paste into your project." },
              { t: "Data Presentation", d: "Convert raw data exports (from databases, APIs, or logs) into visual tables for reports, presentations, or emails without needing spreadsheet software." },
              { t: "CSV to Table", d: "Paste CSV data and select Comma as the delimiter to instantly convert CSV files into formatted Markdown or HTML tables. Great for small-to-medium datasets." },
              { t: "Database Export Formatting", d: "Database query results are often exported as pipe or tab-delimited text. Convert these exports into proper tables for documentation or web display." },
              { t: "Email Templates", d: "Generate HTML table code for email templates. The inline-styled HTML output works in most email clients that support basic table styling." },
              { t: "Technical Documentation", d: "Convert API response data, configuration tables, or parameter lists from raw delimited text into properly formatted tables for technical docs." },
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
          <h2 className="text-2xl font-bold tracking-tight">Text to Table Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "When copying from Excel or Google Sheets, select 'Tab' as the delimiter — spreadsheets use tabs when copying cells to clipboard.",
              "For CSV files with complex data (quoted fields, embedded commas), use our <a href=\"/tools/data-conversion/csv-to-json\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">CSV to JSON</a> converter for robust parsing.",
              "Enable 'Trim whitespace' to handle data that has inconsistent spacing — this is especially useful for data copied from PDFs or emails.",
              "If your table has many columns, use the HTML output — it handles wide tables better than Markdown in most renderers.",
              "For Markdown tables with long text in cells, be aware that some Markdown renderers have issues with very wide tables. Consider splitting into multiple smaller tables.",
              "After generating the HTML, you can customize the border and styling classes to match your website's design system.",
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
              "Always include a header row when your data has column names. Tables without headers are harder to understand, especially in documentation.",
              "Check the HTML preview before copying the code to ensure your data parsed correctly. Misaligned columns usually indicate a delimiter issue.",
              "For consistent results, use our <a href=\"/tools/text-cleanup/remove-extra-spaces\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Remove Extra Spaces</a> tool first if your source data has messy spacing.",
              "When working with CSV data that contains commas within quoted fields, consider pre-processing with a dedicated CSV parser rather than simple split-based conversion.",
              "Use the Markdown output for static documentation sites (GitHub, GitLab, Hugo, Jekyll) and the HTML output for dynamic web pages or email templates.",
              "Test the generated Markdown table in your target platform before publishing — different Markdown parsers may have slight rendering differences.",
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
