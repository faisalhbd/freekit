import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are meta tags and why do they matter for SEO?",
    answer:
      "Meta tags are HTML elements placed in the <head> section of a web page that provide search engines with metadata about the page content. The most important meta tags for SEO are the title tag (<title>) and the meta description (<meta name=\"description\">). These directly influence how your page appears in search engine results pages (SERPs) and can significantly impact click-through rates. Other meta tags like viewport, charset, and robots directives help with page rendering and crawling behavior.",
  },
  {
    question: "What is the recommended length for a title tag?",
    answer:
      "Google typically displays up to 60 characters of a title tag in search results before truncating it with an ellipsis. While there is no strict character limit enforced by search engines, keeping your title between 50 and 60 characters ensures the full title is visible on both desktop and mobile devices. A well-crafted title tag should include your primary keyword near the beginning and accurately describe the page content to attract clicks.",
  },
  {
    question: "How long should a meta description be?",
    answer:
      "Meta descriptions should be between 140 and 160 characters. Google may truncate descriptions longer than 160 characters on desktop, and even shorter on mobile. While meta descriptions are not a direct ranking factor, a compelling description can significantly increase your click-through rate from search results. Write unique, action-oriented descriptions that include relevant keywords and clearly communicate the value of clicking through to your page.",
  },
  {
    question: "What is the viewport meta tag and do I need it?",
    answer:
      "The viewport meta tag controls how a webpage is displayed on mobile devices. The standard setting is <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">, which ensures the page scales properly to fit the screen width of any device. Without this tag, mobile browsers render pages at desktop width and then zoom out, resulting in a poor user experience. Since Google uses mobile-first indexing, the viewport tag is essential for SEO and usability.",
  },
  {
    question: "What does the charset meta tag do?",
    answer:
      "The charset meta tag (<meta charset=\"UTF-8\">) declares the character encoding for the HTML document. UTF-8 is the universal standard and supports virtually all characters, symbols, and emojis from every language. Placing the charset declaration as early as possible in the <head> section helps the browser parse the page correctly and prevents garbled text. Without it, the browser may guess the encoding, which can lead to display issues.",
  },
  {
    question: "What is a canonical URL and when should I use one?",
    answer:
      "A canonical URL (<link rel=\"canonical\" href=\"...\">) tells search engines which version of a URL is the preferred or \"master\" version when multiple URLs have identical or very similar content. This prevents duplicate content issues that can dilute your search rankings. Use canonical tags on paginated pages, URL parameter variations (such as tracking parameters), print-friendly pages, and when content is syndicated across multiple domains. The canonical URL should always point to the cleanest, most authoritative version of the page.",
  },
  {
    question: "What are Open Graph (OG) tags and why do I need them?",
    answer:
      "Open Graph tags are meta properties (og:title, og:description, og:image, og:url, og:type) that control how your page appears when shared on social media platforms like Facebook, LinkedIn, and Slack. Without OG tags, social platforms will guess the title, description, and image, often resulting in a poor preview. Adding proper Open Graph tags ensures your shared links display a compelling title, an engaging description, and a correctly sized preview image, which dramatically improves social sharing performance.",
  },
  {
    question: "What are Twitter Card tags and how do they work?",
    answer:
      "Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) define how your page appears when shared on Twitter/X. There are several card types: \"summary\" (small square image), \"summary_large_image\" (large banner image), and \"app\" (mobile app install). The summary_large_image type is the most popular as it provides the most visual impact. Twitter also falls back to Open Graph tags if Twitter-specific tags are not present, so it is good practice to include both sets of tags for comprehensive social media coverage.",
  },
  {
    question: "What is structured data and how does it relate to meta tags?",
    answer:
      "Structured data (also called schema markup or JSON-LD) is a standardized format for providing search engines with detailed information about a page's content, such as product prices, review ratings, FAQ content, and event details. While meta tags provide basic page-level metadata, structured data enables rich results (star ratings, FAQs, breadcrumbs) directly in search results. Meta tags and structured data complement each other — meta tags control the basic SERP appearance, while structured data unlocks enhanced search features.",
  },
  {
    question: "Is this meta tag generator tool free to use?",
    answer:
      "Yes, FreeKit's Meta Tag Generator is completely free to use with no sign-up, no limits, and no hidden fees. All processing happens directly in your browser — no data is sent to any server. You can generate as many sets of meta tags as you need, copy the HTML code, and paste it directly into your website's <head> section. The tool is designed for beginners and SEO professionals alike, making it easy to create properly formatted, SEO-optimized meta tags in seconds.",
  },
]
