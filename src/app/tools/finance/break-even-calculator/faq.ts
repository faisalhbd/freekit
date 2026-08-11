import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the break-even point?",
    answer:
      "The break-even point is the number of units a business must sell to cover all its costs — neither making a profit nor incurring a loss. At this point, total revenue equals total costs. It is calculated as Break-even Units = Fixed Costs / (Selling Price per Unit - Variable Cost per Unit). For example, with $10,000 in fixed costs, a $50 selling price, and $30 variable cost per unit, the break-even point is 10,000 / (50 - 30) = 500 units. Selling more than 500 units generates profit; fewer results in a loss.",
  },
  {
    question: "What is the difference between fixed and variable costs?",
    answer:
      "Fixed costs are expenses that do not change with the number of units produced or sold. Examples include rent, salaries, insurance, loan payments, and equipment leases. Variable costs are expenses that increase directly with production volume. Examples include raw materials, direct labor per unit, packaging, and shipping. Total cost = Fixed Costs + (Variable Cost per Unit × Units Sold). Understanding this distinction is essential for accurate <a href=\"/tools/finance/break-even-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">break-even analysis</a>.",
  },
  {
    question: "What is contribution margin?",
    answer:
      "Contribution margin is the amount each unit sold contributes toward covering fixed costs and generating profit. It is calculated as Selling Price - Variable Cost per Unit. The contribution margin percentage is (Contribution Margin / Selling Price) × 100. For example, a product sold for $100 with $60 variable cost has a $40 contribution margin and a 40% contribution margin ratio. Higher contribution margins mean fewer units needed to break even. Products with higher contribution margins should generally be prioritized in sales efforts.",
  },
  {
    question: "How do I calculate break-even revenue?",
    answer:
      "Break-even revenue is the total sales revenue needed to cover all costs. It is calculated as Break-even Units × Selling Price per Unit. Alternatively, you can use: Break-even Revenue = Fixed Costs / Contribution Margin Ratio. For example, with $10,000 fixed costs and a 40% contribution margin ratio, break-even revenue = $10,000 / 0.40 = $25,000. This means you need $25,000 in total sales to cover all costs. Our calculator computes this automatically.",
  },
  {
    question: "What happens if my variable cost exceeds my selling price?",
    answer:
      "If variable cost per unit exceeds the selling price, the contribution margin is negative. This means every unit sold actually loses money on top of fixed costs. In this case, the break-even point is mathematically impossible — no number of sales will cover costs. This is a critical warning sign that the business model is unsustainable. You must either raise the selling price, reduce variable costs, or both. Our calculator will display an error message in this situation.",
  },
  {
    question: "How can I lower my break-even point?",
    answer:
      "You can lower your break-even point through three main strategies: (1) Reduce fixed costs — negotiate lower rent, outsource instead of hiring, or use shared workspace. (2) Increase selling price — even small price increases can significantly reduce the break-even quantity if demand remains stable. (3) Reduce variable costs — negotiate better supplier rates, improve manufacturing efficiency, or find cheaper materials. The most effective approach often combines all three. For example, reducing fixed costs by 20% and increasing contribution margin by 10% can lower break-even by over 25%.",
  },
  {
    question: "How does break-even analysis help in pricing decisions?",
    answer:
      "Break-even analysis shows how pricing changes affect the number of units needed to cover costs. If you raise prices, the contribution margin increases and fewer sales are needed to break even. If you lower prices to gain market share, you need more volume. For example, at $50 price with $30 variable cost, break-even might be 500 units. At $40 price, break-even jumps to 1,000 units. You can use this to determine if a price reduction is feasible given your sales volume projections. Combine with your <a href=\"/tools/finance/profit-margin-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Profit Margin Calculator</a> for comprehensive pricing analysis.",
  },
  {
    question: "Is break-even analysis only for physical products?",
    answer:
      "No, break-even analysis applies to any business that has fixed and variable costs. Service businesses can calculate break-even by treating each client or project as a \"unit.\" SaaS companies can use subscribers as units with monthly subscription as the selling price and server costs as variable costs. Restaurants can calculate break-even covers (customers served). Freelancers can determine how many projects they need per month. The concept is universal — any business with costs that must be covered by revenue can benefit from break-even analysis.",
  },
  {
    question: "What is margin of safety in break-even analysis?",
    answer:
      "Margin of safety is the difference between your actual or expected sales and the break-even point, expressed as a percentage. Formula: Margin of Safety % = ((Expected Sales - Break-even Sales) / Expected Sales) × 100. For example, if you expect to sell 800 units and break-even is 500 units, your margin of safety is ((800 - 500) / 800) × 100 = 37.5%. A higher margin of safety means more cushion against sales declines. Most healthy businesses aim for at least 20–30% margin of safety.",
  },
  {
    question: "How does break-even relate to ROI?",
    answer:
      "Break-even analysis tells you the minimum sales volume needed to avoid losses, while <a href=\"/tools/finance/roi-calculator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">ROI (Return on Investment)</a> measures the total profitability of an investment. Break-even is a survival metric — it shows the floor. ROI is a performance metric — it shows the ceiling. A business should first ensure it exceeds break-even (positive margin of safety), then focus on maximizing ROI. Use both together: break-even for planning and risk assessment, ROI for evaluating investment performance.",
  },
]