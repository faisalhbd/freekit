import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What does the Remove Extra Spaces tool do?",
    answer: "This tool cleans up messy text by removing unnecessary whitespace. It can remove extra spaces between words, trim leading and trailing spaces from lines, eliminate all tab characters, strip out blank lines, and normalize inconsistent line breaks to a standard format. All processing happens directly in your browser with zero server communication, ensuring your text remains completely private."
  },
  {
    question: "What is the difference between 'Remove Extra Spaces' and 'Remove Leading/Trailing Spaces'?",
    answer: "Remove Extra Spaces targets spaces between words — for example, 'Hello   World' becomes 'Hello World'. Remove Leading/Trailing Spaces focuses on spaces at the beginning and end of each line — for example, '  hello  ' becomes 'hello'. You can enable both options simultaneously for a thorough cleanup that handles all types of unnecessary spacing in one pass."
  },
  {
    question: "What does 'Normalize Line Breaks' mean?",
    answer: "Normalize Line Breaks converts all line break variations (Windows-style CRLF \\r\\n, old Mac-style CR \\r, and Unix-style LF \\n) to a single consistent format (LF \\n). This is useful when pasting text from different operating systems or applications that use different line ending conventions. Normalizing ensures consistent behavior regardless of where the text originated."
  },
  {
    question: "Will this tool remove intentional spaces?",
    answer: "The tool only removes extra spaces — it preserves the single space between words that is needed for readability. If you have 'Hello   World' with multiple spaces, it reduces them to one space: 'Hello World'. However, it will not merge words that were already separated by a single space. The leading/trailing space option only affects the beginning and end of lines, not spaces between words."
  },
  {
    question: "Can I remove tabs from my text?",
    answer: "Yes, enable the 'Remove All Tabs' option and all tab characters (\\t) will be stripped from your text. Tabs are commonly found in text copied from spreadsheets, code editors, and terminal output. They can cause alignment issues when pasted into web forms or documents, so removing them ensures clean, consistent formatting."
  },
  {
    question: "How does the 'Remove Blank Lines' option work?",
    answer: "When enabled, any line that is empty or contains only whitespace characters (spaces, tabs) will be removed from the output. This consolidates your text by eliminating unnecessary gaps between paragraphs or data entries. If you have text with double or triple line breaks, enabling this option will reduce them all to single line breaks."
  },
  {
    question: "Is there a limit on how much text I can process?",
    answer: "There is no fixed limit. The tool processes text entirely in your browser using client-side JavaScript, so performance depends on your device's memory and processing power. For typical use cases, texts up to several hundred thousand characters are processed instantly. Very large documents (megabytes of text) may take a second or two but will still complete successfully."
  },
  {
    question: "Is my text data private and secure?",
    answer: "Absolutely. All text processing is performed entirely within your browser. Your text is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your text is completely gone from memory. You can safely process sensitive content such as confidential documents, personal data, or proprietary code without any privacy concerns."
  },
  {
    question: "What do the statistics show?",
    answer: "The stats panel displays how many characters, words, and lines were removed during processing. This helps you understand the scope of cleanup performed. For example, you might see '42 characters removed, 8 words removed, 3 lines removed' — giving you a clear summary of how much unnecessary content was stripped from your text."
  },
  {
    question: "Can I undo the changes after processing?",
    answer: "Yes, you can use the Swap button to move the processed output back into the input area, and the Clear button to reset everything. While the tool does not have a formal undo history, your original text remains available until you replace it. For critical documents, we recommend keeping a copy of your original text in a separate file before processing."
  },
]
