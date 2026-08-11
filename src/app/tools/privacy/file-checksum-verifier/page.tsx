import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { FileChecksumVerifierTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function FileChecksumVerifierPage() {
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
        <section className="mt-8" aria-label="File Checksum Verifier Tool">
          <FileChecksumVerifierTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Verify File Checksums</h2>
          <p className="text-muted-foreground">
            Calculate and verify file hashes in a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your file</span> — Drag and drop or click to browse for any file.
            </li>
            <li>
              <span className="text-foreground font-medium">View the calculated hashes</span> — All four hash algorithms are computed simultaneously.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy any hash</span> — Click the copy button next to any hash to copy it to your clipboard.
            </li>
            <li>
              <span className="text-foreground font-medium">Verify against a known value</span> — Paste a known hash in the verify field to check if it matches.
            </li>
            <li>
              <span className="text-foreground font-medium">Check the result</span> — A green match or red mismatch indicator confirms the result.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "MD5, SHA-1, SHA-256, SHA-512 algorithms",
              "Inline MD5 implementation (no external library)",
              "SHA hashes via Web Crypto API",
              "Individual copy buttons for each hash",
              "Hash verification with match/mismatch indicator",
              "File info: name, size, type, last modified",
              "Drag-and-drop file upload",
              "Parallel hash computation for speed",
              "Case-insensitive verification",
              "100% client-side — no server uploads",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Hash Algorithms Explained */}
        <section className="mt-16 space-y-4" aria-label="Hash algorithms">
          <h2 className="text-2xl font-bold tracking-tight">Hash Algorithms Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { algo: "MD5", bits: 128, hex: 32, status: "Legacy", desc: "Fast but has known collision vulnerabilities. Suitable for non-security integrity checks (e.g., detecting file corruption) but not for security purposes." },
              { algo: "SHA-1", bits: 160, hex: 40, status: "Deprecated", desc: "Once widely used, now deprecated due to practical collision attacks. Still found in legacy systems. Not recommended for new applications." },
              { algo: "SHA-256", bits: 256, hex: 64, status: "Recommended", desc: "The current gold standard for file verification. Secure against collision attacks and widely used for software integrity verification, certificates, and blockchain." },
              { algo: "SHA-512", bits: 512, hex: 128, status: "High Security", desc: "Provides even more bits of security than SHA-256. Used in high-assurance environments, government applications, and when maximum security margin is needed." },
            ].map((item) => (
              <div key={item.algo} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.algo}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === "Recommended" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    item.status === "High Security" ? "bg-primary/10 text-primary" :
                    "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.bits}-bit · {item.hex}-character hex string</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Software Download Verification", desc: "After downloading software, compare its hash against the one published on the official website to ensure the download wasn't corrupted or tampered with." },
              { title: "Data Transfer Integrity", desc: "Calculate hashes before and after transferring files between systems to confirm no data was corrupted during the transfer." },
              { title: "Backup Verification", desc: "Compare hashes of original files against backup copies to verify your backups are intact and restorable." },
              { title: "Duplicate File Detection", desc: "Files with identical hashes are almost certainly identical. Use hashes to quickly find duplicate files in large collections." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. When to Use Each Algorithm */}
        <section className="mt-16 space-y-4" aria-label="Algorithm selection guide">
          <h2 className="text-2xl font-bold tracking-tight">When to Use Each Algorithm</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">Scenario</th>
                  <th className="text-center p-4 font-medium">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Verifying a software download", "SHA-256"],
                  ["Checking file corruption after transfer", "Any (SHA-256 preferred)"],
                  ["Comparing against a legacy system", "MD5 or SHA-1"],
                  ["Government or compliance requirements", "SHA-256 or SHA-512"],
                  ["Quick duplicate detection (non-security)", "MD5 (fastest)"],
                ].map(([scenario, algo]) => (
                  <tr key={scenario as string} className="border-b border-border last:border-0">
                    <td className="p-4 text-muted-foreground">{scenario as string}</td>
                    <td className="p-4 text-center font-mono text-xs">{algo as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Security Notes */}
        <section className="mt-16 space-y-4" aria-label="Security notes">
          <h2 className="text-2xl font-bold tracking-tight">Security Notes</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Checksums are not encryption", desc: "A hash is a one-way function. You cannot reverse a hash to recover the original file. For protecting file contents, use encryption instead." },
              { label: "Collision resistance varies", desc: "MD5 and SHA-1 have known collision attacks. Two different files can produce the same MD5 hash. Use SHA-256+ for security-critical applications." },
              { label: "Hashes don't prove authenticity", desc: "A matching hash proves integrity but not authenticity. An attacker who controls the download and the hash can serve a malicious file with a matching hash. Verify hashes through a separate, trusted channel." },
              { label: "Consider checksum file formats", desc: "Many projects provide checksums in .sha256 or .sha256sum files. You can paste the expected hash from these files directly into the verify field." },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
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
