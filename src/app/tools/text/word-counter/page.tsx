import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { WordCounterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function WordCounterPage() {
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
        <section className="mt-8" aria-label="Word Counter">
          <WordCounterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Word Counter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter your content in the large text area above. The analysis updates instantly as you type.</li>
            <li><span className="text-foreground font-medium">Review the stats</span> — Words, characters, sentences, paragraphs, average word length, reading time, and speaking time are shown in the stats grid.</li>
            <li><span className="text-foreground font-medium">Check character limits</span> — The progress bars show how your text fits against common platform limits like Twitter, SMS, and meta descriptions.</li>
            <li><span className="text-foreground font-medium">Copy or clear</span> — Use "Copy All Stats" to copy all metrics to your clipboard, or "Clear" to reset and start over.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time word, character, sentence, and paragraph counting",
              "Characters with spaces and without spaces — two separate metrics",
              "Average word length calculation for readability analysis",
              "Reading time estimation (200 words per minute)",
              "Speaking time estimation (130 words per minute)",
              "Character limit progress bars for Twitter, SMS, meta descriptions, and LinkedIn",
              "Copy All Stats button for quick export to clipboard",
              "Sample text button to see the tool in action immediately",
              "100% client-side processing — your text never leaves your browser",
              "Responsive design that works on desktop, tablet, and mobile",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Text Metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Word Count", d: "Word count is the total number of words in your text, separated by whitespace. It is the most common metric for content length and is used by search engines, academic institutions, and publishing platforms to evaluate text size." },
              { t: "Character Count", d: "Character count includes every letter, number, punctuation mark, and optionally spaces. Social media platforms like Twitter/X enforce strict character limits, making this metric essential for social media managers and marketers." },
              { t: "Reading Time", d: "Reading time estimates how long an average adult would take to read your text. It is calculated at 200 words per minute and is commonly displayed on blog posts to set reader expectations." },
              { t: "Speaking Time", d: "Speaking time estimates how long it would take to read your text aloud at a natural pace of 130 words per minute. This is useful for speechwriters, presenters, and video script creators." },
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
              { t: "Blog Writing", d: "Ensure your blog posts meet recommended word counts. Most SEO-optimized blog posts range from 1,500 to 2,500 words." },
              { t: "Academic Papers", d: "Meet strict word or character limits set by universities and journals for essays, theses, and research papers." },
              { t: "Social Media Posts", d: "Check character counts against Twitter (280), Instagram (2,200), and LinkedIn (3,000) limits before posting." },
              { t: "Ad Copywriting", d: "Google Ads headlines have a 30-character limit and descriptions have a 90-character limit. Verify your copy fits." },
              { t: "Email Marketing", d: "Keep subject lines under 50 characters for optimal open rates. Count words in the body for readability." },
              { t: "Novel and Book Writing", d: "Track daily writing progress and ensure chapters meet target word counts for consistent pacing." },
              { t: "Translation Projects", d: "Compare word counts between source and target languages to estimate translation costs and completeness." },
              { t: "UX Microcopy", d: "Keep UI labels, tooltips, and error messages concise by counting characters in design mockups." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips with Internal Links */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Text Writing Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use our Case Converter to quickly change the case of your text before counting words and analyzing readability.",
              "Generate placeholder text for layout testing with our Lorem Ipsum Generator, then check word counts to match your target length.",
              "Find and replace repetitive phrases using our Text Replacer to tighten your writing and reduce unnecessary word count.",
              "Remove duplicate lines from your text with our Remove Duplicate Lines tool before running a final word count.",
              "Check keyword density alongside word count using our Keyword Density Checker for a complete SEO content optimization workflow.",
              "For character-limited platforms, use our Character Counter to get a detailed breakdown of character usage with and without spaces.",
              "Aim for an average word length between 4.5 and 5.5 characters for general-audience content — shorter words improve readability scores.",
              "Most blog posts rank best between 1,500 and 2,500 words. Use the reading time estimate to ensure your content provides enough depth.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our (Case Converter)/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Lorem Ipsum Generator)/g, '<a href="/tools/text/lorem-ipsum-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Text Replacer)/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Remove Duplicate Lines)/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Keyword Density Checker)/g, '<a href="/tools/seo/keyword-density-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Character Counter)/g, '<a href="/tools/text/character-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 9. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* 10. CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
