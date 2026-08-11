import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is handwriting OCR and how does it work?",
    answer:
      "Handwriting OCR (Optical Character Recognition) uses machine learning models to analyze the shapes, strokes, and patterns in handwritten text images and convert them into editable digital text. The Tesseract.js engine processes your image directly in the browser, identifying individual characters and words based on trained handwriting data.",
  },
  {
    question: "How accurate is handwriting recognition?",
    answer:
      "Handwriting recognition accuracy depends on several factors: the clarity and legibility of the handwriting, image quality, lighting conditions, and writing style. Neat, consistent handwriting with good contrast typically achieves 70-90% accuracy. Using the image preprocessing options (grayscale, contrast enhancement, and threshold) can significantly improve results.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. All processing happens entirely in your browser using Tesseract.js. Your handwriting images are never uploaded to any server. The image stays on your device at all times, ensuring complete privacy and data security.",
  },
  {
    question: "What image preprocessing options are available?",
    answer:
      "The tool offers three preprocessing options to improve OCR accuracy: Grayscale (converts the image to shades of gray, reducing color distractions), Increase Contrast (enhances the difference between text and background), and Threshold (converts the image to pure black and white, which often yields the best OCR results for handwriting). You can combine these options for optimal results.",
  },
  {
    question: "What tips can improve handwriting OCR accuracy?",
    answer:
      "For best results: (1) Ensure good, even lighting when capturing the image, (2) Use a dark pen on light paper for maximum contrast, (3) Write as neatly and consistently as possible, (4) Capture the image straight-on without angles, (5) Use high-resolution images (at least 300 DPI), (6) Enable the preprocessing options, especially threshold mode, (7) Crop to the text area to reduce noise.",
  },
  {
    question: "What languages are supported for handwriting recognition?",
    answer:
      "The tool supports 9 languages: English, Bengali, Spanish, French, German, Chinese (Simplified), Japanese, Arabic, and Hindi. Select the correct language of the handwritten text before running recognition for the best accuracy, as the OCR engine uses language-specific models.",
  },
  {
    question: "What image formats and tips work best?",
    answer:
      "The tool supports JPG, PNG, WebP, BMP, and GIF formats. For best results: use PNG format to avoid compression artifacts, ensure the image is well-lit and in focus, keep the text area large and clear, and avoid shadows or glare on the paper. A plain white background with dark ink produces the most reliable results.",
  },
  {
    question: "Is this handwriting to text tool free to use?",
    answer:
      "Yes, this tool is completely free with no limits. There are no sign-ups, no watermarks, no usage caps, and no hidden fees. You can convert as many handwritten images as you need.",
  },
  {
    question: "Can I use this for old handwritten documents or letters?",
    answer:
      "Yes, the tool can work with old handwritten documents, letters, and archives. For aged or yellowed paper, enabling the grayscale and contrast preprocessing options can help. Threshold mode is particularly effective for making faded ink more readable by the OCR engine.",
  },
  {
    question: "How long does the handwriting recognition process take?",
    answer:
      "Processing time depends on image size, resolution, and the selected language model. Typical images process in 5-15 seconds. Larger images or complex handwriting may take up to 30 seconds. A progress bar shows the current status in real time.",
  },
  {
    question: "Can I copy or download the recognized text?",
    answer:
      "Yes, after recognition completes you can copy the extracted text to your clipboard with one click, or download it as a plain text (.txt) file. The tool also displays statistics including character count, word count, line count, and a confidence score.",
  },
  {
    question: "Does the tool work on mobile devices?",
    answer:
      "Yes, the tool is fully responsive and works on smartphones and tablets. You can upload images from your photo library or take a new photo directly. This makes it convenient to digitize handwritten notes on the go.",
  },
]
