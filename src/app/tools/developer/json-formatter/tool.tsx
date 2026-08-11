"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Braces,
  Copy,
  RotateCcw,
  Minimize2,
  Check,
  AlertCircle,
  Sparkles,
  FileJson,
  Shield,
} from "lucide-react"

// --- Sample JSON ---

const SAMPLE_JSON = `{
  "name": "FreeKit",
  "version": "1.0.0",
  "description": "A collection of free online tools",
  "features": ["JSON Formatter", "Base64 Encoder", "Color Picker"],
  "author": {
    "name": "Faisal Hossain",
    "role": "Founder",
    "social": {
      "twitter": "@freekit",
      "github": "freekit"
    }
  },
  "stats": {
    "tools": 55,
    "categories": 7,
    "users": 10000,
    "isFree": true,
    "price": null
  }
}`

// --- Indentation Types ---

type IndentType = "2 spaces" | "4 spaces" | "tab"

function getIndentValue(indent: IndentType): string {
  switch (indent) {
    case "2 spaces":
      return "  "
    case "4 spaces":
    return "    "
    case "tab":
      return "\t"
  }
}

// --- Syntax Highlighting ---

function escapeHtml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function syntaxHighlight(json: string): string {
  const escaped = escapeHtml(json)
  return (escaped || "")
    .replace(
      /(&quot;)(.*?)(&quot;)\s*:/g,
      '<span class="text-sky-600 dark:text-sky-400">$1$2$3</span>:'
    )
    .replace(
      /:\s*(&quot;)(.*?)(&quot;)/g,
      ': <span class="text-emerald-600 dark:text-emerald-400">$1$2$3</span>'
    )
    .replace(
      /:\s*(\d+\.?\d*)/g,
      ': <span class="text-amber-600 dark:text-amber-400">$1</span>'
    )
    .replace(
      /:\s*(true|false)/g,
      ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
    )
    .replace(
      /:\s*(null)/g,
      ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
    )
}

// --- Count Keys ---

function countKeys(data: unknown): number {
  if (data === null || data === undefined) return 0
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      return data.reduce((sum: number, item: unknown) => sum + countKeys(item), 0)
    }
    const obj = data as Record<string, unknown>
    const ownKeys = Object.keys(obj).length
    const childKeys = Object.values(obj).reduce(
      (sum: number, val: unknown) => sum + countKeys(val),
      0
    )
    return ownKeys + childKeys
  }
  return 0
}

// --- Parse Error with Line Number ---

function getErrorWithLine(input: string): { message: string; line?: number } | null {
  const trimmed = (input || "").trim()
  if (trimmed.length === 0) return null
  try {
    JSON.parse(trimmed)
    return null
  } catch (e: unknown) {
    const msg = e instanceof Error ? (e.message || "") : "Unknown error"
    // Try to extract position from error message
    const posMatch = msg.match(/position\s+(\d+)/i)
    let line: number | undefined
    if (posMatch) {
      const pos = parseInt((posMatch[1] || "0"), 10)
      const beforePos = trimmed.substring(0, pos)
      line = (beforePos.match(/\n/g) || []).length + 1
    }
    return { message: msg, line }
  }
}

// --- Component ---

