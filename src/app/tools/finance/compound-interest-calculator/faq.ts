import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which is only calculated on the principal), compound interest means your money grows exponentially over time because you earn interest on your interest. For example, $10,000 at 8% compounded annually grows to $10,800 after year one, but in year two you earn 8% on $10,800 (not $10,000), giving you $11,664. Over decades, this compounding effect produces dramatically larger returns than simple interest.",
  },
  {
    question: "What is the compound interest formula?",
    answer:
      "The standard compound interest formula is: A = P(1 + r/n)^(nt), where A is the future value, P is the principal, r is the annual interest rate (as a decimal), n is the number of times interest compounds per year, and t is the number of years. For example, $5,000 at 6% compounded monthly for 10 years: A = 5000 × (1 + 0.06/12)^(12×10) = 5000 × (1.005)^120 = $9,096.98. With monthly contributions, each contribution also compounds for the remaining time.",
  },
  {
    question: "How does compounding frequency affect my returns?",
    answer:
      "More frequent compounding produces slightly higher returns because interest starts earning interest sooner. For $10,000 at 8% for 20 years: annually compounded gives $46,610, quarterly gives $48,754, monthly gives $49,268, and daily gives $49,516. The difference between daily and annual compounding is about $2,906. While the difference seems small percentage-wise, it grows with higher rates and longer periods. Most savings accounts compound daily, while some investments compound monthly or quarterly.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick mental math shortcut to estimate how long it takes your money to double with compound interest. Divide 72 by your interest rate: at 6% interest, your money doubles in approximately 72/6 = 12 years. At 9%, it doubles in 8 years. At 12%, it doubles in 6 years. This is an approximation — it works best for rates between 4% and 12%. For more precise calculations, always use a compound interest calculator like this one.",
  },
  {
    question: "How do monthly contributions affect compound interest?",
    answer:
      "Monthly contributions dramatically accelerate wealth building because each contribution starts earning compound interest immediately. For example, $10,000 at 7% for 30 years grows to $76,123. But adding just $200/month grows to $265,667 — the additional contributions total $72,000, but the interest earned is $183,667. The earlier you start contributing, the more time each dollar has to compound. Starting 5 years earlier on a 30-year plan can add tens of thousands to your final balance.",
  },
  {
    question: "What is the difference between compound and simple interest?",
    answer:
      "Simple interest is calculated only on the original principal: Interest = P × r × t. Compound interest is calculated on the principal plus accumulated interest. For $10,000 at 10% for 20 years: simple interest gives $30,000 total ($10,000 principal + $20,000 interest). Compound interest (annually) gives $67,275 — more than double. The difference grows exponentially with time. Simple interest is used for some short-term loans and bonds, while compound interest is the standard for savings, investments, and most loans.",
  },
  {
    question: "How does inflation affect compound interest returns?",
    answer:
      "Inflation erodes the purchasing power of your returns. If your investment earns 6% compound interest but inflation is 3%, your real return is approximately 3% (more precisely: (1.06/1.03) - 1 = 2.91%). Over 20 years, $10,000 at 6% nominal grows to $32,071, but its purchasing power is equivalent to about $17,654 in today's dollars. When planning investments, always consider your real (inflation-adjusted) return, not just the nominal rate. Use this calculator for the nominal growth, then adjust for inflation in your planning.",
  },
  {
    question: "What is continuous compounding?",
    answer:
      "Continuous compounding is the theoretical limit where interest compounds infinitely many times per second. The formula is A = P × e^(rt), where e ≈ 2.71828. For practical purposes, daily compounding is nearly identical to continuous compounding. On $10,000 at 8% for 30 years: daily compounding gives $109,657, while continuous compounding gives $110,233 — a difference of only $576 or 0.5%. This calculator does not include continuous compounding because the difference from daily is negligible for practical financial planning.",
  },
  {
    question: "How can I maximize compound interest?",
    answer:
      "To maximize compound interest: (1) Start as early as possible — time is the most powerful factor in compound growth. (2) Contribute regularly — even small monthly additions compound significantly over decades. (3) Choose the highest interest rate available while managing risk. (4) Reinvest all earnings rather than withdrawing them. (5) Use tax-advantaged accounts (401k, IRA) to avoid taxes eroding your compounding. (6) Increase contributions annually, especially with raises. (7) Minimize fees — a 1% annual fee on a $100K investment over 30 years can cost over $100,000 in lost compound growth.",
  },
  {
    question: "Is compound interest used in loans and debt?",
    answer:
      "Yes — compound interest works against you with debt. Credit cards, mortgages, and most loans use compound interest, meaning you pay interest on your accumulated interest. This is why minimum payments on credit cards can keep you in debt for decades. A $5,000 credit card balance at 20% APR compounded daily grows rapidly if you only make minimum payments. To combat this, pay more than the minimum, prioritize high-interest debt, and use our <a href=\"/tools/calculator/loan-emi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Loan EMI Calculator</a> to create a repayment plan that minimizes total interest paid.",
  },
]
