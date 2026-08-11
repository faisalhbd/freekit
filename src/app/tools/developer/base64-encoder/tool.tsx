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
  Lock,
  Copy,
  RotateCcw,
  ArrowLeftRight,
  Upload,
  Shield,
  Check,
  AlertCircle,
} from "lucide-react"

// --- Mode type ---

type Mode = "encode" | "decode"

// --- Base64 encode with UTF-8 support ---

function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder()
  const uint8 = encoder.encode(str)
  let binary = ""
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i] || 0)
  }
  return btoa(binary)
}

// --- Base64 decode with UTF-8 support ---

function base64ToUtf8(b64: string): string {
  const binary = atob(b64)
  const uint8 = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    uint8[i] = binary.charCodeAt(i)
  }
  const decoder = new TextDecoder()
  return decoder.decode(uint8)
}

// --- Validate Base64 string ---

function isValidBase64(str: string): boolean {
  const trimmed = (str || "").trim().replace(/\s/g, "")
  if (trimmed.length === 0) return false
  // Base64 regex: only valid chars, length multiple of 4, proper padding
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
  if (!base64Regex.test(trimmed)) return false
  // Check length is multiple of 4
  if (trimmed.length % 4 !== 0) return false
  // Verify with atob
  try {
    atob(trimmed)
    return true
  } catch {
    return false
  }
}

// --- File to Base64 data URI ---

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = (reader.result || "") as string
      resolve(result)
    }
    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }
    reader.readAsDataURL(file)
  })
}

// --- Component ---

export function Base64EncoderTool() {
  const [input, setInput] = useState("")
  const [manualOutput, setManualOutput] = useState("")
  const [mode, setMode] = useState<Mode>("encode")
  const [manualError, setManualError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [autoEncode, setAutoEncode] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // --- Auto-encode derived output/error ---

  const autoResult = useMemo(() => {
    if (!autoEncode) return { output: "", error: null as string | null }
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) return { output: "", error: null as string | null }
    try {
      if (mode === "encode") {
        return { output: utf8ToBase64(trimmed), error: null as string | null }
      }
      if (!isValidBase64(trimmed)) {
        return { output: "", error: "Invalid Base64 input. Check for characters outside the Base64 alphabet or incorrect padding." }
      }
      return { output: base64ToUtf8(trimmed), error: null as string | null }
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Encoding/decoding failed") : "Encoding/decoding failed"
      return { output: "", error: msg }
    }
  }, [input, mode, autoEncode])

  // Display auto or manual
  const output = autoEncode ? autoResult.output : manualOutput
  const error = autoEncode ? autoResult.error : manualError

  // --- Stats ---

  const inputLength = useMemo(() => (input || "").length, [input])
  const outputLength = useMemo(() => (output || "").length, [output])

  const sizeIncrease = useMemo(() => {
    if (inputLength === 0 || outputLength === 0) return null
    if (mode === "encode") {
      const pct = (((outputLength - inputLength) / (inputLength || 1)) * 100).toFixed(1)
      return `+${pct}%`
    }
    const pct = (((inputLength - outputLength) / (inputLength || 1)) * 100).toFixed(1)
    return `-${pct}%`
  }, [inputLength, outputLength, mode])

  // --- Actions ---

  const handleEncode = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setManualOutput("")
      setManualError(null)
      return
    }
    try {
      const encoded = utf8ToBase64(trimmed)
      setManualOutput(encoded)
      setManualError(null)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Encoding failed") : "Encoding failed"
      setManualError(msg)
      setManualOutput("")
    }
  }, [input])

  const handleDecode = useCallback(() => {
    const trimmed = (input || "").trim()
    if (trimmed.length === 0) {
      setManualOutput("")
      setManualError(null)
      return
    }
    try {
      if (!isValidBase64(trimmed)) {
        setManualError("Invalid Base64 input. Check for characters outside the Base64 alphabet or incorrect padding.")
        setManualOutput("")
        return
      }
      const decoded = base64ToUtf8(trimmed)
      setManualOutput(decoded)
      setManualError(null)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Decoding failed") : "Decoding failed"
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
    setFileName(null)
  }, [])

  const handleSwap = useCallback(() => {
    if ((output || "").trim().length === 0) return
    const newMode: Mode = mode === "encode" ? "decode" : "encode"
    setMode(newMode)
    setInput(output)
    setManualOutput("")
    setManualError(null)
    setFileName(null)
  }, [output, mode])

  const handleInputChange = useCallback((v: string) => {
    setInput(v)
    setFileName(null)
    if (!autoEncode) {
      setManualOutput("")
      setManualError(null)
    }
  }, [autoEncode])

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      const dataUri = await fileToDataUri(file)
      setInput(dataUri)
      setManualOutput(dataUri)
      setFileName(file.name)
      setMode("encode")
      setManualError(null)
    } catch (e: unknown) {
      const msg = e instanceof Error ? (e.message || "Failed to encode file") : "Failed to encode file"
      setManualError(msg)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
    // Reset input so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [handleFileUpload])

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
              <Lock className="size-4" />
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

          {/* Auto-encode toggle + File upload */}
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
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-4" />
                Upload File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>
          </div>

          {/* File name indicator */}
          {fileName && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs gap-1">
                <Upload className="size-3" />
                {fileName}
              </Badge>
              <span className="text-xs text-muted-foreground">encoded as data URI</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Input & Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="b64-input" className="text-base font-semibold flex items-center gap-2">
                <Lock className="size-4" />
                {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {inputLength.toLocaleString()} chars
              </Badge>
            </div>
            <div
              className={`relative rounded-md transition-colors ${isDragOver ? "ring-2 ring-primary bg-primary/5" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Textarea
                id="b64-input"
                placeholder={mode === "encode"
                  ? "Enter text to encode to Base64..."
                  : "Paste Base64 string to decode..."
                }
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                className="min-h-[300px] sm:min-h-[380px] resize-y font-mono text-sm leading-relaxed"
                spellCheck={false}
              />
              {isDragOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-md pointer-events-none">
                  <p className="text-sm font-medium text-primary">Drop file here to encode</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Shield className="size-4" />
                {mode === "encode" ? "Base64 Output" : "Decoded Text Output"}
              </Label>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {outputLength.toLocaleString()} chars
              </Badge>
            </div>
            <Textarea
              readOnly
              placeholder={mode === "encode"
                ? "Base64 encoded output will appear here..."
                : "Decoded plain text will appear here..."
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
                {mode === "decode" ? "Invalid Base64" : "Encoding Error"}
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
            {sizeIncrease && (
              <Badge variant="outline" className="tabular-nums text-xs">
                Size: {sizeIncrease}
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
              100% Private — Your Data Never Leaves Your Browser
            </p>
            <p className="mt-1 text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All Base64 encoding and decoding is performed entirely in your browser using client-side JavaScript. No data is sent to any server, stored, or tracked.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
