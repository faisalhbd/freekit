import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are zero-width characters and why should I remove them?",
    answer: "Zero-width characters (\u200B zero-width space, \u200C zero-width non-joiner, \u200D zero-width joiner, \uFEFF BOM/zero-width no-break space) are invisible Unicode characters that can be accidentally copied from websites, PDFs, or word processors. They cause invisible formatting issues, break string comparisons, and can even be used maliciously to hide text. Removing them ensures your text is truly clean."
  },
  {
    question: "What does 'fix encoding artifacts' do?",
    answer: "This option detects and fixes common mojibake (character encoding corruption) patterns. For example, it converts Ã© back to é, â\u20AC\u2122 back to \' (right single quotation mark), and Ã¢Â€Â™ back to the proper Unicode character. These artifacts typically appear when UTF-8 text is incorrectly decoded as ISO-8859-1 or Windows-1252."
  },
  {
    question: "What is the difference between 'remove empty lines' and 'convert multiple blank lines to single'?",
    answer: "'Remove empty lines' strips out all lines that contain no visible characters, leaving no line breaks between paragraphs. 'Convert multiple blank lines to single' preserves paragraph separation by keeping exactly one blank line between blocks of text while collapsing any consecutive blank lines into a single one."
  },
  {
    question: "Will removing HTML tags damage my text content?",
    answer: "The HTML tag remover uses a regex pattern that strips opening and closing tags (like &lt;p&gt;, &lt;div&gt;, &lt;span&gt;, etc.) while preserving the text content inside them. HTML entities like &amp;amp;, &amp;lt;, and &amp;nbsp; are not converted — use a dedicated HTML-to-text tool for full entity decoding."
  },
  {
    question: "What counts as a 'non-printable character'?",
    answer: "Non-printable characters include control characters (ASCII 0-31, except tab, newline, and carriage return), the delete character (ASCII 127), and other Unicode control codes in the C0 and C1 ranges. These characters are invisible in text editors but can cause parsing errors, database issues, and display glitches."
  },
  {
    question: "Why does my cleaned text still look different from the original?",
    answer: "If you have selected multiple cleaning options, the order of operations matters. For example, 'normalize line endings' runs first to convert all line breaks to \n, then 'remove leading whitespace' and 'remove trailing whitespace' process each line. This is intentional — each option is applied independently to produce predictable results."
  },
  {
    question: "Is my text sent to a server for cleaning?",
    answer: "No. All text cleaning operations happen entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in any database, or shared with third parties. This makes it safe to clean sensitive text like passwords, API keys, and private documents."
  },
  {
    question: "Can I use this tool to clean data before importing into a database?",
    answer: "Absolutely. This tool is ideal for pre-processing data before CSV imports, database inserts, or API payloads. Enable 'remove extra spaces', 'remove trailing whitespace', 'normalize line endings', and 'remove non-printable characters' for a thorough database-friendly cleanup."
  },
  {
    question: "What is the 'normalize line endings' option for?",
    answer: "Different operating systems use different line endings: Windows uses \r\n (CRLF), Unix/Linux/macOS uses \n (LF), and classic Mac used \r (CR). Mixing line endings in a single file causes issues with version control, scripts, and text processing. This option converts all line endings to the standard \n (LF) format."
  },
  {
    question: "How do I know which cleaning options to enable?",
    answer: "If you are unsure, click 'Select All' to apply every cleaning option. For most copy-pasted text from websites, enabling 'remove extra spaces', 'remove trailing whitespace', 'remove zero-width characters', and 'normalize line endings' covers the most common issues. The before/after stats will show you exactly what changed."
  },
]
