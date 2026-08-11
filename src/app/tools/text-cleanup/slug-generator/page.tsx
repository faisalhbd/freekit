import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SlugGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SlugGeneratorPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Component */}
        <section className="mt-8" aria-label="Slug Generator">
          <SlugGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Slug Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Enter your title or text</span> — Type or paste the title, heading, or phrase you want to convert into a URL-friendly slug.</li>
            <li><span className="text-foreground font-medium">Choose a separator</span> — Select hyphen (-), underscore (_), or dot (.) as the word separator. Hyphens are recommended for SEO.</li>
            <li><span className="text-foreground font-medium">Configure options</span> — Toggle lowercase conversion, accent transliteration, stop word removal, and set a maximum length as needed.</li>
            <li><span className="text-foreground font-medium">Get your slug instantly</span> — The slug generates in real time as you type. Copy it with one click.</li>
            <li><span className="text-foreground font-medium">Use it in your URL</span> — The generated slug is ready to paste directly into your CMS, code, or URL structure.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time slug generation as you type — no need to click a button",
              "Three separator options: hyphen (-), underscore (_), and dot (.)",
              "Automatic lowercase conversion for consistent URL formatting",
              "Accent transliteration — converts café, résumé, etc. to ASCII equivalents",
              "Stop word removal — strips common words like 'a', 'the', 'is' for cleaner slugs",
              "Configurable max length with word-boundary-aware truncation",
              "Character count display for the generated slug",
              "One-click copy to clipboard for instant use",
              "Handles special characters, punctuation, and Unicode input",
              "100% client-side processing — your text never leaves your browser",
              "Free to use with no sign-up, no limits, no tracking",
              "Works on all devices with responsive design",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Explanation Cards */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding URL Slugs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Why Slugs Matter for SEO", d: "Search engines use URL slugs as a ranking signal. A clean, keyword-rich slug like 'best-laptop-reviews-2025' tells both search engines and users what the page is about. Slugs should be concise, descriptive, and contain your primary keyword. Avoid generic slugs like 'page-1' or 'untitled-post' that provide no context." },
              { t: "Hyphens vs Underscores", d: "Google treats hyphens as word separators but historically treated underscores as word joiners. This means 'quick-brown-fox' is understood as three words, while 'quick_brown_fox' may be treated as one. Modern Google has improved, but hyphens remain the SEO industry standard and are universally recommended for URL slugs." },
              { t: "Stop Word Impact", d: "Stop words like 'a', 'the', 'is', and 'and' add length to your URL without SEO value. Removing them creates shorter, more focused slugs. For example, 'the-best-way-to-learn-python' becomes 'best-way-learn-python' — 9 characters shorter while preserving all meaningful keywords. Shorter URLs also display better in search results." },
              { t: "Accent Handling", d: "URLs should only contain ASCII characters for maximum compatibility. Accented characters like é, ñ, or ü can cause encoding issues in browsers, servers, and databases. Transliteration converts these to their closest ASCII equivalents (e.g., é→e, ñ→n, ü→u), ensuring your URL works correctly everywhere." },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Blog Post URLs", d: "Generate SEO-friendly permalinks for blog posts. Convert article titles like '10 Tips for Better Sleep at Night' into clean slugs like '10-tips-better-sleep-night'." },
              { t: "Product Page URLs", d: "Create product page slugs for e-commerce sites. Turn product names into URL-safe identifiers like 'wireless-bluetooth-headphones-noise-canceling'." },
              { t: "Documentation Pages", d: "Generate consistent URL structures for documentation. Convert heading text like 'Getting Started with API Integration' into 'getting-started-api-integration'." },
              { t: "CMS Permalink Management", d: "Preview and optimize slugs before publishing in WordPress, Ghost, or other CMS platforms. Get better slugs than auto-generated ones." },
              { t: "Routing in Web Applications", d: "Generate URL path segments for Next.js, React Router, or other framework routes. Ensure consistent, clean routing across your application." },
              { t: "File Naming Conventions", d: "Create consistent, URL-safe file names for downloads, images, or assets. Use the dot separator for file extensions like 'report-q4-2025.pdf'." },
              { t: "Social Media Links", d: "Create clean, shareable URL segments for social media profiles, campaign landing pages, or referral links." },
              { t: "API Endpoint Naming", d: "Generate consistent, RESTful API endpoint paths. Convert resource names into clean URL segments for your API documentation." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Slug Generation Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Always use hyphens as your separator for web URLs — they are the SEO standard and treated as word separators by Google.",
              "Keep your slug under 60 characters for optimal display in Google search results. Use the max length option to enforce this automatically.",
              "Remove stop words to create shorter, more focused slugs — but review the output to ensure important context words are preserved.",
              "For non-English content with accented characters, always enable transliteration to ensure your URLs work across all platforms and browsers.",
              "After generating a slug, use our Case Converter to verify the original title casing is correct for your page heading.",
              "For URLs that need encoding (special characters), chain this tool with our URL Encoder to get the fully encoded version.",
              "Include your primary keyword near the beginning of the slug for better SEO impact. Search engines give more weight to words at the start of a URL.",
              "Avoid using numbers alone as slugs (like '123'). Add descriptive text for SEO value and user understanding.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Case Converter/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Case Converter</a>')
                    .replace(/our URL Encoder/g, '<a href="/tools/developer/url-encoder" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">URL Encoder</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-3 text-muted-foreground">
            {[
              "Always review your generated slug before publishing. Automated generation is helpful, but manual review ensures the slug accurately represents your content.",
              "Use lowercase exclusively in slugs. Some servers treat uppercase and lowercase URLs differently, which can cause duplicate content issues.",
              "Avoid changing slugs after publishing unless necessary. Changing a URL slug breaks existing links and bookmarks, requiring 301 redirects to maintain SEO value.",
              "Include 3-5 meaningful words in your slug — enough for context but not so many that the URL becomes unwieldy.",
              "Never include dates in slugs unless the content is date-specific (like '2025-year-review'). Date-based slugs can make content feel outdated.",
              "For multilingual sites, consider using the original language in the slug rather than translating, as this helps users identify the language before clicking.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {practice}
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
