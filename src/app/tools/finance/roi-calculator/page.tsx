import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ROICalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ROICalculatorPage() {
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
        <section className="mt-8" aria-label="ROI Calculator Tool">
          <ROICalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the ROI Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your return on investment in a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your Investment Cost</span> — The total amount of money you invested (e.g., $10,000 for a stock purchase, $50,000 for a business investment).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter the Final Value</span> — The current value or total return from your investment including any income received.
            </li>
            <li>
              <span className="text-foreground font-medium">Optionally enter the Investment Period</span> — Specify how many years the investment was held to calculate the annualized ROI for fair comparison across different time periods.
            </li>
            <li>
              <span className="text-foreground font-medium">View your results</span> — Net Profit, ROI percentage, annualized ROI (if period entered), interpretation text, and the formula used. Copy results with one click.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instant ROI calculation from investment cost and final value",
              "Net Profit display with gain/loss indicator",
              "Annualized ROI for multi-year investments",
              "Intelligent interpretation text (excellent, good, break-even, loss)",
              "Formula display: ROI = ((Final Value - Cost) / Cost) × 100",
              "Copy results button for quick sharing or record-keeping",
              "Color-coded result cards for visual clarity",
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

        {/* 5. Understanding ROI */}
        <section className="mt-16 space-y-4" aria-label="Understanding ROI">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Return on Investment</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What ROI Tells You</h3>
              <p className="text-sm text-muted-foreground">
                ROI measures the efficiency of an investment by expressing the return as a percentage of the original cost. A 50% ROI means you gained 50 cents for every dollar invested.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Total vs. Annualized</h3>
              <p className="text-sm text-muted-foreground">
                Total ROI gives the overall return percentage. Annualized ROI converts it to a per-year rate for comparing investments held over different time periods.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Positive vs. Negative</h3>
              <p className="text-sm text-muted-foreground">
                Positive ROI means profit. Negative ROI means loss. A 0% ROI means you broke even — the final value equals the initial cost.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">ROI in Business</h3>
              <p className="text-sm text-muted-foreground">
                Businesses use ROI to evaluate marketing campaigns, capital expenditures, and project investments. A marketing campaign with 300% ROI is highly effective.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Limitations</h3>
              <p className="text-sm text-muted-foreground">
                ROI does not account for time value of money, risk, or ongoing costs. It should be used alongside NPV, IRR, and payback period for comprehensive analysis.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Benchmarking</h3>
              <p className="text-sm text-muted-foreground">
                Compare your ROI against benchmarks: stock market averages 7–10% annually, real estate 8–12%, savings accounts 1–5%. Context makes ROI meaningful.
              </p>
            </div>
          </div>
        </section>

        {/* 6. ROI Formulas Explained */}
        <section className="mt-16 space-y-4" aria-label="ROI formulas explained">
          <h2 className="text-2xl font-bold tracking-tight">ROI Formulas Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Net Profit Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Net Profit = Final Value - Investment Cost</code>
              </p>
              <p className="text-sm text-muted-foreground">
                This gives the absolute dollar gain or loss. If you invested $10,000 and received $15,000, your net profit is $5,000.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">ROI Percentage Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">ROI = ((Final Value - Cost) / Cost) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Using the example: (($15,000 - $10,000) / $10,000) × 100 = 50%. This means you earned 50% on your investment.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Annualized ROI Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Annualized ROI = ((Final / Cost) ^ (1/Years) - 1) × 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For 50% total ROI over 3 years: ((1.50) ^ (1/3) - 1) × 100 = 14.47% per year. This enables fair comparison across different holding periods.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Quick Mental Math</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Final Value = Cost × (1 + ROI/100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                To find what a 20% ROI on $5,000 looks like: $5,000 × 1.20 = $6,000 final value. Useful for quick estimates without a calculator.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Stock Market Investments", desc: "Calculate the return on individual stocks, ETFs, or your entire portfolio by entering the purchase cost and current market value." },
              { title: "Real Estate", desc: "Evaluate property investments by comparing purchase price plus improvements against the sale price or current appraised value." },
              { title: "Marketing Campaigns", desc: "Measure marketing effectiveness by comparing campaign costs against the revenue or profit generated from that campaign." },
              { title: "Business Projects", desc: "Evaluate capital expenditures like new equipment, software, or expansions by comparing the investment against projected returns." },
              { title: "Education Investment", desc: "Calculate the ROI of a degree or certification by comparing tuition costs against the expected salary increase over your career." },
              { title: "Cryptocurrency", desc: "Track crypto investment returns including the initial buy-in cost and current portfolio value." },
              { title: "Startup Ventures", desc: "Evaluate angel investments or venture capital by comparing the invested amount against the current valuation or exit value." },
              { title: "Home Renovations", desc: "Determine if a renovation is worth the cost by comparing the improvement expense against the increase in home value." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. ROI Benchmarks by Investment Type */}
        <section className="mt-16 space-y-4" aria-label="ROI benchmarks">
          <h2 className="text-2xl font-bold tracking-tight">ROI Benchmarks by Investment Type</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { type: "Stock Market (S&P 500)", roi: "7–10%/yr", note: "Historical average annual return before inflation" },
              { type: "Real Estate", roi: "8–12%/yr", note: "Includes appreciation and rental income" },
              { type: "Government Bonds", roi: "2–5%/yr", note: "Low risk, predictable returns" },
              { type: "Corporate Bonds", roi: "4–7%/yr", note: "Moderate risk, higher than government bonds" },
              { type: "Savings Accounts", roi: "1–5%/yr", note: "Virtually risk-free, liquid" },
              { type: "Venture Capital", roi: "25%+/yr target", note: "Very high risk, most investments fail" },
              { type: "Small Business", roi: "15–30%/yr", note: "High effort required, variable returns" },
              { type: "Cryptocurrency", roi: "Highly variable", note: "Extreme volatility, -100% to 1000%+ possible" },
            ].map((item) => (
              <div key={item.type} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.type}</h3>
                  <span className="font-mono text-sm font-bold text-primary">{item.roi}</span>
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
