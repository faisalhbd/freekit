import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is markup?",
    answer:
      "Markup is the amount added to the cost price of a product to arrive at the selling price. It is expressed as a percentage of the cost price. For example, if a product costs $100 and you apply a 50% markup, you add $50 (50% of $100) to get a selling price of $150. Markup is the most common pricing method used by retailers, wholesalers, and manufacturers to set prices from their costs.",
  },
  {
    question: "How do I calculate selling price from cost and markup?",
    answer:
      "The formula is: Selling Price = Cost Price × (1 + Markup / 100). For example, if your product costs $75 and you want a 40% markup: Selling Price = $75 × 1.40 = $105. The profit would be $30. This is the most straightforward pricing calculation and is what this calculator computes in its main section.",
  },
  {
    question: "What is the difference between markup and margin?",
    answer:
      "Markup is calculated on cost price: Markup = (Profit / Cost) × 100. Margin is calculated on selling price: Margin = (Profit / Selling Price) × 100. For the same transaction, markup is always higher than margin. A product costing $50 sold for $80 has a 60% markup but only a 37.5% margin. Confusing the two is the most common pricing mistake businesses make. Use our <a href=\"/tools/finance/profit-margin-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Profit Margin Calculator</a> for margin-specific calculations.",
  },
  {
    question: "How do I convert margin to markup?",
    answer:
      "The conversion formula is: Markup = Margin / (1 - Margin). Convert the margin percentage to a decimal first. For example, to convert a 30% margin: Markup = 0.30 / (1 - 0.30) = 0.30 / 0.70 = 0.4286 = 42.86% markup. This calculator has a built-in conversion section that does this instantly — just enter either percentage and see the equivalent.",
  },
  {
    question: "How do I convert markup to margin?",
    answer:
      "The conversion formula is: Margin = Markup / (1 + Markup). Convert markup to a decimal first. For example, a 50% markup: Margin = 0.50 / (1 + 0.50) = 0.50 / 1.50 = 0.3333 = 33.33% margin. The conversion section in this calculator handles both directions — enter a markup to see the equivalent margin, or vice versa.",
  },
  {
    question: "What is a good markup percentage?",
    answer:
      "A good markup depends on your industry, costs, competition, and business model. Retail typically uses 50–100% markup. Grocery stores use 15–30%. Apparel often uses 100–300% markup. Software products can have 500%+ markup due to near-zero marginal cost. The key is that your markup must cover all your costs (not just COGS) and provide a reasonable profit. Start by calculating your total cost including overhead, then apply a markup that achieves your target profit. Use our <a href=\"/tools/finance/profit-margin-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Profit Margin Calculator</a> to verify the resulting margin is healthy.",
  },
  {
    question: "Why do businesses use markup pricing?",
    answer:
      "Markup pricing (also called cost-plus pricing) is popular because it is simple, transparent, and ensures costs are covered. You take your cost, add a standard markup percentage, and set the price. It works well when: (1) costs are stable and predictable, (2) competition is not purely price-based, (3) you sell a variety of products and need a consistent pricing approach. The downside is it does not consider demand, competitor prices, or perceived value — which is why many businesses combine markup pricing with market research.",
  },
  {
    question: "Can markup be negative?",
    answer:
      "Technically yes, a negative markup means selling below cost (at a loss). This happens with loss leaders — products sold below cost to attract customers who buy other profitable items. For example, a grocery store might sell milk at a 5% loss (negative markup) knowing customers will also buy high-margin snacks. However, sustained negative markup across your product line means your business is losing money on every sale and cannot survive long-term.",
  },
  {
    question: "How does markup relate to gross margin?",
    answer:
      "Gross margin and markup are two ways of expressing the same profit, but from different perspectives. If you have a 60% markup on a $100 cost (selling at $160), your gross margin is ($60 / $160) × 100 = 37.5%. Your income statement will show 37.5% gross margin. Your pricing spreadsheet should use 60% markup. Both numbers tell you something different: markup helps you set prices, margin tells you how profitable your sales are.",
  },
  {
    question: "How do VAT and tax affect my markup calculation?",
    answer:
      "When calculating markup, you should always work with prices excluding tax. If your cost includes tax, subtract it first. If your selling price must include VAT/sales tax, calculate your markup on the pre-tax price, then add tax on top. For example, if your cost is $100 (ex-tax), you apply a 40% markup to get $140 (ex-tax), then add 20% VAT to get a final shelf price of $168. Use our <a href=\"/tools/calculator/vat-tax-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">VAT/Tax Calculator</a> to handle tax-inclusive and tax-exclusive price conversions.",
  },
]
