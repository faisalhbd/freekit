import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is Screenshot to Text?",
    answer:
      "Screenshot to Text is an OCR tool specifically optimized for extracting text from screen captures. Whether it is a screenshot from your phone, desktop, or tablet, the tool converts the visual text into editable, copyable text instantly in your browser.",
  },
  {
    question: "How do I paste a screenshot from my clipboard?",
    answer:
      "Simply press Ctrl+V (or Cmd+V on Mac) anywhere on the page while the tool is open. The tool automatically detects image content from your clipboard and loads it for text extraction. You can also click the 'Paste from Clipboard' button if you prefer.",
  },
  {
    question: "Can I extract text from app screenshots?",
    answer:
      "Yes, the tool works with screenshots from any application — messaging apps, social media, email clients, code editors, design tools, and more. Any visible text in the screenshot can be recognized and extracted.",
  },
  {
    question: "What screenshot formats are supported?",
    answer:
      "The tool accepts screenshots in all common image formats including PNG (the default screenshot format on most devices), JPG, WebP, BMP, and GIF. You can also paste directly from your clipboard regardless of format.",
  },
  {
    question: "Is my screenshot data secure?",
    answer:
      "Absolutely. All processing happens locally in your browser using Tesseract.js. Your screenshots are never uploaded to any server. The image data stays entirely on your device throughout the entire process.",
  },
  {
    question: "Can I extract text from presentation slides?",
    answer:
      "Yes, screenshots of presentation slides (PowerPoint, Google Slides, Keynote) work well with this tool. For best results, take full-screen screenshots of slides and ensure the text is clearly visible and not overlapping with other elements.",
  },
  {
    question: "Does it work with mobile screenshots?",
    answer:
      "Yes, the tool handles screenshots from both iOS and Android devices perfectly. Mobile screenshots are typically high-resolution PNG files, which produce excellent OCR results. Simply upload the screenshot or paste it from your clipboard.",
  },
  {
    question: "How accurate is the text extraction from screenshots?",
    answer:
      "Screenshots typically produce very high accuracy (95-99%) because they contain crisp, pixel-perfect text without the distortions common in photos. The tool displays a confidence score so you can verify the quality of each extraction.",
  },
  {
    question: "Can I extract text from multiple screenshots at once?",
    answer:
      "Currently the tool processes one screenshot at a time. However, you can quickly reset and process another screenshot using the paste-from-clipboard shortcut (Ctrl+V) for a fast multi-screenshot workflow.",
  },
  {
    question: "What languages can I extract from screenshots?",
    answer:
      "The tool supports English, Bengali, Spanish, French, German, Chinese (Simplified), Japanese, Arabic, and Hindi. Select the appropriate language from the dropdown before extracting for the best accuracy.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, Screenshot to Text is completely free with no usage limits, no sign-ups, and no watermarks. You can extract text from as many screenshots as you need.",
  },
  {
    question: "Can I zoom into the screenshot preview?",
    answer:
      "Yes, the tool provides a zoomed-in preview of your screenshot so you can verify the image quality before extraction. This helps ensure the text regions are clear and properly focused for accurate OCR results.",
  },
]
