import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PayslipGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PayslipGeneratorPage() {
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
        <section className="mt-8" aria-label="Payslip Generator Tool">
          <PayslipGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Payslip Generator</h2>
          <p className="text-muted-foreground">
            Create a professional payslip in five simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter employer details</span> — Company name and address.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter employee details</span> — Full name, employee ID, department, and position.
            </li>
            <li>
              <span className="text-foreground font-medium">Set the pay period</span> — Start date, end date, and pay date.
            </li>
            <li>
              <span className="text-foreground font-medium">Add earnings and deductions</span> — Basic salary, tax rate, plus any additional earnings or deductions.
            </li>
            <li>
              <span className="text-foreground font-medium">Print the payslip</span> — Review the live preview and click Print for a clean, professional output.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Employer and employee information sections",
              "Pay period with start, end, and pay date fields",
              "Basic salary plus add/remove extra earnings",
              "Automatic tax calculation by percentage",
              "Add/remove custom deductions (insurance, pension, etc.)",
              "Auto-calculated Gross Pay, Total Deductions, and Net Pay",
              "Professional payslip document preview",
              "Side-by-side earnings and deductions tables",
              "One-click print with clean output",
              "100% client-side — no data leaves your browser",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Understanding Payslips */}
        <section className="mt-16 space-y-4" aria-label="Understanding payslips">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Payslip Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Gross Pay</h3>
              <p className="text-sm text-muted-foreground">
                Total earnings before any deductions. Includes basic salary, overtime pay, bonuses, and all allowances. This is your total compensation for the pay period.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tax Withholding</h3>
              <p className="text-sm text-muted-foreground">
                Income tax deducted based on the applicable tax rate. In many countries, employers are legally required to withhold tax and remit it to the government on behalf of employees.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Insurance & Pension</h3>
              <p className="text-sm text-muted-foreground">
                Common deductions for health insurance premiums, retirement/pension contributions, and social security. These are often shared costs between employer and employee.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Net Pay</h3>
              <p className="text-sm text-muted-foreground">
                The final take-home amount after all deductions. This is what gets deposited into your bank account. Always verify net pay matches your bank deposit.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Pay Period</h3>
              <p className="text-sm text-muted-foreground">
                The specific dates covered by the payslip. Common pay periods include weekly, biweekly, semi-monthly (1st and 15th), and monthly (last day of month).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Employee ID</h3>
              <p className="text-sm text-muted-foreground">
                A unique identifier assigned by the employer. Used for payroll tracking, tax filings, and internal HR records. Essential for matching payslips to employees.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Deductions Explained */}
        <section className="mt-16 space-y-4" aria-label="Common deductions">
          <h2 className="text-2xl font-bold tracking-tight">Common Deductions Explained</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Federal/State Income Tax", desc: "Mandatory tax withholding based on income brackets. Rates vary by jurisdiction and filing status." },
              { name: "Social Security (FICA)", desc: "In the US, 6.2% for Social Security and 1.45% for Medicare, matched by the employer." },
              { name: "Health Insurance", desc: "Premium for medical, dental, or vision insurance plans. Often pre-tax, reducing taxable income." },
              { name: "Retirement/Pension", desc: "Contributions to 401(k), IRA, or pension plans. Some employers offer matching contributions." },
              { name: "Union Dues", desc: "Regular payments to trade unions for membership benefits and collective bargaining representation." },
              { name: "Garnishments", desc: "Court-ordered deductions for child support, alimony, or debt repayment. Legally required and non-optional." },
            ].map((item) => (
              <div key={item.name} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Small Business Payroll", desc: "Generate payslips for small teams without investing in full payroll software." },
              { title: "Freelancer Income Proof", desc: "Create payslips to document self-employment income for visa, loan, or rental applications." },
              { title: "New Employer Setup", desc: "Quickly create professional payslips while setting up formal payroll processes." },
              { title: "Record Keeping", desc: "Generate and print payslips for personal financial records and tax preparation." },
              { title: "Employee Disputes", desc: "Create a clear payslip to resolve pay discrepancies with clear calculations visible." },
              { title: "International Employees", desc: "Generate payslips with custom deduction categories to match various country requirements." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Legal Requirements */}
        <section className="mt-16 space-y-4" aria-label="Legal requirements">
          <h2 className="text-2xl font-bold tracking-tight">Payslip Legal Requirements by Region</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { region: "United States", req: "No federal law requires payslips, but most states do. FLSA requires pay records be kept for 3 years." },
              { region: "United Kingdom", req: "Employers must provide itemized payslips by law. Must show gross pay, deductions, and net pay." },
              { region: "European Union", req: "Most EU countries mandate detailed payslips. Requirements vary but typically include gross, deductions, and net." },
              { region: "Australia", req: "Fair Work Act requires payslips within 1 working day of pay day. Must show hours, rate, deductions." },
              { region: "Canada", req: "Most provinces require written pay statements. Must show gross pay, deductions, and net pay." },
              { region: "India", req: "Payment of Wages Act requires wage slips showing earnings, deductions, and net wages paid." },
            ].map((item) => (
              <div key={item.region} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.region}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.req}</p>
              </div>
            ))}
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
