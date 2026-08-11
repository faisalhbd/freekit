import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the Duplicate Word Finder work?",
    answer: "The tool scans your text, extracts all words (sequences of letters, numbers, and apostrophes), and counts how many times each word appears. Words that appear more than once are listed as duplicates with their frequency count. The original text is displayed with duplicates highlighted so you can see them in context."
  },
  {
    question: "What is the difference between case-sensitive and case-insensitive mode?",
    answer: "In case-insensitive mode (default), 'The' and 'the' are treated as the same word. This is useful for most writing where capitalization at the start of sentences creates apparent duplicates. In case-sensitive mode, 'The' and 'the' are treated as different words, which is useful for code analysis or when capitalization differences are meaningful."
  },
  {
    question: "How are words defined?",
    answer: "Words are defined as sequences of word characters: letters (a-z, A-Z), digits (0-9), underscores, and apostrophes. This means contractions like 'don't' and 'it's' are treated as single words. Punctuation marks, symbols, and whitespace separate words but are not included in the word itself."
  },
  {
    question: "What does 'Duplicate Occurrences' mean in the stats?",
    answer: "This is the total number of word instances that are duplicates — that is, the sum of (count - 1) for every word that appears more than once. For example, if 'the' appears 5 times and 'is' appears 3 times, the duplicate occurrences would be (5-1) + (3-1) = 6. This tells you how many extra instances could be removed."
  },
  {
    question: "Can I remove duplicates from my text?",
    answer: "Yes. The tool automatically generates a 'Text with Duplicates Removed' version where only the first occurrence of each word is kept, and subsequent duplicates are removed. The cleaned text preserves the original word order and formatting structure. You can copy this cleaned text with one click."
  },
  {
    question: "Does the tool remove duplicates from the text automatically?",
    answer: "No, the tool only analyzes and displays results by default. The cleaned text is shown in a separate output area so you can review it before copying. Your original text in the input area remains unchanged. You must explicitly click 'Copy Cleaned Text' to use the deduplicated version."
  },
  {
    question: "What happens to punctuation when removing duplicates?",
    answer: "Punctuation and whitespace are preserved in their original positions. The tool only removes duplicate word tokens, leaving the surrounding punctuation intact. However, this means that removing words may leave adjacent punctuation (like double periods or spaces). We recommend reviewing the cleaned text and using our Remove Extra Spaces tool for final touch-up."
  },
  {
    question: "Is this tool different from Remove Duplicate Lines?",
    answer: "Yes. Remove Duplicate Lines compares entire lines for duplicates. This tool compares individual words within the text. For example, a text with 'I went to the store and the market' would show 'the' as a duplicate word, but Remove Duplicate Lines would not flag anything since each line is unique. Use this tool for word-level analysis and Remove Duplicate Lines for line-level deduplication."
  },
  {
    question: "Can I use this tool for code analysis?",
    answer: "Yes, with caveats. The tool identifies words using regex (\\b[\\w']+\\b), which works for most programming language identifiers. Enable case-sensitive mode for code analysis since variable names in many languages are case-sensitive. However, the tool does not understand programming syntax — strings, comments, and code keywords are all treated equally."
  },
  {
    question: "Is my text data private and secure?",
    answer: "Absolutely. All duplicate word detection and text processing is performed entirely within your browser using client-side JavaScript. Your text is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your text is completely gone from memory."
  },
]
