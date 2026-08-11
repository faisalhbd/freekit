import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert HTML to Markdown?",
    answer: "Paste your HTML markup into the input textarea and the Markdown output is generated automatically. You can also click 'Load Sample' to try the tool with example HTML. Then copy or download the Markdown result."
  },
  {
    question: "Which HTML tags are supported?",
    answer: "The converter handles h1-h6 (headings), p (paragraphs), strong/b (bold), em/i (italic), a (links), img (images), ul/ol/li (lists), code (inline code), pre/code (code blocks), blockquote, hr (horizontal rule), br (line break), and table elements. All other tags are removed while keeping their text content."
  },
  {
    question: "Are HTML attributes preserved?",
    answer: "Only essential attributes are preserved: href from anchor tags and src/alt from image tags. All other attributes (class, id, style, data-*, etc.) are stripped since Markdown does not support them."
  },
  {
    question: "How are tables converted?",
    answer: "HTML tables are converted to simple Markdown table syntax with header rows and alignment separators. Nested tables or tables with complex structures (colspan, rowspan) are simplified to basic Markdown tables."
  },
  {
    question: "Does the converter handle nested HTML elements?",
    answer: "Yes, the converter handles reasonably nested HTML. For example, a bold word inside a link (like &lt;strong&gt; inside &lt;a&gt;) is converted to **[text](url)**. Deep nesting is supported for lists and block elements."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All conversion happens client-side in your browser. Your HTML content is never sent to any server, stored, or tracked. You can safely convert any HTML content including from private documents."
  },
  {
    question: "Can I convert a full HTML page?",
    answer: "Yes, but the converter extracts the body content and ignores the &lt;head&gt;, &lt;script&gt;, &lt;style&gt;, and other non-content tags. This gives you the Markdown representation of the visible page content."
  },
  {
    question: "What happens to unsupported HTML tags?",
    answer: "Unsupported tags are removed while their text content is preserved. For example, &lt;div class='foo'&gt;Hello&lt;/div&gt; becomes just 'Hello' in the Markdown output. This ensures no content is lost during conversion."
  },
  {
    question: "Can I convert Markdown back to HTML?",
    answer: "Yes, use the Swap button to move the Markdown output into the input, then use the <a href='/tools/data-conversion/markdown-to-html' class='font-medium text-primary'>Markdown to HTML Converter</a> to convert it back. This is useful for round-trip testing or making edits in Markdown format."
  },
  {
    question: "Does the converter handle HTML entities?",
    answer: "Common HTML entities like &amp;amp;, &amp;lt;, &amp;gt;, &amp;quot;, and &amp;nbsp; are decoded during conversion. Numeric character references (&amp;#169;, &amp;#8212;, etc.) are also handled. The output uses plain text characters."
  },
]
