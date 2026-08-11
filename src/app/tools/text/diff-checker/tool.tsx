"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { GitCompareArrows, Copy, RotateCcw, ArrowLeftRight, Plus, Minus, Equal, Shield } from "lucide-react"

// --- Types ---

type DiffLineType = "added" | "removed" | "unchanged"

interface DiffLine {
  type: DiffLineType
  content: string
}

interface DiffStats {
  added: number
  removed: number
  unchanged: number
  totalChanges: number
}

// --- LCS-based Diff Algorithm ---

function computeLCS(a: string[], b: string[]): number[][] {
  const m = a.length
  const n = b.length
  // Build DP table for LCS
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp
}

function backtrackDiff(dp: number[][], a: string[], b: string[]): DiffLine[] {
  const result: DiffLine[] = []
  let i = a.length
  let j = b.length

  // Backtrack from bottom-right to build diff in reverse
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.push({ type: "unchanged", content: a[i - 1] })
      i--
      j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: "added", content: b[j - 1] })
      j--
    } else {
      result.push({ type: "removed", content: a[i - 1] })
      i--
    }
  }

  return result.reverse()
}

function computeDiff(originalText: string, modifiedText: string, ignoreWhitespace: boolean, ignoreCase: boolean): { lines: DiffLine[]; stats: DiffStats } {
  let processLine = (line: string): string => line

  if (ignoreWhitespace && ignoreCase) {
    processLine = (line) => (line || "").trim().toLowerCase()
  } else if (ignoreWhitespace) {
    processLine = (line) => (line || "").trim()
  } else if (ignoreCase) {
    processLine = (line) => (line || "").toLowerCase()
  }

  const originalLines = (originalText || "").split("\n")
  const modifiedLines = (modifiedText || "").split("\n")

  const processedA = originalLines.map(processLine)
  const processedB = modifiedLines.map(processLine)

  const dp = computeLCS(processedA, processedB)
  const diffLines = backtrackDiff(dp, originalLines, modifiedLines)

  let added = 0
  let removed = 0
  let unchanged = 0

  for (const line of diffLines) {
    if (line.type === "added") added++
    else if (line.type === "removed") removed++
    else unchanged++
  }

  return {
    lines: diffLines,
    stats: { added, removed, unchanged, totalChanges: added + removed },
  }
}

// --- Component ---

