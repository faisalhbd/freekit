import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What does the Line Break Remover tool do?",
    answer: "This tool removes or converts line breaks in your text. You can remove all line breaks to create a single continuous line, remove only double line breaks while keeping single ones (preserving paragraph breaks), convert line breaks to spaces to join lines while maintaining word separation, or convert to comma-separated values for list formatting. All processing is done in your browser for maximum privacy and speed."
  },
  {
    question: "What is the difference between removing all line breaks and removing double line breaks?",
    answer: "Removing all line breaks joins every line into a single continuous block of text — for example, 'Hello\\nWorld' becomes 'HelloWorld'. Removing double line breaks keeps single line breaks intact but collapses consecutive blank lines into one — so 'Hello\\n\\n\\nWorld' becomes 'Hello\\nWorld'. The double line break option is useful when you want to preserve paragraph structure while removing excessive spacing between paragraphs."
  },
  {
    question: "What does 'Convert line breaks to spaces' do?",
    answer: "This option replaces each line break character with a space character, effectively joining all lines into a continuous paragraph while preserving word boundaries. For example, 'Hello\\nWorld\\nFoo' becomes 'Hello World Foo'. This is ideal when you have text that was artificially broken into multiple lines and you want it to flow naturally as a paragraph."
  },
  {
    question: "When should I use the comma-separated option?",
    answer: "The comma-separated option converts each line into a comma-delimited item. For example, a list like 'Apple\\nBanana\\nCherry' becomes 'Apple, Banana, Cherry'. This is useful when you need to convert a vertical list into a format suitable for pasting into spreadsheets, CSV files, database queries, inline code arrays, or tags fields in CMS platforms."
  },
  {
    question: "Will this tool affect the content of my text?",
    answer: "The tool only modifies line break characters — it does not alter the actual text content, words, or characters within each line. When converting to spaces, the original words are preserved with a space inserted between them. No characters are added or removed except for the line break replacements you explicitly select."
  },
  {
    question: "Can I process very large texts?",
    answer: "Yes, the tool handles texts of any size since all processing is done in your browser. For typical documents and text files, processing is instantaneous. Even texts with hundreds of thousands of lines complete in under a second on modern devices. There are no server-side size limits."
  },
  {
    question: "Is my text data kept private?",
    answer: "Absolutely. All line break processing happens entirely within your browser using client-side JavaScript. Your text is never sent to any server, stored in any database, or logged. Once you close or refresh the page, your text is completely gone from memory. You can safely process any sensitive content."
  },
  {
    question: "What types of line breaks are supported?",
    answer: "The tool recognizes and handles all three line break types used across different platforms: LF (Unix/Linux/macOS), CRLF (Windows), and CR (classic Mac). All variants are treated as line breaks regardless of which option you choose. This ensures consistent results regardless of where your text originated."
  },
  {
    question: "What do the statistics show?",
    answer: "The stats panel displays the number of line breaks removed or converted during processing. This helps you understand the scale of formatting changes. For example, you might see '47 line breaks removed' or '12 line breaks converted to spaces' — giving you a clear picture of how the text structure changed."
  },
  {
    question: "Can I undo the changes after processing?",
    answer: "You can use the Swap button to move the processed output back into the input area for further modifications, and the Clear button to reset everything. While there is no formal undo history, your original text remains in the input until you replace it. For critical work, keep a backup copy of the original text before processing."
  },
]
