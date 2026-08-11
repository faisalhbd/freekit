import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert salary to hourly rate?",
    answer:
      "To convert annual salary to hourly rate, divide the salary by the total number of working hours per year. Formula: Hourly Rate = Annual Salary / (Hours per Week × Weeks per Year). For example, a $50,000 salary with 40 hours/week and 52 weeks: $50,000 / (40 × 52) = $24.04/hour. Use our <a href=\"/tools/finance/salary-to-hourly-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Salary to Hourly Calculator</a> to get all rate breakdowns instantly.",
  },
  {
    question: "How many weeks are in a work year?",
    answer:
      "A standard work year has 52 weeks. However, most full-time employees receive paid holidays and vacation. If you get 2 weeks of paid vacation and 10 paid holidays (2 weeks), you still work 52 weeks but only work 48 weeks. For the purpose of hourly rate calculation, use 52 weeks if you want the rate based on your actual pay (since paid time off is still compensated). Use fewer weeks only if you want to know your effective rate for hours actually worked.",
  },
  {
    question: "Should I use 52 weeks or subtract holidays?",
    answer:
      "It depends on what you want to calculate. Using 52 weeks gives you the nominal hourly rate — what your employer divides your salary by. Subtracting unpaid time off gives you the effective hourly rate for hours you actually spend working. Most salary-to-hourly conversions use 52 weeks because your salary covers all 52 weeks including paid holidays and vacation. Our calculator defaults to 52 weeks and lets you adjust if needed.",
  },
  {
    question: "What is the standard full-time work week?",
    answer:
      "In the United States, the standard full-time work week is 40 hours. Many countries have different standards: France has a 35-hour work week, the UK averages 37.5 hours, and Australia is 38 hours. Some professions also differ — healthcare workers may work 36 hours (three 12-hour shifts), and some tech companies have experimented with 32-hour weeks. Our calculator defaults to 40 hours but allows you to enter any custom value.",
  },
  {
    question: "How do I convert hourly rate to annual salary?",
    answer:
      "Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks per year. Formula: Annual Salary = Hourly Rate × Hours per Week × Weeks per Year. For example, $30/hour × 40 hours/week × 52 weeks = $62,400/year. Use the reverse mode in our calculator — switch to \"Hourly to Salary\" and enter your hourly rate to see the full breakdown.",
  },
  {
    question: "What is semi-monthly pay?",
    answer:
      "Semi-monthly pay means you receive 24 paychecks per year (twice per month), typically on the 1st and 15th or the 15th and last day of the month. To calculate: Semi-monthly Pay = Annual Salary / 24. This is different from bi-weekly pay, which gives 26 paychecks per year. Semi-monthly paychecks are slightly larger than bi-weekly ones but come less frequently.",
  },
  {
    question: "What is the difference between bi-weekly and semi-monthly?",
    answer:
      "Bi-weekly pay occurs every 2 weeks, resulting in 26 paychecks per year. Semi-monthly pay occurs twice per month, resulting in 24 paychecks per year. For a $60,000 salary: bi-weekly pay is $2,307.69 per paycheck, while semi-monthly pay is $2,500.00 per paycheck. Over the year, both total $60,000 but the distribution differs. Bi-weekly results in 2 months where you receive 3 paychecks.",
  },
  {
    question: "Does a higher salary always mean a higher hourly rate?",
    answer:
      "Not necessarily. A $70,000 salary at 50 hours/week yields $26.92/hour ($70,000 / 2,600 hours). A $65,000 salary at 40 hours/week yields $31.25/hour ($65,000 / 2,080 hours). The lower-salaried job actually pays more per hour. When comparing job offers, always convert to hourly rates — and factor in commute time, unpaid overtime, and benefits to get the true picture.",
  },
  {
    question: "How does overtime affect salaried employees?",
    answer:
      "In the US, most salaried employees earning above a certain threshold ($684/week under federal law, rising to $1,128/week in 2025) are exempt from overtime. However, some states have lower thresholds. Non-exempt salaried employees must receive overtime pay (typically 1.5×) for hours beyond 40 per week. If you regularly work overtime as a non-exempt employee, your effective hourly rate is higher than the nominal calculation suggests. Use our <a href=\"/tools/finance/overtime-pay-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Overtime Pay Calculator</a> to factor this in.",
  },
  {
    question: "How do I account for taxes in my hourly rate?",
    answer:
      "This calculator shows your gross (pre-tax) pay rates. To find your net hourly rate, you need to subtract federal income tax, state income tax, Social Security (6.2%), Medicare (1.45%), and any other deductions. As a rough estimate, subtract 20–35% from the gross rate depending on your tax bracket and state. For precise figures, use a dedicated tax calculator. The gross rate is still useful for comparing job offers before tax considerations.",
  },
]
