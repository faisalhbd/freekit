import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is VAT (Value Added Tax)?",
    answer:
      "VAT (Value Added Tax) is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale. Unlike sales tax, which is only charged at the final point of purchase, VAT is collected at every stage. The total VAT amount is ultimately borne by the final consumer. Businesses can usually reclaim the VAT they paid on their purchases, making it a tax on the final consumption rather than on business inputs.",
  },
  {
    question: "What is the difference between VAT and sales tax?",
    answer:
      "The key difference is when and how the tax is collected. Sales tax is charged only once at the final point of sale to the consumer, while VAT is collected at each stage of production and distribution. Sales tax rates are typically displayed as a single percentage at checkout, whereas VAT is often already included in the displayed price (tax-inclusive pricing) in countries like the UK and EU. From the consumer's perspective, the total tax paid is usually similar, but the collection mechanism differs. Our <a href=\"/tools/calculator/percentage-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Percentage Calculator</a> can help with related percentage calculations.",
  },
  {
    question: "How do I add VAT or tax to a net price?",
    answer:
      "To add tax to a net (before-tax) price, multiply the net price by (1 + tax rate / 100). For example, to add 20% VAT to a $100 net price: $100 × 1.20 = $120 gross price. The tax amount is $20. Simply select the 'Add Tax to Net Price' mode in our calculator, enter your amount, choose a tax rate, and the result appears instantly with a full breakdown of net amount, tax amount, and gross total.",
  },
  {
    question: "How do I extract or remove VAT from a gross price?",
    answer:
      "To extract tax from a gross (tax-inclusive) price, divide by (1 + tax rate / 100). For example, to find the net price from a $120 gross price with 20% VAT: $120 / 1.20 = $100 net price. The VAT amount is $20. Select the 'Extract Tax from Gross Price' mode in our calculator, enter the gross amount, choose the tax rate, and the calculator will show you the net price and the tax portion.",
  },
  {
    question: "What are common VAT rates by country?",
    answer:
      "VAT rates vary significantly: the UK standard rate is 20% (reduced rate 5%), most EU countries range from 17% to 27% (Hungary has the highest at 27%), Australia uses GST at 10%, Canada has a federal GST of 5% plus provincial sales tax (PST) ranging from 0% to 10%, Japan's consumption tax is 10%, and India's GST ranges from 5% to 28% depending on the product category. The United States does not use VAT but has state and local sales taxes ranging from 0% to over 10%. Our calculator includes quick-select presets for these common rates.",
  },
  {
    question: "What is GST and how is it different from VAT?",
    answer:
      "GST (Goods and Services Tax) is essentially the same concept as VAT — a multi-stage consumption tax collected on value added at each supply chain stage. The main difference is terminology: countries like Australia, India, Canada, and New Zealand use 'GST' while European nations use 'VAT'. Japan calls it 'consumption tax'. Despite different names, the underlying mechanism is the same — a tax on consumption that businesses can typically claim back on inputs. Our calculator works for all of these tax types.",
  },
  {
    question: "What is reverse charge on VAT?",
    answer:
      "Reverse charge is a VAT mechanism where the responsibility for reporting and paying VAT shifts from the seller to the buyer. This is common in business-to-business (B2B) transactions across international borders within the EU, as well as for imported services and certain domestic supplies. Instead of the seller charging VAT on their invoice, the buyer accounts for both the output VAT (as if they sold it) and the input VAT (as if they purchased it), often resulting in a net zero VAT payment. If you need to calculate these amounts, use our calculator with your specific VAT rate.",
  },
  {
    question: "How does VAT apply to discounted prices?",
    answer:
      "VAT is generally calculated on the net price after all discounts have been applied. For example, if an item costs $100 with a 20% discount, the net price is $80, and 20% VAT on $80 gives $16 in tax, for a total of $96. This means discounts reduce both the base price and the tax amount. To calculate the combined effect, you can use our <a href=\"/tools/calculator/discount-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Discount Calculator</a> first, then use this VAT calculator on the discounted price.",
  },
  {
    question: "Is there such a thing as compound tax?",
    answer:
      "In most countries, VAT and sales tax are not compounded — they are calculated once on the net price. However, some jurisdictions apply multiple layers of tax. For example, in Canada, you may pay federal GST (5%) plus provincial PST on top, and some provinces use HST (a harmonized sales tax combining both). In India, certain goods attract both CGST and SGST, and some have an additional cess. In the US, some states allow local taxes on top of state sales tax. Our calculator handles single-rate calculations; for compound taxes, you can chain multiple calculations.",
  },
  {
    question: "What items are typically exempt from VAT or sales tax?",
    answer:
      "Tax-exempt items vary by country but commonly include basic groceries, prescription medications, medical devices, educational services, financial services, insurance, and certain government services. Many countries apply reduced VAT rates (0-5%) on essentials like food, books, children's clothing, and energy. In the US, many states exempt groceries and prescription drugs from sales tax. Always check your local tax authority's website for the specific exemptions that apply in your region, as these can change with legislation.",
  },
]
