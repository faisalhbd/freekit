import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the Reading Time Calculator work?",
    answer: "The calculator analyzes your text to count words, characters, sentences, and paragraphs. It then divides the word count by your selected reading speed (measured in words per minute) to estimate the total reading time. Speaking time is calculated similarly using a separate, adjustable speaking speed. All calculations happen instantly in your browser with no server processing."
  },
  {
    question: "What is the average reading speed?",
    answer: "The average adult reading speed is approximately 200-250 words per minute (WPM) for non-technical content. Technical material, legal documents, and academic papers are typically read at 100-150 WPM. The default setting of 200 WPM in this tool represents a comfortable, moderately fast reading pace. Skim readers may process 300-400 WPM, while careful readers analyzing complex content may read at 100-150 WPM."
  },
  {
    question: "What is the average speaking speed?",
    answer: "The average speaking speed for presentations and conversations is approximately 130-150 words per minute. Professional speakers may speak at 150-160 WPM, while conversational speech tends to be around 120-130 WPM. The default of 130 WPM in this tool represents a clear, measured speaking pace suitable for presentations, audiobooks, and video scripts."
  },
  {
    question: "How accurate is the reading time estimate?",
    answer: "The reading time is an estimate based on word count divided by reading speed. Actual reading time varies based on text complexity, reader familiarity with the topic, distractions, and reading purpose (skimming vs. careful reading). For most general content, the estimate is accurate within ±15-20%. Technical or dense content may take longer than estimated."
  },
  {
    question: "Can I adjust the reading speed?",
    answer: "Yes, the reading speed slider allows you to adjust from 100 to 400 words per minute. Use lower values (100-150 WPM) for technical or complex content, medium values (200-250 WPM) for general articles and blog posts, and higher values (300-400 WPM) for estimating skim-reading time. Find the speed that best matches your audience."
  },
  {
    question: "What statistics does the tool provide?",
    answer: "The tool calculates and displays: word count (total number of words), character count (with and without spaces), sentence count (based on period, exclamation, and question mark endings), paragraph count (based on line breaks), estimated reading time (formatted as minutes:seconds), estimated speaking time (formatted as minutes:seconds), and a visual progress bar showing reading time on a scale."
  },
  {
    question: "What is the progress bar showing?",
    answer: "The visual progress bar provides an at-a-glance indication of the reading time relative to common content lengths. It helps you quickly assess whether your text is a quick read (under 3 minutes), medium-length article (3-10 minutes), or long-form content (over 10 minutes). This is useful for blog post planning and ensuring your content meets target length expectations."
  },
  {
    question: "Can I use this for blog post planning?",
    answer: "Absolutely. The reading time estimate is commonly used in blog posts and articles to set reader expectations. Many popular blogs display 'X min read' badges on their posts. Use this tool during the writing process to ensure your content meets your target reading time, or to generate the reading time label to display on your published content."
  },
  {
    question: "Is my text data kept private?",
    answer: "Yes, all text analysis and time calculations are performed entirely within your browser. Your text is never sent to any server, stored, or tracked. You can safely analyze unpublished drafts, confidential documents, or any sensitive content without privacy concerns."
  },
  {
    question: "Does the tool count words in languages other than English?",
    answer: "The tool counts words by splitting text on whitespace, which works for most languages that use spaces between words (English, Spanish, French, German, etc.). For languages without spaces between words (Chinese, Japanese, Thai), the word count may not be accurate, and the time estimates will be less reliable. Sentence detection is optimized for English punctuation."
  },
]
