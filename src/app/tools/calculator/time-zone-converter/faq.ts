import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are time zones and why do they exist?",
    answer:
      "Time zones are regions of the Earth that observe a uniform standard time for legal, commercial, and social purposes. They exist because the Earth rotates approximately 15 degrees of longitude per hour, meaning the sun's position (and therefore local solar time) differs across the globe. Without time zones, noon in New York and noon in Tokyo would refer to completely different moments in the day. Time zones simplify scheduling, transportation, and communication by grouping nearby areas into shared time standards.",
  },
  {
    question: "What is the difference between UTC and GMT?",
    answer:
      "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time. It is based on International Atomic Time (TAI) with leap seconds added to keep it within 0.9 seconds of UT1 (solar time). GMT (Greenwich Mean Time) is a time zone used in the UK and parts of West Africa during winter. Historically, GMT was based on astronomical observations at the Royal Observatory in Greenwich. While UTC and GMT share the same current time, UTC is a time standard (not a time zone) used as the basis for all other time zones via offsets like UTC+5:30 or UTC-8.",
  },
  {
    question: "What is daylight saving time (DST) and which countries use it?",
    answer:
      "Daylight saving time (DST) is the practice of advancing clocks by one hour during warmer months so that darkness falls later in the evening. Typically, DST starts in spring (clocks move forward) and ends in autumn (clocks move back). Countries that currently observe DST include the United States, Canada, most of Europe, parts of Australia, and New Zealand. Many countries near the equator (like India, Japan, and most of Southeast Asia) do not observe DST because their daylight hours vary little throughout the year. This converter uses the Intl.DateTimeFormat API which automatically handles DST transitions.",
  },
  {
    question: "How do I convert time between two time zones?",
    answer:
      "To convert time between zones, first determine the UTC offset of both time zones (e.g., EST is UTC-5 and IST is UTC+5:30). Then calculate the difference between the two offsets and add or subtract that difference from the source time. For example, converting 10:00 AM EST to IST: the difference is +10 hours 30 minutes, so the result is 8:30 PM IST. Our converter handles this automatically — simply select the source time zone, enter the date and time, select the target time zone, and the converted time is displayed instantly. The tool also accounts for daylight saving time automatically.",
  },
  {
    question: "What is the International Date Line?",
    answer:
      "The International Date Line (IDL) is an imaginary line on the Earth's surface that roughly follows the 180th meridian in the Pacific Ocean. When you cross the IDL from west to east, you subtract one calendar day; crossing from east to west, you add one calendar day. For example, when it is Monday at 10 AM in New Zealand (UTC+12), it is Sunday at 10 AM in Hawaii (UTC-10) — a 22-hour difference. The IDL has some zigzags to avoid splitting countries and island groups (e.g., it bends east around Kiribati). This converter correctly handles date changes that result from crossing the IDL.",
  },
  {
    question: "How do I find the best time for a meeting across time zones?",
    answer:
      "To find a good meeting time across zones, first list all participant time zones and their current UTC offsets. Look for an overlap where all participants are between 9 AM and 6 PM in their local time. For example, 9 AM in New York (UTC-5) equals 2 PM in London (UTC+0) and 7:30 PM in New Delhi (UTC+5:30) — a reasonable overlap for a three-region meeting. For teams spanning Asia, Europe, and the Americas, overlap windows are narrow (often 8-10 AM in Europe, 2-4 PM in Asia). Use the 'Quick Compare' feature in this tool to view multiple time zones simultaneously and identify suitable windows.",
  },
  {
    question: "What do common time zone abbreviations like EST, PST, and CET mean?",
    answer:
      "Time zone abbreviations are short codes for standard or daylight time: EST (Eastern Standard Time, UTC-5) covers the US East Coast; CST (Central Standard Time, UTC-6) covers the US Midwest; MST (Mountain Standard Time, UTC-7) covers the US Mountain states; PST (Pacific Standard Time, UTC-8) covers the US West Coast. In Europe: CET (Central European Time, UTC+1) covers most of Western Europe; EET (Eastern European Time, UTC+2) covers Eastern Europe. In Asia: IST (India Standard Time, UTC+5:30), JST (Japan Standard Time, UTC+9), CST (China Standard Time, UTC+8). Note that abbreviations can be ambiguous — CST can mean Central Standard Time (US), China Standard Time, or Cuba Standard Time.",
  },
  {
    question: "What is the difference between IST, EST, and PST?",
    answer:
      "IST (India Standard Time) is UTC+5:30, used throughout India with no daylight saving time. EST (Eastern Standard Time) is UTC-5, used on the US East Coast and parts of Canada and South America during winter; in summer it becomes EDT (UTC-4). PST (Pacific Standard Time) is UTC-8, used on the US West Coast during winter; in summer it becomes PDT (UTC-7). The difference between IST and EST is 10 hours 30 minutes (IST is ahead), while EST and PST differ by 3 hours (EST is ahead). These conversions are handled automatically by this tool, including the DST variations.",
  },
  {
    question: "How do I schedule events across multiple time zones?",
    answer:
      "The best practice for scheduling across time zones is to always communicate the time in UTC along with at least one local time zone. For recurring events, always specify the time zone explicitly (e.g., '3 PM Eastern Time') rather than a relative reference. Use calendar applications like Google Calendar or Outlook that support time zone-aware event creation. When planning, use the 'Quick Compare' feature in this tool to view 3-4 time zones at once and find the best overlapping hours. For international teams, consider rotating meeting times to share the inconvenience of off-hours calls fairly.",
  },
  {
    question: "What are military time zones (Alpha, Bravo, Charlie, etc.)?",
    answer:
      "Military time zones, also known as NATO phonetic alphabet zones, are a system used by the military and aviation to designate time zones. Each zone is assigned a letter from A to Z (excluding J): Z (Zulu) = UTC+0, A (Alpha) = UTC+1, B (Bravo) = UTC+2, and so on through M (Mike) = UTC+12. For zones west of UTC, letters continue: N (November) = UTC-1, O (Oscar) = UTC-2, through Y (Yankee) = UTC-12. The most commonly referenced is Zulu time (UTC), used universally in aviation and military operations. When someone says 'the meeting is at 1400 Zulu,' that means 2:00 PM UTC.",
  },
]
