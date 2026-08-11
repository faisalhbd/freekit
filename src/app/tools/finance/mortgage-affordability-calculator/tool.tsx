"use client"

import { useState, useMemo } from "react"
import { Building, DollarSign, Percent, Calendar, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(num: number): string {
  if (!isFinite(num) || num < 0) return "$0.00"
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Constants ──────────────────────────────────────────────────────────────

const PROPERTY_TAX_RATE = 0.011 // 1.1% annual
const INSURANCE_RATE = 0.005 // 0.5% annual

// ─── Main Component ─────────────────────────────────────────────────────────

export function MortgageAffordabilityCalculatorTool() {
  const [incomeStr, setIncomeStr] = useState("")
  const [debtsStr, setDebtsStr] = useState("")
  const [downPayStr, setDownPayStr] = useState("")
  const [rateStr, setRateStr] = useState("")
  const [term, setTerm] = useState("30")

  const annualIncome = parseInput(incomeStr)
  const monthlyDebts = parseInput(debtsStr)
  const downPayment = parseInput(downPayStr)
  const annualRate = parseInput(rateStr) / 100
  const years = parseInt(term) || 30

  const result = useMemo(() => {
    if (annualIncome <= 0 || annualRate <= 0) return null

    const monthlyIncome = annualIncome / 12

    // 28% front-end rule: max housing payment
    const maxHousing28 = monthlyIncome * 0.28

    // 36% back-end rule: max total debt, so max housing = 36% income - existing debts
    const maxHousing36 = Math.max(0, monthlyIncome * 0.36 - monthlyDebts)

    // Use the lower of the two
    const maxMonthlyHousing = Math.min(maxHousing28, maxHousing36)

    if (maxMonthlyHousing <= 0) return null

    // Estimate monthly tax and insurance as percentage of home value
    // We iterate: assume home value = X, then tax+ins = X * (PROPERTY_TAX_RATE + INSURANCE_RATE) / 12
    // P&I = maxMonthlyHousing - tax+ins
    // Loan = f(P&I, rate, term)
    // Home = Loan + down payment
    // Since we do not know X yet, we use an iterative approach or approximation
    // Approximate: tax+ins ≈ 1.6% / 12 of home value ≈ 0.001333 * homeValue
    // Let L = loan amount, D = down payment, H = L + D
    // P&I = maxMonthlyHousing - 0.001333 * (L + D)
    // Monthly rate r = annualRate / 12, n = years * 12
    // P&I = L * r * (1+r)^n / ((1+r)^n - 1)
    // Solve for L iteratively

    const r = annualRate / 12
    const n = years * 12
    const taxInsFactor = (PROPERTY_TAX_RATE + INSURANCE_RATE) / 12

    // Iterative solve for loan amount
    let loanAmount = maxMonthlyHousing / (r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
    for (let i = 0; i < 50; i++) {
      const homeValue = loanAmount + downPayment
      const monthlyTaxIns = homeValue * taxInsFactor
      const pi = maxMonthlyHousing - monthlyTaxIns
      if (pi <= 0) { loanAmount = 0; break }
      const newLoan = pi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
      if (Math.abs(newLoan - loanAmount) < 1) { loanAmount = newLoan; break }
      loanAmount = newLoan
    }

    const homeValue = loanAmount + downPayment
    const monthlyTax = homeValue * PROPERTY_TAX_RATE / 12
    const monthlyInsurance = homeValue * INSURANCE_RATE / 12
    const monthlyPI = maxMonthlyHousing - monthlyTax - monthlyInsurance

    // Recalculate exact PI from loan amount
    const exactPI = loanAmount > 0
      ? loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : 0

    const totalMonthlyPayment = exactPI + monthlyTax + monthlyInsurance
    const backEndDTI = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100
    const frontEndDTI = (totalMonthlyPayment / monthlyIncome) * 100

    return {
      monthlyIncome,
      maxHousing28,
      maxHousing36,
      maxMonthlyHousing,
      loanAmount,
      homeValue,
      monthlyPI: exactPI,
      monthlyTax,
      monthlyInsurance,
      totalMonthlyPayment,
      frontEndDTI,
      backEndDTI,
      downPayment,
    }
  }, [annualIncome, monthlyDebts, downPayment, annualRate, years])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Building className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Mortgage Affordability Calculator</h3>
              <p className="text-sm text-muted-foreground">How much home can you afford? (28/36 DTI Rule)</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Income */}
            <div className="space-y-2">
              <Label htmlFor="ma-income" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Annual Gross Income
              </Label>
              <Input id="ma-income" type="text" inputMode="decimal" value={incomeStr} onChange={(e) => setIncomeStr(e.target.value)} placeholder="e.g. 120000" className="font-mono text-base" />
            </div>

            {/* Debts */}
            <div className="space-y-2">
              <Label htmlFor="ma-debts" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Monthly Debt Payments (car, student loans, credit cards)
              </Label>
              <Input id="ma-debts" type="text" inputMode="decimal" value={debtsStr} onChange={(e) => setDebtsStr(e.target.value)} placeholder="e.g. 500" className="font-mono text-base" />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <Label htmlFor="ma-down" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Down Payment Amount
              </Label>
              <Input id="ma-down" type="text" inputMode="decimal" value={downPayStr} onChange={(e) => setDownPayStr(e.target.value)} placeholder="e.g. 60000" className="font-mono text-base" />
            </div>

            {/* Rate + Term */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ma-rate" className="text-sm font-medium flex items-center gap-2">
                  <Percent className="size-4" />
                  Mortgage Interest Rate %
                </Label>
                <Input id="ma-rate" type="text" inputMode="decimal" value={rateStr} onChange={(e) => setRateStr(e.target.value)} placeholder="e.g. 6.5" className="font-mono text-base" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="size-4" />
                  Loan Term
                </Label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger className="font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* DTI Rule Info */}
            <div className="rounded-lg bg-muted/50 border border-border p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Calculator className="size-4 text-primary" />
                <p className="text-sm font-medium">28/36 DTI Rule</p>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 pl-6">
                <li>• <strong>28%</strong> — Max housing payment as % of gross monthly income</li>
                <li>• <strong>36%</strong> — Max total debt (housing + other debts) as % of gross monthly income</li>
              </ul>
            </div>
          </div>

          {/* Results */}
          {result && result.loanAmount > 0 && (
            <div className="mt-8 space-y-6">
              <Separator />

              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">Max Home Price</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(result.homeValue)}</p>
                  <p className="text-xs text-muted-foreground">Loan + Down Payment</p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Max Loan Amount</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(result.loanAmount)}</p>
                  <p className="text-xs text-muted-foreground">Principal amount</p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">Max Monthly Payment</p>
                  <p className="text-2xl font-bold tabular-nums">{formatCurrency(result.totalMonthlyPayment)}</p>
                  <p className="text-xs text-muted-foreground">PITI (P&I + Tax + Insurance)</p>
                </div>
              </div>

              {/* Payment Breakdown */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="px-4 py-3 bg-muted/50 border-b">
                    <h4 className="font-semibold text-sm">Monthly Payment Breakdown</h4>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">Principal & Interest</span>
                      <span className="font-mono text-sm font-medium">{formatCurrency(result.monthlyPI)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">Property Tax (est. {(PROPERTY_TAX_RATE * 100).toFixed(1)}%/yr)</span>
                      <span className="font-mono text-sm font-medium">{formatCurrency(result.monthlyTax)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm">Homeowners Insurance (est. {(INSURANCE_RATE * 100).toFixed(1)}%/yr)</span>
                      <span className="font-mono text-sm font-medium">{formatCurrency(result.monthlyInsurance)}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 bg-primary/5 font-semibold">
                      <span className="text-sm text-primary">Total Monthly Payment</span>
                      <span className="font-mono text-sm text-primary">{formatCurrency(result.totalMonthlyPayment)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* DTI Check */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Front-End DTI (Housing / Income)</p>
                  <p className={`text-xl font-bold tabular-nums ${result.frontEndDTI <= 28 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {result.frontEndDTI.toFixed(1)}% / 28%
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Back-End DTI (All Debt / Income)</p>
                  <p className={`text-xl font-bold tabular-nums ${result.backEndDTI <= 36 ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {result.backEndDTI.toFixed(1)}% / 36%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Building className="size-5 text-emerald-600 dark:text-emerald-400" />
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
