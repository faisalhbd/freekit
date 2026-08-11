"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { Copy, Check, Pipette, Palette, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface HSV {
  h: number
  s: number
  v: number
}

interface CMYK {
  c: number
  m: number
  y: number
  k: number
}

interface ColorState {
  hex: string
  rgb: RGB
  hsl: HSL
  hsv: HSV
  cmyk: CMYK
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
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)))
    return clamped.toString(16).padStart(2, "0")
  }
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
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60
        break
      case gn:
        h = ((bn - rn) / d + 2) * 60
        break
      case bn:
        h = ((rn - gn) / d + 4) * 60
        break
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let rn = 0
  let gn = 0
  let bn = 0

  if (h < 60) { rn = c; gn = x }
  else if (h < 120) { rn = x; gn = c }
  else if (h < 180) { gn = c; bn = x }
  else if (h < 240) { gn = x; bn = c }
  else if (h < 300) { rn = x; bn = c }
  else { rn = c; bn = x }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  }
}

function rgbToHsv(r: number, g: number, b: number): HSV {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60
        break
      case gn:
        h = ((bn - rn) / d + 2) * 60
        break
      case bn:
        h = ((rn - gn) / d + 4) * 60
        break
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  }
}

function hsvToRgb(h: number, s: number, v: number): RGB {
  const sn = s / 100
  const vn = v / 100
  const c = vn * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = vn - c
  let rn = 0
  let gn = 0
  let bn = 0

  if (h < 60) { rn = c; gn = x }
  else if (h < 120) { rn = x; gn = c }
  else if (h < 180) { gn = c; bn = x }
  else if (h < 240) { gn = x; bn = c }
  else if (h < 300) { rn = x; bn = c }
  else { rn = c; bn = x }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  }
}

function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const k = 1 - Math.max(rn, gn, bn)
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  }
}

function cmykToRgb(c: number, m: number, y: number, k: number): RGB {
  const cn = c / 100
  const mn = m / 100
  const yn = y / 100
  const kn = k / 100
  return {
    r: Math.round(255 * (1 - cn) * (1 - kn)),
    g: Math.round(255 * (1 - mn) * (1 - kn)),
    b: Math.round(255 * (1 - yn) * (1 - kn)),
  }
}

