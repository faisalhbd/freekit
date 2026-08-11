import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp (also called Unix time or epoch time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (the Unix epoch). It is a widely used standard for representing dates and times in computing, databases, APIs, and log files. For example, the timestamp 1700000000 represents November 14, 2023, 22:13:20 UTC.",
  },
  {
    question: "What is the difference between seconds and milliseconds?",
    answer:
      "A Unix timestamp in seconds has 10 digits (e.g., 1700000000), while a timestamp in milliseconds has 13 digits (e.g., 1700000000000). Some systems and programming languages use seconds (Python, Unix commands), while others use milliseconds (JavaScript Date.now(), Java). Our tool auto-detects whether your input is in seconds or milliseconds and converts accordingly.",
  },
  {
    question: "How do I convert a timestamp to a date?",
    answer:
      "Simply paste your Unix timestamp into the input field and the converter will instantly show the corresponding human-readable date in multiple formats. You can also click the 'Use Current Timestamp' button to convert the current time. The tool supports both seconds (10 digits) and milliseconds (13 digits).",
  },
  {
    question: "How do I convert a date to a timestamp?",
    answer:
      "Switch to the 'Date to Timestamp' tab, enter or select your date and time, and the tool will instantly show the corresponding Unix timestamp in both seconds and milliseconds. You can also use the date/time picker to select a specific date and time.",
  },
  {
    question: "What date formats does the converter support?",
    answer:
      "Our converter outputs dates in multiple formats for convenience: ISO 8601 (2024-01-15T10:30:00.000Z), RFC 2822 (Mon, 15 Jan 2024 10:30:00 +0000), Local Date/Time, UTC Date/Time, Relative time (e.g., \"2 months ago\"), and individual date and time components. You can copy any format with one click.",
  },
  {
    question: "What is the current Unix timestamp?",
    answer:
      "The current Unix timestamp is shown in real-time at the top of our tool. It updates every second, displaying both the seconds (10-digit) and milliseconds (13-digit) values. You can click to copy either value. As of early 2025, the Unix timestamp is approximately 1735000000 seconds.",
  },
  {
    question: "What is the Unix epoch?",
    answer:
      "The Unix epoch is January 1, 1970, 00:00:00 UTC. It is the reference point (zero) for Unix timestamps. Timestamps before this date are negative numbers. For example, December 31, 1969 is represented as -86400 (one day before the epoch). The Unix epoch was chosen arbitrarily by early Unix developers.",
  },
  {
    question: "Can I use this tool for time zone conversion?",
    answer:
      "While this tool primarily converts between timestamps and dates, it displays both local time and UTC time for every conversion. The Unix timestamp itself is always in UTC (timezone-independent), so you can convert a timestamp to your local time or UTC. For dedicated timezone conversion between different cities, use a timezone converter tool.",
  },
  {
    question: "Why do developers use Unix timestamps?",
    answer:
      "Developers use Unix timestamps because they are timezone-independent, easy to store and compare as simple integers, efficient for database indexing and sorting, and universally supported across programming languages and systems. They are commonly used in APIs, database records, log files, caching headers, session management, and scheduling systems.",
  },
  {
    question: "Is this timestamp converter free to use?",
    answer:
      "Yes, this timestamp converter is 100% free with no limits on usage, no sign-up required, and no hidden fees. All conversion happens in your browser using client-side JavaScript. No data is sent to any server.",
  },
]
