import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the difference between JPG and PNG?",
    answer:
      "JPG (JPEG) is a lossy compressed format that produces small files but loses some image data each time it is saved. PNG is a lossless format that preserves every pixel perfectly and supports transparency (alpha channel). PNG files are typically larger than JPG but offer pixel-perfect quality, making them ideal for graphics, logos, screenshots, and images with text.",
  },
  {
    question: "Will converting JPG to PNG improve image quality?",
    answer:
      "Converting JPG to PNG preserves the current quality of your image without any further degradation. However, it cannot restore quality that was already lost during the original JPG compression. The benefit is that the PNG file will not lose any more quality — it preserves exactly what the JPG currently shows, pixel for pixel.",
  },
  {
    question: "Why are PNG files larger than JPG files?",
    answer:
      "PNG uses lossless compression, meaning it stores every pixel exactly as-is without discarding any data. JPG uses lossy compression that permanently removes visual data the human eye is less likely to notice. This makes JPG files much smaller (typically 60-90% smaller) but at the cost of some quality loss. PNG trades file size for perfect quality.",
  },
  {
    question: "Does PNG support transparency?",
    answer:
      "Yes, PNG fully supports transparency through its alpha channel. This means you can have images with see-through areas, which is essential for logos, icons, watermarks, and graphics that need to overlay on different backgrounds. JPG does not support transparency — this is one of the main reasons to convert JPG to PNG.",
  },
  {
    question: "Can I convert multiple JPG files to PNG at once?",
    answer:
      "Yes, our tool supports batch conversion. Drag and drop multiple JPG/JPEG files or select several files at once, and all of them will be converted to PNG simultaneously. You can download each converted image individually or download all of them at once with one click.",
  },
  {
    question: "What JPG formats are supported?",
    answer:
      "Our tool accepts both JPG and JPEG file extensions (they are the same format). It also supports JPEG images with various color profiles including sRGB, Adobe RGB, and CMYK. The conversion preserves the original color depth and dimensions of your image.",
  },
  {
    question: "Is it safe to convert JPG to PNG here?",
    answer:
      "Absolutely. All conversion is performed entirely in your browser using client-side JavaScript and the Canvas API. Your images are never uploaded to any server. Once you close the tab, all traces of your images are gone from memory. This makes it completely safe for converting even private or sensitive images.",
  },
  {
    question: "When should I use PNG instead of JPG?",
    answer:
      "Use PNG for images that need pixel-perfect quality: logos, icons, screenshots, graphics with text, line art, and images that need transparent backgrounds. Use JPG for photographs and web images where file size matters more than perfect quality. For web use, a common strategy is to use PNG for graphics/logos and JPG for photographs.",
  },
  {
    question: "Can I convert the PNG back to JPG later?",
    answer:
      "Yes, you can always convert PNG back to JPG using our PNG to JPG Converter. Keep in mind that converting back to JPG will introduce lossy compression again. For this reason, it is a good practice to keep your original JPG files as backups if you plan to convert back and forth.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this JPG to PNG converter is 100% free with no limits on usage, no subscriptions, and no hidden fees. You can convert as many images as you need, as often as you want. There are no watermarks added to your converted images either.",
  },
]
