"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  FileCode2,
  Copy,
  Check,
  RotateCcw,
  ArrowLeftRight,
  Shield,
  AlertCircle,
} from "lucide-react"

// --- JSON to YAML Converter (no external deps) ---

// Characters that require quoting in YAML
const NEEDS_QUOTING = /[\s:{}\[\],&*?|<>!%@`#:\"',\\\n]/

function needsQuoting(value: string): boolean {
  if ((value || "").length === 0) return true
  if (NEEDS_QUOTING.test(value)) return true
  if (value === "true" || value === "false" || value === "True" || value === "False" ||
      value === "yes" || value === "no" || value === "Yes" || value === "No" ||
      value === "null" || value === "Null" || value === "~") return true
  if (/^-?\d+$/.test(value)) return true
  if (/^-?\d+\.\d+([eE][+-]?\d+)?$/.test(value)) return true
  return false
}

function quoteString(value: string): string {
  if (!needsQuoting(value)) return value
  return `"${(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
}

function valueToYAML(value: unknown, indent: number): string {
  const spaces = "  ".repeat(indent)

  if (value === null || value === undefined) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") return String(value)
  if (typeof value === "string") return quoteString(value)

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    const lines: string[] = []
    for (const item of value) {
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        // Object inside array - inline key-value on same line as dash
        const objLines = objectToYAML(item as Record<string, unknown>, 0)
        const firstLine = objLines[0] || ""
        const restLines = objLines.slice(1)
        lines.push(`${spaces}- ${firstLine}`)
        for (const rest of restLines) {
          lines.push(`${spaces}  ${rest}`)
        }
      } else if (Array.isArray(item)) {
        const innerLines = valueToYAML(item, 0).split("\n")
        const firstLine = innerLines[0] || ""
        const restLines = innerLines.slice(1)
        lines.push(`${spaces}- ${firstLine}`)
        for (const rest of restLines) {
          lines.push(`${spaces}  ${rest}`)
        }
      } else {
        lines.push(`${spaces}- ${valueToYAML(item, 0)}`)
      }
    }
    return lines.join("\n")
  }

  if (typeof value === "object") {
    return objectToYAML(value as Record<string, unknown>, indent).join("\n")
  }

  return String(value)
}

function objectToYAML(obj: Record<string, unknown>, indent: number): string[] {
  const spaces = "  ".repeat(indent)
  const lines: string[] = []

  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) {
      lines.push(`${spaces}${key}: null`)
    } else if (typeof val === "object" && !Array.isArray(val)) {
      lines.push(`${spaces}${key}:`)
      const nested = objectToYAML(val as Record<string, unknown>, indent + 1)
      lines.push(...nested)
    } else if (Array.isArray(val)) {
      if (val.length === 0) {
        lines.push(`${spaces}${key}: []`)
      } else {
        lines.push(`${spaces}${key}:`)
        const arrayYAML = valueToYAML(val, indent + 1)
        lines.push(arrayYAML)
      }
    } else {
      lines.push(`${spaces}${key}: ${valueToYAML(val, 0)}`)
    }
  }

  return lines
}

function convertToYAML(json: string): string {
  const parsed = JSON.parse(json)
  if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
    return objectToYAML(parsed as Record<string, unknown>, 0).join("\n")
  }
  return valueToYAML(parsed, 0)
}

// --- Sample JSON ---

const SAMPLE_JSON = JSON.stringify(
  {
    name: "FreeKit",
    version: "1.0.0",
    description: "A collection of free online tools",
    author: {
      name: "Faisal Hossain",
      role: "Founder",
    },
    features: ["JSON Formatter", "Base64 Encoder", "Color Picker", "Hash Generator"],
    stats: {
      tools: 55,
      categories: 7,
      is_free: true,
      price: null,
    },
  },
  null,
  2
)

// --- Component ---

export function JsonToYamlTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)

  const { output, error } = useMemo(() => {
    const json = (input || "").trim()
    if (json.length === 0) return { output: "", error: "" }
    try {
      const yaml = convertToYAML(json)
      return { output: yaml, error: "" }
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Invalid JSON") : "Invalid JSON"
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
    setInput(SAMPLE_JSON)
  }, [])

  return (
    <div className="space-y-6">
      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-input" className="text-base font-semibold flex items-center gap-2">
                <FileCode2 className="size-4" />
                JSON Input
              </Label>
              <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs gap-1">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="json-input"
              placeholder="Paste your JSON here..."
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
                <FileCode2 className="size-4" />
                YAML Output
              </Label>
            </div>
            <div className="relative min-h-[350px] sm:min-h-[420px] rounded-md border border-input bg-muted/50 p-3 overflow-auto max-h-96">
              {(output || "").trim().length > 0 ? (
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground font-mono">YAML output will appear here...</p>
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
              <p className="text-sm font-medium text-red-800 dark:text-red-300">JSON Parse Error</p>
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
              {copied ? "Copied!" : "Copy YAML"}
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
              All JSON parsing and YAML generation happen entirely in your browser with a built-in converter. No external libraries, no server, no tracking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}