import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { Base64EncoderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `When encoding URLs or query parameters, use our <a href="/tools/developer/url-encoder" class="${LINK_CLASS}">URL Encoder</a> instead — it handles percent-encoding which is the correct standard for URL-safe text transmission, while Base64 is better suited for binary data and authentication payloads.` },
  { html: `If you need to safely embed text into HTML documents to prevent XSS attacks, use <a href="/tools/developer/html-encoder" class="${LINK_CLASS}">our HTML Entity Encoder</a> to convert special characters like <, >, and & into their entity references.` },
  { html: `After decoding a Base64 string that contains JSON data, paste the result into <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> to beautify and validate the structure with syntax highlighting.` },
  { html: `When generating unique identifiers for your application, you can encode UUIDs in Base64 to create shorter, URL-safe tokens. Use <a href="/tools/developer/uuid-generator" class="${LINK_CLASS}">our UUID Generator</a> to create the UUIDs first, then encode them here.` },
  { html: "The Swap button lets you quickly move decoded output back to the input area and flip the mode from Decode to Encode — perfect for round-trip testing to verify your encoding and decoding logic." },
  { html: "Enable the auto-encode toggle for instant feedback as you type. This is especially useful when encoding short strings like API credentials or data URI fragments where you want to see the result immediately." },
  { html: "Remember that Base64 increases data size by approximately 33% — 3 bytes of input become 4 characters of output. The stats bar shows the exact size change percentage so you can monitor the overhead." },
  { html: "When using drag-and-drop file upload, the tool generates a complete data URI (data:mime/type;base64,...) that you can copy and paste directly into HTML img tags or CSS background-image properties." },
]

export default function Base64EncoderPage() {
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
        <section className="mt-8" aria-label="Base64 Encoder/Decoder">
          <Base64EncoderTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Base64 Encoder/Decoder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Choose your mode</span> — Select Encode to convert plain text to Base64, or Decode to convert Base64 back to readable text. Click the mode buttons in the toolbar or use the dedicated Encode/Decode action buttons.</li>
            <li><span className="text-foreground font-medium">Enter your input</span> — Type or paste your text into the input textarea on the left. If encoding, enter any text including Unicode characters, emojis, or special symbols. If decoding, paste a Base64 string.</li>
            <li><span className="text-foreground font-medium">Upload a file (optional)</span> — Drag and drop a file onto the input area or click the Upload File button. The file will be read entirely in your browser and encoded as a Base64 data URI, perfect for embedding images or other assets.</li>
            <li><span className="text-foreground font-medium">Encode or Decode</span> — Click the Encode or Decode button to process your input. Alternatively, enable the auto-encode toggle for real-time processing as you type. The result appears instantly in the output panel.</li>
            <li><span className="text-foreground font-medium">Copy or Swap</span> — Click Copy Output to copy the result to your clipboard. Use the Swap button to move the output back to the input and flip the mode, which is useful for round-trip verification.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Full UTF-8 support — correctly handles Unicode, emojis, CJK characters, and accented letters",
              "Encode mode converts plain text to standards-compliant Base64 with proper padding",
              "Decode mode converts Base64 back to the original text, preserving all Unicode characters",
              "File upload via drag-and-drop or file picker, outputting complete data URIs for direct embedding",
              "Auto-encode toggle for instant real-time processing as you type",
              "Swap button to quickly move output to input and flip between encode/decode modes",
              "Stats bar showing input length, output length, and exact size increase/decrease percentage",
              "Clear error display for invalid Base64 input with specific guidance on what went wrong",
              "Side-by-side layout on desktop, stacked layout on mobile for comfortable editing",
              "100% client-side processing — your data never leaves your browser",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Base64 Encoding</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is Base64?",
                d: "Base64 is a binary-to-text encoding scheme defined in RFC 4648. It represents binary data using a set of 64 ASCII characters (A–Z, a–z, 0–9, +, /) with = as padding. It converts every 3 bytes of input into 4 characters of output, resulting in approximately 33% larger data. Base64 is widely used to safely transmit binary data through text-only channels like email, JSON, XML, and HTML.",
              },
              {
                t: "UTF-8 and Unicode Handling",
                d: "Standard Base64 encoding in browsers (btoa) only works with single-byte Latin-1 characters. Our tool overcomes this limitation by first converting your text to UTF-8 bytes using TextEncoder, then Base64-encoding those bytes. During decoding, it reverses the process with TextDecoder. This means emojis (\uD83D\uDE00), accented letters (\u00E9), CJK characters (\u4F60\u597D), and any other Unicode text are encoded and decoded correctly.",
              },
              {
                t: "Data URIs Explained",
                d: "A data URI embeds data directly in a document using the format data:[mediatype][;base64],<data>. When you upload a file, our tool generates the complete data URI including the MIME type (e.g., data:image/png;base64,iVBOR...). You can use these in HTML <img> tags, CSS background-image properties, or anywhere a URL is expected. This eliminates extra HTTP requests for small assets, improving page load performance.",
              },
              {
                t: "Base64 is Not Encryption",
                d: "A common misconception is that Base64 provides security. It does not — Base64 is a reversible encoding with no key, cipher, or mathematical transformation. Anyone can decode Base64 instantly. It is used alongside encryption (like HTTPS or AES) to safely represent encrypted binary data as text. Never rely on Base64 alone to protect sensitive information. If you need security, use proper encryption algorithms and protocols.",
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
              { t: "HTTP Basic Authentication", d: "Encode username:password credentials for the Authorization header in HTTP Basic Auth. Format: Basic base64(user:password). Always use over HTTPS." },
              { t: "Data URI Embedding", d: "Convert small images, SVGs, or fonts to Base64 data URIs and embed them directly in HTML, CSS, or JavaScript to reduce HTTP requests." },
              { t: "API Payloads", d: "Encode binary data or complex objects as Base64 strings for inclusion in JSON API requests where binary data is not allowed." },
              { t: "Email Attachments", d: "MIME email encoding uses Base64 to attach binary files like images and PDFs to email messages, which are text-based protocols." },
              { t: "JWT Token Inspection", d: "Decode the payload portion of JSON Web Tokens (JWT) to inspect the claims and data without verifying the signature." },
              { t: "CSS Image Embedding", d: "Convert small icons and background images to data URIs for inline CSS, eliminating separate image file requests for tiny assets." },
              { t: "Configuration and Secrets", d: "Encode configuration values, API keys, or tokens for safe inclusion in environment variables or CI/CD pipeline configurations." },
              { t: "Debugging Encoded Data", d: "Quickly decode Base64 strings found in API responses, log files, or network traces to understand the underlying data." },
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
          <h2 className="text-2xl font-bold tracking-tight">Base64 Encoder/Decoder Tips</h2>
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
