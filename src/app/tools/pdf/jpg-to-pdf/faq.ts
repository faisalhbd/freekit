import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is JPG to PDF conversion?",
    answer:
      "JPG to PDF conversion is the process of transforming JPEG image files into a Portable Document Format (PDF) file. Each image is embedded into its own page within the PDF, creating a document that is easy to share, print, and archive. This is commonly used for turning photos, scans, or graphics into a single professional document.",
  },
  {
    question: "How does this JPG to PDF converter work?",
    answer:
      "Our converter runs entirely in your browser using the pdf-lib library. You upload your images, adjust settings like page size, orientation, and margins, then click convert. Each image is loaded into an HTML canvas to read its dimensions, then embedded directly into a new PDF page. The entire process happens client-side with no server uploads.",
  },
  {
    question: "Is my data private when converting images?",
    answer:
      "Absolutely. All image processing happens locally in your browser. Your files are never uploaded to any server, never stored, and never shared with third parties. Once you close the browser tab, all traces of your uploaded images are completely gone. This makes our tool safe for converting sensitive photos, scanned documents, and personal files.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Our tool supports JPG/JPEG images natively, as well as PNG and WebP formats. PNG images are embedded directly using pdf-lib's PNG embedding. WebP images are first converted to PNG format via an HTML canvas before being embedded. This means you can convert virtually any common web image format into a PDF.",
  },
  {
    question: "Can I change the page orientation?",
    answer:
      "Yes, you can choose between Portrait (tall, like a standard document) and Landscape (wide) orientations. The orientation setting applies to all pages in the generated PDF. If you select 'Fit to image' as the page size, the orientation is automatically determined by each image's dimensions for the best fit.",
  },
  {
    question: "Does converting affect image quality?",
    answer:
      "No, the conversion preserves the original image quality. Images are embedded directly into the PDF without any recompression or resizing by default. When using 'Center with original size' fit mode, your images are placed on the page at their full native resolution. Even with 'Fit to page' mode, the image is scaled to fit while maintaining its aspect ratio.",
  },
  {
    question: "What page size options are available?",
    answer:
      "You can choose from A4 (210 × 297 mm), Letter (8.5 × 11 inches), Legal (8.5 × 14 inches), or 'Fit to image'. The 'Fit to image' option automatically sets each page's dimensions to match the uploaded image's actual size, so no white borders are added around the image. This is ideal for preserving the exact layout of photos and scans.",
  },
  {
    question: "Can I reorder images before converting?",
    answer:
      "Yes, you have full control over the image order. Use the move up and move down arrow buttons to rearrange images in the list. Images will be placed into PDF pages in the exact order they appear in the list, so the first image becomes page one, the second becomes page two, and so on.",
  },
  {
    question: "Can I use this tool on my mobile phone?",
    answer:
      "Yes, our JPG to PDF converter is fully responsive and works on all modern mobile browsers including Safari on iOS and Chrome on Android. You can upload images from your phone's gallery or camera roll, adjust settings with touch-friendly controls, and download the converted PDF directly to your device.",
  },
  {
    question: "Is this JPG to PDF converter free to use?",
    answer:
      "Yes, this tool is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many images you can convert or how often you can use the tool. No sign-up or account creation is required, and there are no watermarks added to your converted PDFs.",
  },
  {
    question: "How many images can I convert at once?",
    answer:
      "There is no hard limit on the number of images you can convert. You can add as many JPG, PNG, or WebP files as you need. For very large batches of images, processing time will depend on your device's capabilities, but the tool handles multi-image conversion efficiently in the browser.",
  },
  {
    question: "What happens to my images after conversion?",
    answer:
      "Nothing is stored after you complete the conversion. Your uploaded images and the generated PDF exist only in your browser's memory during the session. Once you download the PDF and close the tab, all data is automatically cleared. We do not keep copies, create backups, or retain any information about your files.",
  },
]
