import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PercentageDecreaseCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PercentageDecreaseCalculatorPage() {
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
        <section className="mt-8" aria-label="Percentage Decrease Calculator Tool">
          <PercentageDecreaseCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Percentage Decrease Calculator</h2>
          <p className="text-muted-foreground">
            Calculating percentage decrease is straightforward with this tool. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter the original value</span> — Type the starting value (e.g., the original price, your previous weight, or the old budget amount).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter the new value</span> — Type the current or final value (e.g., the sale price, your current weight, or the reduced budget).
            </li>
            <li>
              <span className="text-foreground font-medium">View instant results</span> — The percentage decrease, absolute change, and remaining percentage are calculated in real time as you type.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the formula</span> — The step-by-step breakdown shows exactly how the result was calculated, including the remaining value percentage.
            </li>
            <li>
              <span className="text-foreground font-medium">Try quick examples</span> — Click any example button (price drop, budget cut, weight loss) to see the calculator in action.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time calculation — results update instantly as you type, no submit button needed",
              "Percentage decrease with visual red arrow indicator for decline",
              "Automatic detection — shows green arrow if the value actually increased",
              "Absolute change display showing the exact numerical difference",
              "Remaining percentage showing what fraction of the original value remains",
              "Full formula breakdown with step-by-step explanation",
              "Quick example buttons for price drops, budget cuts, and weight loss",
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
          <h2 className="text-2xl font-bold tracking-tight">The Percentage Decrease Formula</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Core Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">% Decrease = ((Original − New) / Original) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Subtract the new value from the original, divide by the original, then multiply by 100. This gives you the percentage decline relative to where you started. A 25% decrease means the value lost a quarter of its original amount.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Absolute Change</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Change = Original Value − New Value</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The simple numerical difference between the two numbers. While useful on its own, it does not convey relative significance — a $50 drop on a $100 item is very different from a $50 drop on a $10,000 item.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Remaining Percentage</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Remaining % = (New Value / Original) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Shows what portion of the original value still remains. A 25% decrease leaves 75% remaining. This is useful for budgeting — if your department budget was cut 20%, you have 80% of your original funding left.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Practical Examples */}
        <section className="mt-16 space-y-4" aria-label="Practical examples">
          <h2 className="text-2xl font-bold tracking-tight">Practical Examples</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Price Drop", desc: "A TV was $800 and is now $600. The decrease is ((800 − 600) / 800) × 100 = 25% price reduction." },
              { title: "Budget Cut", desc: "A project budget went from $250,000 to $200,000. That is ((250,000 − 200,000) / 250,000) × 100 = 20% budget reduction." },
              { title: "Weight Loss", desc: "Starting weight was 180 lbs, now 162 lbs. That is ((180 − 162) / 180) × 100 = 10% body weight reduction." },
              { title: "Revenue Decline", desc: "Quarterly revenue fell from $50,000 to $42,500. That is ((50,000 − 42,500) / 50,000) × 100 = 15% revenue decline." },
              { title: "Stock Price Drop", desc: "A share fell from $120 to $96. That is ((120 − 96) / 120) × 100 = 20% stock price decline." },
              { title: "Traffic Drop", desc: "Monthly visitors dropped from 20,000 to 15,000. That is ((20,000 − 15,000) / 20,000) × 100 = 25% traffic decline." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Percentage Decrease vs. Percentage Increase */}
        <section className="mt-16 space-y-4" aria-label="Decrease vs increase">
          <h2 className="text-2xl font-bold tracking-tight">Percentage Decrease vs. Percentage Increase</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold text-red-500 dark:text-red-400">Percentage Decrease</h3>
              <p className="text-sm text-muted-foreground">
                Used when the new value is lower than the original. A positive result indicates decline. This calculator handles this case and shows a red downward arrow indicator. Common in price drops, budget cuts, weight loss tracking, and revenue decline analysis.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Percentage Increase</h3>
              <p className="text-sm text-muted-foreground">
                Used when the new value is higher than the original. A positive result indicates growth. Our calculator detects this automatically and shows a green upward arrow when it encounters an unexpected increase. For dedicated increase calculations, try our <a href="/tools/calculator/percentage-increase-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Percentage Increase Calculator</a>.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Tips for Accurate Calculations */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Accurate Percentage Decrease Calculations</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always use the original (starting) value as the denominator — this is the most common mistake in percentage calculations.",
              "Remember that percentage decrease and increase are not symmetric: a 50% decrease followed by a 50% increase does not return to the original value.",
              "A 100% decrease means the value dropped to zero — this is the maximum for positive new values. Anything beyond 100% requires the new value to be negative.",
              "The remaining percentage is a powerful complementary metric — it tells you what fraction of the original value still exists after the decrease.",
              "For year-over-year decline comparisons, ensure both values cover the same time period to avoid misleading results.",
              "Need to calculate what a value was before a known percentage decrease? Use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> to reverse-engineer the original amount.",
              "Shopping sales? Our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> helps you find the final price after a percentage decrease.",
              "Tracking health metrics? Our <a href=\"/tools/calculator/bmi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">BMI Calculator</a> pairs well with percentage-based body weight tracking.",
              "For multi-period declines, do not simply add the percentages — each period's base changes. Use compound decline formulas for accurate multi-period results.",
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
