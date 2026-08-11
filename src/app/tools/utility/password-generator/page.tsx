import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PasswordGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PasswordGeneratorPage() {
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
        <section className="mt-8" aria-label="Password Generator Tool">
          <PasswordGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate a Strong Password Online</h2>
          <p className="text-muted-foreground">
            Creating a secure password takes just a few seconds with our generator:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Set your password length</span> — Use the slider to choose between 4 and 128 characters. We recommend at least 16 characters for strong security. Quick presets like &ldquo;Standard&rdquo; (12), &ldquo;Strong&rdquo; (16), and &ldquo;Ultra&rdquo; (24) are available.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose character types</span> — Enable uppercase letters, lowercase letters, numbers, and/or symbols. For maximum security, enable all four types to create the largest possible character pool.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust exclusion options</span> — Optionally exclude ambiguous characters (like I, l, 1, O, 0) that are hard to read, or enter custom characters you want to exclude.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Generate</span> — Your secure password is instantly generated using cryptographically secure random values. Set the count slider to generate up to 20 passwords at once.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy and use your password</span> — Click the copy button to copy the password to your clipboard, or download all passwords as a text file. The password strength meter shows how secure your configuration is.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Cryptographically secure — uses Web Crypto API (crypto.getRandomValues) for true randomness",
              "Adjustable length from 4 to 128 characters with quick presets (PIN, Short, Standard, Strong, Ultra, Max)",
              "Four character types: uppercase (A-Z), lowercase (a-z), numbers (0-9), and symbols (!@#$%...)",
              "Password strength meter with entropy calculation and estimated crack time",
              "Exclude ambiguous characters (I, l, 1, O, 0) for easier reading and typing",
              "Custom character exclusion — remove specific characters you don't want",
              "Bulk generation — generate up to 20 passwords at once",
              "One-click copy to clipboard and download all as .txt file",
              "Password history — recently generated passwords are saved for quick re-use",
              "100% browser-based — no server, no tracking, no data collection",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Why Use a Password Generator */}
        <section className="mt-16 space-y-4" aria-label="Why use a password generator">
          <h2 className="text-2xl font-bold tracking-tight">Why Use a Password Generator?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Human Passwords Are Weak</h3>
              <p className="text-sm text-muted-foreground">
                Humans tend to create passwords based on familiar words, names, dates, and patterns.
                These are easily guessable and vulnerable to dictionary attacks. A random password generator
                creates truly unpredictable strings that cannot be guessed or cracked in reasonable time.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Defend Against Brute Force</h3>
              <p className="text-sm text-muted-foreground">
                Brute force attacks try every possible character combination. A 16-character password
                with all character types has over 10<sup>30</sup> possible combinations — even the
                fastest supercomputers would need millions of years to crack it. Longer passwords are exponentially harder.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Unique Passwords for Every Account</h3>
              <p className="text-sm text-muted-foreground">
                Using the same password across multiple accounts is dangerous — if one gets breached,
                all your accounts are compromised. Generate a unique, strong password for every account
                and store them in a password manager for safe keeping.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Stay Ahead of Data Breaches</h3>
              <p className="text-sm text-muted-foreground">
                Billions of passwords are leaked in data breaches every year. Strong, random passwords
                remain secure even if hashed and leaked because they cannot be reversed through
                rainbow table attacks or dictionary-based cracking.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Email & Social Media", desc: "Generate strong, unique passwords for your email, social media, and messaging accounts to prevent unauthorized access." },
              { title: "Online Banking & Finance", desc: "Use maximum-length passwords (24+ chars) with all character types for banking, payment, and investment accounts." },
              { title: "WiFi & Router Passwords", desc: "Create long, random WiFi passwords that are immune to brute-force attacks. Use 20+ characters for best security." },
              { title: "Server & Admin Access", desc: "Generate high-entropy passwords for SSH keys, server logins, databases, and admin panels." },
              { title: "Developer Accounts", desc: "Secure your GitHub, AWS, cloud, and API keys with strong passwords to protect your code and infrastructure." },
              { title: "Password Manager Master", desc: "Some users generate a long, memorable-style master password and store it physically. Generate 30+ character passwords." },
              { title: "E-Commerce & Shopping", desc: "Protect your payment methods and purchase history with unique passwords for each shopping site." },
              { title: "Gaming & Streaming", desc: "Secure your gaming accounts and streaming services to prevent account takeover and unauthorized purchases." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Password Security Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Password Security Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use at least 16 characters for standard accounts and 24+ for sensitive accounts like banking and email.",
              "Always enable all four character types (uppercase, lowercase, numbers, symbols) to maximize the character pool and entropy.",
              "Never reuse a password across multiple accounts — generate a unique one for each service.",
              "Store passwords in a reputable password manager like Bitwarden, 1Password, or KeePass.",
              "Enable two-factor authentication (2FA) wherever possible as an extra layer of security beyond your password.",
              "Change passwords immediately if you suspect a breach or receive a notification from a service about unauthorized access.",
              "Avoid using personal information (names, birthdays, pet names) in passwords — these are easily found on social media.",
              "Use our UUID Generator to create unique identifiers for API keys, database records, and session tokens.",
              "Use our Hash Generator to create checksums and verify file integrity with MD5, SHA-256, and other algorithms.",
              "Check our Base64 Encoder for encoding sensitive data for safe transmission in URLs, emails, and configuration files.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (UUID Generator)/,
                      '<a href="/tools/utility/uuid-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Hash Generator)/,
                      '<a href="/tools/developer/hash-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Base64 Encoder)/,
                      '<a href="/tools/developer/base64-encoder" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
