"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  FileCode,
  Copy,
  Check,
  RotateCcw,
  ArrowLeftRight,
  Shield,
  AlertCircle,
} from "lucide-react"

// --- YAML Parser (no external deps) ---

function parseYAMLValue(raw: string): unknown {
  const trimmed = (raw || "").trim()
  if (trimmed === "" ) return ""
  // Boolean
  if (trimmed === "true" || trimmed === "True" || trimmed === "TRUE" || trimmed === "yes" || trimmed === "Yes" || trimmed === "YES") return true
  if (trimmed === "false" || trimmed === "False" || trimmed === "FALSE" || trimmed === "no" || trimmed === "No" || trimmed === "NO") return false
  // Null
  if (trimmed === "null" || trimmed === "Null" || trimmed === "NULL" || trimmed === "~" || trimmed === "") return null
  // Number
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10)
  if (/^-?\d+\.\d+([eE][+-]?\d+)?$/.test(trimmed)) return parseFloat(trimmed)
  // Quoted string
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'")
  }
  return trimmed
}

function getIndent(line: string): number {
  let count = 0
  for (const ch of line) {
    if (ch === ' ') count++
    else break
  }
  return count
}

function parseYAMLLines(lines: string[]): unknown {
  // Filter out empty lines and comments
  const filtered = lines.filter((line) => {
    const t = (line || "").trim()
    return t.length > 0 && !t.startsWith("#")
  })
  if (filtered.length === 0) return null

  // Check if first line is a list item
  const firstTrimmed = (filtered[0] || "").trim()
  if (firstTrimmed.startsWith("- ")) {
    return parseYAMLList(filtered, 0)
  }

  // Otherwise, parse as mapping
  return parseYAMLMap(filtered, 0, 0).value
}

function parseYAMLMap(lines: string[], startIdx: number, baseIndent: number): { value: Record<string, unknown>; nextIdx: number } {
  const result: Record<string, unknown> = {}
  let i = startIdx

  while (i < lines.length) {
    const line = lines[i] || ""
    const trimmed = (line || "").trim()
    if (trimmed.length === 0 || trimmed.startsWith("#")) { i++; continue }

    const indent = getIndent(line)
    if (indent < baseIndent) break
    if (indent > baseIndent) { i++; continue }

    // List item at this level? Stop, let parent handle.
    if (trimmed.startsWith("- ")) break

    // Must be a key: value pair
    const colonIdx = trimmed.indexOf(":")
    if (colonIdx === -1) { i++; continue }

    // Make sure the colon is not inside a quoted key
    const keyPart = trimmed.substring(0, colonIdx).trim()
    const valuePart = trimmed.substring(colonIdx + 1).trim()

    // Clean up key (remove quotes)
    const key = (keyPart.startsWith('"') && keyPart.endsWith('"'))
      ? keyPart.slice(1, -1)
      : (keyPart.startsWith("'") && keyPart.endsWith("'"))
        ? keyPart.slice(1, -1)
        : keyPart

    if (valuePart === "" || valuePart.startsWith("#")) {
      // Value is on next lines (nested object or list)
      i++
      if (i >= lines.length) {
        result[key] = null
        break
      }
      const nextLine = lines[i] || ""
      const nextTrimmed = (nextLine || "").trim()
      const nextIndent = getIndent(nextLine)

      if (nextIndent <= baseIndent) {
        result[key] = null
        continue
      }

      if (nextTrimmed.startsWith("- ")) {
        const listResult = parseYAMLList(lines, i)
        result[key] = listResult
        i = listResult._nextIdx as number
        continue
      }

      const mapResult = parseYAMLMap(lines, i, nextIndent)
      result[key] = mapResult.value
      i = mapResult.nextIdx
    } else {
      result[key] = parseYAMLValue(valuePart)
      i++
    }
  }

  return { value: result, nextIdx: i }
}

