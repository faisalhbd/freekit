import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SentenceCounterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SentenceCounterPage() {
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
        <section className="mt-8" aria-label="Sentence Counter">
          <SentenceCounterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Sentence Counter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text into the textarea. The analysis updates in real time as you type.</li>
            <li><span className="text-foreground font-medium">View the statistics</span> — Eight stat cards display sentences, words, characters, characters without spaces, paragraphs, average words per sentence, average sentence length, and the longest sentence.</li>
            <li><span className="text-foreground font-medium">Highlight sentences</span> — Toggle 'Highlight longest' or 'Highlight shortest' to visually identify extreme sentences in the analysis panel.</li>
            <li><span className="text-foreground font-medium">Copy the stats</span> — Click 'Copy Stats' to copy all statistics to your clipboard for use in reports or documents.</li>
            <li><span className="text-foreground font-medium">Analyze and iterate</span> — Edit your text to adjust sentence lengths, then recheck the stats to improve readability.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time sentence, word, character, and paragraph counting",
              "Characters with and without spaces for precise character limits",
              "Average words per sentence — a key readability metric",
              "Average sentence length in characters for style analysis",
              "Identify the longest sentence by word count",
              "Visual highlighting of longest and shortest sentences",
              "Sentence-by-sentence breakdown with word counts",
              "Copy all statistics to clipboard with one click",
              "100% client-side processing — your text never leaves your browser",
              "Responsive design for desktop, tablet, and mobile",
              "No sign-up, no limits, completely free",
              "Handles any text length from a single sentence to full documents",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Sentence Analysis</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Sentence Detection", d: "The tool identifies sentences by splitting text on periods, exclamation marks, and question marks followed by whitespace. This approach works well for most English prose, essays, articles, and emails. It provides fast, accurate results without requiring complex NLP libraries." },
              { t: "Words Per Sentence", d: "Average words per sentence is a key readability indicator. Studies show that sentences averaging 15-20 words are easiest to read. Academic writing tends toward 25+ words per sentence, while marketing copy averages 10-15. Use this metric to tune your writing style for your audience." },
              { t: "Sentence Length Variation", d: "Good writing mixes short and long sentences for rhythm and emphasis. If your average is very high, look for opportunities to break up complex sentences. If very low, consider combining some short sentences for better flow. The highlighting feature helps you spot extremes." },
              { t: "Character Counts", d: "Character counts are essential when writing for platforms with limits. Characters (no spaces) is especially useful for Twitter/X (280 characters including spaces), meta descriptions (160 characters), and SMS messages (160 characters). The dual count lets you check both metrics at once." },
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
              { t: "Essay and Paper Writing", d: "Students can verify their essay meets assignment requirements for sentence count, word count, and paragraph structure. Use the average words per sentence to ensure academic tone." },
              { t: "Content Writing and SEO", d: "Content writers use sentence analysis to maintain readable paragraph structures. Search engines favor well-structured content with varied sentence lengths." },
              { t: "Editing and Proofreading", d: "Editors use sentence length analysis to identify run-on sentences or overly choppy writing. The highlight feature makes it easy to spot sentences that need splitting or combining." },
              { t: "Social Media Posts", d: "Check character counts against platform limits before posting. The characters (no spaces) metric is especially useful for strict character-limited platforms." },
              { t: "Email Writing", d: "Professional emails benefit from concise sentences. Use the average words per sentence metric to keep your email communication clear and impactful." },
              { t: "Technical Documentation", d: "Technical writers use sentence analysis to ensure instructions are concise and easy to follow. Shorter sentences improve comprehension for complex topics." },
              { t: "Fiction Writing", d: "Authors analyze sentence length distribution to create rhythm and pacing in their prose. Mixing short and long sentences creates engaging narrative flow." },
              { t: "Accessibility Compliance", d: "Plain language guidelines recommend sentences under 20 words for accessibility. This tool helps content creators meet WCAG readability requirements." },
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
          <h2 className="text-2xl font-bold tracking-tight">Sentence Analysis Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Aim for 15-20 words per sentence for general web content — this range is considered optimal for online readability.",
              "Use the highlight feature to identify your longest sentences. If any sentence exceeds 35 words, consider breaking it into two.",
              "After editing, copy the stats and compare with your previous version to quantify your improvements.",
              "For academic writing, average sentence length of 20-25 words is standard. Anything above 30 may need simplification.",
              "If your shortest sentence is just 1-2 words, that is fine for emphasis — but ensure most sentences are at least 5 words for substance.",
              "Combine this tool with our <a href=\"/tools/text-cleanup/reading-time-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Reading Time Calculator</a> to get a complete picture of your text\'s readability.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our <a/g, '<a')
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
              "Use sentence analysis early in your writing process. Checking stats after each draft helps you develop a natural sense for sentence length.",
              "Don\'t obsess over exact numbers. Sentence length guidelines are averages, not rules. Context, audience, and purpose always take priority over metrics.",
              "When editing for readability, focus on variety rather than hitting a specific average. A mix of short (5-10 words) and long (20-30 words) sentences creates engaging rhythm.",
              "For multilingual text, note that the sentence detection is optimized for English. Results for other languages may vary in accuracy.",
              "Use the paragraph count alongside sentence count to ensure each paragraph contains enough sentences (typically 3-5) to develop a complete thought.",
              "After using this tool for analysis, use our <a href=\"/tools/text-cleanup/remove-extra-spaces\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Remove Extra Spaces</a> tool to clean up any formatting issues before finalizing your text.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: practice
                }} />
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
