import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SchemaMarkupGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SchemaMarkupGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Schema / JSON-LD Generator"><SchemaMarkupGeneratorTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Generate JSON-LD Schema Markup</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Choose a schema type</span> — Select from Article, FAQ, Product, Local Business, Organization, Breadcrumb, or How-To.</li>
            <li><span className="text-foreground font-medium">Fill in the fields</span> — Enter your content details. Each schema type has its own specific fields.</li>
            <li><span className="text-foreground font-medium">Copy the JSON-LD</span> — Toggle to Code view, click Copy, and paste into your HTML head.</li>
            <li><span className="text-foreground font-medium">Validate and deploy</span> — Test with Google Rich Results Test and deploy.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["7 schema types: Article, FAQ Page, Product, Local Business, Organization, Breadcrumb, How-To","Clean, validated JSON-LD output with proper @context and @type","Preview mode shows formatted JSON for easy reading","Product schema with price, brand, availability, and ratings","FAQ schema with automatic question/answer parsing","LocalBusiness with full address and geo coordinates support","BreadcrumbList schema for navigation structure","How-To schema with up to 3 steps","One-click copy to clipboard","Reset button to start a new schema quickly","100% browser-based — no server, no data collection"].map((f) => <li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>)}
          </ul>
        </section>
        <section className="mt-16 space-y-4" aria-label="Schema types explained">
          <h2 className="text-2xl font-bold tracking-tight">Schema Types Explained</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{t:"Article",d:"For blog posts, news articles, and opinion pieces. Includes headline, author, publisher, dates, and images."},{t:"FAQ Page",d:"For FAQ sections. Each question-answer pair becomes a rich accordion in Google search results."},{t:"Product",d:"For e-commerce products. Shows price, availability, ratings, and reviews in search results."},{t:"Local Business",d:"For physical stores. Displays address, phone, hours, and a map pin in search results."},{t:"Organization",d:"For company information. Shows company name, logo, and social profiles in Google's knowledge panel."},{t:"Breadcrumb List",d:"For navigation trails. Shows the page hierarchy path in search results below the URL."}].map((i) => <div key={i.t} className="rounded-xl border border-border bg-card p-5 space-y-2"><h3 className="font-semibold">{i.t}</h3><p className="text-sm text-muted-foreground">{i.d}</p></div>)}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[{t:"Blog SEO",d:"Add Article schema to every blog post for rich search results with author, date, and publisher info."},{t:"E-Commerce Products",d:"Add Product schema with prices and ratings for rich product listings in Google Shopping."},{t:"FAQ Sections",d:"Convert FAQ sections to FAQPage schema for accordion rich results in Google."},{t:"Business Listings",d:"Add LocalBusiness schema for Google Business Profile-like results."},{t:"Company Pages",d:"Add Organization schema to your about page for Google's knowledge panel."},{t:"Documentation Sites",d:"Use BreadcrumbList schema for better navigation trails in search results."},{t:"Tutorial Content",d:"Add How-To schema for step-by-step rich results with time estimates."},{t:"News Websites",d:"Add Article schema with published/modified dates for Google News eligibility."}].map((i) => <div key={i.t} className="rounded-lg border border-border bg-card p-4"><h3 className="text-sm font-semibold">{i.t}</h3><p className="mt-1 text-sm text-muted-foreground">{i.d}</p></div>)}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Structured Data Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Always validate your JSON-LD with Google Rich Results Test before deploying.","Use only one schema type per JSON-LD block — don't mix types in a single block.","Ensure all required fields for your chosen schema type are filled in.","Use actual content data, not generic or placeholder text.","Keep FAQ answers comprehensive — Google prefers answers of 50+ characters.","Include high-quality images (at least 1200px wide) for Article and Product schemas.","Use BreadcrumbList on all pages except the homepage for consistent navigation trails.","Combine structured data with proper meta tags from our Meta Tag Generator.","Add OG tags from our OG Tag Generator for complete social sharing optimization.","Check keyword density with our Keyword Density Checker to optimize your page content."].map((tip, idx) => <li key={idx} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" /><span dangerouslySetInnerHTML={{__html: tip
  .replace(/our (Meta Tag Generator)/g,'<a href="/tools/seo/meta-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (OG Tag Generator)/g,'<a href="/tools/seo/og-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (Keyword Density Checker)/g,'<a href="/tools/seo/keyword-density-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
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