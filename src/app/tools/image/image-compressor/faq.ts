import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is image compression?",
    answer:
      "Image compression is the process of reducing an image file's size by encoding it more efficiently. It removes unnecessary data while preserving as much visual quality as possible, making files easier to store and share. There are two main types: lossy compression, which permanently discards some data, and lossless compression, which reduces size without any quality loss.",
  },
  {
    question: "How does this image compressor work?",
    answer:
      "Our image compressor runs entirely in your browser using advanced client-side algorithms. You simply upload an image, adjust the quality slider to your preference, and the tool processes the file instantly. Because everything happens locally on your device, your images never leave your computer, ensuring complete privacy.",
  },
  {
    question: "Is it safe to upload images here?",
    answer:
      "Yes, it is completely safe. All image processing happens directly in your browser — no files are uploaded to any server. Your images never leave your device, which means there is zero risk of data breaches, unauthorized access, or privacy violations. You can confidently compress even sensitive images.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Our compressor supports the three most common web image formats: JPEG (JPG), PNG, and WebP. JPEG is ideal for photographs and complex images, PNG works best for graphics with transparency, and WebP offers superior compression for both photos and graphics. You can also convert between formats while compressing.",
  },
  {
    question: "Does compression reduce image quality?",
    answer:
      "It depends on the compression level you choose. Lower compression levels produce smaller files with minimal quality loss that is often invisible to the naked eye. Higher compression results in even smaller files but may introduce slight artifacts or blurriness. Our real-time preview lets you compare the original and compressed versions side by side before downloading.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes, you can upload and compress multiple images simultaneously. Simply drag and drop several files or select them from your file picker, and the tool will process each one according to your chosen quality settings. This batch processing feature saves significant time when you need to optimize an entire gallery or set of images.",
  },
  {
    question: "What quality level should I use?",
    answer:
      "For most web and social media use, a quality level between 70% and 85% provides an excellent balance between file size and visual clarity. Use 85-95% for high-quality prints or professional portfolios, and 50-70% for thumbnails, email attachments, or where loading speed is critical. The best approach is to experiment with the slider while checking the live preview.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Since all processing happens in your browser, the only practical limit is your device's available memory. Most modern browsers can comfortably handle images up to 50 MB or larger. However, very large images may take slightly longer to process. There are no artificial file size restrictions imposed by our tool.",
  },
  {
    question: "Can I convert images while compressing?",
    answer:
      "Yes, you can convert your images to a different format at the same time you compress them. For example, you can compress a large PNG and export it as a WebP or JPEG, which typically results in a much smaller file. This dual capability lets you both optimize file size and adopt modern web formats in a single step.",
  },
  {
    question: "How much can I reduce file size?",
    answer:
      "The amount of reduction varies depending on the original image format, content complexity, and your chosen quality setting. JPEG and WebP files can typically be reduced by 50-80% with little to no visible quality loss. PNG files converted to JPEG or WebP often see even greater savings of 70-90%. The real-time preview shows you the exact savings before you download.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this image compressor is 100% free to use with no hidden costs, subscriptions, or premium tiers. There are no limits on how many images you can compress or how often you can use the tool. We believe everyone should have access to fast, high-quality image optimization without paying for expensive software.",
  },
  {
    question: "Do you store my uploaded images?",
    answer:
      "No, we never store your images — not even temporarily. Because all compression is performed locally in your browser using JavaScript, your files are never transmitted over the internet to our servers or any third-party service. Once you close the tab or navigate away, all traces of your uploaded images are gone.",
  },
]
