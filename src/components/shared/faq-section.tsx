import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQItem } from "@/types"

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export function FAQSection({ items, title = "Frequently Asked Questions", className }: FAQSectionProps) {
  if (items.length === 0) return null

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
        {title}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-sm font-medium leading-relaxed">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}