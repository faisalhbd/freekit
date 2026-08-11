import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I calculate a discount percentage?",
    answer:
      "To calculate a discount percentage, subtract the sale price from the original price to get the discount amount, then divide that by the original price and multiply by 100. For example, if an item was $80 and is now $60: ($80 − $60) / $80 × 100 = 25% discount. Our calculator handles this automatically — just enter the original price and the discount to see the results.",
  },
  {
    question: "What is the difference between a percentage discount and a fixed amount discount?",
    answer:
      "A percentage discount reduces the price by a specific percentage of the original price (e.g., 20% off $100 saves you $20). A fixed amount discount subtracts a set dollar amount from the price (e.g., $15 off $100 saves you $15). Percentage discounts scale with the price, while fixed discounts are the same regardless of the item's cost. Our calculator supports both types.",
  },
  {
    question: "How do double discounts or stacked discounts work?",
    answer:
      "Double discounts are applied sequentially, not added together. For example, 20% off followed by an extra 15% off on a $100 item: first discount gives $80, then the second discount is 15% of $80 (not $100), giving a final price of $68. The total effective discount is 32%, not 35%. Our calculator's optional second discount field handles this correctly.",
  },
  {
    question: "Does the order of multiple discounts matter?",
    answer:
      "Yes, the order matters when combining percentage and fixed-amount discounts. Applying a percentage discount first reduces the base for the fixed discount, while applying the fixed discount first removes a flat amount before the percentage is calculated. For example, with 20% off and $10 off on a $100 item: 20% first → $80 − $10 = $70, but $10 first → $90 with 20% off = $72. Always check which order gives you the better deal.",
  },
  {
    question: "How does tax affect the discounted price?",
    answer:
      "Tax is typically calculated on the discounted price (the price after all discounts are applied), not the original price. For example, a $100 item with a 25% discount costs $75, and with 8% sales tax the final price is $75 × 1.08 = $81.00. Our calculator lets you enter an optional tax rate to see the final price including tax.",
  },
  {
    question: "How do I calculate the original price from the sale price and discount percentage?",
    answer:
      "Divide the sale price by (1 − discount percentage / 100). For example, if the sale price is $60 after a 25% discount: $60 / (1 − 0.25) = $60 / 0.75 = $80 original price. You can use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> to verify these reverse calculations.",
  },
  {
    question: "Is a higher percentage discount always better?",
    answer:
      "Not necessarily. A larger percentage on a cheaper item may save less than a smaller percentage on a more expensive item. For example, 50% off a $20 item saves $10, while 15% off a $200 item saves $30. Always compare the actual dollar savings, not just the percentage. Our calculator shows both so you can make informed decisions.",
  },
  {
    question: "What is a good discount percentage?",
    answer:
      "A good discount depends on the product category and context. In retail, 10–20% is common for seasonal sales, 25–40% is considered a strong sale, and 50%+ is typically a clearance or special event price. During Black Friday or end-of-season clearance, 50–70% off is common. Always compare the final price across retailers rather than just the discount percentage.",
  },
  {
    question: "Can I use this calculator for service discounts?",
    answer:
      "Absolutely. This calculator works for any type of discount — retail products, services, subscriptions, software, and more. Enter the regular service price as the original price, then apply your discount. For recurring services, you can calculate your monthly or annual savings. For tax on services, use our <a href=\"/tools/calculator/vat-tax-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">VAT/Tax Calculator</a> for more detailed tax breakdowns.",
  },
  {
    question: "Is my data stored or sent to a server?",
    answer:
      "No. This discount calculator runs entirely in your browser using client-side JavaScript. None of the prices or values you enter are sent to any server, stored in any database, or shared with any third party. As soon as you close or refresh the page, all entered data is gone. Your privacy is fully protected.",
  },
]
