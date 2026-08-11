import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RetirementSavingsCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RetirementSavingsCalculatorPage() {
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

        <section className="mt-8" aria-label="Retirement Savings Calculator Tool">
          <RetirementSavingsCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Retirement Savings Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your ages</span> — Current age and planned retirement age.</li>
            <li><span className="text-foreground font-medium">Enter current savings</span> — Your total retirement account balance today.</li>
            <li><span className="text-foreground font-medium">Set monthly contributions</span> — How much you add each month (including employer match).</li>
            <li><span className="text-foreground font-medium">Set return and inflation rates</span> — Use defaults (7% return, 3% inflation) or adjust.</li>
            <li><span className="text-foreground font-medium">Set your goal</span> — Desired annual retirement income and expected years in retirement.</li>
            <li><span className="text-foreground font-medium">Review results</span> — Check the surplus/shortfall indicator and year-by-year projection table.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Year-by-year projection table showing balance, contributions, and growth", "Surplus/shortfall indicator comparing projected balance to goal", "Monthly retirement income estimate based on years in retirement", "Compound growth calculation with monthly compounding", "Summary cards for total contributions, investment growth, and final balance", "Inflation rate input for realistic long-term planning", "Fully responsive — plan your retirement on any device", "100% client-side — your financial data stays private"].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Retirement Savings Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Start saving as early as possible — compound interest has the most impact over long time periods.","Include employer matching contributions in your savings rate for a realistic projection.","Use our Compound Interest Calculator to see how different return rates affect your savings.","Plan for inflation impact on your retirement income with our Inflation Calculator.","Ensure you have an emergency fund first with our Emergency Fund Calculator.","Pay off high-interest debt before focusing on retirement with our Debt Payoff Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Compound Interest Calculator/g, '<a href="/tools/finance/compound-interest-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Compound Interest Calculator</a>')
                    .replace(/our Inflation Calculator/g, '<a href="/tools/finance/inflation-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Inflation Calculator</a>')
                    .replace(/our Emergency Fund Calculator/g, '<a href="/tools/finance/emergency-fund-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Emergency Fund Calculator</a>')
                    .replace(/our Debt Payoff Calculator/g, '<a href="/tools/finance/debt-payoff-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Debt Payoff Calculator</a>')
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
