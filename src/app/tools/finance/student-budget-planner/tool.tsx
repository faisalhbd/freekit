"use client"

import { useState, useMemo } from "react"
import { GraduationCap, DollarSign, TrendingUp, TrendingDown, Lightbulb } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num)) return "$0.00"
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Data ───────────────────────────────────────────────────────────────────

const INCOME_CATS = [
  { key: "job", label: "Part-Time Job", icon: "💼" },
  { key: "parents", label: "Parental Support", icon: "👨‍👩‍👧" },
  { key: "loans", label: "Student Loans / Aid", icon: "🎓" },
  { key: "otherIncome", label: "Other Income", icon: "💰" },
] as const

type IncomeKey = (typeof INCOME_CATS)[number]["key"]

const EXPENSE_CATS = [
  { key: "tuition", label: "Tuition / Fees", color: "bg-rose-500", icon: "📚" },
  { key: "housing", label: "Housing / Rent", color: "bg-amber-500", icon: "🏠" },
  { key: "food", label: "Food / Groceries", color: "bg-emerald-500", icon: "🍕" },
  { key: "transport", label: "Transportation", color: "bg-sky-500", icon: "🚌" },
  { key: "books", label: "Books / Supplies", color: "bg-violet-500", icon: "📖" },
  { key: "entertainment", label: "Entertainment", color: "bg-pink-500", icon: "🎮" },
  { key: "phone", label: "Phone / Internet", color: "bg-teal-500", icon: "📱" },
  { key: "subscriptions", label: "Subscriptions", color: "bg-orange-500", icon: "📺" },
  { key: "otherExpense", label: "Other Expenses", color: "bg-gray-500", icon: "📦" },
] as const

type ExpenseKey = (typeof EXPENSE_CATS)[number]["key"]

// ─── Main Component ─────────────────────────────────────────────────────────

