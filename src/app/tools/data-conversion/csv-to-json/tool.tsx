"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  FileJson,
  Copy,
  Check,
  RotateCcw,
  Download,
  ArrowLeftRight,
  Shield,
} from "lucide-react"

// --- Types ---

type DelimiterType = "," | ";" | "\t" | "|"
type OutputFormat = "objects" | "arrays"

const DELIMITER_LABELS: Record<DelimiterType, string> = {
  ",": "Comma (,)",
  ";": "Semicolon (;)",
  "\t": "Tab",
  "|": "Pipe (|)",
}

// --- CSV Parser (RFC 4180 compliant) ---

function parseCSV(csv: string, delimiter: DelimiterType): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let inQuotes = false
  let i = 0

  while (i < csv.length) {
    const ch = csv[i]

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < csv.length && csv[i + 1] === '"') {
          currentField += '"'
          i += 2
          continue
        }
        inQuotes = false
        i++
        continue
      }
      currentField += ch
      i++
    } else {
      if (ch === '"') {
        inQuotes = true
        i++
      } else if (ch === delimiter) {
        currentRow.push(currentField)
        currentField = ""
        i++
      } else if (ch === '\r') {
        if (i + 1 < csv.length && csv[i + 1] === '\n') {
          i++
        }
        currentRow.push(currentField)
        currentField = ""
        if (currentRow.some((f) => (f || "").length > 0)) {
          rows.push(currentRow)
        }
        currentRow = []
        i++
      } else if (ch === '\n') {
        currentRow.push(currentField)
        currentField = ""
        if (currentRow.some((f) => (f || "").length > 0)) {
          rows.push(currentRow)
        }
        currentRow = []
        i++
      } else {
        currentField += ch
        i++
      }
    }
  }

  // Last field/row
  currentRow.push(currentField)
  if (currentRow.some((f) => (f || "").length > 0)) {
    rows.push(currentRow)
  }

  return rows
}

// --- Convert parsed rows to JSON ---

function convertToJSON(
  rows: string[][],
  firstRowAsHeader: boolean,
  outputFormat: OutputFormat,
  indent: number
): string {
  if (rows.length === 0) return "[]"

  if (outputFormat === "arrays") {
    return JSON.stringify(rows, null, indent)
  }

  if (!firstRowAsHeader) {
    return JSON.stringify(rows, null, indent)
  }

  const headers = rows[0]
  const dataRows = rows.slice(1)
  const result = dataRows.map((row) => {
    const obj: Record<string, string> = {}
    headers.forEach((header, idx) => {
      obj[header || `col${idx}`] = (row && row[idx]) || ""
    })
    return obj
  })

  return JSON.stringify(result, null, indent)
}

// --- Auto-detect delimiter ---

function detectDelimiter(csv: string): DelimiterType {
  const firstLines = (csv || "").split("\n").slice(0, 5).join("\n")
  const counts: Record<string, number> = {
    ",": 0,
    ";": 0,
    "\t": 0,
    "|": 0,
  }
  let inQ = false
  for (let i = 0; i < firstLines.length; i++) {
    const ch = firstLines[i]
    if (ch === '"') { inQ = !inQ; continue }
    if (inQ) continue
    if (ch in counts) counts[ch]++
  }
  let best: DelimiterType = ","
  let max = 0
  for (const [del, count] of Object.entries(counts)) {
    if (count > max) { max = count; best = del as DelimiterType }
  }
  return best
}

// --- Sample CSV ---

const SAMPLE_CSV = `name,email,age,city
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,London
Bob Johnson,bob@example.com,35,Paris
Alice Brown,alice@example.com,28,Tokyo`

// --- Component ---

export function CsvToJsonTool() {
  const [input, setInput] = useState("")
  const [delimiter, setDelimiter] = useState<DelimiterType>(",")
  const [firstRowAsHeader, setFirstRowAsHeader] = useState(true)
  const [indent, setIndent] = useState<2 | 4>(2)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("objects")
  const [copied, setCopied] = useState(false)

  // --- Computed output ---

  const { output, rowCount, colCount } = useMemo(() => {
    const csv = (input || "").trim()
    if (csv.length === 0) {
      return { output: "", rowCount: 0, colCount: 0 }
    }
    try {
      const rows = parseCSV(csv, delimiter)
      if (rows.length === 0) {
        return { output: "", rowCount: 0, colCount: 0 }
      }
      const maxCols = Math.max(...rows.map((r) => r.length))
      const json = convertToJSON(rows, firstRowAsHeader, outputFormat, indent)
      return { output: json, rowCount: firstRowAsHeader ? rows.length - 1 : rows.length, colCount: maxCols }
    } catch {
      return { output: "", rowCount: 0, colCount: 0 }
    }
  }, [input, delimiter, firstRowAsHeader, indent, outputFormat])

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
    const blob = new Blob([output], { type: "application/json;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data.json"
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
    setInput(SAMPLE_CSV)
  }, [])

  const handleAutoDetect = useCallback(() => {
    const csv = (input || "").trim()
    if (csv.length === 0) return
    setDelimiter(detectDelimiter(csv))
  }, [input])

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
            <Button variant="ghost" size="sm" onClick={handleAutoDetect} className="text-xs">
              Auto-detect
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="header-toggle"
                checked={firstRowAsHeader}
                onChange={(e) => setFirstRowAsHeader(e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              <Label htmlFor="header-toggle" className="text-sm cursor-pointer">First row as header</Label>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-5" />

            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Indent:</Label>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {([2, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setIndent(n)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      indent === n
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    } ${n === 2 ? "border-r border-border" : ""}`}
                  >
                    {n} spaces
                  </button>
                ))}
              </div>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-5" />

            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Output:</Label>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(
                  [
                    { value: "objects", label: "Array of Objects" },
                    { value: "arrays", label: "Array of Arrays" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setOutputFormat(opt.value)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      outputFormat === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    } ${opt.value === "objects" ? "border-r border-border" : ""}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
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
              <Label htmlFor="csv-input" className="text-base font-semibold flex items-center gap-2">
                <FileJson className="size-4" />
                CSV Input
              </Label>
              <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs gap-1">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="csv-input"
              placeholder="Paste your CSV data here..."
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
                <FileJson className="size-4" />
                JSON Output
              </Label>
            </div>
            <div className="relative min-h-[300px] sm:min-h-[380px] rounded-md border border-input bg-muted/50 p-3 overflow-auto max-h-96">
              {(output || "").trim().length > 0 ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground font-mono">JSON output will appear here...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons + Stats */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy JSON"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              <Download className="size-4" />
              Download .json
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
              All CSV parsing and JSON conversion happen entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
