import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF splitting?",
    answer:
      "PDF splitting is the process of breaking a single PDF document into multiple smaller PDF files. You can split by page ranges, extract individual pages, or divide the document into equal chunks. This is useful when you only need specific sections of a large document, want to separate chapters from a book, or need to share individual pages from a multi-page report.",
  },
  {
    question: "How does this PDF splitter work?",
    answer:
      "Our PDF splitter runs entirely in your browser using the pdf-lib library. You upload a PDF file, choose a split mode — by page ranges (e.g., 1-3, 5, 7-10), by every N pages, or extract a single page — and click Split. The tool parses your PDF, creates new PDF documents containing only the selected pages, and generates download links for each resulting file. No data is sent to any server.",
  },
  {
    question: "Is my data private when splitting PDFs?",
    answer:
      "Absolutely. All PDF processing happens locally in your browser. Your file is never uploaded to any server, never stored, and never shared with third parties. Once you close the browser tab, all traces of your uploaded file and split results are completely gone. This makes our tool safe for splitting confidential documents like contracts, financial records, and personal files.",
  },
  {
    question: "What split modes are available?",
    answer:
      "We offer three split modes: (1) By Page Range — enter a range string like '1-3, 5, 7-10' to extract specific pages into one PDF. (2) By Every N Pages — enter a number like 5 to split the document into chunks of 5 pages each, producing multiple files. (3) Extract Single Page — select a specific page number to create a one-page PDF from that page.",
  },
  {
    question: "Can I use this tool on my mobile phone?",
    answer:
      "Yes, our PDF splitter is fully responsive and works on all modern mobile browsers including Safari on iOS and Chrome on Android. You can upload a PDF from your phone's storage, choose your split options, and download the resulting files directly to your device. The interface adapts to smaller screens for easy touch interaction.",
  },
  {
    question: "Is there a file size or page count limit?",
    answer:
      "Since all processing happens in your browser, the practical limit depends on your device's available memory. Most modern computers and smartphones can comfortably handle PDFs with hundreds of pages. There are no artificial file size restrictions imposed by our tool, so you can split as large a document as your device allows.",
  },
  {
    question: "Is this PDF splitter free to use?",
    answer:
      "Yes, this PDF splitter is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many files you can split or how often you can use the tool. No sign-up or account creation is required, and there are no watermarks added to your split documents.",
  },
  {
    question: "Does splitting affect the quality of my PDF?",
    answer:
      "No, splitting does not affect the quality of your PDF in any way. The tool copies pages from the original file without recompressing or converting them. All text remains sharp, images retain their original resolution, fonts are preserved exactly as they were, and any form fields or hyperlinks on those pages stay intact.",
  },
  {
    question: "How do I specify page ranges?",
    answer:
      "Page ranges use a simple comma-separated format. Use a hyphen for continuous ranges (e.g., '1-5' for pages 1 through 5), commas for separate pages (e.g., '3, 7, 12'), or combine them (e.g., '1-3, 5, 7-10'). Spaces are ignored during parsing, so '1-3, 5, 7-10' and '1-3,5,7-10' both work the same way.",
  },
  {
    question: "Can I split a password-protected PDF?",
    answer:
      "The tool can process most standard PDF files. However, PDFs that are encrypted with password protection or have restrictive permissions may not be processable directly in the browser. If you encounter issues with protected files, you would need to remove the protection first using a dedicated PDF unlock tool before splitting.",
  },
  {
    question: "What happens to my file after splitting?",
    answer:
      "Nothing is stored after you complete the split. Your uploaded file and the split results exist only in your browser's memory during the session. Once you download the files and close the tab, all data is automatically cleared. We do not keep copies, create backups, or retain any information about your documents.",
  },
  {
    question: "Can I re-merge split pages later?",
    answer:
      "Yes, absolutely. Each split result is a standard PDF file that you can use independently. If you need to combine some of the split files back together, you can use our PDF Merger tool to rejoin them in any order you like.",
  },
]
