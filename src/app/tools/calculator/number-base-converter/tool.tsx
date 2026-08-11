"use client"

import { useState, useMemo, useCallback } from "react"
import { Hash, Copy, Check, Binary, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ─── Types ──────────────────────────────────────────────────────────────────

interface BaseConversion {
  decimal: string
  binary: string
  octal: string
  hex: string
  custom: string
  bits: number
  bytes: string[]
}

interface CopyState {
  binary: boolean
  octal: boolean
  decimal: boolean
  hex: boolean
}

type BaseOption = "2" | "8" | "10" | "16" | "custom"

const BASE_OPTIONS: { value: BaseOption; label: string; base: number }[] = [
  { value: "2", label: "Binary", base: 2 },
  { value: "8", label: "Octal", base: 8 },
  { value: "10", label: "Decimal", base: 10 },
  { value: "16", label: "Hexadecimal", base: 16 },
  { value: "custom", label: "Custom", base: 0 },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function getValidChars(base: number): string {
  if (base <= 10) return "0123456789".slice(0, base)
  return "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base)
}

function validateInput(input: string, base: number): string | null {
  if ((input || "") === "") return null
  const cleaned = (input || "").toUpperCase().replace(/\s/g, "")
  if (cleaned === "") return null

  const validChars = getValidChars(base)
  for (const char of cleaned) {
    if (!validChars.includes(char)) {
      return `Invalid digit '${char}' for base ${base}. Valid digits: ${validChars}`
    }
  }
  return null
}

function convertBase(value: string, fromBase: number): BaseConversion | null {
  if ((value || "") === "") return null
  const cleaned = (value || "").toUpperCase().replace(/\s/g, "")
  if (cleaned === "") return null

  // Parse to BigInt for precision with large numbers
  let decimalBigInt: bigint
  try {
    decimalBigInt = BigInt(parseInt(cleaned, fromBase).toString(10))
  } catch {
    return null
  }

  // Check if parsing was successful
  if (isNaN(Number(decimalBigInt)) && decimalBigInt !== 0n) return null

  const binaryStr = decimalBigInt.toString(2)
  const octalStr = decimalBigInt.toString(8)
  const decimalStr = decimalBigInt.toString(10)
  const hexStr = decimalBigInt.toString(16).toUpperCase()
  const customStr = decimalBigInt.toString(16).toUpperCase() // placeholder, overwritten

  // Format binary with spaces every 4 bits
  const formattedBinary = binaryStr.replace(/(.{4})/g, "$1 ").trim()

  // Calculate bit length
  const bits = binaryStr.length

  // Calculate byte representation (pad to full bytes)
  const paddedBinary = binaryStr.padStart(Math.ceil(bits / 8) * 8, "0")
  const bytes: string[] = []
  for (let i = 0; i < paddedBinary.length; i += 8) {
    const byteChunk = paddedBinary.slice(i, i + 8)
    const byteHex = BigInt("0b" + byteChunk).toString(16).toUpperCase().padStart(2, "0")
    bytes.push(`0x${byteHex}`)
  }

  return {
    decimal: decimalStr,
    binary: formattedBinary,
    octal: octalStr,
    hex: hexStr,
    custom: customStr,
    bits,
    bytes,
  }
}

function getBitLengthDisplay(bits: number): string {
  if (bits <= 8) return "8-bit"
  if (bits <= 16) return "16-bit"
  if (bits <= 32) return "32-bit"
  return "64-bit+"
}

function getBitLengthBadgeVariant(bits: number): "default" | "secondary" | "outline" | "destructive" {
  if (bits <= 8) return "default"
  if (bits <= 16) return "secondary"
  if (bits <= 32) return "outline"
  return "destructive"
}

// ─── Copy Button Component ──────────────────────────────────────────────────

function CopyButton({ text, copied, onCopy }: { text: string; copied: boolean; onCopy: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onCopy}
      className="h-8 w-8 p-0 shrink-0"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground" />
      )}
    </Button>
  )
}

// ─── Output Card Component ───────────────────────────────────────────────────

