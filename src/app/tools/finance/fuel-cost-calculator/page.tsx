import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { FuelCostCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function FuelCostCalculatorPage() {
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

        <section className="mt-8" aria-label="Fuel Cost Calculator Tool">
          <FuelCostCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Fuel Cost Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Choose unit system</span> — Select US (miles, MPG, $/gallon) or Metric (km, L/100km, $/liter). Click the arrow to convert existing values.</li>
            <li><span className="text-foreground font-medium">Enter trip distance</span> — Input the total one-way or round-trip distance you plan to travel.</li>
            <li><span className="text-foreground font-medium">Enter fuel efficiency</span> — Your vehicle's MPG or L/100km rating (found on the window sticker or owner's manual).</li>
            <li><span className="text-foreground font-medium">Enter fuel price</span> — The current price per gallon or liter at your local gas station.</li>
            <li><span className="text-foreground font-medium">Review the trip summary</span> — See fuel needed, total cost, and cost per mile/km instantly.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "US and Metric unit systems with one-click conversion",
              "Instant calculation of fuel needed and total trip cost",
              "Cost per mile/km breakdown for budget comparison",
              "Trip summary card with all key metrics at a glance",
              "Automatic MPG to L/100km conversion when switching systems",
              "Fully responsive design for mobile road trip planning",
              "100% client-side — no data leaves your browser",
              "Clean, focused interface with no distractions",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

                {/* Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Fuel Cost Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Use your actual vehicle MPG rather than the manufacturer estimate for more accurate calculations.","Factor in varying gas prices along your route by calculating segments separately.","Include electricity costs for EV charging with our Electricity Bill Calculator.","Budget for your overall trip expenses using our Travel Budget Calculator.","Compare living and transportation costs between cities with our Cost of Living Comparison.","Understand how fuel costs affect your monthly budget with our Cost of Living Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Electricity Bill Calculator/g, '<a href="/tools/finance/electricity-bill-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Electricity Bill Calculator</a>')
                    .replace(/our Travel Budget Calculator/g, '<a href="/tools/finance/travel-budget-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Travel Budget Calculator</a>')
                    .replace(/our Cost of Living Comparison/g, '<a href="/tools/finance/cost-of-living-comparison" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Comparison</a>')
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
