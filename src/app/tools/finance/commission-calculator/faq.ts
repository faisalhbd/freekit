import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a commission?",
    answer:
      "A commission is a payment made to a salesperson or agent based on the value of sales they generate. It is typically a percentage of the sale amount but can also be a flat fee per sale. Commissions incentivize sales performance by directly linking earnings to results. They are common in real estate, insurance, financial services, retail, and B2B sales. The commission structure (flat, percentage, or tiered) is usually defined in the employment contract or sales agreement.",
  },
  {
    question: "What are the common types of commission structures?",
    answer:
      "The three most common commission structures are: (1) Flat Rate — a fixed amount per sale regardless of the sale value, commonly used in telecom and retail. (2) Percentage — a percentage of the total sale amount, common in real estate (typically 5-6%) and B2B sales (typically 10-20%). (3) Tiered — different commission rates apply to different portions of total sales, rewarding higher performance with higher rates. This calculator supports all three structures.",
  },
  {
    question: "How does tiered commission work?",
    answer:
      "Tiered commission applies different rates to different portions of your total sales. For example: 5% on the first $10,000, 7% on sales from $10,001 to $25,000, and 10% on all sales above $25,000. If you sell $30,000, your commission would be: ($10,000 × 5%) + ($15,000 × 7%) + ($5,000 × 10%) = $500 + $1,050 + $500 = $2,050. Tiered structures reward top performers and incentivize salespeople to push beyond each threshold.",
  },
  {
    question: "How is commission different from a salary?",
    answer:
      "A salary is a fixed regular payment regardless of sales performance. Commission is variable and depends directly on the sales you generate. Many sales positions use a combination: a base salary (guaranteed income) plus commission (performance incentive). A common split is 50/50, 60/40, or 70/30 (salary to commission). Use our <a href=\"/tools/finance/salary-to-hourly-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Salary to Hourly Calculator</a> to break down your base salary, then add your commission for total compensation.",
  },
  {
    question: "What is a good commission percentage?",
    answer:
      "A good commission percentage depends on the industry, product type, and whether you receive a base salary. Common ranges: Software/SaaS: 10-20%, Real estate: 5-6% (split with brokerage), Insurance: 10-25%, B2B sales: 10-15%, Retail: 1-5%, Freelance/Agency: 15-30%. For 100% commission roles (no base salary), rates should be higher to compensate for the income risk. The key is that total compensation (base + commission) should be competitive for your role and market.",
  },
  {
    question: "Do I pay tax on commission income?",
    answer:
      "Yes, commission is considered taxable income in most countries. It is typically taxed at the same rate as your regular salary income. However, because commission is supplemental income, employers may withhold tax at a higher flat rate (22% in the US for supplemental wages under $1M) rather than your regular tax bracket. This can lead to over-withholding. At tax filing time, all income (salary + commission) is combined and taxed at your marginal rate. Plan for potential tax liability by setting aside 25-35% of commission income.",
  },
  {
    question: "How do I calculate commission on returns or cancellations?",
    answer:
      "Most commission agreements include a clause for clawbacks on returned or cancelled sales. If a customer returns a product, the commission paid on that sale is deducted from your future earnings. For example, if you earned $500 commission on a $5,000 sale and the customer returns it, $500 will be deducted from your next commission payment. Some companies offer a grace period (e.g., 30 days) after which the commission is guaranteed. Always read your commission agreement carefully for return policies.",
  },
  {
    question: "Can commission be combined with bonuses?",
    answer:
      "Yes, many companies layer commissions with additional bonuses. Common structures include: Quota bonuses (extra payment for exceeding sales targets), SPIFs (Sales Performance Incentive Funds — short-term bonuses for specific products), end-of-year bonuses based on annual performance, and team bonuses for collective targets. When evaluating a total compensation package, combine your expected commission with all potential bonuses to understand your true earning potential. Use this calculator for the commission portion, then add expected bonus amounts separately.",
  },
  {
    question: "How do split commissions work?",
    answer:
      "Split commissions occur when multiple people share the commission from a single sale. Common in real estate (agent splits with brokerage), B2B sales (sales rep splits with account manager), and referral arrangements. For example, a 60/40 split on a $3,000 commission means the salesperson gets $1,800 and the partner gets $1,200. When calculating your earnings with split commissions, multiply the total commission by your split percentage. Some splits are multi-level, such as 50/25/25 among three parties.",
  },
  {
    question: "How can I maximize my commission earnings?",
    answer:
      "To maximize commission earnings: (1) Understand your commission structure fully — know your thresholds, rates, and bonus triggers. (2) Focus on higher-margin products that generate larger commissions. (3) Time big deals to cluster near thresholds for tiered structures. (4) Upsell and cross-sell to increase average deal size. (5) Build a pipeline to maintain consistent sales volume. (6) Track your progress toward quotas and bonuses weekly. (7) Negotiate better commission rates when you have a strong track record. (8) Consider the total value of multi-year contracts vs. one-time sales.",
  },
]
