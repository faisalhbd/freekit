import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is image resizing?",
    answer:
      "Image resizing is the process of changing the dimensions (width and height in pixels) of an image. It is different from compression — resizing changes the physical pixel count while compression reduces file size. Resizing is commonly needed for social media profile pictures, website thumbnails, email attachments, and meeting specific platform requirements.",
  },
  {
    question: "Does resizing reduce image quality?",
    answer:
      "Not with our tool. We use high-quality canvas rendering with anti-aliasing to ensure your resized images look sharp and crisp. Unlike many other tools, we never apply additional compression unless you explicitly choose to set a target file size. When resizing by dimensions only, your output maintains the maximum possible quality.",
  },
  {
    question: "How does target file size resizing work?",
    answer:
      "Our target file size feature uses an intelligent algorithm that iteratively adjusts the output quality while maintaining your specified dimensions. For example, if you need a 300×300 image under 50KB, the tool will resize to 300×300 first, then progressively reduce quality until the file meets your size requirement — all while keeping the image looking as good as possible at that size.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Our resizer supports all common image formats including PNG, JPEG (JPG), WebP, GIF, BMP, and SVG. You can resize any image and download the result in your preferred output format. This makes it a versatile tool for all your image sizing needs regardless of the source format.",
  },
  {
    question: "Can I resize multiple images at once?",
    answer:
      "Yes, our tool supports batch resizing. Simply drag and drop multiple images or select several files, and all of them will be resized to the same dimensions or target file size. You can download each one individually or download all resized images at once with one click.",
  },
  {
    question: "What does 'lock aspect ratio' mean?",
    answer:
      "Locking the aspect ratio means that when you change the width, the height adjusts automatically to maintain the image's original proportions (and vice versa). This prevents your image from appearing stretched or distorted. For example, a 4:3 image will stay 4:3 whether you resize it to 800×600 or 400×300.",
  },
  {
    question: "Can I resize images to a specific file size like 50KB?",
    answer:
      "Yes, that is one of our key features. Switch to the 'Target File Size' mode and enter your desired file size (e.g., 50KB). The tool will resize your image to the specified dimensions and then optimize the quality to meet your file size target. This is perfect for platforms with strict upload limits like passport photo systems or email attachments.",
  },
  {
    question: "What are the dimension presets for?",
    answer:
      "Dimension presets are common image sizes used across popular platforms and use cases. Instead of manually entering pixels, you can select a preset like 'Facebook Profile (170×170)' or 'YouTube Thumbnail (1280×720)' and the tool will automatically set the correct dimensions. This saves time and ensures your images meet platform requirements.",
  },
  {
    question: "Is it safe to resize images here?",
    answer:
      "Absolutely. All resizing is performed entirely in your browser using client-side JavaScript. Your images are never uploaded to any server. Once you close the tab, all traces of your images are gone from memory. This makes it safe to resize even sensitive or private images.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this image resizer is 100% free with no limits on usage, no subscriptions, and no hidden fees. You can resize as many images as you need, as often as you want. There are no watermarks added to your resized images either.",
  },
]
