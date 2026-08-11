import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the timesheet calculator work?",
    answer:
      "Enter your clock-in and clock-out times for each day of the week (Monday through Sunday). The calculator automatically computes the hours worked each day, splits them into regular and overtime hours based on your configured threshold (default 8 hours/day), and calculates total pay including overtime at 1.5x your hourly rate. All calculations happen instantly in your browser.",
  },
  {
    question: "What is the overtime threshold?",
    answer:
      "The overtime threshold is the number of hours per day after which any additional time is considered overtime. The default is 8 hours per day, which is the standard in many jurisdictions. You can change this value to match your local labor laws or company policy. For example, some countries use 7.5 hours or 9 hours as the standard workday. Any hours beyond the threshold are paid at 1.5x the regular hourly rate by default.",
  },
  {
    question: "How is overtime pay calculated?",
    answer:
      "Overtime pay is calculated as overtime hours × hourly rate × 1.5. For example, if you work 10 hours in a day with an 8-hour threshold and your hourly rate is $20, you earn $160 in regular pay (8 × $20) and $60 in overtime pay (2 × $20 × 1.5), totaling $220 for that day. The 1.5x multiplier is the standard overtime rate in many countries including the US, but check your local regulations as some regions require 2x for certain conditions. Use our <a href=\"/tools/finance/overtime-pay-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Overtime Pay Calculator</a> for more detailed overtime scenarios.",
  },
  {
    question: "Can I calculate pay for different hourly rates?",
    answer:
      "This calculator uses a single hourly rate for the entire week. If you have different rates for different days or tasks, you would need to calculate each period separately. For salary-to-hourly conversions, use our <a href=\"/tools/finance/salary-to-hourly-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Salary to Hourly Calculator</a> to determine your equivalent hourly rate from an annual salary.",
  },
  {
    question: "Does the calculator handle overnight shifts?",
    answer:
      "Yes, the calculator handles shifts that cross midnight. If you clock in at 10:00 PM and clock out at 6:00 AM, it correctly calculates 8 hours of work. The time calculation accounts for the day boundary, so any clock-out time earlier than the clock-in time is treated as the next day. This makes it suitable for night shift workers, healthcare professionals, and anyone working non-standard hours.",
  },
  {
    question: "What happens if I don't enter times for some days?",
    answer:
      "Days with no clock-in or clock-out times are treated as 0 hours worked. You can leave weekends or days off blank. The weekly totals will only include hours from days where you entered valid times. This flexibility lets you use the calculator for part-time work, flexible schedules, or any work pattern where not all days are worked.",
  },
  {
    question: "Is my timesheet data saved or sent to a server?",
    answer:
      "No. All calculations happen entirely in your browser using JavaScript. No data is sent to any server, stored in any database, or shared with third parties. When you close the browser tab, your entered data is gone. This makes the calculator completely private and safe for tracking sensitive work hour information. You can print the summary for your records before closing.",
  },
  {
    question: "How do I print my timesheet?",
    answer:
      "Click the Print button at the bottom of the calculator. This opens your browser's print dialog, allowing you to save as PDF or print to a physical printer. The printout includes your daily hours breakdown, overtime details, and weekly pay summary in a clean, professional format suitable for submitting to employers or keeping for your own records.",
  },
  {
    question: "Can I use this for biweekly or monthly timesheets?",
    answer:
      "This calculator is designed for a single 7-day week (Monday through Sunday). For biweekly timesheets, use the calculator twice and add the weekly totals together. For monthly timesheets, use it for each week in the month. You can print each week separately and keep them together. The weekly totals at the bottom make it easy to combine multiple weeks for longer pay periods.",
  },
  {
    question: "What's the difference between regular hours and overtime hours?",
    answer:
      "Regular hours are hours worked up to the daily overtime threshold (default 8 hours). Overtime hours are any hours worked beyond that threshold in a single day. For example, working 10 hours on Monday with an 8-hour threshold gives you 8 regular hours and 2 overtime hours. The calculator tracks both separately because they're paid at different rates — regular at your standard hourly rate and overtime at 1.5x that rate. This split is required by labor laws in most jurisdictions for accurate payroll processing.",
  },
]
