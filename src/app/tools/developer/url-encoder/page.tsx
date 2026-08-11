import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { UrlEncoderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `If you need to encode binary data or authentication payloads for transmission, use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> — it converts arbitrary data into a 64-character ASCII representation suitable for JSON, email, and data URIs.` },
  { html: `When embedding user-generated text into HTML templates, first URL-encode it here, then use <a href="/tools/developer/html-encoder" class="${LINK_CLASS}">our HTML Entity Encoder</a> to convert special characters like <, >, and & into entity references for XSS prevention.` },
  { html: `If your encoded URL contains JSON query parameters, decode them first with this tool, then paste the result into <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> to beautify and validate the structure.` },
  { html: "Enable the 'Encode full URL' toggle when you have a complete URL with colons, slashes, and question marks that should be preserved as structural delimiters. It uses encodeURI() instead of encodeURIComponent(), keeping :///?= reserved characters intact." },
  { html: "The Swap button moves the output to the input area and flips between encode and decode modes — perfect for round-trip testing to verify your encoded strings decode back to the original text." },
  { html: "Enable auto-encode for instant feedback as you type. This is especially useful when working with API query strings where you want to see the encoded result in real time as you build parameter values." },
  { html: "Spaces in URLs are encoded as %20 by default (the RFC 3986 standard). Note that some legacy systems use + for spaces in application/x-www-form-urlencoded data — our tool always uses the standard %20 format." },
  { html: "The reference table below the tool shows 20 commonly encoded characters with their hex values. Use it as a quick lookup when you need to manually verify or construct percent-encoded strings." },
]

export default function UrlEncoderPage() {
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
        <section className="mt-8" aria-label="URL Encoder/Decoder">
          <UrlEncoderTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the URL Encoder/Decoder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Choose your mode</span> — Select Encode to convert text to percent-encoded format, or Decode to convert percent-encoded strings back to readable text. Click the mode buttons in the toolbar or use the dedicated Encode/Decode action buttons.</li>
            <li><span className="text-foreground font-medium">Select encoding type</span> — When encoding, choose whether to encode the full URL (preserves structural characters like :// and ? using encodeURI) or encode values only (encodes everything including /, ?, and = using encodeURIComponent). Use full URL mode for complete web addresses, and values-only mode for query parameter values.</li>
            <li><span className="text-foreground font-medium">Enter your input</span> — Type or paste your text into the input textarea on the left. For encoding, enter any text including URLs, query strings, or text with special characters. For decoding, paste a percent-encoded string.</li>
            <li><span className="text-foreground font-medium">Encode or Decode</span> — Click the Encode or Decode button to process your input. Alternatively, enable the auto-encode toggle for real-time processing as you type. The result appears instantly in the output panel.</li>
            <li><span className="text-foreground font-medium">Copy or Swap</span> — Click Copy Output to copy the result to your clipboard. Use the Swap button to move the output back to the input and flip the mode, useful for round-trip verification.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Encode mode with two strategies: encodeURI() for full URLs and encodeURIComponent() for values",
              "Decode mode using decodeURIComponent() to convert percent-encoded strings back to readable text",
              "Full URL toggle to preserve structural URL delimiters (://, ?, &, =) when encoding complete web addresses",
              "Auto-encode toggle for instant real-time processing as you type",
              "Reference table of 20 common URL-encoded characters with hex values and descriptions",
              "Stats bar showing input length, output length, and count of encoded/decoded characters",
              "Swap button to quickly move output to input and flip between encode/decode modes",
              "Clear error display for invalid percent-encoded input with specific guidance",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding URL Encoding</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is Percent Encoding?",
                d: "Percent encoding (URL encoding) is defined in RFC 3986 as a mechanism to represent arbitrary data in URIs using only the limited set of US-ASCII characters allowed in URLs. Characters that are not in the unreserved set (A-Z, a-z, 0-9, -, _, ., ~) are replaced with a % sign followed by two hexadecimal digits representing the character's byte value. For example, a space (ASCII 32, hex 20) becomes %20.",
              },
              {
                t: "encodeURI vs encodeURIComponent",
                d: "JavaScript provides two encoding functions. encodeURI() preserves characters that have structural meaning in URLs (:, /, ?, #, &, =, +, @), making it suitable for encoding complete URLs. encodeURIComponent() encodes all characters except A-Z, a-z, 0-9, -, _, ., ~, making it ideal for encoding individual query parameter values. Using the wrong function is a common source of bugs — our toggle lets you switch between them easily.",
              },
              {
                t: "Reserved vs Unreserved Characters",
                d: "RFC 3986 defines reserved characters (:, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, =) as having special meaning in URI syntax. Unreserved characters (A-Z, a-z, 0-9, -, _, ., ~) never need encoding and can appear literally in any URI. When a reserved character appears in a non-structural context (like a ? in a query value), it must be percent-encoded.",
              },
              {
                t: "UTF-8 in URL Encoding",
                d: "URL encoding works on bytes, not characters. Non-ASCII characters like emojis, accented letters, and CJK text are first converted to UTF-8 byte sequences, then each byte is individually percent-encoded. For example, the é character becomes the UTF-8 bytes C3 A9, encoding to %C3%A9. This means a single non-ASCII character can produce up to 9 characters in a percent-encoded URL (for 4-byte UTF-8 sequences like emojis).",
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
              { t: "API Query Parameters", d: "Encode parameter values when constructing API URLs to ensure special characters like spaces, ampersands, and equals signs don't break the query string structure." },
              { t: "Web Form Data", d: "Understand how browsers encode form submissions and decode URL-encoded form data received from application/x-www-form-urlencoded POST requests." },
              { t: "URL Sharing and Links", d: "Encode URLs that contain special characters before embedding them in emails, social media posts, or other contexts where the URL might be mangled." },
              { t: "Debugging API Requests", d: "Decode percent-encoded URLs from browser dev tools, server logs, or API documentation to understand the actual parameter values being sent." },
              { t: "Redirect URLs", d: "Encode redirect target URLs when passing them as query parameters (e.g., ?redirect=/page?a=1&b=2 must be properly encoded to avoid parsing errors)." },
              { t: "SEO and Canonical URLs", d: "Ensure URLs contain only safe ASCII characters for search engine crawlers. Non-ASCII characters in slugs should be percent-encoded for proper indexing." },
              { t: "Data URI Parameters", d: "Encode data within data URIs or custom URL schemes where special characters could be misinterpreted as delimiters." },
              { t: "Webhook and Callback URLs", d: "Encode callback URLs that contain query parameters when passing them as values in other query strings or configuration fields." },
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
          <h2 className="text-2xl font-bold tracking-tight">URL Encoder/Decoder Tips</h2>
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
