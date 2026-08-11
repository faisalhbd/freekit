import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { EmergencyFundCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function EmergencyFundCalculatorPage() {
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

        <section className="mt-8" aria-label="Emergency Fund Calculator Tool">
          <EmergencyFundCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Emergency Fund Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter monthly expenses</span> — Include essential costs only: rent, utilities, groceries, insurance, minimum debt payments.</li>
            <li><span className="text-foreground font-medium">Enter current savings</span> — Any money already set aside for emergencies.</li>
            <li><span className="text-foreground font-medium">Set monthly contribution</span> — How much you can add each month from your budget.</li>
            <li><span className="text-foreground font-medium">Adjust coverage slider</span> — Slide between 1-12 months (6 months is recommended).</li>
            <li><span className="text-foreground font-medium">Review progress</span> — See your gap, progress bar, timeline, and month-by-month projection.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Coverage slider from 1-12 months with visual labels", "Automatic target calculation based on expenses and coverage", "Progress bar showing how close you are to your goal", "Month-by-month projection table to track your timeline", "Smart tips based on coverage level (minimum/recommended/excellent)", "Summary cards for target, gap, progress %, and months to goal", "Fully responsive — check your progress on any device", "100% client-side — your financial data stays private"].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Emergency Fund Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Financial experts recommend 3-6 months of essential expenses as your emergency fund target.","Start with a smaller goal like one month of expenses, then build up gradually.","Calculate your exact monthly expenses using our Cost of Living Calculator.","Understand your savings capacity after taxes with our Salary After Tax Calculator.","Pay off high-interest debt first with our Debt Payoff Calculator to free up savings.","Protect your savings from inflation with our Compound Interest Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Debt Payoff Calculator/g, '<a href="/tools/finance/debt-payoff-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Debt Payoff Calculator</a>')
                    .replace(/our Compound Interest Calculator/g, '<a href="/tools/finance/compound-interest-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Compound Interest Calculator</a>')
                    .replace(/our Retirement Savings Calculator/g, '<a href="/tools/finance/retirement-savings-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Retirement Savings Calculator</a>')
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
