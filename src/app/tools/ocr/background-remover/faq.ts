import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is background removal and why would I need it?",
    answer:
      "Background removal is the process of isolating the main subject of an image by making the surrounding background transparent. It is commonly used for product photos on e-commerce sites, creating profile pictures, designing marketing materials, and preparing images for graphic design projects where a clean, distraction-free subject is needed.",
  },
  {
    question: "How does this background removal tool work?",
    answer:
      "This tool uses a color-based removal approach. You can either click on the image to sample the background color, or let the tool auto-detect the background color from the image corners. It then compares every pixel to that color and makes matching pixels transparent based on a tolerance slider you control. Edge feathering smooths the boundaries for a natural look.",
  },
  {
    question: "Is my image data private and secure?",
    answer:
      "Yes, all processing happens entirely in your browser using the Canvas API. Your images are never uploaded to any server. The image stays on your device at all times, ensuring complete privacy and data security.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "The tool supports all common image formats for upload including JPG, JPEG, PNG, WebP, BMP, and GIF. The output is always downloaded as a PNG file with transparency support, which is the standard format for images with transparent backgrounds.",
  },
  {
    question: "What kind of backgrounds work best with this tool?",
    answer:
      "This tool works best with solid or uniform backgrounds such as white, black, or single-color backgrounds. It is ideal for product photos taken on a plain backdrop, scanned documents, ID photos, and studio portraits. Complex backgrounds with gradients, patterns, or detailed scenes are better handled by dedicated AI background removers.",
  },
  {
    question: "How does the tolerance slider work?",
    answer:
      "The tolerance slider controls how similar a pixel's color must be to the background color to be removed. A low tolerance (0-20) removes only pixels very close to the exact background color. A high tolerance (80-100) removes a wider range of similar colors. For clean white backgrounds, a moderate tolerance of 30-50 usually works well.",
  },
  {
    question: "Can I get a transparent background (PNG with alpha)?",
    answer:
      "Yes, the processed image is downloaded as a PNG file with full alpha channel transparency. The removed background areas will be fully transparent, allowing you to place the subject on any new background in design software or web applications.",
  },
  {
    question: "Does the tool support batch processing?",
    answer:
      "Currently, this tool processes one image at a time. For batch background removal, you would need to process each image individually. The tool is designed for quick, single-image editing with real-time preview.",
  },
  {
    question: "Is this background remover free to use?",
    answer:
      "Yes, this tool is completely free with no limits. There are no sign-ups, no watermarks, no usage caps, and no hidden fees. You can remove backgrounds from as many images as you need.",
  },
  {
    question: "What is the edge feathering feature?",
    answer:
      "Edge feathering smoothly blends the transparency at the boundary between the subject and the removed background. Instead of a hard, jagged edge, pixels near the tolerance threshold get partially transparent alpha values, creating a softer, more natural transition that looks better when placed on new backgrounds.",
  },
  {
    question: "Can I undo or reset the background removal?",
    answer:
      "Yes, you can click the Reset button at any time to restore the original image and start over. You can also adjust the tolerance slider and click 'Remove Background' again to try different settings without re-uploading the image.",
  },
  {
    question: "Does the tool work on mobile devices?",
    answer:
      "Yes, the tool is fully responsive and works on smartphones and tablets. You can upload images from your photo library or take a new photo directly. The interface adapts to all screen sizes for a comfortable experience on any device.",
  },
]
