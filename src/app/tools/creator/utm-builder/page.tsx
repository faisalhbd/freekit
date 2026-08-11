import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { UTMBuilderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function UTMBuilderPage() {
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
        <section className="mt-8" aria-label="UTM Builder">
          <UTMBuilderTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the UTM Builder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your base URL</span> — Paste the landing page URL you want to track traffic to. It must start with https:// or http://.
            </li>
            <li>
              <span className="text-foreground font-medium">Set utm_source</span> — Select from common presets (google, facebook, twitter, etc.) or type a custom source name identifying the platform sending traffic.
            </li>
            <li>
              <span className="text-foreground font-medium">Set utm_medium</span> — Choose the marketing medium (cpc, email, social, etc.) that describes how the user reached your link.
            </li>
            <li>
              <span className="text-foreground font-medium">Name your campaign</span> — Enter a descriptive campaign name like summer-sale-2025 to group related links together in analytics.
            </li>
            <li>
              <span className="text-foreground font-medium">Add optional parameters</span> — Include utm_term for paid search keywords and utm_content for A/B testing different ad variants or placements.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy your URL</span> — Click the Copy URL button to copy the complete UTM-tagged link to your clipboard and use it in your campaigns.
            </li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time URL generation as you type each parameter",
              "Common preset dropdowns for utm_source and utm_medium",
              "URL validation with clear error messages",
              "URL breakdown view showing base URL and each parameter separately",
              "Parameters summary table for quick review",
              "One-click copy to clipboard with visual feedback",
              "Proper URL encoding for special characters and spaces",
              "Clear All button to reset all fields instantly",
              "Required vs optional field badges for guidance",
              "100% client-side — your URLs are never sent to any server",
              "Clean, responsive interface that works on any device",
              "Supports all five standard UTM parameters",
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
          <h2 className="text-2xl font-bold tracking-tight">Benefits of Using UTM Parameters</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "Accurate Traffic Attribution",
                d: "UTM parameters tell you exactly where your visitors come from — not just which site referred them, but which specific campaign, ad variant, or email send drove the click. This precision eliminates guesswork from your marketing analytics.",
              },
              {
                t: "Campaign Performance Comparison",
                d: "By tagging each campaign with a unique utm_campaign value, you can directly compare performance across different initiatives in your analytics dashboard. Know at a glance which campaigns drive the most conversions.",
              },
              {
                t: "A/B Testing Insights",
                d: "Use utm_content to differentiate between different versions of the same campaign. Track which headline, image, or call-to-action variant drives more clicks and conversions, enabling data-driven optimization.",
              },
              {
                t: "Cleaner Analytics Data",
                d: "Without UTM parameters, traffic from paid ads, social posts, and email campaigns all gets lumped together under vague categories. UTM tags give you clean, organized data that makes reporting straightforward and actionable.",
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
              { t: "Social Media Campaigns", d: "Tag links shared on Facebook, Twitter/X, LinkedIn, Instagram, and TikTok to measure which platform drives the most engaged traffic for each campaign." },
              { t: "Email Marketing", d: "Track which newsletters, automated sequences, or one-off emails generate the most clicks by using unique utm_source and utm_campaign values for each send." },
              { t: "Paid Advertising", d: "Add utm_term to track which keywords trigger ad clicks, and utm_content to compare different ad creatives, headlines, and placements side by side." },
              { t: "Influencer Partnerships", d: "Give each influencer a unique UTM-tagged link to measure individual performance and calculate accurate ROI for each partnership." },
              { t: "Content Marketing", d: "Track traffic from guest blog posts, podcast show notes, YouTube descriptions, and other content placements with unique campaign tags." },
              { t: "Affiliate Programs", d: "Use utm_source to identify which affiliate drives each conversion, making it easy to calculate commissions and reward top performers." },
              { t: "Event Marketing", d: "Tag links shared in event invitations, speaker bios, and sponsor materials to measure the traffic impact of each event you participate in." },
              { t: "QR Code Tracking", d: "Combine UTM-tagged URLs with QR codes on print materials, business cards, or posters to bridge offline and online analytics." },
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
          <h2 className="text-2xl font-bold tracking-tight">UTM Parameter Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Establish a team-wide naming convention document and stick to it — consistency is the key to clean analytics data.",
              "Always use lowercase letters for UTM values to avoid duplicate entries caused by case-sensitivity in some analytics tools.",
              "Use hyphens instead of spaces or underscores in campaign names (e.g., summer-sale not summer_sale or summer sale).",
              "Never use UTM parameters on internal links within your own website — this creates self-referral issues in analytics.",
              "Keep utm_campaign names short but descriptive enough to be meaningful in reports weeks or months later.",
              "Test every generated UTM link by clicking it before deploying — verify the URL and parameters look correct in the browser.",
              "Use a URL shortener for UTM-tagged links shared on social media to keep them clean and trackable.",
              "Document your UTM strategy in a shared spreadsheet so team members can reference existing conventions before creating new tags.",
              "Avoid using personally identifiable information (PII) in UTM parameters for privacy and compliance reasons.",
              "Periodically audit your UTM data in analytics to identify and fix inconsistent or deprecated naming conventions.",
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
