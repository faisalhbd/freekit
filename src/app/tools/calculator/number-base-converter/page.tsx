import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { NumberBaseConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function NumberBaseConverterPage() {
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
        <section className="mt-8" aria-label="Number Base Converter Tool">
          <NumberBaseConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Number Base Converter</h2>
          <p className="text-muted-foreground">
            Converting between number bases is fast and simple. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your number</span> — Type or paste the number you want to convert in the input field.
            </li>
            <li>
              <span className="text-foreground font-medium">Select the input base</span> — Choose Binary (2), Octal (8), Decimal (10), Hexadecimal (16), or Custom (2–36) from the dropdown.
            </li>
            <li>
              <span className="text-foreground font-medium">View instant results</span> — All four standard base conversions (binary, octal, decimal, hex) appear immediately.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy any result</span> — Click the copy button on any output card to copy the value to your clipboard.
            </li>
            <li>
              <span className="text-foreground font-medium">Try custom bases</span> — Select &quot;Custom&quot; and enter a base between 2 and 36 for specialized conversions.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time conversion between binary, octal, decimal, and hexadecimal",
              "Support for custom bases from 2 to 36",
              "Bit-length detection (8-bit, 16-bit, 32-bit, 64-bit+)",
              "Byte representation with hex notation (e.g., 0xFF 0x0A)",
              "One-click copy for every output value",
              "Input validation with clear error messages for invalid digits",
              "BigInt precision for large numbers beyond 64 bits",
              "Binary output formatted with 4-bit grouping for readability",
              "Quick example buttons for common conversions",
              "100% browser-based — no server, no data collection",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Number Base Systems Explained */}
        <section className="mt-16 space-y-4" aria-label="Number base systems">
          <h2 className="text-2xl font-bold tracking-tight">Number Base Systems Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Binary (Base 2)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Digits: 0, 1</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The language of computers. Every bit is either 0 (off) or 1 (on). Used in all digital systems,
                networking (IP addresses), and low-level programming.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Octal (Base 8)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Digits: 0–7</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Each octal digit represents exactly 3 binary bits. Historically used in Unix file permissions
                (e.g., chmod 755) and early computing systems.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Decimal (Base 10)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Digits: 0–9</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The standard numeral system used by humans worldwide. Most readable for everyday numbers,
                and the common ground between all base conversions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Hexadecimal (Base 16)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Digits: 0–9, A–F</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Each hex digit maps to 4 binary bits. Used for memory addresses, color codes (#FF5733),
                MAC addresses, and debugging raw data.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Web Development", desc: "Convert hex color codes to RGB values. Inspect and decode CSS color values like #3366FF." },
              { title: "Networking", desc: "Convert IP addresses between decimal and binary to understand subnet masks and CIDR notation." },
              { title: "Memory Debugging", desc: "Convert hex memory addresses to decimal for breakpoint calculations and pointer arithmetic." },
              { title: "Embedded Systems", desc: "Convert between hex register values and binary bit fields when configuring hardware peripherals." },
              { title: "Cryptography", desc: "Inspect and convert hex-encoded hash values, encryption keys, and certificate serial numbers." },
              { title: "Data Encoding", desc: "Understand how Base64 and Base32 encoding work by examining the underlying binary and hex representations." },
              { title: "Education", desc: "Learn how number systems work by converting between bases and observing the digit patterns." },
              { title: "Game Development", desc: "Convert hex color values and bit-packed game data between formats during shader and texture work." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Conversion Reference Table */}
        <section className="mt-16 space-y-4" aria-label="Conversion reference">
          <h2 className="text-2xl font-bold tracking-tight">Conversion Reference Table</h2>
          <p className="text-muted-foreground">
            Common values shown across all four bases for quick reference:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium">Decimal</th>
                  <th className="text-left py-2 px-3 font-medium">Binary</th>
                  <th className="text-left py-2 px-3 font-medium">Octal</th>
                  <th className="text-left py-2 px-3 font-medium">Hex</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {[
                  ["0", "0000 0000", "000", "00"],
                  ["1", "0000 0001", "001", "01"],
                  ["15", "0000 1111", "017", "0F"],
                  ["16", "0001 0000", "020", "10"],
                  ["32", "0010 0000", "040", "20"],
                  ["64", "0100 0000", "100", "40"],
                  ["127", "0111 1111", "177", "7F"],
                  ["128", "1000 0000", "200", "80"],
                  ["255", "1111 1111", "377", "FF"],
                  ["256", "0001 0000 0000", "400", "100"],
                  ["1024", "0100 0000 0000", "2000", "400"],
                  ["65535", "1111 1111 1111 1111", "177777", "FFFF"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-1.5 px-3">{row[0]}</td>
                    <td className="py-1.5 px-3">{row[1]}</td>
                    <td className="py-1.5 px-3">{row[2]}</td>
                    <td className="py-1.5 px-3">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Working with Number Bases</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "To quickly convert between hex and binary, remember that each hex digit = exactly 4 binary bits. Memorize the 16 mappings (0=0000, F=1111) for instant mental conversion.",
              "In binary, the number of bits determines the maximum value: 8 bits = 255, 16 bits = 65,535, 32 bits = 4,294,967,295, 64 bits = 18,446,744,073,709,551,615.",
              "Need to encode data? Try our <a href=\"/tools/developer/base64-encoder\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Base64 Encoder</a> for converting binary data to ASCII-safe text.",
              "Working with unique identifiers? Our <a href=\"/tools/developer/uuid-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">UUID Generator</a> creates standard v4 UUIDs in hex format.",
              "Parsing or formatting data? Our <a href=\"/tools/developer/json-formatter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">JSON Formatter</a> helps inspect API responses that often contain hex-encoded values.",
              "Hex color codes are three byte values: #RRGGBB. Convert each pair of hex digits separately to decimal for RGB (e.g., #FF0000 = rgb(255, 0, 0)).",
              "Unix file permissions use octal: read=4, write=2, execute=1. So chmod 755 means owner=rwx(7), group=r-x(5), others=r-x(5).",
              "When debugging, many tools show memory and register values in hex. Being fluent in hex-to-decimal conversion helps you understand values at a glance.",
              "For strong random identifiers and passwords, check out our <a href=\"/tools/utility/password-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Password Generator</a> — it can produce hex-based passwords.",
              "All conversions use your browser's JavaScript BigInt for precision. No data is ever sent to a server.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
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
