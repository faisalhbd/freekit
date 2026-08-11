import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF metadata?",
    answer:
      "PDF metadata is information embedded in a PDF file that describes the document. This includes the title, author, subject, keywords, the name of the software that created the PDF (creator/producer), and timestamps for creation and modification. This data is stored in the document's information dictionary and can be viewed by anyone who opens the file's properties.",
  },
  {
    question: "Why should I remove PDF metadata?",
    answer:
      "PDF metadata can reveal sensitive information about you: your name, your organization, the software you use, and when the document was created. When sharing PDFs publicly or with third parties, this metadata can compromise your privacy. Removing it ensures the document speaks for itself without exposing who created it or what tools were used.",
  },
  {
    question: "Does removing metadata affect the PDF content?",
    answer:
      "No. The actual content of your PDF — text, images, formatting, pages, links, bookmarks — remains completely unchanged. Only the metadata fields (title, author, subject, keywords, creator, producer, dates) are cleared. The visual appearance and functionality of your document are preserved.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "No. The PDF is loaded and processed entirely in your browser using the pdf-lib library. The file never leaves your device. The cleaned PDF is generated locally and downloaded directly to your computer.",
  },
  {
    question: "What metadata fields are removed?",
    answer:
      "The tool removes: Title, Author, Subject, Keywords, Creator (the application that originally created the PDF), Producer (the application that last saved it), Creation Date, and Modification Date. All fields are set to empty or undefined, producing a clean, anonymous document.",
  },
  {
    question: "Does this remove annotations or comments?",
    answer:
      "No, this tool only removes document-level metadata. Annotations, comments, form data, and other embedded content are not affected. If you need to remove annotations, you would need a more advanced PDF editor. This tool focuses specifically on the metadata information dictionary.",
  },
  {
    question: "Can metadata be recovered after removal?",
    answer:
      "Once the PDF is saved with cleared metadata, the old metadata is gone. The pdf-lib library rewrites the document structure, and the original metadata is not retained. However, if you still have the original file, the metadata obviously still exists there. Make sure to use and share only the cleaned version.",
  },
  {
    question: "Will the file size change after removing metadata?",
    answer:
      "The file size typically changes slightly — usually a small decrease since the metadata text is removed. In rare cases, the re-serialization process may add or remove a few bytes of structural overhead. The change is generally minimal (a few KB at most).",
  },
  {
    question: "Does this work with password-protected PDFs?",
    answer:
      "The tool can read PDFs that require a password to open only if you provide the password. However, this tool does not currently have a password input for decryption. If your PDF is password-protected, you would need to remove the password first using another tool before stripping metadata.",
  },
  {
    question: "What is the difference between this and an EXIF remover?",
    answer:
      "An EXIF remover strips metadata from image files (JPEG, PNG, TIFF, etc.), while this tool specifically targets PDF document metadata. The metadata formats and fields are completely different. For images, use our <a href=\"/tools/privacy/exif-metadata-remover\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">EXIF Metadata Remover</a>.",
  },
]
