"use client"

import { useState, useCallback } from "react"
import {
  Percent,
  DollarSign,
  Calculator,
  Copy,
  Check,
  ArrowRightLeft,
  TrendingUp,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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
      <p className={`text-xs font-medium uppercase tracking-wide ${color.includes("primary") ? "text-primary" : color.includes("emerald") ? "text-emerald-700 dark:text-emerald-400" : color.includes("amber") ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function MarkupCalculatorTool() {
  const [costStr, setCostStr] = useState("")
  const [markupStr, setMarkupStr] = useState("")
  const [convertInput, setConvertInput] = useState("")
  const [convertMode, setConvertMode] = useState<"margin" | "markup">("margin")

  const cost = parseInput(costStr)
  const markupPct = parseInput(markupStr)
  const sell = cost * (1 + markupPct / 100)
  const profit = sell - cost
  const margin = sell > 0 ? (profit / sell) * 100 : 0
  const hasResult = cost > 0

  // Conversion
  const convertVal = parseInput(convertInput)
  const convertedResult =
    convertMode === "margin"
      ? convertVal < 100
        ? (convertVal / (100 - convertVal)) * 100
        : null
      : (convertVal / (100 + convertVal)) * 100

  const mainResultsText = hasResult && markupStr !== ""
    ? `Selling Price: ${formatCurrency(sell)} | Profit: ${formatCurrency(profit)} | Margin: ${formatPercent(margin)} | Markup: ${formatPercent(markupPct)}`
    : ""

  return (
    <div className="space-y-6">
      {/* Main Calculator */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Percent className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Markup Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate selling price, profit, and margin from cost and markup
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mu-cost" className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Cost Price
                </Label>
                <Input
                  id="mu-cost"
                  type="text"
                  inputMode="decimal"
                  value={costStr}
                  onChange={(e) => setCostStr(e.target.value)}
                  placeholder="e.g. 75"
                  className="font-mono text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mu-markup" className="text-sm font-medium flex items-center gap-2">
                  <Percent className="size-4" />
                  Markup %
                </Label>
                <Input
                  id="mu-markup"
                  type="text"
                  inputMode="decimal"
                  value={markupStr}
                  onChange={(e) => setMarkupStr(e.target.value)}
                  placeholder="e.g. 40"
                  className="font-mono text-base"
                />
              </div>
            </div>

            <Separator />

            {/* Formula */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 shrink-0">
                  <Calculator className="size-5 text-primary" />
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  <p className="text-sm font-medium">Formula</p>
                  <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                    <code className="text-xs font-mono block">
                      Selling Price = Cost &times; (1 + Markup / 100)
                    </code>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results */}
            {hasResult && markupStr !== "" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard label="Selling Price" value={formatCurrency(sell)} sub="Price to charge" color="border-primary/30 bg-primary/5" />
                  <ResultCard label="Profit Amount" value={formatCurrency(profit)} sub="Per unit" color="border-emerald-500/30 bg-emerald-500/5" />
                  <ResultCard label="Gross Margin" value={formatPercent(margin)} sub="Of selling price" color="border-amber-500/30 bg-amber-500/5" />
                  <ResultCard label="Revenue" value={formatCurrency(sell)} sub="Per unit sold" color="border-border bg-card" />
                </div>
                <div className="flex items-center justify-end">
                  <CopyButton text={mainResultsText} />
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Conversion Section */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-amber-500/10 p-2.5">
              <ArrowRightLeft className="size-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Margin ↔ Markup Converter</h3>
              <p className="text-sm text-muted-foreground">
                Instantly convert between margin and markup percentages
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant={convertMode === "margin" ? "default" : "outline"}
                size="sm"
                onClick={() => setConvertMode("margin")}
              >
                Margin → Markup
              </Button>
              <Button
                variant={convertMode === "markup" ? "default" : "outline"}
                size="sm"
                onClick={() => setConvertMode("markup")}
              >
                Markup → Margin
              </Button>
            </div>

            <div className="max-w-xs space-y-2">
              <Label htmlFor="convert-input" className="text-sm font-medium">
                {convertMode === "margin" ? "Margin" : "Markup"} %
              </Label>
              <Input
                id="convert-input"
                type="text"
                inputMode="decimal"
                value={convertInput}
                onChange={(e) => setConvertInput(e.target.value)}
                placeholder="e.g. 30"
                className="font-mono text-base"
              />
            </div>

            {convertedResult !== null && convertVal > 0 && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  Equivalent {convertMode === "margin" ? "Markup" : "Margin"}
                </p>
                <p className="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-400">
                  {convertedResult.toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {convertMode === "margin"
                    ? `A ${convertVal}% margin equals a ${convertedResult.toFixed(2)}% markup`
                    : `A ${convertVal}% markup equals a ${convertedResult.toFixed(2)}% margin`}
                </p>
              </div>
            )}

            {convertMode === "margin" && convertVal >= 100 && convertVal > 0 && (
              <p className="text-sm text-destructive">Margin must be less than 100% for conversion.</p>
            )}

            {/* Quick Reference Table */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Quick Reference</p>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-2.5 font-medium text-xs">Margin</th>
                        <th className="text-right p-2.5 font-medium text-xs">Markup</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80].map((m) => {
                        const mu = (m / (100 - m)) * 100
                        return (
                          <tr key={m} className="border-t border-border">
                            <td className="p-2.5 font-mono text-xs">{m}%</td>
                            <td className="p-2.5 font-mono text-xs text-right">{mu.toFixed(2)}%</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <TrendingUp className="size-5 text-emerald-600 dark:text-emerald-400" />
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
