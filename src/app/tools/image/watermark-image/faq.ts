import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is an image watermark?",
    answer:
      "An image watermark is a visible overlay — usually text or a logo — placed on top of an image to indicate ownership, copyright, or to prevent unauthorized use. Watermarks can be semi-transparent and positioned in various ways to protect images while still allowing viewers to see the content.",
  },
  {
    question: "What formats are supported for input and output?",
    answer:
      "This tool accepts PNG, JPG/JPEG, and WebP images as input. The watermarked image is downloaded in the same format as the original. If you upload a PNG, you get a watermarked PNG. If you upload a JPG, you get a watermarked JPG. This preserves the original format's characteristics.",
  },
  {
    question: "What positioning modes are available?",
    answer:
      "There are four positioning modes: Center places a single watermark in the middle of the image. Tiled repeats the watermark text across the entire image in a grid pattern, providing maximum coverage and protection. Corners places the watermark in all four corners of the image. Each mode is suitable for different use cases and protection levels.",
  },
  {
    question: "Can I customize the watermark appearance?",
    answer:
      "Yes, you can control: font size (from 12px to 200px), text color (via color picker), opacity (from 10% to 100% transparency), and rotation angle (from -180° to 180°). All changes are previewed in real time on the canvas, so you can see exactly how the watermark will look before downloading.",
  },
  {
    question: "Is the tiled watermark truly covering the whole image?",
    answer:
      "Yes, the tiled mode repeats the watermark text in a grid pattern with configurable spacing. The spacing automatically adjusts based on font size to provide comprehensive coverage. Combined with diagonal rotation and low opacity, it creates a professional-looking protective overlay.",
  },
  {
    question: "Does the watermark affect image quality?",
    answer:
      "For PNG output, there is zero quality loss — the watermark is drawn on a lossless canvas. For JPG output, the canvas is exported at maximum quality (100%), so any quality impact is minimal. The watermark itself does not degrade the underlying image data.",
  },
  {
    question: "Can I remove a watermark added with this tool?",
    answer:
      "No, watermarks added to the image become part of the pixel data and cannot be easily removed. This is by design — the purpose of a watermark is to be permanent and difficult to remove. Always keep your original, unwatermarked images as backups.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All watermark processing happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded to any server. The watermark is drawn on a local canvas and the result is downloaded directly from your browser.",
  },
  {
    question: "What is the best opacity for a watermark?",
    answer:
      "For most purposes, 20-40% opacity provides a good balance between visibility and not obscuring the image. For maximum protection with tiled mode, 10-20% opacity with rotation works well. For copyright notices in corners, 30-50% opacity makes the text clearly readable.",
  },
  {
    question: "Is this watermark tool free?",
    answer:
      "Yes, this tool is 100% free with no usage limits, no subscriptions, no sign-ups, and no hidden fees. Add watermarks to as many images as you need. There are no watermarks added by the tool itself — only the text you specify.",
  },
]
