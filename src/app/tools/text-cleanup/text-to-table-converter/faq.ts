import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What does the Text to Table Converter do?",
    answer: "This tool converts delimited text data (tab-separated, comma-separated, semicolon-separated, or pipe-separated) into properly formatted HTML and Markdown tables. You paste your data, select the delimiter, and the tool instantly generates both visual and code representations of the table."
  },
  {
    question: "What delimiters are supported?",
    answer: "The tool supports four built-in delimiters: Tab (\t), Comma (,), Semicolon (;), and Pipe (|). Additionally, you can select 'Custom' and enter any character or string as a delimiter for less common formats."
  },
  {
    question: "How do I format my input data?",
    answer: "Enter your data with one row per line, and use your chosen delimiter to separate columns. For example, with Tab as delimiter: 'Name\tAge\tCity' on the first line, 'Alice\t30\tNew York' on the second. The tool auto-detects the structure based on your selected delimiter."
  },
  {
    question: "What does 'First row as header' do?",
    answer: "When enabled (default), the first row of your data is treated as column headers. In the HTML output, this becomes a <thead> with <th> elements. In the Markdown output, a separator row (---) is added after the header row. Disable this option if all rows are data rows."
  },
  {
    question: "What does 'Trim whitespace' do?",
    answer: "When enabled (default), leading and trailing whitespace is removed from each cell value. This is useful when your data has inconsistent spacing, such as '  Apple  ,  Banana  ' becoming 'Apple' and 'Banana'. Disable this only if your data relies on leading/trailing spaces."
  },
  {
    question: "Can I copy the generated table code?",
    answer: "Yes. The tool provides two copy buttons — one for the Markdown table and one for the HTML table code. Click the respective button to copy the formatted code to your clipboard. You can then paste it into your Markdown file, HTML document, or CMS."
  },
  {
    question: "What if my rows have different numbers of columns?",
    answer: "The tool automatically normalizes all rows to have the same number of columns by padding shorter rows with empty cells. For example, if one row has 3 columns and another has 5, the first row will be padded with 2 empty cells. This ensures a properly formed table."
  },
  {
    question: "Can I convert CSV data to a table?",
    answer: "Yes. Paste your CSV data and select 'Comma' as the delimiter. If your CSV contains quoted fields with commas inside, note that this tool uses simple splitting and does not handle RFC 4180 CSV parsing. For complex CSV files with quoted fields, use our CSV to JSON tool first."
  },
  {
    question: "How do I paste tab-separated data from Excel?",
    answer: "Copy cells from Excel or Google Sheets, then paste directly into the input textarea. Spreadsheet data copied to the clipboard uses tab characters as column separators and newlines as row separators, which matches the Tab delimiter option perfectly."
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. All conversion operations are performed entirely within your browser using client-side JavaScript. Your data is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, your data is completely gone from memory."
  },
]
