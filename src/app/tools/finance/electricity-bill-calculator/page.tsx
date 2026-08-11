import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ElectricityBillCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ElectricityBillCalculatorPage() {
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

        <section className="mt-8" aria-label="Electricity Bill Calculator Tool">
          <ElectricityBillCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Electricity Bill Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Set your tariff rate</span> — Enter the price per kWh from your electricity bill (US average is $0.12–$0.16).</li>
            <li><span className="text-foreground font-medium">Add common appliances</span> — Click the preset buttons to add appliances with typical wattage values.</li>
            <li><span className="text-foreground font-medium">Add custom appliances</span> — Enter any appliance not in the presets with its name, wattage, daily usage, and quantity.</li>
            <li><span className="text-foreground font-medium">Adjust usage hours</span> — Edit hours per day directly in the active appliances table for accuracy.</li>
            <li><span className="text-foreground font-medium">Review the breakdown</span> — View the cost breakdown table sorted by highest cost first to identify your biggest energy consumers.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "10 pre-defined common household appliances with typical wattage",
              "Add unlimited custom appliances with any specification",
              "Real-time calculation of daily, monthly, and yearly costs",
              "Cost breakdown sorted by highest spending appliance first",
              "Visual percentage bars showing each appliance's share of the bill",
              "Summary cards for monthly and yearly kWh and costs",
              "Adjust quantity for appliances with multiple units",
              "Fully responsive — works on mobile and desktop",
              "100% client-side — no data leaves your browser",
              "Editable tariff rate to match your local utility pricing",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Electricity Bill Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Check your appliance labels for exact wattage — estimated values can lead to inaccurate bills.","Include often-overlooked devices like routers, chargers, and standby electronics that run 24/7.","Compare your electricity costs with transportation fuel costs using our Fuel Cost Calculator.","Factor energy costs into your overall living expenses with our Cost of Living Calculator.","Track your budget including utilities with our Student Budget Planner.","Understand how inflation affects energy prices over time with our Inflation Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Fuel Cost Calculator/g, '<a href="/tools/finance/fuel-cost-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Fuel Cost Calculator</a>')
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Student Budget Planner/g, '<a href="/tools/finance/student-budget-planner" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Student Budget Planner</a>')
                    .replace(/our Inflation Calculator/g, '<a href="/tools/finance/inflation-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Inflation Calculator</a>')
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
