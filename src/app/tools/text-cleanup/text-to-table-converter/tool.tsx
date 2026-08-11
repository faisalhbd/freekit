"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Table, Copy, Shield } from "lucide-react"

const DELIMITERS = [
  { label: "Tab", value: "\t" },
  { label: "Comma", value: "," },
  { label: "Semicolon", value: ";" },
  { label: "Pipe (|)", value: "|" },
] as const

export function TextToTableConverterTool() {
  const [text, setText] = useState("")
  const [delimiter, setDelimiter] = useState<string>("\t")
  const [customDelimiter, setCustomDelimiter] = useState("")
  const [firstRowHeader, setFirstRowHeader] = useState(true)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [copiedMd, setCopiedMd] = useState(false)
  const [copiedHtml, setCopiedHtml] = useState(false)
  const [activeDelimiter, setActiveDelimiter] = useState("Tab")

  const parsedData = useMemo(() => {
    const raw = text || ""
    if (raw.trim().length === 0) return { rows: [] as string[][], html: "", markdown: "" }

    const delim = delimiter || "\t"
    const lines = raw.split("\n").filter((l) => (l || "").trim().length > 0)
    const rows: string[][] = []

    for (const line of lines) {
      let cells: string[]
      if (delim === "\t") {
        cells = line.split("\t")
      } else {
        cells = line.split(delim)
      }
      if (trimWhitespace) {
        cells = cells.map((c) => (c || "").trim())
      }
      rows.push(cells)
    }

    if (rows.length === 0) return { rows: [], html: "", markdown: "" }

    // Normalize column count
    const maxCols = Math.max(...rows.map((r) => r.length))
    const normalizedRows = rows.map((r) => {
      while (r.length < maxCols) r.push("")
      return r
    })

    // Generate HTML
    const hasHeader = firstRowHeader && normalizedRows.length > 0
    let html = '<table class="border-collapse border border-gray-300">\n'
    if (hasHeader) {
      html += "  <thead>\n    <tr>\n"
      for (const cell of normalizedRows[0]) {
        html += `      <th class="border border-gray-300 px-4 py-2 bg-gray-50">${escapeHtml(cell)}</th>\n`
      }
      html += "    </tr>\n  </thead>\n"
    }
    html += "  <tbody>\n"
    const bodyStart = hasHeader ? 1 : 0
    for (let i = bodyStart; i < normalizedRows.length; i++) {
      html += "    <tr>\n"
      for (const cell of normalizedRows[i]) {
        html += `      <td class="border border-gray-300 px-4 py-2">${escapeHtml(cell)}</td>\n`
      }
      html += "    </tr>\n"
    }
    html += "  </tbody>\n</table>"

    // Generate Markdown
    let markdown = ""
    if (hasHeader) {
      markdown += "| " + normalizedRows[0].join(" | ") + " |\n"
      markdown += "| " + normalizedRows[0].map(() => "---").join(" | ") + " |\n"
      for (let i = 1; i < normalizedRows.length; i++) {
        markdown += "| " + normalizedRows[i].join(" | ") + " |\n"
      }
    } else {
      for (let i = 0; i < normalizedRows.length; i++) {
        markdown += "| " + normalizedRows[i].join(" | ") + " |\n"
      }
    }

    return { rows: normalizedRows, html, markdown }
  }, [text, delimiter, firstRowHeader, trimWhitespace])

  const handleCopyMarkdown = useCallback(async () => {
    if ((parsedData.markdown || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(parsedData.markdown)
      setCopiedMd(true)
      setTimeout(() => setCopiedMd(false), 2000)
    } catch {
      // fallback
    }
  }, [parsedData.markdown])

  const handleCopyHtml = useCallback(async () => {
    if ((parsedData.html || "").trim().length === 0) return
    try {
      await navigator.clipboard.writeText(parsedData.html)
      setCopiedHtml(true)
      setTimeout(() => setCopiedHtml(false), 2000)
    } catch {
      // fallback
    }
  }, [parsedData.html])

  const hasText = (text || "").trim().length > 0
  const rowCount = parsedData.rows.length
  const colCount = parsedData.rows.length > 0 ? parsedData.rows[0].length : 0

  return (
    <div className="space-y-6">
      {/* Options */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Table className="size-4" />
            Conversion Options
          </Label>

          {/* Delimiter Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Delimiter</Label>
            <div className="flex flex-wrap gap-2">
              {DELIMITERS.map((d) => (
                <Button
                  key={d.label}
                  variant={activeDelimiter === d.label ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setActiveDelimiter(d.label)
                    setDelimiter(d.value)
                    setCustomDelimiter("")
                  }}
                >
                  {d.label}
                </Button>
              ))}
              <Button
                variant={activeDelimiter === "Custom" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveDelimiter("Custom")
                  setDelimiter(customDelimiter || ",")
                }}
              >
                Custom
              </Button>
            </div>
            {activeDelimiter === "Custom" && (
              <input
                type="text"
                className="mt-2 w-full max-w-xs rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                placeholder="Enter custom delimiter..."
                value={customDelimiter}
                onChange={(e) => {
                  setCustomDelimiter(e.target.value)
                  setDelimiter(e.target.value)
                }}
              />
            )}
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="first-row-header"
                checked={firstRowHeader}
                onCheckedChange={setFirstRowHeader}
              />
              <Label htmlFor="first-row-header" className="text-sm cursor-pointer">First row as header</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="trim-ws"
                checked={trimWhitespace}
                onCheckedChange={setTrimWhitespace}
              />
              <Label htmlFor="trim-ws" className="text-sm cursor-pointer">Trim whitespace</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ttt-input" className="text-base font-semibold">Input Data</Label>
            {hasText && (
              <Badge variant="secondary" className="tabular-nums">
                {rowCount} row{rowCount !== 1 ? "s" : ""} × {colCount} col{colCount !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <Textarea
            id="ttt-input"
            placeholder={"Paste your delimited data here, one row per line...\n\nName\tAge\tCity\nAlice\t30\tNew York\nBob\t25\tLondon"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[160px] sm:min-h-[200px] resize-y text-base leading-relaxed font-mono"
          />
        </CardContent>
      </Card>

      {/* HTML Table Preview */}
      {hasText && parsedData.rows.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
          <Label className="text-base font-semibold">HTML Table Preview</Label>
          <div
            className="overflow-x-auto rounded-lg border border-border p-4 bg-white dark:bg-gray-950"
            dangerouslySetInnerHTML={{ __html: parsedData.html }}
          />
          </CardContent>
        </Card>
      )}

      {/* Markdown Output */}
      {hasText && parsedData.rows.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Markdown Table</Label>
              <Button variant="outline" size="sm" onClick={handleCopyMarkdown}>
                <Copy className="size-4 mr-1.5" />
                {copiedMd ? "Copied!" : "Copy Markdown"}
              </Button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm font-mono leading-relaxed whitespace-pre">
              {parsedData.markdown}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* HTML Code Output */}
      {hasText && parsedData.rows.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">HTML Code</Label>
              <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                <Copy className="size-4 mr-1.5" />
                {copiedHtml ? "Copied!" : "Copy HTML"}
              </Button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm font-mono leading-relaxed whitespace-pre">
              {parsedData.html}
            </pre>
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
              All text-to-table conversion operations are performed entirely in your browser. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function escapeHtml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
