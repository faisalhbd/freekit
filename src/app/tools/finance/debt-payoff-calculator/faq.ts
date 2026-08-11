import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the debt snowball method?",
    answer:
      "The debt snowball method, popularized by Dave Ramsey, involves paying off debts in order from smallest balance to largest, regardless of interest rate. You make minimum payments on all debts and put any extra money toward the smallest balance. Once that debt is paid off, you roll its payment into the next smallest. The psychological boost of quick wins helps maintain motivation, even though it may cost more in total interest.",
  },
  {
    question: "What is the debt avalanche method?",
    answer:
      "The debt avalanche method involves paying off debts in order from highest interest rate to lowest, regardless of balance. You make minimum payments on all debts and direct extra money to the debt with the highest rate. Mathematically, this always results in the lowest total interest paid and fastest payoff. It's the most financially optimal strategy, though it may take longer to see the first debt fully paid off.",
  },
  {
    question: "Which method saves more money?",
    answer:
      "The debt avalanche method always saves more money in interest because it targets the highest rates first. The difference can be significant — hundreds or thousands of dollars depending on your debt mix. If you have a high-interest credit card at 24% and a low-interest car loan at 4%, the avalanche method attacks the credit card first, preventing rapid interest accumulation. This calculator shows you the exact dollar difference between the two methods.",
  },
  {
    question: "Which method should I choose?",
    answer:
      "Choose the method that best fits your personality: Choose Snowball if you need quick wins to stay motivated, have similar interest rates across debts, or struggle with financial discipline. Choose Avalanche if you're motivated by saving the most money, have large interest rate differences between debts, or are comfortable delaying gratification for better results. Some people start with snowball for motivation, then switch to avalanche once they see progress.",
  },
  {
    question: "How much extra should I pay toward debt?",
    answer:
      "Pay as much as you can beyond the minimums. Every extra dollar goes directly toward reducing principal. Common strategies include: the 50/30/20 budget rule (20% toward debt/savings), allocating windfalls (tax refunds, bonuses), cutting discretionary spending, or increasing income with a side gig. Even an extra $100/month can save thousands in interest and shave years off your payoff timeline.",
  },
  {
    question: "Should I include a mortgage in my debt payoff plan?",
    answer:
      "It depends. Mortgages typically have the lowest interest rates (3-7%) and are secured by your home. Most financial advisors recommend prioritizing high-interest unsecured debt (credit cards, personal loans) first. Include your mortgage in this calculator if you want to see the full picture, but focus extra payments on higher-rate debts. Once high-interest debt is eliminated, you can decide whether to pay off the mortgage early or invest the difference.",
  },
  {
    question: "What if I can only make minimum payments?",
    answer:
      "If you can only make minimum payments, both methods produce the same result since there's no extra money to allocate. In this case, focus on increasing your income or reducing expenses to free up even $50-100/month for extra payments. Also consider: balance transfer cards (0% APR for 12-21 months), debt consolidation loans, negotiating lower rates with creditors, or seeking help from a non-profit credit counseling agency.",
  },
  {
    question: "How does this calculator handle the month-by-month schedule?",
    answer:
      "For each month, the calculator: (1) Applies minimum payments to all debts. (2) Allocates the extra payment to the target debt (smallest balance for Snowball, highest rate for Avalanche). (3) Calculates interest on remaining balances. (4) Moves to the next debt when one is fully paid off, rolling the freed-up payment into the next target. The schedule shows balance remaining after each monthly payment until all debts reach zero.",
  },
  {
    question: "Can I change the order of my debt payments?",
    answer:
      "The Snowball and Avalanche methods define specific ordering rules. If you want a custom order (e.g., pay off the most stressful debt first), you would need to sort your debts manually. The Snowball sorts by balance ascending, and Avalanche sorts by interest rate descending. You can effectively create a custom order by adjusting balances or rates slightly, but the calculator is designed to compare these two proven strategies.",
  },
  {
    question: "Does paying off debt early hurt my credit score?",
    answer:
      "Paying off debt early generally helps or has a neutral effect on your credit score. The main factor affected is your credit utilization ratio (how much of your available credit you're using), which improves when balances drop. The only potential negative is if you close the account after payoff, which reduces your total available credit. Keep accounts open but unused for the best score impact. The credit score benefit of being debt-free far outweighs any minor, temporary effects.",
  },
]
