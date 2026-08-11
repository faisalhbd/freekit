import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { StudentBudgetPlannerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function StudentBudgetPlannerPage() {
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

        <section className="mt-8" aria-label="Student Budget Planner Tool">
          <StudentBudgetPlannerTool />
        </section>

        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Student Budget Planner</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your income sources</span> — Part-time job, parental support, loans, and any other income.</li>
            <li><span className="text-foreground font-medium">Enter your expenses</span> — Tuition, housing, food, transport, books, entertainment, and more.</li>
            <li><span className="text-foreground font-medium">Review your balance</span> — See if you have a surplus or deficit, with personalized tips.</li>
            <li><span className="text-foreground font-medium">Analyze the breakdown</span> — The visual bar shows where your money goes each month.</li>
          </ol>
        </section>

        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "4 income source categories",
              "9 expense categories covering all student costs",
              "Automatic surplus/deficit calculation",
              "Color-coded stacked bar expense visualization",
              "Per-category percentage breakdown",
              "Personalized financial tips based on your situation",
              "Real-time updates as you type",
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
          <h2 className="text-2xl font-bold tracking-tight">Tips for Using Student Budget Planner</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Track every expense for a month before planning to understand your actual spending patterns.","Prioritize needs over wants — allocate funds for essentials like rent, food, and transportation first.","Plan for one-time expenses like textbooks and supplies at the start of each semester.","Use our Cost of Living Calculator to estimate expenses if moving to a new city for school.","Calculate potential earnings from a part-time job with our Salary to Hourly Calculator.","Compare living costs between on-campus and off-campus options with our Cost of Living Comparison."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Cost of Living Calculator/g, '<a href="/tools/finance/cost-of-living-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Calculator</a>')
                    .replace(/our Salary to Hourly Calculator/g, '<a href="/tools/finance/salary-to-hourly-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Salary to Hourly Calculator</a>')
                    .replace(/our Cost of Living Comparison/g, '<a href="/tools/finance/cost-of-living-comparison" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Cost of Living Comparison</a>')
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
