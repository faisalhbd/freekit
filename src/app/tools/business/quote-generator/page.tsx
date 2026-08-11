import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { QuoteGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function QuoteGeneratorPage() {
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
        <section className="mt-8" aria-label="Quote Generator">
          <QuoteGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Quote Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your business details</span> — Add your company name, address, email, and phone. This appears at the top of the quote as the sender.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter client information</span> — Add the prospective client's name, address, and email in the "Prepared For" section.
            </li>
            <li>
              <span className="text-foreground font-medium">Set quote details</span> — The quote number is auto-generated. Set the date and a "Valid Until" date to define how long the quote is valid.
            </li>
            <li>
              <span className="text-foreground font-medium">Add line items</span> — List each product or service with a description, quantity, and unit price. Line totals calculate automatically.
            </li>
            <li>
              <span className="text-foreground font-medium">Set tax, discounts, and terms</span> — Apply tax rates, optional discounts, and add terms and conditions that the client must agree to.
            </li>
            <li>
              <span className="text-foreground font-medium">Print and send</span> — Review the live preview, then print the quote or save as PDF to email to your client.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Auto-generated quote number (editable)",
              "Five-tab editor: Business, Client, Details, Items, Extras",
              "Unlimited line items with automatic calculations",
              "Tax rate percentage with automatic tax amount",
              "Discount support: flat amount or percentage",
              "Terms & Conditions section for legal terms",
              "Notes section for additional information",
              "Client acceptance block with signature lines",
              "Live quote preview with professional formatting",
              "Print-optimized output — editor hidden during print",
              "100% client-side — no data leaves your browser",
              "No sign-up, no watermarks, no limits",
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
          <h2 className="text-2xl font-bold tracking-tight">Why Use Our Quote Generator</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Win More Clients",
                d: "A professional, well-formatted quote makes a strong first impression. Clients are more likely to trust and accept a clearly presented quote than a vague email.",
              },
              {
                t: "Save Time",
                d: "Stop spending time formatting quotes in Word or Google Docs. Fill in the fields, review the live preview, and print in under two minutes.",
              },
              {
                t: "Clear Terms",
                d: "Include terms and conditions, validity periods, and acceptance signatures to protect both you and your client. Clear terms reduce disputes later.",
              },
              {
                t: "Free and Private",
                d: "No subscriptions, no per-quote fees. Your client and pricing data stays in your browser — never uploaded, never stored on any server.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Quote vs Invoice vs Estimate */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Quote vs Invoice vs Estimate">
          <h2 className="text-2xl font-bold tracking-tight">Quote vs Invoice vs Estimate</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { t: "Quote", d: "A fixed-price offer for specific work. Once the client signs, you are bound to the quoted price. Used when scope is well-defined." },
              { t: "Estimate", d: "An approximate cost projection. The final price may vary based on actual work performed. Used when scope is unclear or variable." },
              { t: "Invoice", d: "A bill for completed work requesting payment. Sent after the work is done or at agreed milestones. Includes payment due date." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Common Use Cases */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Service Proposals", d: "Present a detailed breakdown of services, hours, and costs to prospective clients for their review and approval." },
              { t: "Project Bidding", d: "Submit competitive quotes for project-based work with clear deliverables and pricing for each component." },
              { t: "Product Pricing", d: "Provide itemized pricing for bulk orders, custom products, or equipment packages with quantities and unit prices." },
              { t: "Event Planning", d: "Quote for venue rental, catering, equipment, and staffing with line items for each service category." },
              { t: "Home Services", d: "Plumbers, electricians, landscapers, and cleaners can provide professional estimates before starting work." },
              { t: "Consulting Engagements", d: "Outline the scope, timeline, and cost of consulting projects with clear terms and acceptance requirements." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Best Practices */}
        <section className="mt-16 space-y-4 print:hidden" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Quote Writing Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Be specific in your line item descriptions — vague descriptions lead to scope disputes later.",
              "Always set a validity period (usually 30 days) so the quote expires and you are not bound to old prices.",
              "Include clear payment terms — specify deposit requirements, milestone payments, and final payment timing.",
              "Number your quotes sequentially for easy tracking and reference in future communications.",
              "Add an acceptance section with signature lines to create a formal agreement when signed.",
              "State what is not included in the quote to avoid assumptions about scope.",
              "Send the quote as a PDF (use Print > Save as PDF) for a professional, uneditable format.",
              "Follow up if you have not heard back before the quote expires.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 10. FAQ Section */}
        <section className="mt-16 print:hidden" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 11. Related Tools + CTA */}
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
