"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  FileSpreadsheet,
  Copy,
  Check,
  RotateCcw,
  Download,
  ArrowLeftRight,
  Shield,
  AlertCircle,
} from "lucide-react"

// --- Types ---

type DelimiterType = "," | ";" | "\t"

const DELIMITER_LABELS: Record<DelimiterType, string> = {
  ",": "Comma (,)",
  ";": "Semicolon (;)",
  "\t": "Tab",
}

// --- Flatten nested object to dot-notation keys ---

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey))
    } else {
      result[newKey] = value
    }
  }
  return result
}

// --- Escape CSV field ---

function escapeCSVField(value: unknown, delimiter: DelimiterType): string {
  const str = value === null || value === undefined ? "" : String(value)
  if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

// --- Convert JSON array to CSV ---

function convertToCSV(
  data: Record<string, unknown>[],
  delimiter: DelimiterType,
  includeHeaders: boolean,
  flatten: boolean
): string {
  // Flatten if needed
  const rows = flatten ? data.map((obj) => flattenObject(obj)) : data

  // Collect all unique keys in order of appearance
  const keySet = new Set<string>()
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      keySet.add(key)
    }
  }
  const headers = Array.from(keySet)

  const lines: string[] = []

  if (includeHeaders) {
    lines.push(headers.map((h) => escapeCSVField(h, delimiter)).join(delimiter))
  }

  for (const row of rows) {
    const values = headers.map((h) => escapeCSVField(row[h], delimiter))
    lines.push(values.join(delimiter))
  }

  return lines.join("\n")
}

// --- Sample JSON ---

const SAMPLE_JSON = JSON.stringify(
  [
    { name: "John Doe", email: "john@example.com", age: 30, address: { city: "New York", country: "US" } },
    { name: "Jane Smith", email: "jane@example.com", age: 25, address: { city: "London", country: "UK" } },
    { name: "Bob Johnson", email: "bob@example.com", age: 35, address: { city: "Paris", country: "FR" } },
  ],
  null,
  2
)

// --- Component ---

export function JsonToCsvTool() {
  const [input, setInput] = useState("")
  const [delimiter, setDelimiter] = useState<DelimiterType>(",")
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [flatten, setFlatten] = useState(true)
  const [copied, setCopied] = useState(false)

  // --- Computed output ---

  const { output, rowCount, colCount, error } = useMemo(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      return { output: "", rowCount: 0, colCount: 0, error: "" }
    }
    try {
      const parsed = JSON.parse(trimmed)
      if (!Array.isArray(parsed)) {
        return { output: "", rowCount: 0, colCount: 0, error: "JSON must be an array of objects. Example: [{\"name\": \"John\"}, {\"name\": \"Jane\"}]" }
      }
      if (parsed.length === 0) {
        return { output: "", rowCount: 0, colCount: 0, error: "" }
      }
      const csv = convertToCSV(parsed, delimiter, includeHeaders, flatten)
      const keySet = new Set<string>()
      for (const item of parsed) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const flat = flatten ? flattenObject(item as Record<string, unknown>) : (item as Record<string, unknown>)
          for (const k of Object.keys(flat)) keySet.add(k)
        }
      }
      return { output: csv, rowCount: parsed.length, colCount: keySet.size, error: "" }
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Invalid JSON") : "Invalid JSON"
      return { output: "", rowCount: 0, colCount: 0, error: msg }
    }
  }, [input, delimiter, includeHeaders, flatten])

  // --- Actions ---

  const handleCopy = useCallback(async () => {
    if ((output || "").length === 0) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }, [output])

  const handleDownload = useCallback(() => {
    if ((output || "").length === 0) return
    const BOM = "\uFEFF"
    const blob = new Blob([BOM + output], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data.csv"
    a.click()
    URL.revokeObjectURL(url)
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").length === 0) return
    setInput(output)
  }, [output])

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JSON)
  }, [])

  return (
    <div className="space-y-6">
      {/* Options */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Delimiter:</Label>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(Object.keys(DELIMITER_LABELS) as DelimiterType[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDelimiter(d)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    delimiter === d
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {DELIMITER_LABELS[d]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="headers-toggle"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="headers-toggle" className="text-sm cursor-pointer">Include headers</Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="flatten-toggle"
                checked={flatten}
                onChange={(e) => setFlatten(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="flatten-toggle" className="text-sm cursor-pointer">Flatten nested objects</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-input" className="text-base font-semibold flex items-center gap-2">
                <FileSpreadsheet className="size-4" />
                JSON Input
              </Label>
              <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs gap-1">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="json-input"
              placeholder='Paste JSON array here, e.g. [{"name": "John", "age": 30}]'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] sm:min-h-[380px] resize-y font-mono text-sm leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <FileSpreadsheet className="size-4" />
                CSV Output
              </Label>
            </div>
            <div className="relative min-h-[300px] sm:min-h-[380px] rounded-md border border-input bg-muted/50 p-3 overflow-auto max-h-96">
              {(output || "").trim().length > 0 ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground font-mono">CSV output will appear here...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Conversion Error</p>
              <p className="text-xs text-red-700/80 dark:text-red-400/80 break-all">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons + Stats */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy CSV"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              <Download className="size-4" />
              Download .csv
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
            <Button onClick={handleSwap} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              <ArrowLeftRight className="size-4" />
              Swap
            </Button>

            <Separator orientation="vertical" className="hidden sm:block h-6 mx-1" />

            {rowCount > 0 && (
              <Badge variant="outline" className="tabular-nums text-xs">
                {rowCount} {rowCount === 1 ? "row" : "rows"}
              </Badge>
            )}
            {colCount > 0 && (
              <Badge variant="outline" className="tabular-nums text-xs">
                {colCount} {colCount === 1 ? "column" : "columns"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Data Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All JSON parsing and CSV generation happen entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
