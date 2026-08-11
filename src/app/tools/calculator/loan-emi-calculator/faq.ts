import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is EMI and how is it calculated?",
    answer:
      "EMI stands for Equated Monthly Installment. It is the fixed monthly payment you make to repay a loan over a set period. EMI consists of two components: principal repayment and interest. In the early months of a loan, a larger portion of the EMI goes toward interest, while in later months, more goes toward the principal. The standard EMI formula is: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the total number of monthly installments.",
  },
  {
    question: "What is the EMI formula used by this calculator?",
    answer:
      "This calculator uses the standard reducing balance EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1). Here, P is the loan principal amount, r is the monthly interest rate (annual rate divided by 12 and by 100), and n is the loan tenure in months. This is the same formula used by banks and financial institutions worldwide for home loans, car loans, personal loans, and education loans. It accounts for the fact that interest is calculated on the outstanding balance, not the original principal.",
  },
  {
    question: "What is the difference between reducing balance and flat rate EMI?",
    answer:
      "With a reducing balance rate (used by this calculator), interest is calculated on the outstanding principal each month. As you pay down the loan, the interest portion decreases. This is the standard method used by most banks. With a flat rate, interest is calculated on the original principal throughout the loan tenure, regardless of how much you have repaid. Flat rate loans appear cheaper (lower percentage) but actually cost significantly more. For example, a 10% flat rate on a $100,000 loan over 5 years costs about 18.3% effective interest. Always ask your lender which method they use.",
  },
  {
    question: "How does prepayment affect my loan and EMI?",
    answer:
      "Making a prepayment (extra payment toward your principal) reduces the outstanding balance, which in turn reduces the interest charged in subsequent months. You generally have two options: reduce your EMI amount while keeping the same tenure, or keep the same EMI and shorten the loan tenure. Shortening the tenure saves more on total interest. For example, a single prepayment of $10,000 on a $500,000 loan at 8% for 20 years can save over $15,000 in total interest if you choose to reduce the tenure. Always check with your lender about prepayment charges before making extra payments.",
  },
  {
    question: "How does loan tenure affect my total interest payment?",
    answer:
      "Loan tenure has a significant impact on total interest. A longer tenure means lower monthly EMI payments, but you pay substantially more interest over the life of the loan. A shorter tenure increases your monthly EMI but dramatically reduces total interest. For a $300,000 loan at 8.5% interest: a 10-year tenure results in about $142,000 total interest (EMI ~$3,715), while a 30-year tenure results in about $443,000 total interest (EMI ~$2,306). That is $301,000 more in interest for the longer term. Use our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> to compare interest cost ratios.",
  },
  {
    question: "What types of interest rates do lenders offer?",
    answer:
      "Lenders offer two main types of interest rates: fixed and floating (variable). A fixed rate remains constant throughout the loan tenure, making your EMI predictable. A floating rate is tied to a benchmark (such as the central bank's repo rate) and can change periodically. Floating rates are typically lower than fixed rates at the start but carry the risk of increasing. Some lenders also offer a hybrid rate that is fixed for an initial period (e.g., 2-5 years) and then converts to floating. The calculator works with any fixed annual rate. For floating rate loans, use the current rate to estimate your current EMI.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a detailed table showing every monthly payment over the life of a loan, broken down into principal and interest components along with the remaining balance after each payment. In the early months, interest makes up a larger share of each EMI. As you progress, the principal portion grows and the interest portion shrinks. For example, on a $200,000 loan at 7.5% for 20 years, your first EMI of ~$1,599 might have $1,250 going to interest and only $349 to principal. By month 120, it flips to about $730 interest and $869 principal. Our calculator generates this complete schedule for you.",
  },
  {
    question: "How is EMI calculated for home loans specifically?",
    answer:
      "Home loan EMI uses the same reducing balance formula as other loans. Home loans typically have longer tenures (15-30 years) and larger principal amounts compared to other loans. Current home loan interest rates generally range from 6.5% to 9% depending on the lender, your credit score, and the loan amount. A typical home loan of $400,000 at 7.5% for 25 years gives an EMI of approximately $2,970. The total payment over 25 years would be about $891,000, meaning interest costs roughly $491,000 — more than the principal itself. Making even small prepayments can significantly reduce this interest burden.",
  },
  {
    question: "How is EMI calculated for car loans?",
    answer:
      "Car loan EMI also uses the reducing balance formula, but with shorter tenures (typically 3-7 years) compared to home loans. Car loan interest rates usually range from 5% to 12% depending on whether it is a new or used car, the lender, and your credit profile. For a $30,000 car loan at 6% for 5 years, the EMI would be approximately $580, with total interest of about $4,800. Some dealers offer 0% financing, but these often come with higher vehicle prices. Always compare the total cost (EMI × months) with the on-road price to determine if you are getting a good deal.",
  },
  {
    question: "How much EMI can I afford on my salary?",
    answer:
      "Financial experts recommend that your total EMI payments (across all loans) should not exceed 30-40% of your monthly take-home income. Banks typically approve loans where the EMI is within 40-50% of monthly income. For example, if your monthly income is $5,000, your total EMIs should ideally stay below $2,000. When budgeting for EMI, also account for insurance, maintenance, and emergency savings. A good rule of thumb is: if your EMI leaves you with less than 20% of your income for savings and discretionary spending, the loan may be too large. Use our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> to evaluate promotional loan offers.",
  },
]