export function DiffCheckerTool() {
  const [originalText, setOriginalText] = useState("")
  const [modifiedText, setModifiedText] = useState("")
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [diffResult, setDiffResult] = useState<{ lines: DiffLine[]; stats: DiffStats } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCompare = useCallback(() => {
    const result = computeDiff(originalText, modifiedText, ignoreWhitespace, ignoreCase)
    setDiffResult(result)
  }, [originalText, modifiedText, ignoreWhitespace, ignoreCase])

  const handleSwap = useCallback(() => {
    setOriginalText(modifiedText)
    setModifiedText(originalText)
    setDiffResult(null)
  }, [originalText, modifiedText])

  const handleClear = useCallback(() => {
    setOriginalText("")
    setModifiedText("")
    setDiffResult(null)
    setCopied(false)
  }, [])

  const handleCopy = useCallback(async () => {
    if (!diffResult || diffResult.lines.length === 0) return
    const text = diffResult.lines
      .map((line) => {
        const prefix = line.type === "added" ? "+" : line.type === "removed" ? "-" : " "
        return `${prefix} ${line.content}`
      })
      .join("\n")
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [diffResult])

  const hasDiff = useMemo(() => diffResult !== null, [diffResult])

  return (
    <div className="space-y-6">
      {/* Input Textareas — Side by side on desktop, stacked on mobile */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Original Text */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="diff-original" className="text-base font-semibold flex items-center gap-2">
                <Minus className="size-4" />
                Original Text
              </Label>
              <Badge variant="secondary" className="tabular-nums">
                {(originalText || "").split("\n").length} lines
              </Badge>
            </div>
            <Textarea
              id="diff-original"
              placeholder="Paste your original text here..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-[200px] sm:min-h-[280px] resize-y text-sm font-mono leading-relaxed"
            />
          </CardContent>
        </Card>

        {/* Modified Text */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="diff-modified" className="text-base font-semibold flex items-center gap-2">
                <Plus className="size-4" />
                Modified Text
              </Label>
              <Badge variant="secondary" className="tabular-nums">
                {(modifiedText || "").split("\n").length} lines
              </Badge>
            </div>
            <Textarea
              id="diff-modified"
              placeholder="Paste your modified text here..."
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              className="min-h-[200px] sm:min-h-[280px] resize-y text-sm font-mono leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>

      {/* Options + Actions */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Options */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Switch id="ignore-whitespace" checked={ignoreWhitespace} onCheckedChange={setIgnoreWhitespace} />
              <Label htmlFor="ignore-whitespace" className="text-sm cursor-pointer">Ignore Whitespace</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="ignore-case" checked={ignoreCase} onCheckedChange={setIgnoreCase} />
              <Label htmlFor="ignore-case" className="text-sm cursor-pointer">Ignore Case</Label>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCompare} disabled={(originalText || "").trim().length === 0 && (modifiedText || "").trim().length === 0}>
              <GitCompareArrows className="size-4 mr-1.5" />
              Compare
            </Button>
            <Button variant="outline" onClick={handleSwap}>
              <ArrowLeftRight className="size-4 mr-1.5" />
              Swap
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <RotateCcw className="size-4 mr-1.5" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      {hasDiff && diffResult && (
        <div className="flex flex-wrap gap-3">
          <Badge className="text-sm px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Plus className="size-3.5 mr-1.5" />
            {diffResult.stats.added} line{diffResult.stats.added !== 1 ? "s" : ""} added
          </Badge>
          <Badge className="text-sm px-3 py-1 bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800">
            <Minus className="size-3.5 mr-1.5" />
            {diffResult.stats.removed} line{diffResult.stats.removed !== 1 ? "s" : ""} removed
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Equal className="size-3.5 mr-1.5" />
            {diffResult.stats.unchanged} unchanged
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {diffResult.stats.totalChanges} total change{diffResult.stats.totalChanges !== 1 ? "s" : ""}
          </Badge>
        </div>
      )}

      {/* Diff Result */}
      {hasDiff && diffResult && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <GitCompareArrows className="size-4" />
                Diff Result
              </Label>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Copy className="size-3.5 mr-1.5" /> : <Copy className="size-3.5 mr-1.5" />}
                {copied ? "Copied!" : "Copy Diff"}
              </Button>
            </div>

            {/* Empty state */}
            {diffResult.lines.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <GitCompareArrows className="size-10 mx-auto mb-3 opacity-40" />
                <p>Enter text in both fields and click <strong>Compare</strong> to see the diff.</p>
              </div>
            ) : diffResult.stats.totalChanges === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Equal className="size-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No differences found</p>
                <p className="text-sm mt-1">Both texts are identical{(ignoreWhitespace || ignoreCase) ? " (with current options applied)" : ""}.</p>
              </div>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
                  <div className="font-mono text-sm leading-relaxed">
                    {diffResult.lines.map((line, idx) => {
                      const prefix = line.type === "added" ? "+" : line.type === "removed" ? "-" : " "
                      const bgClass =
                        line.type === "added"
                          ? "bg-emerald-50 dark:bg-emerald-950/60"
                          : line.type === "removed"
                            ? "bg-red-50 dark:bg-red-950/60"
                            : ""
                      const textClass =
                        line.type === "added"
                          ? "text-emerald-800 dark:text-emerald-300"
                          : line.type === "removed"
                            ? "text-red-800 dark:text-red-300"
                            : "text-foreground"
                      const prefixClass =
                        line.type === "added"
                          ? "text-emerald-600 dark:text-emerald-400 select-none"
                          : line.type === "removed"
                            ? "text-red-600 dark:text-red-400 select-none"
                            : "text-muted-foreground select-none"

                      return (
                        <div
                          key={idx}
                          className={`flex ${bgClass} border-b border-border/50 last:border-b-0`}
                        >
                          <span className={`shrink-0 w-10 text-right pr-3 pl-3 text-xs text-muted-foreground tabular-nums select-none bg-muted/40 border-r border-border/50 leading-6`}
                            aria-hidden="true"
                          >
                            {idx + 1}
                          </span>
                          <span className={`shrink-0 w-6 text-center text-xs font-bold ${prefixClass} leading-6`}>
                            {prefix}
                          </span>
                          <pre className={`flex-1 px-3 whitespace-pre-wrap break-all leading-6 ${textClass}`}>
                            {line.content}
                          </pre>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
              All diff comparisons are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
