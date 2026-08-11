import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert CSV to JSON?",
    answer: "Simply paste your CSV data into the input textarea, select your delimiter and options, and the JSON output is generated instantly in your browser. You can then copy it to your clipboard or download it as a .json file. No server upload is required."
  },
  {
    question: "What delimiters does the CSV to JSON converter support?",
    answer: "Our converter supports four common CSV delimiters: comma (,), semicolon (;), tab (\t), and pipe (|). You can select the delimiter from the options panel. The converter automatically detects the delimiter if your CSV uses one of these standard separators."
  },
  {
    question: "What is the difference between Array of Objects and Array of Arrays output?",
    answer: "When 'First row as header' is enabled and you choose 'Array of Objects', each row becomes an object where the keys come from the header row. For example, [{name: \"John\", age: \"30\"}]. With 'Array of Arrays', the data is returned as a simple nested array like [[\"name\", \"age\"], [\"John\", \"30\"]]. The Array of Objects format is more useful for most applications and APIs."
  },
  {
    question: "Does the converter handle CSV values with commas inside quotes?",
    answer: "Yes, our CSV parser respects RFC 4180 quoting rules. If a value contains a comma, semicolon, or newline character, it should be enclosed in double quotes. The parser correctly handles quoted fields, escaped quotes (doubled quotes like \"\"), and values that span multiple lines within quotes."
  },
  {
    question: "Can I convert large CSV files with this tool?",
    answer: "Since the converter runs entirely in your browser, the size of CSV you can convert depends on your device's available memory. It handles thousands of rows comfortably. For extremely large datasets (millions of rows), you may want to use a command-line tool or a dedicated desktop application for better performance."
  },
  {
    question: "Is my data safe when using this CSV to JSON converter?",
    answer: "Absolutely. All conversion happens client-side in your browser. Your CSV data is never sent to any server, stored, or tracked. You can safely convert sensitive data including personal information, financial records, or any other confidential CSV files."
  },
  {
    question: "Can I use the converted JSON in my JavaScript or Python code?",
    answer: "Yes, the JSON output is valid, standards-compliant JSON that can be used directly in JavaScript with JSON.parse() or in Python with json.loads(). Simply copy the output or download the .json file and import it into your project. The indentation option lets you match your project's code style."
  },
  {
    question: "What happens if my CSV has empty rows or columns?",
    answer: "Empty rows are skipped during conversion to keep the output clean. Empty columns are preserved as empty strings in the JSON output, which is the standard behavior for CSV parsing. If a row has fewer values than the header, missing fields are set to empty strings."
  },
  {
    question: "How do I download the JSON output as a file?",
    answer: "Click the 'Download .json' button below the output panel. This will generate and download a file named 'data.json' (or you can rename it) containing the full JSON output. The file uses UTF-8 encoding and has the .json extension, so it opens correctly in any code editor or application that supports JSON."
  },
  {
    question: "Does the tool support TSV (tab-separated values) files?",
    answer: "Yes, simply select 'Tab' as the delimiter in the options panel and paste your TSV data. The converter will parse it correctly and produce the same JSON output as it would for comma-separated data. This works for any tab-separated data exported from spreadsheets, databases, or other tools."
  },
]
