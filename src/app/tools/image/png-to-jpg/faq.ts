import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the difference between PNG and JPG?",
    answer:
      "PNG (Portable Network Graphics) is a lossless image format that supports transparency and produces larger file sizes. JPG (JPEG) is a lossy compressed format that produces much smaller files but does not support transparency. JPG is ideal for photographs and web images where file size matters, while PNG is better for graphics, logos, and images requiring transparent backgrounds.",
  },
  {
    question: "Will converting PNG to JPG reduce image quality?",
    answer:
      "With our tool, you have full control over the output quality. At 90-95% quality, the difference between the original PNG and the JPG is virtually invisible to the human eye. At lower quality settings (60-80%), you get even smaller files with minimal quality trade-off. You can preview the result side by side before downloading to decide what works best.",
  },
  {
    question: "What happens to transparent areas in my PNG?",
    answer:
      "Since JPG does not support transparency, transparent areas in your PNG will be replaced with a solid background color. By default, our tool uses white, but you can choose any custom background color using the color picker. This is important for logos, icons, and graphics with transparent backgrounds.",
  },
  {
    question: "How much smaller will my JPG files be compared to PNG?",
    answer:
      "JPG files are typically 60-90% smaller than PNG files. For example, a 2MB PNG photograph might become a 200KB JPG at 85% quality. The exact savings depend on the image content — photographs see the biggest savings, while simple graphics with few colors see less dramatic but still significant reductions.",
  },
  {
    question: "Can I convert multiple PNG files to JPG at once?",
    answer:
      "Yes, our tool supports batch conversion. Drag and drop multiple PNG files or select several files at once, and all of them will be converted to JPG with the same quality and background settings. You can download each converted image individually or download all at once.",
  },
  {
    question: "What quality setting should I use?",
    answer:
      "For photographs and web images, 85-90% quality provides an excellent balance between file size and visual quality. For product photos where clarity matters, use 90-95%. For thumbnails and decorative images, 70-80% works well. We always recommend previewing the result before downloading to make sure it meets your needs.",
  },
  {
    question: "Is it safe to convert PNG to JPG here?",
    answer:
      "Absolutely. All conversion is performed entirely in your browser using client-side JavaScript and the Canvas API. Your images are never uploaded to any server. Once you close the tab, all traces of your images are gone from memory. This is completely safe for converting even sensitive or private images.",
  },
  {
    question: "Can I choose a custom background color for transparency?",
    answer:
      "Yes, our tool lets you choose any background color for transparent areas. By default, transparent areas become white (the most common choice for web images). You can use the color picker to set any custom color — useful when you need the JPG to blend with a specific website background.",
  },
  {
    question: "Does this tool support animated PNG files?",
    answer:
      "Our tool focuses on static image conversion. Animated PNG (APNG) files will be converted as static images using only the first frame. If you need to preserve animations, consider using a dedicated APNG-to-GIF converter.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this PNG to JPG converter is 100% free with no limits on usage, no subscriptions, and no hidden fees. You can convert as many images as you need, as often as you want. There are no watermarks added to your converted images either.",
  },
]
