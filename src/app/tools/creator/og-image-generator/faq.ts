import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is an Open Graph image?",
    answer:
      "An Open Graph (OG) image is a preview thumbnail that appears when your website link is shared on social media platforms like Facebook, Twitter (X), LinkedIn, and Slack. It is defined using the og:image meta tag in your HTML head. A well-designed OG image significantly increases click-through rates by making your shared links visually appealing and informative at a glance.",
  },
  {
    question: "What is the recommended size for an OG image?",
    answer:
      "The standard OG image size is 1200 x 630 pixels with an aspect ratio of approximately 1.91:1. This size works well across all major social platforms. Facebook recommends at least 1200 x 630 pixels for link shares. Twitter/X displays images at 1200 x 628 pixels. LinkedIn uses 1200 x 627 pixels. Creating your image at 1200 x 630 ensures it looks great everywhere.",
  },
  {
    question: "How do I add an OG image to my website?",
    answer:
      "Add the following meta tag inside the <head> section of your HTML: <meta property=\"og:image\" content=\"https://yourdomain.com/og-image.png\" />. You should also include og:title, og:description, og:url, and og:type for a complete Open Graph setup. For Twitter specifically, add <meta name=\"twitter:card\" content=\"summary_large_image\" /> and <meta name=\"twitter:image\" content=\"...\" />.",
  },
  {
    question: "Why is my OG image not showing on social media?",
    answer:
      "Common reasons include: the image URL is not absolute (it must start with https://), the image file is too large (keep it under 5MB for Facebook, 5MB for Twitter), the image does not meet minimum size requirements (600x315 for Facebook), robots.txt blocks the image URL, the page has noindex or nofollow directives, or social platform caches need to be cleared. Use Facebook's Sharing Debugger or Twitter's Card Validator to test and refresh the cache.",
  },
  {
    question: "Can I use gradients for my OG image background?",
    answer:
      "Yes, gradient backgrounds are very popular for OG images. They create a modern, professional look without requiring complex design tools. Our generator supports both solid colors and linear gradients with customizable angle and two color stops. Gradients work especially well because they render cleanly at any size and help your text stand out against the background.",
  },
  {
    question: "What text fits well on an OG image?",
    answer:
      "Keep your title under 60 characters and your subtitle under 120 characters for the best readability. Use a large, bold font for the title (48-56px on the full 1200px canvas) and a smaller size for the subtitle (18-24px). Short, punchy headlines perform best on social media because the image is often viewed on mobile screens where text needs to be clearly legible.",
  },
  {
    question: "How do OG images affect SEO and click-through rates?",
    answer:
      "While OG images are not a direct ranking factor for search engines, they have a significant indirect impact on SEO. When your links are shared on social media, a compelling OG image can increase click-through rates by 2-3x compared to links without custom images. More clicks lead to more traffic, which signals to search engines that your content is valuable. This increased engagement can positively influence your search rankings over time.",
  },
  {
    question: "What file format should I use for OG images?",
    answer:
      "PNG and JPEG are the most widely supported formats. PNG is preferred when your image has text or sharp edges because it supports lossless compression, keeping text crisp. JPEG is better for photographic backgrounds because it produces smaller file sizes. Our generator exports as PNG by default to ensure text sharpness. WebP is also supported by some platforms but may not render correctly everywhere, so PNG is the safest choice.",
  },
  {
    question: "Should I include my brand logo on OG images?",
    answer:
      "Yes, including your brand name or logo on OG images builds brand recognition and credibility. When people see your content repeatedly in their social feeds, a consistent brand presence helps them identify your content quickly. Our generator includes a brand/website name field that displays at the top of the image. For best results, keep the brand text subtle — use a smaller size and slightly reduced opacity so it does not compete with the main title.",
  },
  {
    question: "Can I use this tool for other social media image sizes?",
    answer:
      "This tool is optimized for the standard 1200 x 630 OG image format used by most social platforms. However, the design principles apply broadly. For platform-specific sizes, you may want to adjust the text placement and sizing accordingly. Twitter/X summary cards use 1200 x 628, Instagram link previews use similar dimensions, and Slack uses 1200 x 630. The 1200 x 630 format is the most versatile choice that works well everywhere.",
  },
]
