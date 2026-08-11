import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DaysBetweenDatesTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DaysBetweenDatesPage() {
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
        <section className="mt-8" aria-label="Days Between Dates Calculator">
          <DaysBetweenDatesTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Calculate Days Between Two Dates</h2>
          <p className="text-muted-foreground">
            Finding the number of days between two dates is fast and straightforward:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter the start date</span> — Use the date picker to select the beginning date or type it in YYYY-MM-DD format.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter the end date</span> — Select the target date, or click &ldquo;End: Today&rdquo; to quickly use today&apos;s date.
            </li>
            <li>
              <span className="text-foreground font-medium">Toggle Business Days Mode</span> — Enable this switch to highlight working days (Monday through Friday) in the results, useful for project planning.
            </li>
            <li>
              <span className="text-foreground font-medium">Click &ldquo;Calculate Difference&rdquo;</span> — Instantly view results in days, weeks, months, years, business days, and a visual weekday/weekend breakdown.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Multiple breakdown formats: total days, weeks + days, months + days, years + months + days",
              "Business days calculation (Monday–Friday) with weekend day count",
              "Visual breakdown bar showing weekday vs weekend percentage",
              "Quick presets: 30 days, 90 days, and 1 year from today",
              "\"End: Today\" button for instant current-date calculations",
              "Swap button to quickly reverse start and end dates",
              "Total hours, minutes, and business hours derived from the day count",
              "Summary badges for at-a-glance approximate conversions",
              "Calendar-aware month and year calculations respecting varying month lengths",
              "100% browser-based — no data sent to any server",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Understanding Date Differences */}
        <section className="mt-16 space-y-4" aria-label="Understanding date differences">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Date Differences</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Inclusive vs. Exclusive Counting</h3>
              <p className="text-sm text-muted-foreground">
                By default, the calculator counts the difference exclusive of the start date. If you
                select January 1 and January 3, the result is 2 days. To include the start date in
                your count (e.g., for counting total event days), add 1 to the total days result.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Business Days vs. Calendar Days</h3>
              <p className="text-sm text-muted-foreground">
                Business days exclude Saturdays and Sundays, which is the standard for most countries.
                However, public holidays are not automatically excluded because they vary by region.
                Manually subtract known holidays from the business days result for precise work-day counts.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Leap Year Impact</h3>
              <p className="text-sm text-muted-foreground">
                Leap years add an extra day (February 29) to the calendar, affecting date differences that
                span across February. The calculator automatically handles this — if your date range
                crosses a leap year February, the extra day is included in the total count.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Calendar vs. Fixed-Unit Breakdown</h3>
              <p className="text-sm text-muted-foreground">
                The &ldquo;Months + Days&rdquo; result is calendar-aware, meaning each month is counted
                by its actual length (28–31 days). The &ldquo;Weeks + Days&rdquo; result uses fixed
                7-day weeks. These approaches can give different views of the same date span.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Project Deadlines", desc: "Count the remaining business days before a project deadline to allocate resources effectively." },
              { title: "Event Countdowns", desc: "Calculate days until a wedding, vacation, conference, or birthday celebration." },
              { title: "Contract Duration", desc: "Determine the exact length of a lease, subscription, or employment contract in days and months." },
              { title: "Age of an Item", desc: "Find out how many days a product has been in use, how long since a purchase, or the age of equipment." },
              { title: "Sprint Planning", desc: "Use the 30-day or 90-day preset to quickly see available working days for Agile sprint cycles." },
              { title: "Financial Calculations", desc: "Calculate day-count for interest accrual, payment schedules, or invoice aging reports." },
              { title: "Travel Planning", desc: "Count total days and weekdays for business trips or vacation planning." },
              { title: "Fitness Goals", desc: "Track the number of days since you started a workout program or diet plan." },
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using the Days Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use the \"End: Today\" button to quickly set the end date to the current day.",
              "Click the swap button between the two date fields to instantly reverse start and end dates.",
              "Enable Business Days Mode when planning work schedules — the tool will highlight Mon–Fri counts.",
              "The 30 days, 90 days, and 1 year presets start from today and auto-fill both date fields.",
              "For event spans (e.g., a 3-day conference from Friday to Sunday), add 1 to the total days result.",
              "The visual breakdown bar shows the weekday-to-weekend ratio at a glance — useful for staffing plans.",
              "Check the \"Business Hours\" card to estimate total work hours (based on 8-hour workdays, excluding weekends).",
              "Need to convert between time zones? Try our <a href=\"/tools/calculator/time-zone-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Time Zone Converter</a>.",
              "Want to find your exact age in multiple units? Use our <a href=\"/tools/calculator/age-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Age Calculator</a>.",
              "Looking for percentage-based calculations? Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> has you covered.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Date Formats Around the World */}
        <section className="mt-16 space-y-4" aria-label="Date formats">
          <h2 className="text-2xl font-bold tracking-tight">Date Formats Around the World</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">ISO 8601 (YYYY-MM-DD)</h3>
              <p className="text-sm text-muted-foreground">
                The international standard format used by this calculator. Dates are written with the
                year first, then month, then day. This format eliminates ambiguity — unlike MM/DD/YYYY
                or DD/MM/YYYY, there is no confusion between month and day.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">US Format (MM/DD/YYYY)</h3>
              <p className="text-sm text-muted-foreground">
                Common in the United States, this format places the month before the day. For example,
                January 15, 2025 is written as 01/15/2025. This can be confused with the DD/MM format
                when the day value is 12 or less.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">European Format (DD/MM/YYYY)</h3>
              <p className="text-sm text-muted-foreground">
                Used in most of Europe, Latin America, and Australia. January 15, 2025 is written as
                15/01/2025. This format also appears ambiguous when the day is 12 or less without context,
                which is why ISO 8601 is preferred for international communication.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Why ISO 8601 Matters</h3>
              <p className="text-sm text-muted-foreground">
                Using YYYY-MM-DD ensures dates sort correctly as strings (e.g., in filenames or spreadsheets)
                and are unambiguous across all regions. Our calculator uses this format internally for
                precise and reliable date arithmetic in every timezone.
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
