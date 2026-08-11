import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SalaryToHourlyCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SalaryToHourlyCalculatorPage() {
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
        <section className="mt-8" aria-label="Salary to Hourly Calculator Tool">
          <SalaryToHourlyCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Salary to Hourly Calculator</h2>
          <p className="text-muted-foreground">
            Convert your salary or hourly rate in two simple modes:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Salary to Hourly mode</span> — Enter your annual salary, working hours per week (default 40), and weeks per year (default 52). Instantly see your hourly, daily, weekly, bi-weekly, semi-monthly, and monthly pay rates.
            </li>
            <li>
              <span className="text-foreground font-medium">Hourly to Salary mode</span> — Enter your hourly rate and the same work parameters. See your equivalent annual salary and all pay period breakdowns.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize your schedule</span> — Adjust hours per week and weeks per year to match your actual work arrangement. Use fewer weeks if you want to exclude unpaid time off.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy your results</span> — Click the copy button to copy all rate breakdowns to your clipboard for easy sharing or record-keeping.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Two-way conversion: Salary to Hourly and Hourly to Salary",
              "Six pay period breakdowns: hourly, daily, weekly, bi-weekly, semi-monthly, monthly",
              "Customizable hours per week and weeks per year",
              "Instant results — no calculate button needed",
              "Bi-weekly (26 paychecks) and semi-monthly (24 paychecks) distinction",
              "Copy results button for quick sharing",
              "Clear pay period explanations (e.g., 26 vs 24 paychecks)",
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

        {/* 5. Understanding Pay Periods */}
        <section className="mt-16 space-y-4" aria-label="Understanding pay periods">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Pay Periods</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Hourly Rate</h3>
              <p className="text-sm text-muted-foreground">
                Your pay per hour worked. This is the most granular rate and is essential for comparing jobs with different salary structures. It accounts for your actual time investment.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Daily Rate</h3>
              <p className="text-sm text-muted-foreground">
                Based on a standard 8-hour workday. Useful for freelance or contract work where you charge a daily rate. Daily Rate = Hourly Rate × 8.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Weekly Rate</h3>
              <p className="text-sm text-muted-foreground">
                Your total pay for one work week. Useful for budgeting and comparing weekly pay across different jobs or contract arrangements.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Bi-weekly Rate</h3>
              <p className="text-sm text-muted-foreground">
                Pay every 2 weeks, resulting in 26 paychecks per year. Two months each year you receive 3 paychecks instead of 2. This is the most common pay frequency in the US.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Semi-monthly Rate</h3>
              <p className="text-sm text-muted-foreground">
                Pay twice per month (e.g., 1st and 15th), resulting in 24 paychecks per year. Each paycheck is slightly larger than bi-weekly but comes less frequently.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Monthly Rate</h3>
              <p className="text-sm text-muted-foreground">
                Your annual salary divided by 12. Useful for monthly budgeting, rent calculations, and comparing monthly income to monthly expenses.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Salary Conversion Formulas */}
        <section className="mt-16 space-y-4" aria-label="Formulas">
          <h2 className="text-2xl font-bold tracking-tight">Salary Conversion Formulas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Salary to Hourly</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Hourly = Annual Salary / (Hours/Week × Weeks/Year)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: $75,000 / (40 × 52) = $36.06/hour. This is your gross hourly rate before taxes and deductions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Hourly to Salary</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Annual = Hourly Rate × Hours/Week × Weeks/Year</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: $35/hour × 40 × 52 = $72,800/year. This assumes you work every week of the year.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Bi-weekly vs Semi-monthly</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Bi-weekly = Salary / 26 | Semi-monthly = Salary / 24</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For $60,000: bi-weekly = $2,307.69, semi-monthly = $2,500.00. Both total $60,000/year but the per-check amount differs.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Daily Rate Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Daily = Hourly Rate × 8</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Based on a standard 8-hour day. If your workday is different, multiply by your actual daily hours instead of 8.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Comparing Job Offers", desc: "Convert two different salary offers to hourly rates to see which pays better per hour, especially if they have different work hour expectations." },
              { title: "Freelance Rate Setting", desc: "Determine what hourly rate you need to earn the same as your current salary, so you can price freelance work competitively." },
              { title: "Part-time vs Full-time", desc: "See how part-time hourly pay compares to a full-time salary on an hourly basis to make informed career decisions." },
              { title: "Budgeting by Pay Period", desc: "Use the bi-weekly or monthly breakdown to plan your budget around when you actually receive paychecks." },
              { title: "Negotiating a Raise", desc: "Calculate how much a raise request translates to in hourly, weekly, and monthly terms to present a clear case to your employer." },
              { title: "Contract Work Comparison", desc: "Compare a contract hourly rate against a permanent salary by converting both to the same pay period for an apples-to-apples comparison." },
              { title: "Overtime Calculations", desc: "Know your base hourly rate to accurately calculate overtime pay. Use our <a href=\"/tools/finance/overtime-pay-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Overtime Pay Calculator</a> for detailed OT calculations." },
              { title: "International Salary Comparison", desc: "Convert salaries from different countries to hourly rates using local work hour norms for fair comparison." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips for Accurate Conversion */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Accurate Salary Conversion</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Include All Compensation", desc: "When comparing offers, factor in bonuses, health insurance, retirement contributions, and other benefits. A $70k salary with great benefits may beat an $80k salary with none." },
              { title: "Count Actual Hours Worked", desc: "Many salaried employees work more than 40 hours/week. If you work 50 hours, your effective hourly rate is 20% lower than the nominal calculation." },
              { title: "Account for Commute Time", desc: "If you commute 1 hour daily, that's 5 hours/week of unpaid time. Subtracting commute from total work hours gives a truer picture of your hourly earnings." },
              { title: "Consider Paid Time Off", desc: "If you have 3 weeks of vacation and 10 holidays, you work 39 weeks but are paid for 52. Use 52 weeks for the nominal rate (what your employer pays per hour)." },
              { title: "Factor in Unpaid Overtime", desc: "If you regularly work unpaid overtime as a salaried employee, your true hourly rate is lower. Track your actual hours for a month to get a realistic number." },
              { title: "Use Gross for Comparison", desc: "This calculator shows gross (pre-tax) rates. Use gross numbers when comparing offers since tax situations vary. Net comparisons can be misleading." },
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
