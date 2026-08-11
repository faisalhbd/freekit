"use client"

import { useState, useMemo } from "react"
import { Percent, DollarSign, Tag, Receipt, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ──────────────────────────────────────────────────────────────────

type DiscountType = "percentage" | "fixed"

interface DiscountResult {
  originalPrice: number
  firstDiscountAmt: number
  priceAfterFirst: number
  secondDiscountAmt: number
  priceAfterSecond: number
  totalDiscountAmt: number
  taxAmount: number
  finalPrice: number
  totalSavingsPct: number
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

function formatPct(num: number): string {
  if (!isFinite(num)) return "—"
  return num.toFixed(2) + "%"
}

function parseInput(v: string): number {
  const cleaned = (v || "").replace(/,/g, "").replace(/\s/g, "").replace(/[$%]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

function calculateDiscount(
  originalPrice: number,
  discountType: DiscountType,
  discountValue: number,
  secondDiscountType: DiscountType,
  secondDiscountValue: number,
  taxRate: number
): DiscountResult | null {
  if (originalPrice <= 0) return null

  // First discount
  let firstDiscountAmt: number
  let priceAfterFirst: number

  if (discountType === "percentage") {
    firstDiscountAmt = (discountValue / 100) * originalPrice
  } else {
    firstDiscountAmt = discountValue
  }
  firstDiscountAmt = Math.min(firstDiscountAmt, originalPrice)
  priceAfterFirst = originalPrice - firstDiscountAmt

  // Second discount (applied on the already-discounted price)
  let secondDiscountAmt = 0
  let priceAfterSecond = priceAfterFirst

  if (secondDiscountValue > 0 && priceAfterFirst > 0) {
    if (secondDiscountType === "percentage") {
      secondDiscountAmt = (secondDiscountValue / 100) * priceAfterFirst
    } else {
      secondDiscountAmt = secondDiscountValue
    }
    secondDiscountAmt = Math.min(secondDiscountAmt, priceAfterFirst)
    priceAfterSecond = priceAfterFirst - secondDiscountAmt
  }

  const totalDiscountAmt = firstDiscountAmt + secondDiscountAmt
  const totalSavingsPct = (totalDiscountAmt / originalPrice) * 100

  // Tax
  const taxAmount = (taxRate / 100) * priceAfterSecond
  const finalPrice = priceAfterSecond + taxAmount

  return {
    originalPrice,
    firstDiscountAmt,
    priceAfterFirst,
    secondDiscountAmt,
    priceAfterSecond,
    totalDiscountAmt,
    taxAmount,
    finalPrice,
    totalSavingsPct,
  }
}

// ─── Quick Examples ─────────────────────────────────────────────────────────

function QuickExamples({ onApply }: { onApply: (price: string, pct: string) => void }) {
  const examples = [
    { label: "$100 − 25%", price: "100", pct: "25" },
    { label: "$200 − 30%", price: "200", pct: "30" },
    { label: "$50 − 15%", price: "50", pct: "15" },
    { label: "$150 − $20", price: "150", pct: "20" },
  ]

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
            onClick={() => onApply(ex.price, ex.pct)}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <Calculator className="size-3" />
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function DiscountCalculatorTool() {
  // Inputs
  const [originalPriceStr, setOriginalPriceStr] = useState("")
  const [discountType, setDiscountType] = useState<DiscountType>("percentage")
  const [discountValueStr, setDiscountValueStr] = useState("")

  // Optional second discount
  const [enableSecond, setEnableSecond] = useState(false)
  const [secondDiscountType, setSecondDiscountType] = useState<DiscountType>("percentage")
  const [secondDiscountValueStr, setSecondDiscountValueStr] = useState("")

  // Optional tax
  const [taxRateStr, setTaxRateStr] = useState("")

  // Computed result (real-time)
  const result = useMemo(() => {
    const price = parseInput(originalPriceStr)
    const discVal = parseInput(discountValueStr)
    const secVal = parseInput(secondDiscountValueStr)
    const tax = parseInput(taxRateStr)

    if ((originalPriceStr || "") === "" || price <= 0) return null
    if (discVal <= 0) return null

    return calculateDiscount(
      price,
      discountType,
      discVal,
      secondDiscountType,
      enableSecond ? secVal : 0,
      tax
    )
  }, [
    originalPriceStr,
    discountType,
    discountValueStr,
    enableSecond,
    secondDiscountType,
    secondDiscountValueStr,
    taxRateStr,
  ])

  function handleApplyExample(price: string, pct: string) {
    setOriginalPriceStr(price)
    setDiscountType("percentage")
    setDiscountValueStr(pct)
    setEnableSecond(false)
    setSecondDiscountValueStr("")
    setTaxRateStr("")
  }

  function handleReset() {
    setOriginalPriceStr("")
    setDiscountType("percentage")
    setDiscountValueStr("")
    setEnableSecond(false)
    setSecondDiscountType("percentage")
    setSecondDiscountValueStr("")
    setTaxRateStr("")
  }

  const discountSuffix = discountType === "percentage" ? "%" : "$"
  const secondSuffix = secondDiscountType === "percentage" ? "%" : "$"

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Tag className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Discount Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter the price and discount to see your savings instantly
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-5">
            {/* Original Price */}
            <div className="space-y-2">
              <Label htmlFor="original-price" className="text-sm font-medium">
                Original Price
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="original-price"
                  type="text"
                  inputMode="decimal"
                  value={originalPriceStr}
                  onChange={(e) => setOriginalPriceStr(e.target.value)}
                  placeholder="e.g. 150.00"
                  className="font-mono text-base pl-9"
                  aria-label="Original Price"
                />
              </div>
            </div>

            <Separator />

            {/* First Discount Row */}
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-end">
              <div className="space-y-2">
                <Label htmlFor="discount-type" className="text-sm font-medium">
                  Discount Type
                </Label>
                <Select
                  value={discountType}
                  onValueChange={(v) => setDiscountType(v as DiscountType)}
                >
                  <SelectTrigger id="discount-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      <span className="flex items-center gap-2">
                        <Percent className="size-3.5" /> Percentage (%)
                      </span>
                    </SelectItem>
                    <SelectItem value="fixed">
                      <span className="flex items-center gap-2">
                        <DollarSign className="size-3.5" /> Fixed Amount ($)
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:min-w-[180px]">
                <Label htmlFor="discount-value" className="text-sm font-medium">
                  Discount Value
                </Label>
                <div className="relative">
                  <Input
                    id="discount-value"
                    type="text"
                    inputMode="decimal"
                    value={discountValueStr}
                    onChange={(e) => setDiscountValueStr(e.target.value)}
                    placeholder={discountType === "percentage" ? "e.g. 25" : "e.g. 15.00"}
                    className={`font-mono text-base ${discountType === "fixed" ? "pl-9" : "pr-10"}`}
                    aria-label="Discount Value"
                  />
                  {discountType === "fixed" && (
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  )}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    {discountSuffix}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Optional Second Discount Toggle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEnableSecond(!enableSecond)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    enableSecond ? "bg-primary" : "bg-input"
                  }`}
                  role="switch"
                  aria-checked={enableSecond}
                  aria-label="Enable second discount"
                >
                  <span
                    className={`pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                      enableSecond ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
                <Label className="text-sm font-medium cursor-pointer" onClick={() => setEnableSecond(!enableSecond)}>
                  Add a second discount (stack)
                </Label>
              </div>

              {enableSecond && (
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-end pl-0 sm:pl-2 border-l-2 border-primary/20 ml-1 sm:ml-0 pl-3 sm:pl-0 py-2 sm:py-0 space-y-4 sm:space-y-0">
                  <div className="space-y-2">
                    <Label htmlFor="second-discount-type" className="text-sm font-medium">
                      Second Discount Type
                    </Label>
                    <Select
                      value={secondDiscountType}
                      onValueChange={(v) => setSecondDiscountType(v as DiscountType)}
                    >
                      <SelectTrigger id="second-discount-type" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          <span className="flex items-center gap-2">
                            <Percent className="size-3.5" /> Percentage (%)
                          </span>
                        </SelectItem>
                        <SelectItem value="fixed">
                          <span className="flex items-center gap-2">
                            <DollarSign className="size-3.5" /> Fixed Amount ($)
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:min-w-[180px]">
                    <Label htmlFor="second-discount-value" className="text-sm font-medium">
                      Second Discount Value
                    </Label>
                    <div className="relative">
                      <Input
                        id="second-discount-value"
                        type="text"
                        inputMode="decimal"
                        value={secondDiscountValueStr}
                        onChange={(e) => setSecondDiscountValueStr(e.target.value)}
                        placeholder={secondDiscountType === "percentage" ? "e.g. 10" : "e.g. 5.00"}
                        className={`font-mono text-base ${secondDiscountType === "fixed" ? "pl-9" : "pr-10"}`}
                        aria-label="Second Discount Value"
                      />
                      {secondDiscountType === "fixed" && (
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      )}
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                        {secondSuffix}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Optional Tax Rate */}
            <div className="space-y-2">
              <Label htmlFor="tax-rate" className="text-sm font-medium">
                Tax Rate <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <div className="relative max-w-[200px]">
                <Input
                  id="tax-rate"
                  type="text"
                  inputMode="decimal"
                  value={taxRateStr}
                  onChange={(e) => setTaxRateStr(e.target.value)}
                  placeholder="e.g. 8.25"
                  className="font-mono text-base pr-10"
                  aria-label="Tax Rate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                  %
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Applied to the price after all discounts
              </p>
            </div>

            {/* Quick Examples */}
            <QuickExamples onApply={handleApplyExample} />

            {/* Reset Button */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                <Calculator className="size-3.5" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2.5">
                <Receipt className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Your Savings</h3>
                <p className="text-sm text-muted-foreground">
                  Breakdown of discounts and final price
                </p>
              </div>
            </div>

            {/* Visual Savings Bar */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total Savings</span>
                <Badge variant="secondary" className="font-mono text-sm">
                  {formatPct(result.totalSavingsPct)}
                </Badge>
              </div>
              <Progress
                value={Math.min(result.totalSavingsPct, 100)}
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                You save {formatCurrency(result.totalDiscountAmt)} of {formatCurrency(result.originalPrice)}
              </p>
            </div>

            <Separator className="my-5" />

            {/* Results Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Original Price */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <DollarSign className="size-3.5" />
                  Original Price
                </p>
                <p className="text-xl font-bold tabular-nums">
                  {formatCurrency(result.originalPrice)}
                </p>
              </div>

              {/* Discount Amount */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Tag className="size-3.5" />
                  Total Savings
                </p>
                <p className="text-xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                  −{formatCurrency(result.totalDiscountAmt)}
                </p>
                {enableSecond && result.secondDiscountAmt > 0 && (
                  <p className="text-xs text-muted-foreground">
                    1st: −{formatCurrency(result.firstDiscountAmt)} · 2nd: −{formatCurrency(result.secondDiscountAmt)}
                  </p>
                )}
              </div>

              {/* Price After Discount */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Percent className="size-3.5" />
                  Price After Discount
                </p>
                <p className="text-xl font-bold tabular-nums">
                  {formatCurrency(result.priceAfterSecond)}
                </p>
              </div>

              {/* Tax Amount */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Receipt className="size-3.5" />
                  Tax Amount
                </p>
                <p className="text-xl font-bold tabular-nums">
                  {result.taxAmount > 0
                    ? "+" + formatCurrency(result.taxAmount)
                    : formatCurrency(0)}
                </p>
                {(taxRateStr || "") !== "" && parseInput(taxRateStr) > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formatPct(parseInput(taxRateStr))} tax rate
                  </p>
                )}
              </div>

              {/* Final Price */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1 sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wide flex items-center gap-1.5">
                  <DollarSign className="size-3.5" />
                  Final Price
                </p>
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {formatCurrency(result.finalPrice)}
                </p>
              </div>

              {/* Total Savings % */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1 sm:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Calculator className="size-3.5" />
                      Summary
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You pay {formatCurrency(result.finalPrice)} instead of {formatCurrency(result.originalPrice)}
                    </p>
                  </div>
                  <Badge className="text-sm px-3 py-1 bg-emerald-600 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-500">
                    Save {formatPct(result.totalSavingsPct)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Tag className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All discount calculations happen locally using JavaScript. Your prices are never sent
              to any server, stored, or shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
