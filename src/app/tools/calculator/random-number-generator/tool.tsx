"use client"

import { useState, useCallback } from "react"
import { Dice5, Shuffle, Copy, Check, History, Dices } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// ─── Types ──────────────────────────────────────────────────────────────────

interface GenerationResult {
  id: string
  min: number
  max: number
  count: number
  integerOnly: boolean
  uniqueOnly: boolean
  sorted: boolean
  numbers: number[]
  timestamp: Date
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatNumber(num: number, integerOnly: boolean): string {
  if (integerOnly) {
    return Math.round(num).toLocaleString("en-US")
  }
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  })
}

function generateCryptoRandom(): number {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] / 4294967296
}

function generateNumbers(
  min: number,
  max: number,
  count: number,
  integerOnly: boolean,
  uniqueOnly: boolean
): number[] {
  const results: number[] = []
  const range = max - min

  if (uniqueOnly) {
    if (integerOnly) {
      const totalIntegers = Math.floor(range) + 1
      if (count > totalIntegers) {
        throw new Error(
          `Cannot generate ${count} unique integers in range [${min}, ${max}]. Max unique integers: ${totalIntegers}.`
        )
      }
      const used = new Set<number>()
      while (results.length < count) {
        const raw = generateCryptoRandom()
        const num = Math.floor(raw * (totalIntegers)) + min
        if (!used.has(num)) {
          used.add(num)
          results.push(num)
        }
      }
    } else {
      const seen = new Set<string>()
      let attempts = 0
      const maxAttempts = count * 1000
      while (results.length < count && attempts < maxAttempts) {
        const raw = generateCryptoRandom()
        const num = raw * range + min
        const key = num.toFixed(10)
        if (!seen.has(key)) {
          seen.add(key)
          results.push(num)
        }
        attempts++
      }
      if (results.length < count) {
        throw new Error(
          `Could not generate ${count} unique decimals in range [${min}, ${max}]. Try a larger range or fewer numbers.`
        )
      }
    }
  } else {
    for (let i = 0; i < count; i++) {
      const raw = generateCryptoRandom()
      if (integerOnly) {
        const totalIntegers = Math.floor(range) + 1
        const num = Math.floor(raw * totalIntegers) + min
        results.push(num)
      } else {
        const num = raw * range + min
        results.push(num)
      }
    }
  }

  return results
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function RandomNumberGeneratorTool() {
  const [minVal, setMinVal] = useState("1")
  const [maxVal, setMaxVal] = useState("100")
  const [count, setCount] = useState("1")
  const [integerOnly, setIntegerOnly] = useState(true)
  const [uniqueOnly, setUniqueOnly] = useState(false)
  const [sorted, setSorted] = useState(false)

  const [results, setResults] = useState<number[]>([])
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<GenerationResult[]>([])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = useCallback(() => {
    setError("")
    setResults([])
    setCopied(false)

    const min = parseFloat((minVal || "").replace(/,/g, ""))
    const max = parseFloat((maxVal || "").replace(/,/g, ""))
    const numCount = parseInt((count || "").replace(/,/g, ""), 10)

    if (isNaN(min) || isNaN(max) || isNaN(numCount)) {
      setError("Please enter valid numbers for all fields.")
      return
    }

    if (min >= max) {
      setError("Minimum value must be less than maximum value.")
      return
    }

    if (numCount < 1 || numCount > 100) {
      setError("Number of results must be between 1 and 100.")
      return
    }

    try {
      setIsGenerating(true)
      let generated = generateNumbers(min, max, numCount, integerOnly, uniqueOnly)

      if (sorted) {
        generated = [...generated].sort((a, b) => a - b)
      }

      setResults(generated)

      const newEntry: GenerationResult = {
        id: crypto.randomUUID(),
        min,
        max,
        count: numCount,
        integerOnly,
        uniqueOnly,
        sorted,
        numbers: generated,
        timestamp: new Date(),
      }

      setHistory((prev) => [newEntry, ...prev].slice(0, 5))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred."
      setError(message)
    } finally {
      setIsGenerating(false)
    }
  }, [minVal, maxVal, count, integerOnly, uniqueOnly, sorted])

  const handleCopyAll = useCallback(async () => {
    const text = results.map((n) => formatNumber(n, integerOnly)).join(", ")
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Failed to copy to clipboard.")
    }
  }, [results, integerOnly])

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Dice5 className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Random Number Generator</h3>
              <p className="text-sm text-muted-foreground">
                Cryptographically secure random numbers, generated in your browser
              </p>
            </div>
          </div>

          {/* Range Inputs */}
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="space-y-2">
              <Label htmlFor="rng-min" className="text-sm font-medium">
                Minimum Value
              </Label>
              <Input
                id="rng-min"
                type="text"
                inputMode="decimal"
                value={minVal}
                onChange={(e) => setMinVal(e.target.value)}
                placeholder="e.g. 1"
                className="font-mono text-base"
                aria-label="Minimum value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rng-max" className="text-sm font-medium">
                Maximum Value
              </Label>
              <Input
                id="rng-max"
                type="text"
                inputMode="decimal"
                value={maxVal}
                onChange={(e) => setMaxVal(e.target.value)}
                placeholder="e.g. 100"
                className="font-mono text-base"
                aria-label="Maximum value"
              />
            </div>
          </div>

          {/* Count Input */}
          <div className="max-w-xs mb-6">
            <div className="space-y-2">
              <Label htmlFor="rng-count" className="text-sm font-medium">
                Number of Results (1–100)
              </Label>
              <Input
                id="rng-count"
                type="text"
                inputMode="numeric"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="e.g. 5"
                className="font-mono text-base"
                aria-label="Number of results to generate"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label
                htmlFor="rng-integer"
                className="text-sm font-medium cursor-pointer"
              >
                Integer Only
              </Label>
              <Switch
                id="rng-integer"
                checked={integerOnly}
                onCheckedChange={setIntegerOnly}
                aria-label="Toggle integer only mode"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label
                htmlFor="rng-unique"
                className="text-sm font-medium cursor-pointer"
              >
                Unique Only
              </Label>
              <Switch
                id="rng-unique"
                checked={uniqueOnly}
                onCheckedChange={setUniqueOnly}
                aria-label="Toggle unique only mode"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label
                htmlFor="rng-sorted"
                className="text-sm font-medium cursor-pointer"
              >
                Sort Ascending
              </Label>
              <Switch
                id="rng-sorted"
                checked={sorted}
                onCheckedChange={setSorted}
                aria-label="Toggle sort ascending"
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto text-base gap-2"
            onClick={handleGenerate}
            disabled={isGenerating}
            aria-label="Generate random numbers"
          >
            <Dices className="size-5" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <>
              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shuffle className="size-4 text-primary" />
                    <h4 className="font-semibold">Results</h4>
                    <Badge variant="secondary" className="text-xs">
                      {results.length} {results.length === 1 ? "number" : "numbers"}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={handleCopyAll}
                    aria-label="Copy all results"
                  >
                    {copied ? (
                      <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {copied ? "Copied!" : "Copy All"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {results.map((num, idx) => (
                    <div
                      key={idx}
                      className="group relative flex items-center justify-center rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-3 sm:px-6 sm:py-4 min-w-[3.5rem] sm:min-w-[5rem] transition-all hover:border-primary/40 hover:bg-primary/10 hover:shadow-sm"
                    >
                      <span className="text-lg sm:text-2xl font-bold tabular-nums text-primary">
                        {formatNumber(num, integerOnly)}
                      </span>
                      {results.length > 1 && (
                        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-muted border border-border text-[10px] font-medium text-muted-foreground">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* History */}
      <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
        <Card>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-muted/30 transition-colors rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
                  <History className="size-4 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-sm">Generation History</h4>
                  <p className="text-xs text-muted-foreground">
                    {history.length > 0
                      ? `Last ${history.length} generation${history.length > 1 ? "s" : ""}`
                      : "No generations yet"}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {history.length}/5
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {history.length === 0 ? (
              <div className="px-6 pb-6">
                <p className="text-sm text-muted-foreground text-center py-4">
                  Generate some numbers to see your history here.
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto border-t border-border">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="border-b border-border last:border-b-0 p-4 sm:px-6"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        [{entry.min} – {entry.max}]
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {entry.count} {entry.count === 1 ? "num" : "nums"}
                      </Badge>
                      {entry.integerOnly && (
                        <Badge variant="outline" className="text-xs">
                          Integers
                        </Badge>
                      )}
                      {entry.uniqueOnly && (
                        <Badge variant="outline" className="text-xs">
                          Unique
                        </Badge>
                      )}
                      {entry.sorted && (
                        <Badge variant="outline" className="text-xs">
                          Sorted
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.numbers.map((num, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-1 text-sm font-mono font-medium"
                        >
                          {formatNumber(num, entry.integerOnly)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Dice5 className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Cryptographic Randomness</p>
            <p className="text-sm text-muted-foreground">
              All random numbers are generated locally using the Web Crypto API.
              Nothing is sent to any server. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
