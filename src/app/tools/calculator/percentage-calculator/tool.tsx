"use client"

import { useState, useMemo } from "react"
import { Percent, Calculator, TrendingUp, TrendingDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ─── Types ──────────────────────────────────────────────────────────────────

type TabValue =
  | "percent-of"
  | "what-percent"
  | "percent-change"
  | "increase"
  | "decrease"

interface CalcResult {
  value: number
  formatted: string
  formula: string
  label: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatNumber(num: number, decimals: number = 4): string {
  if (!isFinite(num)) return "—"
  // Remove trailing zeros but keep at least 2 decimals
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

function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) return 0
  return numerator / denominator
}

// ─── Calculation Functions ───────────────────────────────────────────────────

function calcPercentOf(pct: number, base: number): CalcResult | null {
  if (base === 0 && pct === 0) return null
  const result = (pct / 100) * base
  return {
    value: result,
    formatted: formatNumber(result),
    formula: `${pct}% × ${base} = ${formatNumber(result)}`,
    label: `${formatNumber(pct)}% of ${formatNumber(base)} = ${formatNumber(result)}`,
  }
}

function calcWhatPercent(part: number, whole: number): CalcResult | null {
  if (whole === 0) return null
  const result = safeDivide(part, whole) * 100
  return {
    value: result,
    formatted: formatNumber(result) + "%",
    formula: `(${part} ÷ ${whole}) × 100 = ${formatNumber(result)}%`,
    label: `${formatNumber(part)} is ${formatNumber(result)}% of ${formatNumber(whole)}`,
  }
}

function calcPercentChange(original: number, newValue: number): CalcResult | null {
  if (original === 0) return null
  const result = safeDivide(newValue - original, original) * 100
  const direction = result >= 0 ? "increase" : "decrease"
  return {
    value: result,
    formatted: formatNumber(Math.abs(result)) + "%",
    formula: `((${newValue} − ${original}) ÷ ${original}) × 100 = ${formatNumber(result)}%`,
    label: `${formatNumber(Math.abs(result))}% ${direction} from ${formatNumber(original)} to ${formatNumber(newValue)}`,
  }
}

function calcIncrease(base: number, pct: number): CalcResult | null {
  if (base === 0 && pct === 0) return null
  const increaseAmt = (pct / 100) * base
  const result = base + increaseAmt
  return {
    value: result,
    formatted: formatNumber(result),
    formula: `${base} + (${pct}% × ${base}) = ${base} + ${formatNumber(increaseAmt)} = ${formatNumber(result)}`,
    label: `${formatNumber(base)} increased by ${formatNumber(pct)}% = ${formatNumber(result)}`,
  }
}

function calcDecrease(base: number, pct: number): CalcResult | null {
  if (base === 0 && pct === 0) return null
  const decreaseAmt = (pct / 100) * base
  const result = base - decreaseAmt
  return {
    value: result,
    formatted: formatNumber(result),
    formula: `${base} − (${pct}% × ${base}) = ${base} − ${formatNumber(decreaseAmt)} = ${formatNumber(result)}`,
    label: `${formatNumber(base)} decreased by ${formatNumber(pct)}% = ${formatNumber(result)}`,
  }
}

// ─── Result Display Component ───────────────────────────────────────────────

function ResultDisplay({ result, icon }: { result: CalcResult; icon: React.ReactNode }) {
  const isNegative = result.value < 0

  return (
    <Card className="overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
            {icon}
          </div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Result
          </span>
        </div>

        <p className="text-2xl sm:text-3xl font-bold tabular-nums mb-4">
          {result.label}
        </p>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calculator className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">Formula:</span>
            <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
              {result.formula}
            </code>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium">Answer:</span>
            <span
              className={`text-lg font-bold tabular-nums ${
                isNegative ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {isNegative ? "−" : ""}{result.formatted}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Input Field Component ──────────────────────────────────────────────────

function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  suffix?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="font-mono text-base pr-12"
          aria-label={label}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function PercentageCalculatorTool() {
  const [activeTab, setActiveTab] = useState<TabValue>("percent-of")

  // Tab 1: What is X% of Y?
  const [pctOf_pct, setPctOf_pct] = useState("")
  const [pctOf_base, setPctOf_base] = useState("")

  // Tab 2: X is what % of Y?
  const [whatPct_part, setWhatPct_part] = useState("")
  const [whatPct_whole, setWhatPct_whole] = useState("")

  // Tab 3: Percentage change from X to Y
  const [change_original, setChange_original] = useState("")
  const [change_new, setChange_new] = useState("")

  // Tab 4: X increased by Y%
  const [inc_base, setInc_base] = useState("")
  const [inc_pct, setInc_pct] = useState("")

  // Tab 5: X decreased by Y%
  const [dec_base, setDec_base] = useState("")
  const [dec_pct, setDec_pct] = useState("")

  // ── Real-time results ──

  const result1 = useMemo(() => {
    const pct = parseInput(pctOf_pct)
    const base = parseInput(pctOf_base)
    if ((pctOf_pct || "") === "" || (pctOf_base || "") === "") return null
    return calcPercentOf(pct, base)
  }, [pctOf_pct, pctOf_base])

  const result2 = useMemo(() => {
    const part = parseInput(whatPct_part)
    const whole = parseInput(whatPct_whole)
    if ((whatPct_part || "") === "" || (whatPct_whole || "") === "") return null
    return calcWhatPercent(part, whole)
  }, [whatPct_part, whatPct_whole])

  const result3 = useMemo(() => {
    const original = parseInput(change_original)
    const newValue = parseInput(change_new)
    if ((change_original || "") === "" || (change_new || "") === "") return null
    return calcPercentChange(original, newValue)
  }, [change_original, change_new])

  const result4 = useMemo(() => {
    const base = parseInput(inc_base)
    const pct = parseInput(inc_pct)
    if ((inc_base || "") === "" || (inc_pct || "") === "") return null
    return calcIncrease(base, pct)
  }, [inc_base, inc_pct])

  const result5 = useMemo(() => {
    const base = parseInput(dec_base)
    const pct = parseInput(dec_pct)
    if ((dec_base || "") === "" || (dec_pct || "") === "") return null
    return calcDecrease(base, pct)
  }, [dec_base, dec_pct])

  const resultMap: Record<TabValue, CalcResult | null> = {
    "percent-of": result1,
    "what-percent": result2,
    "percent-change": result3,
    increase: result4,
    decrease: result5,
  }

  const activeResult = resultMap[activeTab]

  // ── Quick examples per tab ──

  const examples: Record<TabValue, { label: string; action: () => void }[]> = {
    "percent-of": [
      {
        label: "15% of 200",
        action: () => { setPctOf_pct("15"); setPctOf_base("200") },
      },
      {
        label: "8.5% of 1,250",
        action: () => { setPctOf_pct("8.5"); setPctOf_base("1250") },
      },
      {
        label: "25% of 80",
        action: () => { setPctOf_pct("25"); setPctOf_base("80") },
      },
    ],
    "what-percent": [
      {
        label: "30 is what % of 200?",
        action: () => { setWhatPct_part("30"); setWhatPct_whole("200") },
      },
      {
        label: "75 is what % of 300?",
        action: () => { setWhatPct_part("75"); setWhatPct_whole("300") },
      },
      {
        label: "12 is what % of 48?",
        action: () => { setWhatPct_part("12"); setWhatPct_whole("48") },
      },
    ],
    "percent-change": [
      {
        label: "From 80 to 100",
        action: () => { setChange_original("80"); setChange_new("100") },
      },
      {
        label: "From 250 to 200",
        action: () => { setChange_original("250"); setChange_new("200") },
      },
      {
        label: "From 50 to 75",
        action: () => { setChange_original("50"); setChange_new("75") },
      },
    ],
    increase: [
      {
        label: "$80 + 25%",
        action: () => { setInc_base("80"); setInc_pct("25") },
      },
      {
        label: "1,000 + 10%",
        action: () => { setInc_base("1000"); setInc_pct("10") },
      },
      {
        label: "$45 + 15% tip",
        action: () => { setInc_base("45"); setInc_pct("15") },
      },
    ],
    decrease: [
      {
        label: "$120 − 20% off",
        action: () => { setDec_base("120"); setDec_pct("20") },
      },
      {
        label: "$500 − 15% discount",
        action: () => { setDec_base("500"); setDec_pct("15") },
      },
      {
        label: "250 − 30%",
        action: () => { setDec_base("250"); setDec_pct("30") },
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Percent className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Percentage Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Choose a calculation mode below — results update in real time
              </p>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabValue)}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-5 h-auto gap-1 p-1">
              <TabsTrigger value="percent-of" className="text-xs sm:text-sm py-2 px-2">
                <Percent className="size-3.5 sm:mr-1.5 shrink-0" />
                <span className="hidden sm:inline">X% of Y</span>
                <span className="sm:hidden">X% of Y</span>
              </TabsTrigger>
              <TabsTrigger value="what-percent" className="text-xs sm:text-sm py-2 px-2">
                <Calculator className="size-3.5 sm:mr-1.5 shrink-0" />
                <span className="hidden sm:inline">What %?</span>
                <span className="sm:hidden">What %?</span>
              </TabsTrigger>
              <TabsTrigger value="percent-change" className="text-xs sm:text-sm py-2 px-2">
                <TrendingUp className="size-3.5 sm:mr-1.5 shrink-0" />
                <span className="hidden sm:inline">Change</span>
                <span className="sm:hidden">Change</span>
              </TabsTrigger>
              <TabsTrigger value="increase" className="text-xs sm:text-sm py-2 px-2">
                <TrendingUp className="size-3.5 sm:mr-1.5 shrink-0" />
                <span className="hidden sm:inline">Increase</span>
                <span className="sm:hidden">+%</span>
              </TabsTrigger>
              <TabsTrigger value="decrease" className="text-xs sm:text-sm py-2 px-2">
                <TrendingDown className="size-3.5 sm:mr-1.5 shrink-0" />
                <span className="hidden sm:inline">Decrease</span>
                <span className="sm:hidden">−%</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: What is X% of Y? */}
            <TabsContent value="percent-of" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="pct-of-pct"
                  label="Percentage (X)"
                  value={pctOf_pct}
                  onChange={setPctOf_pct}
                  placeholder="e.g. 15"
                  suffix="%"
                />
                <NumberInput
                  id="pct-of-base"
                  label="Number (Y)"
                  value={pctOf_base}
                  onChange={setPctOf_base}
                  placeholder="e.g. 200"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> What is <Badge variant="secondary">15</Badge>% of <Badge variant="secondary">200</Badge>? Answer: <strong>30</strong>
              </p>
              <QuickExamples examples={examples["percent-of"]} />
              {result1 && (
                <ResultDisplay
                  result={result1}
                  icon={<Percent className="size-5 text-primary" />}
                />
              )}
            </TabsContent>

            {/* Tab 2: X is what % of Y? */}
            <TabsContent value="what-percent" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="what-pct-part"
                  label="Value (X)"
                  value={whatPct_part}
                  onChange={setWhatPct_part}
                  placeholder="e.g. 30"
                />
                <NumberInput
                  id="what-pct-whole"
                  label="Total (Y)"
                  value={whatPct_whole}
                  onChange={setWhatPct_whole}
                  placeholder="e.g. 200"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> <Badge variant="secondary">30</Badge> is what % of <Badge variant="secondary">200</Badge>? Answer: <strong>15%</strong>
              </p>
              <QuickExamples examples={examples["what-percent"]} />
              {result2 && (
                <ResultDisplay
                  result={result2}
                  icon={<Calculator className="size-5 text-primary" />}
                />
              )}
            </TabsContent>

            {/* Tab 3: Percentage change */}
            <TabsContent value="percent-change" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="change-original"
                  label="Original Value"
                  value={change_original}
                  onChange={setChange_original}
                  placeholder="e.g. 80"
                />
                <NumberInput
                  id="change-new"
                  label="New Value"
                  value={change_new}
                  onChange={setChange_new}
                  placeholder="e.g. 100"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> Change from <Badge variant="secondary">80</Badge> to <Badge variant="secondary">100</Badge> = <strong>25% increase</strong>
              </p>
              <QuickExamples examples={examples["percent-change"]} />
              {result3 && (
                <ResultDisplay
                  result={result3}
                  icon={
                    result3.value >= 0 ? (
                      <TrendingUp className="size-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="size-5 text-red-500 dark:text-red-400" />
                    )
                  }
                />
              )}
            </TabsContent>

            {/* Tab 4: X increased by Y% */}
            <TabsContent value="increase" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="inc-base"
                  label="Base Value (X)"
                  value={inc_base}
                  onChange={setInc_base}
                  placeholder="e.g. 80"
                />
                <NumberInput
                  id="inc-pct"
                  label="Increase % (Y)"
                  value={inc_pct}
                  onChange={setInc_pct}
                  placeholder="e.g. 25"
                  suffix="%"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> <Badge variant="secondary">80</Badge> increased by <Badge variant="secondary">25</Badge>% = <strong>100</strong>
              </p>
              <QuickExamples examples={examples.increase} />
              {result4 && (
                <ResultDisplay
                  result={result4}
                  icon={<TrendingUp className="size-5 text-emerald-600 dark:text-emerald-400" />}
                />
              )}
            </TabsContent>

            {/* Tab 5: X decreased by Y% */}
            <TabsContent value="decrease" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  id="dec-base"
                  label="Base Value (X)"
                  value={dec_base}
                  onChange={setDec_base}
                  placeholder="e.g. 120"
                />
                <NumberInput
                  id="dec-pct"
                  label="Decrease % (Y)"
                  value={dec_pct}
                  onChange={setDec_pct}
                  placeholder="e.g. 20"
                  suffix="%"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Example:</strong> <Badge variant="secondary">120</Badge> decreased by <Badge variant="secondary">20</Badge>% = <strong>96</strong>
              </p>
              <QuickExamples examples={examples.decrease} />
              {result5 && (
                <ResultDisplay
                  result={result5}
                  icon={<TrendingDown className="size-5 text-red-500 dark:text-red-400" />}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Percent className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All percentage calculations happen locally using JavaScript. Your numbers are never sent
              to any server, stored, or shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─── Quick Examples Component ───────────────────────────────────────────────

function QuickExamples({ examples }: { examples: { label: string; action: () => void }[] }) {
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
