import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a regular expression (regex)?",
    answer:
      "A regular expression (regex or regexp) is a sequence of characters that defines a search pattern. It is used in programming and text processing to find, match, validate, or replace specific text within a larger string. For example, the regex `\\d+` matches one or more digits, and `[a-z]+` matches one or more lowercase letters. Regex is supported by virtually every programming language and is essential for data validation, text parsing, and search operations.",
  },
  {
    question: "What do the regex flags (g, i, m, s, u) do?",
    answer:
      "Each flag modifies how the regex engine interprets your pattern. The `g` (global) flag finds all matches in the string instead of stopping at the first one. The `i` (case-insensitive) flag makes the match ignore letter case, so `/abc/i` matches 'ABC', 'abc', and 'Abc'. The `m` (multiline) flag makes `^` and `$` match the start and end of each line rather than just the entire string. The `s` (dotall) flag makes `.` match newline characters too. The `u` (unicode) flag enables full Unicode support for matching emoji, accented characters, and other Unicode symbols.",
  },
  {
    question: "What are capture groups and how do I use them?",
    answer:
      "Capture groups are portions of your regex enclosed in parentheses `()` that 'remember' the matched text for later use. For example, in the pattern `(\\w+)@(\\w+)\\.(\\w+)`, there are three capture groups: the username, the domain name, and the top-level domain. After a match, you can reference these groups by their index (group 1, group 2, etc.) or by named groups using `(?<name>...)` syntax. In replacement strings, use `$1`, `$2`, etc. to insert captured values. Non-capturing groups `(?:...)` group without capturing.",
  },
  {
    question: "What is the difference between lookahead and lookbehind assertions?",
    answer:
      "Lookahead and lookbehind are zero-width assertions that check for a pattern without including it in the match. A positive lookahead `(?=...)` asserts that what follows the current position matches the pattern. For example, `\\d+(?=px)` matches digits only if followed by 'px' (like '16' in '16px'). A negative lookahead `(?!...)` asserts the opposite. A positive lookbehind `(?<=...)` asserts that what precedes the current position matches, like `(?<=\\$)\\d+` to match dollar amounts. A negative lookbehind `(?<!...)` ensures the pattern is NOT preceded by the given text. These are powerful for context-aware matching.",
  },
  {
    question: "Why does my regex pattern cause an error?",
    answer:
      "Regex syntax errors occur when the pattern contains invalid constructs. Common causes include: unescaped forward slashes (use `\\/` to match a literal `/`), unbalanced parentheses or brackets, invalid escape sequences (like `\\x` without two hex digits), invalid quantifiers (like `*+` or `?{`), and incompatible flag combinations. Our tool displays the exact error message from the JavaScript regex engine so you can identify and fix the issue. If you are migrating regex from another language (Python, Java, PCRE), note that JavaScript regex has some syntax differences.",
  },
  {
    question: "How do I test a regex for email validation?",
    answer:
      "Email validation with regex is a classic challenge because the official specification (RFC 5322) is extremely complex. For practical use, a simplified pattern like `^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$` covers most common email formats. You can click the 'Email' quick-insert button in our tool to load this pattern and test it against various email addresses. For production use, combine regex validation with server-side verification (sending a confirmation email) for the most reliable results.",
  },
  {
    question: "Can I use this tool to test regex from Python, Java, or other languages?",
    answer:
      "Our tool uses JavaScript's built-in RegExp engine, which follows the ECMAScript specification. While most regex syntax is shared across languages, there are differences. For example, Python supports `\\A` and `\\Z` for absolute start/end, Java uses `\\p{L}` for Unicode categories, and .NET supports balancing groups. The core patterns like character classes, quantifiers, groups, and lookarounds work the same everywhere. Test your patterns here first, then verify any language-specific features in your target environment.",
  },
  {
    question: "What is the difference between greedy and lazy (non-greedy) quantifiers?",
    answer:
      "By default, quantifiers like `*`, `+`, and `{n,m}` are greedy, meaning they match as much text as possible. For example, `<.*>` matches everything from the first `<` to the last `>` in a string. Adding a `?` after a quantifier makes it lazy (non-greedy), so it matches as little as possible. `<.*?>` matches from `<` to the very next `>`. Understanding greedy vs. lazy behavior is crucial for writing correct regex, especially when parsing HTML, XML, or other structured text with repeating delimiters.",
  },
  {
    question: "How does the replacement preview feature work?",
    answer:
      "The replacement feature lets you specify a replacement string and see the result in real time. In the replacement string, you can use `$&` to refer to the entire match, `$1`, `$2`, etc. to refer to numbered capture groups, `$<name>` for named capture groups, and `$$` for a literal dollar sign. For example, with the pattern `(\\d{4})-(\\d{2})-(\\d{2})` and replacement `$2/$3/$1`, the date '2025-07-22' becomes '07/22/2025'. The preview updates live as you type either the pattern or the replacement string.",
  },
  {
    question: "Is my test data secure when using this regex tester?",
    answer:
      "Yes, completely. All regex testing, matching, and replacement operations run entirely in your browser using client-side JavaScript. Your test strings, regex patterns, and any other data you enter are never sent to any server, stored in a database, or transmitted over the network. You can safely test regex patterns against sensitive data like API responses, log entries, personal information, or confidential text without any privacy concerns.",
  },
]
