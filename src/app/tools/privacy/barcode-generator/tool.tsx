"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Barcode as BarcodeIcon, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Code 128B Encoding ─────────────────────────────────────────────────────

const CODE128B_PATTERNS: string[] = [
  "11011001100", "11001101100", "11001100110", "10010011000", "10010001100",
  "10001001100", "10011001000", "10011000100", "10001100100", "11001001000",
  "11001000100", "11000100100", "10110011100", "10011011100", "10011001110",
  "10111001100", "10011101100", "10011100110", "11001110010", "11001011100",
  "11001001110", "11011100100", "11001110100", "11101101110", "11101001100",
  "11100101100", "11100100110", "11101100100", "11100110100", "11100110010",
  "11011011000", "11011000110", "11000110110", "10100011000", "10001011000",
  "10001000110", "10110001000", "10001101000", "10001100010", "11010001000",
  "11000101000", "11000100010", "10110111000", "10110001110", "10001101110",
  "10111011000", "10111000110", "10001110110", "11101110110", "11010001110",
  "11000101110", "11011101000", "11011100010", "11011101110", "11101011000",
  "11101000110", "11100010110", "11101101000", "11101100010", "11100011010",
  "11101111010", "11001000010", "11110001010", "10100110000", "10100001100",
  "10010110000", "10010000110", "10100100010", "10100010010", "10011010000",
  "10011000010", "10000110100", "10000110010", "11000010010", "11001010000",
  "11110111010", "11000010100", "10001111010", "10100111100", "10010111100",
  "10010011110", "10111100100", "10011110100", "10011110010", "11110100100",
  "11110010100", "11110010010", "11011011110", "11011110110", "11110110110",
  "10101111000", "10100011110", "10001011110", "10111101000", "10111100010",
  "11110101000", "11110100010", "10111011110", "10111101110", "11101011110",
  "11110101110", "11010000100", "11010010000", "11010011100", "11000111010",
]

function encodeCode128B(text: string): { bars: string; error?: string } {
  if (!text || text.length === 0) return { bars: "", error: "Enter text to encode." }

  // Validate all chars are in Code 128B range (32-126)
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    if (code < 32 || code > 126) {
      return { bars: "", error: `Character '${text[i]}' (code ${code}) is not supported. Code 128B supports ASCII 32-126.` }
    }
  }

  // Start code B = 104
  let checksum = 104
  let encoded = CODE128B_PATTERNS[104] // Start B

  for (let i = 0; i < text.length; i++) {
    const value = text.charCodeAt(i) - 32
    encoded += CODE128B_PATTERNS[value]
    checksum += value * (i + 1)
  }

  checksum = checksum % 103
  encoded += CODE128B_PATTERNS[checksum]
  encoded += CODE128B_PATTERNS[106] // Stop pattern

  return { bars: encoded }
}

// ─── EAN-13 ─────────────────────────────────────────────────────────────────

const EAN_L_PATTERNS: string[] = [
  "0001101", "0011001", "0010011", "0111101", "0100011",
  "0110001", "0101111", "0111011", "0110111", "0001011",
]
const EAN_G_PATTERNS: string[] = [
  "0100111", "0110011", "0011011", "0100001", "0011101",
  "0111001", "0000101", "0010001", "0001001", "0010111",
]
const EAN_R_PATTERNS: string[] = [
  "1110010", "1100110", "1101100", "1000010", "1011100",
  "1001110", "1010000", "1000100", "1001000", "1110100",
]
// First digit determines L/G pattern for left 6 digits
const EAN_FIRST_DIGIT_PATTERNS: string[][] = [
  ["L", "L", "L", "L", "L", "L"],
  ["L", "L", "G", "G", "L", "L"],
  ["L", "L", "G", "L", "L", "G"],
  ["L", "L", "G", "G", "G", "L"],
  ["L", "G", "L", "L", "G", "G"],
  ["L", "G", "G", "L", "L", "G"],
  ["L", "G", "G", "G", "L", "L"],
  ["L", "G", "L", "G", "L", "G"],
  ["L", "G", "L", "G", "G", "L"],
  ["L", "G", "G", "L", "G", "L"],
]

