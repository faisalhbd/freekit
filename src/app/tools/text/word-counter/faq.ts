import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the word counter count words?",
    answer: "The word counter splits your text by whitespace and counts each non-empty segment as a word. It handles multiple spaces, tabs, and line breaks correctly, so you get an accurate count regardless of how the text is formatted."
  },
  {
    question: "What is the difference between characters with and without spaces?",
    answer: "Characters with spaces counts every single character including spaces, tabs, and line breaks. Characters without spaces excludes all whitespace characters, giving you only the count of letters, numbers, and punctuation. This distinction is important for platforms with strict character limits."
  },
  {
    question: "How is reading time calculated?",
    answer: "Reading time is estimated by dividing the total word count by 200 words per minute, which is the average adult reading speed. This gives you a practical estimate of how long it would take someone to read your text at a comfortable pace."
  },
  {
    question: "How is speaking time different from reading time?",
    answer: "Speaking time is calculated at 130 words per minute, which reflects the average pace of natural speech. Since people speak more slowly than they read, the speaking time estimate will always be longer than the reading time for the same text."
  },
  {
    question: "How are sentences counted?",
    answer: "The tool detects sentence boundaries by looking for common sentence-ending punctuation marks like periods, question marks, and exclamation marks followed by a space or the end of the text. It filters out common abbreviations and decimals to avoid false positives."
  },
  {
    question: "How does the tool detect paragraphs?",
    answer: "Paragraphs are counted by splitting the text on blank lines or line breaks. Any sequence of one or more consecutive newlines is treated as a paragraph separator. A block of text without any blank lines counts as a single paragraph."
  },
  {
    question: "Is my text stored or sent to a server?",
    answer: "No, all text processing happens entirely in your browser. Your text is never sent to any server, stored in a database, or shared with third parties. Once you close or refresh the page, your text is gone for good."
  },
  {
    question: "What are the character limits shown in the progress bars?",
    answer: "The progress bars show your character count against common platform limits like Twitter/X (280 characters) and SMS (160 characters). This helps you quickly see if your text fits within these constraints without needing to switch to another tool."
  },
  {
    question: "Can I use this tool for SEO content analysis?",
    answer: "Yes, the word counter helps ensure your content meets recommended word counts for SEO. Blog posts typically perform best between 1,500 and 2,500 words. You can pair this tool with our Keyword Density Checker for a complete content optimization workflow."
  },
  {
    question: "What is average word length and why does it matter?",
    answer: "Average word length is calculated by dividing the total character count (without spaces) by the number of words. A typical average is around 4.5 to 5.5 characters. Higher averages may indicate overly complex vocabulary, which could reduce readability for a general audience."
  },
]
