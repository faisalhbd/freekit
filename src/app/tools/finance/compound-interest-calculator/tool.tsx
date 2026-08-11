"use client"

import { useState, useMemo, useCallback } from "react"
import {
  PiggyBank,
  DollarSign,
  Percent,
  Calendar,
  Calculator,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  CircleDollarSign,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ─── Types ──────────────────────────────────────────────────────────────────

interface YearRow {
  year: number
  balance: number
  interest: number
  contributions: number
}

interface CIResult {
  futureValue: number
  totalInterest: number
  totalContributions: number
  principal: number
  table: YearRow[]
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

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  n: number,
  monthlyContrib: number
): CIResult | null {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return null

  const r = annualRate / 100
  const totalMonths = years * 12
  const ratePerPeriod = r / n

  // Build year-by-year table
  const table: YearRow[] = []
  let balance = principal
  let totalContrib = principal
  let totalInterest = 0

  // Monthly simulation for accuracy with contributions
  const monthlyRate = r / 12

  for (let month = 1; month <= totalMonths; month++) {
    balance = balance * (1 + monthlyRate) + monthlyContrib
    totalContrib += monthlyContrib

    if (month % 12 === 0 || month === totalMonths) {
      const yearInterest = balance - totalContrib
      const yearNum = Math.ceil(month / 12)
      const prevTotalInterest = table.length > 0
        ? table[table.length - 1].interest
        : 0
      const yearContributions = monthlyContrib * (table.length > 0 ? 12 : month)
      const prevContributions = table.length > 0
        ? table[table.length - 1].contributions
        : 0

      table.push({
        year: yearNum,
        balance,
        interest: balance - principal - monthlyContrib * month,
        contributions: principal + monthlyContrib * month,
      })
    }
  }

  const futureValue = balance
  const totalContributions = principal + monthlyContrib * totalMonths
  const totalInterestEarned = futureValue - totalContributions

  return {
    futureValue,
    totalInterest: totalInterestEarned,
    totalContributions,
    principal,
    table,
  }
}

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 h-7 text-xs">
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

// ─── Growth Table ────────────────────────────────────────────────────────────

function GrowthTable({ table, initialRows = 10 }: { table: YearRow[]; initialRows?: number }) {
  const [expanded, setExpanded] = useState(false)
  const displayedRows = expanded ? table : table.slice(0, initialRows)
  const hasMore = table.length > initialRows

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Year-by-Year Growth</h3>
        <Badge variant="outline" className="font-mono text-xs">
          {table.length} {table.length === 1 ? "year" : "years"}
        </Badge>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-20 text-xs">Year</TableHead>
                <TableHead className="text-right text-xs">Balance</TableHead>
                <TableHead className="text-right text-xs">Interest Earned</TableHead>
                <TableHead className="text-right text-xs">Contributions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRows.map((row) => (
                <TableRow key={row.year}>
                  <TableCell className="font-mono text-xs">{row.year}</TableCell>
                  <TableCell className="font-mono text-xs text-right font-semibold">{formatCurrency(row.balance)}</TableCell>
                  <TableCell className="font-mono text-xs text-right text-primary">{formatCurrency(row.interest)}</TableCell>
                  <TableCell className="font-mono text-xs text-right text-muted-foreground">{formatCurrency(row.contributions)}</TableCell>
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
              Show First {initialRows} Years
            </>
          ) : (
            <>
              <ChevronDown className="size-4" />
              Show All {table.length} Years
            </>
          )}
        </Button>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function CompoundInterestCalculatorTool() {
  const [principalStr, setPrincipalStr] = useState("")
  const [rateStr, setRateStr] = useState("")
  const [timeStr, setTimeStr] = useState("")
  const [timeInYears, setTimeInYears] = useState(true)
  const [frequency, setFrequency] = useState<string>("12")
  const [monthlyContribStr, setMonthlyContribStr] = useState("")
  const [result, setResult] = useState<CIResult | null>(null)
  const [calculated, setCalculated] = useState(false)

  const handleCalculate = useCallback(() => {
    const p = parseInput(principalStr)
    const r = parseInput(rateStr)
    const t = parseInput(timeStr)
    const years = timeInYears ? t : t / 12
    const n = parseInt(frequency, 10)
    const mc = parseInput(monthlyContribStr)

    const res = calculateCompoundInterest(p, r, years, n, mc)
    setResult(res)
    setCalculated(true)
  }, [principalStr, rateStr, timeStr, timeInYears, frequency, monthlyContribStr])

  const handleReset = useCallback(() => {
    setPrincipalStr("")
    setRateStr("")
    setTimeStr("")
    setTimeInYears(true)
    setFrequency("12")
    setMonthlyContribStr("")
    setResult(null)
    setCalculated(false)
  }, [])

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <PiggyBank className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Compound Interest Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate the future value of your investment with compound interest
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Principal */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ci-principal" className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Principal Amount
                </Label>
                <Input
                  id="ci-principal"
                  type="text"
                  inputMode="decimal"
                  value={principalStr}
                  onChange={(e) => setPrincipalStr(e.target.value)}
                  placeholder="e.g. 10000"
                  className="font-mono text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ci-rate" className="text-sm font-medium flex items-center gap-2">
                  <Percent className="size-4" />
                  Annual Interest Rate %
                </Label>
                <Input
                  id="ci-rate"
                  type="text"
                  inputMode="decimal"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
                  placeholder="e.g. 7"
                  className="font-mono text-base"
                />
              </div>
            </div>

            <Separator />

            {/* Time Period + Frequency */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ci-time" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="size-4" />
                  Time Period ({timeInYears ? "Years" : "Months"})
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="ci-time"
                    type="text"
                    inputMode="numeric"
                    value={timeStr}
                    onChange={(e) => setTimeStr(e.target.value)}
                    placeholder={timeInYears ? "e.g. 10" : "e.g. 120"}
                    className="font-mono text-base"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTimeInYears(!timeInYears)}
                    className="shrink-0 whitespace-nowrap text-xs"
                  >
                    Switch to {timeInYears ? "Months" : "Years"}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <CircleDollarSign className="size-4" />
                  Compounding Frequency
                </Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="font-mono text-base">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually (1x/year)</SelectItem>
                    <SelectItem value="2">Semi-annually (2x/year)</SelectItem>
                    <SelectItem value="4">Quarterly (4x/year)</SelectItem>
                    <SelectItem value="12">Monthly (12x/year)</SelectItem>
                    <SelectItem value="365">Daily (365x/year)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Monthly Contribution */}
            <div className="space-y-2">
              <Label htmlFor="ci-monthly" className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="size-4" />
                Monthly Contribution (optional)
              </Label>
              <div className="max-w-xs">
                <Input
                  id="ci-monthly"
                  type="text"
                  inputMode="decimal"
                  value={monthlyContribStr}
                  onChange={(e) => setMonthlyContribStr(e.target.value)}
                  placeholder="e.g. 200"
                  className="font-mono text-base"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Leave at 0 or empty to calculate without regular contributions
              </p>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCalculate} className="gap-2">
                <Calculator className="size-4" />
                Calculate
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <PiggyBank className="size-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Error State */}
      {calculated && !result && (
        <Card className="p-6 text-center">
          <PiggyBank className="size-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="font-medium">Invalid Input</p>
          <p className="text-sm text-muted-foreground mt-1">
            Please enter a valid principal, interest rate greater than 0%, and a positive time period.
          </p>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2.5">
                <PiggyBank className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Investment Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Your money over time with compound interest
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            {/* Result Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wide">Future Value</p>
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {formatCurrency(result.futureValue)}
                </p>
                <p className="text-xs text-muted-foreground">Total at maturity</p>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">Total Interest Earned</p>
                <p className="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-400">
                  {formatCurrency(result.totalInterest)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.totalContributions > 0
                    ? ((result.totalInterest / result.totalContributions) * 100).toFixed(1) + "% of contributions"
                    : "Interest earned"}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Contributions</p>
                <p className="text-2xl font-bold tabular-nums">
                  {formatCurrency(result.totalContributions)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Principal + additional deposits
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <CopyButton text={`Future Value: ${formatCurrency(result.futureValue)} | Interest: ${formatCurrency(result.totalInterest)} | Contributions: ${formatCurrency(result.totalContributions)}`} />
            </div>
          </div>
        </Card>
      )}

      {/* Formula Display */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 shrink-0">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="space-y-2 flex-1 min-w-0">
            <p className="text-sm font-medium">Compound Interest Formula</p>
            <div className="rounded-lg bg-muted/50 border border-border p-3 overflow-x-auto">
              <code className="text-sm font-mono whitespace-nowrap block">
                A = P(1 + r/n)<sup>nt</sup>
              </code>
            </div>
            <div className="grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-1.5">
                <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">A</Badge>
                <span>= Future value</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">P</Badge>
                <span>= Principal amount</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">r</Badge>
                <span>= Annual rate (decimal)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">n</Badge>
                <span>= Compounds per year</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="secondary" className="font-mono text-xs px-1.5 py-0 shrink-0">t</Badge>
                <span>= Time in years</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Growth Table */}
      {result && result.table.length > 0 && (
        <Card className="p-6">
          <GrowthTable table={result.table} />
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <PiggyBank className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All calculations happen locally using JavaScript. Your financial data is never sent to any server, stored, or shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
