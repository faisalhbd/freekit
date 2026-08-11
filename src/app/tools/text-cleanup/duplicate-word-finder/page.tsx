import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DuplicateWordFinderTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DuplicateWordFinderPage() {
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
        <section className="mt-8" aria-label="Duplicate Word Finder">
          <DuplicateWordFinderTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Duplicate Word Finder</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text into the textarea. The analysis updates in real time as you type or paste.</li>
            <li><span className="text-foreground font-medium">Choose case sensitivity</span> — Use the toggle to switch between case-insensitive (default, recommended) and case-sensitive mode.</li>
            <li><span className="text-foreground font-medium">Review the statistics</span> — Three stat cards show total words, unique words, and the number of duplicate occurrences.</li>
            <li><span className="text-foreground font-medium">View highlighted text</span> — Duplicate words are highlighted in amber in the original text so you can see them in context.</li>
            <li><span className="text-foreground font-medium">Check the frequency list</span> — The right panel lists all duplicate words sorted by frequency, with count badges.</li>
            <li><span className="text-foreground font-medium">Copy cleaned text</span> — If you want to remove duplicates, the cleaned version is generated automatically. Click 'Copy Cleaned Text' to copy it.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time duplicate word detection as you type",
              "Case-sensitive and case-insensitive analysis modes",
              "Duplicate words highlighted in the original text context",
              "Frequency-sorted list of all duplicate words with counts",
              "Three stat cards: total words, unique words, duplicate occurrences",
              "Automatic generation of text with duplicates removed",
              "One-click copy of cleaned (deduplicated) text",
              "Handles contractions like don't, it's as single words",
              "Works with any text length from a sentence to full documents",
              "100% client-side processing — your text never leaves your browser",
              "No sign-up, no limits, completely free",
              "Responsive design for desktop, tablet, and mobile",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Duplicate Words</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Word Boundaries", d: "The tool uses word boundary detection (\\b) to identify individual words. A word is defined as a sequence of alphanumeric characters and apostrophes. This means 'hello', 'world123', and 'don't' are all recognized as single words, while punctuation like commas, periods, and hyphens act as separators." },
              { t: "Case Sensitivity", d: "By default, the tool treats 'Apple', 'APPLE', and 'apple' as the same word. This is ideal for prose analysis where capitalization at sentence starts creates false duplicates. For technical analysis or code, enable case-sensitive mode to distinguish between different casings of the same letters." },
              { t: "Frequency Analysis", d: "The duplicate list is sorted by frequency, with the most-repeated words appearing first. This helps you quickly identify the most problematic duplicates. The count badge shows exactly how many times each word appears, helping you prioritize which duplicates to address." },
              { t: "Contextual Highlighting", d: "Unlike a simple list, the highlighted text view shows duplicates in their original context. This helps you understand why duplicates exist — whether they are intentional repetition for emphasis, accidental repeats, or patterns in your writing style that could be improved." },
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
              { t: "Editing and Proofreading", d: "Find unintentional word repetitions that weaken your writing. Writers often reuse favorite words without realizing it. The frequency list helps you identify overused words so you can find synonyms." },
              { t: "SEO Content Optimization", d: "Check for keyword stuffing in SEO content. While some keyword repetition is intentional for SEO, excessive repetition can trigger search engine penalties. Use this tool to find the right balance." },
              { t: "Academic Writing", d: "Academic papers should use precise, varied vocabulary. Find repeated transitional phrases, hedging words, or other common academic language patterns that may be overused." },
              { t: "Creative Writing", d: "Identify overused words in fiction, poetry, or creative nonfiction. A diverse vocabulary makes writing more engaging. Use the frequency list to find words you overuse and replace them." },
              { t: "Technical Documentation", d: "Ensure technical documentation doesn't have repetitive terminology that could confuse readers. Check that each concept is introduced clearly without unnecessary repetition." },
              { t: "Speech and Presentation Prep", d: "Spoken content often has more repetition than written content. Analyze your speech draft to find and reduce filler word usage and repetitive phrasing." },
              { t: "Translation Quality Check", d: "After translating text, check for word repetition patterns that may not exist in the source language. Different languages have different natural repetition levels." },
              { t: "Code Review", d: "Analyze code comments or documentation for duplicate words. Enable case-sensitive mode for identifier analysis to find potential naming issues." },
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
          <h2 className="text-2xl font-bold tracking-tight">Duplicate Word Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Common function words like 'the', 'and', 'is', 'of', 'to', 'a', 'in' will naturally appear many times. Focus on content words (nouns, verbs, adjectives) for meaningful analysis.",
              "Use case-sensitive mode if you're analyzing code or when capitalization differences are meaningful (e.g., proper nouns vs common nouns).",
              "After removing duplicates, use our <a href=\"/tools/text-cleanup/remove-extra-spaces\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Remove Extra Spaces</a> tool to clean up any double spaces left behind.",
              "The frequency-sorted list is your best friend. Focus on the top 3-5 most-repeated content words — fixing those will have the biggest impact on your writing quality.",
              "For line-level duplicate detection, use our <a href=\"/tools/text-cleanup/remove-duplicate-lines\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Remove Duplicate Lines</a> tool instead.",
              "Combine this with our <a href=\"/tools/text/word-counter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Word Counter</a> to get a complete picture of your text's word usage and structure.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-3 text-muted-foreground">
            {[
              "Always use case-insensitive mode for prose and general text analysis. Case-sensitive mode should only be used for technical contexts like code review.",
              "Don't remove all duplicates blindly — some repetition is intentional and improves readability. Review the highlighted text to understand context before removing duplicates.",
              "Focus on content words rather than stop words. Function words like 'the', 'and', 'is' are expected to repeat frequently and don't indicate writing quality issues.",
              "Use the cleaned text as a starting point for manual editing, not as a final product. The automatic deduplication keeps the first occurrence of each word, which may not always produce the most natural result.",
              "For SEO content, aim for a keyword density of 1-2%. Use this tool to check your keyword frequency and ensure you're not over-optimizing.",
              "After using the duplicate remover, always proofread the result. Automatic removal can create awkward phrasing or change meaning in unintended ways.",
            ].map((practice, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: practice }} />
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
