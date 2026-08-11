import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I format a SQL query?",
    answer: "Paste your SQL query into the input textarea and click the 'Format' button. The formatted SQL appears instantly in the output panel. You can also press Ctrl+Enter (or Cmd+Enter on Mac) to format. Adjust indentation and keyword case using the options above the output."
  },
  {
    question: "Does the formatter support all SQL dialects?",
    answer: "The formatter handles standard SQL syntax including SELECT, FROM, WHERE, JOIN variants, GROUP BY, ORDER BY, HAVING, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER, and more. It works well with MySQL, PostgreSQL, SQLite, and other major SQL dialects. Dialect-specific functions are left as-is."
  },
  {
    question: "Can I choose between 2-space and 4-space indentation?",
    answer: "Yes. Use the indentation toggle in the options bar to switch between 2 spaces and 4 spaces per indent level. The output updates immediately when you change this setting."
  },
  {
    question: "What does the uppercase keywords toggle do?",
    answer: "When enabled, all SQL keywords (SELECT, FROM, WHERE, JOIN, etc.) are automatically converted to uppercase in the formatted output. When disabled, keywords keep their original case. This is useful for maintaining consistent coding style across your team."
  },
  {
    question: "Does the formatter preserve string literals and comments?",
    answer: "Yes, the formatter recognizes single-quoted strings and does not modify their contents. Comments (lines starting with -- or enclosed in /* */) are preserved as-is in the formatted output."
  },
  {
    question: "Can I minify SQL instead of formatting it?",
    answer: "While the primary purpose is beautification, you can achieve a minified result by copying the original unformatted input. The formatter is designed to add structure and readability to SQL code."
  },
  {
    question: "Is my SQL data secure?",
    answer: "Absolutely. All formatting happens client-side in your browser. Your SQL queries are never sent to any server, stored, or tracked. You can safely format queries containing sensitive table names, column names, or business logic."
  },
  {
    question: "What do the keyword count and line count stats mean?",
    answer: "The keyword count shows how many SQL keywords (SELECT, FROM, WHERE, etc.) were found in your query. The line count shows the total number of lines in the formatted output. These stats help you understand the complexity and size of your SQL query."
  },
  {
    question: "Can I use the Swap button?",
    answer: "Yes. The Swap button moves the formatted output into the input textarea, allowing you to re-format with different settings or make manual adjustments. This is useful when you want to tweak the formatting options and re-run the formatter."
  },
  {
    question: "Does the tool work with very long SQL queries?",
    answer: "Yes. The formatter handles queries of any length. Since it runs in your browser, performance depends on your device, but it easily formats queries with hundreds of lines and complex nested subqueries."
  },
]
