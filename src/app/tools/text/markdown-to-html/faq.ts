import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is Markdown and why should I convert it to HTML?",
    answer: "Markdown is a lightweight plain-text formatting syntax created by John Gruber in 2004. It uses simple symbols like # for headings, * for emphasis, and [text](url) for links. Converting Markdown to HTML is necessary because web browsers only understand HTML. By converting Markdown to HTML, you can publish content on websites, blogs, and documentation platforms that display formatted text with proper structure, links, and styling."
  },
  {
    question: "What Markdown features does this converter support?",
    answer: "This converter supports a comprehensive set of Markdown features including headings (h1 through h4), bold and italic text, strikethrough, inline links and images, ordered and unordered lists, inline code and fenced code blocks with language specification, blockquotes, horizontal rules, basic GFM (GitHub Flavored Markdown) tables, and paragraphs separated by double newlines. It covers the most commonly used Markdown syntax for documentation, blog posts, and technical writing."
  },
  {
    question: "What is GFM (GitHub Flavored Markdown)?",
    answer: "GitHub Flavored Markdown (GFM) is an extension of the original Markdown specification that adds features commonly used on GitHub. The most notable GFM addition is table support using pipe characters (|) and dashes (-) to create structured tables. GFM also supports task lists with checkboxes, strikethrough with double tildes (~~text~~), and fenced code blocks with triple backticks. Our converter supports GFM tables and strikethrough syntax."
  },
  {
    question: "How do I create a code block with syntax highlighting?",
    answer: "To create a fenced code block, wrap your code with three backticks (```) on the line before and after your code. You can optionally specify a language name immediately after the opening backticks for identification. For example, writing ```javascript on the first line tells readers the code is JavaScript. The converter will wrap your code in <pre><code> HTML tags. Note that this converter does not apply syntax coloring — it generates the structural HTML tags that you can style with CSS or integrate with a syntax highlighting library like Prism or Highlight.js."
  },
  {
    question: "How are Markdown tables converted to HTML?",
    answer: "GFM tables use pipe characters to separate columns and dashes to create a separator row. For example, | Header 1 | Header 2 | followed by | --- | --- | and then data rows. The converter parses these into proper HTML <table> elements with <thead>, <tbody>, <tr>, <th>, and <td> tags. The separator row (the line with dashes) is required and defines the column structure, but it is not rendered in the final HTML output."
  },
  {
    question: "Can I use inline HTML within my Markdown?",
    answer: "This converter processes Markdown syntax and converts it to HTML. If you include raw HTML tags within your Markdown input, they will be preserved in the output since the converter only transforms Markdown-specific syntax (like #, *, [text](url), etc.) and passes through any content that does not match known Markdown patterns. However, the converter is designed specifically for Markdown-to-HTML conversion, so mixing raw HTML with Markdown may produce unpredictable results depending on the context."
  },
  {
    question: "What is the difference between the HTML Code and Rendered Preview tabs?",
    answer: "The HTML Code tab displays the raw HTML source code generated from your Markdown input. This is what you would copy and paste into an HTML file, a CMS, or a code editor. The Rendered Preview tab interprets that HTML and shows you how it would visually appear in a browser, with proper heading sizes, bold and italic text, clickable links, images, tables, and code formatting. Use the HTML Code tab when you need the actual markup, and the Rendered Preview tab to visually verify the output looks correct."
  },
  {
    question: "Is my Markdown data safe when using this converter?",
    answer: "Yes, absolutely. All conversion happens entirely in your browser using client-side JavaScript. Your Markdown text is never sent to any server, stored in a database, or transmitted over the internet. You can safely convert sensitive documentation, proprietary content, private notes, or any other text without privacy concerns. The tool works completely offline once the page has loaded."
  },
  {
    question: "Can I convert large Markdown documents with this tool?",
    answer: "Yes, you can convert documents of any size since the processing is done locally in your browser. There are no server-side file size limits. However, extremely large documents (hundreds of thousands of characters) may cause slight delays in the browser depending on your device's performance. For typical blog posts, README files, and documentation pages, the conversion is instant. The input and output statistics show character counts so you can monitor the size of your content."
  },
  {
    question: "What are some common Markdown formatting examples?",
    answer: "Here are the most common Markdown syntax examples: Headings use # (h1), ## (h2), ### (h3), #### (h4). Bold text uses **text** or __text__. Italic uses *text* or _text_. Strikethrough uses ~~text~~. Links use [display text](URL). Images use ![alt text](image URL). Unordered lists start each item with - or *. Ordered lists use 1. 2. 3. Inline code wraps text in single backticks like `code`. Code blocks use triple backticks. Blockquotes start lines with >. Horizontal rules use --- or ***. Tables use | col | col | separated by a | --- | --- | header row."
  },
]