function OutputCard({
  label,
  value,
  copied,
  onCopy,
  icon,
  badge,
}: {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
  icon: React.ReactNode
  badge?: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-1.5">
              {icon}
            </div>
            <Label className="text-sm font-medium">{label}</Label>
            {badge && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {badge}
              </Badge>
            )}
          </div>
          <CopyButton text={value} copied={copied} onCopy={onCopy} />
        </div>
        <div className="font-mono text-sm bg-muted/50 rounded-md px-3 py-2 break-all select-all min-h-[2.5rem] flex items-center">
          {(value || "—")}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Quick Examples Component ───────────────────────────────────────────────

function QuickExamples({
  examples,
  onSelect,
}: {
  examples: { label: string; value: string; base: BaseOption; customBase?: number }[]
  onSelect: (value: string, base: BaseOption, customBase?: number) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Quick examples
      </p>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => onSelect(ex.value, ex.base, ex.customBase)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <Binary className="size-3" />
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function NumberBaseConverterTool() {
  const [inputValue, setInputValue] = useState("")
  const [inputBase, setInputBase] = useState<BaseOption>("10")
  const [customBaseValue, setCustomBaseValue] = useState("")
  const [copied, setCopied] = useState<CopyState>({
    binary: false,
    octal: false,
    decimal: false,
    hex: false,
  })

  // Resolve the actual base number
  const resolvedBase = useMemo(() => {
    if (inputBase !== "custom") {
      return BASE_OPTIONS.find((o) => o.value === inputBase)?.base ?? 10
    }
    const n = parseInt(customBaseValue || "10", 10)
    if (isNaN(n) || n < 2 || n > 36) return 10
    return n
  }, [inputBase, customBaseValue])

  // Validate input
  const validationError = useMemo(() => {
    if (inputBase === "custom") {
      const n = parseInt(customBaseValue || "10", 10)
      if (isNaN(n) || n < 2 || n > 36) {
        return "Custom base must be between 2 and 36"
      }
      if ((customBaseValue || "") !== "") {
        return validateInput(inputValue, n)
      }
      return null
    }
    return validateInput(inputValue, resolvedBase)
  }, [inputValue, inputBase, customBaseValue, resolvedBase])

  // Perform conversion
  const conversion = useMemo(() => {
    if (validationError) return null
    if (inputBase === "custom") {
      const n = parseInt(customBaseValue || "10", 10)
      if (isNaN(n) || n < 2 || n > 36) return null
      return convertBase(inputValue, n)
    }
    return convertBase(inputValue, resolvedBase)
  }, [inputValue, inputBase, customBaseValue, resolvedBase, validationError])

  // Custom base output
  const customOutput = useMemo(() => {
    if (!conversion || inputBase !== "custom") return ""
    const n = parseInt(customBaseValue || "10", 10)
    if (isNaN(n) || n < 2 || n > 36) return ""
    try {
      const dec = BigInt(conversion.decimal)
      return dec.toString(n).toUpperCase()
    } catch {
      return ""
    }
  }, [conversion, inputBase, customBaseValue])

  // Copy handler
  const handleCopy = useCallback(
    (field: keyof CopyState, value: string) => {
      navigator.clipboard.writeText(value || "").catch(() => {})
      setCopied((prev) => ({ ...prev, [field]: true }))
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [field]: false }))
      }, 2000)
    },
    []
  )

  // Quick example select handler
  const handleExampleSelect = useCallback(
    (value: string, base: BaseOption, customBase?: number) => {
      setInputValue(value)
      setInputBase(base)
      if (base === "custom" && customBase !== undefined) {
        setCustomBaseValue(String(customBase))
      }
    },
    []
  )

  const quickExamples = [
    { label: "255 → Binary", value: "255", base: "10" as BaseOption },
    { label: "0xFF → Decimal", value: "FF", base: "16" as BaseOption },
    { label: "0b1010 → Hex", value: "1010", base: "2" as BaseOption },
    { label: "777 (Octal)", value: "777", base: "8" as BaseOption },
    { label: "Base 36: Z", value: "Z", base: "custom" as BaseOption, customBase: 36 },
  ]

  return (
    <div className="space-y-6">
      {/* Main Input Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <Hash className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Number Base Converter</h3>
              <p className="text-sm text-muted-foreground">
                Enter a number and select the input base — all conversions appear instantly
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Number Input */}
              <div className="space-y-2">
                <Label htmlFor="number-input" className="text-sm font-medium">
                  Number Value
                </Label>
                <Input
                  id="number-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 255, FF, 1010, 377"
                  className="font-mono text-base"
                  aria-label="Enter number value"
                />
              </div>

              {/* Base Selector */}
              <div className="space-y-2">
                <Label htmlFor="base-selector" className="text-sm font-medium">
                  Input Base
                </Label>
                <Select
                  value={inputBase}
                  onValueChange={(v) => setInputBase(v as BaseOption)}
                >
                  <SelectTrigger id="base-selector" className="w-full">
                    <SelectValue placeholder="Select base" />
                  </SelectTrigger>
                  <SelectContent>
                    {BASE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                        {opt.base > 0 && (
                          <span className="ml-2 text-muted-foreground text-xs">
                            (base {opt.base})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Custom Base Input */}
            {inputBase === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="custom-base" className="text-sm font-medium">
                  Custom Base (2–36)
                </Label>
                <Input
                  id="custom-base"
                  type="number"
                  min={2}
                  max={36}
                  value={customBaseValue}
                  onChange={(e) => setCustomBaseValue(e.target.value)}
                  placeholder="Enter base between 2 and 36"
                  className="font-mono text-base max-w-xs"
                  aria-label="Custom base value"
                />
                {resolvedBase >= 2 && resolvedBase <= 36 && (
                  <p className="text-xs text-muted-foreground">
                    Valid digits for base {resolvedBase}:{" "}
                    <code className="font-mono bg-muted px-1.5 py-0.5 rounded">
                      {getValidChars(resolvedBase)}
                    </code>
                  </p>
                )}
              </div>
            )}

            {/* Validation Error */}
            {validationError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 p-3">
                <AlertCircle className="size-4 text-red-500 shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{validationError}</p>
              </div>
            )}

            <Separator className="my-2" />

            {/* Quick Examples */}
            <QuickExamples examples={quickExamples} onSelect={handleExampleSelect} />
          </div>
        </div>
      </Card>

      {/* Conversion Results */}
      {conversion && !validationError && (
        <>
          {/* Bit Length Info */}
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Binary className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Bit Length:</span>
              </div>
              <Badge variant={getBitLengthBadgeVariant(conversion.bits)}>
                {getBitLengthDisplay(conversion.bits)} ({conversion.bits} bits)
              </Badge>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Byte Representation:
                </span>
                <code className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                  {conversion.bytes.join(" ")}
                </code>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Total Bytes:
                </span>
                <Badge variant="outline" className="text-xs">
                  {conversion.bytes.length}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Output Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <OutputCard
              label="Binary"
              value={conversion.binary}
              copied={copied.binary}
              onCopy={() => handleCopy("binary", conversion.binary)}
              icon={<Binary className="size-3.5 text-primary" />}
              badge="Base 2"
            />
            <OutputCard
              label="Octal"
              value={conversion.octal}
              copied={copied.octal}
              onCopy={() => handleCopy("octal", conversion.octal)}
              icon={<Hash className="size-3.5 text-primary" />}
              badge="Base 8"
            />
            <OutputCard
              label="Decimal"
              value={conversion.decimal}
              copied={copied.decimal}
              onCopy={() => handleCopy("decimal", conversion.decimal)}
              icon={<Hash className="size-3.5 text-primary" />}
              badge="Base 10"
            />
            <OutputCard
              label="Hexadecimal"
              value={conversion.hex}
              copied={copied.hex}
              onCopy={() => handleCopy("hex", conversion.hex)}
              icon={<Hash className="size-3.5 text-primary" />}
              badge="Base 16"
            />
          </div>

          {/* Custom Base Output (if applicable) */}
          {inputBase !== "custom" && (
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-1.5">
                      <Hash className="size-3.5 text-primary" />
                    </div>
                    <Label className="text-sm font-medium">
                      All Standard Bases Summary
                    </Label>
                  </div>
                </div>
                <div className="font-mono text-xs bg-muted/50 rounded-md px-3 py-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">BIN</Badge>
                    <span className="break-all">{conversion.binary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">OCT</Badge>
                    <span className="break-all">{conversion.octal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">DEC</Badge>
                    <span className="break-all">{conversion.decimal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">HEX</Badge>
                    <span className="break-all">{conversion.hex}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Custom base output when input is custom */}
          {inputBase === "custom" && customOutput && (
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full bg-primary/10 p-1.5">
                      <Hash className="size-3.5 text-primary" />
                    </div>
                    <Label className="text-sm font-medium">
                      Summary — From Custom Base {resolvedBase}
                    </Label>
                  </div>
                </div>
                <div className="font-mono text-xs bg-muted/50 rounded-md px-3 py-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">BIN</Badge>
                    <span className="break-all">{conversion.binary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">OCT</Badge>
                    <span className="break-all">{conversion.octal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">DEC</Badge>
                    <span className="break-all">{conversion.decimal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] w-8 justify-center shrink-0">HEX</Badge>
                    <span className="break-all">{conversion.hex}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Empty state */}
      {!(inputValue || "") && (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="flex items-center justify-center rounded-full bg-muted p-3 mb-3">
              <Binary className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Enter a number above to see conversions
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports binary, octal, decimal, hexadecimal, and custom bases 2–36
            </p>
          </div>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <Hash className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All base conversions happen locally using JavaScript. Your numbers are never sent
              to any server, stored, or shared. Close the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
