import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TravelBudgetCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TravelBudgetCalculatorPage() {
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

        <section className="mt-8" aria-label="Travel Budget Calculator Tool">
          <TravelBudgetCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Travel Budget Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter trip details</span> — Set the duration in days and number of travelers.</li>
            <li><span className="text-foreground font-medium">Set emergency buffer</span> — Choose a percentage (10-20% recommended) for unexpected expenses.</li>
            <li><span className="text-foreground font-medium">Fill in expense categories</span> — Enter costs for flights, accommodation, food, transport, activities, shopping, insurance, and visa fees.</li>
            <li><span className="text-foreground font-medium">Review the breakdown</span> — See visual bars showing each category's share, plus per-person and per-day totals.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["8 expense categories covering all major travel costs", "Automatic per-person and per-day scaling", "Visual color-coded breakdown bars for each category", "Emergency buffer percentage applied to subtotal", "Per-person, per-day, and per-person-per-day totals", "Clear labeling of per-person and per-day input fields", "Fully responsive for planning on any device", "100% client-side — no data leaves your browser"].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Travel Budget Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Research actual prices for flights and hotels rather than estimating — use booking sites for current rates.","Include a 10-15% buffer for unexpected expenses and price fluctuations.","Calculate fuel costs for road trips separately using our Fuel Cost Calculator.","Check if you meet visa financial requirements with our Visa Financial Proof Calculator.","Compare destination costs with our Cost of Living Comparison to choose affordable locations.","Factor your electricity and utility costs at home while traveling with our Electricity Bill Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Fuel Cost Calculator/g, '<a href="/tools/finance/fuel-cost-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Fuel Cost Calculator</a>')
                    .replace(/our Visa Financial Proof Calculator/g, '<a href="/tools/finance/visa-financial-proof-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Visa Financial Proof Calculator</a>')
                    .replace(/our Cost of Living Comparison/g, '<a href="/tools/finance/cost-of-living-comparison" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Comparison</a>')
                    .replace(/our Electricity Bill Calculator/g, '<a href="/tools/finance/electricity-bill-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Electricity Bill Calculator</a>')
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
