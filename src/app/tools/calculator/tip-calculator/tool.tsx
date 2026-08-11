"use client"

import { useState, useMemo } from "react"
import { DollarSign, Users, Calculator, Receipt, Split } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

// ─── Types ──────────────────────────────────────────────────────────────────

interface TipResult {
  billAmount: number
  tipPercentage: number
  tipAmount: number
  totalBill: number
  numberOfPeople: number
  perPerson: number
  tipPerPerson: number
}

interface QuickPreset {
  label: string
  bill: string
  tip: string
  people: string
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

const QUICK_TIP_PERCENTAGES = [10, 15, 18, 20, 25]

const QUICK_PRESETS: QuickPreset[] = [
  { label: "Lunch for 2 (18%)", bill: "45", tip: "18", people: "2" },
  { label: "Dinner for 4 (20%)", bill: "120", tip: "20", people: "4" },
  { label: "Quick Coffee (15%)", bill: "12", tip: "15", people: "1" },
  { label: "Group of 8 (20%)", bill: "320", tip: "20", people: "8" },
  { label: "Delivery for 1 (18%)", bill: "28", tip: "18", people: "1" },
  { label: "Brunch for 6 (20%)", bill: "95", tip: "20", people: "6" },
]

// ─── Quick Preset Buttons ───────────────────────────────────────────────────

function QuickPresets({ onApply }: { onApply: (bill: string, tip: string, people: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Quick scenarios
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onApply(preset.bill, preset.tip, preset.people)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <Calculator className="size-3" />
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Tip Percentage Buttons ─────────────────────────────────────────────────

function TipPercentageButtons({
  selected,
  onSelect,
  onCustom,
}: {
  selected: number | null
  onSelect: (pct: number) => void
  onCustom: () => void
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Tip Percentage</Label>
      <div className="flex flex-wrap gap-2">
        {QUICK_TIP_PERCENTAGES.map((pct) => {
          const isSelected = selected === pct
          return (
            <Button
              key={pct}
              type="button"
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(pct)}
              className={
                isSelected
                  ? "min-w-[3.5rem]"
                  : "min-w-[3.5rem] hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              }
            >
              {pct}%
            </Button>
          )
        })}
        <Button
          type="button"
          variant={selected !== null && !QUICK_TIP_PERCENTAGES.includes(selected) ? "default" : "outline"}
          size="sm"
          onClick={onCustom}
          className={
            selected !== null && !QUICK_TIP_PERCENTAGES.includes(selected)
              ? "min-w-[3.5rem]"
              : "min-w-[3.5rem] hover:bg-primary/10 hover:text-primary hover:border-primary/30"
          }
        >
          Custom
        </Button>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function TipCalculatorTool() {
  const [billAmountStr, setBillAmountStr] = useState("")
  const [tipPercentageStr, setTipPercentageStr] = useState("")
  const [peopleCountStr, setPeopleCountStr] = useState("")
  const [isCustomTip, setIsCustomTip] = useState(false)

  // Computed result (real-time)
  const result = useMemo((): TipResult | null => {
    const billAmount = parseInput(billAmountStr)
    const tipPct = parseInput(tipPercentageStr)
    const people = Math.max(1, Math.round(parseInput(peopleCountStr)) || 1)

    if ((billAmountStr || "") === "" || billAmount <= 0) return null
    if (tipPct <= 0) return null

    const tipAmount = (tipPct / 100) * billAmount
    const totalBill = billAmount + tipAmount
    const perPerson = totalBill / people
    const tipPerPerson = tipAmount / people

    return {
      billAmount,
      tipPercentage: tipPct,
      tipAmount,
      totalBill,
      numberOfPeople: people,
      perPerson,
      tipPerPerson,
    }
  }, [billAmountStr, tipPercentageStr, peopleCountStr])

  // Slider value (clamped to 1-50)
  const sliderValue = useMemo(() => {
    const p = Math.round(parseInput(peopleCountStr)) || 1
    return Math.max(1, Math.min(50, p))
  }, [peopleCountStr])

  function handleTipSelect(pct: number) {
    setTipPercentageStr(String(pct))
    setIsCustomTip(false)
  }

  function handleCustomTip() {
    setIsCustomTip(true)
    setTipPercentageStr("")
  }

  function handleSliderChange(value: number[]) {
    setPeopleCountStr(String(value[0]))
  }

  function handleApplyPreset(bill: string, tip: string, people: string) {
    setBillAmountStr(bill)
    setTipPercentageStr(tip)
    setPeopleCountStr(people)
    const pctNum = parseFloat(tip)
    setIsCustomTip(pctNum > 0 && !QUICK_TIP_PERCENTAGES.includes(pctNum))
  }

  function handleReset() {
    setBillAmountStr("")
    setTipPercentageStr("")
    setPeopleCountStr("")
    setIsCustomTip(false)
  }

  function handlePeopleChange(val: string) {
    const num = parseInt(val, 10)
    if (isNaN(num) || val === "") {
      setPeopleCountStr("")
    } else {
      setPeopleCountStr(String(Math.max(1, Math.min(50, num))))
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Receipt className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Tip Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter your bill and choose a tip — results update instantly
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Bill Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="bill-amount" className="text-sm font-medium">
                Bill Amount
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="bill-amount"
                  type="text"
                  inputMode="decimal"
                  value={billAmountStr}
                  onChange={(e) => setBillAmountStr(e.target.value)}
                  placeholder="e.g. 85.50"
                  className="font-mono text-base pl-9"
                  aria-label="Bill amount in dollars"
                />
              </div>
            </div>

            <Separator />

            {/* Tip Percentage Quick Buttons */}
            <TipPercentageButtons
              selected={
                (tipPercentageStr || "") === ""
                  ? null
                  : parseInput(tipPercentageStr)
              }
              onSelect={handleTipSelect}
              onCustom={handleCustomTip}
            />

            {/* Custom Tip Input (shown when custom is selected) */}
            {isCustomTip && (
              <div className="space-y-2">
                <Label htmlFor="custom-tip" className="text-sm font-medium">
                  Custom Tip Percentage
                </Label>
                <div className="relative max-w-[200px]">
                  <Input
                    id="custom-tip"
                    type="text"
                    inputMode="decimal"
                    value={tipPercentageStr}
                    onChange={(e) => setTipPercentageStr(e.target.value)}
                    placeholder="e.g. 22"
                    className="font-mono text-base pr-10"
                    aria-label="Custom tip percentage"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    %
                  </span>
                </div>
              </div>
            )}

            {/* Tip Percentage Input (always visible for manual editing) */}
            {!isCustomTip && (tipPercentageStr || "") !== "" && (
              <div className="space-y-2">
                <Label htmlFor="tip-input" className="text-sm font-medium">
                  Tip Percentage
                </Label>
                <div className="relative max-w-[200px]">
                  <Input
                    id="tip-input"
                    type="text"
                    inputMode="decimal"
                    value={tipPercentageStr}
                    onChange={(e) => {
                      setTipPercentageStr(e.target.value)
                      const pctNum = parseFloat(e.target.value)
                      if (!QUICK_TIP_PERCENTAGES.includes(pctNum)) {
                        setIsCustomTip(true)
                      }
                    }}
                    placeholder="e.g. 20"
                    className="font-mono text-base pr-10"
                    aria-label="Tip percentage"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    %
                  </span>
                </div>
              </div>
            )}

            <Separator />

            {/* Number of People */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="people-count" className="text-sm font-medium flex items-center gap-2">
                  <Users className="size-4" />
                  Number of People
                </Label>
                <Badge variant="secondary" className="font-mono">
                  {sliderValue}
                </Badge>
              </div>
              <Slider
                value={[sliderValue]}
                onValueChange={handleSliderChange}
                min={1}
                max={50}
                step={1}
                aria-label="Number of people to split the bill"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>1 person</span>
                <span>50 people</span>
              </div>
              <div className="max-w-[140px]">
                <Input
                  id="people-count"
                  type="text"
                  inputMode="numeric"
                  value={peopleCountStr}
                  onChange={(e) => handlePeopleChange(e.target.value)}
                  placeholder="1"
                  className="font-mono text-base text-center"
                  aria-label="Number of people"
                />
              </div>
            </div>

            <Separator />

            {/* Quick Presets */}
            <QuickPresets onApply={handleApplyPreset} />

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
                <DollarSign className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Your Tip Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  {result.numberOfPeople === 1
                    ? "Tip and total for your bill"
                    : `Split ${result.numberOfPeople} ways`}
                </p>
              </div>
            </div>

            {/* Tip Percentage Badge */}
            <div className="mb-5 flex items-center gap-3">
              <Badge className="text-sm px-3 py-1 bg-emerald-600 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-500">
                {result.tipPercentage}% tip
              </Badge>
              {result.numberOfPeople > 1 && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Split className="size-3 mr-1" />
                  {result.numberOfPeople} people
                </Badge>
              )}
            </div>

            <Separator className="my-5" />

            {/* Results Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {/* Bill Amount */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Receipt className="size-3.5" />
                  Bill Amount
                </p>
                <p className="text-xl font-bold tabular-nums">
                  {formatCurrency(result.billAmount)}
                </p>
              </div>

              {/* Tip Amount */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <DollarSign className="size-3.5" />
                  Tip Amount
                </p>
                <p className="text-xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                  +{formatCurrency(result.tipAmount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.tipPercentage}% of {formatCurrency(result.billAmount)}
                </p>
              </div>

              {/* Total Bill */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wide flex items-center gap-1.5">
                  <Calculator className="size-3.5" />
                  Total Bill
                </p>
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {formatCurrency(result.totalBill)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Bill + tip combined
                </p>
              </div>

              {/* Per Person (when splitting) */}
              {result.numberOfPeople > 1 ? (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Users className="size-3.5" />
                    Per Person
                  </p>
                  <p className="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-400">
                    {formatCurrency(result.perPerson)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tip per person: {formatCurrency(result.tipPerPerson)}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                    <Users className="size-3.5" />
                    Per Person
                  </p>
                  <p className="text-xl font-bold tabular-nums">
                    {formatCurrency(result.totalBill)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tip per person: {formatCurrency(result.tipAmount)}
                  </p>
                </div>
              )}
            </div>

            {/* Summary Row */}
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  {result.numberOfPeople > 1 ? (
                    <>
                      Each person pays <span className="font-semibold text-foreground">{formatCurrency(result.perPerson)}</span>{" "}
                      ({formatCurrency(result.perPerson - result.tipPerPerson)} bill + {formatCurrency(result.tipPerPerson)} tip)
                    </>
                  ) : (
                    <>
                      Total to pay: <span className="font-semibold text-foreground">{formatCurrency(result.totalBill)}</span>{" "}
                      ({formatCurrency(result.billAmount)} bill + {formatCurrency(result.tipAmount)} tip)
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <DollarSign className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All tip calculations happen locally using JavaScript. Your bill amounts are never sent
              to any server, stored, or shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
