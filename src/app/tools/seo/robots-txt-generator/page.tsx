import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { RobotsTxtGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function RobotsTxtGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Robots.txt Generator"><RobotsTxtGeneratorTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate a robots.txt File</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Select user agents</span> — Choose which crawlers to target (all crawlers, Google, Bing, etc.) or enter a custom user-agent.</li>
            <li><span className="text-foreground font-medium">Add rules</span> — Specify Allow or Disallow paths for each user-agent group. Add as many rules as needed.</li>
            <li><span className="text-foreground font-medium">Add sitemaps</span> — Enter your XML sitemap URLs to help crawlers discover your content faster.</li>
            <li><span className="text-foreground font-medium">Copy and deploy</span> — Copy the generated robots.txt and place it in your website's root directory.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Multiple user-agent groups with per-agent rules","7 preset crawlers: Google, Bing, Yahoo, DuckDuckGo, Facebook, Twitter/X, and All (*)","Allow and Disallow directives for each path","Crawl-delay support per user-agent group","Multiple sitemap URLs","Custom user-agent input for any crawler","Dynamic rule management: add, remove, edit rules","Real-time output preview as you configure","One-click copy to clipboard","100% browser-based — no server, no data collection"].map((f) => <li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>)}
          </ul>
        </section>
        <section className="mt-16 space-y-4" aria-label="Why robots.txt matters">
          <h2 className="text-2xl font-bold tracking-tight">Why robots.txt Matters</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{t:"Control Crawler Access",d:"Prevent crawlers from wasting crawl budget on admin, login, API, or duplicate pages. Direct them to your most important content instead."},{t:"Improve Crawl Efficiency",d:"Search engines have a crawl budget for each site. By blocking non-essential pages, crawlers spend more time on your content pages."},{t:"Hide Non-Public Content",d:"Block access to draft pages, staging areas, internal search results, and other content not meant for the public."},{t:"Point to Sitemaps",d:"Including your sitemap URL in robots.txt helps search engines discover all your important pages quickly and efficiently."}].map((i) => <div key={i.t} className="rounded-xl border border-border bg-card p-5 space-y-2"><h3 className="font-semibold">{i.t}</h3><p className="text-sm text-muted-foreground">{i.d}</p></div>)}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[{t:"WordPress Sites",d:"Block /wp-admin/, /wp-includes/, and /?s= to prevent crawling admin and search query pages."},{t:"Next.js & React Apps",d:"Block /api/ and /_next/static/ while allowing all page routes."},{t:"E-Commerce Sites",d:"Block cart, checkout, account, and search pages while allowing product and category pages."},{t:"Blog Platforms",d:"Allow content pages and sitemap, block admin panels and tag/search archives."},{t:"API Documentation",d:"Allow docs and sitemap, block internal API endpoints and testing routes."},{t:"Multi-Language Sites",d:"Use separate user-agent rules for different language subdirectories if needed."},{t:"Staging Environments",d:"Block all crawlers from staging.example.com to prevent indexing of test content."},{t:"Media Sites",d:"Block /media/, /uploads/ raw directories while allowing image pages and articles."}].map((i) => <div key={i.t} className="rounded-lg border border-border bg-card p-4"><h3 className="text-sm font-semibold">{i.t}</h3><p className="mt-1 text-sm text-muted-foreground">{i.d}</p></div>)}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Always test your robots.txt with Google Search Console's testing tool after deploying.","Keep robots.txt simple — complex rules can cause unexpected crawling behavior.","Never use robots.txt to hide sensitive data. Use proper authentication instead.","Include a sitemap directive to help crawlers find all your important pages.","Use Disallow: / for admin areas rather than listing every individual page.","Place robots.txt in the root directory: yourdomain.com/robots.txt.","Check for crawl errors in Google Search Console regularly.","Use our Meta Tag Generator to ensure your pages have proper meta robots directives.","Combine with OG tags from our OG Tag Generator for complete social and search optimization.","Add structured data with our Schema / JSON-LD Generator to enhance search result appearances."].map((tip, idx) => <li key={idx} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" /><span dangerouslySetInnerHTML={{__html: tip
  .replace(/our (Meta Tag Generator)/g,'<a href="/tools/seo/meta-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (OG Tag Generator)/g,'<a href="/tools/seo/og-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (Schema \/ JSON-LD Generator)/g,'<a href="/tools/seo/schema-markup-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
}} /></li>)}
          </ul>
        </section>
        <section className="mt-16" aria-label="FAQ"><FAQSection items={faqs} /></section>
        <section className="mt-16" aria-label="Related tools"><ToolFooter tool={toolConfig} /></section>
        <ToolPageCTA />
      </div>
    </>
  )
}