import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I calculate my freelance hourly rate?",
    answer:
      "The formula is: Required Revenue = (Desired Salary + Business Expenses) / (1 - Tax Rate). Then divide Required Revenue by your total billable hours per year. Billable hours = (Working days per week × 52 weeks - vacation days - sick days) × billable hours per day. This calculator performs this entire calculation automatically.",
  },
  {
    question: "What is a good freelance hourly rate?",
    answer:
      "Freelance rates vary widely by skill and industry. Software developers charge $75-$250/hr, designers $50-$150/hr, writers $30-$100/hr, consultants $100-$500/hr, marketers $50-$150/hr. Your rate should cover salary equivalent, business expenses, taxes, and provide a buffer for non-billable time. Most freelancers undercharge — calculate your true costs first and set rates accordingly.",
  },
  {
    question: "Why is my calculated rate higher than I expected?",
    answer:
      "This is normal. Freelancers pay self-employment tax (15.3% in the US), fund their own benefits (health insurance, retirement), have business expenses (software, equipment, marketing), and lose productive time to non-billable work (admin, invoicing, marketing, sales). A $50,000 salary employee may need to charge $75-$100/hr as a freelancer to maintain the same standard of living.",
  },
  {
    question: "How many billable hours should I expect per day?",
    answer:
      "Most freelancers can bill 4-6 hours per 8-hour workday. The remaining time goes to administrative tasks, email, project management, client communication, marketing, and professional development. Junior freelancers often bill only 3-4 hours; experienced freelancers with efficient systems may reach 6-7 hours. Be conservative in your estimate to avoid underpricing.",
  },
  {
    question: "How does self-employment tax affect my rate?",
    answer:
      "In the US, self-employed individuals pay 15.3% in FICA taxes (7.65% employer + 7.65% employee equivalent). This is on top of income tax. Combined, a freelancer in a moderate-tax state might pay 30-40% total in taxes. This calculator includes the tax rate field so you can account for both income tax and self-employment tax. Use your effective total tax rate for accuracy.",
  },
  {
    question: "What business expenses should freelancers budget for?",
    answer:
      "Common annual freelance business expenses include: health insurance ($4,000-$12,000), retirement contributions, professional liability insurance ($500-$2,000), software subscriptions ($500-$3,000), equipment and hardware ($500-$3,000), coworking space ($2,000-$12,000), accounting/bookkeeping ($500-$2,000), marketing/advertising ($1,000-$5,000), professional development ($500-$2,000), internet and phone ($1,000-$2,000), and office supplies. Total business expenses often range from $10,000-$40,000/year.",
  },
  {
    question: "Should I charge by the hour or by the project?",
    answer:
      "Both have pros and cons. Hourly billing is transparent and ensures you are paid for scope changes, but caps your earnings as you get faster. Project-based (value-based) pricing rewards efficiency and can yield higher effective rates, but requires accurate scope estimation and strong contracts. Many experienced freelancers use a hybrid: quote a project price based on their hourly rate × estimated hours, with a clause for scope changes beyond the estimate.",
  },
  {
    question: "How many vacation days should I plan for?",
    answer:
      "Plan for at least 2-3 weeks (10-15 business days) of vacation per year, plus 3-5 sick days. Unlike employees, freelancers do not get paid time off — your rate needs to cover the income you lose while not working. Many freelancers budget for 4+ weeks total time off. If you take only 1 week off, you risk burnout which costs more in the long run.",
  },
  {
    question: "How do I raise my freelance rates?",
    answer:
      "Raise rates annually by 5-10% for existing clients (give 30-60 days notice). New clients always get your current rate. Justify increases with: expanded skills, portfolio growth, market demand, inflation. If clients resist, offer options: maintain old rate with reduced scope, or new rate with added value. Most clients expect and accept reasonable annual increases. The biggest mistake is not raising rates at all.",
  },
  {
    question: "How does working days per week affect my rate?",
    answer:
      "Fewer working days per week means fewer billable hours, requiring a higher hourly rate to meet the same annual revenue target. For example, if you work 4 days/week instead of 5, you lose 20% of your capacity and need to increase your rate by ~25% to compensate (since fixed costs remain the same). Many part-time freelancers discover they need surprisingly high rates to replace full-time income.",
  },
]
