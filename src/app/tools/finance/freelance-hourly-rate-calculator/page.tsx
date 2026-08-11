import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { FreelanceHourlyRateCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function FreelanceHourlyRateCalculatorPage() {
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
        <ToolHeader tool={toolConfig} />

        <section className="mt-8" aria-label="Freelance Hourly Rate Calculator Tool">
          <FreelanceHourlyRateCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Freelance Hourly Rate Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter desired annual salary</span> — The take-home amount you want after taxes and expenses.</li>
            <li><span className="text-foreground font-medium">Add business expenses</span> — Software, equipment, insurance, coworking, and other annual costs.</li>
            <li><span className="text-foreground font-medium">Set tax rate</span> — Include income tax plus self-employment tax (15.3% FICA in the US).</li>
            <li><span className="text-foreground font-medium">Enter time off and availability</span> — Vacation days, sick days, billable hours per day, and work days per week.</li>
            <li><span className="text-foreground font-medium">Review your rate</span> — See required hourly rate, daily rate, and a full calculation breakdown.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Accounts for salary, expenses, and taxes",
              "Adjustable billable hours slider (1-10 hours/day)",
              "Working days per week slider (1-7)",
              "Vacation and sick day inputs",
              "Daily rate and weekly revenue calculation",
              "Step-by-step calculation breakdown",
              "Tax-inclusive revenue formula",
              "Real-time results as you adjust sliders",
              "100% client-side — no data leaves your browser",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Freelance Hourly Rate Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Include all business expenses like software subscriptions, equipment, and self-employment taxes.","Factor in non-billable hours — most freelancers can only bill 60-70% of their work time.","Calculate your take-home pay from that hourly rate using our Salary After Tax Calculator.","Track your project costs and compare with our Cost of Living Calculator to set realistic rates.","Plan for taxes and savings with our Compound Interest Calculator for investment growth.","Understand your profit margins on projects using our Profit Margin Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Compound Interest Calculator/g, '<a href="/tools/finance/compound-interest-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Compound Interest Calculator</a>')
                    .replace(/our Profit Margin Calculator/g, '<a href="/tools/finance/profit-margin-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Profit Margin Calculator</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