function ean13CheckDigit(digits: string): number {
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const d = parseInt(digits[i], 10)
    sum += d * (i % 2 === 0 ? 1 : 3)
  }
  return (10 - (sum % 10)) % 10
}

function encodeEAN13(input: string): { bars: string; display: string; error?: string } {
  let digits = input.replace(/\D/g, "")

  if (digits.length === 12) {
    // Auto-calculate check digit
    digits += ean13CheckDigit(digits).toString()
  }

  if (digits.length !== 13) {
    return { bars: "", display: "", error: "EAN-13 requires exactly 12 or 13 digits." }
  }

  // Verify check digit
  if (input.length >= 13) {
    const expected = ean13CheckDigit(digits.slice(0, 12)).toString()
    if (digits[12] !== expected) {
      return { bars: "", display: "", error: `Invalid check digit. Expected ${expected}, got ${digits[12]}.` }
    }
  }

  const firstDigit = parseInt(digits[0], 10)
  const pattern = EAN_FIRST_DIGIT_PATTERNS[firstDigit]

  let encoded = "101" // Start guard

  // Left 6 digits
  for (let i = 0; i < 6; i++) {
    const d = parseInt(digits[i + 1], 10)
    if (pattern[i] === "L") {
      encoded += EAN_L_PATTERNS[d]
    } else {
      encoded += EAN_G_PATTERNS[d]
    }
  }

  encoded += "01010" // Center guard

  // Right 6 digits
  for (let i = 0; i < 6; i++) {
    const d = parseInt(digits[i + 7], 10)
    encoded += EAN_R_PATTERNS[d]
  }

  encoded += "101" // End guard

  return { bars: encoded, display: digits }
}

// ─── UPC-A ──────────────────────────────────────────────────────────────────

function upcaCheckDigit(digits: string): number {
  let sum = 0
  for (let i = 0; i < 11; i++) {
    const d = parseInt(digits[i], 10)
    sum += d * (i % 2 === 0 ? 3 : 1)
  }
  return (10 - (sum % 10)) % 10
}

function encodeUPCA(input: string): { bars: string; display: string; error?: string } {
  let digits = input.replace(/\D/g, "")

  if (digits.length === 11) {
    digits += upcaCheckDigit(digits).toString()
  }

  if (digits.length !== 12) {
    return { bars: "", display: "", error: "UPC-A requires exactly 11 or 12 digits." }
  }

  // Verify check digit
  if (input.length >= 12) {
    const expected = upcaCheckDigit(digits.slice(0, 11)).toString()
    if (digits[11] !== expected) {
      return { bars: "", display: "", error: `Invalid check digit. Expected ${expected}, got ${digits[11]}.` }
    }
  }

  // UPC-A is basically EAN-13 with leading 0
  const ean = "0" + digits
  return encodeEAN13(ean)
}

// ─── Render on Canvas ───────────────────────────────────────────────────────

type BarcodeFormat = "code128" | "ean13" | "upca"

interface EncodeResult {
  bars: string
  display: string
  error?: string
}

function encode(format: BarcodeFormat, input: string): EncodeResult {
  if (!input.trim()) return { bars: "", display: "", error: "Enter data to encode." }

  switch (format) {
    case "code128": {
      const res = encodeCode128B(input)
      return { bars: res.bars, display: input, error: res.error }
    }
    case "ean13": {
      const res = encodeEAN13(input)
      return res
    }
    case "upca": {
      const res = encodeUPCA(input)
      return res
    }
  }
}

