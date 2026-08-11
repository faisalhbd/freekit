import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the Sentence Counter tool work?",
    answer: "The tool analyzes your text by splitting it on sentence-ending punctuation marks (period, exclamation mark, question mark) followed by whitespace. It then counts sentences, words, characters, paragraphs, and calculates averages like words per sentence and average sentence length in characters. All processing happens instantly in your browser."
  },
  {
    question: "What punctuation marks are used to identify sentences?",
    answer: "The tool splits text on periods (.), exclamation marks (!), and question marks (?) that are followed by whitespace. This is the standard approach for English text. Note that abbreviations like 'Dr.' or 'U.S.' may occasionally cause false splits, but for most text the detection is highly accurate."
  },
  {
    question: "What is the difference between 'Characters' and 'Characters (no spaces)'?",
    answer: "Characters counts every single character in your text, including letters, numbers, punctuation, and whitespace. Characters (no spaces) excludes all whitespace characters — spaces, tabs, and line breaks — giving you the count of only visible characters. This is useful for character limits that exclude spaces, such as certain form fields or social media platforms."
  },
  {
    question: "How are paragraphs counted?",
    answer: "Paragraphs are detected by looking for double line breaks (an empty line between blocks of text). A single block of text without any blank lines is counted as one paragraph. If your text uses different paragraph separation methods (like indentation without blank lines), the count may differ from your expectation."
  },
  {
    question: "What does 'Avg words per sentence' mean?",
    answer: "This is the average number of words across all detected sentences, calculated by dividing the total word count by the number of sentences. Typical English text averages 15-20 words per sentence. Higher averages may indicate long, complex sentences, while lower averages suggest shorter, punchier writing."
  },
  {
    question: "Can the tool highlight the longest or shortest sentence?",
    answer: "Yes. Enable the 'Highlight longest' toggle to visually identify the sentence with the most words, highlighted with an amber background. Enable 'Highlight shortest' to find the sentence with the fewest words, highlighted with a blue background. You can enable both toggles simultaneously to compare sentence lengths side by side."
  },
  {
    question: "Is the sentence detection accurate for all languages?",
    answer: "The tool is optimized for English and languages that use similar sentence-ending punctuation (Latin script with ., !, ?). It may not work as accurately for languages like Chinese, Japanese, or Korean that use different punctuation conventions. For these languages, the word and character counts will still be accurate even if sentence detection is less precise."
  },
  {
    question: "Does the tool count abbreviations as sentence endings?",
    answer: "The tool uses a simple rule-based approach: any period, exclamation mark, or question mark followed by whitespace is treated as a sentence boundary. Common abbreviations like 'Dr.', 'Mr.', or 'e.g.' may occasionally cause a false sentence split. For most general-purpose text analysis, this approach provides accurate and fast results."
  },
  {
    question: "Can I copy the statistics?",
    answer: "Yes, click the 'Copy Stats' button to copy all statistics to your clipboard in a clean text format. The copied text includes all metrics: sentence count, word count, character counts, paragraph count, averages, and the longest sentence word count. You can then paste this into a document, spreadsheet, or notes."
  },
  {
    question: "Is my text data private and secure?",
    answer: "Absolutely. All text analysis is performed entirely within your browser using client-side JavaScript. Your text is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your text is completely gone from memory. You can safely analyze sensitive content without any privacy concerns."
  },
]
