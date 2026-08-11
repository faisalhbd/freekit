import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CostOfLivingComparisonTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CostOfLivingComparisonPage() {
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

        <section className="mt-8" aria-label="Cost of Living Comparison Tool">
          <CostOfLivingComparisonTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Cost of Living Comparison</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Name both cities</span> — Enter names for City A and City B for clear identification.</li>
            <li><span className="text-foreground font-medium">Enter monthly expenses</span> — Fill in expense amounts for both cities across all 11 categories.</li>
            <li><span className="text-foreground font-medium">Review per-category differences</span> — See green/red badges showing percentage differences for each category.</li>
            <li><span className="text-foreground font-medium">Check totals</span> — View monthly and annual savings or additional costs with detailed comparison table.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Side-by-side comparison of 11 expense categories",
              "Per-category percentage difference badges (green/red)",
              "Total monthly and annual savings calculations",
              "Detailed comparison table with color-coded rows",
              "Custom city names for personal reference",
              "Real-time calculation as you type",
              "Only categories with data appear in results",
              "Responsive layout — works on mobile and desktop",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Cost of Living Comparison</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Use actual rental listing prices rather than averages for the most accurate housing cost comparison.","Factor in transportation costs — public transit vs. car ownership differs significantly between cities.","After comparing cities, calculate your detailed budget with our Cost of Living Calculator.","See how far your salary goes in each city with our Salary After Tax Calculator.","Plan your relocation budget using our Travel Budget Calculator for moving expenses.","Check if you need to save more before moving with our Emergency Fund Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Salary After Tax Calculator/g, '<a href="/tools/finance/salary-after-tax-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary After Tax Calculator</a>')
                    .replace(/our Travel Budget Calculator/g, '<a href="/tools/finance/travel-budget-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Travel Budget Calculator</a>')
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
