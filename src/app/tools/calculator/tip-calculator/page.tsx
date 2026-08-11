import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TipCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TipCalculatorPage() {
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
        <section className="mt-8" aria-label="Tip Calculator Tool">
          <TipCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Tip Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your tip and split the bill in three simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter the bill amount</span> — Type in the total from your restaurant check or receipt.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a tip percentage</span> — Select one of the quick buttons (10%, 15%, 18%, 20%, 25%) or enter a custom percentage. Results update instantly.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust the number of people</span> — Use the slider or type a number (1–50) to see each person's share of the bill and tip.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Quick tip buttons: 10%, 15%, 18%, 20%, and 25%",
              "Custom tip percentage for any amount",
              "Bill splitting for 1 to 50 people",
              "Interactive slider for easy people count adjustment",
              "Per-person cost breakdown including tip share",
              "Real-time results — no calculate button needed",
              "Quick scenario presets for common dining situations",
              "Visual result cards with color-coded breakdown",
              "Responsive design for mobile, tablet, and desktop",
              "100% browser-based — no server, no data collection",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Tip Formulas Explained */}
        <section className="mt-16 space-y-4" aria-label="Tip formulas">
          <h2 className="text-2xl font-bold tracking-tight">Tip Formulas Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tip Amount</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tip = Bill &times; (Tip% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Multiply your bill by the tip percentage as a decimal. Example: $80 bill with 20% tip = $80 &times; 0.20 = $16 tip.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Total Bill</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Total = Bill + Tip</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Simply add the tip to the original bill. $80 + $16 = $96 total. This is what you pay.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Per Person Share</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Per Person = Total / People</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Divide the total bill evenly. $96 split 4 ways = $24 per person. Our calculator shows the tip share separately.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tip Per Person</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tip/Person = Tip / People</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Divide the total tip evenly among the group. $16 tip for 4 people = $4 tip per person.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Quick 15% Mental Math</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">15% = 10% + 5%</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Move the decimal for 10%, then add half of that for 5%. For $80: 10% = $8, 5% = $4, total 15% = $12.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Quick 20% Mental Math</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">20% = Bill &times; 2 / 10</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Double the bill, then divide by 10. For $45: $45 &times; 2 = $90, $90 / 10 = $9 tip. Or simply move the decimal and double.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Restaurant Dining", desc: "Calculate the right tip for sit-down restaurants. 18–20% is standard for good service, 25% for exceptional. Split the check among your group." },
              { title: "Bar and Cocktail Lounges", desc: "Tip $1–2 per drink or 15–20% of the tab. For complicated cocktails or attentive bartenders, lean toward the higher end." },
              { title: "Food Delivery", desc: "Tip 15–20% for delivery, with a minimum of $3–5. Factor in weather, distance, and order size for fair compensation." },
              { title: "Coffee Shop", desc: "A $1–2 tip per drink or rounding up is appreciated at coffee shops. Use 10–15% of your order total as a guideline." },
              { title: "Group Dinners and Splitting", desc: "Avoid the awkward end-of-meal math. Enter the total bill, pick your tip, set the number of people, and everyone pays their fair share." },
              { title: "Travel and International Tipping", desc: "Tipping customs vary by country. Use the custom percentage to match local norms — from 5% in Europe to nothing in Japan." },
              { title: "Hair Salon and Spa", desc: "Tip 15–20% for haircuts, color, and spa services. For a $60 haircut with 20% tip, each person in a group can split the total." },
              { title: "Taxi and Rideshare", desc: "Tip 15–20% for taxis and rideshares. Round up for short trips and tip more for helpful drivers who assist with luggage." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tipping Etiquette Tips */}
        <section className="mt-16 space-y-4" aria-label="Tipping etiquette tips">
          <h2 className="text-2xl font-bold tracking-tight">Tipping Etiquette Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "In the United States, 18–20% is the standard tip for good restaurant service. For exceptional service, 25% or more is a generous and appreciated gesture.",
              "Always tip on the pre-tax amount for accuracy, though tipping on the post-tax total is common and the difference is minimal. Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> can help you find exact amounts.",
              "When splitting a bill, calculate the tip on the total bill first, then divide — not the other way around. This ensures the tip amount is accurate for the full order.",
              "For large groups (6+ people), many restaurants automatically add an 18% gratuity. Check your bill before adding extra tip to avoid double-tipping.",
              "Tip your barista $1–2 per drink at coffee shops. Many counters have a tip jar, and these small amounts add up for the staff.",
              "For food delivery, tip at least $3–5 minimum regardless of order size. Drivers cover their own gas, insurance, and vehicle maintenance.",
              "When traveling internationally, research tipping customs before you go. In Japan, tipping can be considered rude, while in the US it is expected.",
              "If you have a discount or coupon, tip on the original bill amount before the discount — the server did the same work regardless of what you paid.",
              "Need to calculate sales tax on your bill? Use our <a href=\"/tools/calculator/vat-tax-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">VAT/Tax Calculator</a> for detailed tax breakdowns.",
              "Comparing discounts at restaurants? Our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> helps you see how much you save on special offers.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Understanding Tipping */}
        <section className="mt-16 space-y-4" aria-label="Understanding tipping">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Tipping</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Why We Tip</h3>
              <p className="text-sm text-muted-foreground">
                In many countries, particularly the United States, tipping is a significant part of service workers' income.
                Restaurant servers often earn a base wage well below minimum wage and rely on tips to make a living wage.
                Tipping is a way to directly compensate the person who provided your service.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The History of Tipping</h3>
              <p className="text-sm text-muted-foreground">
                Tipping originated in Tudor England as a master-serf relationship and later spread to continental Europe.
                Americans brought the practice back from European travels in the late 19th century. After the Civil War,
                the hospitality and Pullman train industries popularized tipping in the US to avoid paying former enslaved people wages.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tipping vs. Service Charge</h3>
              <p className="text-sm text-muted-foreground">
                A service charge (often 18–20%) is automatically added to your bill by the restaurant, especially for large parties.
                This is distributed among staff by the restaurant. A tip is discretionary and goes directly to your server.
                Always check if a service charge is already included before adding an additional tip.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The Movement Toward No Tipping</h3>
              <p className="text-sm text-muted-foreground">
                Some restaurants have experimented with eliminating tips in favor of higher menu prices and better wages for staff.
                While this model provides income stability for workers, it hasn't been widely adopted in the US.
                Until tipping culture changes, our calculator helps you navigate the current system confidently.
              </p>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
