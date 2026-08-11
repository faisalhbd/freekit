import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ReadingTimeCalculatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ReadingTimeCalculatorPage() {
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
        <section className="mt-8" aria-label="Reading Time Calculator">
          <ReadingTimeCalculatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Reading Time Calculator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter the article, essay, blog post, or any content you want to analyze into the text area.</li>
            <li><span className="text-foreground font-medium">Adjust reading speed</span> — Use the slider to set your reading speed (100-400 WPM). The default of 200 WPM suits most general content.</li>
            <li><span className="text-foreground font-medium">Adjust speaking speed</span> — Set the speaking speed slider (80-200 WPM) if you need speaking time estimates for presentations or videos.</li>
            <li><span className="text-foreground font-medium">Review the results</span> — View word count, character count, sentences, paragraphs, reading time, and speaking time displayed in card format.</li>
            <li><span className="text-foreground font-medium">Copy the stats</span> — Click Copy Stats to copy all statistics to your clipboard for use in content planning or documentation.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time word count, character count (with and without spaces)",
              "Sentence and paragraph counting for content structure analysis",
              "Adjustable reading speed slider (100-400 WPM) for different content types",
              "Adjustable speaking speed slider (80-200 WPM) for presentations and videos",
              "Reading time formatted as minutes:seconds for easy reference",
              "Speaking time estimate for script and presentation planning",
              "Visual progress bar showing reading time on a quick-to-long scale",
              "Average words per sentence calculation for readability assessment",
              "One-click Copy Stats button to export all metrics",
              "100% client-side processing — your text never leaves your browser",
              "Responsive design for desktop, tablet, and mobile use",
              "No sign-up, no limits, completely free to use",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Reading Time</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Words Per Minute (WPM)", d: "Words per minute is the standard measurement for reading speed. The average adult reads 200-250 WPM for general non-fiction content. Speed varies based on content difficulty, reader experience, and reading purpose. Technical content is read at 100-150 WPM, while light fiction may reach 300+ WPM. This tool lets you adjust the WPM to match your specific content type and audience." },
              { t: "Reading vs Speaking Time", d: "People read faster than they speak. Average reading speed is 200-250 WPM while average speaking speed is 130-150 WPM. This means a 5-minute read typically takes 7-10 minutes to speak aloud. If you are creating a video script, podcast episode, or presentation from written content, use the speaking time estimate to plan your recording duration." },
              { t: "Content Length Guidelines", d: "Blog posts between 1,500-2,500 words (5-10 minute read) are optimal for SEO and engagement. Social media posts should be under 500 words (2 minutes). Long-form content (3,000+ words, 12+ minutes) works for in-depth guides and pillar content. Use the progress bar to quickly assess where your content falls on this spectrum." },
              { t: "Readability and Sentence Length", d: "The average words per sentence metric helps assess readability. Content with 15-20 words per sentence is considered easily readable. Sentences averaging 25+ words may be hard to follow. If your average is high, consider breaking long sentences into shorter ones to improve readability and reader engagement." },
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
              { t: "Blog Post Planning", d: "Calculate reading time for blog posts to display 'X min read' badges. Many readers use this to decide whether to read an article, making it a key engagement factor for content strategy." },
              { t: "Presentation Script Timing", d: "Use the speaking time estimate to plan presentation duration. Ensure your 20-minute conference talk stays within bounds by checking the word count against your speaking speed." },
              { t: "Video Script Duration", d: "Estimate how long your YouTube video, tutorial, or course lecture will be based on the script word count. Adjust speaking speed to match your natural pace." },
              { t: "Newsletter Length Control", d: "Keep newsletters within your target reading time. Many email marketers recommend 3-5 minutes of reading time for optimal engagement and click-through rates." },
              { t: "Academic Paper Review", d: "Estimate how long it will take to review academic papers, research articles, or study materials. Plan your reading schedule accordingly." },
              { t: "Documentation Length Assessment", d: "Check if your technical documentation, API guides, or help articles are concise enough for developers to scan quickly or thorough enough for deep reference." },
              { t: "Book Chapter Planning", d: "Plan chapter lengths for books and ebooks by targeting specific reading times. Consistent chapter lengths improve the reading experience." },
              { t: "Content Marketing Strategy", d: "Plan content calendars based on reading time targets. Mix quick reads (social posts), medium articles (blog posts), and long-form content (pillar pages) for a balanced strategy." },
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
          <h2 className="text-2xl font-bold tracking-tight">Reading Time Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "For blog posts targeting busy professionals, aim for a 3-5 minute read (600-1,000 words at 200 WPM). This length provides enough value without demanding too much time.",
              "Use the speaking time estimate when converting blog posts to video scripts. A 1,500-word blog post takes about 12 minutes to speak at 130 WPM.",
              "For technical documentation, use a lower reading speed (100-150 WPM) in the calculator to get realistic time estimates for your developer audience.",
              "After calculating reading time, use our Word Counter to get a detailed word frequency analysis and identify overused words in your content.",
              "For content with many images or embedded media, add 30-60 seconds per image/video to the reading time estimate, as visual content requires additional processing time.",
              "Display your calculated reading time prominently in blog post headers — studies show that readers are more likely to engage with content when they know the time commitment upfront.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
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
              "Always include a reading time estimate on published content. It sets reader expectations, improves engagement, and is a proven UX best practice used by Medium, LinkedIn, and major publishers.",
              "Test your content at multiple reading speeds to understand the range. A 200 WPM reader might finish in 5 minutes while a 300 WPM skimmer takes 3.5 minutes — both are valid time estimates for different audiences.",
              "Use the words-per-sentence metric to improve readability. If your average exceeds 25 words, break up complex sentences into shorter ones to improve comprehension and engagement.",
              "For SEO, balance content length with reading time. Search engines favor comprehensive content, but reader engagement drops off after 7-10 minutes of reading time for general web content.",
              "When planning podcast episodes or video scripts, add 10-15% buffer to the speaking time estimate for pauses, transitions, and natural pacing variations.",
              "Track your reading time targets across your content strategy. Consistent reading times build audience trust and help readers plan their content consumption.",
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
