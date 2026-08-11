import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DiscountCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DiscountCalculatorPage() {
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
        <section className="mt-8" aria-label="Discount Calculator Tool">
          <DiscountCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Discount Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your final price and savings in three simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter the original price</span> — Type in the item's regular price before any discounts.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose your discount</span> — Select percentage (%) or fixed amount ($), then enter the discount value. Results update in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">Optional: stack a second discount or add tax</span> — Toggle the second discount for double-discount scenarios, or enter a tax rate to see the final out-of-pocket price.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Percentage and fixed-amount discount types",
              "Real-time results — no calculate button needed",
              "Double discount stacking with sequential calculation",
              "Optional tax rate to see the true final price",
              "Visual savings progress bar with percentage",
              "Detailed breakdown: discounts, tax, and final price",
              "Quick example buttons for instant demos",
              "Responsive design for mobile, tablet, and desktop",
              "100% browser-based — no server, no data collection",
              "Clean, accessible interface with proper ARIA labels",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Discount Formulas Explained */}
        <section className="mt-16 space-y-4" aria-label="Discount formulas">
          <h2 className="text-2xl font-bold tracking-tight">Discount Formulas Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Percentage Discount</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Final = Price &times; (1 &minus; Discount% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Multiply the price by the remaining percentage. Example: $100 with 25% off = $100 &times; 0.75 = $75.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Fixed Amount Discount</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Final = Price &minus; Discount Amount</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Simply subtract the discount from the price. Example: $100 with $15 off = $85.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Double Discount</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">After 2nd = Price1 &times; (1 &minus; D2% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The second discount is applied to the already-discounted price, not the original. This is why 20% + 15% does not equal 35% off.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tax on Discounted Price</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tax = Discounted Price &times; (Tax% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Tax is calculated on the price after discounts. A $75 item with 8% tax costs $75 + $6 = $81.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Total Savings Percentage</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Savings% = (Total Saved / Original) &times; 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The effective savings percentage accounts for all stacked discounts combined.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Reverse Price Calculation</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Original = Sale Price / (1 &minus; D% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                To find the original price from the sale price, divide by the remaining fraction. $60 after 25% off means the original was $80.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Black Friday Shopping", desc: "Compare deals across stores. Enter the original price and each store's discount to find the lowest final price." },
              { title: "Coupon Stacking", desc: "Use the double discount feature to see your total savings when applying a store sale plus a coupon code." },
              { title: "Restaurant Specials", desc: "Calculate the final bill when a restaurant offers a percentage off the total, plus add tax." },
              { title: "Subscription Savings", desc: "See how much you save with annual vs. monthly plans by entering both prices and comparing." },
              { title: "Clearance Sales", desc: "Department stores often stack 40% off with an extra 15% coupon. See the real final price." },
              { title: "Membership Discounts", desc: "Calculate your actual savings from membership discounts after factoring in the membership cost." },
              { title: "Online Promo Codes", desc: "Enter the item price, apply the promo discount, add tax, and know exactly what you'll pay." },
              { title: "BOGO Deals", desc: "Calculate the effective discount of Buy One Get One deals by dividing the total cost by two." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips for Smart Shopping */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Smart Shopping</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always compare the actual dollar savings, not just the discount percentage — 50% off a $10 item saves less than 10% off a $200 item.",
              "When stores stack discounts (e.g., 30% off + extra 20% off), the total savings is not 50% — it's 44% because the second discount applies to the reduced price.",
              "Sign up for store newsletters before major holidays to get exclusive percentage-off coupon codes that can stack with sale prices.",
              "Use browser extensions or price-tracking tools alongside this calculator to ensure the 'original price' hasn't been artificially inflated.",
              "Need to calculate the tax separately? Our <a href=\"/tools/calculator/vat-tax-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">VAT/Tax Calculator</a> provides detailed tax breakdowns for any amount.",
              "Calculating a tip at a discounted restaurant meal? Our <a href=\"/tools/calculator/tip-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Tip Calculator</a> handles tips, bill splitting, and discounts together.",
              "Comparing percentage savings across items? Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> helps you find what percent one price is of another.",
              "Planning a big purchase with financing? Our <a href=\"/tools/calculator/loan-emi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Loan/EMI Calculator</a> shows monthly payments and total interest on your purchase.",
              "Remember that sales tax is calculated on the discounted price, not the original — you save on tax too when you get a discount.",
              "All calculations use your browser's JavaScript engine. No data is ever sent to a server.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Understanding Discounts */}
        <section className="mt-16 space-y-4" aria-label="Understanding discounts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Discounts</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Retail Discount Strategies</h3>
              <p className="text-sm text-muted-foreground">
                Retailers use various discount strategies to attract buyers: percentage-off sales, fixed-amount coupons,
                buy-one-get-one deals, and loyalty member discounts. Understanding how each type works helps you
                compare deals accurately and find genuine savings rather than perceived ones.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The Psychology of Discounts</h3>
              <p className="text-sm text-muted-foreground">
                Studies show that percentage discounts feel larger than equivalent fixed-amount discounts, even when
                the savings are identical. A "30% off" tag often drives more purchases than "$15 off" on a $50 item,
                even though both save the same amount. Always calculate the actual dollar savings.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Seasonal Sales Calendar</h3>
              <p className="text-sm text-muted-foreground">
                Major discount periods include Black Friday/Cyber Monday (November), After-Christmas clearance (December–January),
                End-of-season sales (quarterly), Amazon Prime Day (July), and Back-to-School (August). Planning purchases
                around these events can save 30–70% on many items.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tax Implications</h3>
              <p className="text-sm text-muted-foreground">
                In most jurisdictions, sales tax is calculated on the discounted price, meaning discounts reduce your
                tax burden too. However, some regions calculate tax before discounts. Always check your local tax rules
                and use our calculator to factor in tax for accurate final prices.
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
