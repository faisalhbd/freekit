"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Link as LinkIcon,
  Copy,
  RotateCcw,
  ArrowLeftRight,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react"

// --- Mode type ---

type Mode = "encode" | "decode"

// --- Common URL-encoded characters reference table ---

const ENCODED_CHARS: { char: string; encoded: string; description: string }[] = [
  { char: " ", encoded: "%20", description: "Space" },
  { char: "!", encoded: "%21", description: "Exclamation mark" },
  { char: "\"", encoded: "%22", description: "Double quote" },
  { char: "#", encoded: "%23", description: "Hash / fragment" },
  { char: "$", encoded: "%24", description: "Dollar sign" },
  { char: "%", encoded: "%25", description: "Percent sign" },
  { char: "&", encoded: "%26", description: "Ampersand" },
  { char: "'", encoded: "%27", description: "Single quote" },
  { char: "(", encoded: "%28", description: "Left parenthesis" },
  { char: ")", encoded: "%29", description: "Right parenthesis" },
  { char: "+", encoded: "%2B", description: "Plus sign" },
  { char: ",", encoded: "%2C", description: "Comma" },
  { char: "/", encoded: "%2F", description: "Forward slash" },
  { char: ":", encoded: "%3A", description: "Colon" },
  { char: ";", encoded: "%3B", description: "Semicolon" },
  { char: "=", encoded: "%3D", description: "Equals sign" },
  { char: "?", encoded: "%3F", description: "Question mark" },
  { char: "@", encoded: "%40", description: "At sign" },
  { char: "<", encoded: "%3C", description: "Less than" },
  { char: ">", encoded: "%3E", description: "Greater than" },
]

// --- Count percent-encoded sequences in a string ---

function countEncodedChars(str: string): number {
  const matches = (str || "").match(/%[0-9A-Fa-f]{2}/g)
  return matches ? matches.length : 0
}

// --- Component ---

export function UrlEncoderTool() {
  const [input, setInput] = useState("")
  const [manualOutput, setManualOutput] = useState("")
  const [mode, setMode] = useState<Mode>("encode")
  const [manualError, setManualError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [autoEncode, setAutoEncode] = useState(false)
  const [encodeFullUrl, setEncodeFullUrl] = useState(false)

  // --- Auto-encode derived output/error ---

  const autoResult = useMemo(() => {
    if (!autoEncode) return { output: "", error: null as string | null }
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) return { output: "", error: null as string | null }
    try {
      if (mode === "encode") {
        const encoded = encodeFullUrl ? encodeURI(trimmed) : encodeURIComponent(trimmed)
        return { output: encoded, error: null as string | null }
      }
      const decoded = decodeURIComponent(trimmed)
      return { output: decoded, error: null as string | null }
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Encoding/decoding failed") : "Encoding/decoding failed"
      return { output: "", error: msg }
    }
  }, [input, mode, autoEncode, encodeFullUrl])

  // Display auto or manual
  const output = autoEncode ? autoResult.output : manualOutput
  const error = autoEncode ? autoResult.error : manualError

  // --- Stats ---

  const inputLength = useMemo(() => (input || "").length, [input])
  const outputLength = useMemo(() => (output || "").length, [output])
  const encodedCount = useMemo(() => {
    if (mode === "encode") {
      return countEncodedChars(output)
    }
    return countEncodedChars(input)
  }, [output, input, mode])

  // --- Actions ---

  const handleEncode = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setManualOutput("")
      setManualError(null)
      return
    }
    try {
      const encoded = encodeFullUrl ? encodeURI(trimmed) : encodeURIComponent(trimmed)
      setManualOutput(encoded)
      setManualError(null)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Encoding failed") : "Encoding failed"
      setManualError(msg)
      setManualOutput("")
    }
  }, [input, encodeFullUrl])

  const handleDecode = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setManualOutput("")
      setManualError(null)
      return
    }
    try {
      const decoded = decodeURIComponent(trimmed)
      setManualOutput(decoded)
      setManualError(null)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Decoding failed. Check for invalid percent-encoded sequences (e.g., %2G or incomplete %XX at end of string).") : "Decoding failed. Check for invalid percent-encoded sequences."
      setManualError(msg)
      setManualOutput("")
    }
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
    setManualError(null)
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").trim().length === 0) return
    const newMode: Mode = mode === "encode" ? "decode" : "encode"
    setMode(newMode)
    setInput(output)
    setManualOutput("")
    setManualError(null)
  }, [output, mode])

  const handleInputChange = useCallback((v: string) => {
    setInput(v)
    if (!autoEncode) {
      setManualOutput("")
      setManualError(null)
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
                onClick={() => { setMode("encode"); setManualError(null); }}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  mode === "encode"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => { setMode("decode"); setManualError(null); }}
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
              <LinkIcon className="size-4" />
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

          {/* Auto-encode toggle + Encode full URL toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
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
            {mode === "encode" && (
              <div className="flex items-center gap-2">
                <Switch
                  id="encode-full-url"
                  checked={encodeFullUrl}
                  onCheckedChange={setEncodeFullUrl}
                />
                <Label htmlFor="encode-full-url" className="text-sm font-medium text-muted-foreground cursor-pointer">
                  Encode full URL (encodeURI)
                </Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="url-input" className="text-base font-semibold flex items-center gap-2">
                <LinkIcon className="size-4" />
                {mode === "encode" ? "Text / URL Input" : "Percent-Encoded Input"}
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {inputLength.toLocaleString()} chars
              </Badge>
            </div>
            <Textarea
              id="url-input"
              placeholder={mode === "encode"
                ? "Enter text or URL to encode (e.g., hello world?name=John&city=New York)..."
                : "Paste percent-encoded string to decode (e.g., hello%20world%3Fname%3DJohn)..."
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
                ? "Percent-encoded output will appear here..."
                : "Decoded readable text will appear here..."
              }
              value={output}
              className="min-h-[300px] sm:min-h-[380px] resize-y font-mono text-sm leading-relaxed bg-muted/50"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {mode === "decode" ? "Invalid Encoded Input" : "Encoding Error"}
              </p>
              <p className="text-xs text-red-700/80 dark:text-red-400/80 break-all">
                {error}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
              {mode === "encode" ? "Encoded" : "Decoded"} chars: {encodedCount.toLocaleString()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Common URL-Encoded Characters Reference Table */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <LinkIcon className="size-4" />
            Common URL-Encoded Characters
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-3 text-left font-medium text-muted-foreground">Character</th>
                  <th className="py-2 px-3 text-left font-medium text-muted-foreground">Encoded</th>
                  <th className="py-2 px-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {ENCODED_CHARS.map((item) => (
                  <tr key={item.encoded} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-1.5 px-3 font-mono text-foreground">{item.char === " " ? "␣" : item.char}</td>
                    <td className="py-1.5 px-3 font-mono text-primary font-medium">{item.encoded}</td>
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
              All URL encoding and decoding is performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
