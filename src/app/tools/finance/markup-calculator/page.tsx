import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MarkupCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MarkupCalculatorPage() {
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
        <section className="mt-8" aria-label="Markup Calculator Tool">
          <MarkupCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Markup Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your markup, selling price, and margin in three simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your cost price</span> — Type the total cost to produce or purchase the item (materials, labor, shipping, etc.).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter the markup percentage</span> — The percentage you want to add on top of your cost. Common markups range from 20% to 100% depending on industry.
            </li>
            <li>
              <span className="text-foreground font-medium">View instant results</span> — See your selling price, profit per unit, gross margin percentage, and revenue per unit. Use the conversion section to switch between margin and markup.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instant calculation of selling price from cost and markup",
              "Shows profit amount, gross margin %, and revenue per unit",
              "Built-in margin-to-markup and markup-to-margin converter",
              "Quick reference table with 13 common margin/markup pairs",
              "Copy results button for quick sharing or documentation",
              "Real-time calculation as you type — no submit button needed",
              "Input validation with clear error messages",
              "Fully responsive — works on all device sizes",
              "100% client-side — no data sent to any server",
              "Currency-agnostic — works with any currency or unit",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Markup Pricing Explained */}
        <section className="mt-16 space-y-4" aria-label="Markup pricing explained">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Markup Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Cost-Plus Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Markup pricing is also called cost-plus pricing. You start with your cost, then add a markup percentage to determine the selling price. It is the simplest and most widely used pricing method worldwide.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Selling Price = Cost × (1 + Markup / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For a $50 cost with 60% markup: $50 × 1.60 = $80 selling price. The $30 difference is your profit per unit.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">When to Use Markup</h3>
              <p className="text-sm text-muted-foreground">
                Use markup when setting initial prices, when costs are stable, when you sell a variety of products, or when you need a simple, consistent pricing system. It works best as a starting point before adjusting for market conditions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Markup vs. Value-Based Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Markup pricing is cost-focused. Value-based pricing sets prices based on what customers are willing to pay. Many successful businesses combine both: use markup to set a floor price, then adjust upward based on perceived value and competitive analysis.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Factoring in Overhead</h3>
              <p className="text-sm text-muted-foreground">
                Your "cost" should include all costs: materials, labor, shipping, packaging, and a portion of overhead (rent, utilities, admin). If you only use material cost, your markup must be much higher to cover everything else.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Industry Markup Standards</h3>
              <p className="text-sm text-muted-foreground">
                Groceries: 15–30%, Apparel: 100–300%, Electronics: 20–50%, Restaurants: 250–400% (on food cost), Software: 500%+. These ranges vary widely — research your specific niche for accurate benchmarks.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Conversion Formulas */}
        <section className="mt-16 space-y-4" aria-label="Conversion formulas">
          <h2 className="text-2xl font-bold tracking-tight">Margin ↔ Markup Conversion Formulas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Margin to Markup</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Markup = Margin / (1 - Margin)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Convert margin to a decimal first (30% = 0.30). Then: 0.30 / (1 - 0.30) = 0.30 / 0.70 = 0.4286 = 42.86% markup. Our converter section does this instantly.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Markup to Margin</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Margin = Markup / (1 + Markup)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Convert markup to a decimal first (50% = 0.50). Then: 0.50 / (1 + 0.50) = 0.50 / 1.50 = 0.3333 = 33.33% margin. Always verify your pricing using both metrics.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Retail Product Pricing", desc: "Set shelf prices for your retail products. Enter your wholesale cost and desired markup to calculate the selling price that covers costs and delivers target profit." },
              { title: "Freelance Service Rates", desc: "Calculate your hourly or project rate by applying a markup to your costs (software, tools, workspace). Ensure your rates include profit, not just cost recovery." },
              { title: "Restaurant Menu Pricing", desc: "Apply food cost markup to determine menu prices. Standard restaurant food cost is 25–35% of the menu price, meaning a 186–300% markup on ingredients." },
              { title: "E-Commerce Pricing", desc: "Set competitive prices for online products. Factor in product cost, shipping, platform fees, and desired profit into your cost base before applying markup." },
              { title: "Wholesale Distribution", desc: "Calculate wholesale prices that give retailers room for their own markup while maintaining your profitability." },
              { title: "Manufacturing Cost-Plus", desc: "Determine product pricing from raw material and production costs. Add overhead allocation and desired markup for contract or catalog pricing." },
              { title: "Construction Bidding", desc: "Apply markup to material and labor costs for project bids. Typical construction markups range from 10–20% on top of direct costs." },
              { title: "Price Comparison Analysis", desc: "Reverse-calculate competitor markups from known costs and prices to understand their pricing strategy and identify competitive opportunities." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Pricing Strategy Tips */}
        <section className="mt-16 space-y-4" aria-label="Pricing strategy tips">
          <h2 className="text-2xl font-bold tracking-tight">Pricing Strategy Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always include ALL costs in your base — materials, labor, shipping, packaging, returns, and a proportional share of overhead (rent, utilities, insurance, marketing). Many businesses underprice because they only factor in direct material costs.",
              "Set your markup based on your target margin, not the other way around. Decide what margin you need to sustain and grow your business, then use the converter to find the required markup.",
              "Consider psychological pricing — $49.99 often sells better than $50 even though the difference is tiny. Use our calculator to find your price, then adjust for psychological appeal.",
              "Review and adjust markups quarterly. Costs change, competition shifts, and customer demand evolves. A markup that worked last year may leave money on the table or price you out of the market today.",
              "Use tiered markups for product lines — higher markups on unique or differentiated products, lower markups on commodity items where competition is fierce.",
              'When offering discounts, calculate the impact on your margin using our <a href="/tools/calculator/discount-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Discount Calculator</a>. A 20% off sale on a product with a 25% margin leaves you with almost no profit.',
              "Track your actual margins monthly and compare to your markup targets. If actual margins consistently fall below targets, your costs may be rising or you may be discounting too much.",
              "Remember that markup covers more than COGS. Your markup needs to pay for operating expenses, taxes, debt service, and profit. A product with 30% COGS markup might only deliver 5% net margin after all expenses.",
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
