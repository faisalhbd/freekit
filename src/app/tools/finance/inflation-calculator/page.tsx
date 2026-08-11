import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { InflationCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function InflationCalculatorPage() {
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

        <section className="mt-8" aria-label="Inflation Calculator Tool">
          <InflationCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Inflation Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter the amount</span> — The dollar amount you want to evaluate.</li>
            <li><span className="text-foreground font-medium">Set the year range</span> — Enter the start year (when you had that amount) and end year.</li>
            <li><span className="text-foreground font-medium">Set inflation rate</span> — The default is 3% (US long-term average). Adjust as needed.</li>
            <li><span className="text-foreground font-medium">Review results</span> — See the equivalent amount needed, total inflation, and purchasing power change with visual breakdowns.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Calculate equivalent future value of any dollar amount", "Year-by-year table showing value erosion over time", "Visual bar showing purchasing power shrinkage", "Custom inflation rate with US average default (3%)", "Summary cards for equivalent amount, inflation %, and purchasing power", "Handles any year range from 1900 to 2100", "Fully responsive — works on all devices", "100% client-side — no data leaves your browser"].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Inflation Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Use this tool to understand how much purchasing power your money loses over time.","Compare historical inflation rates to understand long-term economic trends.","Protect your savings from inflation with our Compound Interest Calculator for investment growth.","Plan your retirement savings to outpace inflation with our Retirement Savings Calculator.","Factor inflation into your living cost projections with our Cost of Living Calculator.","Build a buffer against rising costs with our Emergency Fund Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Compound Interest Calculator/g, '<a href="/tools/finance/compound-interest-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Compound Interest Calculator</a>')
                    .replace(/our Retirement Savings Calculator/g, '<a href="/tools/finance/retirement-savings-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Retirement Savings Calculator</a>')
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
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
