import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { CaseConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function CaseConverterPage() {
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
        <section className="mt-8" aria-label="Case Converter">
          <CaseConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Case Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text in the input area. Multi-line text and special characters are supported.</li>
            <li><span className="text-foreground font-medium">Click a conversion button</span> — Choose from 12 case styles: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, Alternating cAsE, or Inverse Case.</li>
            <li><span className="text-foreground font-medium">Review the output</span> — The converted text appears instantly in the output area with a character count.</li>
            <li><span className="text-foreground font-medium">Copy, swap, or clear</span> — Use "Copy Output" to copy the result, "Swap" to move output back to input for chaining conversions, or "Clear" to start over.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "12 case conversion formats including programmer-oriented styles",
              "Title Case with intelligent small-word handling (a, an, the, in, on, at, to, for, of, and, or, but, is, are, was, were)",
              "Multi-line text support — convert entire paragraphs or lists at once",
              "Active conversion indicator shows which format is currently applied",
              "Swap button lets you chain multiple conversions sequentially",
              "Character counts for both input and output textareas",
              "One-click copy to clipboard with visual feedback",
              "Hover tooltips show example output for each conversion type",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Text Case Formats</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "UPPERCASE & lowercase", d: "UPPERCASE converts every letter to its capital form (e.g., HELLO WORLD). It is used for headings, acronyms, emphasis, and data formatting. lowercase converts every letter to its small form (e.g., hello world), commonly used for email addresses, URLs, and casual text." },
              { t: "Title Case & Sentence case", d: "Title Case capitalizes the first letter of each major word while keeping minor words lowercase — the standard for book titles and headlines. Sentence case only capitalizes the first letter of the first word in a sentence, making it ideal for prose, email subject lines, and some academic styles." },
              { t: "camelCase & PascalCase", d: "camelCase starts with a lowercase letter and capitalizes each subsequent word with no separators (e.g., myVariableName). PascalCase capitalizes every word including the first (e.g., MyVariableName). These are the standard naming conventions in JavaScript, Java, C#, and TypeScript for variables and classes respectively." },
              { t: "snake_case & kebab-case", d: "snake_case joins words with underscores in all lowercase (e.g., my_variable_name) and is standard in Python, Ruby, and SQL. kebab-case joins words with hyphens (e.g., my-variable-name) and is the standard for URLs, CSS class names, and HTML IDs in web development." },
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
              { t: "Programming & Development", d: "Convert variable names between camelCase, snake_case, and kebab-case when switching between JavaScript, Python, and CSS. Convert environment variable names to CONSTANT_CASE." },
              { t: "Content Writing & Editing", d: "Fix inconsistent capitalization in headings by converting to Title Case. Normalize sentence case for email subject lines or article body text." },
              { t: "Data Cleaning & CSV Processing", d: "Standardize database column names to snake_case or convert CSV headers to the format your application expects before importing data." },
              { t: "URL & Slug Generation", d: "Convert heading text to kebab-case for URL slugs. Convert titles to lowercase and replace spaces with hyphens for SEO-friendly URLs." },
              { t: "API & JSON Key Formatting", d: "Convert JSON keys between camelCase (JavaScript convention) and snake_case (Python/Ruby convention) when working with APIs that use different naming styles." },
              { t: "Social Media & Marketing", d: "Create attention-grabbing posts with UPPERCASE headings. Use Alternating Case for humorous or casual social media content." },
              { t: "Academic & Professional Writing", d: "Apply proper Title Case to section headings in papers and reports. Use Sentence case for running text to maintain a professional tone." },
              { t: "Testing & QA", d: "Test case-sensitivity in your application by converting test strings to various cases. Verify that your code handles UPPERCASE and lowercase inputs correctly." },
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
          <h2 className="text-2xl font-bold tracking-tight">Text Formatting Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use our Word Counter to check the word and character count of your text after converting cases, since case changes do not affect word count but are useful before finalizing content.",
              "Find and replace specific words or phrases before converting case with our Text Replacer — fix typos and inconsistencies first, then apply your desired case format.",
              "Generate placeholder text for testing layouts with our Lorem Ipsum Generator, then use the Case Converter to format it as camelCase variable names or UPPERCASE headings.",
              "If you have repeated lines after pasting data, use our Remove Duplicate Lines tool to clean up the text before running case conversions on it.",
              "Chain multiple conversions using the Swap button — for example, convert to UPPERCASE first, then swap and convert to camelCase to see how different formats look on the same text.",
              "When converting existing code to snake_case or camelCase, paste the entire code block at once — the converter handles multi-line input and preserves line breaks.",
              "For SEO URLs, convert your page title to lowercase first, then use kebab-case to create a clean, hyphenated slug with no special characters.",
              "Use the Copy Output button to quickly grab the converted text and paste it directly into your code editor, email, or document without manual retyping.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our (Word Counter)/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Text Replacer)/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Lorem Ipsum Generator)/g, '<a href="/tools/text/lorem-ipsum-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
                    .replace(/our (Remove Duplicate Lines)/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>')
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
