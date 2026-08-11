import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is an age calculator?",
    answer:
      "An age calculator is an online tool that determines the exact amount of time between a date of birth and a target date (typically today). It breaks down the difference into years, months, days, hours, minutes, and seconds. Unlike simple year-subtraction, it accounts for varying month lengths, leap years, and the specific calendar dates involved for a precise result.",
  },
  {
    question: "How does the age calculator determine my exact age?",
    answer:
      "The calculator first establishes the full years between your birth date and the target date by comparing the month and day values. Then it calculates the remaining months, and finally the remaining days. For total conversions (weeks, hours, minutes, seconds), it computes the exact millisecond difference between the two dates and divides by the appropriate factor, giving you the most precise breakdown possible.",
  },
  {
    question: "How does the calculator handle leap years?",
    answer:
      "The calculator uses JavaScript's native Date API which automatically handles leap years. A year is a leap year if it is divisible by 4, except for century years which must be divisible by 400. This means February 29 is correctly accounted for in all calculations — if your birthday is February 29, the calculator correctly computes ages on non-leap years by recognizing March 1 as the following day.",
  },
  {
    question: "How is the zodiac sign determined?",
    answer:
      "The zodiac sign is calculated based on the month and day of your birth date. Western astrology assigns one of twelve signs — Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, or Pisces — each corresponding to a specific date range. The calculator matches your birth month and day to the correct sign and displays it with its astrological symbol.",
  },
  {
    question: "How is the next birthday countdown calculated?",
    answer:
      "The calculator finds the next occurrence of your birth month and day that falls on or after today. If your birthday this year has already passed, it looks ahead to next year. It then computes the exact number of days and hours remaining until that date. If your birthday is today, it will show a celebration message instead of a countdown.",
  },
  {
    question: "How accurate is this age calculator?",
    answer:
      "This calculator is highly accurate because it uses the actual calendar dates and JavaScript's built-in Date system. It correctly accounts for months with 28, 29, 30, and 31 days, leap years, and daylight saving time transitions. The total seconds, minutes, and hours are calculated from the exact millisecond difference, providing the most precise result possible for your local time zone.",
  },
  {
    question: "Can I use this calculator for legal or medical age verification?",
    answer:
      "While this calculator provides accurate age breakdowns for general informational purposes, it should not be used as the sole source for legal or medical age verification. Legal age requirements depend on jurisdiction-specific rules, and medical age assessments may require additional clinical evaluation. For official purposes, always verify with government-issued identification or consult the relevant authority.",
  },
  {
    question: "Why does my age show differently in years/months versus total days?",
    answer:
      "The years and months display uses calendar-based calculation — for example, if you were born on January 15, 2000, and today is February 10, 2025, you are 25 years and 0 months old (your birthday month hasn't completed). However, the total days uses exact date difference counting each individual day. The two approaches can seem different because months have varying lengths (28–31 days), so a calendar month does not always equal a fixed number of days.",
  },
  {
    question: "Does the calculator account for time zones?",
    answer:
      "The calculator uses your browser's local time zone for all computations. When you select a date using the native date picker, it uses your device's local date. The age results and birthday countdown are therefore accurate for your current time zone. If you need age calculations in a different time zone, adjust the 'Calculate to' date accordingly or change your device time zone temporarily.",
  },
  {
    question: "Is my date of birth stored or sent to any server?",
    answer:
      "No. This age calculator runs entirely in your browser using client-side JavaScript. Your date of birth and any other date you enter are never sent to any server, stored in any database, or shared with any third party. As soon as you close or refresh the page, all entered data is gone. Your privacy is fully protected.",
  },
]
