import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CompoundInterestCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CompoundInterestCalculatorPage() {
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
        <section className="mt-8" aria-label="Compound Interest Calculator Tool">
          <CompoundInterestCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Compound Interest Calculator</h2>
          <p className="text-muted-foreground">
            Calculate the future value of your investment in four simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your principal amount</span> — The initial amount you are investing or saving.
            </li>
            <li>
              <span className="text-foreground font-medium">Set the annual interest rate</span> — The expected annual return rate on your investment (e.g., 7 for 7%).
            </li>
            <li>
              <span className="text-foreground font-medium">Choose the time period and compounding frequency</span> — Enter how long you will invest and how often interest compounds (monthly is most common for savings accounts).
            </li>
            <li>
              <span className="text-foreground font-medium">Add monthly contributions (optional)</span> — Enter any regular monthly deposits. Click Calculate to see your future value, total interest, and a year-by-year growth table.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Five compounding frequencies: Annually, Semi-annually, Quarterly, Monthly, Daily",
              "Optional monthly contributions for realistic savings/investment planning",
              "Time input in years or months with a toggle switch",
              "Result cards for Future Value, Total Interest, and Total Contributions",
              "Year-by-year growth breakdown table with balance, interest, and contributions",
              "Expandable table — shows first 10 years, click to view all",
              "Compound interest formula display with variable explanations",
              "Copy results button for quick sharing",
              "Input validation with clear error messages",
              "100% browser-based — no server, no data collection",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Compound Interest Formula Explained */}
        <section className="mt-16 space-y-4" aria-label="Formula explained">
          <h2 className="text-2xl font-bold tracking-tight">Compound Interest Formula Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">A = P(1 + r/n)^(nt)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Where A is the future value, P is the principal, r is the annual interest rate (decimal), n is the number of compounding periods per year, and t is the time in years.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Compounding Frequency</h3>
              <p className="text-sm text-muted-foreground">
                More frequent compounding yields higher returns. Annual (n=1), Semi-annual (n=2), Quarterly (n=4), Monthly (n=12), Daily (n=365). The difference between monthly and daily is usually very small.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The Power of Time</h3>
              <p className="text-sm text-muted-foreground">
                Time is the most powerful factor in compound interest. $10,000 at 8% for 10 years grows to $21,589. For 20 years: $46,610. For 30 years: $100,627. Each additional decade more than doubles your money.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Monthly Contributions</h3>
              <p className="text-sm text-muted-foreground">
                Each contribution begins earning compound interest immediately. $200/month for 30 years at 7% on a $10,000 initial investment grows from $10,000 to over $265,000. The $72,000 in contributions becomes $183,000+ in interest.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Rule of 72</h3>
              <p className="text-sm text-muted-foreground">
                Divide 72 by your interest rate to estimate doubling time. At 6%: 72/6 = 12 years to double. At 9%: 8 years. At 12%: 6 years. This quick mental math helps you compare investment options.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Example Calculation</h3>
              <p className="text-sm text-muted-foreground">
                $5,000 at 6% compounded monthly for 15 years: A = 5000 × (1 + 0.06/12)^(12×15) = 5000 × (1.005)^180 = $12,363.82. Total interest earned: $7,363.82.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Savings Account Growth", desc: "Estimate how your savings account balance will grow over time. Enter your current balance, the APY, and see your projected balance in 5, 10, or 20 years." },
              { title: "Retirement Planning", desc: "Project your retirement savings by entering your current balance, expected return rate, and monthly 401(k) or IRA contributions. See if you are on track for your retirement goal." },
              { title: "Education Fund", desc: "Calculate how much a 529 plan or education savings account will be worth when your child reaches college age, based on current contributions and expected returns." },
              { title: "Investment Comparison", desc: "Compare different investment options by running the calculator with different interest rates. See the impact of a 1% difference over 20 or 30 years." },
              { title: "Emergency Fund Growth", desc: "Track how your emergency fund grows in a high-yield savings account. Even 4-5% APY makes a significant difference on a $20,000 fund over several years." },
              { title: "Debt Cost Analysis", desc: "Understand how compound interest works against you with debt. Enter your loan balance and interest rate to see how much you will ultimately pay. Use our <a href='/tools/calculator/loan-emi-calculator' class='font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors'>Loan EMI Calculator</a> for repayment planning." },
              { title: "Real Estate Investment", desc: "Project the growth of invested capital in real estate. Factor in expected appreciation rates and additional monthly investments in property or REITs." },
              { title: "Inflation Impact Analysis", desc: "Run the calculator at different rates (e.g., your investment return vs. inflation rate) to understand real vs. nominal returns. If inflation averages 3% and your investment returns 7%, your real return is approximately 4%." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips for Growing Your Money */}
        <section className="mt-16 space-y-4" aria-label="Tips for growing money">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Maximizing Compound Interest</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Start investing as early as possible. Time is the single most important factor in compound interest. $1,000 invested at age 25 at 8% grows to $21,725 by age 65. The same $1,000 invested at age 35 grows to only $10,063. Starting 10 years earlier more than doubles your result.",
              "Automate your contributions. Set up automatic monthly transfers to your investment account. Consistency matters more than amount — $100/month for 30 years at 7% grows to over $121,000. Automating removes the temptation to skip months.",
              'Increase contributions annually. Every time you get a raise, increase your investment contribution by at least half the raise amount. This \'pay yourself first\' strategy accelerates wealth building without reducing your lifestyle.',
              "Reinvest all dividends and earnings. Choosing to reinvest rather than withdraw means your earnings immediately start compounding. In a dividend reinvestment plan (DRIP), dividends buy more shares, which generate more dividends.",
              "Minimize investment fees. A 1% annual fee on a $100,000 investment over 30 years at 8% costs over $140,000 in lost growth. Look for low-cost index funds (0.03-0.2% fees) instead of actively managed funds (1-2% fees).",
              "Use tax-advantaged accounts. 401(k), IRA, Roth IRA, and similar accounts let your money compound tax-free or tax-deferred. This can be worth tens of thousands of dollars over decades compared to taxable accounts.",
              "Understand risk vs. return. Higher potential returns come with higher volatility. Diversify across asset classes (stocks, bonds, real estate) to manage risk while still achieving solid long-term compound growth.",
              "Do not interrupt compounding. Withdrawing money from your investments resets the compounding clock. Even a small early withdrawal can cost thousands in lost future growth. Keep an emergency fund separate to avoid tapping investments.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Compounding Frequency Comparison */}
        <section className="mt-16 space-y-4" aria-label="Frequency comparison">
          <h2 className="text-2xl font-bold tracking-tight">Compounding Frequency Comparison</h2>
          <p className="text-muted-foreground">
            The table below shows how $10,000 at 8% interest grows over 20 years with different compounding frequencies:
          </p>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium text-xs">Frequency</th>
                    <th className="text-right p-3 font-medium text-xs">Future Value</th>
                    <th className="text-right p-3 font-medium text-xs">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { freq: "Annually (1x)", fv: 46609.57 },
                    { freq: "Semi-annually (2x)", fv: 48021.79 },
                    { freq: "Quarterly (4x)", fv: 48754.16 },
                    { freq: "Monthly (12x)", fv: 49268.03 },
                    { freq: "Daily (365x)", fv: 49516.16 },
                  ].map((row) => (
                    <tr key={row.freq} className="border-t border-border">
                      <td className="p-3 text-sm font-medium">{row.freq}</td>
                      <td className="p-3 font-mono text-sm text-right font-semibold">{row.fv.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td className="p-3 font-mono text-sm text-right text-primary">{(row.fv - 10000).toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            The difference between annual and daily compounding is about $2,907 on a $10,000 investment over 20 years. While significant in absolute terms, the percentage difference shrinks at lower interest rates and shorter time periods.
          </p>
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
