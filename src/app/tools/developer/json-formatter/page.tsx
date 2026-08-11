import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JsonFormatterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `After formatting your JSON, use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">Base64 Encoder</a> to encode it for safe transmission in URL parameters, HTTP headers, or email payloads that require ASCII-only characters.` },
  { html: `If the formatter detects invalid JSON, check for common mistakes like trailing commas or single quotes. For more advanced validation of JSON schemas, use <a href="/tools/developer/json-validator" class="${LINK_CLASS}">JSON Validator</a> to verify your data structure against a defined schema.` },
  { html: `When working with API responses that include hashed values or tokens, use <a href="/tools/developer/hash-generator" class="${LINK_CLASS}">Hash Generator</a> to verify checksums and ensure data integrity after transmission.` },
  { html: `If your JSON data contains string patterns you need to search through, format it first for readability, then use <a href="/tools/developer/regex-tester" class="${LINK_CLASS}">Regex Tester</a> to find and extract specific values using regular expressions.` },
  { html: "Use the Minify button before deploying JSON configuration files to production \u2014 smaller files load faster and consume less bandwidth, which matters for mobile users and high-traffic applications." },
  { html: "When comparing two JSON outputs, format both with the same indentation settings first. This makes visual diffs much easier to spot, especially when using our Diff Checker on the formatted text." },
  { html: "If you need to share formatted JSON with your team, copy the output and paste it into documentation, code comments, or Slack messages \u2014 the syntax-highlighted view in the tool helps you verify the structure before sharing." },
  { html: "The key count shown in the stats bar tells you the total number of keys at all nesting levels. Use this to quickly verify that your JSON payload has the expected number of fields before sending it to an API." },
]

export default function JsonFormatterPage() {
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
        <section className="mt-8" aria-label="JSON Formatter">
          <JsonFormatterTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the JSON Formatter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your JSON</span> — Enter or paste your JSON data into the input textarea on the left. You can paste minified JSON from an API response, a log file, a configuration file, or any other source. If you want to test the tool first, click the Load Sample button to populate the input with example JSON.</li>
            <li><span className="text-foreground font-medium">Choose your indentation</span> — Select your preferred indentation style from the toolbar: 2 spaces (default for most JavaScript projects), 4 spaces (common in Python and legacy codebases), or tabs. The output will update with your chosen formatting when you click Format.</li>
            <li><span className="text-foreground font-medium">Click Format</span> — Press the Format button to beautify and pretty-print your JSON. The formatted output with syntax highlighting will appear in the right panel. If your JSON has syntax errors, a detailed error message with the line number will be displayed below.</li>
            <li><span className="text-foreground font-medium">Validate or Minify</span> — Use the Validate button to check if your JSON is syntactically correct without generating output. Use the Minify button to compress your JSON into a single line for production use, reducing file size.</li>
            <li><span className="text-foreground font-medium">Copy the output</span> — Once you are satisfied with the formatted or minified JSON, click the Copy Output button to copy it to your clipboard. You can then paste it directly into your code, configuration files, or API testing tools.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "One-click formatting with syntax highlighting — strings, numbers, booleans, and keys are color-coded",
              "JSON minification to compress output into a single line for production and bandwidth savings",
              "Instant validation with precise error messages and line number detection",
              "Three indentation options: 2 spaces, 4 spaces, and tab to match your project style",
              "Real-time stats: input bytes, output bytes, compression ratio, and total key/element count",
              "Side-by-side layout on desktop, stacked layout on mobile for comfortable editing",
              "Syntax highlighting in output: keys in blue, strings in green, numbers in amber, booleans/null in purple",
              "Load Sample button to quickly test the tool with realistic nested JSON data",
              "Copy Output button with visual confirmation feedback",
              "100% client-side processing — your JSON data never leaves your browser",
              "Handles deeply nested objects, large arrays, and complex data structures",
              "Preserves the original key order from your input JSON",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards (2x2) */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding JSON Formatting</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is JSON?",
                d: "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write and easy for machines to parse and generate. It uses a simple structure of key-value pairs (objects) and ordered lists (arrays) to represent data. JSON is language-independent but uses conventions familiar to programmers of C-family languages, making it the most widely used data format for web APIs, configuration files, and data storage.",
              },
              {
                t: "Formatting vs. Minification",
                d: "Formatting (beautification) adds indentation and line breaks to JSON to make it human-readable, which is essential for debugging, code reviews, and documentation. Minification does the opposite \u2014 it removes all unnecessary whitespace to produce the smallest possible string, which is ideal for production APIs where bandwidth and payload size matter. A single formatted JSON file might be 2-5x larger than its minified version. Our tool lets you switch between both modes instantly.",
              },
              {
                t: "Common JSON Syntax Errors",
                d: "The most frequent JSON errors include trailing commas after the last element in objects or arrays, single quotes instead of double quotes, unquoted property keys, missing closing braces or brackets, and using JavaScript-specific values like undefined or functions. Standard JSON also does not support comments. When the formatter detects an error, it shows the exact error message and line number to help you locate and fix the issue quickly.",
              },
              {
                t: "JSON vs. XML",
                d: "Both JSON and XML are hierarchical data formats, but JSON is more compact because it uses less verbose syntax \u2014 no closing tags, no attributes, and no namespace declarations. JSON maps directly to JavaScript objects, making it the natural choice for web applications. XML excels in document markup scenarios where mixed content and metadata attributes are needed. For most modern APIs, configuration files, and data interchange, JSON has become the standard due to its simplicity and performance.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases (2-col) */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "API Response Debugging", d: "Paste minified API responses from browser dev tools or Postman to instantly see the full structure with proper indentation and color-coded syntax highlighting." },
              { t: "Configuration File Editing", d: "Format package.json, tsconfig.json, .eslintrc, or any other JSON configuration files for easier reading and editing in your projects." },
              { t: "Data Validation", d: "Validate JSON data before submitting it to an API or database. The tool catches syntax errors and shows the exact line number so you can fix issues quickly." },
              { t: "Code Review Preparation", d: "Minify your JSON payloads before committing to ensure compact production files, or format them before pull requests to make changes easier to review." },
              { t: "Log File Analysis", d: "Parse and format JSON log entries from application logs, server outputs, or cloud services like AWS CloudWatch to quickly understand the data structure." },
              { t: "Database Seed Data", d: "Format JSON seed data for databases, test fixtures, or mock API responses. Properly indented JSON is much easier to maintain and update." },
              { t: "Learning and Teaching", d: "Students and educators can use the formatter to understand JSON structure, see how nested objects and arrays work, and learn proper JSON syntax." },
              { t: "Quick Data Inspection", d: "Rapidly format clipboard JSON from any source \u2014 web pages, terminal outputs, or messaging apps \u2014 to inspect data without opening a full IDE." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips with Internal Links */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">JSON Formatter Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {tipsData.map((tip, idx) => (
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
