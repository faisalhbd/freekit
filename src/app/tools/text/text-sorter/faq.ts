import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does alphabetical sorting work in the Text Sorter?",
    answer: "Alphabetical sorting (A→Z) arranges lines based on their character values using the standard Unicode collation order. Each line is compared character by character from left to right. In case-insensitive mode, both lines are converted to lowercase before comparison so that 'apple' and 'Apple' are treated as equivalent. The sorting is performed entirely in your browser using JavaScript's native string comparison, which follows Unicode standards and handles most international characters correctly."
  },
  {
    question: "What is the difference between alphabetical and numerical sorting?",
    answer: "Alphabetical sorting compares lines as strings character by character, which means '10' comes before '2' because the character '1' has a lower Unicode value than '2'. Numerical sorting, on the other hand, extracts the numeric value from each line and sorts by that value, so '2' correctly comes before '10'. Numerical sorting is ideal for numbered lists, IP address segments, version numbers, and any data where the numeric magnitude matters. If a line has no leading number, it is treated as zero in numerical mode."
  },
  {
    question: "What does ascending vs descending order mean?",
    answer: "Ascending order sorts from smallest to largest — A to Z for alphabetical sorting and 0 to 9 for numerical sorting. Descending order reverses this, sorting from largest to smallest — Z to A or 9 to 0. For example, ascending alphabetical order would give you 'apple, banana, cherry', while descending would give you 'cherry, banana, apple'. You can switch between the two modes instantly using the sort method buttons at the top of the tool."
  },
  {
    question: "How does the Case Sensitive option affect sorting?",
    answer: "When Case Sensitive is enabled, uppercase letters are sorted before lowercase letters because of their lower Unicode values. For example, 'Apple', 'Banana', 'apple', 'banana' would be the result since 'A' (65) comes before 'a' (97). When Case Sensitive is disabled, the tool compares lines in a case-insensitive manner, so 'apple' and 'Apple' are treated as equal for ordering purposes. This typically produces more intuitive results when your data has mixed or inconsistent capitalization."
  },
  {
    question: "What does the Random (Shuffle) sort method do?",
    answer: "The Random sort method shuffles all lines into a completely random order using the Fisher-Yates algorithm, which guarantees an unbiased, equally-likely permutation. This is useful for randomizing lists of names, creating randomized quiz orders, shuffling playlist track orders, or any scenario where you want the lines in a non-deterministic order. Each time you click Sort with the Random method selected, you will get a different arrangement."
  },
  {
    question: "Can I remove duplicates while sorting?",
    answer: "Yes, the 'Remove Duplicates' toggle works alongside any sort method. When enabled, duplicate lines are removed before sorting, so only unique lines remain in the final output. By default, the first occurrence of each line is kept. Combined with the Case Sensitive option, you can control whether 'Hello' and 'hello' are considered duplicates. This combination of deduplication and sorting in a single step is one of the tool's most popular features for cleaning up messy lists."
  },
  {
    question: "What does the Trim Lines option do?",
    answer: "The Trim Lines option removes leading and trailing whitespace (spaces, tabs) from each line before sorting. This is important because lines with extra spaces can sort unexpectedly — for example, '  apple' would sort before 'banana' in alphabetical order due to the leading spaces. Trimming ensures that the sort is based on the actual content of each line rather than incidental whitespace. The output lines are also trimmed for a cleaner result."
  },
  {
    question: "What does the Remove Empty Lines option do?",
    answer: "When enabled, any lines that are empty or contain only whitespace are automatically removed before sorting. Empty lines always sort to the top (or bottom in descending order), which can be undesirable when you only want to see your actual data. This option is especially useful when pasting text from documents, PDFs, or spreadsheets that often include extra blank lines between entries."
  },
  {
    question: "How does the Auto-sort feature work?",
    answer: "Auto-sort processes and sorts your text in real time as you type or paste, so the output updates automatically without needing to click the Sort button. It uses a short debounce delay (150 milliseconds) to avoid excessive re-sorting on every keystroke. This is ideal for quick tasks and small to medium texts. For very large texts with tens of thousands of lines, you may want to disable auto-sort and use the manual Sort button instead for better performance."
  },
  {
    question: "Is my text data safe and private?",
    answer: "Absolutely. All sorting operations are performed entirely within your browser using client-side JavaScript. Your text is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your text is completely gone from memory. This means you can safely sort sensitive data such as email lists, names, addresses, confidential documents, and any other private content without any privacy concerns."
  },
]