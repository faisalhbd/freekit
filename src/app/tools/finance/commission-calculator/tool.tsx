"use client"

import { useState } from "react"
import {
  Banknote,
  DollarSign,
  Percent,
  Layers,
  Copy,
  Check,
  Calculator,
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

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 h-7 text-xs">
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

// ─── Tier Result Row ────────────────────────────────────────────────────────

interface TierRow {
  tier: string
  rate: number
  amount: number
  commission: number
}

// ─── Flat Rate Mode ─────────────────────────────────────────────────────────

function FlatRateMode() {
  const [salesStr, setSalesStr] = useState("")
  const [flatStr, setFlatStr] = useState("")

  const sales = parseInput(salesStr)
  const flat = parseInput(flatStr)
  const totalCommission = sales * flat
  const hasResult = sales > 0 && flat > 0

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="flat-sales" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Total Sales Amount
          </Label>
          <Input
            id="flat-sales"
            type="text"
            inputMode="decimal"
            value={salesStr}
            onChange={(e) => setSalesStr(e.target.value)}
            placeholder="e.g. 50000"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="flat-rate" className="text-sm font-medium flex items-center gap-2">
            <Banknote className="size-4" />
            Flat Commission per Sale
          </Label>
          <Input
            id="flat-rate"
            type="text"
            inputMode="decimal"
            value={flatStr}
            onChange={(e) => setFlatStr(e.target.value)}
            placeholder="e.g. 150"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground">This amount is multiplied by the number of implied sales units</p>
        </div>
      </div>

      <Separator />

      {hasResult && (
        <div className="space-y-4">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-1">
            <p className="text-xs font-medium text-primary uppercase tracking-wide">Total Commission</p>
            <p className="text-3xl font-bold tabular-nums text-primary">{formatCurrency(totalCommission)}</p>
            <p className="text-xs text-muted-foreground">
              Based on {formatCurrency(sales)} total sales at {formatCurrency(flat)} flat commission per unit
            </p>
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={`Total Commission: ${formatCurrency(totalCommission)}`} />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Percentage Mode ────────────────────────────────────────────────────────

function PercentageMode() {
  const [salesStr, setSalesStr] = useState("")
  const [rateStr, setRateStr] = useState("")

  const sales = parseInput(salesStr)
  const rate = parseInput(rateStr)
  const commission = sales * (rate / 100)
  const hasResult = sales > 0 && rate > 0

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pct-sales" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Sales Amount
          </Label>
          <Input
            id="pct-sales"
            type="text"
            inputMode="decimal"
            value={salesStr}
            onChange={(e) => setSalesStr(e.target.value)}
            placeholder="e.g. 75000"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pct-rate" className="text-sm font-medium flex items-center gap-2">
            <Percent className="size-4" />
            Commission Rate
          </Label>
          <Input
            id="pct-rate"
            type="text"
            inputMode="decimal"
            value={rateStr}
            onChange={(e) => setRateStr(e.target.value)}
            placeholder="e.g. 10"
            className="font-mono text-base"
          />
        </div>
      </div>

      <Separator />

      {hasResult && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
              <p className="text-xs font-medium text-primary uppercase tracking-wide">Commission</p>
              <p className="text-2xl font-bold tabular-nums text-primary">{formatCurrency(commission)}</p>
              <p className="text-xs text-muted-foreground">{rate}% of sales</p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Sales Amount</p>
              <p className="text-2xl font-bold tabular-nums">{formatCurrency(sales)}</p>
              <p className="text-xs text-muted-foreground">Total sales value</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Effective Rate</p>
              <p className="text-2xl font-bold tabular-nums">{rate}%</p>
              <p className="text-xs text-muted-foreground">Commission rate applied</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={`Commission: ${formatCurrency(commission)} (${rate}% of ${formatCurrency(sales)})`} />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tiered Mode ─────────────────────────────────────────────────────────────

function TieredMode() {
  const [salesStr, setSalesStr] = useState("")
  const [rate1Str, setRate1Str] = useState("")
  const [threshold1Str, setThreshold1Str] = useState("")
  const [rate2Str, setRate2Str] = useState("")
  const [threshold2Str, setThreshold2Str] = useState("")
  const [rate3Str, setRate3Str] = useState("")

  const sales = parseInput(salesStr)
  const r1 = parseInput(rate1Str)
  const t1 = parseInput(threshold1Str)
  const r2 = parseInput(rate2Str)
  const t2 = parseInput(threshold2Str)
  const r3 = parseInput(rate3Str)

  const tiers: TierRow[] = []
  let total = 0

  if (sales > 0 && t1 > 0 && r1 >= 0 && r2 >= 0 && r3 >= 0) {
    // Tier 1
    const tier1Amount = Math.min(sales, t1)
    const tier1Commission = tier1Amount * (r1 / 100)
    tiers.push({ tier: `Tier 1 (up to ${formatCurrency(t1)})`, rate: r1, amount: tier1Amount, commission: tier1Commission })
    total += tier1Commission

    // Tier 2
    if (sales > t1 && t2 > t1) {
      const tier2Amount = Math.min(sales - t1, t2 - t1)
      const tier2Commission = tier2Amount * (r2 / 100)
      tiers.push({ tier: `Tier 2 (${formatCurrency(t1)} to ${formatCurrency(t2)})`, rate: r2, amount: tier2Amount, commission: tier2Commission })
      total += tier2Commission
    }

    // Tier 3
    if (sales > t2 && t2 > t1) {
      const tier3Amount = sales - t2
      const tier3Commission = tier3Amount * (r3 / 100)
      tiers.push({ tier: `Tier 3 (above ${formatCurrency(t2)})`, rate: r3, amount: tier3Amount, commission: tier3Commission })
      total += tier3Commission
    }
  }

  const hasResult = tiers.length > 0

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="tiered-sales" className="text-sm font-medium flex items-center gap-2">
          <DollarSign className="size-4" />
          Total Sales Amount
        </Label>
        <div className="max-w-xs">
          <Input
            id="tiered-sales"
            type="text"
            inputMode="decimal"
            value={salesStr}
            onChange={(e) => setSalesStr(e.target.value)}
            placeholder="e.g. 50000"
            className="font-mono text-base"
          />
        </div>
      </div>

      <Separator />

      <p className="text-sm font-medium flex items-center gap-2">
        <Layers className="size-4" />
        Commission Tiers
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="rate1" className="text-xs font-medium">Tier 1 Rate (%)</Label>
          <Input
            id="rate1"
            type="text"
            inputMode="decimal"
            value={rate1Str}
            onChange={(e) => setRate1Str(e.target.value)}
            placeholder="e.g. 5"
            className="font-mono text-base"
          />
          <Label htmlFor="thresh1" className="text-xs font-medium">Up to ($)</Label>
          <Input
            id="thresh1"
            type="text"
            inputMode="decimal"
            value={threshold1Str}
            onChange={(e) => setThreshold1Str(e.target.value)}
            placeholder="e.g. 10000"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate2" className="text-xs font-medium">Tier 2 Rate (%)</Label>
          <Input
            id="rate2"
            type="text"
            inputMode="decimal"
            value={rate2Str}
            onChange={(e) => setRate2Str(e.target.value)}
            placeholder="e.g. 7"
            className="font-mono text-base"
          />
          <Label htmlFor="thresh2" className="text-xs font-medium">Up to ($)</Label>
          <Input
            id="thresh2"
            type="text"
            inputMode="decimal"
            value={threshold2Str}
            onChange={(e) => setThreshold2Str(e.target.value)}
            placeholder="e.g. 25000"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate3" className="text-xs font-medium">Tier 3 Rate (%)</Label>
          <Input
            id="rate3"
            type="text"
            inputMode="decimal"
            value={rate3Str}
            onChange={(e) => setRate3Str(e.target.value)}
            placeholder="e.g. 10"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground mt-6">Applied above Tier 2 threshold</p>
        </div>
      </div>

      <Separator />

      {hasResult && (
        <div className="space-y-4">
          {/* Tier Breakdown */}
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium text-xs">Tier</th>
                  <th className="text-right p-3 font-medium text-xs">Rate</th>
                  <th className="text-right p-3 font-medium text-xs">Sales</th>
                  <th className="text-right p-3 font-medium text-xs">Commission</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.tier} className="border-t border-border">
                    <td className="p-3 text-xs font-medium">{t.tier}</td>
                    <td className="p-3 text-xs font-mono text-right">{t.rate}%</td>
                    <td className="p-3 text-xs font-mono text-right">{formatCurrency(t.amount)}</td>
                    <td className="p-3 text-xs font-mono text-right text-primary font-semibold">{formatCurrency(t.commission)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-primary/30 bg-primary/5">
                  <td className="p-3 text-xs font-bold" colSpan={3}>Total Commission</td>
                  <td className="p-3 text-sm font-mono text-right font-bold text-primary">{formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Card */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-1">
            <p className="text-xs font-medium text-primary uppercase tracking-wide">Total Earnings</p>
            <p className="text-3xl font-bold tabular-nums text-primary">{formatCurrency(total)}</p>
            <p className="text-xs text-muted-foreground">
              Commission on {formatCurrency(sales)} total sales across {tiers.length} tier{tiers.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center justify-end">
            <CopyButton text={`Total Commission: ${formatCurrency(total)} on ${formatCurrency(sales)} sales`} />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function CommissionCalculatorTool() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Banknote className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Commission Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate your earnings with flat rate, percentage, or tiered commission
              </p>
            </div>
          </div>

          <Tabs defaultValue="percentage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flat" className="gap-1.5 text-xs sm:text-sm">
                <Banknote className="size-3.5" />
                <span className="hidden sm:inline">Flat Rate</span>
                <span className="sm:hidden">Flat</span>
              </TabsTrigger>
              <TabsTrigger value="percentage" className="gap-1.5 text-xs sm:text-sm">
                <Percent className="size-3.5" />
                Percentage
              </TabsTrigger>
              <TabsTrigger value="tiered" className="gap-1.5 text-xs sm:text-sm">
                <Layers className="size-3.5" />
                Tiered
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flat" className="mt-6">
              <FlatRateMode />
            </TabsContent>

            <TabsContent value="percentage" className="mt-6">
              <PercentageMode />
            </TabsContent>

            <TabsContent value="tiered" className="mt-6">
              <TieredMode />
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Banknote className="size-5 text-emerald-600 dark:text-emerald-400" />
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
