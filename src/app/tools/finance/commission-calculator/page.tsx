import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CommissionCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CommissionCalculatorPage() {
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
        <section className="mt-8" aria-label="Commission Calculator Tool">
          <CommissionCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Commission Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your commission in three easy steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Select your commission structure</span> — Choose between Flat Rate, Percentage, or Tiered commission using the tabs at the top.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your sales data</span> — Input your total sales amount and the commission rate(s). For tiered commission, enter the rate and threshold for each of the three tiers.
            </li>
            <li>
              <span className="text-foreground font-medium">View your earnings</span> — Results are displayed instantly with a detailed breakdown. The tiered mode shows commission per tier plus total. Copy your results for your records.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Three commission structures: Flat Rate, Percentage, and Tiered",
              "Flat Rate: calculate commission based on a fixed amount per sale",
              "Percentage: calculate commission as a percentage of total sales",
              "Tiered: 3-level progressive commission with per-tier breakdown",
              "Instant calculation — results update as you type",
              "Summary card with total commission earnings",
              "Detailed tier breakdown table showing rate, sales, and commission per tier",
              "Copy results button for quick sharing or record-keeping",
              "Mobile-responsive layout with compact tab labels",
              "100% client-side — your financial data stays in your browser",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Commission Structures Explained */}
        <section className="mt-16 space-y-4" aria-label="Commission structures explained">
          <h2 className="text-2xl font-bold tracking-tight">Commission Structures Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Flat Rate Commission</h3>
              <p className="text-sm text-muted-foreground">
                You earn a fixed dollar amount per sale, regardless of the sale value. Common in retail, telecommunications, and entry-level sales roles. Simple to understand and administer, but does not reward selling higher-value items. Example: $100 per phone activation.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage Commission</h3>
              <p className="text-sm text-muted-foreground">
                You earn a fixed percentage of every sale. Common in real estate (5-6%), B2B sales (10-20%), and insurance (10-25%). Directly rewards selling more and selling higher-value products. Example: 10% of a $50,000 deal = $5,000 commission.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tiered Commission</h3>
              <p className="text-sm text-muted-foreground">
                Different commission rates apply to different portions of your total sales. Lower rates apply to initial sales, higher rates kick in above thresholds. This structure incentivizes exceeding quotas and rewards top performers. Example: 5% up to $10K, 7% from $10K-$25K, 10% above $25K.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Base + Commission</h3>
              <p className="text-sm text-muted-foreground">
                Most sales roles combine a guaranteed base salary with commission. Common splits are 50/50, 60/40 (salary/commission), or 70/30. The base provides income stability while commission incentivizes performance. Calculate your total compensation by adding base salary to commission.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Residual Commission</h3>
              <p className="text-sm text-muted-foreground">
                Some roles (insurance, SaaS) pay ongoing commission on recurring revenue. You earn a percentage each month as long as the customer renews. This creates passive income over time. For example, 20% of a $100/month SaaS subscription = $20/month for as long as the customer stays.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Choosing the Right Structure</h3>
              <p className="text-sm text-muted-foreground">
                For employers: flat rates suit high-volume, low-value sales. Percentage suits relationship-based selling. Tiered structures drive quota achievement. For employees: understand your structure, track progress, and time big deals strategically to maximize tier thresholds.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Real Estate Agents", desc: "Calculate your earnings on property sales. A 5% commission on a $400,000 home sale equals $20,000 (before brokerage split)." },
              { title: "B2B Sales Representatives", desc: "Estimate monthly earnings from your sales pipeline. Enter your quota, average deal size, and commission rate to forecast income." },
              { title: "Insurance Agents", desc: "Calculate commission on policy premiums. First-year commissions are typically higher (15-25%) than renewal commissions (5-10%)." },
              { title: "Retail Sales Associates", desc: "Calculate flat-rate or percentage commissions on daily, weekly, or monthly sales totals." },
              { title: "Freelance Sales Consultants", desc: "Determine your fee from commission-based consulting arrangements. Often 15-30% of revenue generated for clients." },
              { title: "Affiliate Marketers", desc: "Calculate earnings from affiliate programs. Commission rates range from 5-50% depending on the product and program." },
              { title: "Sales Managers", desc: "Calculate override commissions earned from your team's total sales. Typical override rates are 1-5% of team revenue." },
              { title: "Car Salespeople", desc: "Calculate commission on vehicle sales. Dealership commissions are often a flat $200-$500 per car plus a percentage of the profit margin." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips for Maximizing Commission */}
        <section className="mt-16 space-y-4" aria-label="Tips for maximizing commission">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Maximizing Commission Earnings</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Know your commission structure inside and out. Understand your rates, thresholds, bonus triggers, and any caps. Many salespeople miss earnings because they do not know when they cross into a higher tier.",
              "Track your progress toward tier thresholds weekly, not monthly. If you are in a tiered structure and are close to the next threshold, prioritize closing deals to unlock the higher rate on all additional sales.",
              "Focus on high-margin products and services. Selling a product with a higher price or margin directly increases your commission. Even a small shift toward higher-value items can significantly boost earnings.",
              "Upsell and cross-sell at every opportunity. Adding complementary products or premium upgrades to an existing deal increases the sale value and your commission without the effort of finding a new customer.",
              "Build a strong pipeline to maintain consistent sales. Relying on a few large deals creates income volatility. A healthy pipeline of opportunities at various stages ensures steady commission income.",
              "Time your deals strategically in tiered structures. If you are $2,000 away from a higher tier at month-end, it may be worth offering a small discount to close a deal and unlock the higher rate on additional sales.",
              "Negotiate your commission rate when you have leverage. After a strong quarter or year, present your results and ask for improved rates. Data-driven requests backed by your sales record are hard to reject.",
              'Factor in taxes and expenses. Set aside 25-35% of commission for taxes and track your business expenses (travel, meals, tools) that may be deductible. Use our <a href="/tools/finance/profit-margin-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Profit Margin Calculator</a> to analyze your net take-home after expenses.',
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Industry Commission Rates */}
        <section className="mt-16 space-y-4" aria-label="Industry commission rates">
          <h2 className="text-2xl font-bold tracking-tight">Industry Commission Rate Benchmarks</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { industry: "Real Estate", rate: "5–6%", note: "Often split 50/50 with brokerage" },
              { industry: "Insurance (Life)", rate: "40–100% (year 1)", note: "High first-year, 5-10% renewals" },
              { industry: "Insurance (P&C)", rate: "10–20%", note: "Property and casualty, lower renewal" },
              { industry: "Software / SaaS", rate: "10–20%", note: "Often on annual contract value" },
              { industry: "B2B Sales", rate: "8–15%", note: "Varies by deal size and product" },
              { industry: "Retail", rate: "1–5%", note: "Often combined with hourly wage" },
              { industry: "Automotive", rate: "20–30%", note: "On dealer profit margin, not MSRP" },
              { industry: "Advertising / Media", rate: "10–15%", note: "Traditional agency commission" },
            ].map((item) => (
              <div key={item.industry} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.industry}</h3>
                  <span className="font-mono text-sm font-bold text-primary">{item.rate}</span>
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
