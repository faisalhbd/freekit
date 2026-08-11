import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What formats does this converter support?",
    answer:
      "This tool focuses on the four most important web image formats: JPG (JPEG), PNG, WebP, and AVIF. These are the formats most relevant for web development, SEO, and online publishing. For a wider range including BMP and GIF, use our All-in-One Image Converter.",
  },
  {
    question: "What is AVIF and why should I use it?",
    answer:
      "AVIF is the next-generation image format based on the AV1 video codec. It offers approximately 50% better compression than JPG while maintaining similar or better visual quality. It supports both lossy and lossless compression, HDR, and wide color gamut. AVIF is supported by Chrome, Firefox, Edge, and Safari 16.4+.",
  },
  {
    question: "Why does AVIF conversion show a warning?",
    answer:
      "AVIF support in the Canvas API (canvas.toBlob('image/avif')) is not available in all browsers. If your browser does not support it, the tool will show a warning message. You can try using Chrome or Edge for AVIF conversion, or choose WebP as an alternative — it offers excellent compression and is supported by all modern browsers.",
  },
  {
    question: "How do I know which format to choose?",
    answer:
      "For photographs on the web, WebP or AVIF offer the best file sizes. For graphics, logos, and images needing transparency, PNG is ideal. JPG is the most compatible format and works everywhere. Use the side-by-side comparison to see file size differences and choose the format that best fits your needs.",
  },
  {
    question: "Is the conversion lossy or lossless?",
    answer:
      "It depends on the output format. PNG is always lossless. JPG and WebP support both modes — the quality slider controls lossy compression. AVIF also supports both modes. Converting from any format to PNG preserves the current quality without further loss. Converting between lossy formats (e.g., JPG to WebP) may compound quality loss.",
  },
  {
    question: "Why is the side-by-side comparison useful?",
    answer:
      "The side-by-side preview lets you visually compare the original and converted images to check for any quality differences. This is especially helpful when using lower quality settings, so you can verify the output looks acceptable before downloading. The file size comparison also helps you weigh quality against file size savings.",
  },
  {
    question: "Can I convert transparent PNG images to other formats?",
    answer:
      "When converting a transparent PNG to JPG, the transparent areas will be filled with a white background since JPG does not support transparency. Converting to WebP or AVIF will preserve transparency since both formats support alpha channels.",
  },
  {
    question: "What quality setting should I use?",
    answer:
      "For most web uses, 80-85% quality for JPG and WebP provides an excellent balance of file size and visual quality. At 80% quality, most images look identical to the original to the human eye but are significantly smaller. Use 90-100% only when pixel-perfect quality is critical.",
  },
  {
    question: "Is my image uploaded to a server?",
    answer:
      "No. All conversion happens entirely in your browser using the HTML5 Canvas API. Your images are never uploaded to any server. The conversion runs locally on your device, making it completely private and safe.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this image format converter is 100% free with no limits, no subscriptions, no sign-ups, and no hidden fees. Convert as many images as you need. There are no watermarks added to your converted images.",
  },
]