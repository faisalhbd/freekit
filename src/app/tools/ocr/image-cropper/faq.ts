import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is image cropping?",
    answer:
      "Image cropping is the process of removing the outer parts of an image to focus on a specific area, improve composition, or change the aspect ratio. It helps you eliminate unwanted elements, highlight the main subject, and make your image fit specific dimensions required by different platforms or use cases.",
  },
  {
    question: "How does this image cropper tool work?",
    answer:
      "This tool loads your image into the browser and renders it on an HTML Canvas element. You then draw a crop rectangle over the image by clicking and dragging. You can adjust the rectangle by dragging its edges or corners. When you click 'Crop & Download,' the tool uses the Canvas API to extract only the selected region and saves it as a new image file.",
  },
  {
    question: "Is my image data private and secure?",
    answer:
      "Yes, absolutely. All image processing happens entirely in your browser using the Canvas API. Your images are never uploaded to any server. The image stays on your device at all times, ensuring complete privacy and data security.",
  },
  {
    question: "What aspect ratios are available?",
    answer:
      "The tool provides several preset aspect ratios including Free (no constraint), 1:1 (square, ideal for Instagram), 4:3 (standard display), 16:9 (widescreen, ideal for YouTube and presentations), 3:2 (classic photo), 2:3 (portrait photo), and 9:16 (vertical video, ideal for Stories and Reels). You can also crop freely without any ratio lock.",
  },
  {
    question: "Can I set custom crop dimensions?",
    answer:
      "When using the Free aspect ratio mode, you can drag the crop rectangle to any custom size. The tool displays the current crop dimensions in pixels as you adjust, so you know exactly what size your output will be. For precise dimensions, you can use the crop handles to fine-tune the selection.",
  },
  {
    question: "What output formats are supported?",
    answer:
      "You can download your cropped image as either PNG or JPG format. PNG is ideal when you need transparency or lossless quality, while JPG is better for smaller file sizes. When using JPG, you can adjust the quality slider from 10% to 100% to balance file size and image quality.",
  },
  {
    question: "Is this image cropper free to use?",
    answer:
      "Yes, this tool is completely free with no limits. There are no sign-ups, no watermarks, no usage caps, and no hidden fees. You can crop as many images as you need without any restrictions.",
  },
  {
    question: "Does the tool work on mobile devices?",
    answer:
      "Yes, the tool is fully responsive and works on smartphones and tablets. It supports both mouse and touch events, so you can drag and resize the crop rectangle using your finger on touchscreens. The interface adapts to all screen sizes for a comfortable experience on any device.",
  },
  {
    question: "How do I lock the aspect ratio while cropping?",
    answer:
      "Select an aspect ratio preset from the dropdown (such as 1:1, 16:9, etc.). When a preset is selected, the crop rectangle maintains that ratio as you resize it. The lock icon next to the ratio selector indicates that the aspect ratio is locked. To crop freely again, select 'Free' from the dropdown.",
  },
  {
    question: "What is the estimated output file size shown?",
    answer:
      "The tool calculates an approximate output file size based on the crop dimensions and selected format settings. For JPG, it factors in the quality slider setting. For PNG, it estimates based on the pixel count. This helps you plan before downloading, especially when you need to meet specific file size requirements.",
  },
  {
    question: "Can I undo and start over?",
    answer:
      "Yes, click the Reset button to clear the current crop selection and start fresh. The original image remains unchanged, and you can draw a new crop rectangle at any time. You can also change the aspect ratio or format settings without losing your crop selection.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "The tool supports all common image formats for upload including JPG, JPEG, PNG, WebP, BMP, GIF, and SVG (rasterized). Any image that can be displayed in a browser can be loaded into the cropper. The output is then saved in your chosen format (PNG or JPG).",
  },
]
