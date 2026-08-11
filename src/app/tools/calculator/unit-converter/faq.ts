import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert between metric and imperial units?",
    answer:
      "Our unit converter handles metric-to-imperial conversions automatically. Simply select the category (e.g., Length), choose the source unit (e.g., Kilometers) and the target unit (e.g., Miles), enter a value, and the result appears instantly. The conversion factors are built into the tool, so you never need to memorize them.",
  },
  {
    question: "Why does temperature conversion use a different formula than other units?",
    answer:
      "Unlike length or weight where units are related by a simple multiplication factor (e.g., 1 km = 1,000 m), temperature scales have different zero points. Celsius sets 0\u00b0 at water's freezing point, Fahrenheit at 32\u00b0, and Kelvin at absolute zero (\u2212273.15\u00b0C). This means converting between them requires both multiplication and addition/subtraction, not just a ratio. Our converter handles these special formulas automatically.",
  },
  {
    question: "How accurate are the conversions?",
    answer:
      "Our converter uses internationally accepted conversion factors with up to 10 significant digits of precision. For everyday use \u2014 cooking, travel, fitness, construction \u2014 this precision is more than sufficient. Results are displayed with up to 6 decimal places, and trailing zeros are removed for cleaner output.",
  },
  {
    question: "Can I convert data storage units like MB to GB?",
    answer:
      "Yes! Our Data Storage category converts between Bits, Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), and Petabytes (PB). Note that we use the decimal (SI) definition where 1 KB = 1,000 Bytes, which is the standard used by storage manufacturers. Some operating systems use binary (1 KiB = 1,024 Bytes), which may cause slight differences in displayed sizes.",
  },
  {
    question: "What units of speed can I convert between?",
    answer:
      "The Speed category supports Meters per second (m/s), Kilometers per hour (km/h), Miles per hour (mph), Knots (nautical miles per hour), Feet per second (ft/s), and Mach (speed of sound at sea level). This covers everything from everyday driving speeds to aviation and aerospace applications.",
  },
  {
    question: "Is my data sent to a server when I use this converter?",
    answer:
      "No. The unit converter runs entirely in your browser using client-side JavaScript. Every calculation happens locally on your device. No values you enter are transmitted to any server, stored in any database, or shared with third parties. When you close or refresh the page, all data is gone.",
  },
  {
    question: "How do I quickly swap the from/to units?",
    answer:
      "Click the swap button (the double arrow icon) between the &ldquo;From&rdquo; and &ldquo;To&rdquo; sections. This instantly reverses both the unit selections and recalculates the conversion with the previous result as the new input. It is a handy shortcut when you need the inverse conversion.",
  },
  {
    question: "What is the difference between US customary units and imperial units?",
    answer:
      "While they share many unit names (inches, feet, gallons), US customary and British Imperial systems differ in volume definitions. A US gallon is 3.785 liters, while an Imperial gallon is 4.546 liters. For length and weight, the two systems are largely identical. Our converter uses US customary definitions for volume, which is the standard in most online contexts.",
  },
  {
    question: "Can I convert area units like square meters to acres?",
    answer:
      "Yes. The Area category handles all common area conversions including Square Millimeters, Square Centimeters, Square Meters, Square Kilometers, Square Inches, Square Feet, Square Yards, Acres, and Hectares. This is useful for real estate, land measurement, construction, and agriculture.",
  },
  {
    question: "Does this converter support real-time conversion as I type?",
    answer:
      "Yes. The converter updates the result instantly with every keystroke \u2014 there is no need to press a submit button or hit Enter. As soon as you type a number in the input field, the converted value is calculated and displayed in real time, making it fast and efficient for comparing multiple values.",
  },
]
