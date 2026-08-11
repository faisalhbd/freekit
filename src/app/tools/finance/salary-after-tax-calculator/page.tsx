import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SalaryAfterTaxCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SalaryAfterTaxCalculatorPage() {
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

        <section className="mt-8" aria-label="Salary After Tax Calculator Tool">
          <SalaryAfterTaxCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Salary After Tax Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your gross annual salary</span> — Type your total yearly compensation before any deductions.</li>
            <li><span className="text-foreground font-medium">Select your filing status</span> — Choose Single, Married Filing Jointly, or Head of Household to use the correct 2024 tax brackets.</li>
            <li><span className="text-foreground font-medium">Enter your state tax rate</span> — Provide your effective state income tax rate as a percentage. Use 0 if you live in a state with no income tax.</li>
            <li><span className="text-foreground font-medium">Add pre-tax deductions</span> — Enter annual amounts for health insurance and 401(k) contributions to see their tax-saving impact.</li>
            <li><span className="text-foreground font-medium">Review your results</span> — See your annual, monthly, and bi-weekly take-home pay with a full deduction breakdown.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "2024 federal tax brackets for all three filing statuses",
              "Progressive bracket calculation with per-bracket breakdown",
              "Social Security tax (6.2% up to $168,600 wage base)",
              "Medicare tax (1.45% on all wages)",
              "State tax rate input for all US states",
              "Pre-tax deduction fields: health insurance and 401(k)",
              "Automatic standard deduction based on filing status",
              "Annual, monthly, and bi-weekly take-home amounts",
              "Effective and marginal tax rate display",
              "Expandable bracket-by-bracket tax table",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Salary After Tax Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Enter your gross annual salary before any deductions for the most accurate take-home pay estimate.","Include all pre-tax deductions like 401(k) contributions and health insurance for a realistic net pay figure.","Compare your hourly rate with our Salary to Hourly Calculator to understand your per-hour earnings.","Plan your monthly budget using our Student Budget Planner or Cost of Living Calculator.","Check if you can afford a home with your take-home pay using our Mortgage Affordability Calculator.","Understand how loans eat into your salary with our Loan EMI Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Salary to Hourly Calculator/g, '<a href="/tools/finance/salary-to-hourly-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary to Hourly Calculator</a>')
                    .replace(/our Student Budget Planner/g, '<a href="/tools/finance/student-budget-planner" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Student Budget Planner</a>')
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Mortgage Affordability Calculator/g, '<a href="/tools/finance/mortgage-affordability-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Mortgage Affordability Calculator</a>')
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
