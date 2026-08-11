import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { VATTaxCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function VATTaxCalculatorPage() {
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
        <section className="mt-8" aria-label="VAT / Tax Calculator Tool">
          <VATTaxCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the VAT / Tax Calculator</h2>
          <p className="text-muted-foreground">
            Calculate tax on any amount in four simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Choose your mode</span> — Select "Add Tax to Net Price" if you have a before-tax price, or "Extract Tax from Gross Price" if the price already includes tax.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter the amount</span> — Type in the net or gross amount depending on your selected mode. Results update in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">Set the tax rate</span> — Click a quick rate button (5%, 10%, 15%, 20%, 25%), pick a country preset, or type a custom rate manually.
            </li>
            <li>
              <span className="text-foreground font-medium">Review the breakdown</span> — See the net amount, tax amount, gross total, and a step-by-step calculation breakdown instantly.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Two calculation modes: add tax or extract tax",
              "Real-time results — no calculate button needed",
              "Quick rate buttons: 5%, 10%, 15%, 20%, 25%",
              "Country-specific presets: US, UK, EU, Australia, Canada, Japan, India, New Zealand",
              "Custom tax rate input for any percentage",
              "Clear calculation breakdown with formulas",
              "Net amount, tax amount, and gross total displayed separately",
              "Active preset label shown when a known rate is selected",
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

        {/* 5. Tax Formulas Explained */}
        <section className="mt-16 space-y-4" aria-label="Tax formulas">
          <h2 className="text-2xl font-bold tracking-tight">Tax Formulas Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Adding Tax (Net to Gross)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Gross = Net &times; (1 + Tax% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Multiply the net price by 1 plus the tax rate as a decimal. Example: $100 net with 20% VAT = $100 &times; 1.20 = $120 gross.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Extracting Tax (Gross to Net)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Net = Gross / (1 + Tax% / 100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Divide the gross price by 1 plus the tax rate. Example: $120 gross with 20% VAT = $120 / 1.20 = $100 net.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Calculating Tax Amount</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tax = Gross − Net</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Subtract the net from the gross to find the tax portion. When adding: Tax = Net &times; Tax%. When extracting: Tax = Gross − (Gross / 1.Tax).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tax Multiplier Method</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Multiplier = 1 + Tax% / 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For 20% VAT, the multiplier is 1.20. To add tax, multiply by 1.20. To remove tax, divide by 1.20. This single number makes both directions easy.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Effective Tax Fraction</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Tax Fraction = Tax% / (100 + Tax%)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                For 20% VAT: 20/120 = 1/6. So tax is exactly 1/6 of the gross price. This shortcut works for extracting tax quickly in your head.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Compound Tax (Multiple Rates)</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Total = Net &times; (1 + R1/100) &times; (1 + R2/100)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                When two taxes apply (e.g., federal + provincial), multiply sequentially. For Canada with 5% GST + 8% PST: multiply by 1.05 &times; 1.08 = 1.134.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "E-commerce Pricing", desc: "Set your product prices with or without VAT included. Add VAT to your base price to display the final consumer price on your store." },
              { title: "Invoice Preparation", desc: "Create accurate invoices by adding the correct VAT rate to your line items. Verify tax amounts before sending to clients." },
              { title: "Receipt Verification", desc: "Extract the tax from a total receipt to verify you were charged the correct amount. Useful for expense reports and accounting." },
              { title: "International Trade", desc: "Calculate VAT or GST for cross-border transactions using the appropriate country rate. Helpful for import/export pricing." },
              { title: "Budget Planning", desc: "Know the true cost of purchases by adding expected sales tax. Plan your spending with tax-inclusive amounts." },
              { title: "Price Comparison", desc: "Compare prices between countries by extracting different VAT rates. See the true pre-tax cost to make fair comparisons." },
              { title: "Tax Filing Preparation", desc: "Separate the tax component from gross revenue for your tax returns and GST/VAT filing with tax authorities." },
              { title: "Discount + Tax Combined", desc: "First calculate the discounted price with our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a>, then add tax to the result for the true out-of-pocket cost." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Accurate Tax Calculations</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always confirm which tax rate applies in your jurisdiction before calculating — rates can vary by product type, region, and time.",
              "When extracting tax from a gross price, remember: you divide by the multiplier, not subtract the percentage. 20% of $120 is not the same as 20% of $100.",
              "Some countries display prices with VAT included (UK, EU, Australia), while others show pre-tax prices (US, Canada). Use the correct mode accordingly.",
              "For compound taxes like Canada's GST + PST or India's CGST + SGST, calculate them sequentially rather than adding the rates together.",
              "Planning a purchase with both a discount and tax? Use our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> first, then add tax with this tool.",
              "Calculating a restaurant bill with tax and tip? Our <a href=\"/tools/calculator/tip-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Tip Calculator</a> handles bill splitting, tip percentages, and can help estimate the total.",
              "Need percentage-based calculations for tax brackets? Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> helps with any percentage math.",
              "Financing a large purchase? Our <a href=\"/tools/calculator/loan-emi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Loan/EMI Calculator</a> shows monthly payments and total interest on financed purchases.",
              "Check if reduced VAT rates apply — many countries have lower rates for essentials like food, medicine, books, and children's items.",
              "All calculations use your browser's JavaScript engine. No data is ever sent to a server.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Understanding VAT and Sales Tax */}
        <section className="mt-16 space-y-4" aria-label="Understanding VAT and sales tax">
          <h2 className="text-2xl font-bold tracking-tight">Understanding VAT and Sales Tax</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">VAT Around the World</h3>
              <p className="text-sm text-muted-foreground">
                Over 160 countries use VAT or GST systems. The EU has standardized VAT with rates from 17% (Luxembourg) to 27% (Hungary).
                The UK uses a 20% standard rate. Asian countries typically have lower rates — Japan at 10%, Australia and Singapore at 10% GST.
                The US is unique among developed nations in using a state-level sales tax system rather than a national VAT.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tax-Inclusive vs Tax-Exclusive Pricing</h3>
              <p className="text-sm text-muted-foreground">
                In VAT countries (UK, EU, Australia), prices displayed in shops typically include VAT — consumers see the final price.
                In sales tax countries (US), the displayed price excludes tax, which is added at checkout.
                This is why US shoppers often experience "sticker shock" at the register.
                Our calculator handles both systems with its two calculation modes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">VAT Registration Thresholds</h3>
              <p className="text-sm text-muted-foreground">
                Most countries have a registration threshold — a revenue level below which businesses do not need to charge VAT.
                In the UK, this is £90,000 (2024). In Australia, it's AUD $75,000. Below the threshold, businesses cannot charge VAT
                and also cannot reclaim input VAT, making tax calculation important for pricing decisions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Digital Services Tax</h3>
              <p className="text-sm text-muted-foreground">
                Many countries now impose VAT/GST on digital services (software, streaming, e-books) sold to consumers,
                regardless of where the seller is located. The EU, UK, Australia, and Japan all require foreign digital
                service providers to register and charge local VAT. Our calculator helps determine the correct tax-inclusive price
                for digital products in any market.
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
