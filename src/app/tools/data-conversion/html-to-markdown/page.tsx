import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HtmlToMarkdownTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

export default function HtmlToMarkdownPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Component */}
        <section className="mt-8" aria-label="HTML to Markdown Converter">
          <HtmlToMarkdownTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the HTML to Markdown Converter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your HTML</span> — Enter or paste HTML markup into the input textarea. You can paste a full HTML page, a snippet, or content copied from a browser. Click "Load Sample" to try the tool with example HTML.</li>
            <li><span className="text-foreground font-medium">Get Markdown instantly</span> — The Markdown output is generated automatically as you type. No button click needed. The conversion happens in real-time.</li>
            <li><span className="text-foreground font-medium">Copy the result</span> — Click "Copy Markdown" to copy the output to your clipboard. You can then paste it into any Markdown editor, documentation file, or content management system.</li>
            <li><span className="text-foreground font-medium">Swap or clear</span> — Use the Swap button to move the Markdown output into the input (useful for chaining with <a href="/tools/data-conversion/markdown-to-html" class="{LINK_CLASS}">Markdown to HTML Converter</a>). Use Clear to reset and start over.</li>
            <li><span className="text-foreground font-medium">Review the conversion</span> — Check that headings, links, images, lists, tables, and code blocks were converted correctly. Complex HTML is simplified to clean Markdown syntax.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Headings (h1-h6) converted to # to ###### Markdown syntax",
              "Bold (strong/b) and italic (em/i) to **text** and *text*",
              "Links (a) to [text](url) Markdown format",
              "Images (img) to ![alt](src) Markdown format",
              "Unordered lists (ul/li) to - item syntax",
              "Ordered lists (ol/li) to 1. 2. 3. numbered syntax",
              "Inline code to backticks, pre/code blocks to triple backtick fences",
              "Blockquotes to > text prefix format",
              "HTML tables to simple Markdown table syntax with alignment separators",
              "HTML entities decoded ( &amp; &lt; &gt; &quot; &nbsp; etc.)",
              "Unknown tags stripped while preserving text content",
              "100% client-side — no HTML is sent to any server",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Key Concepts */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding HTML and Markdown</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "What is HTML?",
                d: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags like &lt;h1&gt;, &lt;p&gt;, &lt;a&gt; to structure content. HTML is verbose and designed for browsers, making it less ideal for writing and reading content.",
              },
              {
                t: "What is Markdown?",
                d: "Markdown is a lightweight markup language created by John Gruber in 2004. It uses simple, readable syntax like # for headings, **bold**, and [links](url). It is designed for humans first and is the standard format for documentation, README files, and content platforms like GitHub and Notion.",
              },
              {
                t: "Why Convert HTML to Markdown?",
                d: "Converting HTML to Markdown is useful when migrating content from a CMS, blog, or website to a Markdown-based platform. It strips away styling while preserving the content structure, making it easy to edit in plain text editors and version control systems.",
              },
              {
                t: "Markdown vs HTML Trade-offs",
                d: "Markdown is simpler to write and read but has limitations compared to HTML. It does not support complex layouts, custom styling, or interactive elements. The converter focuses on content structure and strips non-semantic markup, producing clean and portable Markdown.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.d }} />
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "CMS Migration", d: "Convert HTML content from WordPress, Drupal, or other CMS platforms to Markdown for import into static site generators like Hugo, Jekyll, or Astro." },
              { t: "Documentation", d: "Convert HTML documentation pages to Markdown for use in GitHub wikis, README files, or documentation platforms like GitBook and Docusaurus." },
              { t: "Email Content", d: "Convert HTML email templates or newsletters to Markdown for archiving, version control, or repurposing in documentation systems." },
              { t: "Blog Migration", d: "Move blog posts from HTML-based blogging platforms to Markdown-based platforms like Ghost, Hashnode, or Dev.to." },
              { t: "Content Cleanup", d: "Strip unwanted HTML styling and formatting from copied web content, leaving clean, structured Markdown text that is easy to edit and reuse." },
              { t: "Note Taking", d: "Convert web articles or documentation to Markdown format for use in note-taking apps like Obsidian, Notion, or Logseq." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">HTML to Markdown Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              { html: `When copying HTML from a browser, use "Inspect Element" and copy the outer HTML of the content area for the cleanest conversion results.` },
              { html: `After conversion, use the Swap button and then <a href="/tools/data-conversion/markdown-to-html" class="${LINK_CLASS}">Markdown to HTML Converter</a> to verify the round-trip and catch any content that was lost.` },
              { html: `Complex HTML tables with colspan or rowspan are simplified. If the table structure is critical, review the Markdown output and adjust the formatting manually.` },
              { html: `The converter removes script, style, and head elements. If you need CSS or JavaScript, use a dedicated HTML editor instead of converting to Markdown.` },
              { html: `For HTML with inline styles, the styles are stripped since Markdown does not support styling. Focus on content structure rather than visual presentation.` },
              { html: `If you need to clean up HTML entities or encode special characters, use <a href="/tools/data-conversion/html-encoder" class="${LINK_CLASS}">HTML Encoder</a> after conversion.` },
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip.html }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
