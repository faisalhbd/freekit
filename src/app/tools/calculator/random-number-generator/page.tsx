import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RandomNumberGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RandomNumberGeneratorPage() {
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
        <section className="mt-8" aria-label="Random Number Generator Tool">
          <RandomNumberGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Random Number Generator</h2>
          <p className="text-muted-foreground">
            Generating random numbers is simple. Follow these steps to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Set your range</span> — Enter the minimum and maximum values for your desired range. You can use negative numbers, decimals, or any numeric value.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose how many</span> — Enter the number of random values you want (1 to 100).
            </li>
            <li>
              <span className="text-foreground font-medium">Configure options</span> — Toggle integer-only mode, unique-only mode, and ascending sort as needed.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Generate</span> — Your random numbers appear as styled cards. Copy them all with one click.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Cryptographically secure randomness using the Web Crypto API",
              "Custom min/max range — supports negative numbers and decimals",
              "Generate 1 to 100 random numbers at once",
              "Integer-only mode for whole numbers or decimal mode for precision",
              "Unique-only mode ensures no duplicate results",
              "Optional ascending sort for ordered output",
              "Copy all results to clipboard with a single click",
              "Generation history — last 5 results stored locally in the session",
              "Large, styled number cards for easy reading",
              "Fully responsive design — works on mobile, tablet, and desktop",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. How Random Number Generation Works */}
        <section className="mt-16 space-y-4" aria-label="How it works">
          <h2 className="text-2xl font-bold tracking-tight">How Random Number Generation Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Web Crypto API</h3>
              <p className="text-sm text-muted-foreground">
                This tool uses <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">crypto.getRandomValues()</code> which provides cryptographically secure random numbers. This is the same source your browser uses for TLS/SSL encryption.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Integer Generation</h3>
              <p className="text-sm text-muted-foreground">
                For integers, a random 32-bit value is scaled to your range and floored. Every integer in the range has an equal probability of being selected, ensuring uniform distribution.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Decimal Generation</h3>
              <p className="text-sm text-muted-foreground">
                For decimals, the same cryptographic source is used but the result is scaled to provide floating-point values with up to 10 decimal places of precision across your specified range.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Unique Numbers</h3>
              <p className="text-sm text-muted-foreground">
                When unique mode is on, a <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Set</code> tracks previously generated values. Each new number is checked against the set before being added to results.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Sorting</h3>
              <p className="text-sm text-muted-foreground">
                When sort is enabled, the raw generated numbers are sorted in ascending order after generation. The original random sequence is preserved in the generation history for reference.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Zero Server Contact</h3>
              <p className="text-sm text-muted-foreground">
                All computation happens in your browser. No API calls, no network requests, no data transmitted. The Web Crypto API is a browser-native API that requires no internet connection.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Giveaways and Raffles", desc: "Pick a random winner from a list of participants. Set the range to match your entry numbers and generate one unique result." },
              { title: "Dice and Board Games", desc: "Replace physical dice by generating a number between 1 and 6 (or any other die size). Generate multiple dice rolls at once." },
              { title: "Random Sampling", desc: "Select random samples from a population for surveys, research, or quality control testing." },
              { title: "Team Assignment", desc: "Randomly assign people to groups or teams. Generate unique numbers and use them as group assignments." },
              { title: "Software Testing", desc: "Generate random test data, IDs, or values for unit tests and fuzzing. Generate multiple values at once for batch testing." },
              { title: "Classroom Activities", desc: "Randomly call on students, pick discussion topics, or create random orderings for presentations." },
              { title: "Fitness Challenges", desc: "Generate random numbers of reps, sets, or exercises for varied workout routines." },
              { title: "Simulations and Modeling", desc: "Use random numbers to simulate probabilistic events, Monte Carlo methods, or stochastic processes." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using the Random Number Generator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "For giveaways, always enable 'Unique Only' if generating multiple winners — you don't want the same number picked twice.",
              "Need a random password or token instead? Try our <a href=\"/tools/utility/password-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Password Generator</a> for secure, random strings.",
              "For unique identifiers in applications, use our <a href=\"/tools/developer/uuid-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">UUID Generator</a> to create universally unique identifiers.",
              "If you need to convert your generated numbers to different bases (binary, hex, octal), our <a href=\"/tools/calculator/number-base-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Number Base Converter</a> handles instant conversions.",
              "To see what percentage a random number is of your max value, use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a>.",
              "The generation history stores your last 5 results in the current session — refresh the page to clear it.",
              "You can use negative numbers in the range. For example, setting min to -10 and max to 10 gives you 21 possible integers centered on zero.",
              "For large ranges with many unique integers (e.g., 50 unique numbers from 1 to 100), the tool handles it efficiently with a Set-based deduplication approach.",
              "Decimal mode is useful when you need random values for simulations, such as generating random coordinates or probabilities between 0 and 1.",
              "All random values are generated using your browser's cryptographic API — the same quality used for secure HTTPS connections.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Random Numbers in Technology */}
        <section className="mt-16 space-y-4" aria-label="Random numbers in technology">
          <h2 className="text-2xl font-bold tracking-tight">Random Numbers in Technology</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Cryptography and Security</h3>
              <p className="text-sm text-muted-foreground">
                Random numbers are the backbone of modern encryption. SSL/TLS handshakes, password salts, authentication tokens, and session keys all depend on high-quality random number generation. Without strong randomness, encrypted communications can be predicted and broken.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Gaming and Simulations</h3>
              <p className="text-sm text-muted-foreground">
                Video games use random numbers for procedural world generation, loot drops, critical hit chances, enemy AI behavior, and card shuffling. Monte Carlo simulations in finance and physics rely on millions of random samples to model complex systems.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Machine Learning</h3>
              <p className="text-sm text-muted-foreground">
                Random numbers initialize neural network weights, shuffle training data, apply dropout regularization, and drive data augmentation. The quality of the random source can directly affect model training stability and reproducibility.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Sampling and Statistics</h3>
              <p className="text-sm text-muted-foreground">
                Random sampling is fundamental to statistical analysis, A/B testing, polling, and clinical trials. Proper randomization eliminates selection bias and ensures that sample results are representative of the broader population.
              </p>
            </div>
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
