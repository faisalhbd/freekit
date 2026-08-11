import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RegexTesterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `After testing a regex pattern, use <a href="/tools/text/text-replacer" class="${LINK_CLASS}">our Text Replacer</a> to perform bulk find-and-replace operations across large blocks of text using the patterns you have validated.` },
  { html: `If you are validating JSON data and need to extract specific fields using regex, use <a href="/tools/developer/json-validator" class="${LINK_CLASS}">our JSON Validator</a> to first ensure your JSON is valid before applying patterns to it.` },
  { html: `When you need to encode or decode strings that contain regex-special characters, use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> to safely transmit them without worrying about escaping.` },
  { html: `If your test string contains HTML entities and you want to test regex against the decoded text, use <a href="/tools/developer/html-encoder" class="${LINK_CLASS}">our HTML Entity Encoder</a> to decode entities first, then paste the result here.` },
  { html: "When testing patterns for validation (like email or phone), always test both valid and invalid inputs. The quick-insert buttons provide common patterns, but you should verify edge cases like empty strings, missing parts, and malformed formats." },
  { html: "Use the replacement preview feature to validate your substitution logic before applying it in code. Special tokens like $1, $2, $& (entire match), and $$ (literal dollar) are all supported and previewed in real time." },
  { html: "Toggle the 'm' (multiline) flag when your test string contains multiple lines and you want ^ and $ to match line starts/ends instead of the entire string boundary." },
  { html: "The cheat sheet below the tool provides a quick reference for character classes, quantifiers, anchors, groups, lookarounds, and special characters. Keep it open while building complex patterns." },
]

export default function RegexTesterPage() {
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
        <section className="mt-8" aria-label="Regex Tester">
          <RegexTesterTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Regex Tester</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your regex pattern</span> — Type or paste a regular expression pattern in the input field. You can also click one of the quick-insert buttons (Email, URL, Phone, IPv4, Date, Hex Color) to load a common pattern instantly.</li>
            <li><span className="text-foreground font-medium">Select your flags</span> — Toggle the regex flags you need: <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">g</code> for global (all matches), <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">i</code> for case-insensitive, <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">m</code> for multiline, <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">s</code> for dotall, and <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">u</code> for Unicode.</li>
            <li><span className="text-foreground font-medium">Enter your test string</span> — Paste or type the text you want to test the regex against. Matches are highlighted in real time as you type both the pattern and the test string.</li>
            <li><span className="text-foreground font-medium">Review match details</span> — The Match Details panel shows each match with its index position, length, and matched value. If your pattern uses capture groups, the Capture Groups panel displays each group's value for every match.</li>
            <li><span className="text-foreground font-medium">Preview replacements</span> — Enter a replacement string using $1, $2, $&, or $$ tokens to see a live preview of what the text looks like after replacement. This is invaluable for building substitution logic.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time match highlighting with color-coded markers in the test string",
              "Detailed match panel showing index, length, and value for every match found",
              "Capture groups display with support for both numbered and named groups",
              "Live replacement preview using $1, $2, $&, $$, and $<name> tokens",
              "Five regex flags with toggle buttons: global, case-insensitive, multiline, dotall, Unicode",
              "Six common pattern quick-insert buttons: Email, URL, Phone, IPv4, Date, Hex Color",
              "Collapsible regex cheat sheet covering character classes, quantifiers, anchors, groups, lookarounds, and special characters",
              "Instant error display for invalid regex patterns with the exact JavaScript error message",
              "Copy Regex button copies the full pattern with flags (e.g., /\d+/gi) to clipboard",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Regular Expressions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What Are Regular Expressions?",
                d: "Regular expressions (regex) are a powerful text-matching language used to search, validate, extract, and transform strings. Built from a combination of literal characters and special metacharacters, regex patterns can describe everything from simple word matches to complex multi-part validation rules. They are supported by every major programming language, most text editors, command-line tools like grep and sed, and database query engines.",
              },
              {
                t: "Greedy vs. Lazy Matching",
                d: "Quantifiers like *, +, and {n,m} are greedy by default, meaning they match as much text as possible. For example, <.*> matches from the first < to the last > in a string. Adding a ? after a quantifier makes it lazy (non-greedy), matching as little as possible. <.*?> matches from < to the very next >. Understanding this distinction is critical for correctly parsing HTML, log files, and structured text with repeating delimiters.",
              },
              {
                t: "Capture Groups and Backreferences",
                d: "Parentheses in a regex create capture groups that remember the matched text. Groups are numbered from left to right: (a)(b(c)) has three groups. Named groups (?<name>...) make patterns more readable. In replacement strings, $1, $2, etc. refer to captured values, and $& refers to the entire match. Non-capturing groups (?:...) group without capturing, improving performance when you only need grouping for alternation or quantifiers.",
              },
              {
                t: "Lookahead and Lookbehind Assertions",
                d: "Lookahead (?=...) and lookbehind (?<=...) are zero-width assertions that check for patterns without including them in the match. Positive lookahead asserts what follows; negative lookahead (?!...) asserts what does NOT follow. Lookbehind works similarly for what precedes the current position. These are essential for context-aware matching like finding words not followed by specific suffixes, or numbers preceded by currency symbols.",
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
              { t: "Form Input Validation", d: "Build and test regex patterns for email, phone number, ZIP code, credit card, username, and other form field validation before implementing them in your application's frontend or backend." },
              { t: "Log File Analysis", d: "Extract timestamps, IP addresses, error codes, request paths, and other structured data from server logs, application logs, and audit trails using targeted regex patterns." },
              { t: "Data Extraction and Scraping", d: "Parse HTML, XML, CSV, or plain text to extract specific data fields like product prices, dates, URLs, or user information using capture groups and lookarounds." },
              { t: "Search and Replace in Code", d: "Test bulk find-and-replace patterns for code refactoring, renaming variables across files, updating import paths, or migrating API endpoints." },
              { t: "URL and Path Routing", d: "Design and test regex patterns for URL routing in web frameworks, REST API path matching, and query parameter extraction." },
              { t: "Text Cleanup and Normalization", d: "Build patterns to remove extra whitespace, fix inconsistent capitalization, strip HTML tags, normalize date formats, or clean up imported data before processing." },
              { t: "Password Policy Testing", d: "Verify regex patterns that enforce password complexity requirements like minimum length, required character types (uppercase, lowercase, digits, special characters), and forbidden patterns." },
              { t: "Learning and Teaching Regex", d: "Students and educators can use the real-time highlighting, match details, and cheat sheet to learn regex concepts interactively. Experiment with patterns and immediately see what they match and why." },
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
          <h2 className="text-2xl font-bold tracking-tight">Regex Tester Tips</h2>
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
