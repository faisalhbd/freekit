import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HtmlEncoderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `When constructing URLs that contain special characters, first HTML-encode any text content here, then use <a href="/tools/developer/url-encoder" class="${LINK_CLASS}">our URL Encoder</a> to percent-encode the result for safe transmission in web addresses and query parameters.` },
  { html: `If you need to safely transmit HTML-encoded content in JSON payloads, email bodies, or configuration files, use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> to convert the encoded HTML into a plain ASCII representation that cannot be misinterpreted by parsers.` },
  { html: `When debugging API responses that return HTML-entity-encoded strings within JSON, first decode the HTML entities with this tool, then paste the result into <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> to validate and beautify the surrounding JSON structure.` },
  { html: "The ampersand (&) must always be encoded first when doing HTML entity encoding. If you encode other characters before &, their resulting entities (which start with &) would get double-encoded. Our tool handles this ordering automatically." },
  { html: "Enable auto-encode for real-time feedback as you type. This is especially useful when preparing user-generated content for safe HTML rendering, letting you verify that all special characters are properly escaped before inserting them into your markup." },
  { html: "The Swap button moves the output to the input and flips between encode and decode modes — perfect for round-trip testing to verify that your encoded strings decode back to the original text without data loss." },
  { html: "Remember that HTML entity encoding only handles the five critical characters (&, <, >, \", '). It does not encode non-ASCII characters like emojis or accented letters, which are safely handled by UTF-8 encoding in modern HTML5 documents." },
  { html: "The reference table below the tool shows 20 common HTML entities with their named references. Use it as a quick lookup when you need to manually write or verify entity references in your HTML source code." },
]

export default function HtmlEncoderPage() {
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
        <section className="mt-8" aria-label="HTML Entity Encoder/Decoder">
          <HtmlEncoderTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the HTML Entity Encoder/Decoder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Choose your mode</span> — Select Encode to convert special characters to HTML entities, or Decode to convert HTML entities back to readable characters. Click the mode buttons in the toolbar or use the dedicated Encode/Decode action buttons.</li>
            <li><span className="text-foreground font-medium">Enter your input</span> — Type or paste your text into the input textarea. For encoding, enter text that contains special characters like angle brackets, ampersands, quotes, or other symbols. For decoding, paste a string containing HTML entities like &amp;amp;, &amp;lt;, or &amp;#039;.</li>
            <li><span className="text-foreground font-medium">Encode or Decode</span> — Click the Encode or Decode button to process your input. Alternatively, enable the auto-encode toggle for real-time processing as you type. The result appears instantly in the output panel on the right.</li>
            <li><span className="text-foreground font-medium">Review the stats</span> — The stats bar shows input length, output length, and the number of entities converted or decoded. Use this to verify that all expected characters were properly processed.</li>
            <li><span className="text-foreground font-medium">Copy or Swap</span> — Click Copy Output to copy the result to your clipboard. Use the Swap button to move the output back to input and flip between encode/decode modes, useful for round-trip verification.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Encode mode converts &, <, >, \", and ' to their named HTML entity references",
              "Decode mode handles named entities (&amp;), decimal numeric (&#039;), and hexadecimal numeric (&#x27;) references",
              "Correct encoding order: ampersand (&) is always encoded first to prevent double-encoding",
              "Auto-encode toggle for instant real-time processing as you type",
              "Reference table of 20 common HTML entities with character, entity code, and description",
              "Stats bar showing input length, output length, and count of entities converted or decoded",
              "Swap button to quickly move output to input and flip between encode/decode modes",
              "Browser-native decoding using DOM parsing for accurate, standard-compliant results",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding HTML Entities</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What Are HTML Entities?",
                d: "HTML entities are a way to represent characters that have special meaning in HTML or that cannot be easily typed on a keyboard. They begin with an ampersand (&) and end with a semicolon (;). There are three types: named entities like &amp; and &lt; which use descriptive names, decimal numeric entities like &#60; which use the Unicode code point in decimal, and hexadecimal numeric entities like &#x3C; which use the code point in hex. The HTML5 specification defines around 250 named entities covering common symbols, accented characters, and mathematical operators.",
              },
              {
                t: "XSS Prevention with Entity Encoding",
                d: "Cross-Site Scripting (XSS) is one of the most common web security vulnerabilities. It occurs when untrusted user input is rendered as HTML without proper escaping. By encoding the five critical characters — &amp; &lt; &gt; \" ' — you ensure that the browser treats the content as plain text rather than executable markup. This prevents attackers from injecting script tags, event handlers like onclick, or other malicious HTML. While modern frameworks handle this automatically, manual entity encoding is essential for raw HTML contexts, email templates, and server-rendered pages.",
              },
              {
                t: "Named vs Numeric Entities",
                d: "Named entities (like &amp;, &lt;, &copy;) are human-readable and preferred for common characters because they make HTML source code easier to understand. Numeric entities come in two forms: decimal (&#38; for &) and hexadecimal (&#x26; for &). While named entities only exist for about 250 characters, numeric entities can represent any of the 149,000+ characters in the Unicode standard, including emojis (&#128522; for 😊), rare symbols, and characters from any world language. For the five essential HTML-unsafe characters, named entities are universally supported and preferred.",
              },
              {
                t: "Encoding Order Matters",
                d: "When encoding text to HTML entities, the ampersand (&amp;) must always be processed first. This is because every entity reference starts with &amp; — so if you encode &lt; to &amp;lt; first, then encode &amp;, the &amp; in &amp;lt; would itself become &amp;amp;lt;, which is incorrect. The correct sequence is: encode all &amp; to &amp;amp; first, then encode &lt;, &gt;, &quot;, and '. Our tool follows this order automatically. During decoding, no special ordering is needed because the browser's HTML parser handles all entity types simultaneously and correctly.",
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
              { t: "Preventing XSS in User Content", d: "Encode user-generated comments, forum posts, and profile information before rendering in HTML to prevent malicious script injection and protect your users from cross-site scripting attacks." },
              { t: "Displaying Code Snippets", d: "When showing HTML, CSS, or JavaScript code examples on a web page, entity-encode the angle brackets and other special characters so the browser displays the code as text rather than interpreting it as markup." },
              { t: "Email Template Development", d: "Encode special characters in HTML email templates where template engines may not provide automatic escaping, ensuring content renders correctly across different email clients." },
              { t: "RSS and XML Feed Generation", d: "XML parsers are strict about special characters — encode &, <, and > in RSS feed content, titles, and descriptions to produce valid XML that passes feed validator checks." },
              { t: "Debugging Encoded Content", d: "Decode HTML entities found in API responses, scraped web content, or database fields to understand the actual text content being stored or transmitted." },
              { t: "Server-Side HTML Construction", d: "When building HTML strings on the server without a templating engine, encode all dynamic values before concatenation to prevent injection vulnerabilities in server-rendered pages." },
              { t: "Data Migration and Cleanup", d: "Decode or re-encode HTML entities when migrating content between CMS platforms that use different encoding conventions or storage formats." },
              { t: "Security Auditing", d: "Verify that security-sensitive output has been properly encoded by decoding it and checking for unexpected raw HTML tags or script content that should have been escaped." },
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
          <h2 className="text-2xl font-bold tracking-tight">HTML Entity Encoder/Decoder Tips</h2>
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
