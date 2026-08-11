"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Filter,
  Upload,
  Download,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Shield,
  Search,
} from "lucide-react"

// --- Types ---

type DelimiterType = "," | ";" | "\t" | "|"
type SortDirection = "asc" | "desc" | null

// --- CSV Parser (RFC 4180) ---

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
        if (i + 1 < csv.length && csv[i + 1] === '\n') i++
        currentRow.push(currentField)
        currentField = ""
        if (currentRow.some((f) => (f || "").length > 0)) rows.push(currentRow)
        currentRow = []
        i++
      } else if (ch === '\n') {
        currentRow.push(currentField)
        currentField = ""
        if (currentRow.some((f) => (f || "").length > 0)) rows.push(currentRow)
        currentRow = []
        i++
      } else {
        currentField += ch
        i++
      }
    }
  }
  currentRow.push(currentField)
  if (currentRow.some((f) => (f || "").length > 0)) rows.push(currentRow)
  return rows
}

// --- Auto-detect delimiter ---

function detectDelimiter(csv: string): DelimiterType {
  const firstLines = (csv || "").split("\n").slice(0, 5).join("\n")
  const counts: Record<string, number> = { ",": 0, ";": 0, "\t": 0, "|": 0 }
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

const SAMPLE_CSV = `name,department,salary,city,start_date
Alice Johnson,Engineering,95000,New York,2021-03-15
Bob Smith,Marketing,72000,London,2020-07-22
Carol Williams,Engineering,105000,San Francisco,2019-11-03
Dave Brown,Design,68000,Paris,2022-01-10
Eve Davis,Marketing,78000,Tokyo,2021-09-05
Frank Miller,Engineering,110000,Berlin,2018-04-18
Grace Wilson,Design,71000,London,2022-06-30
Henry Taylor,Engineering,98000,New York,2020-12-01
Ivy Anderson,Marketing,75000,Paris,2023-02-14
Jack Thomas,Design,66000,Tokyo,2021-08-20`

// --- Component ---

export function CsvViewerFilterTool() {
  const [input, setInput] = useState("")
  const [delimiter, setDelimiter] = useState<DelimiterType>(",")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortCol, setSortCol] = useState<number | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Parse CSV
  const { headers, rows } = useMemo(() => {
    const csv = (input || "").trim()
    if (csv.length === 0) return { headers: [] as string[], rows: [] as string[][] }
    try {
      const parsed = parseCSV(csv, delimiter)
      if (parsed.length === 0) return { headers: [] as string[], rows: [] as string[][] }
      const h = parsed[0]
      const r = parsed.slice(1)
      return { headers: h, rows: r }
    } catch {
      return { headers: [] as string[], rows: [] as string[][] }
    }
  }, [input, delimiter])

  // Filter + Sort
  const filteredRows = useMemo(() => {
    let result = rows
    if ((searchQuery || "").length > 0) {
      const q = searchQuery.toLowerCase()
      result = result.filter((row) =>
        row.some((cell) => (cell || "").toLowerCase().includes(q))
      )
    }
    if (sortCol !== null && sortDir !== null) {
      result = [...result].sort((a, b) => {
        const va = (a[sortCol] || "").toLowerCase()
        const vb = (b[sortCol] || "").toLowerCase()
        const numA = Number(va)
        const numB = Number(vb)
        let cmp: number
        if (!isNaN(numA) && !isNaN(numB)) {
          cmp = numA - numB
        } else {
          cmp = va.localeCompare(vb)
        }
        return sortDir === "desc" ? -cmp : cmp
      })
    }
    return result
  }, [rows, searchQuery, sortCol, sortDir])

  // Handle column sort
  const handleSort = useCallback((colIndex: number) => {
    setSortCol((prev) => {
      if (prev === colIndex) {
        setSortDir((d) => {
          if (d === "asc") return "desc"
          if (d === "desc") { return null }
          return "asc"
        })
        if (sortDir === "desc") return null
        return colIndex
      }
      setSortDir("asc")
      return colIndex
    })
  }, [sortDir])

  // Export filtered CSV
  const handleExport = useCallback(() => {
    if (headers.length === 0) return
    const exportRows = [headers, ...filteredRows]
    const csvContent = exportRows.map((row) =>
      row.map((cell) => {
        if ((cell || "").includes(",") || (cell || "").includes('"') || (cell || "").includes("\n")) {
          return `"${(cell || "").replace(/"/g, '""')}"`
        }
        return cell || ""
      }).join(delimiter)
    ).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "filtered-data.csv"
    a.click()
    URL.revokeObjectURL(url)
  }, [headers, filteredRows, delimiter])

  // File upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      if (text) {
        setInput(text)
        setDelimiter(detectDelimiter(text))
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }, [])

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Filter className="size-4" />
              CSV Input
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setInput(SAMPLE_CSV)} className="text-xs gap-1">
                Load Sample
              </Button>
              <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="text-xs gap-1">
                <Upload className="size-3.5" />
                Upload File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.tsv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
          <Textarea
            placeholder="Paste your CSV data here or upload a file..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[180px] resize-y font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      {/* Search + Stats + Actions */}
      {headers.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search all columns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="tabular-nums text-xs">
                  {rows.length} {rows.length === 1 ? "row" : "rows"}
                </Badge>
                <Badge variant="outline" className="tabular-nums text-xs">
                  {headers.length} {headers.length === 1 ? "column" : "columns"}
                </Badge>
                {(searchQuery || "").length > 0 && (
                  <Badge variant="secondary" className="tabular-nums text-xs">
                    {filteredRows.length} matching
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleExport} variant="outline" size="sm" disabled={filteredRows.length === 0} className="gap-1.5">
                <Download className="size-4" />
                Export Filtered CSV
              </Button>
              <Button onClick={() => setInput("")} variant="outline" size="sm" className="gap-1.5">
                <RotateCcw className="size-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {headers.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="max-h-96 overflow-y-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted z-10">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground border-b border-border w-12">
                      #
                    </th>
                    {headers.map((header, idx) => (
                      <th
                        key={idx}
                        onClick={() => handleSort(idx)}
                        className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground border-b border-border cursor-pointer hover:bg-muted/80 select-none whitespace-nowrap"
                      >
                        <span className="inline-flex items-center gap-1">
                          {header || `Col ${idx + 1}`}
                          {sortCol === idx && sortDir === "asc" && <ArrowUp className="size-3" />}
                          {sortCol === idx && sortDir === "desc" && <ArrowDown className="size-3" />}
                          {sortCol !== idx && <ArrowUpDown className="size-3 opacity-40" />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={headers.length + 1} className="px-3 py-8 text-center text-muted-foreground">
                        No matching rows found.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-3 py-2 text-xs text-muted-foreground tabular-nums">{rowIdx + 1}</td>
                        {headers.map((_, colIdx) => (
                          <td key={colIdx} className="px-3 py-2 whitespace-nowrap max-w-[200px] truncate">
                            {(row[colIdx] || "")}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {headers.length === 0 && (input || "").trim().length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <Filter className="size-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Paste CSV data above or upload a file to view it as an interactive table.</p>
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
              100% Private — Your Data Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All CSV parsing, filtering, and sorting happen entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}