// ─── Contrast Ratio ──────────────────────────────────────────────────────────

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function contrastRatio(rgb: RGB, bgR: number, bgG: number, bgB: number): number {
  const l1 = relativeLuminance(rgb.r, rgb.g, rgb.b)
  const l2 = relativeLuminance(bgR, bgG, bgB)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getContrastBadge(ratio: number, level: "AA" | "AAA") {
  const threshold = level === "AA" ? (4.5) : (7)
  const pass = ratio >= threshold
  return pass ? (
    <Badge variant="outline" className="border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs">
      Pass {level}
    </Badge>
  ) : (
    <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-400 text-xs">
      Fail {level}
    </Badge>
  )
}

// ─── Palette Generation ──────────────────────────────────────────────────────

function generatePalette(hsl: HSL, count: number = 5): string[] {
  const palette: string[] = []
  for (let i = 0; i < count; i++) {
    const lightness = Math.round(15 + (70 * i) / (count - 1))
    const rgb = hslToRgb(hsl.h, hsl.s, lightness)
    palette.push(rgbToHex(rgb.r, rgb.g, rgb.b))
  }
  return palette
}

// ─── Copy Hook ───────────────────────────────────────────────────────────────

function useCopyToClipboard() {
  const [copiedKey, setCopiedKey] = useState("")

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(""), 2000)
    })
  }, [])

  return { copiedKey, copy }
}

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label: string }) {
  const { copiedKey, copy } = useCopyToClipboard()
  const isCopied = copiedKey === label

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => copy(text, label)}
            aria-label={`Copy ${label}`}
          >
            {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isCopied ? "Copied!" : `Copy ${label}`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// ─── Format Row ──────────────────────────────────────────────────────────────

function FormatRow({ label, value, onCopy }: { label: string; value: string; onCopy: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
      <code className="text-sm font-mono text-foreground truncate">{value}</code>
      <CopyButton text={onCopy} label={label} />
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

const DEFAULT_COLOR = "#6366f1"

export function ColorConverterTool() {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const [hex, setHex] = useState(DEFAULT_COLOR)
  const [rgb, setRgb] = useState<RGB>({ r: 99, g: 102, b: 241 })
  const [hsl, setHsl] = useState<HSL>({ h: 239, s: 84, l: 67 })
  const [hsv, setHsv] = useState<HSV>({ h: 239, s: 59, v: 95 })
  const [cmyk, setCmyk] = useState<CMYK>({ c: 59, m: 58, y: 0, k: 5 })
  const [activeTab, setActiveTab] = useState("picker")
  const [inputHex, setInputHex] = useState(DEFAULT_COLOR)
  const [inputR, setInputR] = useState("99")
  const [inputG, setInputG] = useState("102")
  const [inputB, setInputB] = useState("241")
  const [inputH, setInputH] = useState("239")
  const [inputS, setInputS] = useState("84")
  const [inputL, setInputL] = useState("67")
  const [inputHsvH, setInputHsvH] = useState("239")
  const [inputHsvS, setInputHsvS] = useState("59")
  const [inputHsvV, setInputHsvV] = useState("95")
  const [inputC, setInputC] = useState("59")
  const [inputM, setInputM] = useState("58")
  const [inputY, setInputY] = useState("0")
  const [inputK, setInputK] = useState("5")

  const syncFromRgb = useCallback((newRgb: RGB) => {
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHex(newHex)
    setInputHex(newHex)
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
    setHsl(newHsl)
    setInputH(String(newHsl.h))
    setInputS(String(newHsl.s))
    setInputL(String(newHsl.l))
    const newHsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b)
    setHsv(newHsv)
    setInputHsvH(String(newHsv.h))
    setInputHsvS(String(newHsv.s))
    setInputHsvV(String(newHsv.v))
    const newCmyk = rgbToCmyk(newRgb.r, newRgb.g, newRgb.b)
    setCmyk(newCmyk)
    setInputC(String(newCmyk.c))
    setInputM(String(newCmyk.m))
    setInputY(String(newCmyk.y))
    setInputK(String(newCmyk.k))
  }, [])

  const handleHexInput = useCallback((val: string) => {
    setInputHex(val || "")
    const parsed = hexToRgb(val || "")
    if (parsed) {
      syncFromRgb(parsed)
      setInputR(String(parsed.r))
      setInputG(String(parsed.g))
      setInputB(String(parsed.b))
    }
  }, [syncFromRgb])

  const handleRgbInput = useCallback((field: "r" | "g" | "b", val: string) => {
    const num = parseInt(val || "0", 10)
    if (field === "r") setInputR(val || "")
    if (field === "g") setInputG(val || "")
    if (field === "b") setInputB(val || "")
    if (isNaN(num)) return
    const newRgb = { ...rgb, [field]: Math.max(0, Math.min(255, num)) }
    syncFromRgb(newRgb)
  }, [rgb, syncFromRgb])

  const handleHslInput = useCallback((field: "h" | "s" | "l", val: string) => {
    const num = parseFloat(val || "0")
    if (field === "h") setInputH(val || "")
    if (field === "s") setInputS(val || "")
    if (field === "l") setInputL(val || "")
    if (isNaN(num)) return
    const newHsl = { ...hsl, [field]: Math.max(0, Math.min(field === "h" ? 360 : 100, num)) }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    syncFromRgb(newRgb)
    setInputR(String(newRgb.r))
    setInputG(String(newRgb.g))
    setInputB(String(newRgb.b))
  }, [hsl, syncFromRgb])

  const handleHsvInput = useCallback((field: "h" | "s" | "v", val: string) => {
    const num = parseFloat(val || "0")
    if (field === "h") setInputHsvH(val || "")
    if (field === "s") setInputHsvS(val || "")
    if (field === "v") setInputHsvV(val || "")
    if (isNaN(num)) return
    const newHsv = { ...hsv, [field]: Math.max(0, Math.min(field === "h" ? 360 : 100, num)) }
    const newRgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v)
    syncFromRgb(newRgb)
    setInputR(String(newRgb.r))
    setInputG(String(newRgb.g))
    setInputB(String(newRgb.b))
  }, [hsv, syncFromRgb])

  const handleCmykInput = useCallback((field: "c" | "m" | "y" | "k", val: string) => {
    const num = parseFloat(val || "0")
    if (field === "c") setInputC(val || "")
    if (field === "m") setInputM(val || "")
    if (field === "y") setInputY(val || "")
    if (field === "k") setInputK(val || "")
    if (isNaN(num)) return
    const newCmyk = { ...cmyk, [field]: Math.max(0, Math.min(100, num)) }
    const newRgb = cmykToRgb(newCmyk.c, newCmyk.m, newCmyk.y, newCmyk.k)
    syncFromRgb(newRgb)
    setInputR(String(newRgb.r))
    setInputG(String(newRgb.g))
    setInputB(String(newRgb.b))
  }, [cmyk, syncFromRgb])

  const handlePickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value || ""
    handleHexInput(val)
  }, [handleHexInput])

  const contrastWhite = useMemo(() => contrastRatio(rgb, 255, 255, 255), [rgb])
  const contrastBlack = useMemo(() => contrastRatio(rgb, 0, 0, 0), [rgb])
  const palette = useMemo(() => generatePalette(hsl, 5), [hsl])

  const formatStrings = useMemo(() => ({
    hex: hex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
  }), [hex, rgb, hsl, hsv, cmyk])

  // Sync native color picker when hex changes from text input
  useEffect(() => {
    if (colorInputRef.current) {
      colorInputRef.current.value = hex
    }
  }, [hex])

  return (
    <Card className="p-4 md:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="picker" className="gap-1.5">
            <Pipette className="h-3.5 w-3.5" />
            Color Picker
          </TabsTrigger>
          <TabsTrigger value="palette" className="gap-1.5">
            <Palette className="h-3.5 w-3.5" />
            Palette
          </TabsTrigger>
        </TabsList>

        {/* ─── Picker Tab ─── */}
        <TabsContent value="picker" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Color Preview & Picker */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div
                className="relative w-full sm:w-40 h-40 rounded-xl border-2 border-border shadow-lg cursor-pointer transition-colors"
                style={{ backgroundColor: hex }}
                onClick={() => colorInputRef.current?.click()}
                role="button"
                aria-label="Click to open color picker"
              >
                <input
                  ref={colorInputRef}
                  type="color"
                  value={hex}
                  onChange={handlePickerChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Color picker"
                />
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                {hex.toUpperCase()}
              </Badge>
            </div>

            {/* Input Formats */}
            <div className="flex-1 space-y-5">
              {/* HEX */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  HEX
                </Label>
                <Input
                  value={inputHex}
                  onChange={(e) => handleHexInput(e.target.value || "")}
                  placeholder="#RRGGBB"
                  className="font-mono"
                />
              </div>

              <Separator />

              {/* RGB */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  RGB
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">R</Label>
                    <Input
                      type="number"
                      min={0}
                      max={255}
                      value={inputR}
                      onChange={(e) => handleRgbInput("r", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">G</Label>
                    <Input
                      type="number"
                      min={0}
                      max={255}
                      value={inputG}
                      onChange={(e) => handleRgbInput("g", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">B</Label>
                    <Input
                      type="number"
                      min={0}
                      max={255}
                      value={inputB}
                      onChange={(e) => handleRgbInput("b", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* HSL */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  HSL
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">H (0-360)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={360}
                      value={inputH}
                      onChange={(e) => handleHslInput("h", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">S (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputS}
                      onChange={(e) => handleHslInput("s", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">L (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputL}
                      onChange={(e) => handleHslInput("l", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* HSV */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  HSV
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">H (0-360)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={360}
                      value={inputHsvH}
                      onChange={(e) => handleHsvInput("h", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">S (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputHsvS}
                      onChange={(e) => handleHsvInput("s", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">V (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputHsvV}
                      onChange={(e) => handleHsvInput("v", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* CMYK */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  CMYK
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">C (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputC}
                      onChange={(e) => handleCmykInput("c", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">M (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputM}
                      onChange={(e) => handleCmykInput("m", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Y (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputY}
                      onChange={(e) => handleCmykInput("y", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">K (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={inputK}
                      onChange={(e) => handleCmykInput("k", e.target.value || "")}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Copy Formats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Quick Copy</h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <FormatRow label="HEX" value={formatStrings.hex} onCopy={formatStrings.hex} />
              <FormatRow label="RGB" value={formatStrings.rgb} onCopy={formatStrings.rgb} />
              <FormatRow label="HSL" value={formatStrings.hsl} onCopy={formatStrings.hsl} />
              <FormatRow label="HSV" value={formatStrings.hsv} onCopy={formatStrings.hsv} />
              <FormatRow label="CMYK" value={formatStrings.cmyk} onCopy={formatStrings.cmyk} />
            </div>
          </div>

          {/* Contrast Ratios */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contrast Ratios</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* White background */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div
                  className="flex items-center justify-center py-6 px-4"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <span
                    className="text-lg font-bold px-3 py-1 rounded-md"
                    style={{ color: hex }}
                  >
                    Aa Sample
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-card">
                  <div className="flex items-center gap-2">
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-xs text-muted-foreground">vs White</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold">{contrastWhite.toFixed(2)}:1</span>
                    {getContrastBadge(contrastWhite, "AA")}
                  </div>
                </div>
              </div>

              {/* Black background */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div
                  className="flex items-center justify-center py-6 px-4"
                  style={{ backgroundColor: "#000000" }}
                >
                  <span
                    className="text-lg font-bold px-3 py-1 rounded-md"
                    style={{ color: hex }}
                  >
                    Aa Sample
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-card">
                  <div className="flex items-center gap-2">
                    <Moon className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-xs text-muted-foreground">vs Black</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold">{contrastBlack.toFixed(2)}:1</span>
                    {getContrastBadge(contrastBlack, "AA")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ─── Palette Tab ─── */}
        <TabsContent value="palette" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generated shades and tints based on the selected color. Click any swatch to copy its HEX value.
          </p>
          <div className="grid grid-cols-5 gap-2">
            {palette.map((color, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="aspect-square rounded-xl border border-border shadow-sm transition-transform hover:scale-105 active:scale-95"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        navigator.clipboard.writeText(color.toUpperCase())
                      }}
                      aria-label={`Copy ${color.toUpperCase()}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="font-mono text-xs">{color.toUpperCase()}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {palette.map((color, i) => {
              const labels = ["Darkest", "Dark", "Base", "Light", "Lightest"]
              return (
                <Badge
                  key={i}
                  variant="outline"
                  className="font-mono text-xs gap-1.5 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(color.toUpperCase())
                    handleHexInput(color)
                  }}
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  {labels[i]}: {color.toUpperCase()}
                </Badge>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
