import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is ROI (Return on Investment)?",
    answer:
      "ROI stands for Return on Investment. It is a financial metric used to evaluate the profitability of an investment. ROI is calculated as ((Final Value - Investment Cost) / Investment Cost) × 100. For example, if you invest $10,000 and it grows to $15,000, your ROI is ((15,000 - 10,000) / 10,000) × 100 = 50%. A positive ROI means profit, while a negative ROI means loss. It is one of the most widely used metrics for comparing the efficiency of different investments.",
  },
  {
    question: "How do I calculate ROI?",
    answer:
      "To calculate ROI, subtract your investment cost from the final value to get net profit, then divide that by the investment cost and multiply by 100. Formula: ROI = ((Final Value - Cost) / Cost) × 100. For instance, investing $5,000 that returns $7,500 gives: ((7,500 - 5,000) / 5,000) × 100 = 50% ROI. Use our <a href=\"/tools/finance/roi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">ROI Calculator</a> to compute this instantly — just enter your cost and final value.",
  },
  {
    question: "What is annualized ROI and why is it important?",
    answer:
      "Annualized ROI converts your total return into an equivalent yearly rate, allowing you to compare investments held for different time periods. Formula: Annualized ROI = ((Final Value / Cost) ^ (1 / Years) - 1) × 100. For example, a 50% return over 3 years equals ((1.50) ^ (1/3) - 1) × 100 = 14.47% annualized. This lets you fairly compare a 2-year stock investment with a 5-year real estate investment. Our calculator computes this automatically when you enter the investment period.",
  },
  {
    question: "What is a good ROI?",
    answer:
      "A \"good\" ROI depends on the investment type and risk level. Stock market returns historically average 7–10% annually after inflation. Real estate typically yields 8–12% annually. Venture capital investments target 25%+ annualized returns due to high risk. Savings accounts offer 1–5% ROI with minimal risk. For business investments, a common benchmark is exceeding the cost of capital (often 8–12%). Always compare ROI against your opportunity cost — the return you could earn elsewhere with similar risk.",
  },
  {
    question: "Can ROI be negative?",
    answer:
      "Yes, a negative ROI means you lost money on the investment. If you invest $10,000 and the final value is $8,000, your ROI is ((8,000 - 10,000) / 10,000) × 100 = -20%. This means you lost 20% of your investment. Negative ROI is common in stock market downturns, failed business ventures, and poorly performing assets. It is important to consider the time horizon — short-term negative ROI may recover, but consistent negative returns signal a poor investment.",
  },
  {
    question: "What is the difference between ROI and profit?",
    answer:
      "Profit is the absolute dollar amount gained or lost: Profit = Final Value - Investment Cost. ROI expresses profit as a percentage of the initial investment: ROI = (Profit / Cost) × 100. For example, a $500 profit on a $1,000 investment is a 50% ROI, while a $500 profit on a $10,000 investment is only a 5% ROI. ROI is better for comparing investments of different sizes, while profit tells you the actual dollar gain. Use our <a href=\"/tools/finance/profit-margin-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Profit Margin Calculator</a> for percentage-based profit analysis.",
  },
  {
    question: "How does ROI differ from compound interest returns?",
    answer:
      "Simple ROI measures total return over the entire period without considering compounding. Compound interest returns account for reinvested earnings that generate additional returns. For example, $10,000 at 10% simple ROI over 3 years yields $13,000, but at 10% compounded annually it yields $13,310. The difference grows larger with time and higher rates. For compound interest calculations, use our <a href=\"/tools/finance/compound-interest-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Compound Interest Calculator</a>. Annualized ROI bridges the gap by expressing total return as an equivalent yearly rate.",
  },
  {
    question: "Does ROI account for time?",
    answer:
      "Basic ROI does not account for the time period of the investment. A 50% ROI over 1 year is far better than a 50% ROI over 10 years. This is why annualized ROI is important — it normalizes returns to a per-year basis for fair comparison. Our calculator provides both total ROI and annualized ROI. When the investment period is 1 year or less, total ROI and annualized ROI are the same. For longer periods, annualized ROI will always be lower than the simple total ROI.",
  },
  {
    question: "How do I use ROI for business decisions?",
    answer:
      "Businesses use ROI to compare projects, marketing campaigns, and capital investments. Calculate ROI for each option and prioritize the highest returns. Example: Campaign A costs $5,000 and generates $12,000 in revenue (140% ROI). Campaign B costs $8,000 and generates $15,000 (87.5% ROI). Campaign A is more efficient. Also consider: minimum viable ROI thresholds (e.g., must exceed 15%), payback period, risk-adjusted ROI, and opportunity cost. ROI should be one of several metrics alongside NPV, IRR, and break-even analysis.",
  },
  {
    question: "What are the limitations of ROI?",
    answer:
      "ROI has several limitations: (1) It ignores the time value of money — a dollar today is worth more than a dollar in 5 years. (2) It does not account for risk — a 20% ROI on a risky stock is not directly comparable to a 20% ROI on government bonds. (3) It does not include ongoing costs like maintenance, taxes, or inflation. (4) It can be manipulated by changing what is included in \"cost\" or \"final value.\" (5) It does not measure cash flow timing. For a more complete picture, complement ROI with NPV, IRR, and payback period analyses.",
  },
]
