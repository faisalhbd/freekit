"use client"

import { useState, useMemo } from "react"
import { Clock, DollarSign, Percent, Calendar, Briefcase, Calculator, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num)) return "—"
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function FreelanceHourlyRateCalculatorTool() {
  const [salaryStr, setSalaryStr] = useState("")
  const [expensesStr, setExpensesStr] = useState("")
  const [taxStr, setTaxStr] = useState("")
  const [vacationStr, setVacationStr] = useState("")
  const [sickStr, setSickStr] = useState("")
  const [billableHours, setBillableHours] = useState(5)
  const [workDays, setWorkDays] = useState(5)

  const desiredSalary = parseInput(salaryStr)
  const businessExpenses = parseInput(expensesStr)
  const taxRate = parseInput(taxStr) / 100
  const vacationDays = parseInput(vacationStr)
  const sickDays = parseInput(sickStr)

  const result = useMemo(() => {
    if (desiredSalary <= 0 || taxRate >= 1) return null

    const totalWorkDays = workDays * 52
    const nonWorkingDays = vacationDays + sickDays
    const actualWorkDays = Math.max(0, totalWorkDays - nonWorkingDays)
    const totalBillableHours = actualWorkDays * billableHours

    if (totalBillableHours <= 0) return null

    const requiredRevenue = (desiredSalary + businessExpenses) / (1 - taxRate)
    const hourlyRate = requiredRevenue / totalBillableHours

    return {
      totalWorkDays,
      nonWorkingDays,
      actualWorkDays,
      totalBillableHours,
      requiredRevenue,
      hourlyRate,
      dailyRate: hourlyRate * billableHours,
      weeklyRevenue: hourlyRate * billableHours * workDays,
    }
  }, [desiredSalary, businessExpenses, taxRate, vacationDays, sickDays, billableHours, workDays])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Freelance Hourly Rate Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate the rate you need to charge based on your goals and availability
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Salary + Expenses */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fh-salary" className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Desired Annual Salary
                </Label>
                <Input id="fh-salary" type="text" inputMode="decimal" value={salaryStr} onChange={(e) => setSalaryStr(e.target.value)} placeholder="e.g. 80000" className="font-mono text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fh-expenses" className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Annual Business Expenses
                </Label>
                <Input id="fh-expenses" type="text" inputMode="decimal" value={expensesStr} onChange={(e) => setExpensesStr(e.target.value)} placeholder="e.g. 12000" className="font-mono text-base" />
              </div>
            </div>

            {/* Tax Rate */}
            <div className="space-y-2">
              <Label htmlFor="fh-tax" className="text-sm font-medium flex items-center gap-2">
                <Percent className="size-4" />
                Total Tax Rate % (income + self-employment)
              </Label>
              <Input id="fh-tax" type="text" inputMode="decimal" value={taxStr} onChange={(e) => setTaxStr(e.target.value)} placeholder="e.g. 30" className="font-mono text-base" />
              <p className="text-xs text-muted-foreground">Include federal, state, and self-employment (FICA 15.3%) taxes. Typical total: 30-40%.</p>
            </div>

            <Separator />

            {/* Time Off */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fh-vacation" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="size-4" />
                  Vacation Days / Year
                </Label>
                <Input id="fh-vacation" type="text" inputMode="numeric" value={vacationStr} onChange={(e) => setVacationStr(e.target.value)} placeholder="e.g. 15" className="font-mono text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fh-sick" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="size-4" />
                  Sick Days / Year
                </Label>
                <Input id="fh-sick" type="text" inputMode="numeric" value={sickStr} onChange={(e) => setSickStr(e.target.value)} placeholder="e.g. 5" className="font-mono text-base" />
              </div>
            </div>

            <Separator />

            {/* Billable Hours Slider */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="size-4" />
                Billable Hours Per Day: <span className="font-mono text-primary">{billableHours}</span>
              </Label>
              <Slider
                value={[billableHours]}
                onValueChange={(v) => setBillableHours(v[0])}
                min={1}
                max={10}
                step={0.5}
              />
              <p className="text-xs text-muted-foreground">Most freelancers bill 4-6 hours per 8-hour day. Remaining time is non-billable (admin, marketing, etc.).</p>
            </div>

            {/* Work Days Slider */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="size-4" />
                Working Days Per Week: <span className="font-mono text-primary">{workDays}</span>
              </Label>
              <Slider
                value={[workDays]}
                onValueChange={(v) => setWorkDays(v[0])}
                min={1}
                max={7}
                step={1}
              />
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Main Result */}
              <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Your Required Hourly Rate</p>
                <p className="text-4xl font-bold tabular-nums text-primary">{formatCurrency(result.hourlyRate)}</p>
                <p className="text-xs text-muted-foreground">per billable hour</p>
              </div>

              {/* Secondary Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Daily Rate</p>
                  <p className="text-xl font-bold tabular-nums">{formatCurrency(result.dailyRate)}</p>
                  <p className="text-xs text-muted-foreground">{billableHours} billable hrs/day</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">Required Annual Revenue</p>
                  <p className="text-xl font-bold tabular-nums">{formatCurrency(result.requiredRevenue)}</p>
                  <p className="text-xs text-muted-foreground">After taxes</p>
                </div>
                <div className="rounded-lg border border-border p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Billable Hours</p>
                  <p className="text-xl font-bold tabular-nums">{result.totalBillableHours.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{result.actualWorkDays} working days</p>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b flex items-center gap-2">
                    <Calculator className="size-4 text-muted-foreground" />
                    <h4 className="font-semibold text-sm">How Your Rate Is Calculated</h4>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">Desired Salary</span>
                      <span className="font-mono text-sm">{formatCurrency(desiredSalary)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">+ Business Expenses</span>
                      <span className="font-mono text-sm">{formatCurrency(businessExpenses)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">= Pre-Tax Need</span>
                      <span className="font-mono text-sm font-medium">{formatCurrency(desiredSalary + businessExpenses)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
                      <span className="text-sm">÷ (1 - Tax Rate {(taxRate * 100).toFixed(0)}%)</span>
                      <span className="font-mono text-sm font-medium">{formatCurrency(result.requiredRevenue)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">÷ Total Billable Hours</span>
                      <span className="font-mono text-sm">{result.totalBillableHours.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-primary/5 font-semibold">
                      <span className="text-sm text-primary">= Required Hourly Rate</span>
                      <span className="font-mono text-sm text-primary">{formatCurrency(result.hourlyRate)}</span>
                    </div>
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
            <Clock className="size-5 text-emerald-600 dark:text-emerald-400" />
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
