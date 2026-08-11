import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JsonValidatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `After validating your JSON, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> to beautify minified JSON with proper indentation and syntax highlighting for easier reading and debugging.` },
  { html: `If you need to encode valid JSON for transmission in URL parameters, HTTP headers, or email payloads, use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> to safely convert it to an ASCII-only string.` },
  { html: `When validating JSON that contains string patterns or data you need to search through, use <a href="/tools/developer/regex-tester" class="${LINK_CLASS}">our Regex Tester</a> to test regular expressions against the extracted string values.` },
  { html: `If your JSON contains hashed values, API tokens, or checksums that need verification, use <a href="/tools/developer/hash-generator" class="${LINK_CLASS}">our Hash Generator</a> to generate and compare hash values for data integrity checks.` },
  { html: "Enable the auto-validate toggle when you are actively editing or fixing JSON errors. This gives you instant feedback as you type, so you can see the moment your fix resolves the issue without clicking the Validate button each time." },
  { html: "The depth statistic shown after validation helps you identify overly nested JSON structures. Deeply nested JSON (depth > 5) is often harder to work with and may indicate a design that could be flattened for better performance." },
  { html: "Use the Copy Formatted JSON button after validation to get a properly indented copy of your JSON automatically. This is useful when you have minified JSON that you want to use in documentation, code comments, or configuration files." },
  { html: "If you receive a JSON error from an API response, paste the entire response body into the validator. The line and column numbers will help you pinpoint exactly where the server's JSON output is malformed, which is useful for filing bug reports." },
]

export default function JsonValidatorPage() {
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
        <section className="mt-8" aria-label="JSON Validator">
          <JsonValidatorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the JSON Validator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your JSON</span> — Enter or paste your JSON data into the textarea. This can be from an API response, a configuration file, a log output, or any other source. You can also click the Load Sample buttons to test with pre-built valid or invalid JSON examples.</li>
            <li><span className="text-foreground font-medium">Click Validate JSON</span> — Press the primary Validate JSON button to check your data. If valid, you will see a green confirmation with detailed statistics. If invalid, a red error card will appear with the exact error message, line number, and column number.</li>
            <li><span className="text-foreground font-medium">Review the results</span> — For valid JSON, review the stats (keys, depth, arrays, objects, bytes) to verify your data structure. For invalid JSON, use the line and column information to locate and fix the error in your source.</li>
            <li><span className="text-foreground font-medium">Copy formatted output</span> — If your JSON is valid, click the Copy Formatted JSON button to copy a beautifully indented version to your clipboard. This works even if your input was minified — the tool auto-formats it with 2-space indentation before copying.</li>
            <li><span className="text-foreground font-medium">Use auto-validate for live feedback</span> — Toggle on the auto-validate switch to get real-time validation as you type. This is ideal when you are actively fixing errors and want instant confirmation that your changes resolve the issue.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instant validation with precise error messages including line and column numbers",
              "Detailed statistics for valid JSON: keys count, nesting depth, arrays count, objects count, and byte size",
              "Copy Formatted JSON button that auto-formats minified JSON with 2-space indentation before copying",
              "Auto-validate toggle for real-time feedback as you type or edit",
              "Pre-built sample data: load valid JSON or invalid JSON to test the tool instantly",
              "Clear button to reset the input and results in one click",
              "Common JSON errors reference guide with 8 quick-fix tips shown below the results",
              "100% client-side processing — your JSON data never leaves your browser",
              "Handles deeply nested objects, large arrays, and complex data structures",
              "Responsive design that works perfectly on desktop, tablet, and mobile devices",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding JSON Validation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is JSON Validation?",
                d: "JSON validation is the process of checking whether a string of text conforms to the JSON syntax specification (RFC 8259). A valid JSON string can be successfully parsed into a JavaScript object or any other programming language's data structure. The validator checks for proper use of double quotes, correct comma placement, matching brackets and braces, valid value types (string, number, boolean, null, object, array), and proper escaping of special characters within strings.",
              },
              {
                t: "JSON vs. JavaScript Object Literals",
                d: "While JSON is derived from JavaScript object literal syntax, they are not the same. JSON requires double quotes for all strings and property keys, does not allow trailing commas, does not support comments, and cannot contain values like undefined, functions, Date objects, or regular expressions. A JavaScript object literal like `{name: 'John',}` is invalid JSON. Always use a validator to catch these subtle differences before sending data to an API.",
              },
              {
                t: "Line and Column Error Detection",
                d: "When JSON.parse() fails, it throws an error with a character position. Our validator converts this position into human-readable line and column numbers by counting newline characters before the error position. This makes it much easier to locate the exact spot in your JSON that needs fixing, especially in large files with hundreds of lines. The line and column are displayed as badges in the error result card.",
              },
              {
                t: "Why Validation Matters",
                d: "Validating JSON before using it prevents runtime errors in your applications. An invalid API response can crash your frontend, a malformed configuration file can prevent your application from starting, and broken JSON data can corrupt your database. Using a validator during development and debugging saves hours of troubleshooting by catching syntax errors immediately with precise location information.",
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
              { t: "API Response Debugging", d: "Paste API responses from browser dev tools, Postman, or curl output to instantly check if the server is returning valid JSON. The line and column numbers help you identify server-side bugs in the response format." },
              { t: "Configuration File Validation", d: "Validate JSON configuration files like package.json, tsconfig.json, .eslintrc.json, or AWS CloudFormation templates before deploying. Catch syntax errors that would prevent your application from starting." },
              { t: "Data Pipeline Verification", d: "Check JSON data from databases, message queues, or ETL pipelines to ensure it is well-formed before downstream processing. Invalid JSON in a pipeline can cause cascading failures." },
              { t: "Webhook Payload Inspection", d: "Validate incoming webhook payloads from services like Stripe, GitHub, or Slack. Many webhooks send JSON that may be malformed if the sender has a bug." },
              { t: "Schema Migration Testing", d: "After modifying your data schema, validate that existing JSON data still conforms to the expected format. This is critical during database migrations and API version upgrades." },
              { t: "Learning JSON Syntax", d: "Students and beginners can paste their JSON and get immediate feedback on what is wrong. The common errors guide below the results teaches proper JSON syntax through practical examples." },
              { t: "Pre-commit Validation", d: "Before committing JSON files to version control, validate them to prevent broken configurations from reaching your team. A single invalid JSON file can break the build for everyone." },
              { t: "Debugging Minified JSON", d: "Minified API responses are hard to read and debug. Validate first to confirm the JSON is correct, then use the Copy Formatted button to get a readable version for inspection." },
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
          <h2 className="text-2xl font-bold tracking-tight">JSON Validator Tips</h2>
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
