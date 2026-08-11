import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { LoanEMICalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function LoanEMICalculatorPage() {
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
        <section className="mt-8" aria-label="Loan EMI Calculator Tool">
          <LoanEMICalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Loan / EMI Calculator</h2>
          <p className="text-muted-foreground">
            Calculate your monthly loan installment in three simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter the loan amount</span> — Use the slider or type the total amount you want to borrow (up to $10,000,000).
            </li>
            <li>
              <span className="text-foreground font-medium">Set the interest rate</span> — Adjust the slider or type the annual interest rate offered by your lender (typically 5–15% for most loans).
            </li>
            <li>
              <span className="text-foreground font-medium">Choose the loan tenure</span> — Toggle between months and years, then use the slider or input to set the repayment period. Click &quot;Calculate EMI&quot; to see your results.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Slider-based inputs for loan amount (up to $10M), interest rate (1–30%), and tenure",
              "Toggle between months and years for loan tenure input",
              "EMI calculation using the standard reducing balance formula used by banks",
              "Visual donut chart showing principal vs. interest ratio",
              "Complete amortization schedule with month-by-month breakdown",
              "Expandable table — shows first 12 months, click to view all",
              "Result cards for Monthly EMI, Total Interest, and Total Payment",
              "Detailed payment breakdown with percentage of interest over principal",
              "EMI formula reference with variable explanations",
              "100% browser-based — no server, no data collection, fully private",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. EMI Formula Explained */}
        <section className="mt-16 space-y-4" aria-label="EMI formula explained">
          <h2 className="text-2xl font-bold tracking-tight">EMI Formula Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">The EMI Formula</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</code>
              </p>
              <p className="text-sm text-muted-foreground">
                This is the standard reducing balance formula. P is the principal, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of monthly installments.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Understanding the Components</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">r = Annual Rate / 12 / 100</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The annual rate must be converted to a monthly decimal. For 8.5% annual: r = 8.5 / 12 / 100 = 0.007083. This is the rate applied to the outstanding balance each month.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Principal vs. Interest</h3>
              <p className="text-sm text-muted-foreground">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">Total Payment = EMI × n</code>
              </p>
              <p className="text-sm text-muted-foreground">
                The total payment minus the principal equals the total interest paid. In early months, most of the EMI covers interest; in later months, more goes to principal.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Reducing Balance Method</h3>
              <p className="text-sm text-muted-foreground">
                Interest is calculated on the remaining balance each month, not the original loan amount. As you pay down the principal, the interest portion decreases. This is why extra payments save more interest.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Example Calculation</h3>
              <p className="text-sm text-muted-foreground">
                For a $500,000 loan at 8% for 20 years: r = 0.00667, n = 240. EMI = 500000 × 0.00667 × (1.00667)^240 / ((1.00667)^240 - 1) ≈ $4,182.12 per month.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Impact of Rate Changes</h3>
              <p className="text-sm text-muted-foreground">
                Even a 0.5% change in interest rate can significantly impact your EMI and total cost. On a $300,000 loan for 25 years, the difference between 7.5% and 8% is about $90/month or $27,000 total.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Common use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Home Loan Planning", desc: "Calculate your monthly mortgage payment before applying. Compare different loan amounts, interest rates, and tenures to find the most affordable option for your dream home." },
              { title: "Car Loan Comparison", desc: "Compare EMI offers from different dealers and banks. See the total interest cost for 3-year vs. 5-year car loans to make an informed financing decision." },
              { title: "Personal Loan Budgeting", desc: "Check if a personal loan fits your monthly budget. Ensure your EMI stays within 30–40% of your income to maintain financial health." },
              { title: "Education Loan Planning", desc: "Plan education loan repayments before taking one. Estimate monthly payments during the study period and after graduation to plan your career finances." },
              { title: "Loan Refinancing Analysis", desc: "Compare your existing loan EMI with a new refinanced offer. See if a lower interest rate or shorter tenure saves enough to justify switching lenders." },
              { title: "Prepayment Impact Analysis", desc: "Use the amortization schedule to see how a one-time prepayment reduces your total interest. Plan partial prepayments to save the most on long-term loans." },
              { title: "Business Loan Assessment", desc: "Evaluate whether a business loan is viable by calculating the EMI and comparing it to expected monthly revenue from the investment." },
              { title: "Real Estate Investment", desc: "Calculate rental property loan costs and compare monthly EMI to expected rental income. Factor in maintenance and taxes for a complete investment picture." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips for Managing Loans */}
        <section className="mt-16 space-y-4" aria-label="Loan management tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Managing Loans Effectively</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Keep your total EMI payments under 40% of your monthly income. This ensures you have enough left for savings, emergencies, and daily expenses. Use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> to quickly find your EMI-to-income ratio.",
              "Always compare offers from at least 3–4 lenders before finalizing a loan. Even a 0.25% difference in interest rate can save thousands over the loan tenure. Negotiate with your preferred lender using competing offers.",
              "Choose the shortest tenure you can afford. A shorter loan means higher monthly EMI but dramatically lower total interest. If your income increases, consider increasing your EMI to close the loan faster.",
              "Make partial prepayments whenever you receive windfalls — bonuses, tax refunds, or investment maturity amounts. These go directly toward reducing the principal and save interest for the remaining tenure.",
              "Check for prepayment penalties before making extra payments. Some loans charge 1–4% of the prepayment amount. Factor this cost in to decide if prepaying is still worth it.",
              "Maintain a good credit score (typically 700+) to qualify for the lowest interest rates. A higher score can save you 0.5–2% on your interest rate, which translates to significant savings over the loan life.",
              "Consider loan insurance for large loans like home loans. It protects your family from the loan burden in case of job loss, disability, or death. Compare the insurance cost against the coverage benefit.",
              "When comparing discounts and offers from lenders, use our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> to calculate the actual savings from processing fee waivers and interest rate discounts.",
              "If you receive a tip or bonus that you plan to put toward your loan, use our <a href=\"/tools/calculator/tip-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Tip Calculator</a> to calculate percentages quickly and allocate the right amount.",
              "Review your loan statement annually. Banks sometimes make calculation errors or apply incorrect rates. Comparing your statement against the amortization schedule from this calculator helps you catch discrepancies early.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Understanding Loan Types */}
        <section className="mt-16 space-y-4" aria-label="Understanding loan types">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Loan Types</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Home Loans (Mortgages)</h3>
              <p className="text-sm text-muted-foreground">
                Home loans are typically the largest loans people take. They offer the longest tenures (up to 30 years) and relatively lower interest rates (6–9%). The loan is secured by the property, meaning the lender can seize it if you default. Tax benefits on home loan interest can reduce your effective cost. Use our calculator to compare 15-year vs. 30-year mortgage costs.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Car Loans (Auto Loans)</h3>
              <p className="text-sm text-muted-foreground">
                Car loans are shorter-term (3–7 years) and secured by the vehicle. Interest rates range from 5–12% depending on new vs. used, and your credit profile. New car loans typically get lower rates. A 0% dealer offer may not always be the best deal if the vehicle price is inflated to compensate.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Personal Loans</h3>
              <p className="text-sm text-muted-foreground">
                Personal loans are usually unsecured (no collateral) and have higher interest rates (10–24%). Tenures are shorter (1–5 years). They are useful for emergencies, weddings, or home renovation. Since rates are higher, keeping the tenure as short as possible is especially important to minimize total interest.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Education Loans</h3>
              <p className="text-sm text-muted-foreground">
                Education loans fund higher education with deferred repayment until after graduation. Interest rates vary (6–15%) and many government-subsidized options exist. The EMI starts after a moratorium period (course duration + 6–12 months). Calculate your expected EMI to ensure it fits your post-graduation budget.
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
