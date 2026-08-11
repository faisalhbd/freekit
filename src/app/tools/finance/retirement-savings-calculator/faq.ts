import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How much do I need to save for retirement?",
    answer:
      "A common guideline is to save 10-15 times your annual salary by retirement age. The 4% rule suggests you need 25 times your desired annual retirement income. For example, if you want $60,000/year in retirement, aim for $1.5 million. This calculator helps you project whether you're on track based on your current savings, contributions, and expected returns.",
  },
  {
    question: "What is a realistic annual return for retirement savings?",
    answer:
      "Historically, the US stock market (S&P 500) has returned about 10% per year before inflation, or 7% after inflation. A balanced portfolio of 60% stocks and 40% bonds has historically returned about 6-8% before inflation. For this calculator, a 7% return before inflation is a reasonable estimate for a growth-oriented portfolio. More conservative investors might use 5-6%.",
  },
  {
    question: "What is the 4% rule for retirement withdrawals?",
    answer:
      "The 4% rule states you can safely withdraw 4% of your retirement portfolio in the first year, then adjust that amount for inflation each year, with a high probability of not running out of money over a 30-year retirement. It's based on historical market returns. For a $1 million portfolio, that means $40,000 in the first year. The rule works best with a balanced portfolio and 30-year retirement. Some advisors now suggest 3-3.5% for longer retirements.",
  },
  {
    question: "Should I include Social Security in my retirement planning?",
    answer:
      "Yes, but don't rely on it as your primary income. The average Social Security benefit in 2025 is about $1,900/month ($22,800/year), and the maximum is about $4,873/month ($58,476/year). Social Security replaces about 40% of pre-retirement income for average earners. When using this calculator, you can set your desired retirement income as the amount needed after Social Security, or include Social Security separately in your planning.",
  },
  {
    question: "How does inflation affect my retirement savings?",
    answer:
      "Inflation erodes the purchasing power of your retirement savings. At 3% annual inflation, $1 million today will have the purchasing power of about $412,000 in 30 years. Your retirement income needs will also grow with inflation. This calculator includes an inflation rate input to show your savings in future dollars. Use our <a href=\"/tools/finance/inflation-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Inflation Calculator</a> to understand the impact of inflation on specific amounts.",
  },
  {
    question: "What happens if I start saving late for retirement?",
    answer:
      "Starting late means you need to save more aggressively. The power of compound interest is strongest over long periods. Someone starting at 25 needs to save about 10-15% of income, while someone starting at 40 may need to save 25-35%. Strategies include: maximizing catch-up contributions (2025 limit: $31,000 for 401(k) at 50+), delaying retirement, working part-time in retirement, and considering more aggressive investments if your timeline allows.",
  },
  {
    question: "Should I use pre-tax or after-tax accounts for retirement?",
    answer:
      "Both have advantages. Pre-tax accounts (traditional 401(k), IRA) reduce your current taxable income, but withdrawals are taxed as income. After-tax accounts (Roth 401(k), Roth IRA) use after-tax money, but qualified withdrawals are tax-free. A common strategy is to have both: pre-tax for immediate tax savings and to lower your current bracket, Roth for tax-free growth and flexibility in retirement. Consult a tax advisor for your specific situation.",
  },
  {
    question: "How often should I review my retirement plan?",
    answer:
      "Review your retirement plan at least annually, or whenever you have a major life change (job change, salary increase, marriage, child, inheritance). Annual reviews let you adjust contributions if you're off track. As you get closer to retirement (within 10 years), shift to more conservative investments and refine your income projections. This calculator is great for annual check-ins.",
  },
  {
    question: "What does 'surplus' or 'shortfall' mean in the results?",
    answer:
      "The surplus or shortfall compares your projected retirement balance to the amount needed to generate your desired retirement income. If you need $1.5 million to generate $60,000/year (using the 4% rule) and you project $1.8 million, you have a $300,000 surplus. If you only project $1.2 million, you have a $300,000 shortfall. A shortfall means you need to save more, retire later, or adjust your expected retirement lifestyle.",
  },
  {
    question: "How does this calculator handle the retirement withdrawal phase?",
    answer:
      "This calculator focuses on the accumulation phase — projecting your savings growth from now until retirement. The monthly income at retirement is estimated by dividing your total balance by the number of years in retirement, giving a simple monthly drawdown. For more sophisticated withdrawal strategies (like the 4% rule with inflation adjustments), you would need a more complex calculator. This tool helps you answer: 'Will I have enough saved by retirement age?'",
  },
]
