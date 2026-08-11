"use client"

import { useState, useCallback } from "react"
import {
  Clock3,
  DollarSign,
  Calculator,
  Copy,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// ─── Helpers ────────────────────────────────────────────────────────

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

// ─── Copy Button ─────────────────────────────────────────────────────

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

// ─── Summary Row ─────────────────────────────────────────────────────

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`text-base font-bold tabular-nums font-mono ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  )
}

// ─── Single Tier Mode ────────────────────────────────────────────────

function SingleTierMode() {
  const [rateStr, setRateStr] = useState("")
  const [regularStr, setRegularStr] = useState("")
  const [totalStr, setTotalStr] = useState("")
  const [multiplierStr, setMultiplierStr] = useState("")

  const rate = parseInput(rateStr)
  const regular = parseInput(regularStr) || 40
  const total = parseInput(totalStr)
  const multiplier = parseInput(multiplierStr) || 1.5

  const otHours = Math.max(0, total - regular)
  const otRate = rate * multiplier
  const regularPay = Math.min(total, regular) * rate
  const otPay = otHours * otRate
  const totalPay = regularPay + otPay

  const hasResult = rate > 0 && total > 0 && total > regular

  const resultsText = hasResult
    ? `Regular: ${regular}h × ${formatCurrency(rate)} = ${formatCurrency(regularPay)} | OT: ${otHours}h × ${formatCurrency(otRate)} (${multiplier}×) = ${formatCurrency(otPay)} | Total: ${formatCurrency(totalPay)}`
    : ""

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ot-rate" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Hourly Rate
          </Label>
          <Input
            id="ot-rate"
            type="text"
            inputMode="decimal"
            value={rateStr}
            onChange={(e) => setRateStr(e.target.value)}
            placeholder="e.g. 25"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ot-regular" className="text-sm font-medium flex items-center gap-2">
            <Clock className="size-4" />
            Regular Hours / Week
          </Label>
          <Input
            id="ot-regular"
            type="text"
            inputMode="decimal"
            value={regularStr}
            onChange={(e) => setRegularStr(e.target.value)}
            placeholder="40"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground">Standard: 40 hours</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ot-total" className="text-sm font-medium flex items-center gap-2">
            <Clock3 className="size-4" />
            Total Hours Worked
          </Label>
          <Input
            id="ot-total"
            type="text"
            inputMode="decimal"
            value={totalStr}
            onChange={(e) => setTotalStr(e.target.value)}
            placeholder="e.g. 48"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ot-multiplier" className="text-sm font-medium flex items-center gap-2">
            OT Multiplier
          </Label>
          <Input
            id="ot-multiplier"
            type="text"
            inputMode="decimal"
            value={multiplierStr}
            onChange={(e) => setMultiplierStr(e.target.value)}
            placeholder="1.5"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground">1.5 = time & a half, 2 = double time</p>
        </div>
      </div>

      <Separator />

      {rate > 0 && total > 0 && total <= regular && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">No overtime hours</p>
            <p className="text-xs text-muted-foreground mt-1">
              Total hours ({total}) do not exceed regular hours ({regular}). Regular pay: {formatCurrency(total * rate)}.
            </p>
          </div>
        </div>
      )}

      {hasResult && (
        <>
          <div className="rounded-lg border border-border p-4 space-y-0">
            <SummaryRow label={`Regular Pay (${Math.min(total, regular)}h @ ${formatCurrency(rate)})`} value={formatCurrency(regularPay)} />
            <SummaryRow label={`Overtime Hours`} value={`${otHours} hours`} />
            <SummaryRow label={`Overtime Rate (${multiplier}×)`} value={formatCurrency(otRate)} />
            <SummaryRow label={`Overtime Pay (${otHours}h @ ${formatCurrency(otRate)})`} value={formatCurrency(otPay)} />
            <SummaryRow label="Total Weekly Pay" value={formatCurrency(totalPay)} highlight />
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={resultsText} />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Two Tier Mode ──────────────────────────────────────────────────

function TwoTierMode() {
  const [rateStr, setRateStr] = useState("")
  const [regularStr, setRegularStr] = useState("")
  const [totalStr, setTotalStr] = useState("")
  const [tier1ThresholdStr, setTier1ThresholdStr] = useState("")
  const [tier2MultiplierStr, setTier2MultiplierStr] = useState("")

  const rate = parseInput(rateStr)
  const regular = parseInput(regularStr) || 40
  const total = parseInput(totalStr)
  const tier1Threshold = parseInput(tier1ThresholdStr) || 48
  const tier1Multiplier = 1.5
  const tier2Multiplier = parseInput(tier2MultiplierStr) || 2

  const regularHours = Math.min(total, regular)
 const tier1Hours = Math.max(0, Math.min(total, tier1Threshold) - regular)
  const tier2Hours = Math.max(0, total - tier1Threshold)

  const regularPay = regularHours * rate
  const tier1Rate = rate * tier1Multiplier
  const tier1Pay = tier1Hours * tier1Rate
  const tier2Rate = rate * tier2Multiplier
  const tier2Pay = tier2Hours * tier2Rate
  const totalPay = regularPay + tier1Pay + tier2Pay
  const totalOTHours = tier1Hours + tier2Hours

  const hasResult = rate > 0 && total > regular

  const resultsText = hasResult
    ? `Regular: ${regularHours}h × ${formatCurrency(rate)} = ${formatCurrency(regularPay)} | OT 1.5×: ${tier1Hours}h × ${formatCurrency(tier1Rate)} = ${formatCurrency(tier1Pay)} | OT 2×: ${tier2Hours}h × ${formatCurrency(tier2Rate)} = ${formatCurrency(tier2Pay)} | Total: ${formatCurrency(totalPay)}`
    : ""

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tt-rate" className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="size-4" />
            Hourly Rate
          </Label>
          <Input
            id="tt-rate"
            type="text"
            inputMode="decimal"
            value={rateStr}
            onChange={(e) => setRateStr(e.target.value)}
            placeholder="e.g. 25"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tt-total" className="text-sm font-medium flex items-center gap-2">
            <Clock3 className="size-4" />
            Total Hours Worked
          </Label>
          <Input
            id="tt-total"
            type="text"
            inputMode="decimal"
            value={totalStr}
            onChange={(e) => setTotalStr(e.target.value)}
            placeholder="e.g. 52"
            className="font-mono text-base"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tt-regular" className="text-sm font-medium flex items-center gap-2">
            <Clock className="size-4" />
            Regular Hours / Week
          </Label>
          <Input
            id="tt-regular"
            type="text"
            inputMode="decimal"
            value={regularStr}
            onChange={(e) => setRegularStr(e.target.value)}
            placeholder="40"
            className="font-mono text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tt-threshold" className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="size-4" />
            Double-time Starts After (hrs)
          </Label>
          <Input
            id="tt-threshold"
            type="text"
            inputMode="decimal"
            value={tier1ThresholdStr}
            onChange={(e) => setTier1ThresholdStr(e.target.value)}
            placeholder="48"
            className="font-mono text-base"
          />
          <p className="text-xs text-muted-foreground">Hours beyond this get 2× rate</p>
        </div>
      </div>

      <Separator />

      {hasResult && (
        <>
          <div className="rounded-lg border border-border p-4 space-y-0">
            <SummaryRow label={`Regular Pay (${regularHours}h @ ${formatCurrency(rate)})`} value={formatCurrency(regularPay)} />
            <SummaryRow
              label={`Overtime 1.5× (${tier1Hours}h @ ${formatCurrency(tier1Rate)})`}
              value={formatCurrency(tier1Pay)}
            />
            <SummaryRow
              label={`Overtime 2× (${tier2Hours}h @ ${formatCurrency(tier2Rate)})`}
              value={formatCurrency(tier2Pay)}
            />
            <div className="flex items-center justify-between py-3">
              <p className="text-sm text-muted-foreground">Total Overtime Hours</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">{totalOTHours}h</Badge>
              </div>
            </div>
            <SummaryRow label="Total Weekly Pay" value={formatCurrency(totalPay)} highlight />
          </div>
          <div className="flex items-center justify-end">
            <CopyButton text={resultsText} />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────

export function OvertimePayCalculatorTool() {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Clock3 className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Overtime Pay Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate overtime pay with single-tier or two-tier rates
              </p>
            </div>
          </div>

          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single" className="gap-1.5">
                <Calculator className="size-3.5" />
                Single Tier (1.5×)
              </TabsTrigger>
              <TabsTrigger value="two-tier" className="gap-1.5">
                <Clock3 className="size-3.5" />
                Two Tier (1.5× + 2×)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="mt-6">
              <SingleTierMode />
            </TabsContent>

            <TabsContent value="two-tier" className="mt-6">
              <TwoTierMode />
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Clock3 className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All calculations happen locally using JavaScript. Your pay data is never sent to any server, stored, or shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
