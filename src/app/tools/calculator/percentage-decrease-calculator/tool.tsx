"use client"

import { useState, useMemo } from "react"
import { TrendingDown, Calculator, ArrowDown, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ─── Types ──────────────────────────────────────────────────────────────────

interface DecreaseResult {
  percentageDecrease: number
  absoluteChange: number
  remainingPercent: number
  formattedPercentage: string
  formattedAbsolute: string
  formattedRemaining: string
  formula: string
  isDecrease: boolean
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatNumber(num: number, decimals: number = 4): string {
  if (!isFinite(num)) return "—"
  const str = num.toFixed(decimals)
  const parts = str.split(".")
  if (parts[1]) {
    parts[1] = parts[1].replace(/0+$/, "")
    if (parts[1].length < 2) parts[1] = parts[1].padEnd(2, "0")
  }
  const formatted = parts.join(".")
  return Number(formatted).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  })
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

function calculatePercentageDecrease(
  original: number,
  newValue: number
): DecreaseResult | null {
  if (original === 0) return null
  const absoluteChange = original - newValue
  const percentageDecrease = (absoluteChange / original) * 100
  const remainingPercent = (newValue / original) * 100
  const isDecrease = absoluteChange >= 0

  return {
    percentageDecrease,
    absoluteChange,
    remainingPercent,
    formattedPercentage: formatNumber(Math.abs(percentageDecrease)) + "%",
    formattedAbsolute: formatNumber(Math.abs(absoluteChange)),
    formattedRemaining: formatNumber(Math.abs(remainingPercent)) + "%",
    formula: `((${formatNumber(original)} − ${formatNumber(newValue)}) ÷ ${formatNumber(original)}) × 100 = ${formatNumber(percentageDecrease)}%`,
    isDecrease,
  }
}

// ─── Quick Examples Component ───────────────────────────────────────────────

function QuickExamples({
  examples,
}: {
  examples: { label: string; action: () => void; icon: React.ReactNode }[]
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Quick examples
      </p>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={ex.action}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            {ex.icon}
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Stat Card Component ────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
      <div
        className={`flex items-center justify-center rounded-full p-2 shrink-0 ${color}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-lg font-bold tabular-nums mt-0.5 truncate">{value}</p>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function PercentageDecreaseCalculatorTool() {
  const [originalValue, setOriginalValue] = useState("")
  const [newValue, setNewValue] = useState("")

  const result = useMemo(() => {
    const orig = parseInput(originalValue)
    const newV = parseInput(newValue)
    if ((originalValue || "") === "" || (newValue || "") === "") return null
    if (orig === 0) return null
    return calculatePercentageDecrease(orig, newV)
  }, [originalValue, newValue])

  const quickExamples = [
    {
      label: "Price drop: $200 → $150",
      action: () => {
        setOriginalValue("200")
        setNewValue("150")
      },
      icon: <DollarSign className="size-3" />,
    },
    {
      label: "Budget cut: $50k → $40k",
      action: () => {
        setOriginalValue("50000")
        setNewValue("40000")
      },
      icon: <TrendingDown className="size-3" />,
    },
    {
      label: "Weight loss: 200 → 180 lbs",
      action: () => {
        setOriginalValue("200")
        setNewValue("180")
      },
      icon: <ArrowDown className="size-3" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <TrendingDown className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                Percentage Decrease Calculator
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter two values to see the percentage decline — results update in
                real time
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="original-value"
                className="text-sm font-medium"
              >
                Original Value
              </Label>
              <Input
                id="original-value"
                type="text"
                inputMode="decimal"
                value={originalValue}
                onChange={(e) => setOriginalValue(e.target.value)}
                placeholder="e.g. 200"
                className="font-mono text-base"
                aria-label="Original Value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-value" className="text-sm font-medium">
                New Value
              </Label>
              <Input
                id="new-value"
                type="text"
                inputMode="decimal"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="e.g. 150"
                className="font-mono text-base"
                aria-label="New Value"
              />
            </div>
          </div>

          {/* Visual Indicator */}
          {result && (
            <div className="mt-5 flex items-center gap-2">
              {result.isDecrease ? (
                <>
                  <div className="flex items-center justify-center rounded-full bg-red-500/10 p-1.5">
                    <ArrowDown className="size-4 text-red-500 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-red-500 dark:text-red-400">
                    Value decreased by {result.formattedPercentage}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-1.5">
                    <TrendingDown className="size-4 text-emerald-600 dark:text-emerald-400 rotate-180" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Value actually increased by {result.formattedPercentage}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Quick Examples */}
          <div className="mt-6">
            <QuickExamples examples={quickExamples} />
          </div>
        </div>
      </Card>

      {/* Results Card */}
      {result && (
        <Card className="overflow-hidden">
          <div
            className={`p-6 sm:p-8 ${
              result.isDecrease
                ? "bg-gradient-to-r from-red-500/10 via-red-500/5 to-background"
                : "bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`flex items-center justify-center rounded-full p-2.5 ${
                  result.isDecrease
                    ? "bg-red-500/10"
                    : "bg-emerald-500/10"
                }`}
              >
                <Calculator
                  className={`size-5 ${
                    result.isDecrease
                      ? "text-red-500 dark:text-red-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Results
              </span>
            </div>

            {/* Main Result */}
            <div className="text-center mb-6">
              <p className="text-3xl sm:text-4xl font-bold tabular-nums">
                <span
                  className={`
                    ${
                      result.isDecrease
                        ? "text-red-500 dark:text-red-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }
                  `}
                >
                  {result.isDecrease ? "−" : "+"}
                  {result.formattedPercentage}
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Percentage {result.isDecrease ? "Decrease" : "Increase"}
              </p>
            </div>

            <Separator className="my-4" />

            {/* Stat Grid */}
            <div className="grid gap-3 sm:grid-cols-3 mt-4">
              <StatCard
                icon={
                  <ArrowDown
                    className={`size-4 ${
                      result.isDecrease
                        ? "text-red-500 dark:text-red-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  />
                }
                label={
                  result.isDecrease
                    ? "Absolute Decrease"
                    : "Absolute Increase"
                }
                value={
                  result.isDecrease
                    ? `−${result.formattedAbsolute}`
                    : `+${result.formattedAbsolute}`
                }
                color={
                  result.isDecrease
                    ? "bg-red-500/10"
                    : "bg-emerald-500/10"
                }
              />
              <StatCard
                icon={
                  <TrendingDown className="size-4 text-primary" />
                }
                label="Remaining %"
                value={result.formattedRemaining}
                color="bg-primary/10"
              />
              <StatCard
                icon={
                  <Calculator className="size-4 text-primary" />
                }
                label="Direction"
                value={
                  result.isDecrease
                    ? "Decline ↓"
                    : "Growth ↑"
                }
                color={
                  result.isDecrease
                    ? "bg-red-500/10"
                    : "bg-emerald-500/10"
                }
              />
            </div>

            <Separator className="my-4" />

            {/* Formula Display */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Calculator className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-medium">
                  Formula:
                </span>
              </div>
              <code className="block text-sm font-mono bg-muted px-4 py-3 rounded-lg leading-relaxed">
                {result.formula}
              </code>
            </div>

            {/* Breakdown */}
            <div className="mt-4 space-y-2">
              <span className="text-sm text-muted-foreground font-medium">
                Step-by-step:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  Absolute change = {formatNumber(parseInput(originalValue))} − {" "}
                  {formatNumber(parseInput(newValue))} = {" "}
                  <Badge variant="secondary">
                    {formatNumber(result.absoluteChange)}
                  </Badge>
                </li>
                <li>
                  Divide by original: {formatNumber(result.absoluteChange)} ÷ {" "}
                  {formatNumber(parseInput(originalValue))} = {" "}
                  <Badge variant="secondary">
                    {formatNumber(result.absoluteChange / parseInput(originalValue))}
                  </Badge>
                </li>
                <li>
                  Multiply by 100: {" "}
                  {formatNumber(result.absoluteChange / parseInput(originalValue))} × 100 = {" "}
                  <Badge
                    variant="secondary"
                    className={
                      result.isDecrease
                        ? "bg-red-500/10 text-red-700 dark:text-red-400"
                        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    }
                  >
                    {formatNumber(result.percentageDecrease)}%
                  </Badge>
                </li>
                <li>
                  Remaining value = {formatNumber(parseInput(newValue))} / {" "}
                  {formatNumber(parseInput(originalValue))} × 100 = {" "}
                  <Badge variant="secondary">
                    {result.formattedRemaining}
                  </Badge>
                </li>
              </ol>
            </div>
          </div>
        </Card>
      )}

      {/* Original Value is Zero Warning */}
      {originalValue !== "" &&
        parseInput(originalValue) === 0 &&
        newValue !== "" && (
          <Card className="p-4 border-amber-500/30 bg-amber-500/5">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong>Note:</strong> The original value cannot be zero.
              Percentage decrease is calculated relative to the original value, and
              division by zero is undefined.
            </p>
          </Card>
        )}

      {/* Empty State Hint */}
      {!result &&
        (originalValue || "") === "" &&
        (newValue || "") === "" && (
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center rounded-full bg-muted p-4">
                <TrendingDown className="size-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Enter values to calculate
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Type an original value and a new value above, or click a quick
                  example to get started.
                </p>
              </div>
            </div>
          </Card>
        )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-red-500/10 p-2 shrink-0">
            <TrendingDown className="size-5 text-red-500 dark:text-red-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              100% Private — Runs in Your Browser
            </p>
            <p className="text-sm text-muted-foreground">
              All percentage decrease calculations happen locally using
              JavaScript. Your numbers are never sent to any server, stored, or
              shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
