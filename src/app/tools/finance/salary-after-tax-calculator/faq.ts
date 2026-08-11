import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How is federal income tax calculated?",
    answer:
      "Federal income tax in the US uses a progressive bracket system. For 2024 single filers: 10% on income up to $11,600, 12% from $11,601 to $47,150, 22% from $47,151 to $100,525, 24% from $100,526 to $191,950, 32% from $191,951 to $243,725, 35% from $243,726 to $609,350, and 37% on income above $609,350. Each bracket applies only to the income within that range, not your entire salary. This calculator computes your tax across all applicable brackets.",
  },
  {
    question: "What are the 2024 federal tax brackets for married filing jointly?",
    answer:
      "For married filing jointly in 2024: 10% on income up to $23,200, 12% from $23,201 to $94,300, 22% from $94,301 to $201,050, 24% from $201,051 to $383,900, 32% from $383,901 to $487,450, 35% from $487,451 to $731,200, and 37% above $731,200. These brackets are exactly double the single filer brackets. This calculator adjusts the brackets automatically based on your selected filing status.",
  },
  {
    question: "How much is Social Security tax?",
    answer:
      "Social Security tax (FICA) is 6.2% of your gross wages, applied to income up to the annual wage base limit of $168,600 for 2024. Any income above this threshold is not subject to Social Security tax. Your employer also pays a matching 6.2%, for a total of 12.4%. If you are self-employed, you pay the full 12.4% as self-employment tax.",
  },
  {
    question: "How much is Medicare tax?",
    answer:
      "Medicare tax is 1.45% of all your gross wages with no income cap. Unlike Social Security, there is no maximum wage base — all earnings are subject to Medicare tax. If your income exceeds $200,000 (single) or $250,000 (married filing jointly), an Additional Medicare Tax of 0.9% applies to the excess amount. This calculator includes the standard 1.45% Medicare tax.",
  },
  {
    question: "How do I find my state tax rate?",
    answer:
      "State tax rates vary significantly. States like Texas, Florida, Nevada, Washington, Wyoming, South Dakota, Alaska, Tennessee, and New Hampshire have no state income tax. California has the highest top rate at 13.3%. Most states use progressive brackets similar to federal tax. You can find your state's rate on your state's Department of Revenue website or on your most recent tax return. This calculator accepts an effective state tax rate as a percentage.",
  },
  {
    question: "What deductions can I include in this calculator?",
    answer:
      "This calculator includes fields for health insurance premiums and 401(k) retirement contributions as pre-tax deductions. These are subtracted from your gross income before federal and state taxes are calculated. Common pre-tax deductions include health insurance, dental insurance, vision insurance, HSA contributions, 401(k), 403(b), and flexible spending account (FSA) contributions. Post-tax deductions like Roth 401(k) and after-tax health insurance are not subtracted before tax calculation.",
  },
  {
    question: "Is this calculator accurate for my situation?",
    answer:
      "This calculator provides a good estimate based on standard 2024 federal tax brackets, standard deductions, and FICA taxes. However, it does not account for tax credits (child tax credit, EITC), itemized deductions, multiple jobs, tax-exempt income, capital gains, or state-specific deductions. For exact figures, consult a tax professional or use IRS tax withholding calculators. It is best used as a planning and estimation tool.",
  },
  {
    question: "How does filing status affect my take-home pay?",
    answer:
      "Filing status determines which tax brackets apply to your income. Single filers use the standard brackets. Married Filing Jointly uses brackets that are exactly double the single brackets, resulting in lower taxes on the same combined income. Head of Household gets brackets that are wider than single but narrower than married, available to unmarried individuals who pay more than half the cost of maintaining a home for a qualifying person. Choosing the right filing status can save thousands in taxes.",
  },
  {
    question: "What is the difference between gross and net salary?",
    answer:
      "Gross salary is your total compensation before any deductions — your agreed-upon annual salary. Net salary (take-home pay) is what remains after all deductions: federal tax, state tax, Social Security, Medicare, health insurance, retirement contributions, and any other deductions. The difference between gross and net can be 25-40% depending on your income level, filing status, state, and deductions. This calculator shows you exactly how much you take home.",
  },
  {
    question: "How often should I recalculate my take-home pay?",
    answer:
      "You should recalculate when: (1) you receive a raise or change jobs, (2) tax brackets change annually (IRS adjusts for inflation), (3) you change filing status due to marriage or divorce, (4) you move to a different state, (5) you change your 401(k) contribution percentage, (6) you add or change health insurance plans. Annual recalculation is recommended at minimum, as tax brackets, Social Security wage base, and standard deductions are adjusted each year.",
  },
]
