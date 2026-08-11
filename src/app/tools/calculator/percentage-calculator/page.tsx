import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PercentageCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PercentageCalculatorPage() {
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
        <section className="mt-8" aria-label="Percentage Calculator Tool">
          <PercentageCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Percentage Calculator</h2>
          <p className="text-muted-foreground">
            Our percentage calculator offers five calculation modes. Here is how to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Select a calculation mode</span> — Choose from the five tabs: X% of Y, What %, Change, Increase, or Decrease.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your numbers</span> — Type your values into the input fields. Results appear instantly as you type.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the formula</span> — Every result shows the step-by-step formula used so you can verify the math.
            </li>
            <li>
              <span className="text-foreground font-medium">Try quick examples</span> — Click any pre-built example button to instantly populate the fields with common calculations.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Five calculation modes covering all common percentage scenarios",
              "Real-time results — no submit button needed, updates as you type",
              "Step-by-step formula display for every calculation",
              "Quick example buttons for instant demo of each mode",
              "Increase/decrease detection with color-coded results",
              "Support for decimal percentages (e.g., 8.5%, 0.25%)",
              "Responsive design that works on mobile, tablet, and desktop",
              "100% browser-based — no server, no data collection",
              "Clean, accessible interface with proper ARIA labels",
              "Formatted number output with locale-aware thousands separators",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Percentage Formulas Explained */}
        <section className="mt-16 space-y-4" aria-label="Percentage formulas">
          <h2 className="text-2xl font-bold tracking-tight">Percentage Formulas Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage of a Number</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Result = (X / 100) &times; Y</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Multiply the percentage (as a decimal) by the base number. Example: 15% of 200 = 0.15 &times; 200 = 30.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What Percent?</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">% = (Part / Whole) &times; 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Divide the part by the whole and multiply by 100. Example: 30 is (30 / 200) &times; 100 = 15% of 200.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage Change</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">% = ((New − Old) / Old) &times; 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Subtract the original from the new value, divide by the original, and multiply by 100. Positive = increase, negative = decrease.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage Increase</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Result = X &times; (1 + Y / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Add the percentage amount to the original. Example: 80 increased by 25% = 80 &times; 1.25 = 100.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage Decrease</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Result = X &times; (1 &minus; Y / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Subtract the percentage amount from the original. Example: 120 decreased by 20% = 120 &times; 0.80 = 96.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage Difference</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">% = |A &minus; B| / ((A + B) / 2) &times; 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Measures the absolute difference relative to the average of two values, with no direction implied.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Shopping Discounts", desc: "Calculate the final price after a sale. Use the Decrease tab: enter the original price and discount percentage." },
              { title: "Tip Calculation", desc: "Find how much to tip at a restaurant. Use the X% of Y tab: enter tip % and bill amount. Or try our dedicated Tip Calculator." },
              { title: "Investment Returns", desc: "Measure stock or portfolio growth. Use the Percentage Change tab to see gain or loss over time." },
              { title: "Grade Averages", desc: "Convert a raw score to a percentage. Use the What % tab: enter your score and the total possible points." },
              { title: "Salary Raises", desc: "Calculate your new salary after a raise. Use the Increase tab: enter current salary and raise percentage." },
              { title: "Tax Calculations", desc: "Find the tax amount on a purchase. Use the X% of Y tab: enter the tax rate and pre-tax price." },
              { title: "Inflation Impact", desc: "See how prices change over time. Use the Percentage Change tab with old and new prices." },
              { title: "Markup Pricing", desc: "Set selling prices based on cost. Use the Increase tab: enter your cost and desired markup percentage." },
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Percentage Calculations</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Remember that percentage increase and decrease are not symmetric: 50% up from 100 is 150, but 50% down from 150 is 75, not 100.",
              "For quick mental math, 10% of any number is simply the number with the decimal shifted one place left.",
              "To find 5%, calculate 10% and then halve it. To find 15%, calculate 10% and add half of 10%.",
              "When comparing two percentages, always check what base value they refer to — percentages of different totals cannot be directly compared.",
              "Need to convert between units? Use our <a href=\"/tools/calculator/unit-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Unit Converter</a> for length, weight, temperature, and more.",
              "Calculating a restaurant bill split? Our <a href=\"/tools/calculator/tip-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Tip Calculator</a> handles tips, splits, and total — all in one tool.",
              "Checking your health metrics? Our <a href=\"/tools/calculator/bmi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">BMI Calculator</a> works great alongside percentage-based body fat tracking.",
              "Planning a shopping trip? Our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> gives you the final price after multiple discounts and tax.",
              "A percentage greater than 100% simply means the part is larger than the whole — this is common in growth metrics.",
              "All calculations use your browser's JavaScript engine. No data is ever sent to a server.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Percentage in Everyday Life */}
        <section className="mt-16 space-y-4" aria-label="Percentage in everyday life">
          <h2 className="text-2xl font-bold tracking-tight">Percentage in Everyday Life</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Finance and Banking</h3>
              <p className="text-sm text-muted-foreground">
                Interest rates, loan APRs, investment returns, and inflation are all expressed as percentages.
                Understanding percentage change helps you evaluate whether your savings are keeping pace with
                inflation or whether an investment is truly growing.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Shopping and Sales</h3>
              <p className="text-sm text-muted-foreground">
                Retailers use percentages for discounts (e.g., &ldquo;30% off&rdquo;), sales tax, and coupon savings.
                Being able to quickly calculate percentage decreases lets you compare deals and find the
                best price across different stores.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Health and Nutrition</h3>
              <p className="text-sm text-muted-foreground">
                Daily value percentages on nutrition labels show how a food fits into your diet. Body fat
                percentage, BMI percentiles, and blood oxygen levels are all critical health metrics expressed
                as percentages.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Education and Grades</h3>
              <p className="text-sm text-muted-foreground">
                Test scores, class averages, grade curves, and passing thresholds are all percentage-based.
                Knowing how to calculate what percentage a raw score represents helps students and parents
                track academic progress.
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
