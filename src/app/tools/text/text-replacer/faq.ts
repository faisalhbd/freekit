import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the difference between plain text and regex replacement?",
    answer: "Plain text replacement searches for an exact literal string match and replaces it. Regex (regular expression) replacement uses a pattern-matching language that lets you search for text patterns rather than exact strings. For example, the regex pattern \\d+ matches any sequence of digits, so you can find and replace all phone numbers, dates, or numeric values without knowing them in advance. Regex also supports special constructs like character classes, quantifiers, anchors, and capture groups for powerful text manipulation."
  },
  {
    question: "How does case sensitivity affect find and replace?",
    answer: "When case sensitivity is enabled (the default for plain text), the search only matches text with the exact same letter casing. For example, searching for \"hello\" will not match \"Hello\" or \"HELLO\". When case sensitivity is disabled, the search ignores letter casing entirely and matches \"hello\", \"Hello\", \"HELLO\", and any other casing variation. This is useful when you want to replace words regardless of how they are capitalized throughout your text."
  },
  {
    question: "What does \"whole word\" matching mean?",
    answer: "Whole word matching ensures that the search term is only matched when it appears as a complete word, not as part of a larger word. For example, searching for \"cat\" with whole word matching enabled will match \"the cat sat\" but will not match \"category\", \"concatenate\", or \"scattered\". Internally, this wraps the search pattern with word boundary markers (\\b) so it only matches at word boundaries. Disable this option if you want to find the search term even when it appears within other words."
  },
  {
    question: "What are backreferences in regex replacement?",
    answer: "Backreferences let you reuse parts of the matched text in your replacement string. When you use parentheses in a regex pattern, they create capture groups. You can reference the first captured group with $1, the second with $2, and so on. For example, the pattern (\\w+)@(\\w+)\\.(\\w+) captures the username, domain, and TLD of an email address separately. You could then use the replacement string $2@$1.com to swap the username and domain. This makes regex replacement extremely powerful for restructuring text patterns."
  },
  {
    question: "What are some common regex patterns for find and replace?",
    answer: "Here are widely used regex patterns: \\[\\\\d+\\\\] matches one or more digits; \\[\\\\s+\\\\] matches one or more whitespace characters; \\[^\\\\n\\\\]*$ matches trailing spaces on a line; \\[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}\\\\] matches email addresses; \\[\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\] matches IPv4 addresses; and \\[\\\\bhttps?://[^\\\\s]+\\\\] matches URLs. You can use these patterns with the regex toggle enabled to quickly find and replace common text structures."
  },
  {
    question: "How does batch replacement work?",
    answer: "Batch replacement lets you define multiple find-and-replace pairs that are applied sequentially to your text. The first replacement is performed on the original text, the second replacement is performed on the result of the first, and so on. This means the order of your replacement rows matters. For example, if Row 1 replaces \"cat\" with \"dog\" and Row 2 replaces \"dog\" with \"pet\", the final result will have \"pet\" wherever \"cat\" originally appeared. Each row can also have its own case sensitivity setting, giving you fine-grained control over each replacement operation."
  },
  {
    question: "Can I undo a replacement?",
    answer: "Yes, the tool provides an \"Undo Last\" button that reverts the output back to the previous state before the most recent replacement was applied. This works for both single and batch replacements. However, the undo only remembers one step back, so if you perform multiple replacements and want to undo them all, you should use the \"Reset\" button instead. The Reset button clears all output and restores the original input text, allowing you to start over."
  },
  {
    question: "Is my text secure when using this tool?",
    answer: "Absolutely. All text processing happens entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in a database, or transmitted over the internet. This means you can safely process sensitive content such as passwords, API keys, personal data, confidential documents, and proprietary code without any privacy concerns. The tool works completely offline once the page is loaded."
  },
  {
    question: "What happens if my regex pattern is invalid?",
    answer: "If you enter an invalid regular expression pattern, the tool will display a clear red error message below the search input explaining that the pattern is invalid. The replacement will not be executed, so your text remains unchanged. Common regex errors include unescaped special characters (like an unmatched opening parenthesis), invalid quantifiers (like *?+ at the start of a pattern), and malformed character classes. Fix the pattern and try again — the error message will disappear once the regex becomes valid."
  },
  {
    question: "Can I use this tool to clean up messy text data?",
    answer: "Yes, this tool is excellent for text cleaning tasks. You can remove extra whitespace by searching for \\[\\\\s+\\\\] and replacing with a single space. You can remove trailing whitespace from lines by searching for \\[ \\[\\\\t\\\\]+$\\\\] and replacing with nothing. You can standardize line endings, remove duplicate spaces, strip HTML tags with a regex pattern, normalize date formats, and much more. The batch replacement feature is especially useful for cleaning tasks because you can chain multiple cleanup operations together in a single pass."
  },
]