export function StudentBudgetPlannerTool() {
  const [income, setIncome] = useState<Record<IncomeKey, string>>({
    job: "", parents: "", loans: "", otherIncome: "",
  })
  const [expenses, setExpenses] = useState<Record<ExpenseKey, string>>({
    tuition: "", housing: "", food: "", transport: "", books: "",
    entertainment: "", phone: "", subscriptions: "", otherExpense: "",
  })

  const updateIncome = (key: IncomeKey, val: string) => setIncome((p) => ({ ...p, [key]: val }))
  const updateExpense = (key: ExpenseKey, val: string) => setExpenses((p) => ({ ...p, [key]: val }))

  const result = useMemo(() => {
    let totalIncome = 0
    const parsedIncome: Record<string, number> = {}
    for (const cat of INCOME_CATS) {
      const val = parseInput(income[cat.key])
      parsedIncome[cat.key] = val
      totalIncome += val
    }

    let totalExpenses = 0
    const parsedExpenses: Record<string, number> = {}
    const breakdown = [] as { key: string; label: string; color: string; amount: number; pct: number }[]

    for (const cat of EXPENSE_CATS) {
      const val = parseInput(expenses[cat.key])
      parsedExpenses[cat.key] = val
      totalExpenses += val
      if (val > 0) {
        breakdown.push({ key: cat.key, label: cat.label, color: cat.color, amount: val, pct: 0 })
      }
    }

    // Calculate percentages
    for (const item of breakdown) {
      item.pct = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0
    }

    const surplus = totalIncome - totalExpenses
    const isSurplus = surplus >= 0

    // Generate tips
    const tips: string[] = []
    if (isSurplus) {
      tips.push(`Great job! You have a ${formatCurrency(surplus)} monthly surplus. Consider allocating it to an emergency fund.`)
      tips.push("Even saving $25/month builds strong financial habits for life.")
      if (parsedIncome.loans > 0) {
        tips.push("Consider using your surplus to reduce future loan borrowing.")
      }
    } else {
      tips.push(`You have a ${formatCurrency(Math.abs(surplus))} monthly deficit. Review your expenses to find areas to cut.`)
      tips.push("Consider increasing income with a part-time job, tutoring, or campus work-study.")
      if (parsedExpenses.entertainment > 150) {
        tips.push("Your entertainment budget is above average. Look for free campus events and student discounts.")
      }
      if (parsedExpenses.food > 400) {
        tips.push("Try meal prepping to reduce food costs by 20-30%.")
      }
      if (parsedExpenses.subscriptions > 50) {
        tips.push("Review your subscriptions — cancel any you haven't used this month.")
      }
    }

    return { totalIncome, totalExpenses, surplus, isSurplus, breakdown, tips, parsedIncome, parsedExpenses }
  }, [income, expenses])

  const hasData = result.totalIncome > 0 || result.totalExpenses > 0

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <GraduationCap className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Student Budget Planner</h3>
              <p className="text-sm text-muted-foreground">
                Track your income and expenses to stay on budget
              </p>
            </div>
          </div>

          {/* Income Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Monthly Income</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {INCOME_CATS.map((cat) => (
                <div key={cat.key} className="space-y-1.5">
                  <Label htmlFor={`sbp-${cat.key}`} className="text-sm font-medium flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id={`sbp-${cat.key}`}
                      type="text" inputMode="decimal"
                      value={income[cat.key]}
                      onChange={(e) => updateIncome(cat.key, e.target.value)}
                      placeholder="0.00"
                      className="pl-9 font-mono text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Expenses Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Monthly Expenses</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXPENSE_CATS.map((cat) => (
                <div key={cat.key} className="space-y-1.5">
                  <Label htmlFor={`sbp-${cat.key}`} className="text-sm font-medium flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id={`sbp-${cat.key}`}
                      type="text" inputMode="decimal"
                      value={expenses[cat.key]}
                      onChange={(e) => updateExpense(cat.key, e.target.value)}
                      placeholder="0.00"
                      className="pl-9 font-mono text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          {hasData && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Total Income</p>
                  <p className="text-xl font-bold tabular-nums">{formatCurrency(result.totalIncome)}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-destructive">Total Expenses</p>
                  <p className="text-xl font-bold tabular-nums">{formatCurrency(result.totalExpenses)}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
                <div className={`rounded-lg border p-4 space-y-1 ${result.isSurplus ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"}`}>
                  <div className="flex items-center gap-2">
                    {result.isSurplus ? <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" /> : <TrendingDown className="size-4 text-destructive" />}
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{result.isSurplus ? "Monthly Surplus" : "Monthly Deficit"}</p>
                  </div>
                  <p className={`text-xl font-bold tabular-nums ${result.isSurplus ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {result.surplus > 0 ? "+" : ""}{formatCurrency(result.surplus)}
                  </p>
                  <p className="text-xs text-muted-foreground">{result.isSurplus ? "extra per month" : "shortfall per month"}</p>
                </div>
              </div>

              {/* Expense Breakdown */}
              {result.breakdown.length > 0 && (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="px-4 py-3 bg-muted/50 border-b">
                      <h4 className="font-semibold text-sm">Expense Breakdown</h4>
                    </div>
                    {/* Stacked bar */}
                    <div className="px-4 pt-4 pb-2">
                      <div className="h-6 rounded-full overflow-hidden flex">
                        {result.breakdown.map((b) => (
                          <div
                            key={b.key}
                            className={`${b.color} transition-all duration-300`}
                            style={{ width: `${b.pct}%` }}
                            title={`${b.label}: ${formatCurrency(b.amount)}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="divide-y">
                      {result.breakdown.map((b) => (
                        <div key={b.key} className="flex items-center gap-3 px-4 py-2.5">
                          <div className={`size-3 rounded-full ${b.color} shrink-0`} />
                          <span className="text-sm flex-1 min-w-0 truncate">{b.label}</span>
                          <span className="font-mono text-sm font-medium tabular-nums">{formatCurrency(b.amount)}</span>
                          <span className="font-mono text-xs text-muted-foreground w-12 text-right">{b.pct.toFixed(1)}%</span>
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden hidden sm:block">
                            <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tips */}
              {result.tips.length > 0 && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="size-4 text-amber-600 dark:text-amber-400" />
                    <h4 className="text-sm font-semibold">Budget Tips</h4>
                  </div>
                  <ul className="space-y-2">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <GraduationCap className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">All calculations happen locally. Your financial data is never sent to any server.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
