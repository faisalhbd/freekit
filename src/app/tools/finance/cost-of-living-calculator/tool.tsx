"use client"

import { useState, useMemo } from "react"
import { Home, DollarSign, PieChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num)) return "—"
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Categories ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: "rent", label: "Rent / Mortgage", color: "bg-rose-500", icon: "🏠" },
  { key: "utilities", label: "Utilities", color: "bg-amber-500", icon: "⚡" },
  { key: "groceries", label: "Groceries", color: "bg-emerald-500", icon: "🛒" },
  { key: "transportation", label: "Transportation", color: "bg-sky-500", icon: "🚗" },
  { key: "healthcare", label: "Healthcare", color: "bg-violet-500", icon: "🏥" },
  { key: "entertainment", label: "Entertainment", color: "bg-pink-500", icon: "🎬" },
  { key: "education", label: "Education", color: "bg-teal-500", icon: "📚" },
  { key: "clothing", label: "Clothing", color: "bg-orange-500", icon: "👕" },
  { key: "personalCare", label: "Personal Care", color: "bg-fuchsia-500", icon: "💇" },
  { key: "savings", label: "Savings", color: "bg-green-600", icon: "💰" },
  { key: "other", label: "Other", color: "bg-gray-500", icon: "📦" },
] as const

type CategoryKey = (typeof CATEGORIES)[number]["key"]

// ─── Main Component ─────────────────────────────────────────────────────────

export function CostOfLivingCalculatorTool() {
  const [values, setValues] = useState<Record<CategoryKey, string>>({
    rent: "",
    utilities: "",
    groceries: "",
    transportation: "",
    healthcare: "",
    entertainment: "",
    education: "",
    clothing: "",
    personalCare: "",
    savings: "",
    other: "",
  })

  const updateValue = (key: CategoryKey, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  const parsed = useMemo(() => {
    const result: Record<CategoryKey, number> = {} as Record<CategoryKey, number>
    let total = 0
    for (const cat of CATEGORIES) {
      const val = parseInput(values[cat.key])
      result[cat.key] = val
      total += val
    }
    return { values: result, total }
  }, [values])

  const hasAnyValue = parsed.total > 0

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Home className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Cost of Living Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter your monthly expenses to see your total cost of living
              </p>
            </div>
          </div>

          {/* Expense Inputs */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="space-y-1.5">
                <Label htmlFor={`col-${cat.key}`} className="text-sm font-medium flex items-center gap-1.5">
                  <span>{cat.icon}</span>
                  {cat.label}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id={`col-${cat.key}`}
                    type="text"
                    inputMode="decimal"
                    value={values[cat.key]}
                    onChange={(e) => updateValue(cat.key, e.target.value)}
                    placeholder="0.00"
                    className="pl-9 font-mono text-base"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          {hasAnyValue && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">Total Monthly Cost</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(parsed.total)}</p>
                  <p className="text-xs text-muted-foreground">Per month</p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Total Annual Cost</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(parsed.total * 12)}</p>
                  <p className="text-xs text-muted-foreground">Per year (×12)</p>
                </div>
              </div>

              {/* Visual Breakdown */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b flex items-center gap-2">
                    <PieChart className="size-4 text-muted-foreground" />
                    <h4 className="font-semibold text-sm">Expense Breakdown</h4>
                  </div>

                  {/* Stacked Bar */}
                  <div className="px-4 pt-4 pb-2">
                    <div className="h-6 rounded-full overflow-hidden flex">
                      {CATEGORIES.filter((cat) => parsed.values[cat.key] > 0).map((cat) => (
                        <div
                          key={cat.key}
                          className={`${cat.color} transition-all duration-300`}
                          style={{ width: `${(parsed.values[cat.key] / parsed.total) * 100}%` }}
                          title={`${cat.label}: ${formatCurrency(parsed.values[cat.key])}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Category List */}
                  <div className="divide-y">
                    {CATEGORIES.filter((cat) => parsed.values[cat.key] > 0).map((cat) => {
                      const pct = (parsed.values[cat.key] / parsed.total) * 100
                      return (
                        <div key={cat.key} className="flex items-center gap-3 px-4 py-2.5">
                          <div className={`size-3 rounded-full ${cat.color} shrink-0`} />
                          <span className="text-sm flex-1 min-w-0 truncate">{cat.label}</span>
                          <span className="font-mono text-sm font-medium tabular-nums">{formatCurrency(parsed.values[cat.key])}</span>
                          <span className="font-mono text-xs text-muted-foreground w-12 text-right">{pct.toFixed(1)}%</span>
                          <div className="w-20 h-2 rounded-full bg-muted overflow-hidden hidden sm:block">
                            <div
                              className={`h-full rounded-full ${cat.color}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Total Row */}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/50 font-semibold">
                    <span className="text-sm">Total</span>
                    <span className="font-mono text-sm">{formatCurrency(parsed.total)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Home className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All calculations happen locally. Your financial data is never sent to any server, stored, or shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
