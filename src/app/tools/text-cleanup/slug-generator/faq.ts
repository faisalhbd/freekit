import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a URL slug?",
    answer: "A URL slug is the part of a web address that comes after the domain name and identifies a specific page in a human-readable format. For example, in 'example.com/my-awesome-blog-post', the slug is 'my-awesome-blog-post'. Slugs are used in URLs to make them readable, SEO-friendly, and easy to share. Good slugs use lowercase letters, hyphens to separate words, and contain relevant keywords without special characters."
  },
  {
    question: "How does the Slug Generator tool work?",
    answer: "The tool takes your input text and applies a series of transformations to create a clean, URL-safe slug. It converts to lowercase, transliterates accented characters to their ASCII equivalents, removes special characters and punctuation, optionally removes common stop words, replaces spaces with your chosen separator, and enforces a maximum length. All processing happens instantly in your browser."
  },
  {
    question: "What separator should I use for my slug?",
    answer: "Hyphens (-) are the most common and SEO-recommended separator for URL slugs. They are the standard recognized by Google and other search engines. Underscores (_) are sometimes used in programming contexts and database identifiers. Dots (.) can be used for file naming conventions. For most web and SEO purposes, hyphens are the best choice as they are treated as word separators by search engines."
  },
  {
    question: "What are stop words and should I remove them?",
    answer: "Stop words are common words like 'a', 'an', 'the', 'is', 'are', 'and', 'or', 'in', 'on', etc. that add little SEO value to URLs. Removing them makes your slug shorter, cleaner, and more focused on the important keywords. For example, 'the-quick-and-brown-fox' becomes 'quick-brown-fox' with stop word removal. However, some words like 'how', 'what', and 'why' may be important for question-style titles, so review the output before using it."
  },
  {
    question: "What does 'Transliterate Accents' mean?",
    answer: "Transliteration converts accented and special Unicode characters to their closest ASCII equivalents. For example, 'café' becomes 'cafe', 'naïve' becomes 'naive', 'résumé' becomes 'resume', and 'ñoño' becomes 'nono'. This ensures your slug contains only standard ASCII characters that are safe for URLs and work reliably across all browsers, servers, and databases."
  },
  {
    question: "What is the recommended max length for a URL slug?",
    answer: "For SEO purposes, most experts recommend keeping your slug under 60 characters. Google typically displays up to 50-60 characters of a URL in search results. Shorter slugs are also easier to share on social media and more readable. Common recommendations are 50 characters for strict SEO, 75 characters for a balanced approach, and 100+ characters if readability is more important than SEO."
  },
  {
    question: "Can I use the generated slug directly in my URL?",
    answer: "Yes, the slug is ready to use directly in your URL. It contains only lowercase alphanumeric characters and your chosen separator — no spaces, special characters, or accents. Simply append it to your domain or base URL. For example, if your domain is 'blog.example.com' and the generated slug is 'how-to-write-clean-code', your full URL would be 'blog.example.com/how-to-write-clean-code'."
  },
  {
    question: "Is my text data kept private?",
    answer: "Absolutely. All slug generation happens entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in any database, or logged. This means you can safely generate slugs for draft blog posts, internal documents, or any content that hasn't been published yet without any privacy concerns."
  },
  {
    question: "Can I generate multiple slugs from one session?",
    answer: "Yes, simply edit the input text and the slug will update in real time (if you're using the live output) or click the generate button again. You can also use the Copy button to save each slug, clear the input for the next one, and repeat. There are no limits on how many slugs you can generate."
  },
  {
    question: "How does this compare to CMS auto-generated slugs?",
    answer: "Most CMS platforms like WordPress automatically generate slugs from post titles, but they often include all words and may not handle special characters, accented letters, or length limits optimally. This tool gives you fine-grained control over every aspect of slug generation: separator type, stop word removal, accent handling, and max length — producing cleaner, more SEO-optimized slugs than most built-in CMS generators."
  },
]
