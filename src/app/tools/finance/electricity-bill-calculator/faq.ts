import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How is electricity consumption calculated?",
    answer:
      "Electricity consumption is measured in kilowatt-hours (kWh). The formula is: kWh = (Wattage × Hours Used per Day × Quantity) / 1000. For example, a 1500W AC running 8 hours a day uses (1500 × 8) / 1000 = 12 kWh per day. Multiply by your tariff rate per kWh to get the daily cost.",
  },
  {
    question: "What is the average electricity tariff in the US?",
    answer:
      "The average residential electricity rate in the US is approximately $0.12 to $0.16 per kWh, though this varies significantly by state. Hawaii has the highest rates (over $0.30/kWh) while states like Louisiana and Washington have some of the lowest (around $0.08–$0.10/kWh). Check your utility bill for your exact rate.",
  },
  {
    question: "Which household appliances use the most electricity?",
    answer:
      "The biggest energy consumers in most homes are HVAC systems (air conditioning and heating), water heaters, clothes dryers, electric ovens/ranges, and refrigerators. An AC unit (1500W) running 8 hours uses about 12 kWh/day. A water heater (2000W) running 1 hour uses 2 kWh/day. Reducing usage of these high-wattage appliances has the biggest impact on your bill.",
  },
  {
    question: "How can I reduce my electricity bill?",
    answer:
      "Key strategies include: (1) Switch to LED bulbs — they use 75% less energy than incandescent. (2) Use energy-efficient appliances with ENERGY STAR ratings. (3) Set AC to 24-26°C instead of lower temperatures. (4) Unplug devices on standby — phantom loads can add 5-10% to your bill. (5) Use natural light and ventilation when possible. (6) Run heavy appliances during off-peak hours if your utility offers time-of-use pricing. (7) Insulate your home to reduce heating/cooling needs.",
  },
  {
    question: "How do I find the wattage of my appliances?",
    answer:
      "Check the label on the back or bottom of the appliance, look in the user manual, or search for the model number online. The label usually shows wattage (W) or amperage (A) and voltage (V). If only amps and volts are listed, multiply them: Watts = Amps × Volts. For US appliances (120V), a 5A device uses 5 × 120 = 600 watts.",
  },
  {
    question: "What is the difference between watts (W) and kilowatt-hours (kWh)?",
    answer:
      "Watts (W) measure the rate of power consumption at any instant — like speed. Kilowatt-hours (kWh) measure total energy consumed over time — like distance. A 100W bulb running for 10 hours uses 1 kWh (100W × 10h / 1000). Your electricity bill charges you per kWh consumed, not per watt.",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "This calculator provides a good estimate based on the appliance wattages and usage hours you enter. Actual bills may differ due to: seasonal temperature variations, variable utility rates (tiered pricing), standby power consumption, appliance age and efficiency, and additional utility charges like service fees, taxes, and delivery charges. For the most accurate estimate, use the exact wattage from your appliance labels and your actual tariff rate from your utility bill.",
  },
  {
    question: "Does turning appliances off save energy?",
    answer:
      "Yes, turning appliances fully off saves energy. However, many devices consume standby power even when \"off\" — this is called phantom load or vampire power. TVs, game consoles, chargers, and computers can draw 1-10W on standby. Unplugging devices or using smart power strips can save 5-10% on your electricity bill. A device using 5W on standby 24/7 consumes about 43.8 kWh per year.",
  },
  {
    question: "How do utility tiered pricing plans work?",
    answer:
      "Many utilities charge different rates based on how much electricity you use. The first tier (baseline) has the lowest rate, and rates increase for each subsequent tier. For example, the first 500 kWh might cost $0.12/kWh, the next 300 kWh costs $0.16/kWh, and anything above costs $0.22/kWh. This calculator uses a flat rate, which is a good approximation. Check with your utility to see if they use tiered pricing.",
  },
  {
    question: "What is a good monthly electricity budget?",
    answer:
      "The average US household spends $115–$150 per month on electricity. A small apartment might use $50–$80/month, while a large home with central AC could spend $200–$400/month in summer. A good rule of thumb is that electricity should be 2-3% of your gross monthly income. If your bill seems high, use this calculator to identify which appliances are driving the cost.",
  },
]
