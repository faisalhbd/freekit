import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { InvoiceGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function InvoiceGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Interface */}
        <section className="mt-8" aria-label="Invoice Generator">
          <InvoiceGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Invoice Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your business details</span> — Add your company name, address, email, and phone number. This appears at the top of the invoice as the sender.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter client information</span> — Add the client's name, billing address, and email. This appears in the "Bill To" section of the invoice.
            </li>
            <li>
              <span className="text-foreground font-medium">Set invoice details</span> — The invoice number is auto-generated but editable. Set the issue date and due date for payment.
            </li>
            <li>
              <span className="text-foreground font-medium">Add line items</span> — Describe each service or product, enter the quantity and unit price. Line totals are calculated automatically. Add or remove rows as needed.
            </li>
            <li>
              <span className="text-foreground font-medium">Set tax and discounts</span> — Enter a tax rate percentage and optionally apply a flat or percentage-based discount to the subtotal.
            </li>
            <li>
              <span className="text-foreground font-medium">Add notes and print</span> — Include payment terms or thank-you notes, then click Print Invoice to print or save as PDF.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Auto-generated invoice number (editable)",
              "Five-tab editor: Business, Client, Details, Items, Extras",
              "Unlimited line items with automatic line total calculation",
              "Tax rate percentage with automatic tax amount",
              "Discount support: flat amount or percentage",
              "Live invoice preview with professional formatting",
              "Print-optimized output — editor hidden during print",
              "Notes section for payment terms or messages",
              "100% client-side — no data leaves your browser",
              "No sign-up, no watermarks, no limits",
              "Responsive layout works on all devices",
              "Clean, professional invoice document layout",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Benefits */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using Our Invoice Generator</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Save Time on Billing",
                d: "Stop creating invoices manually in Word or Excel. Our generator handles calculations automatically so you can create a professional invoice in under two minutes.",
              },
              {
                t: "Zero Cost",
                d: "No monthly fees, no per-invoice charges, no premium tiers. Generate unlimited invoices for free — perfect for freelancers and small businesses watching their budget.",
              },
              {
                t: "Professional Appearance",
                d: "Your invoices reflect your brand. Clean layout, proper alignment, and clear totals make you look polished and help clients process payments faster.",
              },
              {
                t: "Complete Privacy",
                d: "Client and financial data stays in your browser. No server storage means no risk of data breaches or unauthorized access to your business information.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Invoice Best Practices */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Invoice Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always use a unique, sequential invoice number for easy tracking and accounting.",
              "Set clear payment terms in the notes — specify the due date and accepted payment methods.",
              "Send invoices promptly after delivering work to avoid payment delays.",
              "Be specific in line item descriptions — 'Website redesign for homepage and about page' is better than 'Services'.",
              "Include your business contact information so clients can reach you with questions.",
              "Follow up on overdue invoices with a polite reminder after the due date has passed.",
              "Keep a copy of every invoice you send for tax and accounting purposes.",
              "Review the live preview carefully before printing to catch any typos or calculation errors.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Common Use Cases */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Freelance Projects", d: "Bill clients for design, development, writing, or consulting work with detailed line items for each deliverable." },
              { t: "Small Business Billing", d: "Create invoices for product sales, service contracts, or monthly retainers." },
              { t: "Contract Work", d: "Send professional invoices for contract-based work with clear terms and milestones." },
              { t: "Consulting Services", d: "Invoice for hourly or project-based consulting with detailed descriptions of services rendered." },
              { t: "Event Services", d: "Bill for photography, catering, venue rental, or event planning services." },
              { t: "Recurring Billing", d: "Generate consistent invoices for retainer clients or subscription-based services." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16 print:hidden" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16 print:hidden" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>
        <div className="print:hidden">
          <ToolPageCTA />
        </div>
      </div>
    </>
  )
}
