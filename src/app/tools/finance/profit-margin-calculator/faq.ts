import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is profit margin?",
    answer:
      "Profit margin is the percentage of revenue that remains as profit after accounting for all costs. It is calculated as (Selling Price - Cost Price) / Selling Price × 100. For example, if you sell a product for $100 and it costs you $60, your profit margin is (100 - 60) / 100 × 100 = 40%. A higher profit margin indicates a more profitable business. Businesses typically track gross profit margin, operating profit margin, and net profit margin separately.",
  },
  {
    question: "What is the difference between profit margin and markup?",
    answer:
      "Profit margin is calculated as a percentage of the selling price: Margin = (Profit / Selling Price) × 100. Markup is calculated as a percentage of the cost price: Markup = (Profit / Cost Price) × 100. For example, if you buy for $50 and sell for $75, your profit is $25, your margin is 33.3% ($25/$75), and your markup is 50% ($25/$50). Markup is always higher than margin for the same transaction. Use our <a href=\"/tools/finance/markup-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Markup Calculator</a> for detailed markup calculations.",
  },
  {
    question: "How do I calculate profit margin from cost and selling price?",
    answer:
      "Subtract the cost price from the selling price to get the profit: Profit = Selling Price - Cost Price. Then divide the profit by the selling price and multiply by 100: Margin % = (Profit / Selling Price) × 100. For example, a product costing $40 sold for $80 gives a profit of $40 and a margin of (40/80) × 100 = 50%. This calculator does this instantly — just enter your cost and selling price in Mode 1.",
  },
  {
    question: "How do I calculate selling price from a desired profit margin?",
    answer:
      "To find the selling price needed for a specific profit margin, use the formula: Selling Price = Cost Price / (1 - Desired Margin / 100). For example, if your product costs $50 and you want a 30% margin: Selling Price = 50 / (1 - 0.30) = 50 / 0.70 = $71.43. Your profit would be $21.43. Use Mode 2 in this calculator to compute this automatically — just enter your cost and desired margin percentage.",
  },
  {
    question: "What is a good profit margin for my business?",
    answer:
      "A good profit margin varies by industry. Software and SaaS companies typically have 60–80% gross margins. Retail businesses often operate on 20–50% margins. Restaurants usually have thin margins of 3–10%. Grocery stores operate on 1–3% margins due to high competition. The key is to compare your margin against industry averages and your own historical performance. A healthy net profit margin (after all expenses) for most businesses is 10–20%. Track your margin over time to spot trends and improve profitability.",
  },
  {
    question: "Why does my profit margin differ from my markup?",
    answer:
      "Margin and markup use different denominators in their calculations. Margin divides profit by selling price (the larger number), while markup divides profit by cost price (the smaller number). Since the same profit is divided by a smaller number in markup, markup is always higher than margin. For instance, a product costing $100 sold for $150 has a 33.3% margin but 50% markup. Confusing the two is a common pricing mistake — setting prices based on markup when you need to maintain a specific margin can lead to underpricing. Use this calculator's conversion feature to switch between them accurately.",
  },
  {
    question: "How does revenue relate to profit margin?",
    answer:
      "Revenue is the total income from sales before any costs are deducted. Profit margin tells you what percentage of that revenue is actual profit. If you sell 100 units at $50 each, your revenue is $5,000. If each unit costs $30, your total cost is $3,000 and your profit is $2,000. Your profit margin is ($2,000 / $5,000) × 100 = 40%. Revenue alone does not indicate profitability — a business with high revenue but low margins may be less profitable than one with lower revenue but higher margins.",
  },
  {
    question: "Can profit margin be negative?",
    answer:
      "Yes, a negative profit margin means you are selling at a loss — your cost exceeds your selling price. This is called a loss margin. For example, if you buy for $100 and sell for $80, your profit is -$20 and your margin is (-20/80) × 100 = -25%. Businesses may temporarily operate at negative margins for competitive reasons, to gain market share, or during startup phases. However, sustaining negative margins long-term is not viable without external funding. Use our <a href=\"/tools/finance/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> to ensure your discounts don't push margins negative.",
  },
  {
    question: "How do I improve my profit margin?",
    answer:
      "You can improve profit margins through several strategies: (1) Increase selling prices — even small increases can significantly boost margins. (2) Reduce costs — negotiate better supplier rates, optimize operations, or reduce waste. (3) Improve product mix — shift sales toward higher-margin products. (4) Increase sales volume — spread fixed costs over more units. (5) Reduce discounts and promotions — these directly erode margins. (6) Automate processes — reduce labor costs per unit. Track your margin regularly and set targets for improvement each quarter.",
  },
  {
    question: "What is the difference between gross margin and net margin?",
    answer:
      "Gross profit margin only accounts for the direct cost of goods sold (COGS). It is calculated as (Revenue - COGS) / Revenue × 100. Net profit margin accounts for all expenses including operating costs, taxes, interest, and depreciation: (Revenue - All Expenses) / Revenue × 100. This calculator computes gross profit margin. Net margin is always lower than gross margin. For example, a company with 60% gross margin might have only 15% net margin after accounting for salaries, rent, marketing, taxes, and other overhead expenses.",
  },
]
