import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is overtime pay?",
    answer:
      "Overtime pay is additional compensation for hours worked beyond the standard work week (typically 40 hours in the US). Under the federal Fair Labor Standards Act (FLSA), non-exempt employees must receive at least 1.5 times their regular hourly rate for any hours worked over 40 in a work week. This is commonly called \"time and a half.\" Some employers or states require double-time (2×) pay for hours exceeding a second threshold, such as hours beyond 48 or 52 in a week.",
  },
  {
    question: "How is overtime pay calculated?",
    answer:
      "Overtime pay is calculated in three steps: (1) Determine overtime hours: Overtime Hours = Total Hours Worked - Regular Hours. (2) Calculate overtime rate: Overtime Rate = Regular Hourly Rate × Overtime Multiplier (usually 1.5). (3) Calculate overtime pay: Overtime Pay = Overtime Hours × Overtime Rate. For example, if you earn $20/hour, work 48 hours in a week, and get 1.5× overtime: 8 OT hours × ($20 × 1.5) = 8 × $30 = $240 in overtime pay. Use our <a href=\"/tools/finance/overtime-pay-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Overtime Pay Calculator</a> to compute this instantly.",
  },
  {
    question: "What is the difference between time and a half and double time?",
    answer:
      "Time and a half (1.5×) pays you 150% of your regular hourly rate for overtime hours. Double time (2×) pays you 200% of your regular rate. In the US, federal law requires at least 1.5× for hours over 40 per week. Some states (like California) require double time for hours beyond a certain threshold (e.g., beyond 12 hours in a day or beyond 8 hours on the 7th consecutive day). Some union contracts or employers also offer double time. For a $20/hour rate: time and a half = $30/hour, double time = $40/hour.",
  },
  {
    question: "Are salaried employees entitled to overtime?",
    answer:
      "It depends on whether the employee is \"exempt\" or \"non-exempt\" under the FLSA. Exempt employees (generally those earning above a salary threshold and performing executive, administrative, or professional duties) are not entitled to overtime. Non-exempt salaried employees must receive overtime pay. The federal salary threshold for exemption is $684/week (rising to $1,128/week in 2025). Some states have lower thresholds, making more employees eligible for overtime. If you are a non-exempt employee, use our <a href=\"/tools/finance/salary-to-hourly-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Salary to Hourly Calculator</a> to determine your hourly rate, then calculate overtime.",
  },
  {
    question: "How does two-tier overtime work?",
    answer:
      "Two-tier overtime applies different rates for different levels of overtime. For example, in California: hours 40–48 in a week are paid at 1.5×, and hours beyond 48 are paid at 2×. If you work 52 hours at $20/hour: 40 regular hours at $20 = $800, 8 OT hours at $30 (1.5×) = $240, and 4 double-time hours at $40 (2×) = $160. Total: $1,200. Our calculator supports two-tier overtime — enter your first-tier threshold and second-tier rate to see the breakdown.",
  },
  {
    question: "Is overtime calculated daily or weekly?",
    answer:
      "Under federal law (FLSA), overtime is calculated weekly — you must exceed 40 hours in a 7-day workweek to qualify. Some states have daily overtime requirements. California requires overtime for hours beyond 8 in a single day and double time beyond 12. Alaska requires overtime for hours beyond 8 in a day. Colorado requires overtime for hours beyond 12 in a day. Our calculator focuses on weekly overtime calculation, which is the most common method.",
  },
  {
    question: "What if I work overtime on holidays or weekends?",
    answer:
      "Under federal law, there is no requirement for additional pay on holidays or weekends unless those hours push your weekly total over 40. However, many employers offer premium pay (1.5× or 2×) for holiday and weekend work as a company policy or union agreement. If your employer pays holiday premium AND the hours count toward weekly overtime, you receive the higher of the two rates, not both stacked (in most cases). Check your employment contract or employee handbook for your specific policy.",
  },
  {
    question: "Do part-time employees get overtime?",
    answer:
      "Yes, part-time employees who are classified as non-exempt are entitled to overtime pay under the FLSA if they work more than 40 hours in a work week. The overtime threshold is the same regardless of whether you are full-time or part-time. For example, a part-time employee who normally works 20 hours/week but picks up extra shifts and reaches 45 hours is entitled to 5 hours of overtime pay at 1.5× their regular rate.",
  },
  {
    question: "How is overtime taxed?",
    answer:
      "Overtime pay is taxed the same as your regular pay — it is added to your gross income for the pay period. However, because it increases your total earnings for that period, more of your pay may fall into a higher tax bracket temporarily, resulting in larger tax withholdings. This does not mean you are taxed at a higher rate overall — your annual tax is based on total annual income. The larger withholding may just mean a smaller tax refund or a small tax payment owed at year-end. Some employees notice a \"smaller\" overtime paycheck and worry they are penalized, but this is just withholding, not the actual tax rate.",
  },
  {
    question: "Can my employer require overtime?",
    answer:
      "In most cases, yes. Under federal law, employers can require overtime as a condition of employment for non-exempt workers, as long as they pay the required overtime rate. There is no federal limit on how many overtime hours an employer can require (some states have daily limits). However, some industries have regulations limiting mandatory overtime (e.g., healthcare, trucking). Union contracts may also restrict mandatory overtime. If you believe your employer is violating overtime laws, contact the US Department of Labor's Wage and Hour Division.",
  },
]
