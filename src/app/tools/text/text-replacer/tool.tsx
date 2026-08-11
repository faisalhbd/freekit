"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Replace, Copy, RotateCcw, Plus, Trash2, Undo2, AlertCircle, Shield, Search } from "lucide-react"

// --- Types ---

interface BatchRow {
  id: number
  find: string
  replace: string
  caseSensitive: boolean
}

interface HistoryEntry {
  text: string
  matchCount: number
  replacementCount: number
}

// --- Component ---

export function TextReplacerTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  // Single replacement mode
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [wholeWord, setWholeWord] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [regexError, setRegexError] = useState("")

  // Batch mode
  const [batchMode, setBatchMode] = useState(false)
  const [batchRows, setBatchRows] = useState<BatchRow[]>([
    { id: 1, find: "", replace: "", caseSensitive: true },
  ])
  const [nextId, setNextId] = useState(2)

  // Stats
  const [totalMatches, setTotalMatches] = useState(0)
  const [replacementsMade, setReplacementsMade] = useState(0)

  // History for undo
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // --- Helpers ---

  const buildPattern = useCallback((
    pattern: string,
    isCaseSensitive: boolean,
    isWholeWord: boolean,
    isRegex: boolean
  ): RegExp | null => {
    try {
      let regexStr = pattern
      if (!isRegex) {
        regexStr = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      }
      if (isWholeWord) {
        regexStr = `\\b(?:${regexStr})\\b`
      }
      const flags = isCaseSensitive ? "g" : "gi"
      return new RegExp(regexStr, flags)
    } catch {
      return null
    }
  }, [])

  const countMatches = useCallback((text: string, pattern: string, isCaseSensitive: boolean, isWholeWord: boolean, isRegex: boolean): number => {
    const regex = buildPattern(pattern, isCaseSensitive, isWholeWord, isRegex)
    if (!regex || (text || "").length === 0 || (pattern || "").trim().length === 0) return 0
    const matches = (text || "").match(regex)
    return matches ? matches.length : 0
  }, [buildPattern])

  const doReplace = useCallback((
    text: string,
    pattern: string,
    replacement: string,
    isCaseSensitive: boolean,
    isWholeWord: boolean,
    isRegex: boolean
  ): { result: string; count: number } => {
    if ((pattern || "").trim().length === 0) return { result: text, count: 0 }
    const regex = buildPattern(pattern, isCaseSensitive, isWholeWord, isRegex)
    if (!regex) return { result: text, count: 0 }

    let count = 0
    const result = (text || "").replace(regex, (...args) => {
      count++
      // Handle backreferences ($1, $2, etc.) in replacement string
      if (isRegex) {
        return replacement
          .replace(/\\(\d+)/g, (_, num) => {
            const idx = parseInt(num || "0", 10)
            return args[idx] !== undefined ? args[idx] : ""
          })
          .replace(/\$\$/g, "$")
      }
      return replacement
    })
    return { result, count }
  }, [buildPattern])

  // --- Validate regex ---

  const validateRegex = useCallback((pattern: string) => {
    if (!useRegex || (pattern || "").trim().length === 0) {
      setRegexError("")
      return true
    }
    try {
      new RegExp(pattern)
      setRegexError("")
      return true
    } catch (e) {
      setRegexError((e as Error).message)
      return false
    }
  }, [useRegex])

  // --- Single Mode Handlers ---

  const handleReplaceAll = useCallback(() => {
    if ((findText || "").trim().length === 0) return
    if (!validateRegex(findText)) return

    const source = batchMode && output ? output : input
    if ((source || "").length === 0) return

    const matches = countMatches(source, findText, caseSensitive, wholeWord, useRegex)
    const { result, count } = doReplace(source, findText, replaceText, caseSensitive, wholeWord, useRegex)

    setHistory((prev) => [...prev, { text: output || "", matchCount: totalMatches, replacementCount: replacementsMade }])
    setOutput(result)
    setTotalMatches(matches)
    setReplacementsMade(count)
  }, [findText, replaceText, caseSensitive, wholeWord, useRegex, input, output, batchMode, validateRegex, countMatches, doReplace, totalMatches, replacementsMade])

  const handleReplaceFirst = useCallback(() => {
    if ((findText || "").trim().length === 0) return
    if (!validateRegex(findText)) return

    const source = batchMode && output ? output : input
    if ((source || "").length === 0) return

    try {
      let regexStr = findText
      if (!useRegex) {
        regexStr = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      }
      if (wholeWord) {
        regexStr = `\\b(?:${regexStr})\\b`
      }
      const flags = caseSensitive ? "" : "i"
      const regex = new RegExp(regexStr, flags)

      const matches = countMatches(source, findText, caseSensitive, wholeWord, useRegex)
      const result = (source || "").replace(regex, replaceText)

      setHistory((prev) => [...prev, { text: output || "", matchCount: totalMatches, replacementCount: replacementsMade }])
      setOutput(result)
      setTotalMatches(matches)
      setReplacementsMade(matches > 0 ? 1 : 0)
    } catch {
      // invalid regex
    }
  }, [findText, replaceText, caseSensitive, wholeWord, useRegex, input, output, batchMode, validateRegex, countMatches, totalMatches, replacementsMade])

  // --- Batch Mode Handlers ---

  const addBatchRow = useCallback(() => {
    setBatchRows((prev) => [...prev, { id: nextId, find: "", replace: "", caseSensitive: true }])
    setNextId((n) => n + 1)
  }, [nextId])

  const removeBatchRow = useCallback((id: number) => {
    setBatchRows((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const updateBatchRow = useCallback((id: number, field: "find" | "replace" | "caseSensitive", value: string | boolean) => {
    setBatchRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    )
  }, [])

  const handleBatchReplaceAll = useCallback(() => {
    const validRows = batchRows.filter((r) => (r.find || "").trim().length > 0)
    if (validRows.length === 0) return

    // Validate all regex patterns first
    for (const row of validRows) {
      try {
        buildPattern(row.find, row.caseSensitive, false, true)
      } catch {
        // skip invalid
      }
    }

    const source = output || input
    if ((source || "").length === 0) return

    let current = source
    let totalMatchCount = 0
    let totalReplaceCount = 0

    for (const row of validRows) {
      const matches = countMatches(current, row.find, row.caseSensitive, false, false)
      const { result, count } = doReplace(current, row.find, row.replace, row.caseSensitive, false, false)
      totalMatchCount += matches
      totalReplaceCount += count
      current = result
    }

    setHistory((prev) => [...prev, { text: output || "", matchCount: totalMatches, replacementCount: replacementsMade }])
    setOutput(current)
    setTotalMatches(totalMatchCount)
    setReplacementsMade(totalReplaceCount)
  }, [batchRows, input, output, countMatches, doReplace, totalMatches, replacementsMade])

  // --- Common Handlers ---

  const handleUndo = useCallback(() => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setOutput(prev.text)
    setTotalMatches(prev.matchCount)
    setReplacementsMade(prev.replacementCount)
    setHistory((h) => h.slice(0, -1))
  }, [history])

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
    setFindText("")
    setReplaceText("")
    setTotalMatches(0)
    setReplacementsMade(0)
    setRegexError("")
    setHistory([])
  }, [])

  const handleReset = useCallback(() => {
    setOutput("")
    setTotalMatches(0)
    setReplacementsMade(0)
    setRegexError("")
    setHistory([])
  }, [])

  // --- Render ---

  return (
    <div className="space-y-6">
      {/* Input Textarea */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="replacer-input" className="text-base font-semibold flex items-center gap-2">
              <Replace className="size-4" />
              Input Text
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {(input || "").length} chars
            </Badge>
          </div>
          <Textarea
            id="replacer-input"
            placeholder="Type or paste your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[160px] sm:min-h-[200px] resize-y text-base leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Mode Toggle */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Search className="size-4" />
              Replacement Mode
            </Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="batch-toggle" className="text-sm text-muted-foreground">Batch</Label>
              <Switch id="batch-toggle" checked={batchMode} onCheckedChange={setBatchMode} />
            </div>
          </div>

          {!batchMode ? (
            /* Single replacement mode */
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="find-input">Find / Search</Label>
                  <Input
                    id="find-input"
                    placeholder="Enter text or regex pattern to find..."
                    value={findText}
                    onChange={(e) => {
                      setFindText(e.target.value)
                      if (useRegex) validateRegex(e.target.value)
                    }}
                  />
                  {regexError && (
                    <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle className="size-4 shrink-0 mt-0.5" />
                      <span>Invalid regex: {regexError}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="replace-input">Replace With</Label>
                  <Input
                    id="replace-input"
                    placeholder="Enter replacement text..."
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                  />
                </div>
              </div>

              {/* Options Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="case-sensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
                  <Label htmlFor="case-sensitive" className="text-sm cursor-pointer">Case Sensitive</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="whole-word" checked={wholeWord} onCheckedChange={setWholeWord} />
                  <Label htmlFor="whole-word" className="text-sm cursor-pointer">Whole Word</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="use-regex" checked={useRegex} onCheckedChange={(checked) => {
                    setUseRegex(checked)
                    if (!checked) setRegexError("")
                    else if ((findText || "").trim().length > 0) validateRegex(findText)
                  }} />
                  <Label htmlFor="use-regex" className="text-sm cursor-pointer">Use Regex</Label>
                </div>
              </div>
            </div>
          ) : (
            /* Batch replacement mode */
            <div className="space-y-4">
              {batchRows.map((row, idx) => (
                <div key={row.id} className="flex flex-col sm:flex-row items-start sm:items-end gap-3 p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="tabular-nums text-xs">
                      #{idx + 1}
                    </Badge>
                  </div>
                  <div className="flex-1 grid gap-3 sm:grid-cols-2 w-full">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Find</Label>
                      <Input
                        placeholder="Text to find..."
                        value={row.find}
                        onChange={(e) => updateBatchRow(row.id, "find", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Replace</Label>
                      <Input
                        placeholder="Replacement text..."
                        value={row.replace}
                        onChange={(e) => updateBatchRow(row.id, "replace", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        id={`batch-case-${row.id}`}
                        checked={row.caseSensitive}
                        onCheckedChange={(checked) => updateBatchRow(row.id, "caseSensitive", !!checked)}
                      />
                      <Label htmlFor={`batch-case-${row.id}`} className="text-xs text-muted-foreground whitespace-nowrap cursor-pointer">Case Sensitive</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => removeBatchRow(row.id)}
                      disabled={batchRows.length <= 1}
                    >
                      <Trash2 className="size-4" />
                      <span className="sr-only">Remove row</span>
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addBatchRow}
                className="w-full sm:w-auto"
              >
                <Plus className="size-4 mr-1.5" />
                Add Another
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {!batchMode ? (
              <>
                <Button onClick={handleReplaceAll} disabled={(findText || "").trim().length === 0 || (input || "").length === 0}>
                  <Replace className="size-4 mr-1.5" />
                  Replace All
                </Button>
                <Button variant="outline" onClick={handleReplaceFirst} disabled={(findText || "").trim().length === 0 || (input || "").length === 0}>
                  <Replace className="size-4 mr-1.5" />
                  Replace First
                </Button>
              </>
            ) : (
              <Button onClick={handleBatchReplaceAll} disabled={batchRows.every((r) => (r.find || "").trim().length === 0) || (input || "").length === 0}>
                <Replace className="size-4 mr-1.5" />
                Run Batch Replace
              </Button>
            )}
            <Button variant="outline" onClick={handleUndo} disabled={history.length === 0}>
              <Undo2 className="size-4 mr-1.5" />
              Undo Last
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {(output || "").length > 0 && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Search className="size-3.5 mr-1.5" />
            {totalMatches} match{totalMatches !== 1 ? "es" : ""} found
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Replace className="size-3.5 mr-1.5" />
            {replacementsMade} replacement{replacementsMade !== 1 ? "s" : ""} made
          </Badge>
        </div>
      )}

      {/* Output Textarea */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="replacer-output" className="text-base font-semibold flex items-center gap-2">
              <Replace className="size-4" />
              Output
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {(output || "").length} chars
            </Badge>
          </div>
          <Textarea
            id="replacer-output"
            value={output}
            readOnly
            placeholder="Replacement results will appear here..."
            className="min-h-[160px] sm:min-h-[200px] resize-y text-base leading-relaxed bg-muted/50"
          />
        </CardContent>
      </Card>

      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} disabled={(output || "").trim().length === 0}>
          {copied ? <Copy className="size-4 mr-1.5" /> : <Copy className="size-4 mr-1.5" />}
          {copied ? "Copied!" : "Copy Output"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <RotateCcw className="size-4 mr-1.5" />
          Clear All
        </Button>
        <Button variant="outline" size="sm" onClick={handleReset} disabled={(output || "").length === 0}>
          <RotateCcw className="size-4 mr-1.5" />
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
              All find and replace operations are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}