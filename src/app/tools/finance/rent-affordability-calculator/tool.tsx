"use client"

import { useState, useMemo } from "react"
import { Key, DollarSign, AlertCircle, Wallet, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
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

// ─── Main Component ─────────────────────────────────────────────────────────

export function RentAffordabilityCalculatorTool() {
  const [incomeStr, setIncomeStr] = useState("")
  const [debtsStr, setDebtsStr] = useState("")
  const [rentPct, setRentPct] = useState(30)

  const monthlyIncome = parseInput(incomeStr)
  const monthlyDebts = parseInput(debtsStr)

  const result = useMemo(() => {
    if (monthlyIncome <= 0) return null

    const maxRent = monthlyIncome * (rentPct / 100)
    const remaining = monthlyIncome - maxRent - monthlyDebts
    const rentRange = { low: monthlyIncome * ((rentPct - 5) / 100), high: monthlyIncome * (rentPct / 100) }
    const rentPctOfNet = monthlyIncome > 0 ? (maxRent / monthlyIncome) * 100 : 0

    return { maxRent, remaining, rentRange, rentPctOfNet }
  }, [monthlyIncome, monthlyDebts, rentPct])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Key className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Rent Affordability Calculator</h3>
              <p className="text-sm text-muted-foreground">
                How much rent can you afford each month?
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Income */}
            <div className="space-y-2">
              <Label htmlFor="ra-income" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Monthly Gross Income
              </Label>
              <Input
                id="ra-income"
                type="text"
                inputMode="decimal"
                value={incomeStr}
                onChange={(e) => setIncomeStr(e.target.value)}
                placeholder="e.g. 5000"
                className="font-mono text-base"
              />
            </div>

            {/* Debts */}
            <div className="space-y-2">
              <Label htmlFor="ra-debts" className="text-sm font-medium flex items-center gap-2">
                <Wallet className="size-4" />
                Monthly Debts / Other Expenses
              </Label>
              <Input
                id="ra-debts"
                type="text"
                inputMode="decimal"
                value={debtsStr}
                onChange={(e) => setDebtsStr(e.target.value)}
                placeholder="e.g. 800 (car loan, student loans, etc.)"
                className="font-mono text-base"
              />
            </div>

            <Separator />

            {/* Rent % Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="size-4" />
                  Income Allocated to Rent
                </Label>
                <span className="font-mono text-lg font-bold text-primary">{rentPct}%</span>
              </div>
              <Slider
                value={[rentPct]}
                onValueChange={(v) => setRentPct(v[0])}
                min={20}
                max={40}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>20% (Conservative)</span>
                <span>30% (Standard)</span>
                <span>40% (Stretched)</span>
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Main Result */}
              <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Maximum Affordable Rent</p>
                <p className="text-4xl font-bold tabular-nums text-primary">{formatCurrency(result.maxRent)}</p>
                <p className="text-xs text-muted-foreground">per month ({rentPct}% of income)</p>
              </div>

              {/* Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Recommended Range</p>
                  <p className="text-xl font-bold tabular-nums">
                    {formatCurrency(result.rentRange.low)} – {formatCurrency(result.rentRange.high)}
                  </p>
                  <p className="text-xs text-muted-foreground">{(rentPct - 5)}%–{rentPct}% of income</p>
                </div>
                <div className={`rounded-lg border p-4 space-y-1 ${result.remaining >= 0 ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"}`}>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Remaining After Rent + Debts</p>
                  <p className={`text-xl font-bold tabular-nums ${result.remaining >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {formatCurrency(result.remaining)}
                  </p>
                  <p className="text-xs text-muted-foreground">for living expenses & savings</p>
                </div>
              </div>

              {/* Visual Bar */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b">
                    <h4 className="font-semibold text-sm">Budget Allocation</h4>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Stacked bar */}
                    <div className="relative">
                      <div className="h-8 rounded-full overflow-hidden flex">
                        <div
                          className="bg-primary"
                          style={{ width: `${rentPct}%` }}
                        />
                        <div
                          className="bg-amber-500"
                          style={{ width: `${monthlyIncome > 0 ? (monthlyDebts / monthlyIncome) * 100 : 0}%` }}
                        />
                        <div
                          className="bg-emerald-500"
                          style={{ width: `${monthlyIncome > 0 ? Math.max(0, (result.remaining / monthlyIncome) * 100) : 0}%` }}
                        />
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-primary shrink-0" />
                        <div>
                          <p className="font-medium">Rent</p>
                          <p className="text-muted-foreground">{rentPct}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-amber-500 shrink-0" />
                        <div>
                          <p className="font-medium">Debts</p>
                          <p className="text-muted-foreground">{monthlyIncome > 0 ? ((monthlyDebts / monthlyIncome) * 100).toFixed(1) : 0}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-emerald-500 shrink-0" />
                        <div>
                          <p className="font-medium">Remaining</p>
                          <p className="text-muted-foreground">{monthlyIncome > 0 ? Math.max(0, (result.remaining / monthlyIncome) * 100).toFixed(1) : 0}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.remaining < 0 && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3">
                  <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Budget Warning</p>
                    <p className="text-xs text-muted-foreground">
                      Your debts exceed the remaining budget after rent. Consider lowering your rent percentage or reducing existing debts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
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
