import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the QR code scanner work?",
    answer:
      "The scanner uses the browser's built-in BarcodeDetector API, which is available in Chrome and Edge. When you upload an image, it is drawn onto a hidden canvas, and the BarcodeDetector scans for QR codes. The decoded content is then displayed. No external libraries or server-side processing is involved.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "The BarcodeDetector API is currently supported in Chromium-based browsers: Google Chrome (version 83+), Microsoft Edge (version 83+), and Opera (version 69+). Firefox and Safari do not yet support this API natively. If you are using Firefox or Safari, the tool will show a message suggesting you try Chrome or Edge.",
  },
  {
    question: "Can I scan QR codes from my camera?",
    answer:
      "Not currently. This tool scans QR codes from uploaded images (screenshots, photos). If you need to scan a QR code from your camera, use your phone's built-in camera app or a dedicated QR scanner app. You can take a screenshot of the QR code first and then upload it here.",
  },
  {
    question: "What types of QR codes can it decode?",
    answer:
      "The tool can decode any standard QR code, regardless of content type. This includes URLs, plain text, Wi-Fi credentials, contact information (vCards), calendar events, and any other data encoded in a QR code. The decoded content is displayed as-is.",
  },
  {
    question: "Is the image uploaded to a server?",
    answer:
      "No. The image is loaded into your browser's memory and processed locally. It is never transmitted to any server. The image data is released from memory once you close the tab or upload a new image.",
  },
  {
    question: "What if the QR code is not detected?",
    answer:
      "Make sure the QR code is clearly visible, not blurry, and well-lit. The QR code should occupy a reasonable portion of the image. If the image is too small or the QR code is at an extreme angle, detection may fail. Try cropping the image to focus on the QR code, or take a clearer photo.",
  },
  {
    question: "Can it scan multiple QR codes in one image?",
    answer:
      "Yes! If the image contains multiple QR codes, the BarcodeDetector API can detect all of them. Each decoded result is listed separately, so you can see all the QR code contents in the image.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Any image format that your browser can display works: JPEG, PNG, WebP, GIF, BMP, and SVG (rasterized). The tool accepts the same formats as the HTML &lt;img&gt; element.",
  },
  {
    question: "Is there a size limit for the uploaded image?",
    answer:
      "Since the image is drawn onto a canvas for processing, very large images (over 20 megapixels) may cause performance issues. For best results, use images that are reasonably sized. Screenshots and phone photos work perfectly.",
  },
  {
    question: "How is this different from a QR code generator?",
    answer:
      "A QR code <em>generator</em> creates QR codes from text or URLs. This scanner does the opposite — it reads existing QR codes from images and extracts the encoded content. Use our <a href=\"/tools/privacy/qr-code-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">QR Code Generator</a> to create QR codes.",
  },
]
