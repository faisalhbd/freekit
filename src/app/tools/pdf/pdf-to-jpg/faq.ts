import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is PDF to JPG conversion?",
    answer:
      "PDF to JPG conversion is the process of transforming individual pages of a PDF document into separate JPEG image files. Each page of the PDF becomes its own standalone image that can be viewed, shared, and edited without needing a PDF reader. This is useful when you need to embed PDF content in presentations, upload pages to websites, or share specific pages as images.",
  },
  {
    question: "How does this PDF to JPG converter work?",
    answer:
      "Our converter uses the PDF.js library to parse and render your PDF directly in the browser. Each page is drawn onto an HTML Canvas element at the resolution you select, then exported as a JPEG or PNG image file. The entire process runs client-side — your PDF file is never uploaded to any server, ensuring complete privacy and instant processing.",
  },
  {
    question: "Is my PDF data safe and private?",
    answer:
      "Absolutely. All conversion happens entirely within your web browser using client-side JavaScript. Your PDF file is never transmitted to any server or third-party service. Once you close the browser tab, all traces of your file are gone. You can safely convert sensitive, confidential, or personal documents without any privacy concerns.",
  },
  {
    question: "What DPI and quality settings should I use?",
    answer:
      "The scale factor directly controls the output resolution. A 1x scale produces images at 72 DPI (standard screen resolution), 1.5x gives approximately 108 DPI, 2x yields 144 DPI (good for most uses), and 3x reaches 216 DPI (suitable for printing). For web sharing and email, 1x or 1.5x is usually sufficient. For print-quality images, use 2x or 3x. For JPEG quality, 80-90% offers an excellent balance between file size and visual clarity.",
  },
  {
    question: "Can I select specific pages to convert?",
    answer:
      "Yes, after uploading your PDF, you can choose to convert all pages or select only the specific pages you need. Simply enter the page numbers you want — for example, '1, 3, 5-8' — and only those pages will be converted. This saves time and storage when you only need certain pages from a large document.",
  },
  {
    question: "Can I convert multiple PDF pages at once (batch conversion)?",
    answer:
      "Yes, our tool supports full batch conversion. When you select 'All Pages', every page in your PDF is converted to an image in a single operation. After conversion, you can preview all the generated thumbnails and download them individually or use the 'Download All' button to save every image at once.",
  },
  {
    question: "Does this work on mobile devices?",
    answer:
      "Yes, the tool is fully responsive and works on smartphones and tablets. You can upload a PDF from your mobile browser, adjust settings, convert pages, and download the resulting images directly to your device. The interface adapts to smaller screens for easy touch interaction.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this PDF to JPG converter is completely free with no hidden costs, subscriptions, or premium tiers. There are no limits on the number of PDFs you can convert, the number of pages, or how often you can use the tool. No sign-up or account is required.",
  },
  {
    question: "What is the difference between JPG and PNG output?",
    answer:
      "JPG (JPEG) uses lossy compression, producing smaller file sizes that are ideal for photos and complex images where slight quality loss is acceptable. PNG uses lossless compression, preserving every pixel perfectly but resulting in larger files. Choose JPG for sharing photos and web use, and PNG when you need pixel-perfect quality such as for documents with text, line art, or graphics.",
  },
  {
    question: "Why are my converted images blurry?",
    answer:
      "Blurry output is usually caused by a low scale setting. Try increasing the scale factor to 2x or 3x for sharper results. Also, if the original PDF contains low-resolution embedded images or was created from scanned documents at low DPI, the converted images will reflect that original quality. The converter preserves the best possible quality from your source PDF.",
  },
  {
    question: "Is there a file size or page limit?",
    answer:
      "Because all processing happens in your browser, the practical limits depend on your device's available memory. Most modern browsers can handle PDFs with hundreds of pages. However, converting very large PDFs at 3x scale may consume significant memory. There are no artificial restrictions imposed by our tool.",
  },
  {
    question: "Can I convert password-protected PDFs?",
    answer:
      "The tool can open PDFs that have owner-password restrictions (such as print or copy restrictions) but require no password to view. However, PDFs that are encrypted with a user password and prompt for a password to open cannot be processed — you would need to remove the password protection first using a PDF unlock tool.",
  },
]
