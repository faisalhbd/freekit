import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PercentageIncreaseCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PercentageIncreaseCalculatorPage() {
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
        <section className="mt-8" aria-label="Percentage Increase Calculator Tool">
          <PercentageIncreaseCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Percentage Increase Calculator</h2>
          <p className="text-muted-foreground">
            Calculating percentage increase is straightforward with this tool. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter the original value</span> — Type the starting value (e.g., your old salary, the original price, or the initial measurement).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter the new value</span> — Type the current or final value (e.g., your new salary, the new price, or the latest measurement).
            </li>
            <li>
              <span className="text-foreground font-medium">View instant results</span> — The percentage increase, absolute change, and multiplier are calculated in real time as you type.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the formula</span> — The step-by-step breakdown shows exactly how the result was calculated.
            </li>
            <li>
              <span className="text-foreground font-medium">Try quick examples</span> — Click any example button (salary raise, stock growth, population growth) to see the calculator in action.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time calculation — results update instantly as you type, no submit button needed",
              "Percentage increase with visual green arrow indicator for growth",
              "Absolute change display showing the exact numerical difference",
              "Multiplier display showing how many times larger the new value is",
              "Full formula breakdown with step-by-step explanation",
              "Handles both increases and decreases — detects direction automatically",
              "Quick example buttons for salary raises, stock growth, and population growth",
              "Zero-division protection with a clear warning message",
              "Formatted numbers with thousands separators for readability",
              "100% browser-based — no server calls, no data collection, fully private",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. The Formula Explained */}
        <section className="mt-16 space-y-4" aria-label="Formula explained">
          <h2 className="text-2xl font-bold tracking-tight">The Percentage Increase Formula</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Core Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">% Increase = ((New − Original) / Original) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Subtract the original from the new value, divide by the original, then multiply by 100. This gives you the percentage growth relative to where you started.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Absolute Change</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Change = New Value − Original Value</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The simple difference between the two numbers. While useful on its own, it does not convey relative significance — a $10 increase on $20 is very different from $10 on $1,000.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Growth Multiplier</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Multiplier = New Value / Original Value</code>
              </p>
              <p className="text-sm text-muted-foreground">
                A multiplier of 1.0 means no change, 1.25 means 25% increase, 2.0 means 100% increase (doubling). This is useful for compounding calculations and financial modeling.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Practical Examples */}
        <section className="mt-16 space-y-4" aria-label="Practical examples">
          <h2 className="text-2xl font-bold tracking-tight">Practical Examples</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Salary Raise", desc: "Your salary goes from $60,000 to $66,000. The increase is ((66,000 − 60,000) / 60,000) × 100 = 10% raise." },
              { title: "Stock Price Growth", desc: "A share bought at $45 is now $63.45. That is ((63.45 − 45) / 45) × 100 = 41% gain on your investment." },
              { title: "Revenue Growth", desc: "Monthly revenue grew from $12,500 to $15,000. That is ((15,000 − 12,500) / 12,500) × 100 = 20% growth." },
              { title: "Website Traffic", desc: "Daily visitors increased from 8,000 to 12,400. That is ((12,400 − 8,000) / 8,000) × 100 = 55% traffic increase." },
              { title: "Population Growth", desc: "A city's population grew from 500,000 to 575,000. That is ((575,000 − 500,000) / 500,000) × 100 = 15% population increase." },
              { title: "Price Hike", desc: "A product's price went from $24.99 to $29.99. That is ((29.99 − 24.99) / 24.99) × 100 ≈ 20% price increase." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Percentage Increase vs. Percentage Decrease */}
        <section className="mt-16 space-y-4" aria-label="Increase vs decrease">
          <h2 className="text-2xl font-bold tracking-tight">Percentage Increase vs. Percentage Decrease</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Percentage Increase</h3>
              <p className="text-sm text-muted-foreground">
                Used when the new value is higher than the original. A positive result indicates growth. This calculator handles this case and shows a green upward arrow indicator. Common in salary raises, investment returns, and revenue growth tracking.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold text-red-500 dark:text-red-400">Percentage Decrease</h3>
              <p className="text-sm text-muted-foreground">
                Used when the new value is lower than the original. A negative result indicates decline. Our calculator detects this automatically and shows a red indicator. For dedicated decrease calculations, try our <a href="/tools/calculator/percentage-decrease-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Percentage Decrease Calculator</a>.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Tips for Accurate Calculations */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Accurate Percentage Increase Calculations</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always use the original (starting) value as the denominator — this is the most common mistake in percentage calculations.",
              "Remember that percentage increase and decrease are not symmetric: a 50% increase followed by a 50% decrease does not return to the original value.",
              "For year-over-year comparisons, ensure both values cover the same time period to avoid misleading results.",
              "When comparing multiple increases, look at the multiplier rather than just the percentage — a 200% increase means tripling (3.0× multiplier).",
              "For compound growth over multiple periods, you cannot simply add the percentages — use compound interest formulas or financial calculators.",
              "Need to calculate the reverse? Use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> to find what a value was before a known percentage increase.",
              "Planning a shopping trip? Our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> helps you find the final price after percentage decreases.",
              "Tracking health metrics alongside growth? Our <a href=\"/tools/calculator/bmi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">BMI Calculator</a> pairs well with percentage-based body measurement tracking.",
              "A percentage increase greater than 100% simply means the new value is more than double the original — this is common in high-growth scenarios.",
              "All calculations run in your browser using JavaScript. No data is ever sent to a server.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
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
