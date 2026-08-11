"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Code,
  Copy,
  RotateCcw,
  ArrowLeftRight,
  Shield,
  Check,
} from "lucide-react"

// --- Mode type ---

type Mode = "encode" | "decode"

// --- Common HTML entities reference table ---

const ENTITY_TABLE: { char: string; entity: string; description: string }[] = [
  { char: "&", entity: "&amp;", description: "Ampersand" },
  { char: "<", entity: "&lt;", description: "Less than" },
  { char: ">", entity: "&gt;", description: "Greater than" },
  { char: '"', entity: "&quot;", description: "Double quote" },
  { char: "'", entity: "&#039;", description: "Single quote" },
  { char: " ", entity: "&nbsp;", description: "Non-breaking space" },
  { char: "©", entity: "&copy;", description: "Copyright" },
  { char: "®", entity: "&reg;", description: "Registered" },
  { char: "™", entity: "&trade;", description: "Trademark" },
  { char: "€", entity: "&euro;", description: "Euro sign" },
  { char: "£", entity: "&pound;", description: "Pound sign" },
  { char: "¥", entity: "&yen;", description: "Yen sign" },
  { char: "¢", entity: "&cent;", description: "Cent sign" },
  { char: "§", entity: "&sect;", description: "Section sign" },
  { char: "±", entity: "&plusmn;", description: "Plus-minus" },
  { char: "×", entity: "&times;", description: "Multiplication" },
  { char: "÷", entity: "&divide;", description: "Division" },
  { char: "°", entity: "&deg;", description: "Degree" },
  { char: "←", entity: "&larr;", description: "Left arrow" },
  { char: "→", entity: "&rarr;", description: "Right arrow" },
]

// --- Encode: replace special chars with HTML entities ---

