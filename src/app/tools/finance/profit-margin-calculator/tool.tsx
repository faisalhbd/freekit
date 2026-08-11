"use client"

import { useState, useCallback } from "react"
import {
  TrendingUp,
  DollarSign,
  Calculator,
  Percent,
  Copy,
  Check,
  ArrowRightLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

// ─── Mode 1: Calculate Margin ───────────────────────────────────────────────

function CalculateMarginMode() {
  const [costStr, setCostStr] = useState("")
  const [sellStr, setSellStr] = useState("")
  const [revenueStr, setRevenueStr] = useState("")

  const cost = parseInput(costStr)
  const sell = parseInput(sellStr)
  const revenue = parseInput(revenueStr)
  const profit = sell - cost
  const margin = sell > 0 ? (profit / sell) * 100 : 0
  const markup = cost > 0 ? (profit / cost) * 100 : 0
  const hasResult = cost > 0 && sell > 0

  const resultsText = hasResult
    ? `Profit: ${formatCurrency(profit)} | Margin: ${formatPercent(margin)} | Markup: ${formatPercent(markup)}`
    : ""

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pm-cost" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Cost Price
          </Label>
          <Input
            id="pm-cost"
            type="text"
            inputMode="decimal"
            value={costStr}
            onChange={(e) => setCostStr(e.target.value)}
            placeholder="e.g. 50"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm-sell" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Selling Price
          </Label>
          <Input
            id="pm-sell"
            type="text"
            inputMode="decimal"
            value={sellStr}
            onChange={(e) => setSellStr(e.target.value)}
            placeholder="e.g. 80"
            className="font-mono text-base"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="pm-revenue" className="text-sm font-medium flex items-center gap-2">
          <TrendingUp className="size-4" />
          Revenue (optional — number of units sold)
        </Label>
        <Input
          id="pm-revenue"
          type="text"
          inputMode="numeric"
          value={revenueStr}
          onChange={(e) => setRevenueStr(e.target.value)}
          placeholder="e.g. 500"
          className="font-mono text-base"
        />
        {revenue > 0 && hasResult && (
          <p className="text-xs text-muted-foreground">
            Total Revenue: {formatCurrency(sell * revenue)} | Total Profit: {formatCurrency(profit * revenue)}
          </p>
        )}
      </div>

      <Separator />

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
                  Profit = Selling Price - Cost Price
                </code>
              </div>
              <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                <code className="text-xs font-mono block">
                  Margin = (Profit / Selling Price) &times; 100
                </code>
              </div>
              <div className="rounded-lg bg-muted/50 border border-border p-2.5 overflow-x-auto">
                <code className="text-xs font-mono block">
                  Markup = (Profit / Cost Price) &times; 100
                </code>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      {hasResult && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="Profit" value={formatCurrency(profit)} sub={profit >= 0 ? "Net gain" : "Net loss"} color="border-primary/30 bg-primary/5" />
            <ResultCard label="Profit Margin" value={formatPercent(margin)} sub="Of selling price" color="border-emerald-500/30 bg-emerald-500/5" />
            <ResultCard label="Markup" value={formatPercent(markup)} sub="Of cost price" color="border-amber-500/30 bg-amber-500/5" />
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={resultsText} />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Mode 2: Calculate from Margin ──────────────────────────────────────────

function CalculateFromMarginMode() {
  const [costStr, setCostStr] = useState("")
  const [marginStr, setMarginStr] = useState("")

  const cost = parseInput(costStr)
  const marginPct = parseInput(marginStr)
  const sell = marginPct < 100 && cost > 0 ? cost / (1 - marginPct / 100) : 0
  const profit = sell - cost
  const markup = cost > 0 ? (profit / cost) * 100 : 0
  const hasResult = cost > 0 && marginPct > 0 && marginPct < 100

  const resultsText = hasResult
    ? `Selling Price: ${formatCurrency(sell)} | Profit: ${formatCurrency(profit)} | Markup: ${formatPercent(markup)}`
    : ""

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pm2-cost" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Cost Price
          </Label>
          <Input
            id="pm2-cost"
            type="text"
            inputMode="decimal"
            value={costStr}
            onChange={(e) => setCostStr(e.target.value)}
            placeholder="e.g. 50"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pm2-margin" className="text-sm font-medium flex items-center gap-2">
            <Percent className="size-4" />
            Desired Margin %
          </Label>
          <Input
            id="pm2-margin"
            type="text"
            inputMode="decimal"
            value={marginStr}
            onChange={(e) => setMarginStr(e.target.value)}
            placeholder="e.g. 30"
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
                Selling Price = Cost / (1 - Desired Margin / 100)
              </code>
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      {hasResult && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="Selling Price" value={formatCurrency(sell)} sub="Required price" color="border-primary/30 bg-primary/5" />
            <ResultCard label="Profit" value={formatCurrency(profit)} sub="Per unit" color="border-emerald-500/30 bg-emerald-500/5" />
            <ResultCard label="Markup" value={formatPercent(markup)} sub="Equivalent markup" color="border-amber-500/30 bg-amber-500/5" />
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={resultsText} />
          </div>
        </>
      )}

      {marginPct >= 100 && cost > 0 && (
        <Card className="p-4 text-center">
          <p className="text-sm text-destructive font-medium">Margin must be less than 100%</p>
          <p className="text-xs text-muted-foreground mt-1">
            A 100% or higher margin is impossible — selling price would need to be infinite.
          </p>
        </Card>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function ProfitMarginCalculatorTool() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <TrendingUp className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Profit Margin Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate profit, margin, and markup from your cost and selling prices
              </p>
            </div>
          </div>

          <Tabs defaultValue="margin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="margin" className="gap-1.5">
                <Calculator className="size-3.5" />
                Calculate Margin
              </TabsTrigger>
              <TabsTrigger value="from-margin" className="gap-1.5">
                <ArrowRightLeft className="size-3.5" />
                Calculate from Margin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="margin" className="mt-6">
              <CalculateMarginMode />
            </TabsContent>

            <TabsContent value="from-margin" className="mt-6">
              <CalculateFromMarginMode />
            </TabsContent>
          </Tabs>
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
