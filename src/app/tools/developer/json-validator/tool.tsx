"use client"

import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  CheckCircle,
  XCircle,
  Copy,
  RotateCcw,
  AlertTriangle,
  Shield,
  Check,
} from "lucide-react"

// --- Sample Data ---

const VALID_SAMPLE = `{
  "company": "FreeKit",
  "founded": 2024,
  "active": true,
  "version": null,
  "tools": [
    {
      "name": "JSON Formatter",
      "category": "developer",
      "popular": true
    },
    {
      "name": "Color Picker",
      "category": "css",
      "popular": true
    },
    {
      "name": "Word Counter",
      "category": "text",
      "popular": false
    }
  ],
  "stats": {
    "totalTools": 55,
    "categories": 7,
    "monthlyUsers": 15000
  },
  "tags": ["free", "online", "tools", "no-signup"]
}`

const INVALID_SAMPLE = `{
  "name": "Broken JSON",
  "version": 1.0,
  'unquoted_key': "single quotes not allowed",
  "items": [1, 2, 3,, 4],
  "trailing_comma": "oops",
  "missing_bracket": [1, 2
}`

// --- Common JSON Errors for Tips ---

const COMMON_ERRORS = [
  { title: "Trailing comma", desc: '`{"a": 1,}` — Remove the comma after the last item' },
  { title: "Single quotes", desc: "`{'key': 'value'}` — Use double quotes: `{\"key\": \"value\"}`" },
  { title: "Unquoted keys", desc: '`{key: "value"}` — Keys must be double-quoted: `{"key": "value"}`' },
  { title: "Comments not allowed", desc: "`// comment` or `/* */` — Remove all comments from JSON" },
  { title: "undefined / NaN", desc: '`{"val": undefined}` — Use `null` instead of `undefined` or `NaN`' },
  { title: "Missing comma", desc: '`{"a": 1 "b": 2}` — Add a comma between items: `{"a": 1, "b": 2}`' },
  { title: "Unescaped newlines", desc: "Strings cannot contain literal newlines — use `\\n` instead" },
  { title: "Missing brackets/braces", desc: "Ensure every `{` has a `}` and every `[` has a `]`" },
]

// --- Helper: Parse error with line & column ---

interface ParseError {
  message: string
  line: number
  column: number
}

function getErrorDetails(input: string): ParseError | null {
  const trimmed = (input || "").trim()
  if (trimmed.length === 0) return null
  try {
    JSON.parse(trimmed)
    return null
  } catch (e: unknown) {
    const msg = e instanceof Error ? (e.message || "Unknown error") : "Unknown error"
    // Try to extract position from error message
    const posMatch = msg.match(/position\s+(\d+)/i)
    const colMatch = msg.match(/column\s+(\d+)/i)
    let line = 1
    let column = 1
    if (posMatch) {
      const pos = parseInt((posMatch[1] || "0"), 10)
      const beforePos = trimmed.substring(0, pos)
      const lines = beforePos.split("\n")
      line = lines.length
      column = (lines[lines.length - 1] || "").length + 1
    } else if (colMatch) {
      const lineMatch = msg.match(/line\s+(\d+)/i)
      if (lineMatch) line = parseInt((lineMatch[1] || "1"), 10)
      column = parseInt((colMatch[1] || "1"), 10)
    } else {
      // Fallback: try to find line number in common error patterns
      const lineMatch = msg.match(/line\s+(\d+)/i)
      if (lineMatch) line = parseInt((lineMatch[1] || "1"), 10)
    }
    return { message: msg, line, column }
  }
}

// --- Helper: Count keys recursively ---

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

// --- Helper: Count arrays recursively ---

function countArrays(data: unknown): number {
  if (data === null || data === undefined) return 0
  if (Array.isArray(data)) {
    return 1 + data.reduce((sum: number, item: unknown) => sum + countArrays(item), 0)
  }
  if (typeof data === "object") {
    const obj = data as Record<string, unknown>
    return Object.values(obj).reduce(
      (sum: number, val: unknown) => sum + countArrays(val),
      0
    )
  }
  return 0
}

// --- Helper: Count objects recursively ---

function countObjects(data: unknown): number {
  if (data === null || data === undefined) return 0
  if (Array.isArray(data)) {
    return data.reduce((sum: number, item: unknown) => sum + countObjects(item), 0)
  }
  if (typeof data === "object") {
    const obj = data as Record<string, unknown>
    return (
      1 +
      Object.values(obj).reduce(
        (sum: number, val: unknown) => sum + countObjects(val),
        0
      )
    )
  }
  return 0
}

// --- Helper: Get max depth ---

function getMaxDepth(data: unknown, current: number = 0): number {
  if (data === null || data === undefined) return current
  if (typeof data !== "object") return current
  if (Array.isArray(data)) {
    if (data.length === 0) return current + 1
    return Math.max(
      ...data.map((item) => getMaxDepth(item, current + 1))
    )
  }
  const obj = data as Record<string, unknown>
  const values = Object.values(obj)
  if (values.length === 0) return current + 1
  return Math.max(
    ...values.map((val) => getMaxDepth(val, current + 1))
  )
}

// --- Component ---

