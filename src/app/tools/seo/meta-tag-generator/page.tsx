import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MetaTagGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MetaTagGeneratorPage() {
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
        <section className="mt-8" aria-label="Meta Tag Generator Tool">
          <MetaTagGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate Meta Tags Online</h2>
          <p className="text-muted-foreground">
            Creating optimized meta tags takes just a few steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Enter your page title</span> —
              Type a clear, descriptive title that includes your primary keyword. Keep it under 60
              characters for the best display in search results. The live character counter will
              turn amber near the limit and red if you exceed it.
            </li>
            <li>
              <span className="text-foreground font-medium">Write your meta description</span> —
              Craft a compelling summary of your page in 140-160 characters. Include your target
              keyword and a call-to-action to encourage clicks from search results.
            </li>
            <li>
              <span className="text-foreground font-medium">Add optional fields</span> —
              Fill in keywords, canonical URL, author name, OG image, and social media card
              preferences. The viewport, charset, and robots fields come pre-filled with the most
              common defaults.
            </li>
            <li>
              <span className="text-foreground font-medium">Copy the generated HTML</span> —
              The tool generates clean, properly formatted HTML code in real time. Click the
              "Copy HTML" button and paste it into the &lt;head&gt; section of your webpage.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time HTML generation as you type — no button clicks needed",
              "Live character counter with color-coded indicators (green, amber, red)",
              "Google search result preview showing exactly how your page will appear in SERPs",
              "Title tag generation with 60-character best-practice guidance",
              "Meta description with 160-character limit tracking",
              "Open Graph (OG) tags for Facebook, LinkedIn, and other social platforms",
              "Twitter Card markup with summary and summary_large_image support",
              "Canonical URL tag to prevent duplicate content issues",
              "Viewport, charset, and robots meta directives with smart defaults",
              "One-click copy to clipboard — paste directly into your HTML",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Why Meta Tags Matter */}
        <section className="mt-16 space-y-4" aria-label="Why meta tags matter">
          <h2 className="text-2xl font-bold tracking-tight">Why Meta Tags Matter for SEO</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Higher Click-Through Rates</h3>
              <p className="text-sm text-muted-foreground">
                A well-written title and meta description act as your ad copy in search results.
                Pages with compelling meta tags receive significantly more clicks than those
                with auto-generated or missing metadata.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Better Social Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Open Graph and Twitter Card tags ensure your pages look great when shared on
                social media. Without them, platforms may display incorrect titles, missing
                images, or irrelevant descriptions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Duplicate Content Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Canonical tags tell search engines which version of a page is authoritative.
                This is critical for e-commerce sites, blogs with URL parameters, and any site
                with similar content accessible through multiple URLs.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Mobile and Browser Compatibility</h3>
              <p className="text-sm text-muted-foreground">
                The viewport meta tag ensures your page renders correctly on all devices,
                while the charset declaration guarantees proper text encoding. Both are
                essential for user experience and are factored into Google rankings.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "New Website Launch", desc: "Generate a complete set of meta tags for every page of a new website to start with strong SEO fundamentals from day one." },
              { title: "Blog Posts & Articles", desc: "Create unique title tags and meta descriptions for each blog post with targeted keywords to improve organic search visibility." },
              { title: "E-Commerce Product Pages", desc: "Optimize product page meta tags with product names, features, and prices to stand out in Google Shopping and search results." },
              { title: "Landing Pages", desc: "Craft compelling meta descriptions for marketing landing pages that maximize click-through rates from paid and organic traffic." },
              { title: "Social Media Campaigns", desc: "Set up Open Graph and Twitter Card tags so shared links display attractive previews with the right image and description." },
              { title: "Website Redesigns & Migrations", desc: "Update canonical URLs and meta tags during site migrations to maintain search rankings and prevent duplicate content." },
              { title: "Local Business Pages", desc: "Optimize meta tags with location-based keywords and business information to improve local search visibility and map results." },
              { title: "Technical SEO Audits", desc: "Quickly identify missing or poorly optimized meta tags across a website and generate corrected versions in seconds." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Meta Tag Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Keep your title tag between 50-60 characters to avoid truncation in Google search results. Place your primary keyword as close to the beginning as possible.",
              "Write unique meta descriptions for every page. Never duplicate descriptions across pages — search engines may penalize template or auto-generated descriptions.",
              "Use our OG Tag Generator for more advanced Open Graph configuration including site name, locale, and article-specific metadata like publish date and author.",
              "Include your canonical URL on every page, especially if your site has URL parameters, session IDs, or multiple paths to the same content.",
              "Use the robots meta tag strategically. Set \"noindex, follow\" for tag pages, pagination, and thin-content pages, while keeping \"index, follow\" for your core content.",
              "For paginated content, use our Robots.txt Generator to configure crawl directives and the canonical tag to point to the first page or a view-all page.",
              "Optimize your OG image to 1200×630px with a file size under 5MB. This ensures your links look great when shared on Facebook, Twitter, LinkedIn, and Slack.",
              "Test your meta tags with Google\'s Rich Results Test and the Open Graph Debugger to verify how they appear before publishing.",
              "Combine meta tags with our Keyword Density Checker to ensure your target keywords appear naturally in both your meta tags and page content.",
              "Go beyond meta tags with our Schema / JSON-LD Generator to add structured data that enables rich results like star ratings, FAQs, and breadcrumbs in Google search.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (OG Tag Generator)/,
                      '<a href="/tools/seo/og-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Robots\.txt Generator)/,
                      '<a href="/tools/seo/robots-txt-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Keyword Density Checker)/,
                      '<a href="/tools/seo/keyword-density-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Schema \/ JSON-LD Generator)/,
                      '<a href="/tools/seo/schema-markup-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 9. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* 10. CEO / Hire Me CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
