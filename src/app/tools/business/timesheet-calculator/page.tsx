import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TimesheetCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TimesheetCalculatorPage() {
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
        <section className="mt-8" aria-label="Timesheet Calculator Tool">
          <TimesheetCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Timesheet Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your weekly work hours and pay in a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Set your overtime threshold</span> — The default is 8 hours per day. Adjust this to match your company policy or local labor laws.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your hourly rate</span> — Optionally enter your hourly wage to see pay calculations.
            </li>
            <li>
              <span className="text-foreground font-medium">Clock in and out for each day</span> — Use the time inputs to enter when you started and finished work each day (Mon–Sun).
            </li>
            <li>
              <span className="text-foreground font-medium">Review your weekly summary</span> — Regular hours, overtime hours, and total pay are calculated automatically.
            </li>
            <li>
              <span className="text-foreground font-medium">Print or reset</span> — Print the timesheet for your records or reset to start a new week.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "7-day weekly timesheet (Monday through Sunday)",
              "Clock-in and clock-out time inputs for each day",
              "Auto-calculation of daily regular and overtime hours",
              "Configurable overtime threshold (default 8 hours/day)",
              "Overtime pay calculated at 1.5x standard rate",
              "Hourly rate input for total pay computation",
              "Weekly summary with regular, overtime, and total hours",
              "Detailed pay breakdown showing all calculations",
              "Support for overnight shifts (crosses midnight)",
              "Print-ready output and one-click reset",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Overtime Calculations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">What is Overtime?</h3>
              <p className="text-sm text-muted-foreground">
                Overtime refers to hours worked beyond the standard workday threshold. In most jurisdictions, overtime must be compensated at a higher rate than regular hours, typically 1.5 times the normal hourly rate.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Daily vs. Weekly Overtime</h3>
              <p className="text-sm text-muted-foreground">
                This calculator uses daily overtime — any hours beyond the daily threshold count as overtime. Some regions also have weekly overtime (e.g., over 40 hours/week). Check your local laws for applicable rules.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Overtime Pay Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Overtime Pay = OT Hours × Rate × 1.5</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For a $20/hr rate with 3 overtime hours: 3 × $20 × 1.5 = $90 in overtime pay.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Hourly Employee Payroll", desc: "Track daily clock-in and clock-out times to calculate weekly pay with overtime for hourly workers." },
              { title: "Freelancer Time Tracking", desc: "Log hours worked each day for client billing, with clear regular and overtime breakdowns." },
              { title: "Shift Workers", desc: "Track variable shift schedules including overnight shifts that cross midnight." },
              { title: "Part-Time Workers", desc: "Calculate hours for part-time schedules by leaving non-working days blank." },
              { title: "Overtime Verification", desc: "Verify that your paycheck correctly reflects the overtime hours you worked during a pay period." },
              { title: "Project Time Tracking", desc: "Track hours spent on a specific project throughout the week for accurate billing and reporting." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Timesheet Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Timesheet best practices">
          <h2 className="text-2xl font-bold tracking-tight">Timesheet Best Practices</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Record Daily", desc: "Enter your times at the end of each workday. Relying on memory at the end of the week leads to inaccuracies and lost hours." },
              { title: "Be Precise", desc: "Use exact clock-in and clock-out times rather than rounding. Even 15 minutes of rounding per day adds up to over an hour per week." },
              { title: "Include Breaks", desc: "If your employer deducts break time, clock out for lunch and clock back in. Unpaid breaks should not be included in your total hours." },
              { title: "Keep Records", desc: "Print or save your weekly timesheets. Having a personal record protects you in case of payroll disputes." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Overtime Laws by Region */}
        <section className="mt-16 space-y-4" aria-label="Overtime laws">
          <h2 className="text-2xl font-bold tracking-tight">Overtime Laws Overview</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { region: "United States (FLSA)", rule: "1.5x after 40 hours/week. Some states have daily OT (e.g., California: 1.5x after 8h/day, 2x after 12h/day)." },
              { region: "European Union", rule: "Maximum 48 hours/week average. Overtime rates vary by country — many require extra pay but rate is not federally mandated." },
              { region: "United Kingdom", rule: "No statutory overtime rate, but most contracts specify 1.5x. Workers can opt out of the 48-hour maximum." },
              { region: "Australia", rule: "1.5x for first 2 hours, 2x after that. Penalty rates also apply for weekends and holidays." },
              { region: "Canada", rule: "Varies by province. Most provinces require 1.5x after 44 or 48 hours/week. Some have daily OT." },
              { region: "India", rule: "Overtime is typically 2x the regular rate after 9 hours/day or 48 hours/week under the Factories Act." },
            ].map((item) => (
              <div key={item.region} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.region}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.rule}</p>
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
