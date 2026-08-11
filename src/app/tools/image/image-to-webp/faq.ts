import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is WebP format?",
    answer:
      "WebP is a modern image format developed by Google that provides superior lossy and lossless compression for images on the web. WebP images are typically 25-35% smaller than JPEG images at the same visual quality, and 26% smaller than PNG images. It supports both lossy (like JPEG) and lossless (like PNG) compression, as well as transparency (alpha channel). Most modern browsers now support WebP natively.",
  },
  {
    question: "Why should I convert my images to WebP?",
    answer:
      "Converting to WebP significantly reduces your image file sizes without noticeable quality loss. This means your website loads faster, consumes less bandwidth, and provides a better user experience. Google recommends WebP as part of its Core Web Vitals optimization. If you run a website, using WebP images can improve your PageSpeed score and SEO ranking.",
  },
  {
    question: "Does WebP conversion reduce image quality?",
    answer:
      "With our tool, you have full control over the output quality. At 80-90% quality, WebP images look virtually identical to the original while being significantly smaller. You can adjust the quality slider from 1% (smallest file) to 100% (best quality). You can preview the result side by side before downloading to make sure it meets your standards.",
  },
  {
    question: "What image formats can I convert to WebP?",
    answer:
      "Our tool supports converting PNG, JPG/JPEG, GIF, BMP, TIFF, and SVG images to WebP format. Simply drag and drop any image file and it will be converted to WebP. Animated GIFs will be converted as static images (only the first frame is preserved) since our tool focuses on static image conversion.",
  },
  {
    question: "Can I convert multiple images to WebP at once?",
    answer:
      "Yes, our tool supports batch conversion. You can drag and drop multiple images at once or click to select several files. All images will be converted to WebP simultaneously with the same quality setting. You can then download each converted image individually or download all of them at once.",
  },
  {
    question: "What browsers support WebP images?",
    answer:
      "WebP is supported by all major modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, Opera, Safari (version 14+), and most mobile browsers. As of 2025, WebP support is over 97% globally. Only very old browsers like Internet Explorer do not support WebP, but they represent less than 1% of web traffic.",
  },
  {
    question: "Is it safe to convert images to WebP here?",
    answer:
      "Absolutely. All conversion is performed entirely in your browser using client-side JavaScript and the Canvas API. Your images are never uploaded to any server. Once you close the tab, all traces of your images are gone from memory. This makes it completely safe to convert even sensitive or private images.",
  },
  {
    question: "How much smaller will my WebP images be?",
    answer:
      "WebP typically reduces file sizes by 25-80% compared to the original format, depending on the source image and quality setting. JPEG images usually see 25-35% reduction, while PNG images can see 50-80% reduction because WebP applies both lossy compression and color space optimization. You can see the exact savings for each image after conversion.",
  },
  {
    question: "What quality setting should I use for WebP?",
    answer:
      "For most web use cases, a quality setting of 80-85% provides an excellent balance between file size and visual quality. For product photos or detailed images where quality is critical, use 90-95%. For thumbnails and decorative images where file size matters most, 60-75% works well. We recommend testing different settings and comparing the results side by side.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this WebP converter is 100% free with no limits on usage, no subscriptions, and no hidden fees. You can convert as many images as you need, as often as you want. There are no watermarks added to your converted images either.",
  },
]
