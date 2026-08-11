import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is percentage increase?",
    answer:
      "Percentage increase measures how much a value has grown relative to its original value, expressed as a percentage. For example, if a price goes from $100 to $120, the percentage increase is 20%. It tells you not just how much something changed, but how significant that change is compared to where it started.",
  },
  {
    question: "What is the formula for percentage increase?",
    answer:
      "The formula is: Percentage Increase = ((New Value − Original Value) / Original Value) × 100. First, subtract the original value from the new value to find the absolute change. Then, divide that change by the original value and multiply by 100 to get the percentage. For example: ((120 − 100) / 100) × 100 = 20%.",
  },
  {
    question: "What is the difference between percentage increase and percentage of a number?",
    answer:
      "Percentage of a number finds a portion of a value (e.g., 20% of 100 = 20). Percentage increase measures growth from one value to another (e.g., from 100 to 120 = 20% increase). The key difference is that percentage increase compares two related values and always references the original as the base, while 'percentage of' is simply a fraction of a single value. Use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> for the latter.",
  },
  {
    question: "How do I calculate a salary increase percentage?",
    answer:
      "Divide the raise amount by your current salary and multiply by 100. For example, if your salary goes from $50,000 to $55,000, the increase is $5,000. The percentage increase is (5,000 / 50,000) × 100 = 10%. This same method works for hourly wages, monthly rent, or any recurring amount.",
  },
  {
    question: "How do I calculate stock price growth as a percentage?",
    answer:
      "Use the same percentage increase formula with the original purchase price and the current price. If you bought a stock at $50 and it is now $75, the growth is ((75 − 50) / 50) × 100 = 50%. This calculation works for individual stocks, index funds, crypto, or any investment. It gives you a clear picture of your total return regardless of the dollar amounts involved.",
  },
  {
    question: "Can percentage increase be used to measure inflation?",
    answer:
      "Yes. Inflation is typically reported as a percentage increase in the Consumer Price Index (CPI) over a period. If the CPI goes from 250 to 260 in one year, the inflation rate is ((260 − 250) / 250) × 100 = 4%. Governments and economists use this exact formula to track how much the cost of goods and services has risen over time.",
  },
  {
    question: "What is the difference between compound and simple percentage increase?",
    answer:
      "Simple percentage increase applies to a single period — one original value and one new value. Compound increase applies the percentage growth repeatedly over multiple periods, where each period's growth builds on the previous total. For example, a 10% simple increase on $100 is $110. But 10% compounded over two years gives $100 × 1.10 × 1.10 = $121. Our calculator handles simple (single-period) increases.",
  },
  {
    question: "What does a negative percentage increase mean?",
    answer:
      "A negative percentage increase actually represents a decrease. If your original value is 200 and the new value is 150, the formula gives ((150 − 200) / 200) × 100 = −25%. This means the value dropped by 25%. In such cases, you would typically use a <a href=\"/tools/calculator/percentage-decrease-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Decrease Calculator</a> for clearer results.",
  },
  {
    question: "What are some real-world uses for percentage increase calculations?",
    answer:
      "Percentage increase is used everywhere: tracking salary raises and promotions, measuring investment and portfolio growth, analyzing year-over-year revenue growth for businesses, monitoring population growth, comparing test score improvements, evaluating website traffic growth, calculating price hikes in retail, and assessing inflation rates. Anytime you need to express how much something has grown relative to its starting point, percentage increase is the right metric.",
  },
  {
    question: "How accurate is this percentage increase calculator?",
    answer:
      "This calculator uses JavaScript's native floating-point arithmetic and provides results with up to 10 decimal places of precision. For everyday use cases — finance, salary calculations, business metrics — this level of precision is more than sufficient. The results are formatted for readability while preserving full accuracy, and all calculations happen instantly in your browser with no data sent to any server.",
  },
]
