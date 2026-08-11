"use client"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { CaseSensitive, Copy, RotateCcw, ArrowLeftRight, Type, Check, Shield } from "lucide-react"

// --- Conversion Helpers ---

const TITLE_SMALL_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of",
  "and", "or", "but", "is", "are", "was", "were",
])

function splitIntoWords(line: string): string[] {
  // Split on non-alphanumeric sequences
  return (line || "").split(/[^a-zA-Z0-9]+/).filter((w) => w.length > 0)
}

function capitalize(word: string): string {
  if ((word || "").length === 0) return ""
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

// --- 12 Conversion Functions ---

function toUpperCase(text: string): string {
  return (text || "").toUpperCase()
}

function toLowerCase(text: string): string {
  return (text || "").toLowerCase()
}

function toTitleCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = (line || "").split(/(\s+)/)
      return words
        .map((word, idx) => {
          const trimmed = (word || "").trim()
          if (trimmed.length === 0) return word
          if (idx === 0 || !TITLE_SMALL_WORDS.has(trimmed.toLowerCase())) {
            return capitalize(trimmed)
          }
          return trimmed.toLowerCase()
        })
        .join("")
    })
    .join("\n")
}

function toSentenceCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const trimmed = (line || "").trim()
      if (trimmed.length === 0) return ""
      // Lowercase everything, then capitalize first letter
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
    })
    .join("\n")
}

function toCamelCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = splitIntoWords(line)
      if (words.length === 0) return ""
      return (
        words[0].toLowerCase() +
        words
          .slice(1)
          .map((w) => capitalize(w))
          .join("")
      )
    })
    .join("\n")
}

function toPascalCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = splitIntoWords(line)
      if (words.length === 0) return ""
      return words.map((w) => capitalize(w)).join("")
    })
    .join("\n")
}

function toSnakeCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = splitIntoWords(line)
      if (words.length === 0) return ""
      return words.map((w) => w.toLowerCase()).join("_")
    })
    .join("\n")
}

function toKebabCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = splitIntoWords(line)
      if (words.length === 0) return ""
      return words.map((w) => w.toLowerCase()).join("-")
    })
    .join("\n")
}

function toConstantCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = splitIntoWords(line)
      if (words.length === 0) return ""
      return words.map((w) => w.toUpperCase()).join("_")
    })
    .join("\n")
}

function toDotCase(text: string): string {
  return (text || "")
    .split(/\n/)
    .map((line) => {
      const words = splitIntoWords(line)
      if (words.length === 0) return ""
      return words.map((w) => w.toLowerCase()).join(".")
    })
    .join("\n")
}

function toAlternatingCase(text: string): string {
  let upper = false
  return (text || "")
    .split("")
    .map((ch) => {
      if (/[a-zA-Z]/.test(ch)) {
        upper = !upper
        return upper ? ch.toUpperCase() : ch.toLowerCase()
      }
      return ch
    })
    .join("")
}

function toInverseCase(text: string): string {
  return (text || "")
    .split("")
    .map((ch) => {
      if (ch === ch.toUpperCase()) return ch.toLowerCase()
      return ch.toUpperCase()
    })
    .join("")
}

// --- Button definitions ---

type CaseType = {
  label: string
  example: string
  fn: (text: string) => string
}

const CASE_TYPES: CaseType[] = [
  { label: "UPPERCASE", example: "HELLO WORLD", fn: toUpperCase },
  { label: "lowercase", example: "hello world", fn: toLowerCase },
  { label: "Title Case", example: "Hello World", fn: toTitleCase },
  { label: "Sentence case", example: "Hello world", fn: toSentenceCase },
  { label: "camelCase", example: "helloWorld", fn: toCamelCase },
  { label: "PascalCase", example: "HelloWorld", fn: toPascalCase },
  { label: "snake_case", example: "hello_world", fn: toSnakeCase },
  { label: "kebab-case", example: "hello-world", fn: toKebabCase },
  { label: "CONSTANT_CASE", example: "HELLO_WORLD", fn: toConstantCase },
  { label: "dot.case", example: "hello.world", fn: toDotCase },
  { label: "Alternating cAsE", example: "hElLo WoRlD", fn: toAlternatingCase },
  { label: "Inverse Case", example: "hELLO wORLD", fn: toInverseCase },
]

// --- Component ---

export function CaseConverterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [activeCase, setActiveCase] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleConvert = useCallback((caseType: CaseType) => {
    const result = caseType.fn(input)
    setOutput(result)
    setActiveCase(caseType.label)
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
    setActiveCase(null)
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").trim().length === 0) return
    setInput(output)
    setOutput("")
    setActiveCase(null)
  }, [output])

  return (
    <div className="space-y-6">
      {/* Input */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="case-input" className="text-base font-semibold flex items-center gap-2">
              <Type className="size-4" />
              Input Text
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {(input || "").length} chars
            </Badge>
          </div>
          <Textarea
            id="case-input"
            placeholder="Type or paste your text here, then click a conversion button below..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[160px] sm:min-h-[200px] resize-y text-base leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Conversion Buttons */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CaseSensitive className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Select Conversion</h3>
            {activeCase && (
              <Badge variant="outline" className="ml-auto text-xs tabular-nums">
                Active: {activeCase}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {CASE_TYPES.map((ct) => (
              <Button
                key={ct.label}
                variant={activeCase === ct.label ? "default" : "outline"}
                size="sm"
                onClick={() => handleConvert(ct)}
                className="text-xs sm:text-sm"
                title={`Example: ${ct.example}`}
              >
                {ct.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} disabled={(output || "").trim().length === 0}>
          {copied ? <Check className="size-4 mr-1.5" /> : <Copy className="size-4 mr-1.5" />}
          {copied ? "Copied!" : "Copy Output"}
        </Button>
        <Button variant="outline" size="sm" onClick={handleSwap} disabled={(output || "").trim().length === 0}>
          <ArrowLeftRight className="size-4 mr-1.5" />
          Swap
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear}>
          <RotateCcw className="size-4 mr-1.5" />
          Clear
        </Button>
      </div>

      {/* Output */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="case-output" className="text-base font-semibold flex items-center gap-2">
              <CaseSensitive className="size-4" />
              Output
              {activeCase && (
                <Badge variant="secondary" className="text-xs">{activeCase}</Badge>
              )}
            </Label>
            <Badge variant="secondary" className="tabular-nums">
              {(output || "").length} chars
            </Badge>
          </div>
          <Textarea
            id="case-output"
            value={output}
            readOnly
            placeholder="Converted text will appear here..."
            className="min-h-[160px] sm:min-h-[200px] resize-y text-base leading-relaxed bg-muted/50"
          />
        </CardContent>
      </Card>

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
              All case conversions are performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}