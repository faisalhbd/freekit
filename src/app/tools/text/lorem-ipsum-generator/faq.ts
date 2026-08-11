import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is Lorem Ipsum?",
    answer: "Lorem Ipsum is a type of placeholder text (also known as dummy text or filler text) that has been used in the printing and typesetting industry since the 1500s. It consists of scrambled Latin words derived from a work by Cicero called 'De finibus bonorum et malorum.' Designers and developers use it to fill empty spaces in layouts so that viewers can focus on the visual design rather than being distracted by readable content."
  },
  {
    question: "Where does Lorem Ipsum come from?",
    answer: "The text originates from a philosophical work by the Roman statesman and philosopher Marcus Tullius Cicero, written in 45 BC, titled 'De finibus bonorum et malorum' (On the Ends of Good and Evil). The specific passage (Sections 1.10.32 and 1.10.33) was scrambled and altered over centuries. It was popularized in the 1960s with Letraset sheets containing Lorem Ipsum passages, and later with desktop publishing software like Aldus PageMaker."
  },
  {
    question: "Why do designers use placeholder text instead of real content?",
    answer: "Designers use placeholder text to evaluate the visual structure and layout of a design without the distraction of meaningful content. When real text is used, viewers tend to read it and focus on the meaning rather than the typography, spacing, and overall visual hierarchy. Placeholder text simulates the look and flow of natural language, helping designers make informed decisions about font sizes, line heights, margins, and column widths before the actual copy is available."
  },
  {
    question: "What is the difference between starting with 'Lorem ipsum dolor sit amet' and random text?",
    answer: "The classic start 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' is the traditional opening that most people associate with placeholder text. It maintains the historical authenticity of the original source. A random start shuffles the word pool so the generated text begins with different words each time. Some designers prefer the classic start for recognition, while others prefer random text to avoid the placeholder looking too familiar or template-like."
  },
  {
    question: "Are there alternatives to classic Lorem Ipsum?",
    answer: "Yes, there are several alternatives. 'Cicero' uses the unscrambled original Latin text from Cicero's work, offering more authentic Latin grammar and meaning. 'Hipster Ipsum' generates nonsensical but trendy-sounding sentences (e.g., 'Artisan cold-brewed quinoa beard tacos'). Other alternatives include 'Bacon Ipsum' (meat-themed), 'Corporate Ipsum' (business jargon), and 'Cupcake Ipsum' (baking-themed). Each alternative adds a different tone to the placeholder, which can be useful depending on the project's audience."
  },
  {
    question: "How many paragraphs or words should I generate for my design?",
    answer: "It depends on your design context. For a simple card or hero section, 1 to 2 paragraphs (30 to 80 words) is usually sufficient. For blog layouts or article pages, 4 to 8 paragraphs work well to show how longer content flows. For e-commerce product descriptions, 2 to 3 short paragraphs mimic real descriptions. The goal is to generate enough text to fill the design and reveal any potential layout issues like text overflow, awkward line breaks, or spacing problems."
  },
  {
    question: "Is the generated Lorem Ipsum text realistic enough for client presentations?",
    answer: "Yes, the word selection and sentence structure in this generator are designed to mimic the cadence and word-length distribution of real Latin text. The words are drawn from actual Latin vocabulary, and sentences follow natural length variations. For most client presentations, this produces text that looks convincingly like real content. However, for high-profile pitches where clients might notice the pattern, you may want to use alternatives like Hipster Ipsum or generate a larger variety to avoid repetition."
  },
  {
    question: "Can I use Lorem Ipsum in production websites?",
    answer: "Lorem Ipsum should only be used during the design and development phase. Before launching a production website, all placeholder text must be replaced with real, meaningful content. Search engines may index placeholder text, which can negatively impact your SEO. Additionally, leaving Lorem Ipsum visible to users looks unprofessional and suggests the site is unfinished. Always replace dummy text with final copy before going live."
  },
  {
    question: "Does this tool store or send my generated text anywhere?",
    answer: "No. This Lorem Ipsum Generator runs entirely in your browser. The word pool and generation algorithm are embedded in the client-side JavaScript code. No text is sent to any server, stored in a database, or tracked in any way. Your generated text exists only in your browser's memory until you copy it or close the page."
  },
  {
    question: "How is the word count, character count, and paragraph count calculated?",
    answer: "Word count is determined by splitting the generated text on whitespace and counting non-empty segments. Character count includes every character in the output, including spaces, punctuation, and line breaks. Paragraph count is based on the number of paragraph blocks in the generated text, separated by blank lines. These stats help you quickly verify that the generated text meets your design requirements without needing to use a separate word counting tool."
  },
]
