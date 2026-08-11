import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the Diff Checker compare two texts?",
    answer: "The tool uses a Longest Common Subsequence (LCS) algorithm to identify the shared lines between your original and modified text. Lines that appear in both texts are marked as unchanged, lines that only exist in the original are marked as deleted (shown in red), and lines that only exist in the modified text are marked as added (shown in green). This approach produces an accurate line-by-line diff that works well for code, configuration files, prose, and any structured text. The entire comparison happens in your browser with no server involvement."
  },
  {
    question: "What is the difference between an added line and a modified line?",
    answer: "In a line-by-line diff, the tool identifies each line as either shared between both texts (unchanged), present only in the original (deleted), or present only in the modified text (added). A 'modification' in traditional diff tools is represented as a pair — one deleted line followed by one added line — since the tool compares whole lines rather than individual characters within a line. If you change part of a line without changing the entire line, the tool will show the old line as deleted and the new line as added. For character-level differences within a single line, you can visually compare the deleted and added lines side by side."
  },
  {
    question: "What does 'Ignore Whitespace' do?",
    answer: "When 'Ignore Whitespace' is enabled, the tool strips leading and trailing whitespace from each line before comparison. This means lines that differ only in indentation, trailing spaces, or tabs will be treated as identical. This is extremely useful when comparing code where formatting changes (like reformatting or changing indent style) should not count as actual content changes. Note that the displayed output still shows the original lines with their original whitespace — only the comparison logic is affected."
  },
  {
    question: "What does 'Ignore Case' do?",
    answer: "When 'Ignore Case' is enabled, the tool performs case-insensitive comparison of lines. This means 'Hello World', 'hello world', and 'HELLO WORLD' would all be treated as the same line. This is helpful when comparing texts where casing differences are not meaningful — for example, comparing lists of names, email addresses, or titles where capitalization may vary. Like the whitespace option, this only affects comparison logic; the displayed output preserves the original casing of both texts."
  },
  {
    question: "Can I compare very large texts or files?",
    answer: "Yes, the diff checker runs entirely in your browser and can handle texts with thousands of lines. The LCS algorithm has O(n*m) time complexity where n and m are the number of lines in each text, so very large files (tens of thousands of lines) may take a few seconds to process. For typical use cases like comparing code snippets, configuration files, or document drafts, the comparison is nearly instantaneous. There are no file size limits or upload restrictions since all processing is client-side."
  },
  {
    question: "What do the green and red colors mean in the diff output?",
    answer: "Green lines with a '+' prefix represent lines that were added — they exist in the Modified Text but not in the Original Text. Red lines with a '-' prefix represent lines that were deleted — they exist in the Original Text but not in the Modified Text. Lines without any background color and a space prefix are unchanged — they appear in both texts in the same relative position. This color coding follows the standard convention used by Git, diff utilities, and code review tools, making it immediately familiar to developers and content reviewers."
  },
  {
    question: "Is my text sent to a server for comparison?",
    answer: "No. The entire diff comparison is performed within your browser using client-side JavaScript. Your original text, modified text, and the diff results are never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, all data is gone from memory. You can safely compare sensitive content such as confidential documents, proprietary code, API keys, personal information, and any other private text without any privacy concerns."
  },
  {
    question: "How is this different from a word-level or character-level diff?",
    answer: "This tool performs a line-by-line diff, which compares entire lines as units. A word-level or character-level diff would highlight the specific words or characters that changed within a line. Line-level diff is the most commonly used format for code review and document comparison because it clearly shows which lines were added, removed, or kept. If you need to see exactly what changed within a single modified line, you can visually compare the deleted (red) line and its corresponding added (green) line that appear near each other in the output."
  },
  {
    question: "Can I use this to compare code files?",
    answer: "Absolutely. The Diff Checker works perfectly for comparing source code files, configuration files, JSON/XML documents, and any other text-based content. It supports common programming languages and file formats. For best results when comparing code, paste the content directly from your editor. You can also enable 'Ignore Whitespace' if you want to focus on content changes and ignore reformatting or indentation differences. While it doesn't have Git integration, it serves as a quick standalone alternative when you need to compare two code snippets without setting up a repository."
  },
  {
    question: "What do the stats (Lines Added, Lines Removed, Lines Unchanged, Total Changes) mean?",
    answer: "The stats provide a quick summary of the differences between your two texts. 'Lines Added' counts the green '+' lines — content that exists only in the modified text. 'Lines Removed' counts the red '-' lines — content that exists only in the original text. 'Lines Unchanged' counts lines that appear in both texts and are in the same relative position. 'Total Changes' is the sum of added and removed lines, giving you a single number that represents the overall magnitude of the difference. These stats help you quickly gauge how much the text has changed without reading through the entire diff."
  },
]
