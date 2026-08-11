import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ProfitMarginCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ProfitMarginCalculatorPage() {
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
        <section className="mt-8" aria-label="Profit Margin Calculator Tool">
          <ProfitMarginCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Profit Margin Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your profit margin and markup in two simple modes:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Calculate Margin mode</span> — Enter your cost price and selling price. The calculator instantly shows your profit amount, profit margin percentage, and markup percentage.
            </li>
            <li>
              <span className="text-foreground font-medium">Calculate from Margin mode</span> — Enter your cost price and desired profit margin percentage. The calculator computes the required selling price, profit amount, and equivalent markup.
            </li>
            <li>
              <span className="text-foreground font-medium">Revenue calculation</span> — Optionally enter the number of units sold to see total revenue and total profit figures.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Two calculation modes: Calculate Margin and Calculate from Margin",
              "Instant results for Profit, Profit Margin %, and Markup %",
              "Optional revenue calculation by entering units sold",
              "Formula display for Profit, Margin, and Markup calculations",
              "Copy results button for quick sharing or record-keeping",
              "Input validation with clear error messages for invalid margins",
              "Styled result cards with color-coded metrics",
              "Fully responsive design — works on mobile and desktop",
              "100% client-side — no data leaves your browser",
              "Works with any currency — enter values in your local currency",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Margin vs Markup Explained */}
        <section className="mt-16 space-y-4" aria-label="Margin vs markup explained">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Margin vs. Markup</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What is Profit Margin?</h3>
              <p className="text-sm text-muted-foreground">
                Profit margin measures how much of each dollar of revenue is actual profit. It is expressed as a percentage of the selling price. A 40% margin means for every $1 of revenue, you keep $0.40 as profit.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What is Markup?</h3>
              <p className="text-sm text-muted-foreground">
                Markup measures how much you add on top of your cost. It is expressed as a percentage of the cost price. A 50% markup on a $100 cost means you sell for $150.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Key Difference</h3>
              <p className="text-sm text-muted-foreground">
                Margin uses selling price as the base; markup uses cost price. Since selling price is always higher than cost, markup is always larger than margin. Confusing them leads to pricing errors.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Conversion Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Markup = Margin / (1 - Margin)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                To convert margin to markup, divide by (1 minus margin as decimal). A 30% margin equals 42.86% markup.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Common Pricing Mistake</h3>
              <p className="text-sm text-muted-foreground">
                Many businesses set a 50% markup thinking they get 50% margin. In reality, a 50% markup on a $100 cost ($150 selling price) gives only a 33.3% margin — a significant difference in profitability perception.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Which One to Use?</h3>
              <p className="text-sm text-muted-foreground">
                Use margin for financial reporting and profitability analysis. Use markup for setting prices from costs. Both are essential — margin tells you how profitable you are, markup tells you how to price.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Formulas in Detail */}
        <section className="mt-16 space-y-4" aria-label="Formulas in detail">
          <h2 className="text-2xl font-bold tracking-tight">Profit Margin Formulas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Profit Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Profit = Selling Price - Cost Price</code>
              </p>
              <p className="text-sm text-muted-foreground">
                This is the most basic calculation. If you buy a product for $40 and sell for $65, your profit is $25. Simple, but fundamental to all other calculations.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Profit Margin % Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Margin % = (Profit / Selling Price) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Using the example above: ($25 / $65) × 100 = 38.46%. This means 38.46 cents of every dollar earned is profit. This is the metric investors and analysts focus on.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Markup % Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Markup % = (Profit / Cost Price) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Using the example: ($25 / $40) × 100 = 62.5%. This means you added 62.5% on top of your cost. Use this when pricing products from cost.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Reverse Selling Price Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Selling Price = Cost / (1 - Desired Margin / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                To achieve a 40% margin on a $50 cost: $50 / (1 - 0.40) = $83.33. This is the formula used in Mode 2 of our calculator.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Product Pricing Strategy", desc: "Determine the right selling price for your products by targeting a specific profit margin. Enter your cost and desired margin to get the exact price needed." },
              { title: "Retail Business Analysis", desc: "Analyze your product margins to identify which items are most profitable. Focus on high-margin products to maximize overall business profitability." },
              { title: "Service Business Pricing", desc: "Calculate margins on service offerings by factoring in labor, materials, and overhead costs. Ensure your service rates deliver healthy margins." },
              { title: "Wholesale Pricing", desc: "Set wholesale prices that maintain your margin while offering retailers enough markup to incentivize distribution." },
              { title: "Discount Impact Analysis", desc: "See how discounts affect your profit margin. A 20% discount on a 30% margin product can reduce your margin to under 15%. Plan promotions carefully." },
              { title: "Competitor Analysis", desc: "Estimate competitor margins from their known prices and estimated costs. Understand if they can sustain price wars or if your margins give you room to compete." },
              { title: "Financial Reporting", desc: "Calculate gross profit margins for financial statements, investor presentations, and business valuations. Consistent margin tracking reveals business health trends." },
              { title: "Break-Even Analysis", desc: "Combine margin data with fixed costs to determine your break-even point. Know exactly how many units you need to sell to cover all expenses." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Industry Benchmarks */}
        <section className="mt-16 space-y-4" aria-label="Industry benchmarks">
          <h2 className="text-2xl font-bold tracking-tight">Industry Profit Margin Benchmarks</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { industry: "Software / SaaS", margin: "60–80%", note: "High scalability, low marginal cost per user" },
              { industry: "Pharmaceuticals", margin: "50–70%", note: "Patent protection enables premium pricing" },
              { industry: "Financial Services", margin: "30–50%", note: "Leverage and fee-based revenue models" },
              { industry: "Retail (General)", margin: "20–50%", note: "Varies widely by product category" },
              { industry: "Food & Beverage", margin: "15–35%", note: "Perishable goods and high competition" },
              { industry: "Manufacturing", margin: "10–25%", note: "High fixed costs and material expenses" },
              { industry: "Construction", margin: "5–15%", note: "Labor-intensive with project risks" },
              { industry: "Grocery", margin: "1–3%", note: "High volume, low margin, thin competition" },
            ].map((item) => (
              <div key={item.industry} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.industry}</h3>
                  <span className="font-mono text-sm font-bold text-primary">{item.margin}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
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
