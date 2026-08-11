import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { UUIDGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `Need to encode a UUID for use in URLs or API payloads? Copy a generated UUID and paste it into <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> to create a compact, URL-safe representation of the identifier.` },
  { html: `If you are generating UUIDs for JSON payloads, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> to validate and beautify the response body containing your UUIDs, making it easy to inspect API calls.` },
  { html: `For deterministic identifiers derived from input data (e.g., content-addressable storage), you can hash a string with <a href="/tools/developer/hash-generator" class="${LINK_CLASS}">our Hash Generator</a> — the resulting SHA-256 hex output can serve as a reproducible unique ID similar to UUID v5.` },
  { html: "Toggle the no-hyphen format when you need to use UUIDs in URLs, database column names, or file paths where dashes could be misinterpreted. The 32-character hex string is still a valid UUID representation." },
  { html: "When using UUIDs as primary keys in PostgreSQL, consider storing them in a native UUID column type rather than VARCHAR — it uses 16 bytes instead of 36 and enables efficient indexing with B-tree." },
  { html: "Use the bulk generate feature (up to 100) to pre-seed test databases, create batch fixtures for unit tests, or prepare sample data for API documentation and mock servers." },
  { html: "If you need sortable unique IDs, generate a UUID v4 here and combine it with a timestamp prefix in your application code — this gives you both uniqueness and chronological ordering without a v7 dependency." },
  { html: "For session tokens or CSRF tokens, a single UUID v4 provides 122 bits of entropy, which far exceeds the minimum recommendation of 128 bits from security guidelines when combined with proper session management." },
]

export default function UUIDGeneratorPage() {
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
        <section className="mt-8" aria-label="UUID Generator">
          <UUIDGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the UUID Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Set your options</span> — Use the Uppercase toggle to switch between lowercase and uppercase output, and the With Hyphens toggle to include or remove dashes from the UUID string.</li>
            <li><span className="text-foreground font-medium">Choose the count</span> — Enter a number between 1 and 100 in the count field to specify how many UUIDs to generate in a single batch.</li>
            <li><span className="text-foreground font-medium">Generate</span> — Click the Generate button to create your UUIDs. Each UUID v4 is generated using the Web Crypto API for cryptographic randomness.</li>
            <li><span className="text-foreground font-medium">Copy individual UUIDs</span> — Hover over any UUID row and click the Copy button to copy that single UUID to your clipboard in your chosen format.</li>
            <li><span className="text-foreground font-medium">Copy all or clear</span> — Use Copy All to copy every generated UUID (one per line) to your clipboard, or Clear to reset the results and start fresh.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Cryptographically secure UUID v4 generation using the Web Crypto API (crypto.randomUUID)",
              "Bulk generation — create 1 to 100 UUIDs in a single click",
              "Uppercase and lowercase output format toggle",
              "Hyphenated (standard 36-char) and no-hyphen (compact 32-char) format options",
              "One-click copy for individual UUIDs or copy all at once",
              "Running total counter tracking all UUIDs generated in the session",
              "Scrollable results list with styled rows for easy reading",
              "Real-time format preview — toggle options apply to displayed UUIDs instantly",
              "100% client-side — no data leaves your browser, no server requests",
              "Responsive design that works on desktop, tablet, and mobile devices",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding UUIDs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is UUID v4?",
                d: "UUID version 4 is a randomly generated 128-bit identifier defined by RFC 4122. Of the 128 bits, 6 are reserved for version and variant fields (bits 48-51 set to 0100 for v4, bits 64-65 set to 10 for RFC 4122 variant), leaving 122 bits of pure randomness. This yields approximately 5.3 × 10³⁶ possible values, making collisions practically impossible for any real-world application.",
              },
              {
                t: "UUID Structure Breakdown",
                d: "A standard UUID is displayed as 8-4-4-4-12 hexadecimal characters: 550e8400-e29b-41d4-a716-446655440000. The first group (8 chars) is the time_low field. The second group (4 chars) is time_mid. The third group starts with the version nibble (4 for v4). The fourth group starts with the variant bits (8, 9, A, or B for RFC 4122). The final 12 characters are the node field — all randomly generated in v4.",
              },
              {
                t: "UUID vs Auto-Increment IDs",
                d: "Auto-increment integers (1, 2, 3...) are simple and efficient but require a centralized generator, making them unsuitable for distributed systems. UUIDs can be generated independently on any node without coordination, making them ideal for microservices, offline-first apps, and distributed databases. The trade-off is larger storage (16 bytes vs 4 bytes for int) and lack of inherent sort order with v4.",
              },
              {
                t: "Security Considerations",
                d: "UUID v4 generated by crypto.randomUUID() uses the operating system's cryptographic random number generator (CSPRNG), which provides true entropy. This makes them safe for security-sensitive uses like session tokens, CSRF tokens, and password reset links. Avoid using UUID v1 in security contexts, as the embedded MAC address can leak hardware identity. Never use Math.random() for UUID generation — it is not cryptographically secure.",
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
              { t: "Database Primary Keys", d: "Use UUIDs as primary keys in distributed databases like DynamoDB, CouchDB, and Firebase where auto-increment IDs require central coordination." },
              { t: "REST API Resource IDs", d: "Expose UUIDs as resource identifiers in REST and GraphQL APIs instead of sequential integers to prevent enumeration and information leakage." },
              { t: "Session & CSRF Tokens", d: "Generate cryptographically random tokens for user sessions and Cross-Site Request Forgery protection in web applications." },
              { t: "Distributed Tracing", d: "Assign unique trace IDs and span IDs in microservice architectures for request correlation across services using tools like OpenTelemetry." },
              { t: "File Naming", d: "Use UUIDs to create unique filenames for uploaded files, preventing name collisions in shared storage systems like S3 or local disk." },
              { t: "Message Queue IDs", d: "Assign unique message identifiers in Kafka, RabbitMQ, or SQS for exactly-once processing semantics and deduplication." },
              { t: "Cache Keys", d: "Generate unique cache keys in Redis, Memcached, or in-memory caches for computed results, API responses, or derived data." },
              { t: "Test Data Seeding", d: "Bulk-generate UUIDs to populate test databases, create mock API responses, or build sample datasets for development and QA." },
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
          <h2 className="text-2xl font-bold tracking-tight">UUID Generator Tips</h2>
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
