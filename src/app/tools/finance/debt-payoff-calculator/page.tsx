import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DebtPayoffCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DebtPayoffCalculatorPage() {
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

        <section className="mt-8" aria-label="Debt Payoff Calculator Tool">
          <DebtPayoffCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Debt Payoff Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Review your debts</span> — The calculator starts with 3 sample debts. Edit or remove them as needed.</li>
            <li><span className="text-foreground font-medium">Add your real debts</span> — Enter name, balance, interest rate, and minimum payment for each debt.</li>
            <li><span className="text-foreground font-medium">Set extra payment</span> — Enter any additional amount you can pay beyond minimums each month.</li>
            <li><span className="text-foreground font-medium">Compare methods</span> — View the side-by-side comparison showing total interest and months for each strategy.</li>
            <li><span className="text-foreground font-medium">View schedules</span> — Switch between Snowball and Avalanche tabs to see the month-by-month payoff timeline.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Side-by-side Snowball vs Avalanche comparison", "Total interest savings highlighted for Avalanche method", "Add unlimited debts with custom details", "Month-by-month payoff schedule with 'Paid Off' indicators", "Tabbed schedule view to switch between methods easily", "Summary cards showing months, total interest, and total paid", "Pre-loaded sample debts for quick testing", "Fully responsive — works on all devices", "100% client-side — your debt data stays private"].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Debt Payoff Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["The avalanche method saves the most money on interest by targeting the highest-rate debt first.","The snowball method provides psychological wins by eliminating the smallest debts first.","Calculate your monthly budget for extra payments with our Cost of Living Calculator.","Understand your available income after taxes with our Salary After Tax Calculator.","Once debt-free, redirect payments to savings with our Retirement Savings Calculator.","Build an emergency fund to avoid new debt using our Emergency Fund Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Retirement Savings Calculator/g, '<a href="/tools/finance/retirement-savings-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Retirement Savings Calculator</a>')
                    .replace(/our Emergency Fund Calculator/g, '<a href="/tools/finance/emergency-fund-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Emergency Fund Calculator</a>')
                    .replace(/our Loan EMI Calculator/g, '<a href="/tools/finance/loan-emi-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Loan EMI Calculator</a>')
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
