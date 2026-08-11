import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CronExpressionParserTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function CronExpressionParserPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Component */}
        <section className="mt-8" aria-label="Cron Expression Parser">
          <CronExpressionParserTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Cron Expression Parser</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter a cron expression</span> — Type or paste a standard 5-field cron expression in the input field. The format is: minute hour day-of-month month day-of-week (e.g., <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">*/5 * * * *</code>).</li>
            <li><span className="text-foreground font-medium">Use presets</span> — Click any preset button (Every 5 min, Hourly, Daily midnight, etc.) to quickly load a common cron expression and see how it works.</li>
            <li><span className="text-foreground font-medium">Read the description</span> — A human-readable description appears instantly, explaining in plain English what the cron expression does (e.g., "Every 5 minutes").</li>
            <li><span className="text-foreground font-medium">Review the field breakdown</span> — Each of the 5 fields is shown separately with its raw value, a plain-English explanation, and the valid range. This helps you understand each part of the expression.</li>
            <li><span className="text-foreground font-medium">Check next executions</span> — The tool calculates and displays the next 10 execution times in your local timezone, so you can verify the schedule is correct.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Standard 5-field cron expression support (minute, hour, day, month, day-of-week)",
              "Human-readable description generated in plain English",
              "Field-by-field breakdown with range information and error messages",
              "Next 10 execution times calculated from current local time",
              "6 common presets: every 5 min, hourly, daily, weekly, monthly, weekdays 9-5",
              "Supports ranges (1-5), steps (*/5), lists (1,3,5), and combined syntax (1-5/2)",
              "Month names (JAN-DEC) and day-of-week names (MON-SUN) accepted",
              "Real-time validation with clear error messages for invalid expressions",
              "100% client-side — no expressions are sent to any server",
              "Responsive design — works on desktop and mobile",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Key Concepts */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Cron Expressions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is Cron?",
                d: "Cron is a time-based job scheduler in Unix-like operating systems. The name comes from the Greek word 'chronos' (time). Users schedule jobs (called 'cron jobs') using cron expressions, which are evaluated by the cron daemon at one-minute intervals.",
              },
              {
                t: "The 5 Fields",
                d: "A cron expression has 5 fields separated by spaces: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6). Each field can use asterisks (*), ranges (1-5), steps (*/5), comma-separated lists (1,3,5), or combinations.",
              },
              {
                t: "Special Characters",
                d: "* means 'every value in range'. */n means 'every nth value'. n-m means 'from n to m inclusive'. n,m means 'both n and m'. These can be combined: 1-5/2 means 1,3,5 (every 2nd value from 1 to 5).",
              },
              {
                t: "Day of Month vs Day of Week",
                d: "When both day-of-month and day-of-week are restricted (not *), traditional cron runs the command when either matches (OR logic). Some modern cron implementations allow AND logic with special characters. This parser shows each field's meaning separately.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Debugging Cron Jobs", d: "When a scheduled task is not running as expected, paste the cron expression into the parser to verify it means what you think it means. Check the next execution times to confirm the schedule." },
              { t: "Learning Cron Syntax", d: "If you are new to cron expressions, use the presets and field breakdown to learn how each field works. Experiment with different expressions to understand ranges, steps, and lists." },
              { t: "Code Review", d: "When reviewing pull requests that modify cron schedules, use the parser to quickly understand what the new expression does without having to mentally calculate the schedule." },
              { t: "Documentation", d: "Use the human-readable descriptions in your project documentation to explain cron schedules to team members who are not familiar with cron syntax." },
              { t: "Cloud Configuration", d: "When configuring scheduled tasks in AWS EventBridge, Google Cloud Scheduler, or Azure Functions, use the parser to verify your cron expression before deploying." },
              { t: "Migration Verification", d: "When migrating scheduled tasks between systems with different cron implementations, verify that the expressions produce the same schedule by checking the next execution times." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Cron Expression Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `Always test your cron expression with the parser before deploying. A small mistake like using 0-6 instead of 1-5 in the day-of-week field can cause tasks to run on the wrong days.` },
              { html: `Use the next execution times to verify your schedule. If you expect a task to run on weekdays but see Saturday times in the list, the expression needs adjustment.` },
              { html: `When both day-of-month and day-of-week are specified, most cron implementations use OR logic (run if either matches). If you need AND logic, check your specific cron implementation's documentation.` },
              { html: `For tasks that need to run at a specific timezone, set the TZ environment variable in your cron environment. The parser shows times in your browser's local timezone.` },
              { html: `Common mistake: using * in the day-of-month field when you only want to run on specific days of the week. Remember that * means 'every day', so pair it with the correct day-of-week value.` },
              { html: `After understanding a cron expression, you might need to convert the execution times. Use <a href="/tools/developer/timestamp-converter" class="${LINK_CLASS}">Timestamp Converter</a> to convert between time formats and timezones.` },
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip.html }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
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
