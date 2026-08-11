"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Scale,
  DollarSign,
  Calculator,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Package,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  return Math.ceil(num).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })
}

function formatPercent(num: number): string {
  if (!isFinite(num)) return "—"
  return num.toFixed(2) + "%"
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
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

// ─── Result Card ────────────────────────────────────────────────────────────

function ResultCard({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: string
  sub: string
  color: string
}) {
  return (
    <div className={`rounded-lg border ${color} p-4 space-y-1`}>
      <p
        className={`text-xs font-medium uppercase tracking-wide ${
          color.includes("primary")
            ? "text-primary"
            : color.includes("emerald")
              ? "text-emerald-700 dark:text-emerald-400"
              : color.includes("amber")
                ? "text-amber-700 dark:text-amber-400"
                : color.includes("rose")
                  ? "text-rose-700 dark:text-rose-400"
                  : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function BreakEvenCalculatorTool() {
  const [fixedStr, setFixedStr] = useState("")
  const [variableStr, setVariableStr] = useState("")
  const [priceStr, setPriceStr] = useState("")

  const fixed = parseInput(fixedStr)
  const variable = parseInput(variableStr)
  const price = parseInput(priceStr)

  const contributionMargin = price - variable
  const cmPercent = price > 0 ? (contributionMargin / price) * 100 : 0
  const beUnits = contributionMargin > 0 ? fixed / contributionMargin : 0
  const beRevenue = beUnits * price
  const isValid = fixed > 0 && price > 0 && contributionMargin > 0
  const isNegativeCM = price > 0 && variable >= price

  // Profit/Loss table
  const tableRows = useMemo(() => {
    if (!isValid) return []
    const be = Math.ceil(beUnits)
    const rows = []
    const multipliers = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]
    for (const m of multipliers) {
      const qty = Math.max(0, Math.round(be * m))
      const revenue = qty * price
      const totalVariable = qty * variable
      const totalCost = fixed + totalVariable
      const profit = revenue - totalCost
      rows.push({ qty, revenue, totalCost, profit })
    }
    return rows
  }, [isValid, beUnits, price, variable, fixed])

  const resultsText = isValid
    ? `Break-even Units: ${formatNumber(beUnits)} | Break-even Revenue: ${formatCurrency(beRevenue)} | Contribution Margin: ${formatCurrency(contributionMargin)} (${formatPercent(cmPercent)})`
    : ""

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Scale className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Break-even Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Find the number of units you must sell to cover all costs
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="be-fixed" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Fixed Costs
              </Label>
              <Input
                id="be-fixed"
                type="text"
                inputMode="decimal"
                value={fixedStr}
                onChange={(e) => setFixedStr(e.target.value)}
                placeholder="e.g. 10000"
                className="font-mono text-base"
              />
              <p className="text-xs text-muted-foreground">Rent, salaries, insurance, etc.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="be-variable" className="text-sm font-medium flex items-center gap-2">
                <Package className="size-4" />
                Variable Cost / Unit
              </Label>
              <Input
                id="be-variable"
                type="text"
                inputMode="decimal"
                value={variableStr}
                onChange={(e) => setVariableStr(e.target.value)}
                placeholder="e.g. 30"
                className="font-mono text-base"
              />
              <p className="text-xs text-muted-foreground">Materials, labor, shipping per unit</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="be-price" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Selling Price / Unit
              </Label>
              <Input
                id="be-price"
                type="text"
                inputMode="decimal"
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
                placeholder="e.g. 50"
                className="font-mono text-base"
              />
              <p className="text-xs text-muted-foreground">Price charged to customer</p>
            </div>
          </div>

          <Separator className="my-5" />

          {/* Formula Display */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 shrink-0">
                <Calculator className="size-5 text-primary" />
              </div>
              <div className="space-y-2 flex-1 min-w-0">
                <p className="text-sm font-medium">Formulas</p>
                <div className="space-y-1.5">
                  <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                    <code className="text-xs font-mono block">
                      Break-even Units = Fixed Costs / (Selling Price - Variable Cost)
                    </code>
                  </div>
                  <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                    <code className="text-xs font-mono block">
                      Break-even Revenue = Break-even Units &times; Selling Price
                    </code>
                  </div>
                  <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                    <code className="text-xs font-mono block">
                      Contribution Margin = Selling Price - Variable Cost per Unit
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Error: Negative CM */}
          {isNegativeCM && (
            <Card className="p-4 border-rose-500/50 bg-rose-500/5">
              <div className="flex items-start gap-3">
                <TrendingDown className="size-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
                    Variable cost exceeds selling price
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Each unit sold loses money. No break-even point exists — you must either reduce variable costs or increase the selling price.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Results */}
          {isValid && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard
                  label="Break-even Units"
                  value={formatNumber(beUnits)}
                  sub="Units to sell to cover costs"
                  color="border-primary/30 bg-primary/5"
                />
                <ResultCard
                  label="Break-even Revenue"
                  value={formatCurrency(beRevenue)}
                  sub="Revenue needed to break even"
                  color="border-emerald-500/30 bg-emerald-500/5"
                />
                <ResultCard
                  label="Contribution Margin"
                  value={formatCurrency(contributionMargin)}
                  sub="Per unit toward fixed costs"
                  color="border-amber-500/30 bg-amber-500/5"
                />
                <ResultCard
                  label="Contribution Margin %"
                  value={formatPercent(cmPercent)}
                  sub="Percentage of each sale"
                  color="border-amber-500/30 bg-amber-500/5"
                />
              </div>

              <div className="flex items-center justify-end">
                <CopyButton text={resultsText} />
              </div>

              {/* Profit/Loss Table */}
              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  Profit / Loss at Different Quantities
                </h4>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-xs font-semibold">Units Sold</TableHead>
                        <TableHead className="text-xs font-semibold text-right">Revenue</TableHead>
                        <TableHead className="text-xs font-semibold text-right">Total Cost</TableHead>
                        <TableHead className="text-xs font-semibold text-right">Profit / Loss</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableRows.map((row) => {
                        const isBE = row.qty === Math.ceil(beUnits) || Math.abs(row.profit) < 0.01
                        return (
                          <TableRow key={row.qty} className={isBE ? "bg-primary/5 font-medium" : ""}>
                            <TableCell className="text-xs font-mono">
                              {row.qty.toLocaleString()}
                              {isBE && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                  Break-even
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-xs font-mono text-right">{formatCurrency(row.revenue)}</TableCell>
                            <TableCell className="text-xs font-mono text-right">{formatCurrency(row.totalCost)}</TableCell>
                            <TableCell
                              className={`text-xs font-mono text-right font-medium ${
                                row.profit > 0
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : row.profit < 0
                                    ? "text-rose-600 dark:text-rose-400"
                                    : ""
                              }`}
                            >
                              {row.profit >= 0 ? "+" : ""}
                              {formatCurrency(row.profit)}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Scale className="size-5 text-emerald-600 dark:text-emerald-400" />
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
