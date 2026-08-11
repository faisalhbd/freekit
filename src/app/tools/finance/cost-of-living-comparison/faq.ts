import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I compare the cost of living between two cities?",
    answer:
      "Enter the monthly expense amounts for each category in both City A and City B columns. The calculator automatically shows the difference per category, total monthly savings, and annual savings. Green highlights indicate City A is cheaper, red indicates City B is cheaper. If you already know your exact costs, use those numbers. If estimating, research average rents, grocery prices, and transportation costs for each city.",
  },
  {
    question: "What is the biggest factor in cost of living differences?",
    answer:
      "Housing is by far the largest factor, typically accounting for 30-40% of total living expenses. Rent differences between cities can be 50-200%+. For example, a one-bedroom apartment might be $1,200 in Raleigh but $3,200 in San Francisco — a $2,000/month difference that compounds to $24,000/year. Transportation is the second biggest factor in car-dependent cities due to insurance and parking costs.",
  },
  {
    question: "Should I only look at the total difference when relocating?",
    answer:
      "No — look at both the total and per-category breakdowns. A city might be 10% cheaper overall but 40% more expensive in transportation. If you work remotely and do not commute, the transportation difference does not matter. Also consider quality of life factors not captured in expenses: climate, culture, healthcare access, schools, air quality, and social connections. Salary differences can also offset higher costs.",
  },
  {
    question: "How accurate are online cost of living indices?",
    answer:
      "Online indices (Numbeo, BestPlaces, etc.) provide helpful baselines but may not reflect your actual spending. They use averages that include all neighborhoods, income levels, and lifestyles. Your actual costs depend on your specific choices: a modest apartment vs. luxury, cooking at home vs. dining out, public transit vs. car ownership. Use this calculator with your real numbers for the most accurate comparison.",
  },
  {
    question: "What salary increase do I need to maintain the same lifestyle?",
    answer:
      "Use the total percentage difference as a baseline. If City B costs 25% more than City A, you need at least a 25% salary increase to maintain the same lifestyle. But also factor in tax differences — some states have no income tax (Texas, Florida) while others have high rates (California, New York). Use our <a href=\"/tools/finance/salary-after-tax-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Salary After Tax Calculator</a> for each city to compare take-home pay.",
  },
  {
    question: "How do I account for income tax differences between cities?",
    answer:
      "Income tax varies by state and sometimes city. Texas, Florida, Nevada, and Washington have no state income tax. California tops out at 13.3%. To account for this, first calculate your after-tax salary in each location, then subtract the cost of living. The city with the higher after-tax-minus-expenses number is the better financial choice, even if its raw cost of living is higher.",
  },
  {
    question: "What hidden costs should I consider when moving?",
    answer:
      "Moving has one-time costs: moving company ($1,000-$5,000+), deposits (first/last month rent, security deposit), travel costs, new furniture, utility setup fees. Ongoing hidden costs: higher car insurance in some areas, different grocery prices, sales tax rates, property taxes (if buying), and HOA fees. Budget 2-3 months of living expenses for the transition period.",
  },
  {
    question: "Which US cities have the lowest cost of living?",
    answer:
      "Among major metro areas, the most affordable include: Memphis, TN; El Paso, TX; Wichita, KS; Toledo, OH; and Tulsa, OK. These cities offer housing costs 40-60% below the national average. Midwest and Southern cities generally have lower costs than coastal cities. However, lower costs often correlate with lower average salaries and fewer job opportunities in certain industries.",
  },
  {
    question: "Is it worth moving to a cheaper city for remote work?",
    answer:
      "It can be extremely beneficial. If you keep a coastal salary while moving to a low-cost city, you can save $1,000-$3,000/month. Over 5 years, that is $60,000-$180,000 in additional savings. However, consider: time zone differences for meetings, fewer networking opportunities, career growth potential, and social factors. The financial math usually favors it if you can maintain your income.",
  },
  {
    question: "How do I estimate expenses for a city I have not lived in?",
    answer:
      "Start with online resources: Zillow/Redfin for rent, Numbeo for general costs, grocery store websites for food prices, and utility company rate calculators. Ask locals in online communities (Reddit city subreddits, Facebook groups). Check the city's official website for tax rates and fees. For transportation, use Google Maps to estimate commute distances and check local transit pricing. Start with broad estimates and refine as you research more.",
  },
]
