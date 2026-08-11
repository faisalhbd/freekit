import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is GPA and how is it calculated?",
    answer:
      "GPA stands for Grade Point Average. It is calculated by multiplying each course's grade points by its credit hours to get quality points, then dividing the total quality points by the total credit hours. For example, if you earned an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course, your GPA = (4.0 \u00d7 3 + 3.0 \u00d7 4) / (3 + 4) = 24 / 7 = 3.43.",
  },
  {
    question: "What is the difference between the 4.0 and 4.3 GPA scales?",
    answer:
      "The 4.0 scale is the most common in the United States, where the highest possible grade point is 4.0 (an A). On the 4.3 scale, an A+ is worth 4.3 points while an A remains at 4.0. Some Canadian universities and a few US institutions use the 4.3 scale. Our calculator supports both so you can match your school's grading system.",
  },
  {
    question: "What is the difference between weighted and unweighted GPA?",
    answer:
      "An unweighted GPA treats all courses equally on a standard scale (usually 4.0), regardless of course difficulty. A weighted GPA gives extra points for advanced courses like AP, IB, or Honors classes — often adding 0.5 to 1.0 extra points per grade. For example, a B in an AP class might be worth 4.0 instead of 3.0. This calculator provides the standard (unweighted) GPA calculation.",
  },
  {
    question: "How do I calculate my cumulative GPA?",
    answer:
      "Your cumulative GPA is the average of all your semester GPAs combined across your entire academic career. To calculate it, sum up all quality points (grade points \u00d7 credit hours) from every course you have taken, then divide by the total number of credit hours. This calculator handles cumulative GPA automatically when you enter all your courses from multiple semesters.",
  },
  {
    question: "How can I improve my GPA?",
    answer:
      "To improve your GPA, focus on courses with higher credit hours since they carry more weight in the calculation. Aim for better grades in future courses, as they will pull your average upward. Consider retaking courses where you earned low grades (many schools allow grade replacement). Also, balance your course load — taking fewer difficult courses in one semester can help you earn higher grades.",
  },
  {
    question: "What GPA do I need for graduate school?",
    answer:
      "Most graduate programs require a minimum GPA of 3.0 on a 4.0 scale, but competitive programs often look for 3.5 or higher. Top-tier programs may expect GPAs above 3.7. Keep in mind that some graduate schools also consider your major GPA, the trend of your grades (improving over time is a positive signal), and other factors like research experience and test scores.",
  },
  {
    question: "How does international GPA conversion work?",
    answer:
      "International GPA conversion varies by country and institution. Many countries use percentage-based systems (e.g., India, the UK) or different numerical scales (e.g., Germany uses 1.0\u20135.0 where 1.0 is the best). Credential evaluation services like WES provide official conversions. For general estimation, you can map percentage scores to the US 4.0 scale: 90\u2013100% = 4.0, 80\u201389% = 3.0\u20133.7, and so on.",
  },
  {
    question: "How do pass/fail courses affect my GPA?",
    answer:
      "Pass/fail (P/F) courses typically do not affect your GPA at all. If you pass, you earn the credit hours but no grade points are factored into your GPA calculation. If you fail, some schools count it as an F (0.0) in your GPA while others simply record it as a fail without GPA impact. Check your institution's specific policy, as rules vary.",
  },
  {
    question: "Should I round my GPA on a resume or application?",
    answer:
      "Most experts recommend listing your GPA to two decimal places (e.g., 3.47) without rounding. Some institutions allow rounding to one decimal place, but you should follow your school's policy. Never round up beyond what your school's official transcript shows — for example, a 3.49 should not be listed as 3.5. Always be truthful, as many employers and graduate schools verify GPAs against official transcripts.",
  },
  {
    question: "How does retaking a course affect my GPA?",
    answer:
      "The impact of retaking a course depends on your school's policy. Some institutions replace the original grade entirely with the new one for GPA calculation (grade replacement or forgiveness). Others average both attempts, or include both grades. If your school allows grade replacement, retaking a course where you earned a D or F can significantly boost your GPA. Always check your school's academic policy before deciding to retake a course.",
  },
]
