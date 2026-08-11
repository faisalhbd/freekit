import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is percentage decrease?",
    answer:
      "Percentage decrease measures how much a value has declined relative to its original value, expressed as a percentage. For example, if a price drops from $100 to $80, the percentage decrease is 20%. It tells you not just how much something fell, but how significant that decline is compared to where it started.",
  },
  {
    question: "What is the formula for percentage decrease?",
    answer:
      "The formula is: Percentage Decrease = ((Original Value − New Value) / Original Value) × 100. First, subtract the new value from the original to find the absolute drop. Then, divide that drop by the original value and multiply by 100. For example: ((100 − 80) / 100) × 100 = 20% decrease.",
  },
  {
    question: "How do I calculate a price drop percentage?",
    answer:
      "Subtract the new (lower) price from the original price, divide by the original price, and multiply by 100. If a laptop was $1,200 and is now $900, the decrease is ((1,200 − 900) / 1,200) × 100 = 25%. This is the same method used by our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> for sale prices.",
  },
  {
    question: "What is the difference between percentage decrease and absolute decrease?",
    answer:
      "Absolute decrease is the simple numerical difference between two values (e.g., $100 − $80 = $20 drop). Percentage decrease expresses that same drop relative to the original value (e.g., $20 / $100 = 20%). A $20 drop on a $1,000 item is only 2%, while the same $20 drop on a $25 item is 80% — percentage decrease reveals the true scale of the change.",
  },
  {
    question: "Can percentage decrease exceed 100%?",
    answer:
      "When the new value is positive, the maximum percentage decrease is 100% (the value drops to zero). However, if the new value is negative (e.g., a bank balance going from $500 to −$200), the decrease can exceed 100%. In that case, ((500 − (−200)) / 500) × 100 = 140% decrease. This is common in financial loss reporting and deficit analysis.",
  },
  {
    question: "How do I calculate a budget cut percentage?",
    answer:
      "Apply the same percentage decrease formula to your original and reduced budget amounts. If your department budget was cut from $500,000 to $400,000, the decrease is ((500,000 − 400,000) / 500,000) × 100 = 20%. This applies to government budgets, project budgets, household expenses, and any scenario where spending is reduced.",
  },
  {
    question: "What does a negative percentage decrease mean?",
    answer:
      "A negative percentage decrease actually represents an increase. If your original value is 100 and the new value is 120, the formula gives ((100 − 120) / 100) × 100 = −20%. This means the value grew by 20% instead of declining. Our calculator detects this automatically and shows a green upward arrow to indicate an unexpected increase. For dedicated increase calculations, use our <a href=\"/tools/calculator/percentage-increase-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Increase Calculator</a>.",
  },
  {
    question: "How is percentage decrease used in business and finance?",
    answer:
      "Businesses use percentage decrease to track declining revenue, shrinking market share, falling stock prices, reduced operating costs, customer churn rates, and budget cuts. It is a key metric in quarterly earnings reports, year-over-year comparisons, and performance dashboards. A consistent percentage decrease in revenue signals potential trouble, while a decrease in costs signals efficiency improvements.",
  },
  {
    question: "How do I calculate weight loss as a percentage?",
    answer:
      "Divide the weight lost by your starting weight and multiply by 100. If you started at 200 lbs and now weigh 180 lbs, the decrease is ((200 − 180) / 200) × 100 = 10%. Health professionals often use percentage-based body weight change to assess progress because it accounts for different starting sizes — a 10 lb loss means very different things for someone at 150 lbs versus 300 lbs.",
  },
  {
    question: "How accurate is this percentage decrease calculator?",
    answer:
      "This calculator uses JavaScript's native floating-point arithmetic and provides results with up to 4 decimal places of precision. For everyday use cases — finance, pricing, health metrics, business analysis — this level of precision is more than sufficient. All calculations happen instantly in your browser with no data sent to any server, ensuring complete privacy.",
  },
]
