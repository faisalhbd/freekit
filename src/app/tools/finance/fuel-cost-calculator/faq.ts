import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I calculate fuel cost for a trip?",
    answer:
      "Divide the trip distance by your vehicle's fuel efficiency (MPG) to get gallons needed, then multiply by the fuel price per gallon. Formula: Fuel Cost = (Distance / MPG) × Price per Gallon. For metric: Fuel Cost = (Distance × L/100km / 100) × Price per Liter. This calculator handles both systems automatically.",
  },
  {
    question: "What is a good fuel efficiency (MPG)?",
    answer:
      "Fuel efficiency varies widely by vehicle type. Compact cars typically get 30-40 MPG, sedans get 25-35 MPG, SUVs get 20-30 MPG, pickup trucks get 15-25 MPG, and hybrids get 40-60 MPG. Electric vehicles are rated in MPGe (miles per gallon equivalent) and typically achieve 80-130 MPGe. Check your vehicle's window sticker or owner's manual for the exact rating.",
  },
  {
    question: "What is the average gas price in the US?",
    answer:
      "As of 2024-2025, the average US gas price ranges from $3.00 to $3.80 per gallon, though this fluctuates significantly by state, season, and global oil prices. California and Hawaii tend to have the highest prices ($4.50+), while states like Texas and Mississippi often have the lowest ($2.70-$3.00). Check GasBuddy or AAA for current prices in your area.",
  },
  {
    question: "How do I convert MPG to L/100km?",
    answer:
      "To convert MPG to L/100km, divide 235.215 by the MPG value. For example, 30 MPG = 235.215 / 30 = 7.84 L/100km. Conversely, to convert L/100km to MPG, divide 235.215 by the L/100km value. A lower L/100km value means better fuel efficiency, while a higher MPG means better efficiency. This calculator handles the conversion for you when you switch unit systems.",
  },
  {
    question: "Does driving speed affect fuel consumption?",
    answer:
      "Yes, significantly. Most vehicles achieve optimal fuel efficiency between 45-65 mph (72-105 km/h). Above 50 mph, fuel efficiency drops rapidly — for every 5 mph over 50 mph, you pay roughly $0.20-$0.30 more per gallon. Driving at 75 mph instead of 65 mph can reduce fuel efficiency by 15-20%. Using cruise control on highways, maintaining steady speeds, and avoiding rapid acceleration/braking can save 10-30% on fuel costs.",
  },
  {
    question: "How can I reduce my fuel costs?",
    answer:
      "Key strategies include: (1) Maintain proper tire pressure — underinflated tires increase fuel use by 3%. (2) Remove excess weight from your vehicle. (3) Avoid excessive idling. (4) Use the recommended grade of motor oil. (5) Keep up with regular maintenance (air filters, spark plugs). (6) Plan routes to avoid traffic and detours. (7) Consider carpooling or combining errands. (8) Use fuel price apps to find the cheapest nearby stations.",
  },
  {
    question: "How accurate is this fuel cost estimate?",
    answer:
      "This calculator provides a good estimate for highway driving at steady speeds. Actual fuel consumption may vary due to: city vs highway driving mix, traffic congestion, driving habits (aggressive vs gentle), terrain (hills, mountains), weather conditions, vehicle load, AC usage, and engine condition. For highway trips, the estimate is usually within 5-10% of actual. For mixed city/highway trips, actual costs may be 10-20% higher than estimated.",
  },
  {
    question: "Should I include the return trip in my calculation?",
    answer:
      "Yes, if you're planning a round trip, double the distance in the calculator. Alternatively, you can enter the total round-trip distance directly. Most road trips are round trips, so this is a common approach. For example, a 500-mile one-way trip becomes 1,000 miles round trip.",
  },
  {
    question: "What is the difference between city and highway MPG?",
    answer:
      "City MPG is typically 15-30% lower than highway MPG due to frequent stops, acceleration, idling, and lower average speeds. For example, a car rated at 25 city / 35 highway MPG would achieve about 28-30 MPG in mixed driving. When calculating trip costs, use highway MPG for long road trips and city MPG for urban deliveries or commuting.",
  },
  {
    question: "How much does AC affect fuel consumption?",
    answer:
      "Using air conditioning typically reduces fuel efficiency by 5-25%, depending on the vehicle and outside temperature. At highway speeds, AC use reduces MPG by about 5-10%. In city driving or very hot conditions, the impact can be 15-25% because the AC compressor puts additional load on the engine. At low speeds, rolling down windows may be more efficient than using AC, but at highway speeds, open windows create aerodynamic drag that's worse than AC.",
  },
]
