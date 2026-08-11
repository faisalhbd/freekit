import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are Open Graph tags?",
    answer: "Open Graph (OG) tags are meta tags added to a webpage's HTML that control how content appears when shared on social media platforms like Facebook, LinkedIn, Twitter, and Discord. They were created by Facebook in 2010 and have become the de facto standard for social media previews, defining the title, description, image, and type of shared content.",
  },
  {
    question: "Why are OG tags important for SEO?",
    answer: "While OG tags don't directly affect search rankings, they dramatically improve click-through rates when your content is shared on social media. A well-configured OG tag ensures your shared links display an attractive preview with the correct title, description, and image — this increases engagement, social signals, and referral traffic, all of which indirectly benefit SEO.",
  },
  {
    question: "Which OG tags are required?",
    answer: "The four required OG tags are: og:title (the title of the content), og:description (a brief description), og:image (the preview image URL, recommended 1200x630px), and og:url (the canonical URL of the page). These four are essential for social platforms to generate a proper preview. Without them, platforms will try to guess the content, often with poor results.",
  },
  {
    question: "What size should my OG image be?",
    answer: "The recommended OG image size is 1200x630 pixels for optimal display on all major social platforms. Facebook displays at 1200x630, LinkedIn at 1200x627, and Twitter at 1200x600. The image should be under 5MB in JPG, PNG, or WebP format. Avoid using images with too much text — Facebook may reduce reach for images with more than 20% text.",
  },
  {
    question: "What are the available og:type values?",
    answer: "Common og:type values include: website (default, for web pages), article (for blog posts and news), profile (for personal pages), book (for books), music.song, music.album, video.movie, video.episode, and product (for e-commerce). The article type supports additional tags like article:published_time, article:author, and article:section.",
  },
  {
    question: "How do OG tags differ from regular meta tags?",
    answer: "Regular meta tags like <meta name=\"description\"> provide information to search engines, while OG tags like <meta property=\"og:description\"> provide information to social media platforms. They serve different audiences: meta tags are for Google/Bing, OG tags are for Facebook/LinkedIn/Twitter. A well-optimized page uses both.",
  },
  {
    question: "What is og:locale and when should I use it?",
    answer: "og:locale specifies the language and region of the content, using the format language_TERRITORY (e.g., en_US, en_GB, fr_FR, de_DE). It defaults to en_US if not specified. Use it when your content targets a specific non-English audience. You can also use og:locale:alternate to specify additional language versions of the same content.",
  },
  {
    question: "How do I validate my OG tags?",
    answer: "You can validate your OG tags using Facebook's Sharing Debugger (developers.facebook.com/tools/debug/), LinkedIn's Post Inspector (linkedin.com/post-inspector/), and Twitter's Card Validator (cards-dev.twitter.com/validator). These tools show you exactly how your content will appear when shared and will also refresh the cached version of your page.",
  },
  {
    question: "Do OG tags work with Twitter?",
    answer: "Yes, Twitter primarily uses its own twitter:card tags (summary, summary_large_image, player, app), but it falls back to OG tags if Twitter-specific tags are not present. Our OG Tag Generator includes Twitter Card fields so you can set both OG and Twitter tags simultaneously for maximum compatibility across all platforms.",
  },
  {
    question: "Is this OG tag generator free to use?",
    answer: "Yes, this OG tag generator is 100% free with no limits, no sign-up, and no hidden fees. All tag generation happens in your browser — no data is sent to any server. You can generate as many tag sets as you need.",
  },
]
