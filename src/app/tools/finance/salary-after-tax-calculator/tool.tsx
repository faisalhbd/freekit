"use client"

import { useState, useMemo } from "react"
import {
  Receipt,
  DollarSign,
  Shield,
  Heart,
  PiggyBank,
  ChevronDown,
  Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

// ─── Tax Brackets ───────────────────────────────────────────────────────────

type FilingStatus = "single" | "married" | "head_of_household"

interface Bracket {
  min: number
  max: number
  rate: number
}

const BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.1 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.1 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.1 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
}

const SS_WAGE_BASE = 168600
const SS_RATE = 0.062
const MEDICARE_RATE = 0.0145

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 14600,
  married: 29200,
  head_of_household: 21900,
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function SalaryAfterTaxCalculatorTool() {
  const [salaryStr, setSalaryStr] = useState("")
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single")
  const [stateRateStr, setStateRateStr] = useState("")
  const [healthInsStr, setHealthInsStr] = useState("")
  const [k401Str, setK401Str] = useState("")
  const [showBrackets, setShowBrackets] = useState(false)

  const salary = parseInput(salaryStr)
  const stateRate = parseInput(stateRateStr) / 100
  const healthIns = parseInput(healthInsStr)
  const k401 = parseInput(k401Str)

  const result = useMemo(() => {
    if (salary <= 0) return null

    const totalPreTaxDeductions = healthIns + k401
    const taxableIncome = Math.max(0, salary - totalPreTaxDeductions - STANDARD_DEDUCTIONS[filingStatus])

    // Federal tax
    const brackets = BRACKETS[filingStatus]
    let federalTax = 0
    const bracketDetails: { range: string; rate: string; tax: string; taxable: string }[] = []

    for (const bracket of brackets) {
      if (taxableIncome <= bracket.min) break
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min
      const taxInBracket = taxableInBracket * bracket.rate
      federalTax += taxInBracket
      bracketDetails.push({
        range: bracket.max === Infinity ? `$${bracket.min.toLocaleString()}+` : `$${bracket.min.toLocaleString()} – $${bracket.max.toLocaleString()}`,
        rate: `${(bracket.rate * 100).toFixed(0)}%`,
        taxable: formatCurrency(taxableInBracket),
        tax: formatCurrency(taxInBracket),
      })
    }

    // State tax
    const stateTaxableIncome = Math.max(0, salary - totalPreTaxDeductions)
    const stateTax = stateTaxableIncome * stateRate

    // FICA
    const ssWages = Math.min(salary, SS_WAGE_BASE)
    const socialSecurity = ssWages * SS_RATE
    const medicare = salary * MEDICARE_RATE

    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + healthIns + k401
    const annualTakeHome = salary - totalDeductions
    const monthlyTakeHome = annualTakeHome / 12
    const biWeeklyTakeHome = annualTakeHome / 26
    const effectiveRate = salary > 0 ? (totalDeductions / salary) * 100 : 0

    return {
      salary,
      totalPreTaxDeductions,
      standardDeduction: STANDARD_DEDUCTIONS[filingStatus],
      taxableIncome,
      federalTax,
      bracketDetails,
      stateTaxableIncome,
      stateTax,
      socialSecurity,
      medicare,
      healthIns,
      k401,
      totalDeductions,
      annualTakeHome,
      monthlyTakeHome,
      biWeeklyTakeHome,
      effectiveRate,
    }
  }, [salary, filingStatus, stateRate, healthIns, k401])

  const filingLabel = filingStatus === "single" ? "Single" : filingStatus === "married" ? "Married Filing Jointly" : "Head of Household"

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Receipt className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Salary After Tax Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Estimate your take-home pay with 2024 US tax brackets
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Gross Salary */}
            <div className="space-y-2">
              <Label htmlFor="sat-salary" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Gross Annual Salary
              </Label>
              <Input
                id="sat-salary"
                type="text"
                inputMode="decimal"
                value={salaryStr}
                onChange={(e) => setSalaryStr(e.target.value)}
                placeholder="e.g. 85000"
                className="font-mono text-base"
              />
            </div>

            {/* Filing Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Shield className="size-4" />
                Filing Status
              </Label>
              <Select value={filingStatus} onValueChange={(v) => setFilingStatus(v as FilingStatus)}>
                <SelectTrigger className="font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                  <SelectItem value="head_of_household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State Tax Rate */}
            <div className="space-y-2">
              <Label htmlFor="sat-state" className="text-sm font-medium flex items-center gap-2">
                <Info className="size-4" />
                State Tax Rate %
              </Label>
              <Input
                id="sat-state"
                type="text"
                inputMode="decimal"
                value={stateRateStr}
                onChange={(e) => setStateRateStr(e.target.value)}
                placeholder="e.g. 5 (or 0 if no state tax)"
                className="font-mono text-base"
              />
              <p className="text-xs text-muted-foreground">Enter effective rate. Use 0 for states with no income tax (TX, FL, NV, etc.)</p>
            </div>

            <Separator />

            {/* Other Deductions */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sat-health" className="text-sm font-medium flex items-center gap-2">
                  <Heart className="size-4 text-rose-500" />
                  Annual Health Insurance
                </Label>
                <Input
                  id="sat-health"
                  type="text"
                  inputMode="decimal"
                  value={healthInsStr}
                  onChange={(e) => setHealthInsStr(e.target.value)}
                  placeholder="e.g. 3600"
                  className="font-mono text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sat-401k" className="text-sm font-medium flex items-center gap-2">
                  <PiggyBank className="size-4 text-amber-500" />
                  Annual 401(k) Contribution
                </Label>
                <Input
                  id="sat-401k"
                  type="text"
                  inputMode="decimal"
                  value={k401Str}
                  onChange={(e) => setK401Str(e.target.value)}
                  placeholder="e.g. 6000"
                  className="font-mono text-base"
                />
              </div>
            </div>

            {/* Standard Deduction Info */}
            <div className="rounded-lg bg-muted/50 border border-border p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Standard Deduction ({filingLabel})</span>
                <span className="font-mono font-medium">{formatCurrency(STANDARD_DEDUCTIONS[filingStatus])}</span>
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">Annual Take-Home</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(result.annualTakeHome)}</p>
                  <p className="text-xs text-muted-foreground">{result.effectiveRate.toFixed(1)}% total deduction rate</p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Monthly Take-Home</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(result.monthlyTakeHome)}</p>
                  <p className="text-xs text-muted-foreground">Per month (12 months)</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">Bi-Weekly Take-Home</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(result.biWeeklyTakeHome)}</p>
                  <p className="text-xs text-muted-foreground">Per paycheck (26 pay periods)</p>
                </div>
              </div>

              {/* Detailed Breakdown Table */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b">
                    <h4 className="font-semibold text-sm">Detailed Deduction Breakdown</h4>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">Gross Annual Salary</span>
                      <span className="font-mono text-sm font-medium">{formatCurrency(result.salary)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-destructive/5">
                      <span className="text-sm text-destructive">Federal Income Tax</span>
                      <span className="font-mono text-sm font-medium text-destructive">-{formatCurrency(result.federalTax)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-destructive/5">
                      <span className="text-sm text-destructive">State Income Tax</span>
                      <span className="font-mono text-sm font-medium text-destructive">-{formatCurrency(result.stateTax)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-destructive/5">
                      <span className="text-sm text-destructive">Social Security (6.2%)</span>
                      <span className="font-mono text-sm font-medium text-destructive">-{formatCurrency(result.socialSecurity)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-destructive/5">
                      <span className="text-sm text-destructive">Medicare (1.45%)</span>
                      <span className="font-mono text-sm font-medium text-destructive">-{formatCurrency(result.medicare)}</span>
                    </div>
                    {result.healthIns > 0 && (
                      <div className="flex items-center justify-between px-4 py-3 bg-destructive/5">
                        <span className="text-sm text-destructive">Health Insurance</span>
                        <span className="font-mono text-sm font-medium text-destructive">-{formatCurrency(result.healthIns)}</span>
                      </div>
                    )}
                    {result.k401 > 0 && (
                      <div className="flex items-center justify-between px-4 py-3 bg-destructive/5">
                        <span className="text-sm text-destructive">401(k) Contribution</span>
                        <span className="font-mono text-sm font-medium text-destructive">-{formatCurrency(result.k401)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between px-4 py-3 bg-emerald-500/10">
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Net Take-Home Pay</span>
                      <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(result.annualTakeHome)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bracket Breakdown Toggle */}
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setShowBrackets(!showBrackets)}
              >
                <ChevronDown className={`size-4 transition-transform ${showBrackets ? "rotate-180" : ""}`} />
                {showBrackets ? "Hide" : "Show"} Federal Tax Bracket Breakdown
              </Button>

              {showBrackets && (
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="px-4 py-3 bg-muted/50 border-b">
                      <h4 className="font-semibold text-sm">2024 Federal Tax Brackets ({filingLabel})</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="px-4 py-2.5 text-left font-medium">Taxable Income Range</th>
                            <th className="px-4 py-2.5 text-right font-medium">Rate</th>
                            <th className="px-4 py-2.5 text-right font-medium">Taxable Amount</th>
                            <th className="px-4 py-2.5 text-right font-medium">Tax</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {result.bracketDetails.map((b, i) => (
                            <tr key={i}>
                              <td className="px-4 py-2.5 font-mono text-xs">{b.range}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{b.rate}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{b.taxable}</td>
                              <td className="px-4 py-2.5 text-right font-mono text-xs">{b.tax}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-muted/30 font-semibold">
                            <td className="px-4 py-2.5" colSpan={3}>Total Federal Tax</td>
                            <td className="px-4 py-2.5 text-right font-mono text-xs">{formatCurrency(result.federalTax)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Effective Rate Badge */}
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary">
                  Effective Tax Rate: {result.effectiveRate.toFixed(1)}%
                </Badge>
                <Badge variant="outline">
                  Marginal Rate: {result.bracketDetails[result.bracketDetails.length - 1]?.rate || "0%"}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Shield className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All tax calculations happen locally. Your salary information is never sent to any server, stored, or shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
