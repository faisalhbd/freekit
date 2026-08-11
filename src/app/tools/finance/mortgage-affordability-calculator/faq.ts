import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the 28/36 rule for mortgage affordability?",
    answer:
      "The 28/36 rule is a standard guideline used by lenders to determine how much you can borrow. The front-end ratio (28%) means your total housing payment (principal, interest, property taxes, and insurance) should not exceed 28% of your gross monthly income. The back-end ratio (36%) means your total monthly debt payments (housing + all other debts) should not exceed 36% of gross monthly income. This calculator uses both ratios to determine the maximum housing payment you can afford.",
  },
  {
    question: "How is the maximum loan amount calculated?",
    answer:
      "The max loan amount is derived from the maximum monthly housing payment. Using the lower of the 28% income-based limit and the 36% DTI-based limit, the calculator subtracts estimated monthly property taxes and insurance to get the principal-and-interest (P&I) payment. It then uses the standard mortgage payment formula with your interest rate and loan term to calculate the loan amount that produces that P&I payment. Formula: Loan = P&I × [(1+r)^n - 1] / [r × (1+r)^n].",
  },
  {
    question: "What is included in a monthly mortgage payment?",
    answer:
      "A full monthly mortgage payment (PITI) includes four components: Principal (the loan repayment), Interest (the cost of borrowing), Property Taxes (estimated at ~1.1% of home value annually divided by 12), and Homeowners Insurance (estimated at ~0.5% of home value annually divided by 12). Some payments also include PMI (Private Mortgage Insurance) if your down payment is less than 20%. This calculator estimates taxes and insurance as percentages of the home value.",
  },
  {
    question: "How does the down payment affect affordability?",
    answer:
      "A larger down payment means you need a smaller loan, which reduces your monthly payment and total interest paid. It also helps you avoid PMI (required when down payment is under 20%). For example, on a $400,000 home, a 20% down payment ($80,000) means a $320,000 loan, while a 5% down payment ($20,000) means a $380,000 loan — resulting in significantly higher monthly payments and PMI costs.",
  },
  {
    question: "What credit score do I need to buy a house?",
    answer:
      "Minimum credit scores vary by loan type: FHA loans require 500-580 (with 10% down at 500, 3.5% at 580), conventional loans typically require 620-640, VA loans have no official minimum (lenders usually want 620+), and USDA loans require 640. The best interest rates go to borrowers with 740+ scores. A 100-point difference in credit score can mean 0.5-1.5% higher interest rate, costing tens of thousands over the loan life.",
  },
  {
    question: "How much should I save for a down payment?",
    answer:
      "Conventional wisdom says 20% down to avoid PMI, but many programs allow less. FHA requires 3.5%, conventional loans can go as low as 3%, and VA/USDA loans require 0% down. However, less than 20% means PMI ($50-$200+/month) and higher monthly payments. Also budget 2-5% of the home price for closing costs. On a $300,000 home, plan for at least $10,500 (3.5% down + 3% closing costs) but ideally $66,000+ (20% down + closing costs).",
  },
  {
    question: "Does the loan term affect how much I can afford?",
    answer:
      "Yes, significantly. A 30-year term has lower monthly payments, allowing you to qualify for a larger loan amount. A 15-year term has higher monthly payments but saves substantial interest. For example, on a $300,000 loan at 6.5%: 30-year payment is ~$1,896/month (total interest ~$382,000), while 15-year payment is ~$2,613/month (total interest ~$170,000). The shorter term saves $212,000 in interest but requires $717 more per month.",
  },
  {
    question: "What other costs should I budget for when buying a home?",
    answer:
      "Beyond the down payment and monthly mortgage, budget for: closing costs (2-5% of purchase price), home inspection ($300-$500), appraisal ($300-$500), moving costs ($500-$5,000), furniture and appliances, home maintenance (1-2% of home value annually), HOA fees (if applicable), utility setup fees, and potential repairs. First-year homeowners should have an emergency fund of 3-6 months of expenses including the new mortgage payment.",
  },
  {
    question: "How accurate is this mortgage affordability calculator?",
    answer:
      "This calculator provides a good estimate based on standard lending guidelines. Actual affordability depends on additional factors: credit score (affects interest rate), property tax rates in your specific area, insurance costs, HOA fees, PMI, debt types, and lender-specific requirements. Some lenders allow DTI up to 43-50% with compensating factors. For a precise pre-approval amount, contact multiple lenders. Use this calculator as a planning tool to understand your approximate budget.",
  },
  {
    question: "What is debt-to-income ratio (DTI)?",
    answer:
      "DTI ratio is the percentage of your gross monthly income that goes toward debt payments. Front-end DTI includes only housing costs (mortgage, taxes, insurance). Back-end DTI includes all monthly debts (housing, car loans, student loans, credit card minimums, child support). Lenders prefer back-end DTI under 36%, though some accept up to 43-50%. For example, if you earn $6,000/month and have $2,000 in total debt payments, your DTI is 33.3%. Lower DTI means better loan terms and easier approval.",
  },
]