function parseYAMLList(lines: string[], startIdx: number): unknown[] {
  const result: unknown[] = []
  let i = startIdx
  let baseIndent = -1

  while (i < lines.length) {
    const line = lines[i] || ""
    const trimmed = (line || "").trim()
    if (trimmed.length === 0 || trimmed.startsWith("#")) { i++; continue }

    const indent = getIndent(line)
    if (baseIndent === -1) baseIndent = indent
    if (indent < baseIndent) break
    if (!trimmed.startsWith("- ")) break

    const afterDash = trimmed.substring(2).trim()

    if (afterDash.length === 0) {
      // Value is on next lines
      i++
      if (i >= lines.length) { result.push(null); break }
      const nextLine = lines[i] || ""
      const nextIndent = getIndent(nextLine)

      if (nextIndent <= baseIndent) {
        result.push(null)
        continue
      }

      const nextTrimmed = (nextLine || "").trim()
      if (nextTrimmed.startsWith("- ")) {
        const nested = parseYAMLList(lines, i)
        result.push(nested)
        i = (nested as unknown as { _nextIdx: number })._nextIdx
      } else {
        const mapResult = parseYAMLMap(lines, i, nextIndent)
        result.push(mapResult.value)
        i = mapResult.nextIdx
      }
    } else if (afterDash.startsWith("- ")) {
      // Nested list: - - item
      const subLines = [" ".repeat(baseIndent + 2) + afterDash, ...lines.slice(i + 1)]
      const nested = parseYAMLList(subLines, 0)
      result.push(nested)
      // Calculate how many lines the nested list consumed
      let consumed = 1
      for (let j = i + 1; j < lines.length; j++) {
        const l = lines[j] || ""
        if ((l || "").trim().length === 0) { consumed++; continue }
        if (getIndent(l) > baseIndent) consumed++
        else break
      }
      i += consumed
    } else {
      result.push(parseYAMLValue(afterDash))
      i++
    }
  }

  ;(result as unknown as Record<string, unknown>)._nextIdx = i
  return result
}

function parseYAML(yaml: string): unknown {
  const lines = (yaml || "").split("\n")
  return parseYAMLLines(lines)
}

// --- Sample YAML ---

const SAMPLE_YAML = `name: FreeKit
version: "1.0.0"
description: A collection of free online tools
author:
  name: Faisal Hossain
  role: Founder
features:
  - JSON Formatter
  - Base64 Encoder
  - Color Picker
  - Hash Generator
stats:
  tools: 55
  categories: 7
  is_free: true
  price: null`

// --- Component ---

export function YamlToJsonTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const { output, error } = useMemo(() => {
    const yaml = (input || "").trim()
    if (yaml.length === 0) return { output: "", error: "" }
    try {
      const parsed = parseYAML(yaml)
      const json = JSON.stringify(parsed, null, 2)
      return { output: json, error: "" }
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Invalid YAML") : "Invalid YAML"
      return { output: "", error: msg }
    }
  }, [input])

  const handleCopy = useCallback(async () => {
    if ((output || "").length === 0) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").length === 0) return
    setInput(output)
  }, [output])

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_YAML)
  }, [])

  return (
    <div className="space-y-6">
      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="yaml-input" className="text-base font-semibold flex items-center gap-2">
                <FileCode className="size-4" />
                YAML Input
              </Label>
              <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs gap-1">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="yaml-input"
              placeholder="Paste your YAML here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[350px] sm:min-h-[420px] resize-y font-mono text-sm leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <FileCode className="size-4" />
                JSON Output
              </Label>
            </div>
            <div className="relative min-h-[350px] sm:min-h-[420px] rounded-md border border-input bg-muted/50 p-3 overflow-auto max-h-96">
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

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">YAML Parse Error</p>
              <p className="text-xs text-red-700/80 dark:text-red-400/80 break-all">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy JSON"}
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
            <Button onClick={handleSwap} variant="outline" size="sm" disabled={(output || "").length === 0} className="gap-1.5">
              <ArrowLeftRight className="size-4" />
              Swap
            </Button>
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
              All YAML parsing and JSON conversion happen entirely in your browser with a built-in parser. No external libraries, no server, no tracking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
