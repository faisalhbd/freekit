import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What does the List Cleaner tool do?",
    answer: "The List Cleaner transforms messy lists into clean, organized data. You can remove empty lines, duplicate items, numbering, bullet points, and whitespace. You can also sort lists alphabetically (A-Z or Z-A), and reformat them by adding new numbering or bullet point prefixes. All options can be combined in a single pass."
  },
  {
    question: "How does duplicate removal work?",
    answer: "Duplicate removal is case-insensitive, meaning 'Apple' and 'apple' are treated as the same item. Only the first occurrence is kept; subsequent duplicates are removed. The items retain the original casing of the first occurrence. This is useful for merging lists from different sources that may have overlapping entries."
  },
  {
    question: "Can I remove numbering from a list?",
    answer: "Yes, enable the 'Remove numbering (1. 2. 3.)' option. The tool detects and removes common numbering formats like '1.', '2.', '1)', '2)', and any other number followed by a period or closing parenthesis. The text content of each line is preserved, only the numbering prefix is stripped."
  },
  {
    question: "What bullet point formats are supported for removal?",
    answer: "The tool removes three common bullet point characters: hyphen (-), asterisk (*), and bullet (•). If a line starts with one of these characters followed by a space, both the character and the space are removed. The actual text content of the line is preserved."
  },
  {
    question: "Can I add numbering or bullet points to a plain list?",
    answer: "Yes. After cleaning your list (removing old formatting, duplicates, etc.), enable 'Add numbering' to prefix each line with '1. ', '2. ', '3. ', and so on. Or enable 'Add bullet points' to prefix each line with '- '. Note that these options are mutually exclusive — if you enable both, numbering takes priority."
  },
  {
    question: "What happens if I enable both Sort A-Z and Sort Z-A?",
    answer: "These options are mutually exclusive. Enabling Sort A-Z will automatically disable Sort Z-A, and vice versa. Only one sort direction can be active at a time. If you want to switch direction, simply click the other option."
  },
  {
    question: "Does the tool handle very large lists?",
    answer: "Yes. The tool processes text entirely in your browser, and can handle lists with thousands of items. Performance depends on your device, but lists with up to tens of thousands of lines process in under a second. For extremely large lists (100,000+ lines), processing may take a moment longer but will still complete successfully."
  },
  {
    question: "Is the trimming option applied before or after other operations?",
    answer: "Trimming is applied first, before any other operations like duplicate removal, sorting, or numbering removal. This ensures that duplicates caused by trailing spaces (like 'apple ' vs 'apple') are properly detected. The processing order is: trim whitespace, remove empty lines, remove numbering, remove bullet points, remove duplicates, sort, then add numbering/bullets."
  },
  {
    question: "Can I use the Swap button for multi-pass cleanup?",
    answer: "Yes. The Swap button moves the output into the input area so you can perform additional cleanup passes. For example, you might first remove duplicates, then swap the output to input, and then add numbering. This multi-pass approach gives you full control over the cleanup pipeline."
  },
  {
    question: "Is my list data private and secure?",
    answer: "Absolutely. All list processing is performed entirely within your browser using client-side JavaScript. Your list data is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your data is completely gone from memory."
  },
]
