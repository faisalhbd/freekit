import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "BMI (Body Mass Index) is a numerical value calculated from your weight and height. The formula is BMI = weight (kg) / height (m)². For imperial units, it is BMI = (weight in lbs × 703) / (height in inches)². It provides a simple screening measure to categorize individuals as underweight, normal weight, overweight, or obese. Our <a href=\"/tools/calculator/bmi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">BMI Calculator</a> handles the math for you instantly.",
  },
  {
    question: "What are the BMI categories and their ranges?",
    answer:
      "The World Health Organization (WHO) classifies BMI into four main categories: Underweight is a BMI below 18.5, Normal weight ranges from 18.5 to 24.9, Overweight is between 25.0 and 29.9, and Obese is a BMI of 30.0 or higher. These ranges apply to adults aged 20 and older. Our calculator color-codes each category so you can instantly see where your result falls on the scale.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI is a useful screening tool but it has limitations. It does not distinguish between muscle mass and fat mass, so athletes or individuals with high muscle mass may have a high BMI without excess body fat. It also does not account for age, sex, ethnicity, or body fat distribution. For a more complete picture of health, BMI should be used alongside other measurements like waist circumference, body fat percentage, and consultation with a healthcare provider.",
  },
  {
    question: "Does BMI apply differently to men and women?",
    answer:
      "The standard BMI formula and categories are the same for adult men and women. However, women naturally tend to have more body fat than men at the same BMI value. Despite this, the WHO categories are universally applied for simplicity. Some health organizations suggest that women may have a slightly higher healthy BMI threshold, but the standard ranges (18.5–24.9 for normal) remain the most widely used reference.",
  },
  {
    question: "How do I convert between metric and imperial units for BMI?",
    answer:
      "To convert height: 1 inch = 2.54 cm, and 1 foot = 12 inches. To convert weight: 1 kg = 2.20462 lbs. Our calculator has a built-in unit toggle — simply switch between Metric (cm/kg) and Imperial (ft+in/lbs) and the conversion is handled automatically. No manual math needed. If you prefer to do it yourself, our <a href=\"/tools/calculator/unit-converter\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Unit Converter</a> can help with individual conversions.",
  },
  {
    question: "What is a healthy BMI for my height?",
    answer:
      "A healthy BMI is between 18.5 and 24.9 regardless of height. However, you can convert this to a healthy weight range for your specific height. For example, a person who is 170 cm (5'7\") tall has a healthy weight range of approximately 53.5 kg to 72.0 kg (118 lbs to 159 lbs). Our calculator displays your personalized healthy weight range based on the height you enter, making it easy to see your target zone.",
  },
  {
    question: "Can BMI be used for children and teens?",
    answer:
      "Standard BMI categories do not apply to children and teens (ages 2–19). Instead, health professionals use BMI-for-age percentiles, which compare a child's BMI to other children of the same age and sex. A BMI at the 85th to 94th percentile is considered overweight, and at or above the 95th percentile is considered obese. This calculator is designed for adults (20+). For children, consult a pediatrician.",
  },
  {
    question: "How often should I check my BMI?",
    answer:
      "For most adults, checking your BMI once every few months is sufficient unless you are actively trying to gain or lose weight, in which case monthly checks can help track progress. Remember that BMI is just one health indicator — it does not replace regular health check-ups, blood work, or body composition assessments. Consistent trends in your BMI over time are more meaningful than any single measurement.",
  },
  {
    question: "What should I do if my BMI is outside the normal range?",
    answer:
      "If your BMI falls outside the 18.5–24.9 range, do not panic. First, consider factors like muscle mass that may affect the result. If you believe excess body fat is a concern, consult a healthcare professional for personalized advice. They may recommend dietary changes, exercise plans, or further assessments. For weight management, our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> can help track body fat percentage changes.",
  },
  {
    question: "Is my BMI data stored or sent anywhere?",
    answer:
      "No. This BMI calculator runs entirely in your browser. Your height, weight, and calculated BMI are never sent to any server, stored in any database, or shared with anyone. As soon as you close or refresh the page, all entered data disappears. Your health information stays completely private.",
  },
]
