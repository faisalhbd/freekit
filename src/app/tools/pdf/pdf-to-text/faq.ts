import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF to text extraction?",
    answer:
      "PDF to text extraction is the process of reading a PDF document and pulling out all the readable text content into a plain text format. This allows you to copy, edit, search, and reuse the text from PDFs without manually retyping anything. It works on text-based PDFs where the text is stored as selectable characters rather than images.",
  },
  {
    question: "How does this PDF to text tool work?",
    answer:
      "Our tool runs entirely in your browser using the pdfjs-dist library. When you upload a PDF, the library parses the document structure and reads the text layer from each page. It iterates through every text item, preserves the reading order, and joins them into a complete plain text output. The entire process happens locally — no data is sent to any server.",
  },
  {
    question: "Is my data private when extracting text from PDFs?",
    answer:
      "Absolutely. All PDF processing happens locally in your browser using client-side JavaScript. Your file is never uploaded to any server, never stored, and never shared with third parties. Once you close the browser tab, all traces of your uploaded file and extracted text are completely gone. This makes our tool safe for processing confidential documents like contracts, medical records, and financial reports.",
  },
  {
    question: "How accurate is the extracted text?",
    answer:
      "For text-based PDFs, the extraction is highly accurate. Since the text is stored as actual character data within the PDF, our tool retrieves it exactly as it was saved. However, complex layouts with columns, tables, or unusual text flows may occasionally affect the reading order. The extracted text preserves the content faithfully but may not always match the visual layout perfectly.",
  },
  {
    question: "Can I extract text from scanned PDFs?",
    answer:
      "This tool extracts text from text-based PDFs where the characters are embedded in the document. Scanned PDFs that consist of images of pages rather than actual text characters will not produce meaningful results with this tool. For scanned documents, you would need an OCR (Optical Character Recognition) tool. You can try our Image to Text OCR tool to convert scanned images into editable text.",
  },
  {
    question: "Does the tool handle different character encodings?",
    answer:
      "Yes. The pdfjs-dist library supports standard PDF text encoding including WinAnsiEncoding, PDFDocEncoding, and Unicode (UTF-16). Most modern PDFs use Unicode, which means the tool can correctly extract text in English and many other languages including those with special characters, accented letters, and non-Latin scripts such as Chinese, Japanese, and Korean.",
  },
  {
    question: "Is this PDF to text tool free to use?",
    answer:
      "Yes, this tool is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many files you can process or how often you can use the tool. No sign-up or account creation is required, and there are no watermarks or limitations on the amount of text extracted.",
  },
  {
    question: "Can I extract text page by page?",
    answer:
      "Yes. The tool provides two viewing modes after extraction. The default 'All Pages' mode shows the complete extracted text from every page. The 'Page by Page' mode lets you browse through each page's text individually using tabs, which is useful when you only need text from specific pages.",
  },
  {
    question: "What file formats can I download the extracted text in?",
    answer:
      "The extracted text can be downloaded as a plain text (.txt) file. You can also copy the text directly to your clipboard and paste it into any application like Microsoft Word, Google Docs, email, or a text editor. Plain text is the most universal format and works with virtually any software.",
  },
  {
    question: "Is there a file size or page count limit?",
    answer:
      "Since all processing happens in your browser, the practical limit depends on your device's available memory. Most modern computers and smartphones can comfortably handle PDFs with hundreds of pages. There are no artificial file size restrictions imposed by our tool, so you can extract text from as large a document as your device allows.",
  },
  {
    question: "Can I use this tool on my mobile phone?",
    answer:
      "Yes, our PDF to text extractor is fully responsive and works on all modern mobile browsers including Safari on iOS and Chrome on Android. You can upload a PDF from your phone's storage, extract the text, and copy or download the results directly to your device. The interface adapts to smaller screens for easy touch interaction.",
  },
  {
    question: "What statistics are shown after extraction?",
    answer:
      "After extraction, the tool displays four key statistics: total pages processed, total characters (including spaces), total words (counted by whitespace separation), and total lines in the extracted text. These stats help you quickly understand the size and scope of the extracted content.",
  },
]
