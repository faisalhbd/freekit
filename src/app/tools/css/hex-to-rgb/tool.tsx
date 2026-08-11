"use client"

import { useState, useCallback, useMemo } from "react"
import { Copy, Check, ArrowRightLeft, Palette, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ──────────────────────────────────────────────────────────────────

interface RGB {
  r: number
  g: number
  b: number
}

interface HSL {
  h: number
  s: number
  l: number
}

// ─── Conversion Functions ────────────────────────────────────────────────────

function hexToRgb(hex: string): RGB | null {
  const cleaned = (hex || "").replace(/^#/, "")
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16)
    const g = parseInt(cleaned[1] + cleaned[1], 16)
    const b = parseInt(cleaned[2] + cleaned[2], 16)
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null
    return { r, g, b }
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.substring(0, 2), 16)
    const g = parseInt(cleaned.substring(2, 4), 16)
    const b = parseInt(cleaned.substring(4, 6), 16)
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null
    return { r, g, b }
  }
  return null
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0").toUpperCase()
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
        break
      case gn:
        h = ((bn - rn) / d + 2) / 6
        break
      case bn:
        h = ((rn - gn) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function toBinary(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n))).toString(2).padStart(8, "0")
}

// ─── Copy Button Sub-component ───────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleCopy}
            aria-label={`Copy ${label}`}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied!" : `Copy ${label}`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// ─── Channel Box Sub-component ───────────────────────────────────────────────

