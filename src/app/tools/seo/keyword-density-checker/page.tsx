import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { KeywordDensityCheckerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function KeywordDensityCheckerPage() {
  const schemas = getSchemas()
  return (
    <>
      {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolHeader tool={toolConfig} />
        <section className="mt-8" aria-label="Keyword Density Checker"><KeywordDensityCheckerTool /></section>
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Check Keyword Density</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your content</span> — Copy and paste the text you want to analyze into the text area.</li>
            <li><span className="text-foreground font-medium">Enter your target keyword</span> — Type the keyword or phrase you want to check density for.</li>
            <li><span className="text-foreground font-medium">Click Analyze</span> — The tool shows keyword density, text statistics, and a top words table.</li>
            <li><span className="text-foreground font-medium">Review and optimize</span> — Aim for 1-2% density. Review the top words for secondary keyword opportunities.</li>
          </ol>
        </section>
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {["Keyword density calculation with percentage and occurrence count","Text statistics: word count, unique words, sentences, paragraphs","Average words per sentence and average word length","Top 25 words table with density bars (stop words excluded)","Color-coded density status: Good (1-2.5%), Too Low, High, Keyword Stuffing","Phrase support — analyze multi-word keywords and phrases","Visual density bar for instant status recognition","Clear button to reset and start over","100% browser-based analysis — your content never leaves your device","Real-time analysis with instant results"].map((f) => <li key={f} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{f}</li>)}
          </ul>
        </section>
        <section className="mt-16 space-y-4" aria-label="Understanding keyword density">
          <h2 className="text-2xl font-bold tracking-tight">Understanding Keyword Density</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{t:"Ideal Range: 1-2%",d:"Most SEO experts recommend 1-2% keyword density for primary keywords. This is enough for search engines to understand your topic without triggering keyword stuffing penalties."},{t:"Danger Zone: Above 3%",d:"Going above 3% density risks being penalized by search engines for keyword stuffing. Focus on natural language and semantically related terms instead of repeating the same keyword."},{t:"Long-Tail Keywords",d:"Targeting long-tail keyword phrases (3+ words) is often more effective than single words. They have lower competition and higher conversion rates. Our tool supports phrase analysis."},{t:"Semantic SEO",d:"Modern search engines understand related concepts and synonyms. Include related terms naturally rather than forcing exact-match keywords. Use the top words table to discover semantic variations."}].map((i) => <div key={i.t} className="rounded-xl border border-border bg-card p-5 space-y-2"><h3 className="font-semibold">{i.t}</h3><p className="text-sm text-muted-foreground">{i.d}</p></div>)}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[{t:"Blog Post Optimization",d:"Check keyword density before publishing blog posts to ensure optimal SEO without over-optimization."},{t:"Content Audit",d:"Analyze existing pages to find keyword gaps and over-optimized sections that need adjustment."},{t:"Competitor Analysis",d:"Paste competitor content to analyze their keyword usage strategy and identify opportunities."},{t:"Landing Page SEO",d:"Optimize landing page copy with the right keyword density for better ad quality scores."},{t:"Product Descriptions",d:"Ensure e-commerce product descriptions naturally include target keywords at the right density."},{t:"Academic Writing",d:"Check topic consistency in essays and research papers by analyzing term distribution."},{t:"Technical Documentation",d:"Ensure key terminology appears consistently throughout documentation."},{t:"Social Media Content",d:"Optimize social media posts and profiles for discoverability."}].map((i) => <div key={i.t} className="rounded-lg border border-border bg-card p-4"><h3 className="text-sm font-semibold">{i.t}</h3><p className="mt-1 text-sm text-muted-foreground">{i.d}</p></div>)}
          </div>
        </section>
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Keyword Optimization Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {["Aim for 1-2% primary keyword density — natural inclusion is more important than exact numbers.","Include secondary keywords and LSI (latent semantic indexing) terms naturally throughout your content.","Place your primary keyword in the first paragraph, at least one heading, and near the end.","Use variations and synonyms rather than repeating the exact same keyword.","Write for humans first, then optimize for search engines — readability always wins.","Use our Meta Tag Generator to optimize your title tag and meta description with your target keyword.","Generate Open Graph tags with our OG Tag Generator to optimize social sharing for your content.","Create structured data with our Schema / JSON-LD Generator to help search engines understand your content.","Control crawler access with our Robots.txt Generator to ensure important pages get indexed.","Check your overall on-page SEO with our Meta Tag Generator for a complete HTML head optimization."].map((tip, idx) => <li key={idx} className="flex items-start gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" /><span dangerouslySetInnerHTML={{__html: tip
  .replace(/our (Meta Tag Generator)/g,'<a href="/tools/seo/meta-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (OG Tag Generator)/g,'<a href="/tools/seo/og-tag-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (Schema \/ JSON-LD Generator)/g,'<a href="/tools/seo/schema-markup-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
  .replace(/our (Robots\.txt Generator)/g,'<a href="/tools/seo/robots-txt-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
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