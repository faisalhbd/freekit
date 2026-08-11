import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JsonToYamlTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function JsonToYamlPage() {
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
        <section className="mt-8" aria-label="JSON to YAML Converter">
          <JsonToYamlTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the JSON to YAML Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your JSON</span> — Enter or paste JSON data into the input textarea. This works with any valid JSON: objects, arrays, or primitive values. Click "Load Sample" to try with example data.</li>
            <li><span className="text-foreground font-medium">Instant conversion</span> — The YAML output is generated automatically as you type. The built-in converter handles nested objects, arrays, strings, numbers, booleans, and null with proper quoting and 2-space indentation.</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Click "Copy YAML" to copy the formatted YAML to your clipboard. The output uses clean, human-readable formatting compatible with Kubernetes, Docker Compose, and other YAML-based tools.</li>
            <li><span className="text-foreground font-medium">Swap or clear</span> — Use Swap to move the YAML output back into the input field (useful for chaining with <a href="/tools/data-conversion/yaml-to-json" class={`${LINK_CLASS}`}>YAML to JSON Converter</a>). Use Clear to reset and start over.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Custom-built recursive JSON to YAML serializer — zero external dependencies",
              "Handles objects (mappings), arrays (lists), strings, numbers, booleans, and null",
              "Smart quoting — only quotes strings when necessary for valid YAML syntax",
              "2-space indentation matching Kubernetes, Docker Compose, and CI/CD standards",
              "Nested objects and arrays at any depth are fully supported",
              "Empty arrays rendered as [] and null values rendered as null",
              "Instant conversion — output updates as you type",
              "Error display for invalid JSON input",
              "One-click copy to clipboard with visual confirmation",
              "Swap button to pipe output into YAML to JSON converter",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding JSON to YAML Conversion</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Why Convert JSON to YAML?",
                d: "YAML is more readable and supports comments, making it ideal for configuration files that humans need to read and edit. Converting JSON to YAML lets you take API responses, database exports, or application data and transform them into clean configuration files for Kubernetes, Docker Compose, GitHub Actions, or other YAML-based tools.",
              },
              {
                t: "Type Mapping",
                d: "JSON types map naturally to YAML types: objects become mappings (key: value), arrays become sequences (- item), strings become plain or quoted scalars, numbers stay as numbers, booleans stay as true/false, and null stays as null. The converter handles this mapping automatically for every nested level.",
              },
              {
                t: "Smart Quoting Rules",
                d: "The converter only adds double quotes around strings that need them — values containing special YAML characters like colons, hashes, brackets, or whitespace. Simple strings like 'hello' or 'my-app' are left unquoted for maximum readability, while strings like 'hello: world' are properly quoted.",
              },
              {
                t: "YAML as a Superset of JSON",
                d: "YAML 1.2 is a superset of JSON, meaning all valid JSON is also valid YAML. However, converting JSON to YAML formatting makes the data much more human-readable by removing braces, brackets, and commas in favor of indentation-based structure. This is why YAML is the preferred format for configuration files.",
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
              { t: "API Response to Config", d: "Convert JSON API responses into YAML configuration files for applications, microservices, or infrastructure-as-code tools." },
              { t: "Kubernetes Manifests", d: "Convert JSON-formatted Kubernetes resources (from kubectl get -o json) into human-readable YAML manifests for version control and editing." },
              { t: "Docker Compose", d: "Convert JSON service definitions into docker-compose.yml format for Docker Compose configuration." },
              { t: "CI/CD Pipelines", d: "Convert JSON pipeline definitions into YAML format for GitHub Actions, GitLab CI, CircleCI, or other CI/CD platforms." },
              { t: "Documentation", d: "Convert JSON examples into YAML for documentation, tutorials, or guides that use YAML as the configuration format." },
              { t: "Configuration Migration", d: "Migrate application configurations from JSON to YAML format for improved readability and comment support." },
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
          <h2 className="text-2xl font-bold tracking-tight">JSON to YAML Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `Before converting, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">JSON Formatter</a> to verify your JSON is valid and properly structured.` },
              { html: `To verify the conversion is correct, use the Swap button and then open <a href="/tools/data-conversion/yaml-to-json" class="${LINK_CLASS}">YAML to JSON Converter</a> to convert back and compare.` },
              { html: `The 2-space indentation used in the output matches the standard for Kubernetes, Docker Compose, GitHub Actions, and most other YAML-based tools.` },
              { html: `For JSON configurations with many deeply nested properties, YAML format is significantly more readable because it removes all the braces, brackets, and commas.` },
              { html: `If you need to validate your JSON structure before converting, use <a href="/tools/developer/json-validator" class="${LINK_CLASS}">JSON Validator</a> to check for syntax errors.` },
              { html: `The converter preserves the exact key order from your JSON input, so the YAML output maintains the same field ordering.` },
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
