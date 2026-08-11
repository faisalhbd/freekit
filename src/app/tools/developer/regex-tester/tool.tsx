"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  CodeXml,
  Copy,
  RotateCcw,
  AlertCircle,
  Shield,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react"

// --- Flag type ---

interface RegexFlags {
  g: boolean
  i: boolean
  m: boolean
  s: boolean
  u: boolean
}

// --- Common patterns ---

const COMMON_PATTERNS: { label: string; pattern: string }[] = [
  { label: "Email", pattern: "[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}" },
  { label: "URL", pattern: "https?:\/\\/[\\w.-]+(?:\\.[\\w]{2,})(?:\/[^\\s]*)?" },
  { label: "Phone", pattern: "\\+?\\d{1,3}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}" },
  { label: "IPv4", pattern: "\\b(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){3}\\b" },
  { label: "Date", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
]

// --- Cheat sheet data ---

const CHEAT_SHEET: { category: string; items: { pattern: string; description: string }[] }[] = [
  {
    category: "Character Classes",
    items: [
      { pattern: ".", description: "Any character except newline" },
      { pattern: "\\d", description: "Digit [0-9]" },
      { pattern: "\\D", description: "Not a digit [^0-9]" },
      { pattern: "\\w", description: "Word character [a-zA-Z0-9_]" },
      { pattern: "\\W", description: "Not a word character" },
      { pattern: "\\s", description: "Whitespace character" },
      { pattern: "\\S", description: "Not a whitespace character" },
      { pattern: "[abc]", description: "Any of a, b, or c" },
      { pattern: "[^abc]", description: "Not a, b, or c" },
      { pattern: "[a-z]", description: "Character range a to z" },
    ],
  },
  {
    category: "Quantifiers",
    items: [
      { pattern: "*", description: "Zero or more (greedy)" },
      { pattern: "+", description: "One or more (greedy)" },
      { pattern: "?", description: "Zero or one (optional)" },
      { pattern: "{n}", description: "Exactly n times" },
      { pattern: "{n,}", description: "n or more times" },
      { pattern: "{n,m}", description: "Between n and m times" },
      { pattern: "*? +? ??", description: "Lazy (non-greedy) versions" },
    ],
  },
  {
    category: "Anchors & Boundaries",
    items: [
      { pattern: "^", description: "Start of string (or line with m flag)" },
      { pattern: "$", description: "End of string (or line with m flag)" },
      { pattern: "\\b", description: "Word boundary" },
      { pattern: "\\B", description: "Not a word boundary" },
    ],
  },
  {
    category: "Groups & References",
    items: [
      { pattern: "(abc)", description: "Capture group" },
      { pattern: "(?:abc)", description: "Non-capturing group" },
      { pattern: "(?<name>abc)", description: "Named capture group" },
      { pattern: "\\1", description: "Back-reference to group 1" },
      { pattern: "$1", description: "Replacement reference to group 1" },
      { pattern: "$&", description: "Entire match in replacement" },
    ],
  },
  {
    category: "Lookaround",
    items: [
      { pattern: "(?=...)", description: "Positive lookahead" },
      { pattern: "(?!...)", description: "Negative lookahead" },
      { pattern: "(?<=...)", description: "Positive lookbehind" },
      { pattern: "(?<!...)", description: "Negative lookbehind" },
    ],
  },
  {
    category: "Special Characters",
    items: [
      { pattern: "\\n", description: "Newline" },
      { pattern: "\\t", description: "Tab" },
      { pattern: "\\r", description: "Carriage return" },
      { pattern: "\\\\", description: "Literal backslash" },
      { pattern: "\\.", description: "Literal dot" },
    ],
  },
]

// --- Build flags string ---

function buildFlags(f: RegexFlags): string {
  let s = ""
  if (f.g) s += "g"
  if (f.i) s += "i"
  if (f.m) s += "m"
  if (f.s) s += "s"
  if (f.u) s += "u"
  return s
}

// --- Escape HTML ---

function escapeHtml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// --- Component ---

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState<RegexFlags>({ g: true, i: false, m: false, s: false, u: false })
  const [testString, setTestString] = useState("")
  const [replacement, setReplacement] = useState("")
  const [cheatOpen, setCheatOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // --- Compile regex & compute matches ---

  const result = useMemo(() => {
    const pat = (pattern || "").trim()
    const str = (testString || "").trim()

    if (pat.length === 0 || str.length === 0) {
      return { regex: null as RegExp | null, matches: [] as RegExpExecArray[], error: null as string | null }
    }

    try {
      const flagStr = buildFlags(flags)
      const regex = new RegExp(pat, flagStr)
      const matches: RegExpExecArray[] = []

      if (flags.g) {
        let m: RegExpExecArray | null
        // Safety limit to prevent infinite loops
        let count = 0
        while ((m = regex.exec(str)) !== null && count < 10000) {
          matches.push(m)
          // Prevent infinite loop on zero-length match
          if (m[0].length === 0) {
            regex.lastIndex++
          }
          count++
        }
        // Reset lastIndex
        regex.lastIndex = 0
      } else {
        const m = regex.exec(str)
        if (m) {
          matches.push(m)
        }
      }

      return { regex, matches, error: null }
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Invalid regex pattern") : "Invalid regex pattern"
      return { regex: null, matches: [] as RegExpExecArray[], error: msg }
    }
  }, [pattern, flags, testString])

  // --- Highlighted HTML ---

  const highlightedHtml = useMemo(() => {
    const str = (testString || "").trim()
    if (str.length === 0 || result.matches.length === 0) {
      return escapeHtml(str)
    }

    const sortedMatches = [...result.matches].sort((a, b) => a.index - b.index)
    let html = ""
    let lastIndex = 0

    for (const match of sortedMatches) {
      const start = match.index
      const end = start + match[0].length
      if (start < lastIndex) continue
      // Text before match
      html += escapeHtml(str.slice(lastIndex, start))
      // Matched text in <mark>
      html += `<mark class="bg-yellow-200 dark:bg-green-900/40 text-foreground rounded-sm px-0.5">${escapeHtml(match[0])}</mark>`
      lastIndex = end
    }
    // Remaining text
    html += escapeHtml(str.slice(lastIndex))
    return html
  }, [testString, result.matches])

  // --- Replacement preview ---

  const replacementPreview = useMemo(() => {
    const rep = (replacement || "").trim()
    const str = (testString || "").trim()
    if (!result.regex || str.length === 0 || rep.length === 0) return null
    try {
      return str.replace(result.regex, rep)
    } catch {
      return null
    }
  }, [result.regex, testString, replacement])

  // --- Capture groups ---

  const captureGroups = useMemo(() => {
    const pat = (pattern || "").trim()
    if (pat.length === 0 || result.matches.length === 0) return []

    // Find group names from the first match
    const firstMatch = result.matches[0]
    const groupCount = firstMatch.length - 1
    if (groupCount === 0) return []

    // Try to extract named groups
    const namedGroups: Map<number, string> = new Map()
    const namePattern = /\(\?<([\w$]+)>/g
    let nm: RegExpExecArray | null
    let unnamedIdx = 1
    while ((nm = namePattern.exec(pat)) !== null) {
      namedGroups.set(unnamedIdx, nm[1])
      unnamedIdx++
    }

    const groups: { index: number; name: string | null; values: string[] }[] = []
    for (let i = 1; i <= groupCount; i++) {
      const name = namedGroups.get(i) || null
      const values = result.matches.map((m) => (m[i] !== undefined ? m[i] : ""))
      groups.push({ index: i, name, values })
    }
    return groups
  }, [pattern, result.matches])

  // --- Handlers ---

  const toggleFlag = useCallback((flag: keyof RegexFlags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }))
  }, [])

  const handleInsertPattern = useCallback((pat: string) => {
    setPattern(pat)
  }, [])

  const handleClear = useCallback(() => {
    setPattern("")
    setTestString("")
    setReplacement("")
    setFlags({ g: true, i: false, m: false, s: false, u: false })
  }, [])

  const handleCopyPattern = useCallback(async () => {
    const p = (pattern || "").trim()
    if (p.length === 0) return
    try {
      const flagStr = buildFlags(flags)
      const fullPattern = flagStr.length > 0 ? `/${p}/${flagStr}` : p
      await navigator.clipboard.writeText(fullPattern)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [pattern, flags])

  const flagEntries: { key: keyof RegexFlags; label: string; description: string }[] = [
    { key: "g", label: "g", description: "Global" },
    { key: "i", label: "i", description: "Case insensitive" },
    { key: "m", label: "m", description: "Multiline" },
    { key: "s", label: "s", description: "Dotall" },
    { key: "u", label: "u", description: "Unicode" },
  ]

  return (
    <div className="space-y-6">
      {/* Pattern Input + Flags Row */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Pattern input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="regex-pattern" className="text-base font-semibold flex items-center gap-2">
                <CodeXml className="size-4" />
                Regex Pattern
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleCopyPattern}
                  variant="outline"
                  size="sm"
                  disabled={(pattern || "").trim().length === 0}
                  className="gap-1.5"
                >
                  {copied ? <Copy className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied!" : "Copy Regex"}
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
                  <RotateCcw className="size-3.5" />
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono text-muted-foreground select-none">/</span>
              <Input
                id="regex-pattern"
                placeholder="Enter your regex pattern, e.g. \d+"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono text-sm"
                spellCheck={false}
              />
              <span className="text-lg font-mono text-muted-foreground select-none">/</span>
              <span className="text-sm font-mono text-primary font-medium min-w-[3ch]">
                {buildFlags(flags) || "—"}
              </span>
            </div>
          </div>

          {/* Flags row */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Flags</Label>
            <div className="flex flex-wrap gap-2">
              {flagEntries.map((f) => (
                <button
                  key={f.key}
                  onClick={() => toggleFlag(f.key)}
                  title={f.description}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-mono font-medium transition-colors ${
                    flags[f.key]
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-xs font-sans ${flags[f.key] ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}>
                    {f.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Error display */}
          {result.error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 p-3">
              <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">Invalid Regex Pattern</p>
                <p className="text-xs text-red-700/80 dark:text-red-400/80 break-all font-mono">
                  {result.error}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Common Patterns Quick Insert */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Zap className="size-4 text-amber-500" />
            Common Patterns — click to insert
          </Label>
          <div className="flex flex-wrap gap-2">
            {COMMON_PATTERNS.map((p) => (
              <Button
                key={p.label}
                variant="outline"
                size="sm"
                onClick={() => handleInsertPattern(p.pattern)}
                className="gap-1.5 font-mono text-xs"
              >
                {p.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test String + Highlighted Results */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Test string input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="test-string" className="text-base font-semibold">
                Test String
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {(testString || "").length} chars
              </Badge>
            </div>
            <Textarea
              id="test-string"
              placeholder="Enter the text you want to test against the regex pattern..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[250px] sm:min-h-[300px] resize-y font-mono text-sm leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Highlighted matches */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Match Highlighting</Label>
              {result.matches.length > 0 && (
                <Badge variant="secondary" className="tabular-nums text-xs">
                  {result.matches.length} match{result.matches.length !== 1 ? "es" : ""}
                </Badge>
              )}
            </div>
            <div
              className="min-h-[250px] sm:min-h-[300px] rounded-md border border-border bg-muted/30 p-3 font-mono text-sm leading-relaxed overflow-auto max-h-[400px] whitespace-pre-wrap break-all"
            >
              {(testString || "").trim().length === 0 ? (
                <span className="text-muted-foreground italic">Highlighted matches will appear here...</span>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Match Details + Capture Groups */}
      {(result.matches.length > 0 || captureGroups.length > 0) && (
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Match details */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Match Details</Label>
                <Badge variant="outline" className="tabular-nums text-xs">
                  {result.matches.length} match{result.matches.length !== 1 ? "es" : ""}
                </Badge>
              </div>
              <div className="max-h-72 overflow-y-auto space-y-1.5">
                {result.matches.map((match, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs tabular-nums">
                        #{idx + 1}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Index: <span className="font-mono text-foreground">{match.index}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Length: <span className="font-mono text-foreground">{match[0].length}</span>
                      </span>
                    </div>
                    <p className="font-mono text-sm break-all bg-background rounded px-2 py-1">
                      {escapeHtml(match[0])}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capture groups */}
          {captureGroups.length > 0 && (
            <Card>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Capture Groups</Label>
                  <Badge variant="outline" className="tabular-nums text-xs">
                    {captureGroups.length} group{captureGroups.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2">
                  {captureGroups.map((group) => (
                    <div
                      key={group.index}
                      className="rounded-lg border border-border bg-muted/30 p-3 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-mono">
                          {group.name ? `$<${group.name}>` : `$${group.index}`}
                        </Badge>
                        {group.name && (
                          <span className="text-xs text-muted-foreground font-mono">
                            (Group {group.index})
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        {result.matches.map((match, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground tabular-nums w-8 shrink-0">
                              M{mIdx + 1}:
                            </span>
                            <span className="font-mono break-all">
                              {group.values[mIdx]
                                ? escapeHtml(group.values[mIdx])
                                : <span className="text-muted-foreground italic">undefined</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      )}

      {/* Replacement Preview */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="replacement" className="text-base font-semibold">
              Replacement String
            </Label>
            <Input
              id="replacement"
              placeholder="Enter replacement string. Use $1, $2 for groups, $& for full match, $$ for literal $."
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              className="font-mono text-sm"
              spellCheck={false}
            />
          </div>
          {replacementPreview !== null && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Replacement Preview</Label>
              <div className="rounded-md border border-border bg-muted/30 p-3 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all max-h-48 overflow-y-auto">
                {escapeHtml(replacementPreview)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Regex Cheat Sheet (Collapsible) */}
      <Card>
        <CardContent className="p-0">
          <button
            onClick={() => setCheatOpen(!cheatOpen)}
            className="flex w-full items-center justify-between p-4 sm:p-6 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="text-base font-semibold flex items-center gap-2">
              <CodeXml className="size-4" />
              Regex Cheat Sheet
            </span>
            {cheatOpen ? (
              <ChevronUp className="size-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-5 text-muted-foreground" />
            )}
          </button>
          {cheatOpen && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-6 max-h-[500px] overflow-y-auto">
              {CHEAT_SHEET.map((section) => (
                <div key={section.category} className="space-y-2">
                  <h3 className="text-sm font-semibold text-primary">{section.category}</h3>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item.pattern}
                        className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2"
                      >
                        <code className="shrink-0 font-mono text-sm font-semibold text-foreground min-w-[5rem]">
                          {item.pattern}
                        </code>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Shield className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              100% Private — Your Data Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All regex testing, matching, and replacement operations run entirely in your browser. Your patterns and test data are never sent to any server.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