function renderBarcode(
  canvas: HTMLCanvasElement,
  bars: string,
  displayText: string,
  moduleWidth: number,
  barcodeHeight: number
) {
  const ctx = canvas.getContext("2d")!
  const quietZone = moduleWidth * 10
  const textHeight = moduleWidth * 10
  const totalWidth = bars.length * moduleWidth + quietZone * 2
  const totalHeight = barcodeHeight + textHeight + quietZone

  canvas.width = totalWidth
  canvas.height = totalHeight

  // White background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, totalWidth, totalHeight)

  // Draw bars
  ctx.fillStyle = "#000000"
  for (let i = 0; i < bars.length; i++) {
    if (bars[i] === "1") {
      ctx.fillRect(quietZone + i * moduleWidth, quietZone, moduleWidth, barcodeHeight)
    }
  }

  // Draw text
  ctx.fillStyle = "#000000"
  ctx.font = `${Math.max(10, moduleWidth * 6)}px monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "top"
  ctx.fillText(displayText, totalWidth / 2, quietZone + barcodeHeight + 4)
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function BarcodeGeneratorTool() {
  const [format, setFormat] = useState<BarcodeFormat>("code128")
  const [input, setInput] = useState("")
  const [moduleWidth, setModuleWidth] = useState(2)
  const [barcodeHeight, setBarcodeHeight] = useState(100)
  const [error, setError] = useState("")
  const [displayText, setDisplayText] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = useCallback(() => {
    const result = encode(format, input)
    if (result.error || !result.bars) {
      setError(result.error || "Invalid input.")
      setDisplayText("")
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")!
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
      return
    }

    setError("")
    setDisplayText(result.display)
    if (canvasRef.current) {
      renderBarcode(canvasRef.current, result.bars, result.display, moduleWidth, barcodeHeight)
    }
  }, [format, input, moduleWidth, barcodeHeight])

  const handleDownload = () => {
    if (!canvasRef.current || !displayText) return
    const url = canvasRef.current.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = `barcode-${format}-${displayText.replace(/[^a-zA-Z0-9]/g, "_")}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Auto-generate on format change (if input exists)
  const handleFormatChange = useCallback((newFormat: string) => {
    setFormat(newFormat)
    if ((input || "").trim()) {
      // Will regenerate via the format dependency in the main useEffect
    }
  }, [input])

  const placeholder =
    format === "code128"
      ? "Enter text (ASCII 32-126)"
      : format === "ean13"
      ? "Enter 12 or 13 digits"
      : "Enter 11 or 12 digits"

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <BarcodeIcon className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Barcode Generator</h3>
              <p className="text-sm text-muted-foreground">
                Generate Code 128, EAN-13, and UPC-A barcodes
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bc-format">Format</Label>
              <Select value={format} onValueChange={(v) => setFormat(v as BarcodeFormat)}>
                <SelectTrigger id="bc-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code128">Code 128B — Full ASCII Text</SelectItem>
                  <SelectItem value="ean13">EAN-13 — 13-Digit Product Code</SelectItem>
                  <SelectItem value="upca">UPC-A — 12-Digit Product Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bc-input">Data</Label>
              <Input
                id="bc-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => e.key === "Enter" && generate()}
              />
              {format === "ean13" && (
                <p className="text-xs text-muted-foreground">Enter 12 digits (check digit auto-calculated) or 13 digits.</p>
              )}
              {format === "upca" && (
                <p className="text-xs text-muted-foreground">Enter 11 digits (check digit auto-calculated) or 12 digits.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bc-width">Module Width (px)</Label>
              <Input
                id="bc-width"
                type="number"
                min={1}
                max={5}
                value={moduleWidth}
                onChange={(e) => setModuleWidth(parseInt(e.target.value) || 2)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bc-height">Barcode Height (px)</Label>
              <Input
                id="bc-height"
                type="number"
                min={40}
                max={300}
                value={barcodeHeight}
                onChange={(e) => setBarcodeHeight(parseInt(e.target.value) || 100)}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generate} className="mt-5 w-full gap-2">
            <BarcodeIcon className="size-4" /> Generate Barcode
          </Button>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Canvas Preview */}
          {displayText && !error && (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border bg-white p-4 flex justify-center overflow-x-auto">
                <canvas ref={canvasRef} className="max-w-full" />
              </div>
              <Button onClick={handleDownload} variant="outline" className="w-full gap-2">
                <Download className="size-4" /> Download as PNG
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <BarcodeIcon className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Client-Side — No Server Contact</p>
            <p className="text-sm text-muted-foreground">
              Barcodes are rendered on an HTML5 Canvas and downloaded as PNG. No data is sent to any server.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}