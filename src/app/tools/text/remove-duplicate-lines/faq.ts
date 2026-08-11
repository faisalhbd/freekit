import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the Remove Duplicate Lines tool work?",
    answer: "The tool processes your text line by line and keeps only the first occurrence of each unique line, removing all subsequent duplicates. This is done using an in-browser JavaScript algorithm that tracks seen lines in a Set data structure for fast O(1) lookups. The original order of first occurrences is fully preserved — only the duplicate entries are stripped out. The entire process happens client-side with zero server communication."
  },
  {
    question: "Does the tool preserve the original order of lines?",
    answer: "Yes, by default the tool preserves the original order of your text. Only the first occurrence of each unique line is kept, and it stays in its original position. For example, if your input is 'apple, banana, apple, cherry, banana', the output will be 'apple, banana, cherry' — maintaining the sequence in which unique items first appeared. If you want the output sorted alphabetically instead, you can enable the 'Sort Results' toggle before processing."
  },
  {
    question: "What does the 'Case Sensitive' option do?",
    answer: "When Case Sensitive is enabled (the default), lines that differ only in letter casing are treated as different lines. For example, 'Hello', 'hello', and 'HELLO' would all be kept as separate unique lines. When Case Sensitive is disabled, these three lines would be treated as the same line, and only the first occurrence would be kept (in its original casing). This is useful when you have data with inconsistent capitalization and want to consolidate variants of the same text."
  },
  {
    question: "What does 'Trim Whitespace' do and when should I use it?",
    answer: "Trim Whitespace removes leading and trailing spaces, tabs, and other whitespace characters from each line before comparing them for duplicates. This is essential when your data has inconsistent spacing — for example, '  apple' and 'apple   ' would normally be treated as different lines, but with Trim Whitespace enabled, both are compared as 'apple' and the duplicate is removed. The output lines are also trimmed of extra whitespace for a cleaner result."
  },
  {
    question: "Can the tool remove empty lines as well?",
    answer: "Yes, the 'Remove Empty Lines' toggle filters out any lines that are empty or contain only whitespace characters (spaces, tabs). When enabled, these blank lines are excluded from the output entirely. This is particularly useful when cleaning up text copied from documents, spreadsheets, or log files that often contain extra blank lines between entries. You can combine this with the other options for a thorough text cleanup in one step."
  },
  {
    question: "How does the 'Sort Results' option work?",
    answer: "When Sort Results is enabled, after removing duplicates the tool sorts all remaining unique lines alphabetically in ascending order (A to Z). The sorting respects your Case Sensitive setting — if case-insensitive mode is on, the sort is also case-insensitive. Note that sorting overrides the default behavior of preserving the original line order. If you need both deduplication and sorted output, this toggle saves you from having to use a separate sorting tool afterward."
  },
  {
    question: "What is the 'Auto-process' feature?",
    answer: "Auto-process mode instantly processes your text as you type or paste, so you see the deduplicated output in real time without needing to click the Process button. This is ideal for quick cleanup tasks and small to medium texts. For very large texts (tens of thousands of lines), you may want to disable auto-process to avoid unnecessary computations on every keystroke, and instead click the Process button manually once you have finished entering your text."
  },
  {
    question: "How large of a text can the tool handle?",
    answer: "The tool processes text entirely in your browser, so its performance depends on your device's memory and processing power. For typical use cases, it handles texts with tens of thousands of lines smoothly and within seconds. Extremely large texts with hundreds of thousands of lines may take slightly longer but will still work correctly. Since there is no server involved, there are no file size limits or upload restrictions — the only constraint is your browser's available memory."
  },
  {
    question: "Is my text data safe and private?",
    answer: "Absolutely. All text processing is performed entirely within your browser using client-side JavaScript. Your text is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your text is completely gone from memory. This means you can safely process sensitive data such as email lists, personal information, confidential documents, API keys, and any other private content without any privacy concerns."
  },
  {
    question: "What is the difference between this tool and a simple text sort?",
    answer: "A simple text sort rearranges all lines but does not remove duplicates. This tool specifically identifies and removes duplicate lines, which a sort alone cannot do. Additionally, by default this tool preserves your original line order while a sort would rearrange everything. The tool also offers options like case-insensitive comparison, whitespace trimming, and empty line removal that a basic sort does not provide. However, if you enable the Sort Results toggle, this tool effectively combines both deduplication and sorting in a single operation."
  },
]
