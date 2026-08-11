"use client"

import { useState, useMemo } from "react"
import { Receipt, Calculator, DollarSign, Percent, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ─── Types ──────────────────────────────────────────────────────────────────

type CalcMode = "add" | "extract"

interface VATResult {
  mode: CalcMode
  netAmount: number
  taxAmount: number
  grossAmount: number
  taxRate: number
}

interface TaxPreset {
  label: string
  rate: number
  group: string
}

// ─── Constants ──────────────────────────────────────────────────────────────

const QUICK_RATES = [5, 10, 15, 20, 25]

const COUNTRY_PRESETS: TaxPreset[] = [
  { label: "US Sales Tax (varies)", rate: 8.25, group: "Americas" },
  { label: "Canada GST 5%", rate: 5, group: "Americas" },
  { label: "UK Standard 20%", rate: 20, group: "Europe" },
  { label: "EU Standard 20-25%", rate: 22, group: "Europe" },
  { label: "Australia GST 10%", rate: 10, group: "Asia-Pacific" },
  { label: "Japan 10%", rate: 10, group: "Asia-Pacific" },
  { label: "India GST 18%", rate: 18, group: "Asia-Pacific" },
  { label: "New Zealand GST 15%", rate: 15, group: "Asia-Pacific" },
]

const ALL_PRESETS = [
  ...QUICK_RATES.map((r) => ({ label: `${r}%`, rate: r, group: "Quick" })),
  ...COUNTRY_PRESETS,
]

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

// ─── Quick Rate Buttons ─────────────────────────────────────────────────────

function QuickRateButtons({
  selected,
  onSelect,
}: {
  selected: number | null
  onSelect: (rate: number) => void
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Quick Tax Rates</Label>
      <div className="flex flex-wrap gap-2">
        {QUICK_RATES.map((rate) => {
          const isSelected = selected === rate
          return (
            <Button
              key={rate}
              type="button"
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(rate)}
              className={
                isSelected
                  ? "min-w-[3.5rem]"
                  : "min-w-[3.5rem] hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              }
            >
              {rate}%
            </Button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Country Preset Buttons ─────────────────────────────────────────────────

function CountryPresets({ onSelect }: { onSelect: (rate: number) => void }) {
  const groups = [...new Set(COUNTRY_PRESETS.map((p) => p.group))]

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Country / Region Presets</Label>
      {groups.map((group) => (
        <div key={group} className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {group}
          </p>
          <div className="flex flex-wrap gap-2">
            {COUNTRY_PRESETS.filter((p) => p.group === group).map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => onSelect(preset.rate)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              >
                <Calculator className="size-3" />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Results Display ────────────────────────────────────────────────────────

function ResultsDisplay({ result, mode }: { result: VATResult; mode: CalcMode }) {
  const isAdd = mode === "add"

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2.5">
            <Receipt className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {isAdd ? "Tax Added" : "Tax Extracted"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isAdd
                ? "Gross price including tax"
                : "Net price after removing tax"}
            </p>
          </div>
        </div>

        {/* Tax Rate Badge */}
        <div className="mb-5 flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-emerald-600 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-500">
            <Percent className="size-3 mr-1" />
            {result.taxRate}% {isAdd ? "added" : "extracted"}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {isAdd ? "Add Tax Mode" : "Extract Tax Mode"}
          </Badge>
        </div>

        <Separator className="my-5" />

        {/* Calculation Breakdown */}
        <div className="rounded-lg border border-border bg-card p-4 mb-5 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
            <Calculator className="size-3.5" />
            Calculation Breakdown
          </p>
          {isAdd ? (
            <div className="space-y-1 text-sm text-muted-foreground font-mono">
              <p>
                Net Amount: <span className="text-foreground font-semibold">{formatCurrency(result.netAmount)}</span>
              </p>
              <p>
                Tax ({result.taxRate}%): {formatCurrency(result.netAmount)} &times; {result.taxRate / 100} ={" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{formatCurrency(result.taxAmount)}</span>
              </p>
              <p>
                Gross Total: {formatCurrency(result.netAmount)} + {formatCurrency(result.taxAmount)} ={" "}
                <span className="text-primary font-bold text-base">{formatCurrency(result.grossAmount)}</span>
              </p>
            </div>
          ) : (
            <div className="space-y-1 text-sm text-muted-foreground font-mono">
              <p>
                Gross Amount: <span className="text-foreground font-semibold">{formatCurrency(result.grossAmount)}</span>
              </p>
              <p>
                Net Amount: {formatCurrency(result.grossAmount)} &divide; {(1 + result.taxRate / 100).toFixed(4)} ={" "}
                <span className="text-primary font-bold text-base">{formatCurrency(result.netAmount)}</span>
              </p>
              <p>
                Tax ({result.taxRate}%): {formatCurrency(result.grossAmount)} − {formatCurrency(result.netAmount)} ={" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{formatCurrency(result.taxAmount)}</span>
              </p>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Net Amount */}
          <div
            className={`rounded-lg border p-4 space-y-1 ${
              isAdd
                ? "border-border bg-card"
                : "border-primary/30 bg-primary/5"
            }`}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <DollarSign className="size-3.5" />
              {isAdd ? "Net Amount (before tax)" : "Net Amount (excl. tax)"}
            </p>
            <p
              className={`text-xl font-bold tabular-nums ${
                isAdd ? "" : "text-primary"
              }`}
            >
              {formatCurrency(result.netAmount)}
            </p>
            {isAdd && (
              <p className="text-xs text-muted-foreground">
                The price without tax
              </p>
            )}
          </div>

          {/* Tax Amount */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
              <Percent className="size-3.5" />
              Tax Amount
            </p>
            <p className="text-xl font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
              {isAdd ? "+" : "−"}{formatCurrency(result.taxAmount)}
            </p>
            <p className="text-xs text-muted-foreground">
              {result.taxRate}% of {isAdd ? formatCurrency(result.netAmount) : formatCurrency(result.netAmount)}
            </p>
          </div>

          {/* Gross Amount */}
          <div
            className={`rounded-lg border p-4 space-y-1 ${
              isAdd
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <p
              className={`text-xs font-medium uppercase tracking-wide flex items-center gap-1.5 ${
                isAdd
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Receipt className="size-3.5" />
              {isAdd ? "Gross Amount (incl. tax)" : "Gross Amount (incl. tax)"}
            </p>
            <p
              className={`text-2xl font-bold tabular-nums ${
                isAdd ? "text-primary" : ""
              }`}
            >
              {formatCurrency(result.grossAmount)}
            </p>
            {!isAdd && (
              <p className="text-xs text-muted-foreground">
                The price you entered
              </p>
            )}
          </div>

          {/* Tax Rate Used */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Info className="size-3.5" />
              Tax Rate Used
            </p>
            <p className="text-xl font-bold tabular-nums">
              {result.taxRate}%
            </p>
            <p className="text-xs text-muted-foreground">
              {isAdd ? "Added to net" : "Extracted from gross"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function VATTaxCalculatorTool() {
  const [mode, setMode] = useState<CalcMode>("add")
  const [amountStr, setAmountStr] = useState("")
  const [taxRateStr, setTaxRateStr] = useState("")
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)

  // Computed result (real-time)
  const result = useMemo((): VATResult | null => {
    const amount = parseInput(amountStr)
    const taxRate = parseInput(taxRateStr)

    if ((amountStr || "") === "" || amount <= 0) return null
    if (taxRate <= 0) return null

    if (mode === "add") {
      const taxAmount = (taxRate / 100) * amount
      const grossAmount = amount + taxAmount
      return {
        mode,
        netAmount: amount,
        taxAmount,
        grossAmount,
        taxRate,
      }
    } else {
      const netAmount = amount / (1 + taxRate / 100)
      const taxAmount = amount - netAmount
      return {
        mode,
        netAmount,
        taxAmount,
        grossAmount: amount,
        taxRate,
      }
    }
  }, [mode, amountStr, taxRateStr])

  function handleQuickRateSelect(rate: number) {
    setTaxRateStr(String(rate))
    setSelectedPreset(rate)
  }

  function handleCountryPreset(rate: number) {
    setTaxRateStr(String(rate))
    setSelectedPreset(rate)
  }

  function handleReset() {
    setAmountStr("")
    setTaxRateStr("")
    setSelectedPreset(null)
  }

  function handleTaxRateChange(val: string) {
    setTaxRateStr(val)
    const num = parseFloat(val)
    if (QUICK_RATES.includes(num)) {
      setSelectedPreset(num)
    } else {
      const isCountryPreset = COUNTRY_PRESETS.some((p) => p.rate === num)
      setSelectedPreset(isCountryPreset ? num : null)
    }
  }

  const currentPresetLabel = useMemo(() => {
    if (selectedPreset === null) return null
    const found = ALL_PRESETS.find((p) => p.rate === selectedPreset)
    return found ? found.label : null
  }, [selectedPreset])

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
              <h3 className="font-semibold text-lg">VAT / Tax Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Add or extract tax from any amount with custom rates
              </p>
            </div>
          </div>

          {/* Mode Tabs */}
          <Tabs
            value={mode}
            onValueChange={(v) => setMode(v as CalcMode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="add" className="gap-2">
                <DollarSign className="size-3.5" />
                Add Tax to Net Price
              </TabsTrigger>
              <TabsTrigger value="extract" className="gap-2">
                <Receipt className="size-3.5" />
                Extract Tax from Gross Price
              </TabsTrigger>
            </TabsList>

            {/* Both tabs share the same input fields */}
            <div className="space-y-5">
              {/* Amount Input */}
              <TabsContent value="add" className="mt-0 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="net-amount" className="text-sm font-medium">
                    Net Amount (before tax)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="net-amount"
                      type="text"
                      inputMode="decimal"
                      value={amountStr}
                      onChange={(e) => setAmountStr(e.target.value)}
                      placeholder="e.g. 100.00"
                      className="font-mono text-base pl-9"
                      aria-label="Net amount before tax"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the price before tax is applied
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="extract" className="mt-0 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="gross-amount" className="text-sm font-medium">
                    Gross Amount (including tax)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="gross-amount"
                      type="text"
                      inputMode="decimal"
                      value={amountStr}
                      onChange={(e) => setAmountStr(e.target.value)}
                      placeholder="e.g. 120.00"
                      className="font-mono text-base pl-9"
                      aria-label="Gross amount including tax"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the total price that already includes tax
                  </p>
                </div>
              </TabsContent>

              <Separator />

              {/* Quick Rate Buttons */}
              <QuickRateButtons
                selected={selectedPreset}
                onSelect={handleQuickRateSelect}
              />

              {/* Custom Tax Rate Input */}
              <div className="space-y-2">
                <Label htmlFor="tax-rate" className="text-sm font-medium">
                  Tax Rate
                </Label>
                <div className="relative max-w-[200px]">
                  <Input
                    id="tax-rate"
                    type="text"
                    inputMode="decimal"
                    value={taxRateStr}
                    onChange={(e) => handleTaxRateChange(e.target.value)}
                    placeholder="e.g. 20"
                    className="font-mono text-base pr-10"
                    aria-label="Tax rate percentage"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    %
                  </span>
                </div>
                {currentPresetLabel && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {currentPresetLabel}
                  </p>
                )}
              </div>

              <Separator />

              {/* Country Presets */}
              <CountryPresets onSelect={handleCountryPreset} />

              {/* Reset Button */}
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                  <Calculator className="size-3.5" />
                  Reset
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </Card>

      {/* Results Section */}
      {result && <ResultsDisplay result={result} mode={mode} />}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Info className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All tax calculations happen locally using JavaScript. Your amounts and rates are never sent
              to any server, stored, or shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