export function JsonFormatterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [indent, setIndent] = useState<IndentType>("2 spaces")
  const [error, setError] = useState<null | { message: string; line?: number }>(null)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  // --- Computed values ---

  const inputBytes = useMemo(
    () => new TextEncoder().encode(input || "").length,
    [input]
  )

  const outputBytes = useMemo(
    () => new TextEncoder().encode(output || "").length,
    [output]
  )

  const compressionRatio = useMemo(() => {
    if (inputBytes === 0 || outputBytes === 0) return null
    if (outputBytes >= inputBytes) return null
    const ratio = ((1 - outputBytes / inputBytes) * 100).toFixed(1)
    return `${ratio}%`
  }, [inputBytes, outputBytes])

  const keyCount = useMemo(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) return null
    try {
      const parsed = JSON.parse(trimmed)
      return countKeys(parsed)
    } catch {
      return null
    }
  }, [input])

  const highlightedOutput = useMemo(() => {
    if ((output || "").trim().length === 0) return ""
    return syntaxHighlight(output)
  }, [output])

  // --- Actions ---

  const formatJson = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setError(null)
      setOutput("")
      setIsValid(null)
      return
    }
    try {
      const parsed = JSON.parse(trimmed)
      const indentValue = getIndentValue(indent)
      const formatted = JSON.stringify(parsed, null, indentValue)
      setOutput(formatted)
      setError(null)
      setIsValid(true)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Invalid JSON") : "Invalid JSON"
      setError({ message: msg })
      setOutput("")
      setIsValid(false)
    }
  }, [input, indent])

  const minifyJson = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setError(null)
      setOutput("")
      setIsValid(null)
      return
    }
    try {
      const parsed = JSON.parse(trimmed)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError(null)
      setIsValid(true)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Invalid JSON") : "Invalid JSON"
      setError({ message: msg })
      setOutput("")
      setIsValid(false)
    }
  }, [input])

  const validateJson = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setError(null)
      setIsValid(null)
      return
    }
    const err = getErrorWithLine(trimmed)
    if (err) {
      setError(err)
      setIsValid(false)
    } else {
      setError(null)
      setIsValid(true)
    }
  }, [input])

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
    setError(null)
    setIsValid(null)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JSON)
    setError(null)
    setIsValid(null)
    setOutput("")
  }, [])

  const handleInputChange = useCallback((v: string) => {
    setInput(v)
    // Clear previous validation when input changes
    setError(null)
    setIsValid(null)
    setOutput("")
  }, [])

  const errorWithLine = useMemo(() => {
    if (!error) return null
    return getErrorWithLine(input)
  }, [error, input])

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Top action row */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={formatJson} size="sm" className="gap-1.5">
              <Sparkles className="size-4" />
              Format
            </Button>
            <Button onClick={minifyJson} variant="outline" size="sm" className="gap-1.5">
              <Minimize2 className="size-4" />
              Minify
            </Button>
            <Button onClick={validateJson} variant="outline" size="sm" className="gap-1.5">
              <Check className="size-4" />
              Validate
            </Button>
            <Separator orientation="vertical" className="hidden sm:block h-6" />
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              disabled={(output || "").trim().length === 0}
              className="gap-1.5"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Output"}
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
            <Button onClick={handleLoadSample} variant="ghost" size="sm" className="gap-1.5 ml-auto">
              <FileJson className="size-4" />
              Load Sample
            </Button>
          </div>

          {/* Indentation selector */}
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Indentation:</Label>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["2 spaces", "4 spaces", "tab"] as IndentType[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setIndent(opt)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    indent === opt
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  } ${opt !== "tab" ? "border-r border-border" : ""}`}
                >
                  {opt === "tab" ? "Tab" : opt}
                </button>
              ))}
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
                <Braces className="size-4" />
                Input JSON
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {inputBytes.toLocaleString()} bytes
              </Badge>
            </div>
            <Textarea
              id="json-input"
              placeholder='{"paste": "your JSON here", "or": "click Load Sample"}'
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
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
                Formatted Output
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {outputBytes.toLocaleString()} bytes
              </Badge>
            </div>
            <div className="relative min-h-[300px] sm:min-h-[380px] rounded-md border border-input bg-muted/50 p-3 overflow-auto">
              {(highlightedOutput || "").trim().length > 0 ? (
                <pre
                  className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: highlightedOutput }}
                />
              ) : (
                <p className="text-sm text-muted-foreground font-mono">
                  Formatted JSON will appear here...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {errorWithLine && (
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                Invalid JSON
                {errorWithLine.line !== undefined && (
                  <span className="ml-2 font-normal">
                    (Line {errorWithLine.line})
                  </span>
                )}
              </p>
              <p className="text-xs text-red-700/80 dark:text-red-400/80 break-all">
                {errorWithLine.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Success */}
      {isValid === true && (output || "").trim().length === 0 && (
        <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="p-4 flex items-center gap-3">
            <Check className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              Valid JSON — your JSON syntax is correct!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Stats:</span>
            <Badge variant="outline" className="tabular-nums text-xs">
              Input: {inputBytes.toLocaleString()} bytes
            </Badge>
            <Badge variant="outline" className="tabular-nums text-xs">
              Output: {outputBytes.toLocaleString()} bytes
            </Badge>
            {compressionRatio && (
              <Badge variant="outline" className="tabular-nums text-xs">
                Minified: -{compressionRatio}
              </Badge>
            )}
            {keyCount !== null && (
              <Badge variant="outline" className="tabular-nums text-xs">
                {keyCount.toLocaleString()} {keyCount === 1 ? "key" : "keys/elements"}
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
              100% Private — Your JSON Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All formatting, validation, and minification are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}