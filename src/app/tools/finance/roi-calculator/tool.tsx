"use client"

import { useState, useCallback } from "react"
import {
  BarChart3,
  DollarSign,
  Calculator,
  Percent,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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

// ─── Interpretation ──────────────────────────────────────────────────────────

function getInterpretation(roi: number): { text: string; icon: typeof TrendingUp; color: string } {
  if (roi > 100) return { text: `Outstanding! Your investment gained ${roi.toFixed(2)}% profit — more than doubling your money.`, icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" }
  if (roi > 50) return { text: `Excellent return! Your investment gained ${roi.toFixed(2)}% profit.`, icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" }
  if (roi > 20) return { text: `Good return. Your investment gained ${roi.toFixed(2)}% profit.`, icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" }
  if (roi > 0) return { text: `Your investment gained ${roi.toFixed(2)}% profit.`, icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400" }
  if (roi === 0) return { text: "Your investment broke even — no profit or loss.", icon: Minus, color: "text-amber-600 dark:text-amber-400" }
  if (roi > -50) return { text: `Your investment lost ${Math.abs(roi).toFixed(2)}%. Consider reviewing your investment strategy.`, icon: TrendingDown, color: "text-rose-600 dark:text-rose-400" }
  return { text: `Your investment lost ${Math.abs(roi).toFixed(2)}% — a significant loss.`, icon: TrendingDown, color: "text-rose-600 dark:text-rose-400" }
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function ROICalculatorTool() {
  const [costStr, setCostStr] = useState("")
  const [finalStr, setFinalStr] = useState("")
  const [yearsStr, setYearsStr] = useState("")

  const cost = parseInput(costStr)
  const finalVal = parseInput(finalStr)
  const years = parseInput(yearsStr) || 0

  const netProfit = finalVal - cost
  const roi = cost > 0 ? (netProfit / cost) * 100 : 0
  const annualizedROI =
    cost > 0 && finalVal > 0 && years > 0
      ? (Math.pow(finalVal / cost, 1 / years) - 1) * 100
      : 0

  const hasResult = cost > 0 && finalVal > 0
  const showAnnualized = hasResult && years > 0

  const interpretation = hasResult ? getInterpretation(roi) : null
  const InterpretationIcon = interpretation?.icon || Minus

  const resultsText = hasResult
    ? `Investment Cost: ${formatCurrency(cost)} | Final Value: ${formatCurrency(finalVal)} | Net Profit: ${formatCurrency(netProfit)} | ROI: ${formatPercent(roi)}${showAnnualized ? ` | Annualized ROI: ${formatPercent(annualizedROI)}` : ""}`
    : ""

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <BarChart3 className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">ROI Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate return on investment, net profit, and annualized ROI
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="roi-cost" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Investment Cost
              </Label>
              <Input
                id="roi-cost"
                type="text"
                inputMode="decimal"
                value={costStr}
                onChange={(e) => setCostStr(e.target.value)}
                placeholder="e.g. 10000"
                className="font-mono text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roi-final" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="size-4" />
                Final Value / Return
              </Label>
              <Input
                id="roi-final"
                type="text"
                inputMode="decimal"
                value={finalStr}
                onChange={(e) => setFinalStr(e.target.value)}
                placeholder="e.g. 15000"
                className="font-mono text-base"
              />
            </div>
          </div>

          <Separator className="my-5" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="roi-years" className="text-sm font-medium flex items-center gap-2">
                Investment Period (Years)
              </Label>
              <Input
                id="roi-years"
                type="text"
                inputMode="decimal"
                value={yearsStr}
                onChange={(e) => setYearsStr(e.target.value)}
                placeholder="e.g. 3 (optional)"
                className="font-mono text-base"
              />
              <p className="text-xs text-muted-foreground">
                Optional — enter to calculate annualized ROI
              </p>
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => {}}
                disabled={!hasResult}
                className="w-full gap-2"
              >
                <Calculator className="size-4" />
                Calculate ROI
              </Button>
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
                      Net Profit = Final Value - Investment Cost
                    </code>
                  </div>
                  <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                    <code className="text-xs font-mono block">
                      ROI = ((Final Value - Cost) / Cost) &times; 100
                    </code>
                  </div>
                  {showAnnualized && (
                    <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                      <code className="text-xs font-mono block">
                        Annualized ROI = ((Final Value / Cost) ^ (1 / Years) - 1) &times; 100
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {hasResult && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Net Profit"
                  value={formatCurrency(netProfit)}
                  sub={netProfit >= 0 ? "Net gain" : "Net loss"}
                  color={netProfit >= 0 ? "border-primary/30 bg-primary/5" : "border-rose-500/30 bg-rose-500/5"}
                />
                <ResultCard
                  label="ROI"
                  value={formatPercent(roi)}
                  sub="Total return on investment"
                  color={roi >= 0 ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5"}
                />
                {showAnnualized ? (
                  <ResultCard
                    label="Annualized ROI"
                    value={formatPercent(annualizedROI)}
                    sub={`Per year over ${years} year${years !== 1 ? "s" : ""}`}
                    color={annualizedROI >= 0 ? "border-amber-500/30 bg-amber-500/5" : "border-rose-500/30 bg-rose-500/5"}
                  />
                ) : (
                  <ResultCard
                    label="Total Return"
                    value={formatCurrency(finalVal)}
                    sub={cost > 0 ? `${((finalVal / cost) * 100).toFixed(2)}% of cost` : ""}
                    color="border-amber-500/30 bg-amber-500/5"
                  />
                )}
              </div>

              {/* Interpretation */}
              {interpretation && (
                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <InterpretationIcon className={`size-5 mt-0.5 shrink-0 ${interpretation.color}`} />
                  <p className="text-sm">{interpretation.text}</p>
                </div>
              )}

              <div className="flex items-center justify-end">
                <CopyButton text={resultsText} />
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <BarChart3 className="size-5 text-emerald-600 dark:text-emerald-400" />
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
