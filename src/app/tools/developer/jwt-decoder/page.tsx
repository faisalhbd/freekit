import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JwtDecoderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `JWT uses Base64URL encoding for its header and payload. If you need to encode or decode raw Base64 (not JWT-specific), use <a href="/tools/developer/base64-encoder" class="${LINK_CLASS}">our Base64 Encoder</a> which handles standard Base64, Base64URL, and UTF-8 correctly.` },
  { html: `After decoding a JWT, if you want to validate the JSON structure of the header or payload separately, copy the decoded JSON and paste it into <a href="/tools/developer/json-validator" class="${LINK_CLASS}">our JSON Validator</a> to check for syntax errors and view structural statistics.` },
  { html: `To beautify the decoded JWT payload with proper indentation and syntax highlighting outside the decoder, paste it into <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> which offers color-coded output, minification, and various indentation options.` },
  { html: `JWT signatures are created using hash functions like SHA-256. If you are curious about how hashing works or need to generate hashes, try <a href="/tools/developer/hash-generator" class="${LINK_CLASS}">our Hash Generator</a> to create MD5, SHA-1, SHA-256, and SHA-512 hashes from any text input.` },
  { html: "Enable the auto-decode toggle for instant feedback as you paste tokens. This is especially useful when debugging authentication flows where you are rapidly inspecting multiple tokens from browser DevTools or API logs." },
  { html: "The claim reference table at the bottom highlights which standard JWT claims (iss, sub, aud, exp, nbf, iat, jti) are present in your token, so you can quickly verify that all required claims are included." },
  { html: "Remember that anyone who intercepts a JWT can decode its header and payload — the security comes from the signature, not from hiding the data. Never store passwords, credit card numbers, or other sensitive data in JWT payloads." },
  { html: "If the token shows as expired, check your server's clock synchronization. Token expiration is based on Unix timestamps, so clock skew between the issuing server and verifying server can cause premature expiration errors." },
]

export default function JwtDecoderPage() {
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
        <section className="mt-8" aria-label="JWT Decoder">
          <JwtDecoderTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the JWT Decoder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your JWT token</span> — Copy the complete JWT string (including all three parts separated by dots) from your browser, API response, or authorization header, and paste it into the input textarea.</li>
            <li><span className="text-foreground font-medium">Decode the token</span> — Click the Decode JWT button, or enable the auto-decode toggle to decode tokens instantly as you paste them. The tool will split the token into its three components.</li>
            <li><span className="text-foreground font-medium">Inspect the header</span> — View the decoded header JSON showing the signing algorithm (alg) and token type (typ). Verify the algorithm matches what your application expects.</li>
            <li><span className="text-foreground font-medium">Review the payload</span> — Examine all claims in the payload. Standard claims like exp, iat, sub, and iss are highlighted with badges. Check the expiration status banner to see if the token is still valid.</li>
            <li><span className="text-foreground font-medium">Check the signature</span> — The signature portion is displayed, but remember that this tool does not verify the cryptographic signature. You need the signing key to verify it on your server.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instantly decode JWT tokens into header, payload, and signature components",
              "Syntax-highlighted JSON output for both header and payload sections",
              "Automatic expiration detection with clear Expired or Valid until status banner",
              "Issued at (iat) timestamp displayed in human-readable format",
              "Special JWT claims (iss, sub, aud, exp, nbf, iat, jti) highlighted with descriptive badges",
              "Complete claim reference table showing all standard JWT claims with descriptions",
              "Copy buttons for both header and payload JSON for quick reuse",
              "Auto-decode toggle for real-time decoding as you paste tokens",
              "Load sample JWT button to see a fully populated example token",
              "Clear error messages for invalid tokens — wrong structure, bad Base64, or invalid JSON",
              "100% client-side processing — no tokens or data are ever sent to a server",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding JSON Web Tokens</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "JWT Structure: Header.Payload.Signature",
                d: "A JWT is composed of three Base64URL-encoded parts separated by dots. The header specifies the token type and signing algorithm. The payload contains the claims — statements about an entity and additional metadata. The signature is created by combining the encoded header, encoded payload, and a secret key using the algorithm specified in the header. This three-part structure makes JWTs self-contained, compact, and URL-safe for transmission in HTTP headers and query parameters.",
              },
              {
                t: "Base64URL vs Standard Base64",
                d: "JWT uses a Base64URL variant instead of standard Base64. The key differences: the + character is replaced with - (hyphen), the / character is replaced with _ (underscore), and the = padding characters are omitted. These substitutions make the encoded data safe for use in URLs, HTTP headers, and HTML attributes without requiring additional percent-encoding. Our decoder automatically handles this conversion, including restoring padding when needed for proper decoding.",
              },
              {
                t: "Signed vs Encrypted Tokens (JWS vs JWE)",
                d: "A standard JWT (technically a JWS — JSON Web Signature) is signed but not encrypted. Anyone can decode and read its contents. The signature only ensures the data has not been tampered with. If you need to hide the token contents, you need a JWE (JSON Web Encryption), which encrypts the entire payload. Most authentication systems use JWS because the payload contains non-sensitive data like user IDs, roles, and timestamps. Our tool decodes JWS tokens — if you paste a JWE, you will see encrypted data in the payload.",
              },
              {
                t: "Token Expiration and Time Claims",
                d: "JWT uses Unix timestamps (seconds since January 1, 1970, UTC) for time-based claims. The exp claim defines when the token expires, iat records when it was issued, and nbf specifies the earliest time it can be used. Our decoder converts these timestamps to human-readable dates and checks the exp claim against the current time to show whether the token is still valid. Proper expiration handling is critical for security — tokens without exp claims remain valid indefinitely.",
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
              { t: "Debug Authentication Flows", d: "Inspect tokens from your auth provider (Auth0, Firebase, Cognito) to verify claims, check expiration, and understand what data is being transmitted to your frontend." },
              { t: "API Integration Testing", d: "Decode tokens from third-party APIs to understand the payload structure, required claims, and token format before writing your integration code." },
              { t: "Troubleshoot Token Errors", d: "When your API returns 401 Unauthorized, decode the token to check if it is expired, if the algorithm matches your server configuration, or if required claims are missing." },
              { t: "Verify Token Claims", d: "Ensure that tokens contain the correct issuer (iss), audience (aud), and subject (sub) claims before using them in your application logic." },
              { t: "Security Auditing", d: "Review tokens to ensure they do not contain sensitive data, use appropriate algorithms (not 'none'), and have reasonable expiration times." },
              { t: "Learn JWT Structure", d: "Use the sample token and claim reference table to understand how JWTs work, what each claim means, and how the three-part structure fits together." },
              { t: "Browser DevTools Inspection", d: "Copy tokens from browser DevTools Network tab or Application/Local Storage and paste them here for quick inspection without writing code." },
              { t: "Documentation and Team Collaboration", d: "Copy the decoded JSON to share with your team when documenting API authentication requirements or debugging token-related issues together." },
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
          <h2 className="text-2xl font-bold tracking-tight">JWT Decoder Tips</h2>
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
