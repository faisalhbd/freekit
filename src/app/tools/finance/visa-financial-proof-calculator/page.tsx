import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { VisaFinancialProofCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function VisaFinancialProofCalculatorPage() {
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

        <section className="mt-8" aria-label="Visa Financial Proof Calculator Tool">
          <VisaFinancialProofCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Visa Financial Proof Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Select your destination</span> — Choose from Schengen, USA, UK, Canada, Australia, Japan, UAE, or Other.</li>
            <li><span className="text-foreground font-medium">Enter trip duration</span> — Number of days you plan to stay.</li>
            <li><span className="text-foreground font-medium">Choose travel style</span> — Budget, moderate, or luxury to match your planned spending.</li>
            <li><span className="text-foreground font-medium">Set number of travelers</span> — The calculator scales costs for multiple people.</li>
            <li><span className="text-foreground font-medium">Review results</span> — See required bank balance, daily budget, trip cost, and country-specific requirements.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "7 destinations with specific daily budgets and requirements",
              "3 travel styles: Budget, Moderate, and Luxury",
              "Multiple traveler support with shared-cost scaling",
              "Required bank balance with configurable multiplier per country",
              "Country-specific additional visa requirements",
              "Quick reference table comparing all destinations",
              "Bank statement duration recommendations",
              "Important disclaimer about verifying with embassies",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Visa Financial Proof Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Always check the specific financial requirements on the official embassy website for your destination.","Include all income sources — salary, investments, rental income, and savings interest.","Calculate your available balance after debts with our Debt Payoff Calculator.","Understand your monthly income with our Salary After Tax Calculator for accurate documentation.","Compare living costs at your destination with our Cost of Living Comparison.","Plan your travel expenses with our Travel Budget Calculator to show sufficient funds."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Debt Payoff Calculator/g, '<a href="/tools/finance/debt-payoff-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Debt Payoff Calculator</a>')
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Cost of Living Comparison/g, '<a href="/tools/finance/cost-of-living-comparison" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Comparison</a>')
                    .replace(/our Travel Budget Calculator/g, '<a href="/tools/finance/travel-budget-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Travel Budget Calculator</a>')
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
