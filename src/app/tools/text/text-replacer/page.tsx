import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { TextReplacerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function TextReplacerPage() {
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
        <section className="mt-8" aria-label="Text Replacer">
          <TextReplacerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Text Replacer</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your text</span> — Enter any text in the large input textarea. You can paste content from documents, code files, logs, or any other source.</li>
            <li><span className="text-foreground font-medium">Enter your search term</span> — Type the text or regex pattern you want to find in the Find input field. Enable the "Use Regex" toggle if you need pattern-based matching.</li>
            <li><span className="text-foreground font-medium">Enter your replacement</span> — Type the replacement text in the Replace input field. For regex mode, you can use $1, $2, etc. for backreferences.</li>
            <li><span className="text-foreground font-medium">Configure options</span> — Toggle Case Sensitive, Whole Word, or Regex mode as needed. Invalid regex patterns will show a red error message.</li>
            <li><span className="text-foreground font-medium">Click Replace All or Replace First</span> — Replace All changes every match, while Replace First changes only the first occurrence. For multiple replacements, switch to Batch mode.</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Use the Copy Output button to copy the final text, or use Undo Last to revert the previous replacement.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Plain text and regex (regular expression) search support",
              "Case-sensitive and case-insensitive matching toggle",
              "Whole word matching to avoid partial word replacements",
              "Replace All and Replace First modes for precise control",
              "Batch replacement with multiple find/replace pairs processed sequentially",
              "Each batch row has its own case sensitivity setting",
              "Regex validation with clear error messages for invalid patterns",
              "Backreference support ($1, $2, etc.) in regex replacement strings",
              "Undo Last button to revert the most recent replacement",
              "Match count and replacement count statistics displayed in real time",
              "Add and remove batch rows dynamically for flexible workflows",
              "100% client-side processing — your text never leaves your browser",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Find and Replace</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Plain Text vs Regex", d: "Plain text search looks for an exact string match — every character must match literally. Regex (regular expressions) uses a pattern language where special characters like ., *, +, ?, \d, \w, and [] define flexible match rules. For example, \d{3}-\d{4} can match any phone number pattern in the format 123-4567, without knowing the actual digits." },
              { t: "Case Sensitivity & Whole Word", d: "Case sensitivity determines whether 'hello' matches 'Hello' or 'HELLO'. When disabled, the search ignores all letter casing. Whole word matching adds word boundary checks (\b) so that searching for 'cat' won't accidentally match inside 'category' or 'concatenate'. These options can be combined for precise text targeting." },
              { t: "Backreferences in Replacement", d: "Backreferences ($1, $2, etc.) let you reuse captured portions of the match in the replacement. For example, with the pattern (Mr\\.?|Mrs\\.?) (\\w+), you can reformat names by using $2 $1 to swap first and last names. This is essential for restructuring data formats like dates, names, and URLs." },
              { t: "Sequential Batch Processing", d: "Batch replacement applies your find/replace rules one after another in order. The output of the first rule becomes the input for the second, and so on. This means you can chain operations: first fix one pattern, then clean up the result with another pattern. The order of your batch rows directly affects the final output." },
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
              { t: "Code Refactoring", d: "Rename variables, update import paths, or change function names across multiple files. Use regex to match patterns like oldNamespace.newMethod and replace with updatedNamespace.updatedMethod." },
              { t: "Data Cleaning", d: "Remove extra whitespace, standardize date formats, strip HTML tags, normalize phone numbers, or fix inconsistent separators in CSV and log files using batch replacement rules." },
              { t: "Content Editing", d: "Fix consistent typos across a document, update brand names or product names, change terminology, or replace outdated terminology with current language throughout your content." },
              { t: "Log File Analysis", d: "Redact sensitive information like IP addresses, emails, or API keys from log files before sharing. Use regex patterns to match and mask private data patterns." },
              { t: "Localization & Translation Prep", d: "Replace hardcoded strings with translation function calls, wrap text in i18n placeholders, or convert string formats between different localization systems." },
              { t: "URL & Link Management", d: "Update domain names in bulk, convert relative URLs to absolute URLs, change HTTP to HTTPS, or rewrite path structures across HTML or markdown content." },
              { t: "Format Conversion", d: "Convert between data formats like JSON key naming conventions (camelCase to snake_case), restructure configuration files, or transform tabular data between different delimiter formats." },
              { t: "Template Processing", d: "Fill in template placeholders with actual values, replace environment variable references, or process tokenized content in one batch operation with multiple replacement rules." },
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
          <h2 className="text-2xl font-bold tracking-tight">Text Replacement Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After replacing text, use our Word Counter to verify the word and character count of your updated content and ensure the replacements didn't unexpectedly change text length.",
              "Combine find and replace with our Case Converter for powerful text transformations — first replace specific words, then convert the entire text to the desired case format.",
              "If your replacement introduces duplicate lines, follow up with our Remove Duplicate Lines tool to clean up the output and ensure each line is unique.",
              "Use our Diff Checker to compare the original and replaced text side by side. This helps you verify exactly what changed and catch any unintended replacements.",
              "When using regex, test complex patterns on a small sample first. Enable and disable the Whole Word toggle to see how it affects your match results before running on the full text.",
              "For batch replacements, order your rules from most specific to most general. This prevents a general rule from modifying text that a later, more specific rule should handle differently.",
              "Use the Undo Last button frequently when building complex batch rules. It lets you experiment with different replacement patterns without losing your previous results.",
              "To remove text entirely, leave the Replace field empty. This is useful for stripping unwanted characters, tags, or formatting from your text in a single operation.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Case Converter/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Case Converter</a>')
                    .replace(/our Remove Duplicate Lines/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Duplicate Lines</a>')
                    .replace(/our Diff Checker/g, '<a href="/tools/text/diff-checker" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Diff Checker</a>')
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
