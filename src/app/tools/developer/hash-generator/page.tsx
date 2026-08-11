import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HashGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `If you need to encode text before hashing for API authentication or data transmission, use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> to convert your input to Base64 first, then hash the encoded string.` },
  { html: `When inspecting JWT tokens, the header and payload sections are Base64-encoded JSON. Use <a href="/tools/developer/jwt-decoder" class="${LINK_CLASS}">our JWT Decoder</a> to decode and inspect the claims, then hash specific fields for verification.` },
  { html: `If your hash input is JSON data, paste it into <a href="/tools/developer/json-validator" class="${LINK_CLASS}">our JSON Validator</a> first to ensure the structure is valid before computing the hash for integrity checks.` },
  { html: "Enable the auto-hash toggle for instant feedback as you type. This is especially useful when comparing hashes of similar strings — you can see how a single character change produces an entirely different hash due to the avalanche effect." },
  { html: "Use the uppercase toggle when working with systems or documentation that expect uppercase hex strings. The underlying hash value is identical — only the letter casing changes (a-f vs A-F)." },
  { html: "SHA-256 is the industry standard for most modern applications including TLS certificates, blockchain, code signing, and API authentication. It provides an excellent balance of security and performance." },
  { html: "MD5 and SHA-1 are still useful for non-security purposes like file deduplication, cache keys, and quick checksums. They are faster than SHA-256 and produce shorter outputs, but should never be used for security-critical applications." },
  { html: "You can verify downloaded files by comparing their hash with the checksum published by the developer. Paste the file contents here (or use the hash in your terminal with shasum or md5sum) and compare the results." },
]

export default function HashGeneratorPage() {
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
        <section className="mt-8" aria-label="Hash Generator">
          <HashGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Hash Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your text</span> — Type or paste any text into the input textarea. This can be plain text, JSON, XML, configuration strings, or any content you want to generate a hash for. Unicode characters, emojis, and multi-byte text are fully supported.</li>
            <li><span className="text-foreground font-medium">Choose your output format</span> — Use the uppercase toggle to switch between lowercase and uppercase hexadecimal output. Lowercase is the default for most standards, while uppercase is common in documentation and certain APIs.</li>
            <li><span className="text-foreground font-medium">Enable auto-hash (optional)</span> — Turn on the auto-hash toggle to compute all hashes in real time as you type. If disabled, click the Generate Hashes button to compute on demand.</li>
            <li><span className="text-foreground font-medium">View all hash results</span> — All five algorithms (MD5, SHA-1, SHA-256, SHA-384, SHA-512) are computed simultaneously. Each result is displayed in its own card showing the algorithm name, bit length, character count, and the hash value.</li>
            <li><span className="text-foreground font-medium">Copy individual hashes</span> — Click the Copy button on any result card to copy that specific hash value to your clipboard. The button briefly shows a checkmark confirmation when copied successfully.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Five hash algorithms computed simultaneously: MD5, SHA-1, SHA-256, SHA-384, and SHA-512",
              "Web Crypto API for SHA algorithms — uses the same native cryptographic library as your browser's TLS implementation",
              "Inline MD5 implementation for compatibility — MD5 is not supported by Web Crypto API",
              "Full UTF-8 support including Unicode, emojis, CJK characters, and multi-byte text",
              "Auto-hash toggle for real-time computation as you type with no button clicks needed",
              "Uppercase/lowercase output toggle to match the format expected by your target system",
              "Individual copy buttons for each hash result with visual confirmation feedback",
              "Bit length and character count badges on each result for quick reference",
              "Color-coded algorithm labels for fast visual identification of each hash type",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Cryptographic Hashing</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What Makes a Good Hash Function?",
                d: "A cryptographic hash function must satisfy four properties: preimage resistance (cannot reverse a hash to find the original input), second preimage resistance (cannot find a different input with the same hash), collision resistance (cannot find any two inputs with the same hash), and the avalanche effect (a tiny input change produces a completely different output). SHA-256 and SHA-512 satisfy all four properties with strong security margins. MD5 and SHA-1 fail the collision resistance requirement due to known attacks.",
              },
              {
                t: "How Web Crypto API Works",
                d: "The Web Crypto API (crypto.subtle.digest) is a browser-native interface to the operating system's cryptographic library. When you compute SHA-256 in the browser, it uses the same optimized C/C++ code that powers TLS connections and certificate verification. This makes it significantly faster and more reliable than JavaScript implementations. The API is asynchronous because some operations may involve hardware acceleration or secure enclaves. Our tool uses this API for all SHA variants and supplements it with an inline MD5 implementation since the Web Crypto API does not support MD5.",
              },
              {
                t: "Hexadecimal Representation",
                d: "Hash functions produce raw binary data (sequences of bytes), which is then converted to hexadecimal for human readability. Each byte (8 bits) becomes two hex characters (4 bits each). This is why a 128-bit MD5 hash produces 32 hex characters, a 256-bit SHA-256 hash produces 64 hex characters, and a 512-bit SHA-512 hash produces 128 hex characters. Hexadecimal uses the digits 0-9 and letters a-f (or A-F), and the case of the letters does not affect the underlying value.",
              },
              {
                t: "Hashing vs Encryption",
                d: "Hashing and encryption serve fundamentally different purposes. Encryption is a two-way operation: you encrypt with a key and decrypt with a key to recover the original data. Hashing is a one-way operation with no key — you cannot reverse a hash to recover the input. Encryption is for protecting data confidentiality (like HTTPS), while hashing is for verifying data integrity and authenticity (like checksums and digital signatures). Hashing is also used in password storage, but only with specialized algorithms like bcrypt that add salting and key stretching to resist brute-force attacks.",
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
              { t: "File Integrity Verification", d: "Compare the hash of a downloaded file against the checksum published by the developer to verify the file was not corrupted or tampered with during download." },
              { t: "Password Hashing (Demonstration)", d: "Understand how passwords are hashed before storage. Note: use bcrypt/scrypt/Argon2 for real password storage, not raw hashing. This tool demonstrates the hash computation step." },
              { t: "Digital Signatures", d: "Hash the content of a document or message, then encrypt the hash with a private key to create a digital signature that proves authenticity and integrity." },
              { t: "API Request Signing", d: "Many APIs (AWS, Stripe, etc.) require signing requests by hashing a canonical string with a secret key using HMAC, which builds on these hash algorithms." },
              { t: "Data Deduplication", d: "Use hashes as content identifiers to detect duplicate files, database records, or data blocks. Identical content produces identical hashes for fast comparison." },
              { t: "Blockchain and Cryptocurrency", d: "SHA-256 is the foundation of Bitcoin mining and transaction identification. Each block contains the SHA-256 hash of the previous block, creating an immutable chain." },
              { t: "Cache Key Generation", d: "Generate deterministic cache keys from request parameters, query strings, or data content. MD5 and SHA-1 work well for non-security cache scenarios." },
              { t: "Version Fingerprinting", d: "Hash source code, build artifacts, or configuration files to create unique version identifiers for reproducible builds and deployment verification." },
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
          <h2 className="text-2xl font-bold tracking-tight">Hash Generator Tips</h2>
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
