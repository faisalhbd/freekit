import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is Text to Markdown conversion?",
    answer:
      "Text to Markdown conversion is the process of taking unstructured plain text and automatically converting it into properly formatted Markdown. The tool detects patterns like headings (ALL CAPS lines, lines ending with colons), list items (bullets and numbered items), URLs, and inline formatting (bold/italic markers), then wraps them with the appropriate Markdown syntax to create clean, structured output.",
  },
  {
    question: "How does the smart detection work?",
    answer:
      "The tool applies a set of heuristic rules to each line of your text. Lines in ALL CAPS with fewer than 60 characters are converted to H1 headings. Lines ending with a colon become H2 headings. Lines starting with bullet characters (-, *, •) become Markdown list items. Numbered patterns (1. or 1)) become numbered lists. URLs are auto-linked, and existing bold/italic markers are preserved. Empty lines create paragraph breaks.",
  },
  {
    question: "Will my existing formatting be preserved?",
    answer:
      "Yes. The tool preserves existing Markdown-style formatting that is already in your text. If your text contains **bold** or __bold__ markers, *italic* or _italic_ markers, or Markdown-style links, they are kept as-is in the output. The conversion focuses on adding structure — headings, lists, and links — without overwriting formatting you have already applied.",
  },
  {
    question: "Can I convert text in different languages?",
    answer:
      "Yes, the tool works with any language that uses the Latin character set. For non-Latin scripts like Chinese, Japanese, or Korean, the ALL CAPS detection for headings will not apply, but all other rules (bullet lists, numbered lists, URLs, colons for headings, empty lines for paragraphs) work universally regardless of language.",
  },
  {
    question: "How do I handle text that has existing Markdown?",
    answer:
      "The tool is designed to be non-destructive. If your text already contains Markdown formatting (headings with #, bullet lists with -, bold with **, etc.), the conversion will not double-format these elements. Existing Markdown structures pass through unchanged, and the tool only adds formatting where plain text patterns are detected. This makes it safe to run on text that may already have some Markdown mixed in.",
  },
  {
    question: "What happens to URLs in my text?",
    answer:
      "URLs detected in your text are automatically converted to Markdown link format. Bare URLs like https://example.com become [https://example.com](https://example.com). If the URL appears at the start of a line with no other text, it is kept as-is for cleaner rendering in most Markdown editors.",
  },
  {
    question: "Can I convert a large block of text?",
    answer:
      "There are no hard limits on the size of text you can convert. Since all processing happens in your browser, the practical limit depends on your device's available memory. Most modern browsers can handle text files with tens of thousands of lines without any issues. The conversion is instantaneous for typical documents.",
  },
  {
    question: "Does the tool auto-convert as I type?",
    answer:
      "No, the conversion is triggered when you click the Convert button. This gives you full control over when the conversion happens and lets you review your input text before converting. You can also click the Reset button to clear both input and output and start fresh.",
  },
  {
    question: "Can I copy or download the Markdown output?",
    answer:
      "Yes. You can copy the converted Markdown to your clipboard with one click, or download it as a .md file. The downloaded file uses your preferred name and is ready to open in any Markdown editor, note-taking app, or static site generator.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, the Text to Markdown converter is completely free with no limitations. There are no usage caps, no sign-up requirements, no watermarks, and no premium tiers. Use it as often as you like for any purpose.",
  },
]
