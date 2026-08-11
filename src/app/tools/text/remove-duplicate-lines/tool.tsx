"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ListFilter, Copy, RotateCcw, ArrowLeftRight, Trash2, ArrowDownAZ, Shield } from "lucide-react"

// --- Component ---

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  // Options
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [trimWhitespace, setTrimWhitespace] = useState(false)
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false)
  const [sortResults, setSortResults] = useState(false)
  const [autoProcess, setAutoProcess] = useState(false)

  // Stats
  const [inputLineCount, setInputLineCount] = useState(0)
  const [outputLineCount, setOutputLineCount] = useState(0)
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(0)

  // Auto-process debounce ref
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // --- Core Logic ---

  const processText = useCallback((
    text: string,
    isCaseSensitive: boolean,
    doTrim: boolean,
    doRemoveEmpty: boolean,
    doSort: boolean
  ): string => {
    const raw = (text || "")
    if (raw.length === 0) return ""

    const lines = raw.split("\n")
    const seen = new Set<string>()
    const uniqueLines: string[] = []

    for (const rawLine of lines) {
      let line = rawLine

      // Trim whitespace before comparison if enabled
      if (doTrim) {
        line = (line || "").trim()
      }

      // Remove empty lines if enabled
      if (doRemoveEmpty && (line || "").trim().length === 0) {
        continue
      }

      // Determine the comparison key
      const key = isCaseSensitive ? line : (line || "").toLowerCase()

      if (!(seen.has(key))) {
        seen.add(key)
        uniqueLines.push(doTrim ? line : rawLine)
      }
    }

    // Sort if enabled
    if (doSort) {
      uniqueLines.sort((a, b) => {
        const cmpA = isCaseSensitive ? (a || "") : (a || "").toLowerCase()
        const cmpB = isCaseSensitive ? (b || "") : (b || "").toLowerCase()
        if (cmpA < cmpB) return -1
        if (cmpA > cmpB) return 1
        return 0
      })
    }

    return uniqueLines.join("\n")
  }, [])

  const handleProcess = useCallback(() => {
    const raw = (input || "")
    const lines = raw.length === 0 ? [] : raw.split("\n")
    setInputLineCount(lines.length)

    const result = processText(input, caseSensitive, trimWhitespace, removeEmptyLines, sortResults)
    setOutput(result)

    const resultLines = result.length === 0 ? [] : result.split("\n")
    setOutputLineCount(resultLines.length)
    setDuplicatesRemoved(Math.max(0, lines.length - resultLines.length))
  }, [input, caseSensitive, trimWhitespace, removeEmptyLines, sortResults, processText])

  // Auto-process effect
  useEffect(() => {
    if (!autoProcess) return

    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current)
    }

    autoTimerRef.current = setTimeout(() => {
      handleProcess()
    }, 150)

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current)
      }
    }
  }, [input, autoProcess, caseSensitive, trimWhitespace, removeEmptyLines, sortResults, handleProcess])

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
    setInputLineCount(0)
    setOutputLineCount(0)
    setDuplicatesRemoved(0)
  }, [])

  const handleSwap = useCallback(() => {
    setInput(output)
    setOutput("")
    setInputLineCount(outputLineCount)
    setOutputLineCount(0)
    setDuplicatesRemoved(0)
  }, [output, outputLineCount])

  // --- Compute input line count live ---
  const liveInputLines = (input || "").length === 0 ? 0 : (input || "").split("\n").length

  // --- Render ---

  return (
    <div className="space-y-6">
      {/* Side-by-side layout: Input (left) + Options/Output (right) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Input Textarea */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dup-input" className="text-base font-semibold flex items-center gap-2">
                <ListFilter className="size-4" />
                Input Text
              </Label>
              <Badge variant="secondary" className="tabular-nums">
                {liveInputLines} line{liveInputLines !== 1 ? "s" : ""}
              </Badge>
            </div>
            <Textarea
              id="dup-input"
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
                  <Label htmlFor="trim-ws" className="text-sm cursor-pointer whitespace-nowrap">
                    Trim Whitespace
                  </Label>
                  <Switch id="trim-ws" checked={trimWhitespace} onCheckedChange={setTrimWhitespace} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <Label htmlFor="remove-empty" className="text-sm cursor-pointer whitespace-nowrap">
                    Remove Empty Lines
                  </Label>
                  <Switch id="remove-empty" checked={removeEmptyLines} onCheckedChange={setRemoveEmptyLines} />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <Label htmlFor="sort-results" className="text-sm cursor-pointer whitespace-nowrap">
                    Sort Results
                  </Label>
                  <Switch id="sort-results" checked={sortResults} onCheckedChange={setSortResults} />
                </div>
              </div>

              {/* Auto-process toggle */}
              <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
                <Label htmlFor="auto-process" className="text-sm cursor-pointer font-medium">
                  Auto-process (real-time)
                </Label>
                <Switch id="auto-process" checked={autoProcess} onCheckedChange={setAutoProcess} />
              </div>

              {/* Process Button */}
              <Button
                onClick={handleProcess}
                disabled={(input || "").trim().length === 0}
                className="w-full"
                size="lg"
              >
                <ListFilter className="size-4 mr-2" />
                Remove Duplicates
              </Button>
            </CardContent>
          </Card>

          {/* Output Textarea */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dup-output" className="text-base font-semibold flex items-center gap-2">
                  <ListFilter className="size-4" />
                  Output
                </Label>
                <Badge variant="secondary" className="tabular-nums">
                  {outputLineCount} line{outputLineCount !== 1 ? "s" : ""}
                </Badge>
              </div>
              <Textarea
                id="dup-output"
                value={output}
                readOnly
                placeholder="Unique lines will appear here..."
                className="min-h-[180px] sm:min-h-[220px] resize-y text-base leading-relaxed bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      {inputLineCount > 0 && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Input: {inputLineCount} line{inputLineCount !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Unique: {outputLineCount} line{outputLineCount !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1 text-emerald-600 dark:text-emerald-400">
            {duplicatesRemoved} duplicate{duplicatesRemoved !== 1 ? "s" : ""} removed
          </Badge>
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
          Clear All
        </Button>
        <Button variant="outline" size="sm" onClick={handleSwap} disabled={(output || "").trim().length === 0}>
          <ArrowLeftRight className="size-4 mr-1.5" />
          Swap
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSortResults((prev) => !prev)
            setTimeout(handleProcess, 0)
          }}
          disabled={(output || "").trim().length === 0}
        >
          <ArrowDownAZ className="size-4 mr-1.5" />
          Toggle Sort
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="size-4 mr-1.5" />
          Reset
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
              All duplicate removal operations are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
