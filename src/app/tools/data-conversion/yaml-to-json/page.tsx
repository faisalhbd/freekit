import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { YamlToJsonTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function YamlToJsonPage() {
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
        <section className="mt-8" aria-label="YAML to JSON Converter">
          <YamlToJsonTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the YAML to JSON Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your YAML</span> — Enter or paste YAML content into the input textarea. This works with configuration files, Kubernetes manifests, CI/CD pipelines, or any YAML content. Click "Load Sample" to try with example data.</li>
            <li><span className="text-foreground font-medium">Instant conversion</span> — The JSON output is generated automatically as you type. The built-in parser handles key-value pairs, nested objects via indentation, lists with the - prefix, and basic data types (strings, numbers, booleans, null).</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Click "Copy JSON" to copy the formatted JSON to your clipboard. The output uses 2-space indentation for readability.</li>
            <li><span className="text-foreground font-medium">Swap or clear</span> — Use Swap to move the JSON output back into the input field (useful for chaining with <a href="/tools/data-conversion/json-to-yaml" class={`${LINK_CLASS}`}>JSON to YAML Converter</a>). Use Clear to reset and start over.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Custom-built recursive YAML parser — zero external dependencies",
              "Handles nested objects via 2-space indentation mapping",
              "Parses lists defined with the - prefix at any nesting level",
              "Automatic type detection: strings, integers, floats, booleans, and null",
              "Supports quoted strings with both single and double quotes",
              "Instant conversion — output updates as you type",
              "Error display for malformed or unsupported YAML syntax",
              "One-click copy to clipboard with visual confirmation",
              "Swap button to pipe output into JSON to YAML converter",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding YAML and JSON</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is YAML?",
                d: "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files. It uses indentation to define structure, supports comments with #, and is more forgiving than JSON. Popular uses include Kubernetes manifests, Docker Compose files, CI/CD pipelines (GitHub Actions, GitLab CI), and application configuration.",
              },
              {
                t: "YAML vs JSON",
                d: "YAML is more readable with its indentation-based syntax and support for comments, making it ideal for human-edited configuration files. JSON is stricter but is the universal standard for APIs and data interchange. Converting YAML to JSON is useful when you need to feed configuration data into APIs, databases, or JavaScript applications that expect JSON.",
              },
              {
                t: "Type Mapping",
                d: "The converter automatically maps YAML types to JSON types: true/false/yes/no become JSON booleans, integers and floating-point numbers become JSON numbers, null/~ become JSON null, and all other values become JSON strings. Lists become JSON arrays and mappings become JSON objects.",
              },
              {
                t: "Supported YAML Features",
                d: "The built-in parser supports the most commonly used YAML features: key-value pairs with colon separator, nested objects via indentation, lists with - prefix, quoted strings, boolean values, numbers, and null. Advanced features like anchors, aliases, merge keys, and complex multi-line scalars are not supported by this lightweight parser.",
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
              { t: "Kubernetes to JSON", d: "Convert Kubernetes deployment YAML manifests into JSON format for use with kubectl apply -f, API servers, or custom tooling that requires JSON input." },
              { t: "CI/CD Configuration", d: "Convert GitHub Actions, GitLab CI, or CircleCI YAML configurations to JSON for programmatic manipulation, validation, or migration between CI/CD platforms." },
              { t: "App Configuration", d: "Convert application configuration files from YAML to JSON for use in Node.js, Python, or other runtime environments that prefer JSON configuration." },
              { t: "API Payload Preparation", d: "Transform YAML data into JSON to use as request bodies for REST APIs, GraphQL inputs, or webhook payloads." },
              { t: "Data Validation", d: "Convert YAML to JSON and then use a JSON Schema validator to verify the structure and data types of your configuration." },
              { t: "Documentation", d: "Convert YAML reference examples to JSON for documentation, tutorials, or code samples that show JSON format." },
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
          <h2 className="text-2xl font-bold tracking-tight">YAML to JSON Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `After converting to JSON, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">JSON Formatter</a> to re-indent or minify the output with additional formatting options.` },
              { html: `To reverse the conversion, use the Swap button and then open <a href="/tools/data-conversion/json-to-yaml" class="${LINK_CLASS}">JSON to YAML Converter</a> — or use it directly with the JSON output.` },
              { html: `Use 2-space indentation in your YAML for best results with the parser. Other indentation sizes (4 spaces, tabs) may not be parsed correctly.` },
              { html: `For YAML files with anchors (&anchor) or aliases (*anchor), pre-process the file to resolve references before pasting into the converter.` },
              { html: `If the parser shows an error, check for inconsistent indentation — YAML is very sensitive to spacing. Each nesting level should use exactly 2 spaces.` },
              { html: `Comments in YAML (lines starting with #) are automatically ignored by the parser and will not appear in the JSON output.` },
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
