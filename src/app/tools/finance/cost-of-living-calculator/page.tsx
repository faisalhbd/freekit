import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CostOfLivingCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CostOfLivingCalculatorPage() {
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

        <section className="mt-8" aria-label="Cost of Living Calculator Tool">
          <CostOfLivingCalculatorTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Cost of Living Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your monthly expenses</span> — Fill in all 11 expense categories with your actual monthly amounts.</li>
            <li><span className="text-foreground font-medium">View your totals</span> — Instantly see your total monthly and annual cost of living.</li>
            <li><span className="text-foreground font-medium">Analyze the breakdown</span> — The visual bar and percentage list show exactly where your money goes.</li>
            <li><span className="text-foreground font-medium">Identify savings opportunities</span> — Find your largest categories and look for ways to reduce them.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "11 common expense categories for comprehensive tracking",
              "Instant monthly and annual total calculation",
              "Color-coded stacked bar visualization",
              "Per-category percentage breakdown with mini bars",
              "Only non-zero categories shown in results",
              "Real-time updates as you type",
              "Dollar sign prefix with clean input formatting",
              "Responsive grid layout for all screen sizes",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Cost of Living Calculator</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Enter realistic estimates for each expense category — use your bank statements as a reference.","Include seasonal variations like higher heating bills in winter or AC costs in summer.","Compare costs between cities with our Cost of Living Comparison tool before relocating.","Plan for retirement savings using our Retirement Savings Calculator alongside living expenses.","See how your salary translates to hourly pay with our Salary to Hourly Calculator.","Build an emergency fund based on your monthly costs using our Emergency Fund Calculator."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Cost of Living Comparison/g, '<a href="/tools/finance/cost-of-living-comparison" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Comparison</a>')
                    .replace(/our Retirement Savings Calculator/g, '<a href="/tools/finance/retirement-savings-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Retirement Savings Calculator</a>')
                    .replace(/our Salary to Hourly Calculator/g, '<a href="/tools/finance/salary-to-hourly-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary to Hourly Calculator</a>')
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
