import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are business days and how are they calculated?",
    answer:
      "Business days (also called working days) are the days of the week that are typically used for official or commercial activities — Monday through Friday, excluding Saturday and Sunday. Our calculator counts each weekday between your start and end dates. Public holidays are not excluded because they vary by country, region, and year. If you need to account for specific holidays, manually subtract them from the business days result.",
  },
  {
    question: "How does the calculator handle leap years?",
    answer:
      "The calculator uses JavaScript's native Date API, which automatically accounts for leap years. A year is a leap year if it is divisible by 4, except for century years (like 1900 or 2100) which must also be divisible by 400 (so 2000 is a leap year). This means February 29 is correctly included in all date range calculations, and months following February in a leap year have the correct offset.",
  },
  {
    question: "Does the calculator include or exclude the start and end dates?",
    answer:
      "By default, the calculator counts the difference between two dates exclusive of the start date — meaning if you select January 1 and January 3, the result is 2 days (January 2 and January 3). This is consistent with standard date arithmetic. If you want to include the start date in your count (e.g., for counting the total number of days an event spans), simply add 1 to the total days result.",
  },
  {
    question: "What counting methods does the calculator use?",
    answer:
      "The calculator provides multiple views of the same date difference. Total days is the exact count of 24-hour periods between the dates. Weeks converts total days into full weeks and remaining days. Months and days uses a calendar-aware approach that respects varying month lengths (28–31 days). Years, months, and days provides the most human-readable breakdown, similar to how people describe age or tenure.",
  },
  {
    question: "Can I calculate the difference between historical dates?",
    answer:
      "Yes. The calculator supports dates from January 1, 1970 through the year 2100 in the date picker. For calculations involving dates before 1970, note that JavaScript's Date object may have limited precision on some browsers. For most practical use cases — project timelines, event planning, and deadline tracking — the supported range covers virtually every scenario.",
  },
  {
    question: "How can I use this tool for project management?",
    answer:
      "This calculator is ideal for project planning. Set your project start date and deadline to see the total working days available. Use the business days count (excluding weekends) to plan task assignments and milestones. You can also use the quick presets (30 days, 90 days, 1 year) to rapidly check timeframes. For example, if you have a 90-day sprint, you'll know exactly how many business days your team has to deliver.",
  },
  {
    question: "Does the calculator account for time zones?",
    answer:
      "The calculator uses your browser's local time zone for date interpretation. When you select a date, the date picker uses your device's current time zone. Since the calculations are based on whole calendar days (not hours or minutes), time zone differences generally do not affect the result unless your date range crosses a daylight saving time boundary, in which case the day count remains correct because DST shifts are within a single calendar day.",
  },
  {
    question: "What are ISO week numbers and does this tool support them?",
    answer:
      "ISO 8601 week numbers assign each week of the year a number from 1 to 52 (or 53 in some years). A week starts on Monday and ends on Sunday. While this calculator does not display ISO week numbers directly, you can use the total weeks result as a close approximation. For precise ISO week numbers, you would need to add the week number of the start date and count forward using the full weeks result.",
  },
  {
    question: "What is the difference between fiscal year and calendar year calculations?",
    answer:
      "A calendar year runs from January 1 to December 31, while a fiscal year is a 12-month accounting period that may start on any date (e.g., April 1 to March 31 in many countries). This calculator always uses calendar dates. If you need fiscal year calculations, you can still use this tool by selecting the fiscal year start and end dates — just pick the actual dates that correspond to your fiscal period boundaries.",
  },
  {
    question: "How does the calculator validate the dates I enter?",
    answer:
      "The calculator uses native HTML5 date inputs which automatically enforce valid date ranges (e.g., you cannot enter February 30). Additionally, the calculator checks that the start date is not after the end date and displays a clear error message if so. Both dates must be within the supported range of the browser's date picker. If you encounter unexpected results, verify that both dates are entered correctly in YYYY-MM-DD format.",
  },
]
