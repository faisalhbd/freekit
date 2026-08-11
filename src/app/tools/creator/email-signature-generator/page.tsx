import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { EmailSignatureGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function EmailSignatureGeneratorPage() {
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

        {/* 3. Tool Section */}
        <section className="mt-8" aria-label="Email Signature Generator">
          <EmailSignatureGeneratorTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Email Signature Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Fill in your details</span> — Enter your name, job title, company, email, phone, and website in the Personal and Contact tabs.
            </li>
            <li>
              <span className="text-foreground font-medium">Add social links</span> — Switch to the Social tab and add your LinkedIn, Twitter/X, GitHub, and Instagram profile URLs.
            </li>
            <li>
              <span className="text-foreground font-medium">Upload a profile photo</span> — Optionally upload a profile image that will be embedded as a circular avatar in your signature.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a layout style</span> — Select from Professional, Modern, Minimal, or Bold layouts to match your brand personality.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize the accent color</span> — Pick a brand color using the color picker or preset swatches to personalize your signature.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview and copy</span> — Review the live preview, then click Copy HTML to paste it into your email client's signature settings.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "4 layout styles: Professional, Modern, Minimal, and Bold",
              "Live HTML preview that updates in real time as you type",
              "Table-based HTML output for maximum email client compatibility",
              "Inline CSS styling that works in Gmail, Outlook, Apple Mail, and more",
              "Profile image upload with base64 embedding or initials fallback",
              "4 social media links: LinkedIn, Twitter/X, GitHub, Instagram",
              "Inline SVG social icons for crisp rendering at any size",
              "Custom accent color picker with hex input and preset swatches",
              "Tabbed input interface for organized form fields",
              "One-click HTML copy with clipboard feedback",
              "Clean, copy-paste-ready HTML code output",
              "100% client-side — no data leaves your browser",
              "Fully responsive design for editing on any device",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Benefits */}
        <section className="mt-16 space-y-4" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits of a Professional Email Signature</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Builds Professional Credibility",
                d: "A well-designed email signature signals professionalism and attention to detail. It shows recipients that you take your communication seriously, which is especially important for first impressions with new clients, partners, and prospects.",
              },
              {
                t: "Reinforces Brand Identity",
                d: "Every email you send becomes a branding opportunity. Consistent use of your brand colors, logo, and social links across all team members' signatures creates a unified, professional image that strengthens your company's identity.",
              },
              {
                t: "Drives Website Traffic",
                d: "Including a website link in your email signature gives every recipient a direct path to your site. With thousands of emails sent annually, this creates a steady stream of referral traffic at zero additional cost.",
              },
              {
                t: "Increases Social Media Following",
                d: "Social media icons in your signature make it effortless for email recipients to connect with you on professional networks like LinkedIn and Twitter, helping you grow your audience organically with every email sent.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Business Professionals", d: "Create a polished signature that includes your title, company, and contact details for daily business correspondence with clients and partners." },
              { t: "Freelancers & Consultants", d: "Build trust with potential clients by including your expertise title, website, and LinkedIn profile in every proposal and follow-up email." },
              { t: "Job Seekers", d: "Stand out in networking emails and recruiter outreach with a clean signature that highlights your professional brand and online presence." },
              { t: "Small Business Owners", d: "Reinforce your brand with every customer email by including your business name, website, and social media links." },
              { t: "Sales Teams", d: "Include direct phone lines and calendar links in sales signatures to make it easy for prospects to reach out and book meetings." },
              { t: "Developers & Designers", d: "Showcase your GitHub profile, portfolio website, and technical social links to establish credibility in the tech community." },
              { t: "Customer Support", d: "Provide customers with quick access to support channels, phone numbers, and help documentation through your support team signatures." },
              { t: "Team Onboarding", d: "Quickly generate consistent signatures for new team members to maintain a unified brand image across all outgoing company emails." },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Email Signature Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Keep your signature concise — 3 to 5 lines of information is the ideal length for professional correspondence.",
              "Use a high-contrast accent color that matches your brand and is easily readable against white backgrounds.",
              "Include only relevant social links — prioritize LinkedIn and Twitter/X over personal platforms like Instagram for business emails.",
              "Use a real photo rather than a logo for your profile image in signatures — faces create stronger personal connections.",
              "Test your signature by sending test emails to yourself across different clients (Gmail, Outlook, Apple Mail) before deploying.",
              "Avoid animated GIFs, background images, or JavaScript in signatures — most email clients will strip them out.",
              "Include a legal disclaimer only if your industry requires it — otherwise it adds unnecessary clutter.",
              "Keep profile images small (80×80 to 100×100 pixels) to avoid large email sizes and slow loading.",
              "Update your signature when you change roles, companies, or contact information to keep it accurate.",
              "Use our table-based HTML output rather than designing in a word processor — it ensures maximum cross-client compatibility.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
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
