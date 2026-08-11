import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MortgageAffordabilityCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MortgageAffordabilityCalculatorPage() {
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

        <section className="mt-8" aria-label="Mortgage Affordability Calculator Tool">
          <MortgageAffordabilityCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Mortgage Affordability Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your annual gross income</span> — Your total pre-tax yearly salary or household income.</li>
            <li><span className="text-foreground font-medium">Enter monthly debts</span> — Include car loans, student loans, credit card minimums, and other recurring debt.</li>
            <li><span className="text-foreground font-medium">Enter down payment</span> — The amount you have saved for the home purchase.</li>
            <li><span className="text-foreground font-medium">Set interest rate and term</span> — Current mortgage rate and desired loan duration (15, 20, or 30 years).</li>
            <li><span className="text-foreground font-medium">Review results</span> — See your max home price, loan amount, monthly payment breakdown, and DTI ratios.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "28/36 DTI rule for standard lender qualification",
              "Iterative loan amount calculation for accuracy",
              "Estimated property tax (1.1% annual) and insurance (0.5% annual)",
              "Detailed monthly payment breakdown (P&I, tax, insurance)",
              "Front-end and back-end DTI ratio display",
              "Three loan term options: 15, 20, and 30 years",
              "Visual DTI health indicators (green/red)",
              "Real-time calculation as you type",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Mortgage Affordability Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Aim for a monthly mortgage payment no more than 28% of your gross monthly income.","Include property taxes, insurance, and HOA fees in your total housing cost estimate.","Improve your affordability by paying down existing debt using our Debt Payoff Calculator.","Understand your total borrowing cost with our Loan EMI Calculator.","Calculate your true disposable income with our Salary After Tax Calculator.","Compare living costs in your target area with our Cost of Living Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Debt Payoff Calculator/g, '<a href="/tools/finance/debt-payoff-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Debt Payoff Calculator</a>')
                    .replace(/our Loan EMI Calculator/g, '<a href="/tools/finance/loan-emi-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Loan EMI Calculator</a>')
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
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
