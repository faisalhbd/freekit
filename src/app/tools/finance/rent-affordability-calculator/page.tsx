import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RentAffordabilityCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RentAffordabilityCalculatorPage() {
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

        <section className="mt-8" aria-label="Rent Affordability Calculator Tool">
          <RentAffordabilityCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Rent Affordability Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter monthly gross income</span> — Your pre-tax monthly earnings.</li>
            <li><span className="text-foreground font-medium">Enter monthly debts</span> — Car payments, student loans, credit card minimums, and other obligations.</li>
            <li><span className="text-foreground font-medium">Adjust the rent percentage slider</span> — The default 30% is standard; move to 20% for conservative or 40% for stretched budgets.</li>
            <li><span className="text-foreground font-medium">Review results</span> — See max rent, recommended range, remaining budget, and visual allocation bar.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Adjustable rent-to-income ratio slider (20-40%)",
              "Recommended rent range (5% buffer below max)",
              "Remaining budget after rent and debts",
              "Color-coded stacked bar budget visualization",
              "Budget warning when debts exceed remaining budget",
              "Real-time calculation as you adjust inputs",
              "Simple 2-input design for quick estimates",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Rent Affordability Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Financial experts recommend spending no more than 30% of your gross income on rent.","Include all rent-related costs like renters insurance, parking, and utilities in your budget.","See your full living expenses with our Cost of Living Calculator for a complete picture.","Understand your take-home pay with our Salary After Tax Calculator.","Compare rental costs against buying a home with our Mortgage Affordability Calculator.","Build a savings plan for a future home purchase with our Emergency Fund Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Mortgage Affordability Calculator/g, '<a href="/tools/finance/mortgage-affordability-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Mortgage Affordability Calculator</a>')
                    .replace(/our Emergency Fund Calculator/g, '<a href="/tools/finance/emergency-fund-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Emergency Fund Calculator</a>')
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
