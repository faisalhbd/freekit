import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { OvertimePayCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function OvertimePayCalculatorPage() {
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
        <section className="mt-8" aria-label="Overtime Pay Calculator Tool">
          <OvertimePayCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Overtime Pay Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your weekly pay including overtime in two modes:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Single Tier mode</span> — Enter your hourly rate, regular hours per week (default 40), total hours worked, and OT multiplier (default 1.5). See regular pay, OT hours, OT rate, OT pay, and total pay.
            </li>
            <li>
              <span className="text-foreground font-medium">Two Tier mode</span> — For states like California, enter the double-time threshold (e.g., 48 hours). Hours beyond 40 get 1.5×, hours beyond the threshold get 2×.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the multiplier</span> — While 1.5 is standard, you can set any multiplier (e.g., 2 for pure double-time, or 1.25 for some union agreements).
            </li>
            <li>
              <span className="text-foreground font-medium">Copy your weekly summary</span> — Click the copy button to copy the full breakdown for record-keeping or sharing.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Two modes: Single Tier (1.5×) and Two Tier (1.5× + 2×)",
              "Customizable overtime multiplier (1.25×, 1.5×, 2×, or any value)",
              "Adjustable regular hours threshold (default 40)",
              "Adjustable double-time threshold for two-tier mode",
              "Detailed breakdown: regular pay, OT rate, OT pay, total",
              "Alert when no overtime hours are detected",
              "Copy results button for quick sharing",
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

        {/* 5. Understanding Overtime */}
        <section className="mt-16 space-y-4" aria-label="Understanding overtime">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Overtime Pay</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Federal Overtime Law (FLSA)</h3>
              <p className="text-sm text-muted-foreground">
                The Fair Labor Standards Act requires non-exempt employees to receive at least 1.5× their regular rate for hours worked over 40 in a work week. This applies nationwide in the US.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Time and a Half (1.5×)</h3>
              <p className="text-sm text-muted-foreground">
                The most common overtime rate. For a $20/hour employee, time and a half is $30/hour. Working 8 OT hours earns $240 extra on top of regular pay.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Double Time (2×)</h3>
              <p className="text-sm text-muted-foreground">
                Double the regular rate. Required in some states (California) for hours beyond certain thresholds. For $20/hour, double time is $40/hour.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Exempt vs Non-Exempt</h3>
              <p className="text-sm text-muted-foreground">
                Exempt employees (executive, administrative, professional roles above salary threshold) are not entitled to OT. Non-exempt employees must receive OT pay regardless of salary or hourly status.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">State-Specific Rules</h3>
              <p className="text-sm text-muted-foreground">
                California: 1.5× after 8h/day, 2× after 12h/day. Alaska: 1.5× after 8h/day. Colorado: 1.5× after 12h/day. Always check your state&apos;s labor laws.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Weekly Work Week</h3>
              <p className="text-sm text-muted-foreground">
                A work week is a fixed, recurring 168-hour period (7 consecutive 24-hour periods). It does not have to align with the calendar week — your employer defines the start day.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Overtime Formulas */}
        <section className="mt-16 space-y-4" aria-label="Overtime formulas">
          <h2 className="text-2xl font-bold tracking-tight">Overtime Pay Formulas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Single Tier Overtime</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">OT Hours = Total Hours - Regular Hours</code>
              </p>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">OT Rate = Hourly Rate × Multiplier</code>
              </p>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">OT Pay = OT Hours × OT Rate</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: 48h worked, $20/hr → 8 OT hours × $30 = $240 OT pay + $800 regular = $1,040 total.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Two Tier Overtime (California-style)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tier 1 (1.5×): hours from 40 to threshold</code>
              </p>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tier 2 (2×): hours beyond threshold</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Example: 52h worked at $20/hr, 48h threshold → 40h regular ($800) + 8h at $30 ($240) + 4h at $40 ($160) = $1,200 total.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Weekly Paycheck Verification", desc: "Verify your paycheck by entering your actual hours worked and hourly rate. Compare the calculator's total against your pay stub to ensure you were paid correctly." },
              { title: "Comparing Job Offers", desc: "Compare two jobs where one has more overtime potential. Calculate total weekly earnings at expected hours to see which offer actually pays more." },
              { title: "California Employees", desc: "Use the two-tier mode to calculate pay with California's daily and weekly overtime rules. Enter 8 as the double-time threshold for daily OT compliance." },
              { title: "Freelance Overtime", desc: "If you have a contract that includes overtime provisions, calculate what you should be paid for extra hours worked beyond the agreed scope." },
              { title: "Shift Workers", desc: "Nurses, factory workers, and other shift employees who frequently work overtime can project weekly earnings based on scheduled hours." },
              { title: "Small Business Payroll", desc: "Small business owners can quickly calculate overtime pay for hourly employees without complex payroll software." },
              { title: "Union Contract Analysis", desc: "Some union contracts specify unique overtime multipliers. Enter the custom multiplier to see how it affects total weekly pay." },
              { title: "Budget Planning", desc: "Know your base pay and potential overtime earnings to plan your monthly budget. Use the <a href=\"/tools/finance/salary-to-hourly-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Salary to Hourly Calculator</a> to first find your hourly rate from salary." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Overtime by State */}
        <section className="mt-16 space-y-4" aria-label="Overtime by state">
          <h2 className="text-2xl font-bold tracking-tight">Overtime Rules by State</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { state: "Federal (FLSA)", rule: "1.5× after 40h/week", note: "Applies to all non-exempt employees nationwide" },
              { state: "California", rule: "1.5× after 8h/day, 2× after 12h/day", note: "Most generous OT laws in the US" },
              { state: "Alaska", rule: "1.5× after 8h/day, 40h/week", note: "Daily OT required beyond 8 hours" },
              { state: "Colorado", rule: "1.5× after 12h/day, 40h/week", note: "Daily OT after 12 hours, weekly after 40" },
              { state: "Nevada", rule: "1.5× after 8h/day, 40h/week", note: "Daily OT unless employee earns >1.5× minimum wage" },
              { state: "Washington", rule: "1.5× after 40h/week", note: "Matches federal, no daily OT requirement" },
              { state: "Oregon", rule: "1.5× after 40h/week", note: "Matches federal standard" },
              { state: "New York", rule: "1.5× after 40h/week", note: "Matches federal standard" },
            ].map((item) => (
              <div key={item.state} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{item.state}</h3>
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{item.rule}</span>
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
