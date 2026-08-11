import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is Scan to PDF?",
    answer:
      "Scan to PDF is the process of capturing document images — either with your device's camera or by uploading existing scanned photos — and converting them into a single, organized PDF document. It's the digital equivalent of a physical scanner, letting you digitize paper records directly from your browser without needing any hardware or software installation.",
  },
  {
    question: "How does this Scan to PDF tool work?",
    answer:
      "Our tool offers two modes. In Camera mode, it accesses your device's webcam or rear-facing camera via the browser, displays a live preview, and lets you capture snapshots with one click. In Upload mode, you can drag and drop or browse for existing scanned images (JPG, PNG, WebP). All captured or uploaded images are displayed as thumbnails that you can reorder, and then the tool combines them into a PDF using the pdf-lib library entirely in your browser.",
  },
  {
    question: "Is my data private when scanning documents?",
    answer:
      "Absolutely. All processing happens locally in your browser — your camera feed is only used to capture frames, and no images are ever uploaded to any server. The captured snapshots and generated PDF exist only in your browser's memory during the session. Once you download the PDF and close the tab, all data is automatically cleared. This makes our tool safe for scanning sensitive documents like IDs, contracts, and medical records.",
  },
  {
    question: "What camera or device do I need?",
    answer:
      "You need a device with a built-in camera — this includes laptops with webcams, smartphones (front or rear camera), tablets, and desktop computers with connected cameras. The tool requests camera access through your browser and prefers the rear-facing camera on mobile devices (ideal for pointing at documents). If your device doesn't have a camera, you can use the Upload mode instead to add existing scanned images.",
  },
  {
    question: "Can I scan multiple pages into one PDF?",
    answer:
      "Yes, you can capture or upload as many images as you need and combine them into a single multi-page PDF. Each image becomes one page in the document. You can reorder the pages using the move up/down buttons before generating the PDF, ensuring your document is in the correct reading order.",
  },
  {
    question: "Does image quality matter when scanning?",
    answer:
      "Yes, image quality directly affects the readability of the resulting PDF. For best results, ensure good lighting when capturing with your camera, hold your device steady to avoid blur, and position the document flat. Higher resolution camera sensors produce sharper scans. If you're uploading existing scans, use images captured at 300 DPI or higher for clear text readability.",
  },
  {
    question: "Can I use this tool on my mobile phone?",
    answer:
      "Yes, our Scan to PDF tool is fully responsive and optimized for mobile browsers. On mobile devices, the tool will request access to your rear-facing camera (perfect for scanning documents) and display a touch-friendly interface. You can capture multiple pages, reorder them, and download the final PDF — all from your phone or tablet.",
  },
  {
    question: "Is this Scan to PDF tool free to use?",
    answer:
      "Yes, this tool is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many pages you can scan or how often you can use the tool. No sign-up or account creation is required, and there are no watermarks added to your generated PDFs.",
  },
  {
    question: "What file formats are supported for upload?",
    answer:
      "The Upload mode accepts JPG/JPEG, PNG, and WebP image formats. JPG is the most common format for scanned documents and photographs. PNG supports transparency and is lossless. WebP images are automatically converted to PNG before being embedded in the PDF, ensuring full compatibility.",
  },
  {
    question: "Can I change the page size and orientation?",
    answer:
      "Yes, you can choose from A4, Letter, or 'Fit to Image' page sizes. For A4 and Letter, you can also select Portrait or Landscape orientation. The 'Fit to Image' option automatically sizes each PDF page to match the captured or uploaded image's exact dimensions, eliminating any white borders.",
  },
  {
    question: "What if my browser doesn't support camera access?",
    answer:
      "If your browser doesn't support camera access or you deny permission, you'll see an error message explaining the issue. In that case, simply switch to the Upload tab to add existing scanned images from your device. The Upload mode works in all modern browsers and doesn't require any camera permissions.",
  },
  {
    question: "Can I reorder pages after scanning?",
    answer:
      "Yes, after capturing or uploading images, each one appears as a thumbnail in a list. You can use the move up and move down arrow buttons to rearrange the pages into the correct order before generating the PDF. You can also remove individual pages with the delete button if a scan didn't turn out well.",
  },
]
