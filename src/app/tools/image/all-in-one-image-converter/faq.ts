import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What image formats does this converter support?",
    answer:
      "This tool supports PNG, JPG/JPEG, WebP, BMP, and GIF as both input and output formats. You can convert from any supported format to any other supported format. For example, you can convert PNG to JPG, GIF to WebP, BMP to PNG, and any other combination.",
  },
  {
    question: "Can I convert multiple images at once?",
    answer:
      "Yes, this tool fully supports batch conversion. You can drag and drop multiple image files at once or select several files from the file picker. All images will be converted simultaneously, and you can download them individually or use the 'Download All' button to save everything at once.",
  },
  {
    question: "What does the quality slider do?",
    answer:
      "The quality slider controls the compression level for lossy output formats like JPEG and WebP. A higher quality value (closer to 1.0) produces larger files with better visual quality, while a lower value (closer to 0.1) produces smaller files with more compression artifacts. For PNG output, the quality setting is ignored since PNG is always lossless.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Each individual image can be up to 50MB. There is no limit on the number of images you can convert in a single batch. However, processing very large images or a large number of images may take longer depending on your device's processing power.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All image conversion happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device — they are not uploaded to any server. Once you close the browser tab, all traces of your images are removed from memory. This makes the tool completely safe for private or sensitive images.",
  },
  {
    question: "Why does converting PNG to JPG make the file smaller?",
    answer:
      "PNG uses lossless compression that preserves every pixel perfectly, while JPG uses lossy compression that permanently discards visual data the human eye is less likely to notice. This makes JPG files significantly smaller (typically 50-80% smaller) but with some quality loss. The quality slider lets you control this trade-off.",
  },
  {
    question: "Can I convert animated GIFs?",
    answer:
      "This tool converts the first frame of animated GIFs to the target format. Full animated GIF conversion with all frames preserved is not supported. If you need to convert animated GIFs, consider using a dedicated GIF conversion tool that preserves animation frames.",
  },
  {
    question: "What is WebP and should I use it?",
    answer:
      "WebP is a modern image format developed by Google that offers both lossy and lossless compression. WebP files are typically 25-35% smaller than equivalent JPG files while maintaining similar visual quality. It is supported by all modern browsers and is recommended for web use to improve page load times and SEO performance.",
  },
  {
    question: "Does converting to PNG preserve transparency?",
    answer:
      "Yes, when converting images with transparency (like transparent PNGs) to PNG output, the transparency is fully preserved. However, if you convert a transparent image to JPG or BMP, the transparent areas will be filled with a white background since those formats do not support transparency.",
  },
  {
    question: "Is this image converter free?",
    answer:
      "Yes, this tool is 100% free with no usage limits, no subscriptions, no sign-ups, and no hidden fees. You can convert as many images as you need, as often as you want. There are no watermarks added to your converted images, and no quality restrictions.",
  },
]
