"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Landmark,
  DollarSign,
  Calendar,
  Calculator,
  Percent,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ─── Types ──────────────────────────────────────────────────────────────────

interface AmortizationRow {
  month: number
  emi: number
  principal: number
  interest: number
  balance: number
}

interface EMIResult {
  monthlyEMI: number
  totalInterest: number
  totalPayment: number
  principal: number
  schedule: AmortizationRow[]
  principalPercent: number
  interestPercent: number
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num)) return "—"
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  })
}

function formatNumber(num: number): string {
  if (!isFinite(num)) return "—"
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

function calculateEMI(principal: number, annualRate: number, tenureMonths: number): EMIResult | null {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) return null

  const r = annualRate / 12 / 100
  const n = tenureMonths

  // EMI = P × r × (1+r)^n / ((1+r)^n - 1)
  const factor = Math.pow(1 + r, n)
  const emi = (principal * r * factor) / (factor - 1)

  if (!isFinite(emi) || emi <= 0) return null

  const totalPayment = emi * n
  const totalInterest = totalPayment - principal

  // Build amortization schedule
  const schedule: AmortizationRow[] = []
  let balance = principal

  for (let i = 1; i <= n; i++) {
    const interestPart = balance * r
    const principalPart = emi - interestPart
    balance = Math.max(0, balance - principalPart)

    schedule.push({
      month: i,
      emi,
      principal: principalPart,
      interest: interestPart,
      balance,
    })
  }

  const principalPercent = (principal / totalPayment) * 100
  const interestPercent = (totalInterest / totalPayment) * 100

  return {
    monthlyEMI: emi,
    totalInterest,
    totalPayment,
    principal,
    schedule,
    principalPercent,
    interestPercent,
  }
}

// ─── CSS Donut Chart ─────────────────────────────────────────────────────────

