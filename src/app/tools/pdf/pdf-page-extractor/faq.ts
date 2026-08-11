import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF page extraction?",
    answer:
      "PDF page extraction is the process of selecting specific pages from an existing PDF document and creating a new PDF that contains only those chosen pages. Unlike splitting — which divides a document into multiple pieces — extraction lets you hand-pick individual pages or page ranges and combine them into a single output file. This is ideal when you need only certain sections of a large report, contract, or manual.",
  },
  {
    question: "How does this PDF page extractor work?",
    answer:
      "Our tool runs entirely in your browser using the pdf-lib library. You upload a PDF file, then select pages by clicking on numbered page cards, using the quick range input (e.g., '1-5, 8, 10-12'), or using Select All / Deselect All buttons. Once you have your selection, click Extract Pages and the tool creates a new PDF containing only the selected pages. No data is sent to any server.",
  },
  {
    question: "Is my data private when extracting pages?",
    answer:
      "Absolutely. All PDF processing happens locally in your browser. Your file is never uploaded to any server, never stored, and never shared with third parties. Once you close the browser tab, all traces of your uploaded file and extracted results are completely gone. This makes our tool safe for processing confidential documents like contracts, medical records, and financial statements.",
  },
  {
    question: "How do I specify page ranges in the quick input?",
    answer:
      "The quick range input uses a simple, flexible format. Use a hyphen for continuous ranges (e.g., '1-5' for pages 1 through 5), commas for separate individual pages (e.g., '3, 7, 12'), or combine both (e.g., '1-3, 5, 7-10'). Spaces are ignored during parsing, so '1-3, 5, 7-10' and '1-3,5,7-10' both work the same way. Invalid page numbers are automatically skipped.",
  },
  {
    question: "Can I extract a single page from a PDF?",
    answer:
      "Yes, you can extract a single page in several ways. Simply click on the page card for the page you want in the visual grid, type the page number (e.g., '5') in the quick range input, or use the visual selection to pick just one page. The tool will create a new PDF containing only that single page. This is great for pulling out a specific invoice or receipt from a multi-page document.",
  },
  {
    question: "Can I extract multiple non-consecutive pages?",
    answer:
      "Yes, that is exactly what this tool excels at. You can select any combination of pages — for example, pages 1, 3, 7, and 12 — and extract them all into a single new PDF. Use the page card grid to click individual pages, or type something like '1, 3, 7, 12' in the quick range input. The extracted pages will appear in numerical order in the output file.",
  },
  {
    question: "Can I use this tool on my mobile phone?",
    answer:
      "Yes, our PDF page extractor is fully responsive and works on all modern mobile browsers including Safari on iOS and Chrome on Android. You can upload a PDF from your phone's storage, tap to select pages from the visual grid, and download the extracted PDF directly to your device. The interface adapts to smaller screens for easy touch interaction.",
  },
  {
    question: "Is this PDF page extractor free to use?",
    answer:
      "Yes, this tool is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many files you can process, how many pages you can extract, or how often you can use the tool. No sign-up or account creation is required, and there are no watermarks added to your extracted documents.",
  },
  {
    question: "Does extraction affect the quality of my PDF pages?",
    answer:
      "No, extraction does not affect the quality of your PDF in any way. The tool copies pages from the original file without recompressing or converting them. All text remains sharp, images retain their original resolution, fonts are preserved exactly as they were, and any form fields or hyperlinks on those pages stay intact. The output is pixel-perfect.",
  },
  {
    question: "What is the file size or page count limit?",
    answer:
      "Since all processing happens in your browser, the practical limit depends on your device's available memory. Most modern computers and smartphones can comfortably handle PDFs with hundreds of pages. There are no artificial file size restrictions imposed by our tool, so you can extract pages from as large a document as your device allows.",
  },
  {
    question: "Can I extract pages from a password-protected PDF?",
    answer:
      "The tool can process most standard PDF files. However, PDFs that are encrypted with password protection or have restrictive permissions may not be processable directly in the browser. If you encounter issues with protected files, you would need to remove the protection first using a dedicated PDF unlock tool before extracting pages.",
  },
  {
    question: "What happens to my file after extraction?",
    answer:
      "Nothing is stored after you complete the extraction. Your uploaded file and the extracted result exist only in your browser's memory during the session. Once you download the file and close the tab, all data is automatically cleared. We do not keep copies, create backups, or retain any information about your documents.",
  },
]
