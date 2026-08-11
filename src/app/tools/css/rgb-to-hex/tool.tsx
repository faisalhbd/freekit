"use client"

import { useState, useCallback, useMemo } from "react"
import { Copy, Check, ArrowLeftRight, Palette, Eye } from "lucide-react"
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

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()
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

function clampChannel(val: number): number {
  return Math.max(0, Math.min(255, Math.round(val)))
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
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied!" : `Copy ${label}`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// ─── Channel Slider Sub-component ────────────────────────────────────────────

function ChannelSlider({
  label,
  value,
  onChange,
  colorClass,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  colorClass: string
}) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      if (raw === "") {
        onChange(0)
        return
      }
      const parsed = parseInt(raw || "0", 10)
      if (!isNaN(parsed)) {
        onChange(clampChannel(parsed))
      }
    },
    [onChange]
  )

  const handleSliderChange = useCallback(
    (vals: number[]) => {
      onChange(vals[0])
    },
    [onChange]
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <span className={`inline-block h-3 w-3 rounded-full ${colorClass}`} />
          {label}
        </Label>
        <div className="flex items-center gap-1">
          <Input
            type="number"
            min={0}
            max={255}
            value={value}
            onChange={handleInputChange}
            className="h-8 w-20 text-center font-mono text-sm"
            aria-label={`${label} value`}
          />
        </div>
      </div>
      <Slider
        value={[value]}
        min={0}
        max={255}
        step={1}
        onValueChange={handleSliderChange}
        aria-label={`${label} slider`}
      />
      <p className="text-xs text-muted-foreground">0 — 255</p>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function RgbToHexTool() {
  const [r, setR] = useState(0)
  const [g, setG] = useState(0)
  const [b, setB] = useState(0)

  const rgb: RGB = useMemo(() => ({ r, g, b }), [r, g, b])

  const hexDisplay = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb])

  const rgbString = useMemo(
    () => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    [rgb]
  )

  const rgbaString = useMemo(
    () => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
    [rgb]
  )

  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb])

  const hslString = useMemo(
    () => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    [hsl]
  )

  const swatchColor = hexDisplay

  // Determine light/dark for text contrast on swatch
  const isLight = useMemo(() => {
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
    return luminance > 0.5
  }, [rgb])

  // Hex color for native picker (lowercase, no leading # issues)
  const nativePickerValue = hexDisplay.toLowerCase()

  const handleNativePicker = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const hex = (e.target.value || "").replace("#", "")
      if (hex.length === 6) {
        const rr = parseInt(hex.substring(0, 2), 16)
        const gg = parseInt(hex.substring(2, 4), 16)
        const bb = parseInt(hex.substring(4, 6), 16)
        if (!isNaN(rr) && !isNaN(gg) && !isNaN(bb)) {
          setR(rr)
          setG(gg)
          setB(bb)
        }
      }
    },
    []
  )

  const handleReset = useCallback(() => {
    setR(0)
    setG(0)
    setB(0)
  }, [])

  const handleRandom = useCallback(() => {
    setR(Math.floor(Math.random() * 256))
    setG(Math.floor(Math.random() * 256))
    setB(Math.floor(Math.random() * 256))
  }, [])

  return (
    <div className="space-y-6">
      {/* ── Input Section: RGB Sliders ──────────────────────────────── */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            RGB Channels
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={handleRandom}>
              Random
            </Button>
          </div>
        </div>

        {/* Red slider */}
        <ChannelSlider
          label="Red"
          value={r}
          onChange={setR}
          colorClass="bg-red-500"
        />

        {/* Green slider */}
        <ChannelSlider
          label="Green"
          value={g}
          onChange={setG}
          colorClass="bg-green-500"
        />

        {/* Blue slider */}
        <ChannelSlider
          label="Blue"
          value={b}
          onChange={setB}
          colorClass="bg-blue-500"
        />

        {/* Native color picker synced */}
        <div className="flex items-center gap-3 pt-2">
          <Label className="text-sm font-semibold flex items-center gap-2 shrink-0">
            <Palette className="h-4 w-4" />
            Color Picker
          </Label>
          <div className="relative h-10 w-10 rounded-lg border-2 border-border overflow-hidden cursor-pointer">
            <input
              type="color"
              value={nativePickerValue}
              onChange={handleNativePicker}
              className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
              aria-label="Native color picker"
            />
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: swatchColor }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Use the native picker to visually select a color, synced with RGB values.
          </p>
        </div>
      </Card>

      {/* ── Large Color Preview Swatch ───────────────────────────────── */}
      <Card className="p-6">
        <Label className="text-sm font-semibold flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4" />
          Color Preview
        </Label>
        <div
          className="w-full h-40 sm:h-48 rounded-xl border border-border transition-colors duration-200 flex items-center justify-center"
          style={{ backgroundColor: swatchColor }}
        >
          <div className="text-center space-y-2">
            <span
              className="text-3xl sm:text-4xl font-mono font-bold drop-shadow-md block"
              style={{ color: isLight ? "#000000" : "#FFFFFF" }}
            >
              {hexDisplay}
            </span>
            <span
              className="text-sm font-mono drop-shadow-sm block"
              style={{ color: isLight ? "#000000AA" : "#FFFFFFAA" }}
            >
              {rgbString}
            </span>
          </div>
        </div>
      </Card>

      {/* ── Output Formats ──────────────────────────────────────────── */}
      <Card className="p-6 space-y-4">
        <Label className="text-sm font-semibold">Output Formats</Label>

        {/* HEX — primary output */}
        <div className="flex items-center justify-between gap-3 rounded-lg border-2 border-primary/30 bg-primary/5 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">HEX</p>
            <p className="font-mono font-bold text-lg truncate">{hexDisplay}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs shrink-0">
              Primary
            </Badge>
            <CopyButton text={hexDisplay} label="HEX" />
          </div>
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
      </Card>

      {/* ── Info Card ───────────────────────────────────────────────── */}
      <Card className="p-6 space-y-3">
        <Label className="text-sm font-semibold">Color Information</Label>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Total Possible Colors</p>
            <p className="font-mono font-semibold text-sm mt-0.5">
              16,777,216
              <span className="text-xs text-muted-foreground font-normal ml-1">
                (256³)
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Current Color Index</p>
            <p className="font-mono font-semibold text-sm mt-0.5">
              {(rgb.r * 65536 + rgb.g * 256 + rgb.b).toLocaleString()}
              <span className="text-xs text-muted-foreground font-normal ml-1">
                of 16,777,216
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Binary (R, G, B)</p>
            <p className="font-mono font-semibold text-sm mt-0.5">
              {clampChannel(rgb.r).toString(2).padStart(8, "0")},{" "}
              {clampChannel(rgb.g).toString(2).padStart(8, "0")},{" "}
              {clampChannel(rgb.b).toString(2).padStart(8, "0")}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Luminance (Relative)</p>
            <p className="font-mono font-semibold text-sm mt-0.5">
              {((0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 * 100).toFixed(1)}%
              <span className="text-xs text-muted-foreground font-normal ml-1">
                {isLight ? "(light text on dark)" : "(dark text on light)"}
              </span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
