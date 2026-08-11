import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is inflation?",
    answer:
      "Inflation is the rate at which the general level of prices for goods and services rises over time, eroding purchasing power. When inflation is 3%, something that costs $100 today will cost $103 next year. Your $100 can buy fewer goods — it has lost purchasing power. Central banks like the Federal Reserve target 2% annual inflation as healthy for economic growth.",
  },
  {
    question: "How does inflation affect my savings?",
    answer:
      "If your savings earn less interest than the inflation rate, you're losing purchasing power. For example, if inflation is 3% and your savings account pays 1%, your real return is -2%. Over 10 years, $10,000 in that account would have the purchasing power of only about $8,171 in today's dollars. This is why investing in assets that outpace inflation (stocks, real estate) is important for long-term savings.",
  },
  {
    question: "What is the average US inflation rate?",
    answer:
      "The long-term average US inflation rate is approximately 3% per year, though it varies significantly by decade. The 1970s saw double-digit inflation (peaking at 13.5% in 1980), while the 2010s had very low inflation (1-2%). In 2022, inflation spiked to 9.1% due to pandemic-related supply chain issues. The Federal Reserve targets 2% as the ideal rate. This calculator defaults to 3% but lets you enter any custom rate.",
  },
  {
    question: "What is the Consumer Price Index (CPI)?",
    answer:
      "The Consumer Price Index (CPI) measures the average change in prices paid by consumers for a basket of goods and services including food, housing, clothing, transportation, medical care, and more. The Bureau of Labor Statistics (BLS) publishes CPI monthly. It's the most widely used measure of inflation. Core CPI excludes volatile food and energy prices to show underlying inflation trends.",
  },
  {
    question: "How do I calculate the future value of money with inflation?",
    answer:
      "Use the formula: Future Value = Present Value × (1 + Inflation Rate)^Years. For example, $10,000 at 3% inflation for 20 years = $10,000 × (1.03)^20 = $18,061. This means you'd need $18,061 in 20 years to buy what $10,000 buys today. The inverse — what today's money will be worth in the future — is: Adjusted Value = Present Value / (1 + Inflation Rate)^Years.",
  },
  {
    question: "Is deflation worse than inflation?",
    answer:
      "Deflation (negative inflation) sounds good but is typically harmful. When prices fall, consumers delay purchases expecting lower prices, reducing demand. Businesses cut production and wages, leading to unemployment and further spending cuts. This deflationary spiral was a major factor in the Great Depression. Japan experienced decades of deflation starting in the 1990s, leading to economic stagnation. Central banks actively prevent deflation.",
  },
  {
    question: "What is the 'rule of 72' for inflation?",
    answer:
      "The Rule of 72 estimates how long it takes for prices to double due to inflation: divide 72 by the annual inflation rate. At 3% inflation, prices double in 72/3 = 24 years. At 6% inflation, prices double in just 12 years. This simple rule helps you quickly understand the long-term impact of inflation on your purchasing power and why investing to beat inflation is essential.",
  },
  {
    question: "How does this calculator handle historical vs custom rates?",
    answer:
      "This calculator offers two modes: (1) Custom Rate mode — you enter a fixed annual inflation rate (defaulting to 3%, the US average). This applies the same rate each year. (2) For historical accuracy, you would need actual annual CPI data for each year, which varies. The custom rate mode provides a useful approximation. For precise historical calculations, the BLS provides an official inflation calculator at bls.gov.",
  },
  {
    question: "How can I protect against inflation?",
    answer:
      "Strategies to protect against inflation include: (1) Invest in stocks — historically returns 7-10% annually, well above inflation. (2) Buy Treasury Inflation-Protected Securities (TIPS) — adjusted for CPI. (3) Invest in real estate — property values and rents tend to rise with inflation. (4) Diversify internationally — some currencies and markets may outpace your domestic inflation. (5) Hold commodities — gold and other commodities often rise during inflationary periods. (6) Minimize cash holdings — cash loses value every year with inflation.",
  },
  {
    question: "What was the highest inflation rate in US history?",
    answer:
      "The highest annual inflation rate in modern US history was 13.5% in 1980. During the Revolutionary War, the Continental Congress printed so much money that inflation reached hyperinflation levels. The highest monthly inflation ever recorded was in Hungary in July 1946 at 41.9 quadrillion percent. In recent history, Venezuela reached 1,000,000%+ annual inflation in 2018. The US Federal Reserve was created in 1913 specifically to manage inflation and prevent such extremes.",
  },
]
