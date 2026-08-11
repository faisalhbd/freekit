import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a cron expression?",
    answer: "A cron expression is a string of five fields separated by spaces that represents a schedule. The fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Cron expressions are used in Linux/Unix systems, job schedulers, and cloud platforms to schedule recurring tasks."
  },
  {
    question: "How do I read a cron expression?",
    answer: "Read left to right: the first field is minutes, second is hours, third is day of month, fourth is month, and fifth is day of week. An asterisk (*) means 'every'. A number means 'at that exact value'. Ranges (1-5) and steps (*/5) provide more control. Paste any expression into the parser to get a full human-readable explanation."
  },
  {
    question: "What does */5 * * * * mean?",
    answer: "This means 'every 5 minutes'. The */5 in the minute field means 'every 5th minute' (0, 5, 10, 15, ...). The asterisks in the other fields mean 'every hour, every day, every month, every day of week'. It is one of the most common cron expressions used for frequent recurring tasks."
  },
  {
    question: "How are the next execution times calculated?",
    answer: "The parser takes the current date and time and iterates forward, checking each minute against the cron expression's rules. It finds the next 10 matching times and displays them in your local timezone. This helps you verify that your cron schedule produces the expected execution pattern."
  },
  {
    question: "Does the parser support 6-field cron expressions?",
    answer: "Currently, the parser supports the standard 5-field cron format (minute, hour, day of month, month, day of week). Some systems use a 6-field format with seconds or years as an additional field. For those, use the first 5 fields and enter the rest separately."
  },
  {
    question: "What do 0 and 7 mean in the day of week field?",
    answer: "In standard cron, both 0 and 7 represent Sunday. Days of the week are numbered 0-6 (or 0-7) where 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday. The parser accepts both 0 and 7 as Sunday."
  },
  {
    question: "Can I use month or day names instead of numbers?",
    answer: "The parser accepts three-letter English abbreviations: JAN-DEC for months and MON-SUN for days of week. For example, '0 0 1 JAN *' means midnight on January 1st, and '0 9 * * MON-FRI' means 9 AM on weekdays."
  },
  {
    question: "How do I validate a cron expression?",
    answer: "Simply enter the expression in the input field. The parser automatically validates each field and shows any errors below the input. Common errors include out-of-range values, invalid characters, or conflicting day-of-month and day-of-week specifications."
  },
  {
    question: "Is my cron data secure?",
    answer: "Yes. All parsing and calculation happen entirely in your browser. Your cron expressions are never sent to any server, stored, or tracked. You can safely enter cron expressions from production systems."
  },
  {
    question: "What is the difference between day of month and day of week?",
    answer: "Day of month (3rd field) specifies which day of the month to run (1-31). Day of week (5th field) specifies which day of the week to run (0-6). If both are restricted (not *), the cron scheduler typically runs the command when either field matches (OR logic), though some systems use AND logic. The parser shows the meaning of each field separately."
  },
]
