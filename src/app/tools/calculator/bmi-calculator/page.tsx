import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BMICalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BMICalculatorPage() {
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
        {/* 1. Breadcrumb + Hero */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Interface */}
        <section className="mt-8" aria-label="BMI Calculator Tool">
          <BMICalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the BMI Calculator</h2>
          <p className="text-muted-foreground">
            Calculating your BMI takes just a few seconds. Follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your unit system</span> — Toggle between Metric (centimeters and kilograms) and Imperial (feet/inches and pounds) using the switch at the top.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your height</span> — Type your height in centimeters (e.g., 175) or in feet and inches (e.g., 5 ft 9 in).
            </li>
            <li>
              <span className="text-foreground font-medium">Enter your weight</span> — Type your weight in kilograms or pounds.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Calculate BMI</span> — Your BMI value, category, healthy weight range, and health tips appear instantly.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the visual gauge</span> — The color-coded scale shows exactly where your BMI falls relative to each category.
            </li>
          </ol>
        </section>

        {/* 4. BMI Categories Explained */}
        <section className="mt-16 space-y-4" aria-label="BMI categories">
          <h2 className="text-2xl font-bold tracking-tight">BMI Categories Explained</h2>
          <p className="text-muted-foreground">
            The World Health Organization (WHO) classifies BMI into four main categories for adults:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-amber-400" />
                <h3 className="font-semibold">Underweight (BMI &lt; 18.5)</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A BMI below 18.5 suggests that a person may be underweight. This can indicate
                insufficient nutrition, an underlying medical condition, or an overly high
                metabolism. Being underweight is associated with risks such as weakened immunity,
                bone loss, and fertility issues.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-emerald-400" />
                <h3 className="font-semibold">Normal Weight (18.5 – 24.9)</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A BMI between 18.5 and 24.9 is considered within the normal or healthy weight range.
                People in this range generally have a lower risk of weight-related health problems
                such as heart disease, type 2 diabetes, and certain cancers.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-orange-400" />
                <h3 className="font-semibold">Overweight (25.0 – 29.9)</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A BMI between 25.0 and 29.9 indicates overweight. Carrying excess weight increases
                the risk of developing conditions like high blood pressure, elevated cholesterol,
                type 2 diabetes, and cardiovascular disease. Lifestyle changes can often help.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-red-400" />
                <h3 className="font-semibold">Obese (BMI &ge; 30.0)</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A BMI of 30.0 or higher is classified as obese. Obesity is linked to significantly
                increased risks of serious health conditions including heart disease, stroke, type 2
                diabetes, sleep apnea, and certain cancers. Medical guidance is strongly recommended.
              </p>
            </div>
          </div>
        </section>

        {/* 5. BMI Formula */}
        <section className="mt-16 space-y-4" aria-label="BMI formula">
          <h2 className="text-2xl font-bold tracking-tight">How BMI Is Calculated</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Metric Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">BMI = weight (kg) &divide; height (m)&sup2;</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For example, if you weigh 70 kg and are 1.75 m tall:
                BMI = 70 &divide; (1.75 &times; 1.75) = 70 &divide; 3.0625 = <strong>22.9</strong> (Normal).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Imperial Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">BMI = (weight (lbs) &times; 703) &divide; height (in)&sup2;</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For example, if you weigh 154 lbs and are 69 inches tall:
                BMI = (154 &times; 703) &divide; (69 &times; 69) = 108262 &divide; 4761 = <strong>22.7</strong> (Normal).
              </p>
            </div>
          </div>
        </section>

        {/* 6. Limitations of BMI */}
        <section className="mt-16 space-y-4" aria-label="Limitations of BMI">
          <h2 className="text-2xl font-bold tracking-tight">Limitations of BMI</h2>
          <p className="text-muted-foreground">
            While BMI is a widely used screening tool, it has important limitations to be aware of:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Does not measure body fat directly</strong> — BMI uses only height and weight, so it cannot distinguish between fat mass and lean mass (muscle, bone, water).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Inaccurate for athletes</strong> — People with high muscle mass (e.g., bodybuilders) may have a high BMI without excess body fat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Ignores fat distribution</strong> — Visceral fat (around organs) is more dangerous than subcutaneous fat, but BMI does not differentiate between them.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Not age- or sex-specific for adults</strong> — The same formula applies to all adults, though body composition naturally varies by age and sex.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Ethnic variations exist</strong> — Some populations may face health risks at lower BMI thresholds. WHO has suggested modified cut-offs for Asian populations.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Not for children or teens</strong> — BMI percentiles (not absolute values) are used for ages 2–19, and require age- and sex-specific growth charts.</span>
            </li>
          </ul>
        </section>

        {/* 7. Tips for Maintaining a Healthy BMI */}
        <section className="mt-16 space-y-4" aria-label="Tips for healthy BMI">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Maintaining a Healthy BMI</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Eat a balanced diet</strong> — Focus on whole foods: vegetables, fruits, lean proteins, whole grains, and healthy fats. Limit processed foods and added sugars.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Stay active</strong> — Aim for at least 150 minutes of moderate aerobic activity (brisk walking, cycling) or 75 minutes of vigorous activity (running, swimming) per week.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Get enough sleep</strong> — Poor sleep is linked to weight gain. Adults should aim for 7–9 hours of quality sleep each night.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Monitor your weight regularly</strong> — Weekly weigh-ins help you catch trends early. Use our <a href="/tools/calculator/percentage-calculator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Percentage Calculator</a> to track weight change percentages.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Manage stress</strong> — Chronic stress elevates cortisol, which can promote fat storage, especially around the abdomen. Practice mindfulness, yoga, or deep breathing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span><strong className="text-foreground">Stay hydrated</strong> — Drinking water before meals can help control appetite. Aim for at least 8 glasses (2 liters) of water daily.</span>
            </li>
          </ul>
        </section>

        {/* 8. BMI in Different Contexts */}
        <section className="mt-16 space-y-4" aria-label="BMI in different contexts">
          <h2 className="text-2xl font-bold tracking-tight">BMI in Different Contexts</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Health Insurance</h3>
              <p className="text-sm text-muted-foreground">
                Many health insurance companies use BMI as one factor in determining premiums.
                A higher BMI may lead to higher premiums in some regions, as it is associated with
                increased health risks. Maintaining a healthy BMI can have financial benefits
                beyond just health.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Sports and Fitness</h3>
              <p className="text-sm text-muted-foreground">
                Athletes and fitness enthusiasts should be cautious about relying solely on BMI.
                A rugby player or weightlifter may have a BMI in the &ldquo;overweight&rdquo; or
                &ldquo;obese&rdquo; range due to muscle mass. Body fat percentage or waist-to-hip
                ratio may be more meaningful metrics in these cases.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Pregnancy</h3>
              <p className="text-sm text-muted-foreground">
                Pre-pregnancy BMI is used to recommend healthy weight gain during pregnancy.
                Women with a normal BMI are advised to gain 11.5–16 kg, while underweight women
                may be advised to gain more. Always consult an obstetrician for personalized guidance.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Children and Teens</h3>
              <p className="text-sm text-muted-foreground">
                For individuals aged 2–19, BMI is interpreted using age- and sex-specific
                percentile charts from the CDC. A child at the 5th percentile is considered
                underweight, while a child at or above the 95th percentile is considered obese.
                Standard adult BMI categories do not apply.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Other Useful Calculators */}
        <section className="mt-16 space-y-4" aria-label="Other useful calculators">
          <h2 className="text-2xl font-bold tracking-tight">Other Useful Calculators</h2>
          <p className="text-muted-foreground">
            Complement your health and finance calculations with these free tools:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="/tools/calculator/percentage-calculator"
              className="rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors group"
            >
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                Percentage Calculator
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Calculate percentages, increases, decreases, and differences — useful for tracking weight change percentages.
              </p>
            </a>
            <a
              href="/tools/calculator/tip-calculator"
              className="rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors group"
            >
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                Tip Calculator
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Split restaurant bills with custom tip percentages and per-person amounts.
              </p>
            </a>
            <a
              href="/tools/calculator/discount-calculator"
              className="rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors group"
            >
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                Discount Calculator
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Calculate final prices after discounts and sales tax — great for health product shopping.
              </p>
            </a>
            <a
              href="/tools/calculator/loan-emi-calculator"
              className="rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors group"
            >
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                Loan/EMI Calculator
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Calculate monthly loan payments, total interest, and amortization schedules for any loan.
              </p>
            </a>
          </div>
        </section>

        {/* 10. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