function encodeHtmlEntities(str: string): { result: string; count: number } {
  if ((str || "").length === 0) return { result: "", count: 0 }
  let count = 0
  const encoded = (str || "")
    // & must be encoded first to avoid double-encoding
    .replace(/&/g, () => { count++; return "&amp;" })
    .replace(/</g, () => { count++; return "&lt;" })
    .replace(/>/g, () => { count++; return "&gt;" })
    .replace(/"/g, () => { count++; return "&quot;" })
    .replace(/'/g, () => { count++; return "&#039;" })
  return { result: encoded, count }
}

// --- Decode: convert HTML entities back to characters ---

function decodeHtmlEntities(str: string): { result: string; count: number } {
  if ((str || "").length === 0) return { result: "", count: 0 }
  let count = 0
  // Count entities before decoding
  const entityMatches = (str || "").match(/&[a-zA-Z]+;|&#\d+;|&#x[0-9a-fA-F]+;/g)
  count = entityMatches ? entityMatches.length : 0

  // Use a textarea to decode via the browser's native HTML parser
  const textarea = document.createElement("textarea")
  textarea.innerHTML = str
  return { result: textarea.value, count }
}

// --- Count entities in a string ---

function countEntitiesInString(str: string): number {
  const matches = (str || "").match(/&[a-zA-Z]+;|&#\d+;|&#x[0-9a-fA-F]+;/g)
  return matches ? matches.length : 0
}

// --- Component ---

export function HtmlEncoderTool() {
  const [input, setInput] = useState("")
  const [manualOutput, setManualOutput] = useState("")
  const [mode, setMode] = useState<Mode>("encode")
  const [manualEntityCount, setManualEntityCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [autoEncode, setAutoEncode] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // --- Auto-encode derived output ---

  const autoResult = useMemo(() => {
    if (!autoEncode) return { output: "", count: 0 }
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) return { output: "", count: 0 }
    if (mode === "encode") {
      return encodeHtmlEntities(trimmed)
    }
    return decodeHtmlEntities(trimmed)
  }, [input, mode, autoEncode])

  // Display auto or manual
  const output = autoEncode ? autoResult.output : manualOutput
  const entityCount = autoEncode ? autoResult.count : manualEntityCount

  // --- Stats ---

  const inputLength = useMemo(() => (input || "").length, [input])
  const outputLength = useMemo(() => (output || "").length, [output])
  const outputEntityCount = useMemo(() => {
    if (mode === "encode") return entityCount
    return countEntitiesInString(input)
  }, [entityCount, input, mode])

  // --- Actions ---

  const handleEncode = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setManualOutput("")
      setManualEntityCount(0)
      return
    }
    const { result, count } = encodeHtmlEntities(trimmed)
    setManualOutput(result)
    setManualEntityCount(count)
  }, [input])

  const handleDecode = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setManualOutput("")
      setManualEntityCount(0)
      return
    }
    const { result, count } = decodeHtmlEntities(trimmed)
    setManualOutput(result)
    setManualEntityCount(count)
  }, [input])

  const handleCopy = useCallback(async () => {
    const trimmed = (output || "").trim()
    if (trimmed.length === 0) return
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
    setManualOutput("")
    setManualEntityCount(0)
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").trim().length === 0) return
    const newMode: Mode = mode === "encode" ? "decode" : "encode"
    setMode(newMode)
    setInput(output)
    setManualOutput("")
    setManualEntityCount(0)
  }, [output, mode])

  const handleInputChange = useCallback((v: string) => {
    setInput(v)
    if (!autoEncode) {
      setManualOutput("")
      setManualEntityCount(0)
    }
  }, [autoEncode])

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* Mode toggle + actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mode button group */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => { setMode("encode"); setManualOutput(""); setManualEntityCount(0) }}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  mode === "encode"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => { setMode("decode"); setManualOutput(""); setManualEntityCount(0) }}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  mode === "decode"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                Decode
              </button>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-6" />

            <Button onClick={handleEncode} size="sm" className="gap-1.5" disabled={mode !== "encode"}>
              <Code className="size-4" />
              Encode
            </Button>
            <Button onClick={handleDecode} size="sm" variant="outline" className="gap-1.5" disabled={mode !== "decode"}>
              <Shield className="size-4" />
              Decode
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
            <Button onClick={handleSwap} variant="outline" size="sm" className="gap-1.5">
              <ArrowLeftRight className="size-4" />
              Swap
            </Button>
            <Button onClick={handleClear} variant="outline" size="sm" className="gap-1.5">
              <RotateCcw className="size-4" />
              Clear
            </Button>
          </div>

          {/* Auto-encode toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-encode"
                checked={autoEncode}
                onCheckedChange={setAutoEncode}
              />
              <Label htmlFor="auto-encode" className="text-sm font-medium text-muted-foreground cursor-pointer">
                Auto-{mode === "encode" ? "encode" : "decode"} as you type
              </Label>
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
              <Label htmlFor="html-input" className="text-base font-semibold flex items-center gap-2">
                <Code className="size-4" />
                {mode === "encode" ? "Text Input" : "Entity-Encoded Input"}
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {inputLength.toLocaleString()} chars
              </Badge>
            </div>
            <Textarea
              ref={textareaRef}
              id="html-input"
              placeholder={mode === "encode"
                ? "Enter text to encode (e.g., <div class=\"test\">Hello & Welcome</div>)..."
                : "Paste HTML entities to decode (e.g., &lt;div class=&quot;test&quot;&gt;Hello &amp; Welcome&lt;/div&gt;)..."
              }
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
                <Shield className="size-4" />
                {mode === "encode" ? "Encoded Output" : "Decoded Output"}
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {outputLength.toLocaleString()} chars
              </Badge>
            </div>
            <Textarea
              readOnly
              placeholder={mode === "encode"
                ? "HTML entity-encoded output will appear here..."
                : "Decoded readable text will appear here..."
              }
              value={output}
              className="min-h-[300px] sm:min-h-[380px] resize-y font-mono text-sm leading-relaxed bg-muted/50"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Stats:</span>
            <Badge variant="outline" className="tabular-nums text-xs">
              Input: {inputLength.toLocaleString()} chars
            </Badge>
            <Badge variant="outline" className="tabular-nums text-xs">
              Output: {outputLength.toLocaleString()} chars
            </Badge>
            <Badge variant="outline" className="tabular-nums text-xs">
              Entities {mode === "encode" ? "converted" : "decoded"}: {outputEntityCount.toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Common HTML Entities Reference Table */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <Code className="size-4" />
            Common HTML Entities
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-3 text-left font-medium text-muted-foreground">Character</th>
                  <th className="py-2 px-3 text-left font-medium text-muted-foreground">Entity</th>
                  <th className="py-2 px-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {ENTITY_TABLE.map((item) => (
                  <tr key={item.entity} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-1.5 px-3 font-mono text-foreground">{item.char === " " ? "\u00A0" : item.char}</td>
                    <td className="py-1.5 px-3 font-mono text-primary font-medium">{item.entity}</td>
                    <td className="py-1.5 px-3 text-muted-foreground hidden sm:table-cell">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              All HTML entity encoding and decoding is performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}