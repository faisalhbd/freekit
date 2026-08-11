import { FAQSection } from "@/components/shared/faq-section"
import type { FAQItem } from "@/types"

const faqs: FAQItem[] = [
  {
    question: "What is FreeKit?",
    answer:
      "FreeKit is a collection of free online tools for developers, SEO professionals, designers, students, content creators, and everyday users.",
  },
  {
    question: "Are all tools completely free?",
    answer:
      "Yes. Every tool on FreeKit is free to use without subscriptions or hidden charges.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can use all tools instantly without creating an account.",
  },
  {
    question: "Is my data stored?",
    answer:
      "No. Most tools process data locally in your browser, and we do not permanently store your inputs.",
  },
  {
    question: "Can I use FreeKit on mobile devices?",
    answer:
      "Yes. Every tool is fully responsive and works on smartphones, tablets, laptops, and desktop computers.",
  },
  {
    question: "How often are new tools added?",
    answer:
      "We regularly add new tools and improve existing ones based on user feedback and industry needs.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "FreeKit supports all modern browsers, including Chrome, Edge, Firefox, Safari, and other Chromium-based browsers.",
  },
  {
    question: "Can I share these tools with others?",
    answer:
      "Absolutely. You are welcome to share FreeKit with friends, colleagues, students, and your team.",
  },
]

export function HomepageFAQSection() {
  return (
    <section
      className="py-16 md:py-20 bg-muted/30"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQSection items={faqs} />
      </div>
    </section>
  )
}