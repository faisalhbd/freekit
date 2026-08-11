import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF rotation?",
    answer:
      "PDF rotation is the process of changing the orientation of one or more pages in a PDF document. Pages can be rotated clockwise or counter-clockwise by 90°, 180°, or 270°. This is commonly needed when scanned documents are saved in the wrong orientation, when pages from different sources have mixed orientations, or when you need to prepare a document for a specific printing layout.",
  },
  {
    question: "How does this PDF rotator work?",
    answer:
      "Our PDF rotator runs entirely in your browser using the pdf-lib library. You upload a PDF file, select which pages to rotate (or choose to rotate all pages), pick a rotation angle, and click Rotate. The tool loads your PDF, applies the rotation metadata to the selected pages, saves the modified document, and generates a download link. No data is sent to any server.",
  },
  {
    question: "Is my data private when rotating PDFs?",
    answer:
      "Absolutely. All PDF processing happens locally in your browser. Your file is never uploaded to any server, never stored, and never shared with third parties. Once you close the browser tab, all traces of your uploaded file and rotated results are completely gone. This makes our tool safe for rotating confidential documents like contracts, medical records, and personal files.",
  },
  {
    question: "What rotation angles are supported?",
    answer:
      "The tool supports three rotation options: 90° Clockwise rotates each page a quarter turn to the right, 90° Counter-Clockwise rotates each page a quarter turn to the left, and 180° flips each page upside down. You can apply these angles to all pages at once or to only the specific pages you select.",
  },
  {
    question: "Can I rotate only specific pages instead of all pages?",
    answer:
      "Yes, you have full control over which pages are rotated. After uploading your PDF, you will see a grid of numbered page cards. Click on individual pages to select or deselect them. You can then choose 'Rotate Selected Pages' to apply the rotation only to the pages you have highlighted, or 'Rotate All Pages' to rotate every page in the document.",
  },
  {
    question: "Can I use this tool on my mobile phone?",
    answer:
      "Yes, our PDF rotator is fully responsive and works on all modern mobile browsers including Safari on iOS and Chrome on Android. You can upload a PDF from your phone's storage, tap pages to select them, choose your rotation angle, and download the rotated file directly to your device. The interface adapts to smaller screens for easy touch interaction.",
  },
  {
    question: "Is this PDF rotator free to use?",
    answer:
      "Yes, this PDF rotator is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many files you can rotate or how often you can use the tool. No sign-up or account creation is required, and there are no watermarks added to your rotated documents.",
  },
  {
    question: "Does rotating affect the quality of my PDF?",
    answer:
      "No, rotating does not affect the quality of your PDF in any way. The tool only modifies the rotation metadata of the selected pages without recompressing, converting, or rasterizing the content. All text remains sharp, images retain their original resolution, fonts are preserved exactly as they were, and any form fields or hyperlinks stay intact.",
  },
  {
    question: "Is there a file size or page count limit?",
    answer:
      "Since all processing happens in your browser, the practical limit depends on your device's available memory. Most modern computers and smartphones can comfortably handle PDFs with hundreds of pages. There are no artificial file size restrictions imposed by our tool, so you can rotate as large a document as your device allows.",
  },
  {
    question: "Can I rotate a password-protected PDF?",
    answer:
      "The tool can process most standard PDF files. However, PDFs that are encrypted with password protection or have restrictive permissions may not be processable directly in the browser. If you encounter issues with protected files, you would need to remove the protection first using a dedicated PDF unlock tool before rotating.",
  },
  {
    question: "What happens to my file after rotating?",
    answer:
      "Nothing is stored after you complete the rotation. Your uploaded file and the rotated result exist only in your browser's memory during the session. Once you download the file and close the tab, all data is automatically cleared. We do not keep copies, create backups, or retain any information about your documents.",
  },
  {
    question: "Can I undo a rotation if I make a mistake?",
    answer:
      "Yes, you can easily undo a rotation. If you rotated by 90° clockwise and want to revert, simply upload the rotated file again and apply a 90° counter-clockwise rotation. Alternatively, you can click 'Start Over' to reload your original file and try again with different settings. We recommend keeping your original PDF as a backup.",
  },
]
