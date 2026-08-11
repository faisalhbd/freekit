import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I calculate a percentage of a number?",
    answer:
      "To find a percentage of a number, multiply the number by the percentage and divide by 100. For example, 15% of 200 = (15 / 100) \u00d7 200 = 30. Our calculator does this instantly — just enter the percentage and the number, and the result appears in real time.",
  },
  {
    question: "What is the difference between percentage increase and percentage decrease?",
    answer:
      "Percentage increase measures how much a value has grown relative to the original value, using the formula ((New Value - Original Value) / Original Value) \u00d7 100. Percentage decrease measures how much a value has dropped, using the same formula but the result is negative. For instance, a price going from $80 to $100 is a 25% increase, while going from $100 to $80 is a 20% decrease.",
  },
  {
    question: "How do I calculate what percentage one number is of another?",
    answer:
      "Divide the part by the whole and multiply by 100. For example, if you scored 45 out of 60 on a test, the percentage is (45 / 60) \u00d7 100 = 75%. Use the \"X is what % of Y\" tab in our calculator for instant results.",
  },
  {
    question: "What is percentage difference and how is it different from percentage change?",
    answer:
      "Percentage difference measures the relative difference between two numbers without implying direction (which is larger). It uses the formula |A - B| / ((A + B) / 2) \u00d7 100, dividing by the average of the two values. Percentage change, on the other hand, measures the change from an original value to a new value and always has a direction (increase or decrease), dividing by the original value.",
  },
  {
    question: "How do I calculate a price after a discount or markup?",
    answer:
      "For a discount (decrease), multiply the original price by (1 - discount%/100). For a markup (increase), multiply by (1 + increase%/100). For example, a $50 item with a 20% discount costs $50 \u00d7 0.80 = $40. Our \"X decreased/increased by Y%\" tabs handle this automatically.",
  },
  {
    question: "Can I use this calculator for tips and gratuity?",
    answer:
      "Yes! To calculate a tip, use the \"What is X% of Y?\" tab. Enter the tip percentage (e.g., 18%) as X and the bill amount as Y. For example, 18% of $85 = $15.30. You can also use our dedicated <a href=\"/tools/calculator/tip-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Tip Calculator</a> for a more detailed bill-splitting experience.",
  },
  {
    question: "Why do percentage increase and decrease from the same values differ?",
    answer:
      "This is a common source of confusion. A 50% increase followed by a 50% decrease does not return you to the original value. For example, $100 increased by 50% = $150, then $150 decreased by 50% = $75. This happens because the percentage is applied to a different base value each time — the increase is based on $100, but the decrease is based on $150.",
  },
  {
    question: "How accurate is this percentage calculator?",
    answer:
      "This calculator uses JavaScript's built-in floating-point arithmetic and provides results with up to 10 decimal places for precision. For most everyday uses (finance, shopping, grades), this level of precision is more than sufficient. Results are formatted to a reasonable number of decimal places for readability, with the option to see full precision.",
  },
  {
    question: "Is my data stored or sent to a server?",
    answer:
      "No. This percentage calculator runs entirely in your browser using client-side JavaScript. None of the numbers you enter are sent to any server, stored in any database, or shared with any third party. As soon as you close or refresh the page, all entered data is gone.",
  },
  {
    question: "What are some real-world uses for percentage calculations?",
    answer:
      "Percentages are used everywhere: calculating sales tax and discounts while shopping, determining tip amounts at restaurants, analyzing investment returns and stock price changes, figuring out grade averages in school, measuring body fat changes, comparing price differences between stores, and calculating salary raises or inflation rates. Our calculator covers all these scenarios with its five calculation modes.",
  },
]