export function JsonValidatorTool() {
  const [input, setInput] = useState("")
  const [autoValidate, setAutoValidate] = useState(false)
  const [result, setResult] = useState<{
    valid: boolean
    error: ParseError | null
    stats: {
      keys: number
      depth: number
      arrays: number
      objects: number
      size: number
    } | null
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // --- Validate logic ---

  const validate = useCallback((value: string) => {
    const trimmed = (value || "").trim()
    if (trimmed.length === 0) {
      setResult(null)
      return
    }
    const error = getErrorDetails(trimmed)
    if (error) {
      setResult({ valid: false, error, stats: null })
    } else {
      const parsed = JSON.parse(trimmed)
      const stats = {
        keys: countKeys(parsed),
        depth: getMaxDepth(parsed),
        arrays: countArrays(parsed),
        objects: countObjects(parsed),
        size: new TextEncoder().encode(trimmed).length,
      }
      setResult({ valid: true, error: null, stats })
    }
  }, [])

  // --- Auto-validate on input change ---

  useEffect(() => {
    if (!autoValidate) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      validate(input)
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [input, autoValidate, validate])

  // --- Handlers ---

  const handleValidate = useCallback(() => {
    validate(input)
  }, [input, validate])

  const handleClear = useCallback(() => {
    setInput("")
    setResult(null)
    setCopied(false)
  }, [])

  const handleCopy = useCallback(async () => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) return
    try {
      const parsed = JSON.parse(trimmed)
      const formatted = JSON.stringify(parsed, null, 2)
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: copy raw input
      try {
        await navigator.clipboard.writeText(trimmed)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // ignore
      }
    }
  }, [input])

  const handleLoadValidSample = useCallback(() => {
    setInput(VALID_SAMPLE)
    setResult(null)
    setCopied(false)
  }, [])

  const handleLoadInvalidSample = useCallback(() => {
    setInput(INVALID_SAMPLE)
    setResult(null)
    setCopied(false)
  }, [])

  const handleInputChange = useCallback((v: string) => {
    setInput(v)
    if (!autoValidate) {
      setResult(null)
    }
    setCopied(false)
  }, [autoValidate])

  const inputBytes = useMemo(
    () => new TextEncoder().encode(input || "").length,
    [input]
  )

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-input" className="text-base font-semibold">
              Paste Your JSON
            </Label>
            <Badge variant="secondary" className="tabular-nums text-xs">
              {inputBytes.toLocaleString()} bytes
            </Badge>
          </div>
          <Textarea
            id="json-input"
            placeholder={'{\n  "paste": "your JSON data here",\n  "or": "click a sample button below"\n}'}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[240px] sm:min-h-[300px] resize-y font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        </CardContent>
      </Card>

      {/* Validate Button (primary, large, centered) */}
      <div className="flex justify-center">
        <Button
          onClick={handleValidate}
          size="lg"
          className="gap-2 px-8 text-base"
        >
          <CheckCircle className="size-5" />
          Validate JSON
        </Button>
      </div>

      {/* Action buttons row */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          disabled={(input || "").trim().length === 0}
          className="gap-1.5"
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
          {copied ? "Copied!" : "Copy Formatted JSON"}
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          disabled={(input || "").trim().length === 0}
          className="gap-1.5"
        >
          <RotateCcw className="size-4" />
          Clear
        </Button>
        <Separator orientation="vertical" className="hidden sm:block h-6" />
        <Button
          onClick={handleLoadValidSample}
          variant="ghost"
          size="sm"
          className="gap-1.5"
        >
          <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400" />
          Load Sample (Valid)
        </Button>
        <Button
          onClick={handleLoadInvalidSample}
          variant="ghost"
          size="sm"
          className="gap-1.5"
        >
          <XCircle className="size-4 text-red-500 dark:text-red-400" />
          Load Sample (Invalid)
        </Button>
        <Separator orientation="vertical" className="hidden sm:block h-6" />
        <div className="flex items-center gap-2">
          <Switch
            id="auto-validate"
            checked={autoValidate}
            onCheckedChange={setAutoValidate}
          />
          <Label
            htmlFor="auto-validate"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Auto-validate
          </Label>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <>
          {result.valid && result.stats ? (
            /* Valid Result */
            <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                      Valid JSON
                    </p>
                    <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80">
                      Your JSON is syntactically correct and ready to use.
                    </p>
                  </div>
                </div>
                <Separator className="bg-emerald-200/60 dark:bg-emerald-900/30" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/30 bg-white/60 dark:bg-black/20 p-3 text-center">
                    <p className="text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                      {result.stats.keys.toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                      Keys
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/30 bg-white/60 dark:bg-black/20 p-3 text-center">
                    <p className="text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                      {result.stats.depth}
                    </p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                      Depth
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/30 bg-white/60 dark:bg-black/20 p-3 text-center">
                    <p className="text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                      {result.stats.arrays}
                    </p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                      Arrays
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/30 bg-white/60 dark:bg-black/20 p-3 text-center">
                    <p className="text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                      {result.stats.objects}
                    </p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                      Objects
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-200/60 dark:border-emerald-900/30 bg-white/60 dark:bg-black/20 p-3 text-center col-span-2 sm:col-span-1">
                    <p className="text-2xl font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                      {result.stats.size.toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
                      Bytes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Invalid Result */
            result.error && (
              <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
                <CardContent className="p-4 sm:p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <XCircle className="size-6 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <p className="text-lg font-semibold text-red-800 dark:text-red-300">
                        Invalid JSON
                      </p>
                      <p className="text-sm text-red-700/80 dark:text-red-400/80 break-all">
                        {result.error.message}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className="border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs"
                        >
                          Line {result.error.line}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs"
                        >
                          Column {result.error.column}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </>
      )}

      {/* Common JSON Errors - Quick Tips */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold">
              Common JSON Errors &amp; Quick Fixes
            </h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {COMMON_ERRORS.map((err) => (
              <div
                key={err.title}
                className="rounded-lg border border-border bg-muted/30 p-3 space-y-1"
              >
                <p className="text-sm font-medium">{err.title}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {err.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your JSON Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All validation and analysis are performed entirely in your browser
              using client-side JavaScript. No data is sent to any server, stored,
              or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}