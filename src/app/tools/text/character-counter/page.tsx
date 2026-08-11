import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CharacterCounterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CharacterCounterPage() {
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
        <section className="mt-8" aria-label="Character Counter">
          <CharacterCounterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Character Counter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter your content in the large text area above. All statistics update instantly as you type.</li>
            <li><span className="text-foreground font-medium">Review the stats grid</span> — See your character count (with and without spaces), word count, sentence count, paragraph count, and UTF-8 byte size at a glance.</li>
            <li><span className="text-foreground font-medium">Check platform limits</span> — The progress bars show how your text fits against Twitter/X, Instagram Bio, Meta Description, SMS, Google Ads, and LinkedIn limits with color-coded feedback.</li>
            <li><span className="text-foreground font-medium">Copy or clear</span> — Use "Copy All Stats" to copy all metrics to your clipboard, "Sample Text" to load a demo, or "Clear" to reset.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Real-time character counting with and without spaces",
              "Word count, sentence count, and paragraph count",
              "UTF-8 byte size calculation using TextEncoder API",
              "Color-coded platform limit bars (green, yellow, red)",
              "Twitter/X (280), Instagram Bio (150), Meta Description (160), SMS (160), Google Ad Title (30), LinkedIn (3,000)",
              "Copy All Stats button for quick clipboard export",
              "Sample text button to see the tool in action immediately",
              "100% client-side processing — your text never leaves your browser",
              "Responsive design that works on desktop, tablet, and mobile",
              "Accurate handling of emojis, Unicode, and special characters",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Character Counting</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Characters With vs. Without Spaces", d: "Characters with spaces includes every character in your text, including spaces, tabs, and line breaks. Characters without spaces strips all whitespace to give you only the content characters. Different platforms count differently — Twitter counts spaces, while some forms do not." },
              { t: "UTF-8 Byte Size", d: "While a single ASCII character uses 1 byte in UTF-8, accented characters use 2 bytes, many non-Latin scripts use 3 bytes, and emojis can use up to 4 bytes. The byte size matters for database storage, API payloads, and systems with byte-based limits like email headers." },
              { t: "Platform Character Limits", d: "Each platform enforces its own character limits for different content types. Twitter/X tweets are limited to 280 characters, Instagram bios to 150 characters, and Google meta descriptions to 160 characters. Exceeding these limits results in truncation or posting errors." },
              { t: "Why Character Count Matters", d: "Character limits ensure consistency across user interfaces, prevent abuse, and optimize display. In SEO, meta descriptions that fit within 160 characters display fully in search results. In social media, staying within limits avoids awkward truncation that can alter your message's meaning." },
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
              { t: "Social Media Posts", d: "Check that your tweets, Instagram captions, and LinkedIn posts fit within platform character limits before publishing." },
              { t: "SEO Meta Descriptions", d: "Keep your meta descriptions between 150 and 160 characters to ensure they display fully in Google search results without truncation." },
              { t: "Google Ads Copywriting", d: "Verify that your ad headlines stay under 30 characters and descriptions under 90 characters to avoid rejection or automatic shortening." },
              { t: "SMS Marketing", d: "Ensure your SMS messages stay within the 160-character GSM limit to avoid being split into multiple segments and incurring extra costs." },
              { t: "GitHub Commit Messages", d: "Follow the conventional commit format: keep the subject line under 50 characters and the body under 72 characters per line." },
              { t: "Email Subject Lines", d: "Keep email subject lines under 50 characters for optimal display across email clients on both desktop and mobile devices." },
              { t: "Push Notifications", d: "Most push notification systems truncate after 100-200 characters. Count characters to ensure your message is fully visible." },
              { t: "Form Field Validation", d: "Test input lengths against backend validation rules before submitting forms, preventing server-side errors and improving user experience." },
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
          <h2 className="text-2xl font-bold tracking-tight">Character Counting Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After counting characters, use our Word Counter to get additional text metrics like reading time, speaking time, and average word length for a complete analysis.",
              "Need to change the case of your text before counting? Use our Case Converter to switch between uppercase, lowercase, title case, or sentence case.",
              "Working with lists? Use our Text Sorter to alphabetize lines, then check the character count to see how much space your sorted list uses.",
              "Need placeholder text for layout testing? Use our Lorem Ipsum Generator to generate text of a specific word count, then verify the character length here.",
              "When writing Twitter/X threads, count each tweet separately to ensure none exceed the 280-character limit. The color-coded bars turn red when you go over.",
              "For SEO, aim for meta descriptions between 150 and 160 characters. Too short wastes space; too long gets truncated with an ellipsis in search results.",
              "If your text exceeds a limit, try removing filler words like \"very,\" \"really,\" and \"just\" — these often add unnecessary characters without adding meaning.",
              "The UTF-8 byte size is especially useful for developers. If your API has a payload size limit, check the byte count to ensure your request body fits within the constraint.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our (Word Counter)/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Case Converter)/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Text Sorter)/g, '<a href="/tools/text/text-sorter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Lorem Ipsum Generator)/g, '<a href="/tools/text/lorem-ipsum-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
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
