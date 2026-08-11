import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TimestampConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TimestampConverterPage() {
  const schemas = getSchemas()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Breadcrumb + Hero */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Interface */}
        <section className="mt-8" aria-label="Timestamp Converter Tool">
          <TimestampConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert Timestamps Online</h2>
          <p className="text-muted-foreground">
            Converting between Unix timestamps and human-readable dates is simple:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Timestamp to Date</span> — Paste your Unix timestamp in the input field. The tool auto-detects whether it&apos;s in seconds (10 digits) or milliseconds (13 digits) and instantly shows the date in ISO 8601, UTC, local time, and relative formats.
            </li>
            <li>
              <span className="text-foreground font-medium">Date to Timestamp</span> — Switch to the &ldquo;Date → Timestamp&rdquo; tab, enter or select a date and time, and the tool shows the Unix timestamp in both seconds and milliseconds.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the result</span> — Click the copy button on any result row to copy the value to your clipboard. Each format has its own copy button.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Live current Unix timestamp display that updates every second",
              "Auto-detection of seconds (10 digits) vs milliseconds (13 digits)",
              "Multiple output formats: ISO 8601, RFC 2822, UTC, local time, and relative time",
              "Date components breakdown: year, month, day, day of week, hours, minutes, seconds",
              "Date to timestamp conversion with date picker and time input",
              "One-click copy for every format and result row",
              "Supports negative timestamps (dates before 1970)",
              "Quick-fill buttons to use the current timestamp or current date/time",
              "100% browser-based — no server calls, no data collection",
              "Responsive design works on desktop, tablet, and mobile",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. What is Unix Timestamp */}
        <section className="mt-16 space-y-4" aria-label="Understanding Unix timestamp">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Unix Timestamps</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What is the Unix Epoch?</h3>
              <p className="text-sm text-muted-foreground">
                The Unix epoch is January 1, 1970, 00:00:00 UTC — the starting point from which Unix time
                is measured. Every Unix timestamp represents the number of seconds (or milliseconds) that
                have passed since this moment. This standard was defined by early Unix developers and has
                become the universal standard for representing time in computing.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Seconds vs Milliseconds</h3>
              <p className="text-sm text-muted-foreground">
                Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits). Python, C, and
                Unix systems typically use seconds. JavaScript, Java, and many modern APIs use milliseconds.
                Our tool auto-detects which unit you&apos;re using and displays both values for reference.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Why Timezone Independent?</h3>
              <p className="text-sm text-muted-foreground">
                Unix timestamps represent a single moment in time regardless of timezone. The same timestamp
                converts to different local times depending on the viewer&apos;s timezone, but the moment it
                represents is identical everywhere. This makes timestamps ideal for databases, APIs, and
                cross-timezone applications.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Negative Timestamps</h3>
              <p className="text-sm text-muted-foreground">
                Timestamps before January 1, 1970 are negative numbers. For example, the Apollo 11 moon
                landing on July 20, 1969 has a Unix timestamp of approximately -14182940. Our tool handles
                both positive and negative timestamps correctly.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "API Development", desc: "Debug API responses that use Unix timestamps for created_at, updated_at, and expiration fields." },
              { title: "Database Management", desc: "Interpret and query timestamp columns in MySQL, PostgreSQL, MongoDB, and other databases." },
              { title: "Log Analysis", desc: "Convert log file timestamps (often in Unix format) to human-readable dates for investigation." },
              { title: "Cron Jobs & Scheduling", desc: "Calculate exact Unix timestamps for scheduling tasks in cron, Celery, AWS CloudWatch, and other systems." },
              { title: "Cache Headers", desc: "Set and interpret Cache-Control, Expires, and ETag headers that use Unix timestamps." },
              { title: "Session Management", desc: "Debug session tokens and authentication tokens that contain timestamp-based expiry information." },
              { title: "Data Migration", desc: "Convert dates between different storage formats during data migration between systems." },
              { title: "Documentation & Reports", desc: "Convert timestamps in documentation, bug reports, and support tickets to readable dates." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Working with Timestamps</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use the live timestamp display at the top to quickly get the current Unix timestamp for testing.",
              "When debugging, check whether the system uses seconds or milliseconds — a common source of errors is mixing the two.",
              "In JavaScript, use Date.now() for milliseconds or Math.floor(Date.now() / 1000) for seconds.",
              "In Python, use int(time.time()) for seconds or int(time.time() * 1000) for milliseconds.",
              "Store timestamps as integers in databases for efficient indexing, sorting, and comparison.",
              "Use ISO 8601 format for human-readable dates in APIs and config files — it's unambiguous and widely supported.",
              "For secure token generation, combine timestamps with random data. Use our Password Generator for strong random strings.",
              "For unique identifier generation, combine timestamps with UUIDs. Use our UUID Generator to create random UUIDs.",
              "Need to encode timestamp data for URLs? Use our Base64 Encoder for safe Base64 encoding.",
              "Need to generate QR codes with timestamps? Use our QR Code Generator to create scannable time-based codes.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (Password Generator)/,
                      '<a href="/tools/utility/password-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (UUID Generator)/,
                      '<a href="/tools/utility/uuid-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Base64 Encoder)/,
                      '<a href="/tools/developer/base64-encoder" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (QR Code Generator)/,
                      '<a href="/tools/utility/qr-code-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 9. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* 10. CEO / Hire Me CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
