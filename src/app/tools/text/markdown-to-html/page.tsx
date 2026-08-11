import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { MarkdownToHtmlTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function MarkdownToHtmlPage() {
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
        <section className="mt-8" aria-label="Markdown to HTML Converter">
          <MarkdownToHtmlTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the Markdown to HTML Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste or type your Markdown</span> — Enter any Markdown-formatted text in the input textarea. You can paste content from README files, documentation, blog drafts, or any Markdown source.</li>
            <li><span className="text-foreground font-medium">View the HTML output</span> — The converter instantly transforms your Markdown into HTML. Use the &quot;HTML Code&quot; tab to see the raw HTML source, or switch to &quot;Rendered Preview&quot; to see how it would look in a browser.</li>
            <li><span className="text-foreground font-medium">Copy the HTML</span> — Click the &quot;Copy HTML&quot; button to copy the generated HTML code to your clipboard. You can then paste it into your HTML file, CMS editor, or code editor.</li>
            <li><span className="text-foreground font-medium">Try the sample</span> — Click &quot;Load Sample&quot; to see a full Markdown example with headings, lists, code blocks, tables, and more. This helps you understand all supported syntax.</li>
            <li><span className="text-foreground font-medium">Clear and start over</span> — Use the &quot;Clear&quot; button to reset the input and start a new conversion. The character counts update in real time so you can monitor your content size.</li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Instant Markdown to HTML conversion with no server required",
              "Support for headings (h1 through h4), paragraphs, and line breaks",
              "Bold (**text** and __text__) and italic (*text* and _text_) formatting",
              "Strikethrough with double tilde syntax (~~text~~)",
              "Links [text](url) and images ![alt](url) with proper HTML output",
              "Unordered lists (- or *) and ordered lists (1. 2. 3.)",
              "Inline code (`code`) and fenced code blocks with language tags",
              "Blockquotes with vertical border styling",
              "Horizontal rules rendered as semantic <hr> elements",
              "GFM tables with proper <table>, <thead>, <th>, and <td> structure",
              "HTML Code and Rendered Preview tabs for dual output views",
              "One-click copy to clipboard for the generated HTML",
              "Real-time character count statistics for both input and output",
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
          <h2 className="text-2xl font-bold tracking-tight">Understanding Markdown to HTML Conversion</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Markdown Syntax Basics", d: "Markdown was designed to be as readable as possible in its raw form. A # symbol creates a heading, asterisks create emphasis, brackets and parentheses create links, and pipe characters create tables. When converted to HTML, each of these symbols is transformed into the corresponding HTML tag: <h1>–<h6> for headings, <strong> and <em> for emphasis, <a> for links, and <table> for tables." },
              { t: "GitHub Flavored Markdown (GFM)", d: "GFM extends the original Markdown specification with features commonly used on GitHub. The most significant addition is table support using pipe-separated columns. GFM also standardizes fenced code blocks with triple backticks, strikethrough with double tildes, and other formatting options. Our converter supports GFM tables and strikethrough, making it compatible with most GitHub README files." },
              { t: "Inline vs Block Elements", d: "Markdown has two types of elements: inline and block. Inline elements (bold, italic, code, links, images) appear within a line of text and are wrapped in tags like <strong>, <em>, <code>, <a>, and <img>. Block elements (headings, paragraphs, lists, blockquotes, code blocks, tables, horizontal rules) create their own visual block and are wrapped in structural tags like <h1>–<h4>, <p>, <ul>/<ol>, <blockquote>, <pre>/<code>, <table>, and <hr>." },
              { t: "HTML Code vs Rendered Preview", d: "The HTML Code tab shows the raw markup that would go into an HTML file or CMS. This is useful for developers who need the actual source code. The Rendered Preview tab interprets the HTML and displays it visually, showing how the formatted content would appear to end users. Use the preview to verify your Markdown is being converted correctly, then copy the HTML code from the code tab for production use." },
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
              { t: "Blog Post Publishing", d: "Write your blog posts in Markdown for speed and readability, then convert to HTML for publishing on platforms that accept raw HTML. This workflow is faster than writing HTML directly and produces cleaner markup." },
              { t: "Documentation Writing", d: "Technical documentation is often authored in Markdown for version control and readability. Convert your docs to HTML for hosting on static site generators, wikis, or knowledge base platforms." },
              { t: "README Files", d: "GitHub README files are written in Markdown. Convert them to HTML to embed in project websites, display on landing pages, or share as standalone documentation with proper formatting." },
              { t: "Email Templates", d: "Draft email content in Markdown for quick formatting, then convert to HTML to paste into email marketing tools or HTML email templates. The clean HTML output is compatible with most email clients." },
              { t: "Content Migration", d: "When migrating content from a Markdown-based platform to an HTML-based one, use this converter to batch-convert your articles, pages, and posts from Markdown format to clean HTML markup." },
              { t: "Static Site Generation", d: "If you are building a static website and have Markdown content, convert it to HTML to include directly in your pages without needing a build step or a static site generator like Hugo or Jekyll." },
              { t: "Learning Markdown", d: "New to Markdown? Type your Markdown and instantly see the HTML output to understand how each syntax element maps to an HTML tag. The rendered preview helps you learn Markdown by seeing the results in real time." },
              { t: "Quick HTML Prototyping", d: "Need HTML markup fast? Draft your structure in Markdown where it is quicker to write, then convert to HTML. This is much faster than hand-coding HTML tags for headings, lists, links, and other common elements." },
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
          <h2 className="text-2xl font-bold tracking-tight">Markdown Conversion Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "After converting your Markdown to HTML, use our Word Counter to verify the word count of your content and ensure it meets your documentation or blog post length requirements.",
              "If your Markdown content has inconsistent casing in headings or titles, use our Case Converter to normalize the text casing before converting to HTML for a professional look.",
              "When migrating Markdown content, use our Text Replacer to batch-fix common patterns like updating image URLs, replacing old domain references, or standardizing formatting before conversion.",
              "For more advanced Markdown editing with a live side-by-side preview, try our Markdown Editor & Preview tool which offers a richer editing experience with real-time rendering.",
              "Tables in Markdown can be tricky to format correctly. Use a monospace font awareness — each column should have consistent spacing between pipe characters for the parser to detect them properly.",
              "Code blocks are best written with an explicit language tag after the opening backticks (e.g., ```javascript). While this converter does not apply syntax coloring, the language tag helps with SEO and accessibility.",
              "When writing links in Markdown, always include meaningful link text rather than raw URLs. This produces better HTML anchor tags and improves both accessibility and SEO of your converted content.",
              "Use the \"Rendered Preview\" tab to spot formatting issues before copying the HTML. Common mistakes include missing blank lines between paragraphs and incorrect table separator syntax.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(/our Word Counter/g, '<a href="/tools/text/word-counter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Word Counter</a>')
                    .replace(/our Case Converter/g, '<a href="/tools/text/case-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Case Converter</a>')
                    .replace(/our Text Replacer/g, '<a href="/tools/text/text-replacer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Text Replacer</a>')
                    .replace(/our Markdown Editor & Preview/g, '<a href="/tools/text/markdown-editor-preview" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">Markdown Editor & Preview</a>')
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
