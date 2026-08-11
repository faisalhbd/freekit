import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MarkdownEditorPreviewTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MarkdownEditorPreviewPage() {
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
        <section className="mt-8" aria-label="Markdown Editor & Preview">
          <MarkdownEditorPreviewTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Markdown Editor & Preview</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Start typing Markdown</span> — Click in the editor pane on the left and begin writing Markdown. The preview pane on the right updates in real time as you type, showing the rendered HTML output instantly.</li>
            <li><span className="text-foreground font-medium">Use the toolbar</span> — Click the toolbar buttons above the editor to quickly insert Markdown syntax. Select text first to wrap it in formatting (e.g., select a word and click Bold to get **word**), or click a button with no selection to insert a template at your cursor position.</li>
            <li><span className="text-foreground font-medium">Check word and character counts</span> — The editor pane header displays a live word count and character count so you can monitor the length of your content as you write.</li>
            <li><span className="text-foreground font-medium">Copy the HTML</span> — Click the "Copy HTML" button to copy the generated HTML source code to your clipboard. You can then paste it into your HTML file, CMS editor, or code editor.</li>
            <li><span className="text-foreground font-medium">Export to a file</span> — Click the "Export" button to download your rendered content as a complete .html file with styling. The exported file opens cleanly in any browser and is ready to share or host.</li>
            <li><span className="text-foreground font-medium">Try the sample</span> — Click the "Sample" button to load a comprehensive Markdown demo that showcases all supported features including headings, lists, code blocks, tables, and more.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Split-pane layout with editor on left and live preview on right",
              "Responsive design — stacked vertically on mobile, side-by-side on desktop",
              "Real-time debounced preview that updates as you type",
              "Toolbar with 11 formatting buttons: Bold, Italic, Heading, Link, Image, Code, Lists, Blockquote, Table, HR",
              "Smart text insertion — wraps selected text or inserts template at cursor",
              "Built-in Markdown parser supporting headings, bold, italic, strikethrough, links, images, lists, code, blockquotes, tables, and HR",
              "Full GitHub Flavored Markdown (GFM) table support",
              "Live word count and character count in the editor header",
              "One-click copy HTML to clipboard",
              "Export to a styled .html file ready for sharing or hosting",
              "Load sample Markdown button with comprehensive formatting examples",
              "Clear button to reset the editor instantly",
              "100% client-side processing — your content never leaves your browser",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding the Markdown Editor</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Split-Pane Editing", d: "The editor uses a side-by-side layout where the left pane contains your raw Markdown source and the right pane shows the rendered HTML preview. This is the standard approach used by professional Markdown editors because it lets you see both the markup and the result simultaneously. On mobile devices, the layout automatically stacks vertically so both panes remain usable on smaller screens." },
              { t: "Debounced Live Preview", d: "The preview updates in real time but uses a 150-millisecond debounce to avoid excessive re-rendering. Without debouncing, every single keystroke would trigger a full Markdown parse, which could cause lag when typing quickly. The debounce waits until you pause briefly before updating the preview, resulting in smooth typing performance while still feeling instant." },
              { t: "Smart Toolbar Insertion", d: "The toolbar buttons are context-aware. If you highlight text and click Bold, the selected text is wrapped in ** markers. If nothing is selected, clicking Bold inserts a template with placeholder text that you can immediately replace. The same logic applies to all formatting buttons including links, images, and code, making the toolbar a powerful companion to keyboard-based Markdown writing." },
              { t: "Export Options", d: "The editor provides two ways to get your rendered content out of the tool. \"Copy HTML\" copies the raw HTML markup to your clipboard for pasting into a code editor or CMS. \"Export\" downloads a complete, self-contained .html file with embedded CSS styling. The exported file is a valid HTML5 document that opens in any browser and displays your content with clean typography and proper formatting." },
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
              { t: "Writing Blog Posts", d: "Draft blog posts in Markdown with immediate visual feedback. The split-pane view lets you check formatting, headings, and links as you write, ensuring your content looks right before publishing." },
              { t: "Creating Documentation", d: "Write technical documentation, API references, and user guides with Markdown. The live preview shows you exactly how your docs will look when rendered, including tables, code blocks, and nested lists." },
              { t: "Composing README Files", d: "Create or edit GitHub README files with confidence. The editor supports GFM tables and all common Markdown syntax, so you can preview exactly what your README will look like on GitHub." },
              { t: "Note Taking", d: "Take structured notes using Markdown headings, lists, and formatting. The editor provides a distraction-free writing environment with real-time rendering, perfect for meeting notes, study notes, or personal journals." },
              { t: "Email Drafting", d: "Draft formatted emails in Markdown and export as HTML for paste into email clients. This is faster than using rich-text editors and gives you full control over formatting." },
              { t: "Content Review", d: "Paste existing Markdown content from any source to review how it renders. Use the preview to spot formatting issues, broken links, or layout problems before publishing or sharing." },
              { t: "Learning Markdown", d: "New to Markdown? The editor is an ideal learning tool. Type any Markdown syntax and instantly see the result. Use the sample button to see comprehensive formatting examples all at once." },
              { t: "Quick Prototyping", d: "Need to quickly prototype how some content will look in HTML? Write it in Markdown (which is faster to type), preview it, then export the HTML. This workflow is significantly faster than hand-coding HTML." },
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
          <h2 className="text-2xl font-bold tracking-tight">Markdown Editor Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After drafting your content in the editor, use our Word Counter to get a detailed word, character, and sentence count analysis of your final text.",
              "If your headings or titles have inconsistent casing, use our Case Converter to normalize text casing before exporting your Markdown as HTML.",
              "When you need the cleanest possible HTML output for production use, try our Markdown to HTML converter which provides a dedicated conversion view with separate HTML code and rendered preview tabs.",
              "Need placeholder content to test your layout? Use our Lorem Ipsum Generator to create realistic filler text, then format it with Markdown in the editor.",
              "Use keyboard shortcuts alongside the toolbar for maximum efficiency. Select text with your mouse or keyboard, then click a toolbar button to wrap it in formatting instantly.",
              "When writing tables, keep your pipe characters aligned and ensure the separator row (with dashes) is present. The parser requires this row to detect table structure correctly.",
              "Code blocks with language tags (e.g., ```javascript) include the language as a data attribute in the exported HTML, making it easy to add syntax highlighting later with a library like Prism.js.",
              "The export feature creates a standalone HTML file with embedded CSS. You can open this file directly in a browser, share it via email, or upload it to a web server for hosting.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Case Converter/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Case Converter</a>')
                    .replace(/our Markdown to HTML/g, '<a href="/tools/text/markdown-to-html" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Markdown to HTML</a>')
                    .replace(/our Lorem Ipsum Generator/g, '<a href="/tools/text/lorem-ipsum-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Lorem Ipsum Generator</a>')
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
