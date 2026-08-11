"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ArrowDownAZ, ArrowUpZA, Copy, RotateCcw, ArrowLeftRight, Shuffle, ListOrdered, Shield } from "lucide-react"

// --- Types ---

type SortMethod = "asc" | "desc" | "num-asc" | "num-desc" | "random"

interface SortOption {
  id: SortMethod
  label: string
  icon: React.ReactNode
}

const SORT_OPTIONS: SortOption[] = [
  { id: "asc", label: "A→Z", icon: <ArrowDownAZ className="size-4" /> },
  { id: "desc", label: "Z→A", icon: <ArrowUpZA className="size-4" /> },
  { id: "num-asc", label: "0→9", icon: <ListOrdered className="size-4" /> },
  { id: "num-desc", label: "9→0", icon: <ListOrdered className="size-4 rotate-180" /> },
  { id: "random", label: "Random", icon: <Shuffle className="size-4" /> },
]

// --- Fisher-Yates Shuffle ---

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// --- Component ---

export function TextSorterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [sortMethod, setSortMethod] = useState<SortMethod>("asc")

  // Options
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [trimLines, setTrimLines] = useState(false)
  const [removeDuplicates, setRemoveDuplicates] = useState(false)
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false)
  const [autoSort, setAutoSort] = useState(false)

  // Stats
  const [totalLines, setTotalLines] = useState(0)
  const [uniqueLines, setUniqueLines] = useState(0)
  const [emptyRemoved, setEmptyRemoved] = useState(0)

  // Auto-sort debounce ref
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // --- Core Logic ---

  const processText = useCallback((
    text: string,
    method: SortMethod,
    isCaseSensitive: boolean,
    doTrim: boolean,
    doRemoveDups: boolean,
    doRemoveEmpty: boolean
  ): { result: string; total: number; unique: number; emptyCount: number } => {
    const raw = (text || "")
    if (raw.length === 0) return { result: "", total: 0, unique: 0, emptyCount: 0 }

    let lines = raw.split("\n")
    const total = lines.length
    let emptyCount = 0

    // Process lines: trim and remove empty
    const processedLines: string[] = []
    for (const line of lines) {
      const trimmed = doTrim ? (line || "").trim() : line

      if (doRemoveEmpty && (trimmed || "").trim().length === 0) {
        emptyCount++
        continue
      }

      processedLines.push(trimmed)
    }

    // Remove duplicates if enabled
    let workingLines = processedLines
    if (doRemoveDups) {
      const seen = new Set<string>()
      const unique: string[] = []
      for (const line of workingLines) {
        const key = isCaseSensitive ? line : (line || "").toLowerCase()
        if (!seen.has(key)) {
          seen.add(key)
          unique.push(line)
        }
      }
      workingLines = unique
    }

    // Sort
    let sortedLines: string[]
    switch (method) {
      case "asc":
        sortedLines = [...workingLines].sort((a, b) => {
          const cmpA = isCaseSensitive ? (a || "") : (a || "").toLowerCase()
          const cmpB = isCaseSensitive ? (b || "") : (b || "").toLowerCase()
          if (cmpA < cmpB) return -1
          if (cmpA > cmpB) return 1
          return 0
        })
        break

      case "desc":
        sortedLines = [...workingLines].sort((a, b) => {
          const cmpA = isCaseSensitive ? (a || "") : (a || "").toLowerCase()
          const cmpB = isCaseSensitive ? (b || "") : (b || "").toLowerCase()
          if (cmpA < cmpB) return 1
          if (cmpA > cmpB) return -1
          return 0
        })
        break

      case "num-asc":
        sortedLines = [...workingLines].sort((a, b) => {
          const numA = parseFloat((a || "").replace(/^\s*/, "")) || 0
          const numB = parseFloat((b || "").replace(/^\s*/, "")) || 0
          return numA - numB
        })
        break

      case "num-desc":
        sortedLines = [...workingLines].sort((a, b) => {
          const numA = parseFloat((a || "").replace(/^\s*/, "")) || 0
          const numB = parseFloat((b || "").replace(/^\s*/, "")) || 0
          return numB - numA
        })
        break

      case "random":
        sortedLines = shuffleArray(workingLines)
        break

      default:
        sortedLines = [...workingLines]
    }

    return {
      result: sortedLines.join("\n"),
      total,
      unique: sortedLines.length,
      emptyCount,
    }
  }, [])

  const handleSort = useCallback(() => {
    const { result, total, unique, emptyCount } = processText(
      input, sortMethod, caseSensitive, trimLines, removeDuplicates, removeEmptyLines
    )
    setOutput(result)
    setTotalLines(total)
    setUniqueLines(unique)
    setEmptyRemoved(emptyCount)
  }, [input, sortMethod, caseSensitive, trimLines, removeDuplicates, removeEmptyLines, processText])

  // Auto-sort effect
  useEffect(() => {
    if (!autoSort) return

    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current)
    }

    autoTimerRef.current = setTimeout(() => {
      handleSort()
    }, 150)

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current)
      }
    }
  }, [input, autoSort, sortMethod, caseSensitive, trimLines, removeDuplicates, removeEmptyLines, handleSort])

  // --- Handlers ---

  const handleCopy = useCallback(async () => {
    if ((output || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
    setTotalLines(0)
    setUniqueLines(0)
    setEmptyRemoved(0)
  }, [])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput("")
    setTotalLines(0)
    setUniqueLines(0)
    setEmptyRemoved(0)
  }, [output])

  // --- Compute input line count live ---
  const liveInputLines = (input || "").length === 0 ? 0 : (input || "").split("\n").length

  // --- Render ---

  return (
    <div className="space-y-6">
      {/* Sort Method Buttons */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold">Sort Method</Label>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => (
              <Button
                key={opt.id}
                variant={sortMethod === opt.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSortMethod(opt.id)}
                className="gap-1.5"
              >
                {opt.icon}
                {opt.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Side-by-side layout: Input (left) + Options/Output (right) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Input Textarea */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sort-input" className="text-base font-semibold flex items-center gap-2">
                <ListOrdered className="size-4" />
                Input Text
              </Label>
              <Badge variant="secondary" className="tabular-nums">
                {liveInputLines} line{liveInputLines !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Textarea
              id="sort-input"
              placeholder="Paste or type your text here — one item per line..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[280px] sm:min-h-[340px] resize-y text-base leading-relaxed"
            />
          </CardContent>
        </Card>

        {/* Right: Options + Output */}
        <div className="space-y-6">
          {/* Options Panel */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Label className="text-base font-semibold">Options</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <Label htmlFor="case-sensitive" className="text-sm cursor-pointer whitespace-nowrap">
                    Case Sensitive
                  </Label>
                  <Switch id="case-sensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <Label htmlFor="trim-lines" className="text-sm cursor-pointer whitespace-nowrap">
                    Trim Lines
                  </Label>
                  <Switch id="trim-lines" checked={trimLines} onCheckedChange={setTrimLines} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <Label htmlFor="remove-duplicates" className="text-sm cursor-pointer whitespace-nowrap">
                    Remove Duplicates
                  </Label>
                  <Switch id="remove-duplicates" checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <Label htmlFor="remove-empty" className="text-sm cursor-pointer whitespace-nowrap">
                    Remove Empty Lines
                  </Label>
                  <Switch id="remove-empty" checked={removeEmptyLines} onCheckedChange={setRemoveEmptyLines} />
                </div>
              </div>

              {/* Auto-sort toggle */}
              <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
                <Label htmlFor="auto-sort" className="text-sm cursor-pointer font-medium">
                  Auto-sort (real-time)
                </Label>
                <Switch id="auto-sort" checked={autoSort} onCheckedChange={setAutoSort} />
              </div>

              {/* Sort Button */}
              <Button
                onClick={handleSort}
                disabled={(input || "").trim().length === 0}
                className="w-full"
                size="lg"
              >
                <ArrowDownAZ className="size-4 mr-2" />
                Sort
              </Button>
            </CardContent>
          </Card>

          {/* Output Textarea */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sort-output" className="text-base font-semibold flex items-center gap-2">
                  <ListOrdered className="size-4" />
                  Output
                </Label>
                <Badge variant="secondary" className="tabular-nums">
                  {uniqueLines} line{uniqueLines !== 1 ? "s" : ""}
                </Badge>
              </div>
              <Textarea
                id="sort-output"
                value={output}
                readOnly
                placeholder="Sorted lines will appear here..."
                className="min-h-[180px] sm:min-h-[220px] resize-y text-base leading-relaxed bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      {totalLines > 0 && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Total: {totalLines} line{totalLines !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Unique: {uniqueLines} line{uniqueLines !== 1 ? "s" : ""}
          </Badge>
          {emptyRemoved > 0 && (
            <Badge variant="outline" className="text-sm px-3 py-1 text-amber-600 dark:text-amber-400">
              {emptyRemoved} empty line{emptyRemoved !== 1 ? "s" : ""} removed
            </Badge>
          )}
          {removeDuplicates && totalLines > uniqueLines + emptyRemoved && (
            <Badge variant="outline" className="text-sm px-3 py-1 text-emerald-600 dark:text-emerald-400">
              {totalLines - uniqueLines - emptyRemoved} duplicate{totalLines - uniqueLines - emptyRemoved !== 1 ? "s" : ""} removed
            </Badge>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} disabled={(output || "").trim().length === 0}>
          <Copy className="size-4 mr-1.5" />
          {copied ? "Copied!" : "Copy Output"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <RotateCcw className="size-4 mr-1.5" />
          Clear
        </Button>
        <Button variant="outline" size="sm" onClick={handleSwap} disabled={(output || "").trim().length === 0}>
          <ArrowLeftRight className="size-4 mr-1.5" />
          Swap
        </Button>
      </div>

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Text Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All sorting operations are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}