import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "Is this invoice generator free to use?",
    answer:
      "Yes, completely free. There are no premium plans, no watermarks, and no limits on the number of invoices you can create. Generate as many invoices as your business needs at no cost.",
  },
  {
    question: "Does the invoice number auto-generate?",
    answer:
      "Yes. The invoice number is automatically set to a sequential format (e.g., INV-0001) when you open the tool. You can change it to any format you prefer — such as your own numbering system, a client reference, or a date-based code.",
  },
  {
    question: "Can I add tax to my invoice?",
    answer:
      "Yes. Enter your tax rate as a percentage (e.g., 10 for 10%) in the Tax Rate field. The tax amount is calculated automatically on the subtotal and displayed in the totals section of the invoice.",
  },
  {
    question: "How does the discount feature work?",
    answer:
      "You can apply a flat discount amount (e.g., $50 off) or a percentage discount (e.g., 10% off the subtotal). Select the discount type, enter the value, and the total is recalculated instantly.",
  },
  {
    question: "Can I add more line items?",
    answer:
      "Yes. Click the 'Add Line Item' button to add as many rows as you need. Each row has a description, quantity, and unit price. The line total is calculated automatically. You can also remove any row by clicking the X button.",
  },
  {
    question: "How do I print or save my invoice?",
    answer:
      "Click the Print Invoice button to open your browser's print dialog. From there you can print directly to paper or choose 'Save as PDF' to download a PDF copy. The print layout is clean and professional, hiding all editing controls.",
  },
  {
    question: "Is my invoice data stored or sent anywhere?",
    answer:
      "No. All data you enter remains in your browser. Nothing is sent to a server, stored in a database, or shared with third parties. When you close the tab, all data is gone.",
  },
  {
    question: "What currency does the invoice use?",
    answer:
      "The invoice uses a generic currency symbol ($). Since the tool is client-side, you can mentally treat this as USD, EUR, GBP, or any other currency. The calculations work the same regardless of currency.",
  },
  {
    question: "Can I use this for my small business?",
    answer:
      "Absolutely. This invoice generator is designed for freelancers, contractors, and small businesses who need a quick, professional invoice without the overhead of accounting software. It covers all the essential fields: business info, client details, line items, tax, discounts, and notes.",
  },
  {
    question: "What information should I include in an invoice?",
    answer:
      "A professional invoice should include: your business name and contact details, the client's name and address, a unique invoice number, the issue date and due date, a detailed list of services or products with prices, the subtotal, any applicable tax and discounts, the total amount due, and payment terms or notes.",
  },
]