function DonutChart({
  principalPercent,
  interestPercent,
}: {
  principalPercent: number
  interestPercent: number
}) {
  const clampedPrincipal = Math.max(0, Math.min(100, principalPercent))
  const clampedInterest = Math.max(0, Math.min(100, interestPercent))

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative size-40 sm:size-48">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/30"
          />
          {/* Principal arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={`${clampedPrincipal * 2.513} ${251.3}`}
            strokeLinecap="round"
            className="text-primary"
          />
          {/* Interest arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={`${clampedInterest * 2.513} ${251.3}`}
            strokeDashoffset={`${-clampedPrincipal * 2.513}`}
            strokeLinecap="round"
            className="text-amber-500 dark:text-amber-400"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Principal</span>
          <span className="text-lg font-bold tabular-nums">{clampedPrincipal.toFixed(1)}%</span>
          <span className="text-xs text-muted-foreground">Interest</span>
          <span className="text-lg font-bold tabular-nums">{clampedInterest.toFixed(1)}%</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Principal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-amber-500 dark:bg-amber-400" />
          <span className="text-sm text-muted-foreground">Interest</span>
        </div>
      </div>
    </div>
  )
}

// ─── Amortization Table ─────────────────────────────────────────────────────

function AmortizationTable({ schedule, initialRows = 12 }: { schedule: AmortizationRow[]; initialRows?: number }) {
  const [expanded, setExpanded] = useState(false)
  const displayedRows = expanded ? schedule : schedule.slice(0, initialRows)
  const hasMore = schedule.length > initialRows

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Amortization Schedule</h3>
        <Badge variant="outline" className="font-mono text-xs">
          {schedule.length} months
        </Badge>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-20 text-xs">Month</TableHead>
                <TableHead className="text-xs text-right">EMI</TableHead>
                <TableHead className="text-xs text-right">Principal</TableHead>
                <TableHead className="text-xs text-right">Interest</TableHead>
                <TableHead className="text-xs text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRows.map((row) => (
                <TableRow key={row.month}>
                  <TableCell className="font-mono text-xs">{row.month}</TableCell>
                  <TableCell className="font-mono text-xs text-right">{formatCurrency(row.emi)}</TableCell>
                  <TableCell className="font-mono text-xs text-right text-primary">{formatCurrency(row.principal)}</TableCell>
                  <TableCell className="font-mono text-xs text-right text-amber-600 dark:text-amber-400">{formatCurrency(row.interest)}</TableCell>
                  <TableCell className="font-mono text-xs text-right">{formatCurrency(row.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {hasMore && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full gap-2"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-4" />
              Show First {initialRows} Months
            </>
          ) : (
            <>
              <ChevronDown className="size-4" />
              Show All {schedule.length} Months
            </>
          )}
        </Button>
      )}
    </div>
  )
}

// ─── Formula Display ────────────────────────────────────────────────────────

function FormulaDisplay() {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 shrink-0">
          <Calculator className="size-5 text-primary" />
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <p className="text-sm font-medium">EMI Formula (Reducing Balance Method)</p>
          <div className="rounded-lg bg-muted/50 border border-border p-3 overflow-x-auto">
            <code className="text-sm font-mono whitespace-nowrap block">
              EMI = P &times; r &times; (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> - 1)
            </code>
          </div>
          <div className="grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">P</Badge>
              <span>= Principal loan amount</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">r</Badge>
              <span>= Monthly interest rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">n</Badge>
              <span>= Total months</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function LoanEMICalculatorTool() {
  const [loanAmountStr, setLoanAmountStr] = useState("")
  const [interestRateStr, setInterestRateStr] = useState("")
  const [tenureStr, setTenureStr] = useState("")
  const [tenureInYears, setTenureInYears] = useState(true)
  const [result, setResult] = useState<EMIResult | null>(null)
  const [calculated, setCalculated] = useState(false)

  // Slider values
  const loanSliderValue = useMemo(() => {
    const v = parseInput(loanAmountStr)
    return Math.max(0, Math.min(10000000, v))
  }, [loanAmountStr])

  const rateSliderValue = useMemo(() => {
    const v = parseInput(interestRateStr)
    return Math.max(0, Math.min(30, v))
  }, [interestRateStr])

  const tenureSliderValue = useMemo(() => {
    const v = parseInput(tenureStr)
    if (tenureInYears) return Math.max(0, Math.min(30, v))
    return Math.max(0, Math.min(360, v))
  }, [tenureStr, tenureInYears])

  const handleCalculate = useCallback(() => {
    const principal = parseInput(loanAmountStr)
    const annualRate = parseInput(interestRateStr)
    const tenure = parseInput(tenureStr)
    const tenureMonths = tenureInYears ? tenure * 12 : tenure

    const res = calculateEMI(principal, annualRate, tenureMonths)
    setResult(res)
    setCalculated(true)
  }, [loanAmountStr, interestRateStr, tenureStr, tenureInYears])

  const handleReset = useCallback(() => {
    setLoanAmountStr("")
    setInterestRateStr("")
    setTenureStr("")
    setTenureInYears(true)
    setResult(null)
    setCalculated(false)
  }, [])

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Landmark className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Loan / EMI Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter loan details to calculate your monthly installment
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="loan-amount" className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Loan Amount
                </Label>
                <Badge variant="secondary" className="font-mono">
                  {formatNumber(loanSliderValue)}
                </Badge>
              </div>
              <Slider
                value={[loanSliderValue]}
                onValueChange={(v) => setLoanAmountStr(String(v[0]))}
                min={0}
                max={10000000}
                step={10000}
                aria-label="Loan amount slider"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$10,000,000</span>
              </div>
              <div className="max-w-[240px]">
                <Input
                  id="loan-amount"
                  type="text"
                  inputMode="decimal"
                  value={loanAmountStr}
                  onChange={(e) => setLoanAmountStr(e.target.value)}
                  placeholder="e.g. 500000"
                  className="font-mono text-base"
                  aria-label="Loan amount"
                />
              </div>
            </div>

            <Separator />

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="interest-rate" className="text-sm font-medium flex items-center gap-2">
                  <Percent className="size-4" />
                  Interest Rate (% per year)
                </Label>
                <Badge variant="secondary" className="font-mono">
                  {rateSliderValue.toFixed(1)}%
                </Badge>
              </div>
              <Slider
                value={[rateSliderValue]}
                onValueChange={(v) => setInterestRateStr(String(v[0]))}
                min={0}
                max={30}
                step={0.1}
                aria-label="Interest rate slider"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>30%</span>
              </div>
              <div className="max-w-[160px]">
                <Input
                  id="interest-rate"
                  type="text"
                  inputMode="decimal"
                  value={interestRateStr}
                  onChange={(e) => setInterestRateStr(e.target.value)}
                  placeholder="e.g. 8.5"
                  className="font-mono text-base"
                  aria-label="Annual interest rate percentage"
                />
              </div>
            </div>

            <Separator />

            {/* Loan Tenure */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="loan-tenure" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="size-4" />
                  Loan Tenure
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Months</span>
                  <Switch
                    checked={tenureInYears}
                    onCheckedChange={setTenureInYears}
                    aria-label="Toggle between months and years"
                  />
                  <span className="text-xs text-muted-foreground">Years</span>
                </div>
              </div>
              <Slider
                value={[tenureSliderValue]}
                onValueChange={(v) => setTenureStr(String(v[0]))}
                min={0}
                max={tenureInYears ? 30 : 360}
                step={tenureInYears ? 1 : 1}
                aria-label="Loan tenure slider"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{tenureInYears ? "0 years" : "0 months"}</span>
                <span>{tenureInYears ? "30 years" : "360 months"}</span>
              </div>
              <div className="max-w-[160px]">
                <Input
                  id="loan-tenure"
                  type="text"
                  inputMode="numeric"
                  value={tenureStr}
                  onChange={(e) => setTenureStr(e.target.value)}
                  placeholder={tenureInYears ? "e.g. 20" : "e.g. 240"}
                  className="font-mono text-base"
                  aria-label={tenureInYears ? "Loan tenure in years" : "Loan tenure in months"}
                />
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCalculate} className="gap-2">
                <Calculator className="size-4" />
                Calculate EMI
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <Landmark className="size-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Error / Empty State */}
      {calculated && !result && (
        <Card className="p-6 text-center">
          <Landmark className="size-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="font-medium">Invalid Input</p>
          <p className="text-sm text-muted-foreground mt-1">
            Please enter a valid loan amount, interest rate greater than 0%, and a positive tenure.
          </p>
        </Card>
      )}

      {/* Results Section */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2.5">
                <IndianRupee className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">EMI Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  Your monthly payment and loan cost summary
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            {/* Result Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Monthly EMI */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wide flex items-center gap-1.5">
                  <CircleDollarSign className="size-3.5" />
                  Monthly EMI
                </p>
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {formatCurrency(result.monthlyEMI)}
                </p>
                <p className="text-xs text-muted-foreground">Fixed monthly payment</p>
              </div>

              {/* Total Interest */}
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <TrendingUp className="size-3.5" />
                  Total Interest Payable
                </p>
                <p className="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-400">
                  {formatCurrency(result.totalInterest)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {((result.totalInterest / result.principal) * 100).toFixed(1)}% of principal
                </p>
              </div>

              {/* Total Payment */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <TrendingDown className="size-3.5" />
                  Total Payment
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {formatCurrency(result.totalPayment)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Principal + Interest
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            {/* Donut Chart + Summary */}
            <div className="grid gap-6 sm:grid-cols-2 items-center">
              <DonutChart
                principalPercent={result.principalPercent}
                interestPercent={result.interestPercent}
              />
              <div className="space-y-3">
                <p className="text-sm font-medium">Payment Breakdown</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-primary" />
                      Principal
                    </span>
                    <span className="font-mono font-medium">{formatCurrency(result.principal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-amber-500 dark:bg-amber-400" />
                      Total Interest
                    </span>
                    <span className="font-mono font-medium">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>Total Payment</span>
                    <span className="font-mono">{formatCurrency(result.totalPayment)}</span>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 border border-border p-3 text-xs text-muted-foreground">
                  Over {result.schedule.length} months, you will pay{" "}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {formatCurrency(result.totalInterest)}
                  </span>{" "}
                  in interest — that is{" "}
                  <span className="font-semibold">
                    {((result.totalInterest / result.principal) * 100).toFixed(1)}%
                  </span>{" "}
                  of your original loan amount.
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Amortization Schedule */}
      {result && result.schedule.length > 0 && (
        <Card className="p-6">
          <AmortizationTable schedule={result.schedule} />
        </Card>
      )}

      {/* Formula Display */}
      <FormulaDisplay />

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Landmark className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All loan calculations happen locally using JavaScript. Your financial
              details are never sent to any server, stored, or shared. Close the tab
              and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
