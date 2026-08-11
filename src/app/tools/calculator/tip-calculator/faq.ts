import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the standard tip amount?",
    answer:
      "In the United States, the standard tip for sit-down restaurant service is 15–20% of the pre-tax bill. For excellent service, 20–25% is common. For buffets or counter service, 10% is generally appropriate. Our tip calculator defaults to common percentages so you can quickly choose the right amount without doing mental math.",
  },
  {
    question: "When should I tip and when is it not expected?",
    answer:
      "In the US, you should tip at sit-down restaurants, bars, coffee shops, hair salons, taxis and rideshares, hotel housekeeping ($1–5 per night), and for food delivery. You generally do not need to tip at fast-food restaurants, self-serve gas stations, or retail stores. When in doubt, a small tip is almost always appreciated. Tip culture varies significantly by country — see our international tipping section for details.",
  },
  {
    question: "How do I split a bill fairly among a group?",
    answer:
      "The simplest approach is to divide the total bill (including tip) equally among all diners. For more fairness, each person can calculate their own order total plus their share of the tip. Our calculator handles both methods — enter the total bill and number of people to see each person's share instantly. If someone ordered significantly more or less, you may want to split based on individual orders rather than equally.",
  },
  {
    question: "Should I tip on the tax amount?",
    answer:
      "Tipping on the pre-tax amount is technically the standard, since you're tipping on the service for your food and drinks — not on the government's tax. However, most people simply tip on the total bill including tax because it's easier and the difference is small. On a $100 bill with 8% tax, the pre-tax amount is about $92.59, so the difference between tipping 20% on pre-tax vs. post-tax is only about $1.48. Our calculator lets you enter either amount.",
  },
  {
    question: "Is it okay to round the tip up or down?",
    answer:
      "Rounding is very common and completely acceptable. Many people round the total bill up to the nearest whole dollar for simplicity. For example, if your bill is $43.20 and a 20% tip would be $8.64 (total $51.84), rounding to $52 means a slightly higher tip that's easy to pay. Rounding up is always appreciated. If you round down, try to ensure the tip percentage stays above 15% for adequate service.",
  },
  {
    question: "How does tipping work in other countries?",
    answer:
      "Tipping customs vary enormously worldwide. In Japan and South Korea, tipping is generally not expected and can even be considered rude. In much of Europe, a service charge is often included and a small 5–10% extra is appreciated but not required. In the UK, 10–15% is standard. In Canada, 15–20% is similar to the US. In Australia and New Zealand, tipping is uncommon. In parts of Central and South America, 10% is common. Always research local customs before traveling.",
  },
  {
    question: "How much should I tip for food delivery?",
    answer:
      "For food delivery, a tip of 15–20% of the order total (before fees and tax) is standard, with a minimum of $3–5. For large orders, difficult weather conditions, or long delivery distances, consider tipping more. Remember that delivery drivers often rely on tips as a significant part of their income and they use their own vehicles and pay for their own gas. If the delivery was exceptionally fast or the driver was especially helpful, 20–25% is a generous gesture.",
  },
  {
    question: "Should I calculate the tip on pre-tax or post-tax amount?",
    answer:
      "Technically, tips should be calculated on the pre-tax amount since tax is a government charge, not part of the service. However, in practice, most people tip on the post-tax total because it's simpler and the difference is minimal. To see the difference, try entering your pre-tax amount in our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> with your desired tip percentage, then compare it to the post-tax calculation in our tip calculator.",
  },
  {
    question: "What is the minimum acceptable tip?",
    answer:
      "For acceptable (not great, but not terrible) service at a sit-down restaurant in the US, 15% is generally considered the minimum. Below 15% sends a message that the service was poor. For truly terrible service, some people leave 10%, but it's often better to speak to a manager rather than leave a very low tip, as the server may assume you simply forgot. For counter service and takeout, 10% or even rounding up to the nearest dollar is a kind gesture.",
  },
  {
    question: "How accurate is this tip calculator?",
    answer:
      "Our tip calculator provides mathematically exact results — it uses precise arithmetic to calculate tip amounts and per-person splits. The results are accurate to the cent. For bill splitting, if the divided amount results in a fraction of a cent, we round to the nearest cent. All calculations are performed locally in your browser using JavaScript's standard floating-point arithmetic, which is accurate to 15–17 significant digits — far more precision than you need for any real-world bill. No data is sent to any server.",
  },
]
