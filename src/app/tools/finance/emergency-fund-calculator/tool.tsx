"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Shield, CheckCircle, AlertTriangle, Info } from "lucide-react"

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function getCoverageTip(months: number): { level: string; color: string; tip: string } {
  if (months <= 2) return { level: "Bare Minimum", color: "text-rose-600 dark:text-rose-400", tip: "This covers only very short-term issues. Consider building to at least 3 months." }
  if (months <= 4) return { level: "Minimum", color: "text-amber-600 dark:text-amber-400", tip: "You meet the minimum recommendation. Aim for 6 months for stronger protection." }
  if (months <= 7) return { level: "Recommended", color: "text-emerald-600 dark:text-emerald-400", tip: "This is the recommended coverage for most people. You have a solid safety net." }
  if (months <= 10) return { level: "Strong", color: "text-emerald-600 dark:text-emerald-400", tip: "Excellent coverage. Great for single-income families or less stable job situations." }
  return { level: "Excellent", color: "text-emerald-600 dark:text-emerald-400", tip: "Maximum security. Ideal for freelancers, self-employed, or high-risk situations." }
}

export function EmergencyFundCalculatorTool() {
  const [monthlyExpenses, setMonthlyExpenses] = useState("")
  const [currentSavings, setCurrentSavings] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [coverageMonths, setCoverageMonths] = useState([6])

  const expenses = parseFloat(monthlyExpenses) || 0
  const savings = parseFloat(currentSavings) || 0
  const contrib = parseFloat(monthlyContribution) || 0
  const months = coverageMonths[0]

  const results = useMemo(() => {
    if (expenses <= 0) return null

    const target = expenses * months
    const gap = Math.max(0, target - savings)
    const progress = target > 0 ? (savings / target) * 100 : 0
    const alreadyMet = savings >= target
    const monthsToGoal = contrib > 0 && !alreadyMet ? Math.ceil(gap / contrib) : 0

    const projection: { month: number; balance: number }[] = []
    if (!alreadyMet && contrib > 0) {
      let balance = savings
      for (let m = 1; m <= monthsToGoal && m <= 360; m++) {
        balance += contrib
        projection.push({ month: m, balance })
      }
    }

    const tip = getCoverageTip(months)

    return { target, gap, progress, alreadyMet, monthsToGoal, projection, tip }
  }, [expenses, savings, contrib, months])

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Your Finances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expenses" className="flex items-center gap-1.5">
                Monthly Expenses ($)
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="expenses"
                  type="number"
                  min="1"
                  placeholder="e.g., 3000"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Essential expenses only (rent, food, utilities, etc.)</p>
            </div>
            <div>
              <Label htmlFor="savings" className="flex items-center gap-1.5">
                Current Emergency Savings ($)
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="savings"
                  type="number"
                  min="0"
                  placeholder="e.g., 2000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="contribution" className="flex items-center gap-1.5">
              Monthly Savings Contribution ($)
            </Label>
            <div className="relative mt-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="contribution"
                type="number"
                min="0"
                placeholder="e.g., 500"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Coverage Months: {months}</Label>
              <Badge variant="outline">{months === 6 ? "Recommended" : months >= 9 ? "Strong" : months <= 3 ? "Minimum" : "Good"}</Badge>
            </div>
            <Slider
              value={coverageMonths}
              onValueChange={setCoverageMonths}
              min={1}
              max={12}
              step={1}
              className="w-full max-w-lg"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1 max-w-lg">
              <span>1 mo</span>
              <span>3 mo (min)</span>
              <span>6 mo (rec)</span>
              <span>9 mo</span>
              <span>12 mo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          {/* Goal Status */}
          <Card className={results.alreadyMet ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20" : "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20"}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {results.alreadyMet ? (
                  <CheckCircle className="size-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="size-6 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
                <div>
                  <p className="font-bold text-lg">
                    {results.alreadyMet ? "Goal Reached!" : `You need ${formatCurrency(results.gap)} more`}
                  </p>
                  <p className={`text-sm ${results.tip.color}`}>
                    Coverage Level: {results.tip.level} — {results.tip.tip}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Target Fund</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.target)}</p>
                <p className="text-xs text-muted-foreground mt-1">{months} months of expenses</p>
              </CardContent>
            </Card>
            <Card className={results.alreadyMet ? "border-emerald-200" : "border-rose-200"}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{results.alreadyMet ? "Surplus" : "Gap"}</p>
                <p className={`text-2xl font-bold mt-1 ${results.alreadyMet ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {formatCurrency(results.alreadyMet ? savings - results.target : results.gap)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold mt-1">{results.progress.toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Months to Goal</p>
                <p className="text-2xl font-bold mt-1">
                  {results.alreadyMet ? "0" : results.monthsToGoal > 0 ? results.monthsToGoal : "—"}
                </p>
                {results.monthsToGoal > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">{(results.monthsToGoal / 12).toFixed(1)} years</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Savings Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>{formatCurrency(savings)} saved</span>
                  <span>{formatCurrency(results.target)} target</span>
                </div>
                <div className="relative w-full h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-lg transition-all duration-500 ${results.progress >= 100 ? "bg-emerald-500" : results.progress >= 50 ? "bg-blue-500" : "bg-amber-500"}`}
                    style={{ width: `${Math.min(results.progress, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold drop-shadow-sm">
                      {results.progress.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Month-by-month projection */}
          {!results.alreadyMet && results.projection.length > 0 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Month-by-Month Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead className="text-right">Progress</TableHead>
                        <TableHead className="text-right w-32">Progress Bar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.projection.map((row) => {
                        const pct = results.target > 0 ? (row.balance / results.target) * 100 : 0
                        return (
                          <TableRow key={row.month}>
                            <TableCell className="font-medium">{row.month}</TableCell>
                            <TableCell className="text-right font-mono text-sm">{formatCurrency(row.balance)}</TableCell>
                            <TableCell className="text-right font-mono text-sm">{pct.toFixed(1)}%</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                                    style={{ width: `${Math.min(pct, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!results && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center py-12">
            <Shield className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Enter your monthly expenses to calculate your emergency fund target.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
