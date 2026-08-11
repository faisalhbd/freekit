import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { OGTagGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function OGTagGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="OG Tag Generator Tool"><OGTagGeneratorTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate OG Tags Online</h2>
          <p className="text-muted-foreground">Creating Open Graph tags takes just a few steps:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Fill in your content details</span> — Enter the page title (under 60 chars), description (under 200 chars), and image URL (1200×630px recommended).</li>
            <li><span className="text-foreground font-medium">Set the OG type and locale</span> — Choose the content type (website, article, product, etc.) and language locale for your audience.</li>
            <li><span className="text-foreground font-medium">Configure Twitter Card tags</span> — Select a Twitter card type and add handles for site and creator attribution.</li>
            <li><span className="text-foreground font-medium">Copy and paste the HTML</span> — Switch to Code view, click Copy, and paste the tags into your HTML &lt;head&gt; section.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["All required OG tags: og:title, og:description, og:image, og:url, og:type","7 og:type options: website, article, profile, book, music, video, product","Article-specific fields: published_time, author, section (shown dynamically)","8 locale options for international content targeting","Twitter Card tags: summary, summary_large_image, player, app","Real-time social preview showing how your link will appear when shared","Character count indicators for title (60) and description (200)","Toggle between Preview and Code views","One-click copy to clipboard for the generated HTML","100% browser-based — no server, no tracking, no data collection"].map((f) => (
              <li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>
            ))}
          </ul>
        </section>
        <section className="mt-16 space-y-4" aria-label="Why OG tags matter">
          <h2 className="text-2xl font-bold tracking-tight">Why OG Tags Matter</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Control Your Social Presence</h3>
              <p className="text-sm text-muted-foreground">Without OG tags, social platforms guess your page title, description, and image — often with poor results. OG tags give you full control over how your content appears when shared.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Increase Click-Through Rates</h3>
              <p className="text-sm text-muted-foreground">Pages with properly configured OG tags get 2-3x higher click-through rates on social media. A compelling title, description, and attractive image make your shared links stand out in feeds.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Consistent Branding Across Platforms</h3>
              <p className="text-sm text-muted-foreground">OG tags ensure your content looks consistent whether shared on Facebook, LinkedIn, Twitter, Discord, Slack, or iMessage. One set of tags works across all platforms.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Essential for Content Marketing</h3>
              <p className="text-sm text-muted-foreground">Every blog post, product page, and landing page should have OG tags. They are essential for content marketing, social sharing campaigns, and maximizing the reach of your content.</p>
            </div>
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[{t:"Blog Posts & Articles",d:"Set og:type to article with published_time and author for rich social previews of your blog content."},{t:"Product Pages",d:"Use og:type product with a high-quality product image for attractive e-commerce social sharing."},{t:"Landing Pages",d:"Create compelling social previews for marketing landing pages to increase campaign conversion rates."},{t:"Portfolio & Personal Sites",d:"Use og:type profile with a professional photo for consistent personal branding across social platforms."},{t:"News & Media Sites",d:"Article-type OG tags with author and section help news content get proper treatment in social feeds."},{t:"Event Pages",d:"Generate engaging previews for event pages with date, location, and featured imagery."},{t:"Documentation Sites",d:"Help users share specific documentation pages with proper titles and descriptions."},{t:"SaaS & App Pages",d:"Create previews for app landing pages that drive installs and sign-ups from social shares."}].map((i) => (
              <div key={i.t} className="rounded-lg border border-border bg-card p-4"><h3 className="text-sm font-semibold">{i.t}</h3><p className="mt-1 text-sm text-muted-foreground">{i.d}</p></div>
            ))}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices for OG Tags</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Keep og:title under 60 characters — longer titles get truncated in social previews.","Write a compelling og:description under 200 characters that encourages clicks.","Use a 1200×630px image in JPG or PNG format for optimal display on all platforms.","Always include og:url with the canonical URL to prevent duplicate content issues.","Use og:type article for blog posts and include article:published_time for date display.","Validate your tags with Facebook Sharing Debugger and Twitter Card Validator after deployment.","Combine OG tags with a complete meta tag setup for maximum SEO and social visibility.","Use our Meta Tag Generator for title, description, and other essential HTML meta tags.","Generate structured data with our Schema / JSON-LD Generator for Google rich snippets.","Check your keyword density with our Keyword Density Checker to optimize your content for search engines."].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{__html: tip
                  .replace(/our (Meta Tag Generator)/,'<a href="/tools/seo/meta-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                  .replace(/our (Schema \/ JSON-LD Generator)/,'<a href="/tools/seo/schema-markup-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                  .replace(/our (Keyword Density Checker)/,'<a href="/tools/seo/keyword-density-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-16" aria-label="FAQ"><FAQSection items={faqs} /></section>
        <section className="mt-16" aria-label="Related tools"><ToolFooter tool={toolConfig} /></section>
        <ToolPageCTA />
      </div>
    </>
  )
}
