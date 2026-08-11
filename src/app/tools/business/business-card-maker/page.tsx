import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BusinessCardMakerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BusinessCardMakerPage() {
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
        <section className="mt-8" aria-label="Business Card Maker Tool">
          <BusinessCardMakerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Business Card Maker</h2>
          <p className="text-muted-foreground">
            Design a professional business card in four easy steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your details</span> — Fill in your name, job title, company, phone, email, and website.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a card color</span> — Select from solid colors or gradient backgrounds. The text color auto-adjusts for readability.
            </li>
            <li>
              <span className="text-foreground font-medium">Pick a font and layout</span> — Choose Serif, Sans-Serif, or Monospace fonts and left-aligned or centered layout.
            </li>
            <li>
              <span className="text-foreground font-medium">Print your card</span> — Click Print to print at actual size or save as PDF for professional printing.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Live HTML preview updates as you type",
              "Standard 3.5×2 inch business card aspect ratio",
              "8 solid colors and 6 gradient options",
              "3 font styles: Serif, Sans-Serif, Monospace",
              "Left-aligned or centered layout options",
              "Custom text color with color picker",
              "One-click print or save as PDF",
              "No account or sign-up required",
              "100% client-side — your data stays private",
              "Responsive design for mobile editing",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Card Design Tips */}
        <section className="mt-16 space-y-4" aria-label="Card design tips">
          <h2 className="text-2xl font-bold tracking-tight">Business Card Design Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Keep It Simple</h3>
              <p className="text-sm text-muted-foreground">
                A clean, uncluttered design is more memorable than a busy one. Focus on readability and let your information speak for itself. White space is your friend.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Choose Readable Fonts</h3>
              <p className="text-sm text-muted-foreground">
                At business card size, small text becomes very small. Use a minimum of 9pt for contact details and 14–16pt for your name. Sans-serif fonts tend to be more readable at small sizes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Use High Contrast</h3>
              <p className="text-sm text-muted-foreground">
                Ensure your text color contrasts well with the card background. Dark text on light backgrounds or light text on dark backgrounds. The live preview helps you verify this instantly.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Match Your Brand</h3>
              <p className="text-sm text-muted-foreground">
                Use colors that match your company branding. Consistent colors across all materials build brand recognition. If your logo is blue, a navy or blue card reinforces that identity.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Proofread Everything</h3>
              <p className="text-sm text-muted-foreground">
                Typos on business cards are embarrassing and costly. Double-check every letter, number, and email address before printing. Have someone else review it too.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Consider the Back Side</h3>
              <p className="text-sm text-muted-foreground">
                The back of your card is valuable real estate. Use it for a QR code, tagline, or a subtle design element. A blank back is a missed opportunity.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Color Psychology */}
        <section className="mt-16 space-y-4" aria-label="Color psychology">
          <h2 className="text-2xl font-bold tracking-tight">Color Psychology for Business Cards</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { color: "Navy / Dark Blue", meaning: "Trust, stability, professionalism. Ideal for finance, law, and consulting firms." },
              { color: "Black / Charcoal", meaning: "Power, elegance, sophistication. Perfect for luxury brands and executive-level cards." },
              { color: "Forest Green", meaning: "Growth, health, sustainability. Great for environmental, health, and wellness businesses." },
              { color: "Burgundy / Deep Red", meaning: "Passion, confidence, leadership. Suitable for creative agencies and bold brands." },
              { color: "White / Light Gray", meaning: "Cleanliness, simplicity, transparency. Works universally, especially for tech and minimalist brands." },
              { color: "Gradient Effects", meaning: "Modern, dynamic, creative. Best for tech startups, design agencies, and innovative companies." },
            ].map((item) => (
              <div key={item.color} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.color}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Font Guide */}
        <section className="mt-16 space-y-4" aria-label="Font guide">
          <h2 className="text-2xl font-bold tracking-tight">Choosing the Right Font</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold" style={{ fontFamily: "Georgia, serif" }}>Serif</h3>
              <p className="text-sm text-muted-foreground">
                Traditional and authoritative. Best for law firms, accounting, finance, and established businesses. Conveys trust and reliability.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold" style={{ fontFamily: "Arial, sans-serif" }}>Sans-Serif</h3>
              <p className="text-sm text-muted-foreground">
                Modern and versatile. Ideal for tech companies, startups, and creative industries. Clean and highly readable at small sizes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold" style={{ fontFamily: "Courier New, monospace" }}>Monospace</h3>
              <p className="text-sm text-muted-foreground">
                Technical and distinctive. Perfect for developers, IT professionals, and engineering firms. Makes a memorable impression.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Printing Guide */}
        <section className="mt-16 space-y-4" aria-label="Printing guide">
          <h2 className="text-2xl font-bold tracking-tight">Printing Your Business Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "At Home", desc: "Use card stock paper (300+ gsm). Set print scale to 100% or actual size. Print on a single sheet and cut carefully with a paper cutter for clean edges." },
              { title: "Save as PDF", desc: "Use your browser's Print dialog and select 'Save as PDF'. This creates a vector-quality file you can take to any print shop for professional results." },
              { title: "Print Shop", desc: "For quantities over 50 cards, use a professional printer. They offer premium paper stocks, finishes (matte, glossy, spot UV), and precise cutting." },
              { title: "Online Services", desc: "Upload your PDF to online printing services like Vistaprint, Moo, or Canva Print for bulk orders with various paper and finish options." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
