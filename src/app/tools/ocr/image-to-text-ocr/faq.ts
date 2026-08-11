import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is OCR and how does it work?",
    answer:
      "OCR (Optical Character Recognition) is a technology that converts different types of images — such as scanned documents, photos, or screenshots — into editable and searchable text. It works by analyzing the patterns of light and dark in an image to identify individual characters and words, then reconstructs the text digitally.",
  },
  {
    question: "Is my image data sent to any server?",
    answer:
      "No. All OCR processing happens directly in your browser using Tesseract.js. Your images never leave your device, ensuring complete privacy and data security. No data is uploaded to any external server.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "The tool supports all common image formats including JPG/JPEG, PNG, WebP, BMP, and GIF. Simply drag and drop or click to upload any image file containing text.",
  },
  {
    question: "How accurate is the text extraction?",
    answer:
      "Accuracy depends on image quality. High-resolution images with clear, printed text typically achieve 95-99% accuracy. Low-resolution images, handwritten text, or images with complex backgrounds may have lower accuracy. The tool displays a confidence score so you can gauge the reliability of the results.",
  },
  {
    question: "Can I extract text from scanned documents?",
    answer:
      "Yes, scanned documents are one of the primary use cases for OCR. For best results, ensure the scan is at least 300 DPI, properly aligned, and has good contrast between the text and background. You can also crop the image first using our Image Cropper tool for better results.",
  },
  {
    question: "What languages are supported?",
    answer:
      "The tool supports multiple languages including English, Bengali, Spanish, French, German, Chinese (Simplified), Japanese, Arabic, and Hindi. Select your desired language from the dropdown before extracting text for best accuracy.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, Image to Text OCR is completely free to use with no limits on the number of images you can process. There are no sign-ups, no watermarks, and no hidden fees.",
  },
  {
    question: "Can I extract text from handwritten content?",
    answer:
      "While OCR works best with printed text, it can also recognize some handwritten content depending on clarity and style. For dedicated handwriting recognition, try our Handwriting to Text tool which is specifically optimized for handwritten notes.",
  },
  {
    question: "How long does the OCR process take?",
    answer:
      "Processing time depends on the image size, resolution, and the selected language. Most images are processed within a few seconds. Larger or more complex images may take 10-30 seconds. A progress bar shows the current status in real time.",
  },
  {
    question: "Can I download the extracted text?",
    answer:
      "Yes, after text extraction you can copy the text to your clipboard with one click, or download it as a plain text (.txt) file. Both options are available immediately after the OCR process completes.",
  },
  {
    question: "Does the tool work on mobile devices?",
    answer:
      "Yes, the tool is fully responsive and works on smartphones and tablets. You can upload images from your photo library or take a new photo directly. The interface adapts to all screen sizes for a comfortable experience.",
  },
  {
    question: "What is the confidence score shown after extraction?",
    answer:
      "The confidence score (shown as a percentage) indicates how certain the OCR engine is about the accuracy of the extracted text. A score above 90% generally means the text was recognized reliably. Lower scores may indicate areas where manual review is needed.",
  },
]
