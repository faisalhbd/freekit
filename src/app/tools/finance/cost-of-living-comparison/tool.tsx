"use client"

import { useState, useMemo } from "react"
import { ArrowLeftRight, DollarSign, ArrowRight, ArrowDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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
  { key: "rent", label: "Rent / Mortgage" },
  { key: "utilities", label: "Utilities" },
  { key: "groceries", label: "Groceries" },
  { key: "transportation", label: "Transportation" },
  { key: "healthcare", label: "Healthcare" },
  { key: "entertainment", label: "Entertainment" },
  { key: "education", label: "Education" },
  { key: "clothing", label: "Clothing" },
  { key: "personalCare", label: "Personal Care" },
  { key: "savings", label: "Savings" },
  { key: "other", label: "Other" },
] as const

type CategoryKey = (typeof CATEGORIES)[number]["key"]

// ─── Main Component ─────────────────────────────────────────────────────────

export function CostOfLivingComparisonTool() {
  const [cityAName, setCityAName] = useState("")
  const [cityBName, setCityBName] = useState("")
  const [cityA, setCityA] = useState<Record<CategoryKey, string>>({
    rent: "", utilities: "", groceries: "", transportation: "", healthcare: "",
    entertainment: "", education: "", clothing: "", personalCare: "", savings: "", other: "",
  })
  const [cityB, setCityB] = useState<Record<CategoryKey, string>>({
    rent: "", utilities: "", groceries: "", transportation: "", healthcare: "",
    entertainment: "", education: "", clothing: "", personalCare: "", savings: "", other: "",
  })

  const updateCityA = (key: CategoryKey, val: string) => setCityA((p) => ({ ...p, [key]: val }))
  const updateCityB = (key: CategoryKey, val: string) => setCityB((p) => ({ ...p, [key]: val }))

  const result = useMemo(() => {
    const parsedA: Record<string, number> = {}
    const parsedB: Record<string, number> = {}
    let totalA = 0
    let totalB = 0

    for (const cat of CATEGORIES) {
      const a = parseInput(cityA[cat.key])
      const b = parseInput(cityB[cat.key])
      parsedA[cat.key] = a
      parsedB[cat.key] = b
      totalA += a
      totalB += b
    }

    const differences = CATEGORIES.map((cat) => {
      const a = parsedA[cat.key]
      const b = parsedB[cat.key]
      const diff = b - a
      const pct = a > 0 ? ((diff) / a) * 100 : b > 0 ? 100 : 0
      return { key: cat.key, label: cat.label, a, b, diff, pct }
    }).filter((d) => d.a > 0 || d.b > 0)

    return { totalA, totalB, monthlyDiff: totalB - totalA, annualDiff: (totalB - totalA) * 12, differences }
  }, [cityA, cityB])

  const hasResults = result.totalA > 0 || result.totalB > 0
  const aLabel = (cityAName || "").trim() || "City A"
  const bLabel = (cityBName || "").trim() || "City B"

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <ArrowLeftRight className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Cost of Living Comparison</h3>
              <p className="text-sm text-muted-foreground">Compare expenses between two cities side by side</p>
            </div>
          </div>

          {/* City Names */}
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="space-y-2">
              <Label htmlFor="colc-citya" className="text-sm font-medium">City A Name</Label>
              <Input id="colc-citya" value={cityAName} onChange={(e) => setCityAName(e.target.value)} placeholder="e.g. Austin, TX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="colc-cityb" className="text-sm font-medium">City B Name</Label>
              <Input id="colc-cityb" value={cityBName} onChange={(e) => setCityBName(e.target.value)} placeholder="e.g. San Francisco, CA" />
            </div>
          </div>

          <Separator />

          {/* Expense Rows */}
          <div className="mt-6 space-y-3">
            {/* Header */}
            <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_80px] items-end">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground pb-2">Category</p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground pb-2">{aLabel}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground pb-2">{bLabel}</p>
              <div /> {/* Spacer */}
            </div>

            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_80px] items-center">
                <Label className="text-sm font-medium">{cat.label}</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="text" inputMode="decimal"
                    value={cityA[cat.key]}
                    onChange={(e) => updateCityA(cat.key, e.target.value)}
                    placeholder="0.00"
                    className="pl-9 font-mono text-sm"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="text" inputMode="decimal"
                    value={cityB[cat.key]}
                    onChange={(e) => updateCityB(cat.key, e.target.value)}
                    placeholder="0.00"
                    className="pl-9 font-mono text-sm"
                  />
                </div>
                {(() => {
                  const a = parseInput(cityA[cat.key])
                  const b = parseInput(cityB[cat.key])
                  if (a === 0 && b === 0) return <div />
                  const pct = a > 0 ? ((b - a) / a) * 100 : 100
                  const isPositive = pct > 0
                  return (
                    <Badge variant={isPositive ? "destructive" : "default"} className={
                      !isPositive ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" : ""
                    }>
                      {isPositive ? "+" : ""}{pct.toFixed(1)}%
                    </Badge>
                  )
                })()}
              </div>
            ))}
          </div>

          {/* Results */}
          {hasResults && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Summary */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">Monthly Difference</p>
                  <p className={`text-2xl font-bold tabular-nums ${result.monthlyDiff > 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {result.monthlyDiff > 0 ? "+" : ""}{formatCurrency(result.monthlyDiff)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.monthlyDiff > 0 ? `${bLabel} is more expensive` : result.monthlyDiff < 0 ? `${aLabel} is more expensive` : "Same cost"}
                  </p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">Annual Difference</p>
                  <p className={`text-2xl font-bold tabular-nums ${result.annualDiff > 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {result.annualDiff > 0 ? "+" : ""}{formatCurrency(result.annualDiff)}
                  </p>
                  <p className="text-xs text-muted-foreground">Per year (×12)</p>
                </div>
                <div className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total {aLabel}</p>
                  <p className="text-lg font-bold tabular-nums">{formatCurrency(result.totalA)}</p>
                  <p className="text-xs text-muted-foreground">vs {formatCurrency(result.totalB)} ({bLabel})</p>
                </div>
              </div>

              {/* Detailed Comparison Table */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b">
                    <h4 className="font-semibold text-sm">Per-Category Comparison</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="px-4 py-2.5 text-left font-medium">Category</th>
                          <th className="px-4 py-2.5 text-right font-medium">{aLabel}</th>
                          <th className="px-4 py-2.5 text-right font-medium">{bLabel}</th>
                          <th className="px-4 py-2.5 text-right font-medium">Difference</th>
                          <th className="px-4 py-2.5 text-right font-medium">%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {result.differences.map((d) => (
                          <tr key={d.key} className={d.diff > 0 ? "bg-destructive/5" : d.diff < 0 ? "bg-emerald-500/5" : ""}>
                            <td className="px-4 py-2.5 font-medium">{d.label}</td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(d.a)}</td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(d.b)}</td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs font-medium ${d.diff > 0 ? "text-destructive" : d.diff < 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                              {d.diff > 0 ? "+" : ""}{formatCurrency(d.diff)}
                            </td>
                            <td className={`px-4 py-2.5 text-right font-mono text-xs ${d.diff > 0 ? "text-destructive" : d.diff < 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                              {d.pct > 0 ? "+" : ""}{d.pct.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/30 font-semibold">
                          <td className="px-4 py-2.5">Total</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(result.totalA)}</td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(result.totalB)}</td>
                          <td className={`px-4 py-2.5 text-right font-mono text-xs ${result.monthlyDiff > 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                            {result.monthlyDiff > 0 ? "+" : ""}{formatCurrency(result.monthlyDiff)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-xs">
                            {result.totalA > 0 ? `${(((result.totalB - result.totalA) / result.totalA) * 100).toFixed(1)}%` : "—"}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <ArrowLeftRight className="size-5 text-emerald-600 dark:text-emerald-400" />
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