function ChannelBox({
  label,
  value,
  color,
  binary,
}: {
  label: string
  value: number
  color: string
  binary: string
}) {
  return (
    <Card className="flex-1 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">{label}</Label>
        <Badge variant="outline" className="font-mono text-xs">
          {binary}
        </Badge>
      </div>
      <div className="text-3xl font-bold font-mono" style={{ color }}>
        {value}
      </div>
      <Slider
        value={[value]}
        min={0}
        max={255}
        step={1}
        disabled
        className="pointer-events-none"
      />
      <p className="text-xs text-muted-foreground">0 — 255</p>
    </Card>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function HexToRgbTool() {
  const [hexInput, setHexInput] = useState("")

  const parsed = useMemo(() => {
    const raw = (hexInput || "").replace(/^#/, "")
    if (!raw) return null
    return hexToRgb(raw)
  }, [hexInput])

  const hsl = useMemo(() => {
    if (!parsed) return null
    return rgbToHsl(parsed.r, parsed.g, parsed.b)
  }, [parsed])

  const hexDisplay = useMemo(() => {
    if (!parsed) return ""
    return rgbToHex(parsed.r, parsed.g, parsed.b)
  }, [parsed])

  const rgbString = useMemo(() => {
    if (!parsed) return ""
    return `rgb(${parsed.r}, ${parsed.g}, ${parsed.b})`
  }, [parsed])

  const rgbaString = useMemo(() => {
    if (!parsed) return ""
    return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, 1)`
  }, [parsed])

  const hslString = useMemo(() => {
    if (!hsl) return ""
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  }, [hsl])

  const swatchColor = hexDisplay || "#e5e7eb"

  const isValid = parsed !== null

  // Determine if the color is light or dark for text contrast
  const isLight = useMemo(() => {
    if (!parsed) return true
    const luminance = (0.299 * parsed.r + 0.587 * parsed.g + 0.114 * parsed.b) / 255
    return luminance > 0.5
  }, [parsed])

  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let val = (e.target.value || "")
    // Auto-add # if missing
    if (val.length > 0 && val[0] !== "#") {
      val = "#" + val
    }
    setHexInput(val)
  }, [])

  const handleNativePicker = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = (e.target.value || "")
    if (val) {
      setHexInput(val.toUpperCase())
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* ── Input Section ──────────────────────────────────────────── */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 space-y-2 w-full">
            <Label htmlFor="hex-input" className="text-sm font-semibold flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              HEX Color Code
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-mono font-bold text-muted-foreground">
                #
              </span>
              <Input
                id="hex-input"
                type="text"
                placeholder="e.g. FF5733 or F53"
                value={hexInput}
                onChange={handleHexChange}
                className="h-12 pl-9 text-lg font-mono tracking-wider"
                maxLength={7}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Supports 3-digit (#F53) and 6-digit (#FF5733) HEX codes
            </p>
          </div>

          {/* Native Color Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Color Picker
            </Label>
            <div className="relative h-12 w-12 rounded-lg border-2 border-border overflow-hidden cursor-pointer">
              <input
                type="color"
                value={isValid ? hexDisplay : "#e5e7eb"}
                onChange={handleNativePicker}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                aria-label="Native color picker"
              />
              <div
                className="w-full h-full rounded-md"
                style={{ backgroundColor: swatchColor }}
              />
            </div>
          </div>
        </div>

        {hexInput.length > 1 && !isValid && (
          <p className="mt-3 text-sm text-destructive">
            Invalid HEX code. Please enter a valid 3 or 6 digit HEX color code.
          </p>
        )}
      </Card>

      {/* ── Color Preview Swatch ────────────────────────────────────── */}
      {isValid && parsed && (
        <Card className="p-6">
          <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
            <Eye className="h-4 w-4" />
            Color Preview
          </Label>
          <div
            className="w-full h-32 sm:h-40 rounded-xl border border-border transition-colors duration-200"
            style={{ backgroundColor: swatchColor }}
          >
            <div className="flex h-full items-center justify-center">
              <span
                className="text-2xl sm:text-3xl font-mono font-bold drop-shadow-md"
                style={{ color: isLight ? "#000000" : "#FFFFFF" }}
              >
                {hexDisplay}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* ── RGB Channel Boxes ───────────────────────────────────────── */}
      {isValid && parsed && (
        <Card className="p-6">
          <Label className="text-sm font-semibold mb-4 block">RGB Channels</Label>
          <div className="grid gap-4 sm:grid-cols-3">
            <ChannelBox
              label="Red"
              value={parsed.r}
              color="#ef4444"
              binary={toBinary(parsed.r)}
            />
            <ChannelBox
              label="Green"
              value={parsed.g}
              color="#22c55e"
              binary={toBinary(parsed.g)}
            />
            <ChannelBox
              label="Blue"
              value={parsed.b}
              color="#3b82f6"
              binary={toBinary(parsed.b)}
            />
          </div>
        </Card>
      )}

      {/* ── Output Formats ──────────────────────────────────────────── */}
      {isValid && (
        <Card className="p-6 space-y-4">
          <Label className="text-sm font-semibold">Output Formats</Label>

          {/* HEX */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">HEX</p>
              <p className="font-mono font-semibold truncate">{hexDisplay}</p>
            </div>
            <CopyButton text={hexDisplay} label="HEX" />
          </div>

          {/* RGB */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">RGB</p>
              <p className="font-mono font-semibold truncate">{rgbString}</p>
            </div>
            <CopyButton text={rgbString} label="RGB" />
          </div>

          {/* RGBA */}
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">RGBA</p>
              <p className="font-mono font-semibold truncate">{rgbaString}</p>
            </div>
            <CopyButton text={rgbaString} label="RGBA" />
          </div>

          <Separator />

          {/* HSL (bonus) */}
          {hsl && (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs text-muted-foreground">HSL (Bonus)</p>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    H: {hsl.h}°
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    S: {hsl.s}%
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    L: {hsl.l}%
                  </Badge>
                </div>
                <p className="font-mono font-semibold truncate">{hslString}</p>
              </div>
              <CopyButton text={hslString} label="HSL" />
            </div>
          )}
        </Card>
      )}

      {/* ── Empty State ─────────────────────────────────────────────── */}
      {!hexInput && (
        <Card className="p-12 text-center">
          <Palette className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-lg font-semibold text-muted-foreground">Enter a HEX color code</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Type a value like <span className="font-mono font-semibold">#FF5733</span> or{" "}
            <span className="font-mono font-semibold">#F53</span> to see the conversion
          </p>
        </Card>
      )}
    </div>
  )
}
