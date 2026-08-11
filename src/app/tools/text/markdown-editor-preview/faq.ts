import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a Markdown editor with live preview?",
    answer: "A Markdown editor with live preview is a writing tool that shows you the formatted output of your Markdown text in real time as you type. Instead of writing Markdown in one place and converting it separately, the editor displays the rendered HTML side by side (or stacked on mobile) with your raw Markdown source. This lets you see headings, bold text, lists, code blocks, and other formatting instantly, making it much easier to write and review Markdown content."
  },
  {
    question: "How does the live preview work?",
    answer: "The live preview uses a built-in Markdown parser that runs entirely in your browser. As you type in the editor pane, a debounced function (with a short delay of about 150 milliseconds) re-parses your Markdown text and converts it to HTML. The HTML is then rendered in the preview pane using React's dangerouslySetInnerHTML. This approach ensures smooth performance even with rapid typing, since the preview does not update on every single keystroke but rather after a brief pause."
  },
  {
    question: "What Markdown features are supported?",
    answer: "The editor supports a comprehensive set of Markdown features including headings (h1 through h4), bold (**text** and __text__), italic (*text* and _text_), strikethrough (~~text~~), inline links [text](url), images ![alt](url), unordered lists (- or *), ordered lists (1. 2. 3.), inline code (`code`), fenced code blocks with triple backticks, blockquotes (>), horizontal rules (--- or ***), and GFM tables with pipe syntax. These cover the most commonly used Markdown formatting for documentation, blog posts, and technical writing."
  },
  {
    question: "Does the editor support GitHub Flavored Markdown (GFM)?",
    answer: "Yes, the editor supports key GFM features. The most significant is table support using pipe characters to create structured data tables. GFM strikethrough with double tildes (~~text~~) is also supported. Fenced code blocks follow the GFM specification with triple backticks and optional language tags. These features make the editor compatible with content from GitHub README files, GitLab wikis, and other platforms that use GFM."
  },
  {
    question: "Can I export the rendered HTML?",
    answer: "Yes, the editor provides two export options. First, you can click the \"Copy HTML\" button to copy the generated HTML source code to your clipboard for pasting into a code editor or CMS. Second, you can click the \"Export\" button to download the rendered content as a complete .html file. The exported file includes a basic HTML document structure with a styled container, so it opens cleanly in any browser. Both options let you use your Markdown content in other tools and platforms."
  },
  {
    question: "Is my content private and secure?",
    answer: "Yes, completely. The Markdown editor and preview process all text entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in a database, or transmitted over the internet. You can safely write sensitive documentation, private notes, proprietary content, or any other text without privacy concerns. The tool works completely offline once the page has loaded, making it safe for confidential work."
  },
  {
    question: "How do I use the toolbar buttons?",
    answer: "The toolbar provides quick-insert buttons for common Markdown syntax. When no text is selected, clicking a button inserts the default syntax at your cursor position (for example, clicking Bold inserts **bold text**). When text is highlighted, the button wraps the selection with the appropriate syntax (highlighting \"hello\" and clicking Bold produces **hello**). The toolbar includes buttons for bold, italic, headings, links, images, inline code, unordered lists, ordered lists, blockquotes, tables, and horizontal rules."
  },
  {
    question: "Does the editor support syntax highlighting for code blocks?",
    answer: "The editor displays fenced code blocks with a distinct visual style — a rounded background container with monospace font and overflow scrolling, making code blocks clearly distinguishable from regular text. You can specify a language tag after the opening backticks (e.g., ```javascript) which is included in the output. While the editor does not apply token-level syntax coloring in the preview pane, the code blocks are properly formatted and ready to integrate with external syntax highlighting libraries like Prism.js or Highlight.js in your exported HTML."
  },
  {
    question: "Can I use the editor on mobile devices?",
    answer: "Yes, the editor is fully responsive. On desktop screens, it displays a side-by-side split-pane layout with the editor on the left and preview on the right. On mobile devices and smaller screens, the layout automatically switches to a vertically stacked view with the editor on top and the preview below. All toolbar buttons, action buttons, and the word/character counter remain accessible and functional on mobile. The editor uses touch-friendly tap targets for all interactive elements."
  },
  {
    question: "What is the difference between this editor and the Markdown to HTML converter?",
    answer: "The Markdown Editor & Preview is designed for writing and composing content with a real-time visual preview alongside your source text. It features a toolbar for quick formatting, a split-pane layout for simultaneous editing and previewing, and export options. The Markdown to HTML converter, on the other hand, is focused on conversion — you paste or type Markdown and get the raw HTML output with separate tabs for HTML code and rendered preview. Use the editor when you are actively writing and need live feedback. Use the converter when you have existing Markdown and want the cleanest possible HTML output for production use."
  },
]