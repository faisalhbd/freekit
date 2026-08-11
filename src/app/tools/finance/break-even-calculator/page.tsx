import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BreakEvenCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BreakEvenCalculatorPage() {
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
        <section className="mt-8" aria-label="Break-even Calculator Tool">
          <BreakEvenCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Break-even Calculator</h2>
          <p className="text-muted-foreground">
            Determine your break-even point in three simple inputs:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter Fixed Costs</span> — Total monthly or annual costs that do not change with production volume (e.g., rent, salaries, insurance, equipment leases).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter Variable Cost per Unit</span> — The cost to produce or acquire one unit (e.g., raw materials, direct labor, packaging, shipping per item).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter Selling Price per Unit</span> — The price at which you sell each unit to your customer.
            </li>
            <li>
              <span className="text-foreground font-medium">View results instantly</span> — Break-even units, break-even revenue, contribution margin, contribution margin %, and a detailed profit/loss table showing outcomes at different sales quantities.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instant break-even calculation in units and revenue",
              "Contribution margin per unit with percentage",
              "Profit/loss table at 8 different quantity levels",
              "Break-even row highlighted in the table",
              "Color-coded profit (green) and loss (red) values",
              "Error detection when variable cost exceeds price",
              "Formula display for all calculations",
              "Copy results button for quick sharing",
              "Fully responsive — works on mobile and desktop",
              "100% client-side — no data leaves your browser",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Understanding Break-even */}
        <section className="mt-16 space-y-4" aria-label="Understanding break-even">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Break-even Analysis</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What is Break-even?</h3>
              <p className="text-sm text-muted-foreground">
                Break-even is the point where total revenue equals total costs. At this point, you neither profit nor lose money. It is the minimum sales volume your business needs to survive.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Fixed Costs</h3>
              <p className="text-sm text-muted-foreground">
                These are costs you pay regardless of how many units you sell. Rent, salaries, insurance, software subscriptions, and loan payments are all fixed costs. They create the "floor" of your expenses.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Variable Costs</h3>
              <p className="text-sm text-muted-foreground">
                These costs increase with every unit produced or sold. Raw materials, direct labor hours per unit, packaging, and shipping are variable costs. They determine your per-unit economics.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Contribution Margin</h3>
              <p className="text-sm text-muted-foreground">
                The amount each sale contributes to covering fixed costs. A higher contribution margin means you need fewer sales to break even and start generating profit.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Margin of Safety</h3>
              <p className="text-sm text-muted-foreground">
                The gap between expected sales and break-even. A 30% margin of safety means you can afford a 30% drop in sales before hitting break-even. Higher is better for business resilience.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Why It Matters</h3>
              <p className="text-sm text-muted-foreground">
                Break-even analysis is essential for pricing decisions, business planning, loan applications, and investor pitches. It answers the fundamental question: "How much do I need to sell to stay in business?"
              </p>
            </div>
          </div>
        </section>

        {/* 6. Break-even Formulas */}
        <section className="mt-16 space-y-4" aria-label="Break-even formulas">
          <h2 className="text-2xl font-bold tracking-tight">Break-even Formulas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Break-even Units</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">BE Units = Fixed Costs / (Selling Price - Variable Cost)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: $10,000 fixed costs, $50 price, $30 variable cost → 10,000 / (50 - 30) = 500 units to break even.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Break-even Revenue</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">BE Revenue = BE Units × Selling Price</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: 500 units × $50 = $25,000 in revenue needed to cover all costs. Alternatively: Fixed Costs / CM Ratio.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Contribution Margin</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">CM = Selling Price - Variable Cost per Unit</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: $50 - $30 = $20 contribution margin. Each unit contributes $20 toward covering the $10,000 in fixed costs.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Contribution Margin Ratio</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">CM % = (Contribution Margin / Selling Price) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: ($20 / $50) × 100 = 40%. This means 40% of each dollar of revenue goes toward covering fixed costs.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "New Product Launch", desc: "Determine how many units of a new product you need to sell before it becomes profitable. Factor in development costs, production costs, and your target selling price." },
              { title: "Pricing Strategy", desc: "Test different selling prices to see how they affect the break-even point. A small price increase can significantly reduce the units needed to break even." },
              { title: "Business Plan Creation", desc: "Include break-even analysis in your business plan to show investors and lenders when the business will become self-sustaining." },
              { title: "Cost Reduction Planning", desc: "Model the impact of reducing fixed or variable costs on your break-even point. See how much savings translate into lower sales requirements." },
              { title: "Loan Application", desc: "Banks often require break-even analysis to assess business viability. Show that your expected sales volume exceeds the break-even point." },
              { title: "Service Business", desc: "Calculate how many clients or projects you need per month to cover your operating costs. Treat each client as a unit with the service fee as selling price." },
              { title: "Restaurant & Cafe", desc: "Determine how many covers (customers served) you need per day or month. Factor in rent, staff costs, and food cost per meal." },
              { title: "SaaS / Subscription", desc: "Calculate the number of subscribers needed to cover server costs, development salaries, and other fixed expenses. Compare monthly vs. annual plans." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips for Better Break-even Analysis */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Better Break-even Analysis</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Separate Costs Accurately", desc: "Misclassifying a variable cost as fixed (or vice versa) will give wrong results. Salaries of production workers are variable; office rent is fixed." },
              { title: "Use Realistic Selling Prices", desc: "Do not use aspirational pricing. Use the actual price customers are willing to pay, or the market average for comparable products." },
              { title: "Account for Seasonality", desc: "Break-even is usually calculated monthly. If your business is seasonal, calculate break-even for your peak and off-peak months separately." },
              { title: "Include All Fixed Costs", desc: "Do not forget indirect fixed costs like insurance, software subscriptions, accounting fees, and equipment depreciation." },
              { title: "Update Regularly", desc: "Costs and prices change. Recalculate your break-even point quarterly to ensure your targets remain accurate and achievable." },
              { title: "Combine with Margin Analysis", desc: "Use our <a href=\"/tools/finance/profit-margin-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Profit Margin Calculator</a> alongside break-even analysis for a complete picture of your profitability." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
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
