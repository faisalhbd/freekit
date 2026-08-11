import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF to Markdown conversion?",
    answer:
      "PDF to Markdown conversion is the process of extracting text content from a PDF document and structuring it using Markdown syntax. This includes converting detected headings into Markdown heading markers (# for H1, ## for H2), list items into bullet points (-), and paragraphs into plain text blocks separated by blank lines. The result is a clean, editable .md file you can use in any Markdown-compatible application.",
  },
  {
    question: "How does this PDF to Markdown tool work?",
    answer:
      "Our tool uses the pdfjs-dist library to parse your PDF file entirely in the browser. It reads each page's text content along with font size and positioning metadata. Large font sizes are detected as headings (converted to # or ##), smaller fonts as body text, and text items starting with bullet characters are converted to Markdown list items. The result is a well-structured Markdown document you can copy or download.",
  },
  {
    question: "Is my PDF data kept private?",
    answer:
      "Yes, absolutely. All processing happens locally in your web browser using JavaScript. Your PDF file is never uploaded to any server. Once you close the tab, all traces of your file and the extracted Markdown are completely gone from memory. This makes the tool safe for confidential documents like contracts, financial reports, and proprietary research papers.",
  },
  {
    question: "How accurate is the Markdown conversion?",
    answer:
      "The accuracy depends on the PDF's structure. Text-based PDFs with clear heading hierarchies produce the best results — headings, paragraphs, and lists are detected reliably. Complex layouts with multiple columns, embedded tables, or decorative elements may require some manual cleanup. The tool provides a strong foundation that saves significant manual formatting effort compared to starting from scratch.",
  },
  {
    question: "Can I convert scanned PDFs to Markdown?",
    answer:
      "This tool works with text-based PDFs where the text characters are embedded in the document. Scanned PDFs that are essentially images of pages will not produce meaningful Markdown output. For scanned documents, you would need an OCR tool first. Try our Image to Text OCR tool to convert scanned images into editable text, then use our Text to Markdown converter to structure the result.",
  },
  {
    question: "What heading levels does the tool detect?",
    answer:
      "The tool uses font size analysis to detect headings. Text with the largest font size on a page is converted to H1 (#), medium-sized text becomes H2 (##), and standard body text remains as regular paragraphs. The detection is relative to each page's content, so headings are identified proportionally based on the range of font sizes present in the document.",
  },
  {
    question: "Can I download the result as a Markdown file?",
    answer:
      "Yes. After conversion, you can click the Download .md button to save the extracted Markdown as a file with the .md extension. The file name is based on your original PDF name. You can also copy the Markdown content to your clipboard and paste it directly into any Markdown editor, CMS platform, or note-taking app like Obsidian, Notion, or GitHub.",
  },
  {
    question: "Is there a file size or page limit?",
    answer:
      "There are no artificial limits imposed by our tool. Since all processing happens in your browser, the practical limit depends on your device's available memory. Most modern computers can handle PDFs with hundreds of pages. For very large documents, the extraction may take a bit longer, but the progress bar keeps you informed of the status.",
  },
  {
    question: "Does the tool preserve formatting like bold and italic?",
    answer:
      "The tool focuses on structural formatting — headings, paragraphs, and lists. Bold and italic text formatting from the original PDF is not always reliably preserved because PDF text extraction provides limited style information. However, the structural Markdown output makes it easy to manually add bold (**text**) or italic (*text*) markers where needed in your Markdown editor.",
  },
  {
    question: "Can I use this tool on my phone?",
    answer:
      "Yes. The tool is fully responsive and works on all modern mobile browsers. You can upload a PDF from your phone's file system, convert it to Markdown, and download the .md file or copy the content to your clipboard. The interface adapts to smaller screens for comfortable touch interaction.",
  },
]
