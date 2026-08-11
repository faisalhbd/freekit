import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a payslip?",
    answer:
      "A payslip (also called a pay stub, salary slip, or paycheck stub) is a document issued by an employer to an employee each pay period. It details the employee's earnings, tax withholdings, deductions, and the final net pay amount. Payslips serve as proof of income for loans, visa applications, and tax filings, and help employees verify that their pay is calculated correctly.",
  },
  {
    question: "How is net pay calculated?",
    answer:
      "Net pay is calculated as: Net Pay = Gross Pay − Total Deductions. Gross Pay includes basic salary plus any additional earnings (overtime, bonus, allowance). Total Deductions include tax withholdings, insurance premiums, pension contributions, and any other deductions. For example, if your gross pay is $5,000 and total deductions are $1,200, your net pay is $3,800. This is the amount deposited into your bank account.",
  },
  {
    question: "What should be included in a payslip?",
    answer:
      "A professional payslip includes: employer name and address, employee name, ID, department, and position, pay period dates (start, end, and pay date), detailed earnings breakdown (basic salary, overtime, bonus, allowances), deductions breakdown (tax, insurance, pension), gross pay, total deductions, and net pay. Additional information like year-to-date totals, leave balance, or employer tax ID may also be included depending on jurisdiction and company policy.",
  },
  {
    question: "How do I add custom earnings and deductions?",
    answer:
      "Use the 'Add Earnings' and 'Add Deductions' buttons in the editor panel. For earnings, enter a name (e.g., 'Overtime', 'Performance Bonus') and the amount. For deductions, enter a name (e.g., 'Health Insurance', 'Union Dues') and the amount. You can add multiple entries and remove any that you don't need. The tax deduction is calculated automatically as a percentage of gross pay.",
  },
  {
    question: "Is the tax calculation automatic?",
    answer:
      "Yes. Enter the tax percentage in the Tax Rate field, and the calculator automatically computes the tax amount based on the gross pay. For example, if gross pay is $4,000 and the tax rate is 20%, the tax deduction is $800. Note that this is a simple flat-rate calculation. Real-world tax systems often use progressive brackets, so consult your local tax authority for precise calculations. This tool is best for estimating and generating payslip formats.",
  },
  {
    question: "Can I use this for multiple employees?",
    answer:
      "This tool generates one payslip at a time. For multiple employees, generate each payslip individually, printing or saving each one. The reset button clears all fields so you can quickly move to the next employee. For businesses that need to generate payslips in bulk, consider dedicated payroll software that integrates with employee databases and handles tax calculations for multiple employees automatically.",
  },
  {
    question: "Is my employee data secure?",
    answer:
      "Yes. All data remains in your browser and is never transmitted to any server. No information is stored, logged, or shared. When you close the browser tab, all entered data is gone. This makes the tool safe for generating payslips with real employee information. For added security, clear your browser cache after use if you're on a shared computer.",
  },
  {
    question: "How do I print the payslip?",
    answer:
      "Click the 'Print Payslip' button. This opens your browser's print dialog where you can select a printer or save as PDF. The payslip preview is styled for clean printing — only the payslip itself will print, not the editor controls. Set the page size to A4 or Letter and margins to minimum for the best fit.",
  },
  {
    question: "What's the difference between gross pay and net pay?",
    answer:
      "Gross pay is the total earnings before any deductions. It includes the basic salary plus all additional earnings (overtime, bonuses, allowances). Net pay (also called take-home pay) is what remains after all deductions are subtracted from gross pay. Net pay is always less than or equal to gross pay. The difference between gross and net pay is the total deductions amount. For example, gross pay of $5,000 minus $1,500 in deductions equals a net pay of $3,500.",
  },
  {
    question: "Can I customize the payslip format?",
    answer:
      "The payslip follows a standard professional format with all essential sections. While you can't change the layout structure, you have full control over the content — employer details, employee details, pay period, earnings items, and deduction items are all customizable. The live preview shows exactly how the printed payslip will look, so you can verify the format before printing.",
  },
]
