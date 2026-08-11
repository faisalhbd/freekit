import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert JSON to CSV?",
    answer: "Paste your JSON array into the input textarea. The tool parses the JSON and generates CSV output instantly. You can then copy it or download it as a .csv file. The conversion happens entirely in your browser with no server processing."
  },
  {
    question: "What JSON formats are supported?",
    answer: "The converter works with JSON arrays of objects (the most common format), such as [{\"name\": \"John\", \"age\": 30}]. Each object becomes a row in the CSV. If your JSON is a single object or nested differently, use the Flatten Nested Objects option to handle deeper structures."
  },
  {
    question: "What does the Flatten Nested Objects option do?",
    answer: "When enabled, the converter flattens nested objects using dot notation. For example, {\"address\": {\"city\": \"NYC\"}} becomes a column named \"address.city\" with the value \"NYC\". This is useful when your JSON has nested structures that would otherwise be lost in a flat CSV format."
  },
  {
    question: "Can I convert JSON with arrays inside objects to CSV?",
    answer: "When flattening is enabled, array values inside objects are converted to JSON strings and placed in the corresponding column. For example, {\"tags\": [\"a\", \"b\"]} becomes a column \"tags\" with value \"[\"a\",\"b\"]\". This preserves the data while keeping it in CSV format."
  },
  {
    question: "Which delimiters can I use for the CSV output?",
    answer: "You can choose from three common CSV delimiters: comma (,), semicolon (;), and tab (\t). Comma is the standard CSV delimiter used by most tools. Semicolon is common in European locales where commas are used as decimal separators. Tab-separated values (TSV) are useful for pasting into spreadsheets."
  },
  {
    question: "Is my JSON data safe when using this converter?",
    answer: "Yes, absolutely. All JSON parsing and CSV generation happens entirely in your browser using client-side JavaScript. Your data is never uploaded to any server, stored in a database, or transmitted over the network. You can safely convert sensitive JSON data including API responses with personal information."
  },
  {
    question: "How does the Include Headers toggle work?",
    answer: "When enabled (default), the first row of the CSV output contains the column names derived from the JSON object keys. When disabled, only the data rows are output without a header row. This is useful when you want to append data to an existing CSV file that already has headers."
  },
  {
    question: "Can I open the downloaded CSV in Excel or Google Sheets?",
    answer: "Yes, the downloaded .csv file uses UTF-8 encoding with proper quoting for values that contain delimiters, quotes, or newlines. Excel and Google Sheets both support opening CSV files directly. For best results with special characters in Excel, the file includes a UTF-8 BOM marker to ensure correct encoding detection."
  },
  {
    question: "What happens if JSON objects have different keys?",
    answer: "The converter collects all unique keys from all objects in the array to form the CSV header. If an object is missing a key, the corresponding cell in the CSV will be empty. This ensures a consistent column structure across all rows, even when objects have different shapes."
  },
  {
    question: "Can I convert the CSV back to JSON?",
    answer: "Yes, use our <a href='/tools/data-conversion/csv-to-json' style='color:inherit;text-decoration:underline'>CSV to JSON Converter</a> to reverse the process. The Swap button in both tools lets you quickly pipe output from one converter into the input of the other for format chaining and testing."
  },
]
