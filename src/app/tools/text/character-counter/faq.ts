import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the character counter count characters?",
    answer: "The character counter uses JavaScript's built-in string length property to count every single character in your text, including letters, numbers, punctuation marks, and whitespace. It updates instantly as you type or paste text into the input area."
  },
  {
    question: "What is the Twitter/X character limit?",
    answer: "Twitter/X allows up to 280 characters per tweet for most accounts. However, Twitter Blue subscribers get 4,000 characters, and Twitter Blue+ subscribers get up to 10,000 characters. The counter tracks against the standard 280-character limit by default."
  },
  {
    question: "How many characters can an Instagram caption have?",
    answer: "Instagram captions can contain up to 2,200 characters. However, only the first 125 characters are visible before the user clicks 'more.' For Instagram bios, the limit is much shorter at 150 characters. This tool tracks both limits separately."
  },
  {
    question: "What is the SEO meta description character limit?",
    answer: "Google typically displays up to 160 characters for meta descriptions in search results. If your meta description exceeds this limit, it will be truncated with an ellipsis. Keeping your meta description between 150 and 160 characters ensures it displays fully on both desktop and mobile."
  },
  {
    question: "How is UTF-8 byte size calculated?",
    answer: "UTF-8 uses variable-length encoding: ASCII characters (a-z, 0-9, basic punctuation) use 1 byte, most European/accented characters use 2 bytes, many Asian and other scripts use 3 bytes, and some rare characters or emojis use 4 bytes. The byte counter uses the TextEncoder API to calculate the exact UTF-8 byte size of your text."
  },
  {
    question: "What is the SMS character limit?",
    answer: "A standard SMS message allows 160 characters using the GSM 7-bit encoding. If you use any characters outside this encoding (such as accented letters, emojis, or certain symbols), the message switches to UTF-16 encoding, reducing the limit to 70 characters per segment. Long messages are split into multiple segments."
  },
  {
    question: "Why does my character count differ from Microsoft Word?",
    answer: "Different tools may count characters slightly differently depending on how they handle whitespace, line breaks, and special characters. Our counter counts every character exactly as JavaScript reports it, including spaces, tabs, and newline characters. The 'without spaces' metric strips all whitespace for a pure content character count."
  },
  {
    question: "What is the Google Ads headline character limit?",
    answer: "Google Ads responsive search ads allow up to 30 characters per headline, with a maximum of 15 headlines per ad. Descriptions are limited to 90 characters each, with up to 4 descriptions. This tool tracks the 30-character headline limit so you can verify your ad copy fits before submitting."
  },
  {
    question: "Does the character counter work with emojis and special characters?",
    answer: "Yes, the character counter accurately handles emojis, accented characters, Unicode symbols, and all other special characters. However, note that some emojis are actually composed of multiple Unicode code points (such as skin-tone modifiers or family emojis), which may count as more than one character."
  },
  {
    question: "Is my text stored or sent to a server?",
    answer: "No, all text processing happens entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in a database, or shared with third parties. Once you close or refresh the page, your text is completely gone."
  },
]
