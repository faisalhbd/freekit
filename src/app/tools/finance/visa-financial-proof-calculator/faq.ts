import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How much bank balance do I need for a tourist visa?",
    answer:
      "Required bank balance varies by destination. Schengen countries typically require proof of funds covering your trip plus a buffer — usually the full trip cost plus some reserve. The US generally wants to see you can afford the trip and have strong ties to your home country. The UK requires enough to cover the trip without working. As a general rule, your bank balance should be 1.5x to 3x your total trip cost. This calculator estimates the required amount based on your specific destination and trip details.",
  },
  {
    question: "What is the required bank balance for a Schengen visa?",
    answer:
      "For a Schengen visa, you need to show funds of approximately €50-€100 per day of stay, with a minimum of €300 for short trips. The exact amount depends on the countries you plan to visit. Additionally, many embassies want to see 3-6 months of bank history showing consistent income and healthy balances. The bank balance should cover the entire trip cost (flights, accommodation, food, transport, insurance) plus a buffer. This is why a balance of 1.5-2x the trip cost is commonly recommended.",
  },
  {
    question: "How much money do I need to show for a US tourist visa?",
    answer:
      "The US does not have a fixed minimum bank balance requirement for B1/B2 tourist visas. However, consular officers want to see that you can afford the trip and have strong economic ties to your home country. A good rule of thumb is to show a bank balance of 2-3x the trip cost. More importantly, show consistent income deposits over 6-12 months. For a 2-week US trip costing $3,000-$5,000, a bank balance of $6,000-$15,000 with regular income deposits is generally sufficient.",
  },
  {
    question: "How long should my bank statement be for a visa application?",
    answer:
      "Most countries require 3-6 months of bank statements. Schengen typically asks for 3 months. The US, UK, and Canada often want 6 months. The statements should show: regular income deposits, a healthy average balance (not just a large recent deposit), no suspicious large transfers right before applying, and a generally upward or stable balance trend. Avoid sudden large deposits in the 2-3 months before applying — they look like you borrowed money just for the visa.",
  },
  {
    question: "Does a sponsorship letter reduce the required bank balance?",
    answer:
      "Yes, but the sponsor must provide their own financial proof. If someone is sponsoring your trip, they need: a sponsorship letter, their bank statements (3-6 months), proof of income (pay stubs, tax returns), and a relationship proof. Some countries may still want to see you have some personal funds. The sponsor typically needs to show they can cover your trip costs plus their own living expenses. This does not eliminate the need for financial proof — it shifts the requirement to the sponsor.",
  },
  {
    question: "What travel style options should I choose?",
    answer:
      "Budget: Hostels, public transport, street food, free activities. Typical daily cost $40-$80. Moderate: Budget hotels or mid-range Airbnb, mixed transport, restaurant meals, paid attractions. Daily cost $80-$200. Luxury: Hotels or premium Airbnb, private transport or rental car, fine dining, premium experiences. Daily cost $200-$500+. Choose the style that honestly represents how you plan to travel — if your bank statement shows low spending but you claim luxury travel, the discrepancy may raise questions.",
  },
  {
    question: "Can I use multiple bank accounts for visa financial proof?",
    answer:
      "Yes, most embassies accept statements from multiple bank accounts. However, you should provide a summary explaining all accounts. Include checking, savings, fixed deposits, and investment accounts. Some countries accept property valuations and other assets as supplementary proof. The key is that the total liquid assets should meet or exceed the required amount, and the statements should show a consistent financial pattern.",
  },
  {
    question: "What if my bank balance is lower than required?",
    answer:
      "Options if your balance is short: (1) Apply closer to your trip date so the balance has more time to grow. (2) Have a sponsor provide additional financial proof. (3) Show additional assets like property, investments, or fixed deposits. (4) Provide a detailed budget showing you have done your research. (5) Apply for a shorter trip to reduce the required amount. (6) Show a strong employment letter and regular income. (7) Consider opening a separate savings account and making regular deposits to build a visible savings pattern.",
  },
  {
    question: "How does the number of travelers affect the required bank balance?",
    answer:
      "The required bank balance scales roughly linearly with the number of travelers. If one person needs $5,000 for a trip, two people typically need $9,000-$10,000 (not double, since some costs like accommodation are shared). The multiplier is approximately 1 + (0.7-0.8 × additional travelers). This calculator uses a simple linear scaling which provides a safe overestimate. For families, some countries have slightly reduced per-person requirements.",
  },
  {
    question: "Are there country-specific requirements I should know?",
    answer:
      "Yes, each country has unique requirements: Schengen requires travel insurance of €30,000 minimum coverage. The US focuses on ties to home country rather than just bank balance. The UK requires specific fund levels for different visa types. Canada has specific settlement funds tables. Australia requires a specific minimum depending on visa subclass. Japan typically requires a bank certificate (not just statements). UAE may require a minimum monthly salary letter from employer. Always check the specific embassy website for current requirements as they change frequently.",
  },
]
