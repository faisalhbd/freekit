import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { LoremIpsumGeneratorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function LoremIpsumGeneratorPage() {
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
        <section className="mt-8" aria-label="Lorem Ipsum Generator">
          <LoremIpsumGeneratorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Lorem Ipsum Generator</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Choose your unit</span> — Select whether you want to generate text measured in paragraphs, sentences, or words using the toggle buttons.</li>
            <li><span className="text-foreground font-medium">Set the amount</span> — Enter the number of units you need. The accepted range adjusts automatically (1–100 for paragraphs, 1–200 for sentences, 1–1,000 for words).</li>
            <li><span className="text-foreground font-medium">Toggle classic start</span> — Enable the switch to begin with the traditional "Lorem ipsum dolor sit amet…" passage, or disable it for a fully random start.</li>
            <li><span className="text-foreground font-medium">Click Generate</span> — Your placeholder text appears in the output area below. Click "Regenerate" to get a fresh variation.</li>
            <li><span className="text-foreground font-medium">Copy or clear</span> — Use "Copy to Clipboard" to copy the text, or "Clear" to reset the output and start over.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Three generation units — paragraphs, sentences, or words",
              'Classic “Lorem ipsum dolor sit amet” opening toggle',
              "100+ unique Latin-derived words for realistic text",
              "Natural sentence and paragraph length variation",
              "Real-time stats: word count, character count, paragraph count",
              "One-click copy to clipboard",
              "Regenerate button for instant fresh variations",
              "Adjustable limits per unit (1–100, 1–200, 1–1,000)",
              "100% client-side — no server calls or data tracking",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Placeholder Text</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "What Is Lorem Ipsum?", d: "Lorem Ipsum is scrambled Latin text derived from Cicero's 'De finibus bonorum et malorum' (45 BC). It has been the standard placeholder text in printing and typesetting for over 500 years, providing a natural-looking block of text that closely mimics the visual density and flow of real written language." },
              { t: "Classic vs. Random Start", d: "The classic start preserves the traditional opening 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' which is instantly recognizable. Random start shuffles from the full word pool so each generation begins differently. Both approaches produce equally valid placeholder text for design work." },
              { t: "Paragraphs, Sentences, and Words", d: "Paragraphs generate multi-sentence blocks separated by blank lines — ideal for body copy layouts. Sentences produce a continuous flow of text on a single line — useful for navigation items or short descriptions. Words generate a single unbroken string — helpful for character-limit testing and label sizing." },
              { t: "Why It Looks Realistic", d: "This generator uses over 100 authentic Latin-derived words with natural sentence length variation (6–18 words per sentence) and occasional comma placement. This produces text that mirrors the visual rhythm of real prose, making it effective for layout evaluation." },
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
              { t: "Web Design Mockups", d: "Fill website wireframes and high-fidelity mockups with realistic-looking text to evaluate typography, line height, and spacing before real copy is available." },
              { t: "Print Design", d: "Use placeholder text in brochures, flyers, posters, and magazines to test layout compositions, font pairings, and column structures." },
              { t: "UI/UX Prototyping", d: "Populate buttons, cards, modals, and form labels with filler text in Figma, Sketch, or Adobe XD to test component behavior at different content lengths." },
              { t: "Blog and CMS Themes", d: "Develop and preview WordPress, Ghost, or custom CMS themes with realistic content volume to ensure layouts handle long posts gracefully." },
              { t: "Email Templates", d: "Design responsive HTML email templates with placeholder body text to test rendering across email clients before inserting final marketing copy." },
              { t: "Typography Testing", d: "Compare font families, sizes, and weights at scale by generating large blocks of text and observing readability and visual rhythm." },
              { t: "Documentation Layouts", d: "Build documentation sites and knowledge base templates with placeholder sections to validate navigation, sidebar width, and content hierarchy." },
              { t: "Presentation Slides", d: "Add dummy text to slide decks and pitch decks to evaluate text density, white space, and visual balance before finalizing the content." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Alternatives to Lorem Ipsum */}
        <section className="mt-16 space-y-4" aria-label="Alternatives">
          <h2 className="text-2xl font-bold tracking-tight">Alternatives to Classic Lorem Ipsum</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: "Cicero (Real Latin)", d: "Uses the unscrambled original Latin text from Cicero's philosophical work. The grammar and sentence structure are authentic, making it ideal for projects that require real Latin rather than scrambled words." },
              { t: "Hipster Ipsum", d: "Generates humorous, trendy-sounding placeholder text filled with pop-culture references, artisanal jargon, and whimsical phrases. Great for modern brands and creative agencies." },
              { t: "Themed Ipsum", d: "Specialized generators like Bacon Ipsum (food), Corporate Ipsum (business jargon), and Cupcake Ipsum (baking) let you match the placeholder tone to your project's industry or audience." },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips with Internal Links */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Placeholder Text Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After generating placeholder text, use our Word Counter to verify the word count matches your design's target content length.",
              "Need to change the case of your generated text? Use our Case Converter to quickly switch between uppercase, lowercase, title case, and sentence case.",
              "Find and replace specific placeholder patterns or cleanup generated text with our Text Replacer before inserting it into your project files.",
              "Generate a large block of Lorem Ipsum and then use our Remove Duplicate Lines tool if your layout accidentally introduces repeated paragraphs.",
              "For SEO mockups, generate text and then check keyword density patterns using a keyword analysis workflow to simulate real content optimization.",
              "When designing responsive layouts, generate different lengths (short, medium, long) to test how your UI handles content overflow at various breakpoints.",
              "Use the 'Words' unit with a specific count to precisely fill character-limited fields like meta descriptions, tweet previews, or UI labels.",
              "The 'Regenerate' button produces a different random sequence each time — use it to get variety when testing multiple layout variants side by side.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our (Word Counter)/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Case Converter)/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Text Replacer)/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Remove Duplicate Lines)/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
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
