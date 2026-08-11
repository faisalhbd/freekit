import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I view a CSV file in this tool?",
    answer: "Simply paste your CSV data into the textarea or upload a .csv file using the file upload button. The data is instantly rendered as an interactive HTML table. You can also click 'Load Sample' to try the tool with example data."
  },
  {
    question: "Can I filter CSV data across all columns?",
    answer: "Yes. The search input at the top filters rows across every column simultaneously. As you type, the table updates in real-time to show only matching rows. The filter is case-insensitive and matches partial text in any column."
  },
  {
    question: "How does column sorting work?",
    answer: "Click any column header to sort the table by that column in ascending order. Click the same header again to switch to descending order. A third click removes the sort. An arrow indicator shows the current sort direction."
  },
  {
    question: "What delimiters does the CSV viewer support?",
    answer: "The tool automatically detects commas, semicolons, tabs, and pipes as delimiters. It analyzes the first few lines of your data to determine the most likely delimiter. You can also manually select a delimiter if auto-detection picks the wrong one."
  },
  {
    question: "Can I export the filtered and sorted data?",
    answer: "Yes. Click the 'Export Filtered CSV' button to download only the rows that match your current search filter, in the sorted order. The exported file preserves the original delimiter and includes headers."
  },
  {
    question: "Does the CSV viewer handle large files?",
    answer: "The viewer runs entirely in your browser, so performance depends on your device. It comfortably handles thousands of rows. For extremely large datasets with millions of rows, a dedicated desktop application may be more suitable."
  },
  {
    question: "Is my CSV data secure?",
    answer: "Absolutely. All processing happens client-side in your browser. Your CSV data is never uploaded to any server, stored, or tracked. You can safely view sensitive data including personal information or financial records."
  },
  {
    question: "Does it handle quoted fields with commas inside?",
    answer: "Yes, the parser is RFC 4180 compliant. It correctly handles fields enclosed in double quotes, including fields that contain commas, newlines, or escaped quotes (doubled quotes like '')."
  },
  {
    question: "Can I upload a CSV file directly?",
    answer: "Yes. Click the 'Upload File' button or drag and drop a .csv file onto the textarea. The file is read locally in your browser and never sent to a server. The content populates the textarea and the table updates instantly."
  },
  {
    question: "What is the difference between total rows and filtered rows?",
    answer: "Total rows is the count of all rows in your CSV data. Filtered rows shows how many rows currently match your search query. The stats bar displays both counts so you can see how your filter affects the data."
  },
]
