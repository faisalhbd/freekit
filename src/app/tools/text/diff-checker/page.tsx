import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { DiffCheckerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function DiffCheckerPage() {
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
        <section className="mt-8" aria-label="Diff Checker">
          <DiffCheckerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Diff Checker</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your original text</span> — Enter or paste the before-version of your text into the "Original Text" textarea on the left. This could be the old version of a document, a previous code snippet, or any baseline text you want to compare against.</li>
            <li><span className="text-foreground font-medium">Paste your modified text</span> — Enter or paste the after-version into the "Modified Text" textarea on the right. This is the new or updated version that you want to compare against the original.</li>
            <li><span className="text-foreground font-medium">Configure options</span> — Enable "Ignore Whitespace" if indentation or trailing spaces should not count as differences. Enable "Ignore Case" if capitalization differences should be ignored during comparison.</li>
            <li><span className="text-foreground font-medium">Click Compare</span> — Press the Compare button to generate a line-by-line diff. The results appear below with color-coded highlighting: green for added lines, red for removed lines, and no highlight for unchanged lines.</li>
            <li><span className="text-foreground font-medium">Review stats and results</span> — Check the summary badges showing lines added, removed, unchanged, and total changes. Use Copy Diff to copy the unified diff to your clipboard, or Swap to reverse the comparison direction.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Line-by-line diff using Longest Common Subsequence (LCS) algorithm",
              "Color-coded output: green for additions, red for deletions, no highlight for unchanged",
              "Unified diff format with +, -, and space prefixes for each line",
              "Ignore Whitespace option to skip indentation and trailing space differences",
              "Ignore Case option for case-insensitive text comparison",
              "Stats summary: lines added, removed, unchanged, and total changes",
              "Swap button to quickly reverse original and modified texts",
              "Copy Diff button to copy the unified diff to your clipboard",
              "Side-by-side input layout on desktop, stacked layout on mobile",
              "Line numbers in the diff output for easy reference",
              "100% client-side processing — your text never leaves your browser",
              "Handles thousands of lines efficiently in the browser",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Diff Comparison</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "How LCS-Based Diff Works", d: "The tool uses the Longest Common Subsequence algorithm to find the longest set of lines that appear in both texts in the same relative order. These common lines form the 'unchanged' backbone of the diff. Lines in the original text that are not part of this subsequence are marked as deleted (red), and lines in the modified text that are not part of it are marked as added (green). This produces a clean, minimal diff that focuses on actual changes rather than noise." },
              { t: "Added vs. Deleted vs. Modified", d: "In a line-level diff, there are only three states: added, deleted, and unchanged. What looks like a 'modified' line is actually represented as a pair — a deleted line followed by an added line. For example, if you change 'name: John' to 'name: Jane', the diff will show '- name: John' in red and '+ name: Jane' in green. This is the same convention used by Git, GNU diff, and most code review tools." },
              { t: "Unified Diff Format", d: "The output follows the unified diff convention: each line is prefixed with a character indicating its status. A '+' prefix (green) means the line was added, a '-' prefix (red) means the line was removed, and a space prefix (no color) means the line is unchanged. Line numbers on the left help you locate changes within the original context. This format is widely recognized by developers and can be copied directly into documentation or patch files." },
              { t: "When to Use Ignore Options", d: "The Ignore Whitespace option is ideal when comparing code that has been reformatted or when indentation has changed but the actual content has not. The Ignore Case option is useful when comparing text where capitalization is inconsistent — for example, lists of names, titles, or data exported from different systems. These options only affect the comparison logic; the displayed output always shows the original text with its full formatting and casing preserved." },
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
              { t: "Code Review", d: "Compare two versions of a code file to see exactly which lines were added, removed, or changed. Perfect for reviewing pull requests, auditing code changes, or understanding what a refactoring actually modified." },
              { t: "Document Revision Tracking", d: "Compare drafts of contracts, proposals, articles, or reports to see what content was added or removed between versions. Useful for collaborative writing and editorial review." },
              { t: "Configuration File Changes", d: "Compare old and new versions of configuration files like .env, nginx.conf, or JSON configs to verify exactly what settings were changed during a deployment or migration." },
              { t: "Data Migration Verification", d: "After migrating data between systems, export before and after snapshots as text and diff them to verify that only expected changes occurred and no data was accidentally lost." },
              { t: "Content Localization", d: "Compare the original and translated versions of text documents to ensure all content has been properly translated and no sections were accidentally omitted." },
              { t: "Legal Document Comparison", d: "Compare different versions of legal agreements, terms of service, or policies to identify the specific clauses that were added, removed, or reworded between revisions." },
              { t: "Educational Plagiarism Check", d: "Compare a student submission against a reference text to identify matching and differing passages. While not a full plagiarism detector, it highlights exact textual similarities." },
              { t: "API Response Comparison", d: "Compare API responses from different environments (e.g., staging vs. production) or before and after a deployment to verify that endpoints return the expected data." },
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
          <h2 className="text-2xl font-bold tracking-tight">Diff Checker Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After identifying differences between two text versions, use our Text Replacer to batch-fix common patterns across the modified text, such as standardizing terminology or formatting.",
              "Use our Word Counter on both the original and modified text to get a quick overview of length changes before running a detailed line-by-line comparison.",
              "If your diff shows many duplicate unchanged lines cluttering the output, use our Remove Duplicate Lines tool on each text first to strip out repeated content, then re-run the diff for a cleaner result.",
              "After comparing texts and merging changes, use our Text Sorter to alphabetize sections, reorder paragraphs, or organize lines by length for a cleaner final document.",
              "When comparing code with different indentation styles, enable Ignore Whitespace to focus on actual logic changes rather than formatting differences.",
              "For lists with inconsistent capitalization (e.g., names from different data sources), enable Ignore Case to see past casing differences and focus on content differences.",
              "Use the Swap button when you need to see the reverse perspective — it swaps which text is treated as 'original' and which as 'modified', useful for reviewing what was removed versus what was added.",
              "The Copy Diff button copies the output in standard unified diff format, which you can paste into emails, documentation, or issue trackers to share exact change details with your team.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Text Replacer/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Replacer</a>')
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Remove Duplicate Lines/g, '<a href="/tools/text/remove-duplicate-lines" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Remove Duplicate Lines</a>')
                    .replace(/our Text Sorter/g, '<a href="/tools/text/text-sorter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Sorter</a>')
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
              "Trim trailing whitespace from both texts before comparing if you only care about content differences, or simply enable the Ignore Whitespace toggle to handle this automatically.",
              "When comparing code files, make sure both versions use the same line ending style (LF vs. CRLF). Mixed line endings can cause every line to appear as changed. Use our Text Replacer to normalize line endings first.",
              "For very large files with thousands of lines, the comparison may take a few seconds. The LCS algorithm has O(n×m) complexity, so the time scales with the product of both file sizes.",
              "If the diff output seems too noisy, try enabling both Ignore Whitespace and Ignore Case to filter out formatting and casing differences and focus on substantive content changes.",
              "Use the Copy Diff feature to save a snapshot of the differences for your records. The unified diff format is universally understood and can be referenced in code reviews, documentation, or changelogs.",
              "When comparing translated or localized content, paste both versions and enable Ignore Case to catch differences that might be hidden by inconsistent capitalization across languages.",
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
