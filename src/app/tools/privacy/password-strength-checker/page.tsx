import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PasswordStrengthCheckerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PasswordStrengthCheckerPage() {
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
        <section className="mt-8" aria-label="Password Strength Checker Tool">
          <PasswordStrengthCheckerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Password Strength Checker</h2>
          <p className="text-muted-foreground">
            Check your password strength in one simple step:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Type your password</span> — Enter any password in the input field. Use the eye icon to toggle visibility.
            </li>
            <li>
              <span className="text-foreground font-medium">Review your score</span> — See your 0–100 score with a color-coded strength meter (red to green).
            </li>
            <li>
              <span className="text-foreground font-medium">Check the detailed breakdown</span> — Each criterion shows points earned and what's missing.
            </li>
            <li>
              <span className="text-foreground font-medium">Read the crack time estimate</span> — See how long it would take to crack your password.
            </li>
            <li>
              <span className="text-foreground font-medium">Follow the suggestions</span> — Improve your password based on specific, actionable recommendations.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time analysis as you type",
              "6-criterion scoring system (0–100 points)",
              "Color-coded strength meter (Very Weak to Very Strong)",
              "Detailed checklist with points per criterion",
              "Common password detection (50+ known weak passwords)",
              "Sequential and repeated character detection",
              "Estimated crack time based on GPU attack speed",
              "Specific improvement suggestions",
              "Show/hide password toggle",
              "100% client-side — password never leaves your browser",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Scoring System */}
        <section className="mt-16 space-y-4" aria-label="Scoring system">
          <h2 className="text-2xl font-bold tracking-tight">How the Scoring Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Length (0–25 pts)</h3>
              <p className="text-sm text-muted-foreground">
                &lt;8 chars: 0 pts | 8–11 chars: 10 pts | 12–15 chars: 18 pts | 16+ chars: 25 pts. Length is the most important factor for password security.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Uppercase (0–15 pts)</h3>
              <p className="text-sm text-muted-foreground">
                No uppercase: 0 pts | 1 uppercase: 8 pts | 2+ uppercase: 15 pts. Mixing case increases the character set and makes brute-force attacks harder.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Lowercase (0–15 pts)</h3>
              <p className="text-sm text-muted-foreground">
                No lowercase: 0 pts | 1 lowercase: 8 pts | 2+ lowercase: 15 pts. Most passwords should include lowercase letters as a base.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Numbers (0–15 pts)</h3>
              <p className="text-sm text-muted-foreground">
                No numbers: 0 pts | 1 number: 8 pts | 2+ numbers: 15 pts. Adding numbers expands the possible character combinations significantly.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Special Characters (0–15 pts)</h3>
              <p className="text-sm text-muted-foreground">
                No specials: 0 pts | 1 special: 8 pts | 2+ specials: 15 pts. Symbols like !@#$% add the most value per character to crack resistance.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">No Common Patterns (0–15 pts)</h3>
              <p className="text-sm text-muted-foreground">
                Common password: 0 pts | Sequential/repeated: 3–5 pts | No patterns: 15 pts. Avoids passwords like &quot;password&quot;, &quot;123456&quot;, &quot;aaa111&quot;.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Strength Levels */}
        <section className="mt-16 space-y-4" aria-label="Strength levels">
          <h2 className="text-2xl font-bold tracking-tight">Strength Levels Explained</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { level: "Very Weak (0–20)", color: "text-red-600", desc: "Extremely vulnerable. Can be cracked in seconds. Not suitable for any account." },
              { level: "Weak (21–40)", color: "text-orange-600", desc: "Easily crackable within minutes to hours. Only acceptable for throwaway accounts." },
              { level: "Fair (41–60)", color: "text-yellow-600", desc: "Moderate protection. May resist casual attacks but falls to determined attackers. Needs improvement." },
              { level: "Strong (61–80)", color: "text-lime-600", desc: "Good resistance against most attacks. Suitable for most accounts when combined with 2FA." },
              { level: "Very Strong (81–100)", color: "text-green-600", desc: "Excellent security. Resistant even against well-resourced attackers. Ideal for critical accounts." },
            ].map((item) => (
              <div key={item.level} className="rounded-lg border border-border bg-card p-4">
                <h3 className={`text-sm font-semibold ${item.color}`}>{item.level}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Password Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Password Security Best Practices</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Use Unique Passwords", desc: "Never reuse a password across multiple accounts. If one service is breached, all accounts with the same password are compromised." },
              { title: "Enable Two-Factor Authentication", desc: "Add 2FA to all important accounts. Even if your password is stolen, the attacker cannot access your account without the second factor." },
              { title: "Use a Password Manager", desc: "Store passwords in an encrypted password manager. You only need to remember one strong master password." },
              { title: "Check for Breaches", desc: "Use services like Have I Been Pwned to check if your email or passwords have appeared in known data breaches." },
              { title: "Create Passphrases", desc: "Combine 4–6 random words into a memorable phrase. 'correct-horse-battery-staple' is stronger and easier to remember than 'P@ssw0rd!'." },
              { title: "Avoid Personal Info", desc: "Never use birthdays, names, pet names, or addresses in passwords. This information is easily found on social media." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Common Password Mistakes */}
        <section className="mt-16 space-y-4" aria-label="Common mistakes">
          <h2 className="text-2xl font-bold tracking-tight">Common Password Mistakes to Avoid</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { mistake: 'Using password or 123456', fix: 'These are the first passwords attackers try. Always use something unique and unpredictable.' },
              { mistake: "Simple substitutions", fix: "Replacing 'a' with '@' or 'e' with '3' (p@ssw0rd) doesn't add real security. Attackers know these tricks." },
              { mistake: "Keyboard patterns", fix: "Avoid qwerty, asdfgh, zxcvbn, and similar keyboard walk patterns. These are checked first in dictionary attacks." },
              { mistake: "Adding a single number", fix: "'password1' is barely stronger than 'password'. Attackers try appending 1-99 automatically." },
              { mistake: "Using personal info", fix: "Your birthday, anniversary, pet name, or address can be found on social media and are commonly targeted." },
              { mistake: "Reusing passwords", fix: "One breach exposes all your accounts. Use a password manager to maintain unique passwords everywhere." },
            ].map((item) => (
              <div key={item.mistake} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">{item.mistake}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.fix}</p>
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
