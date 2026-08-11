"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Copy,
  Check,
  Ruler,
  Type,
  Maximize2,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ──────────────────────────────────────────────────────────────────

const UNITS = ["px", "rem", "em", "vw", "vh", "%"] as const
type Unit = (typeof UNITS)[number]

interface ClampInput {
  value: string
  unit: Unit
}

interface ViewportConfig {
  minSize: string
  maxSize: string
  minWidth: string
  maxWidth: string
}

interface Preset {
  label: string
  min: string
  preferred: string
  max: string
  unit: Unit
}

// ─── Presets ────────────────────────────────────────────────────────────────

const TYPOGRAPHY_PRESETS: Preset[] = [
  { label: "H1", min: "2", preferred: "1rem + 2.5vw", max: "3.5", unit: "rem" },
  { label: "H2", min: "1.5", preferred: "1rem + 1.5vw", max: "2.5", unit: "rem" },
  { label: "H3", min: "1.25", preferred: "0.8rem + 1vw", max: "2", unit: "rem" },
  { label: "Body", min: "1", preferred: "0.9rem + 0.5vw", max: "1.25", unit: "rem" },
  { label: "Small", min: "0.75", preferred: "0.7rem + 0.2vw", max: "0.875", unit: "rem" },
]

const SPACING_PRESETS: Preset[] = [
  { label: "Section Padding", min: "1.5", preferred: "1rem + 3vw", max: "5", unit: "rem" },
  { label: "Card Padding", min: "1", preferred: "0.8rem + 1vw", max: "2", unit: "rem" },
  { label: "Gap (flex/grid)", min: "0.5", preferred: "0.3rem + 1vw", max: "2", unit: "rem" },
  { label: "Container Width", min: "320", preferred: "90%", max: "1200", unit: "px" },
]

// ─── Helper Functions ───────────────────────────────────────────────────────

function convertToPx(val: string, unit: Unit): number {
  const num = parseFloat(val || "0")
  if (isNaN(num)) return 0
  switch (unit) {
    case "rem":
    case "em":
      return num * 16
    case "vw":
      return (num * 1440) / 100
    case "vh":
      return (num * 900) / 100
    case "%":
      return (num * 1440) / 100
    default:
      return num
  }
}

function clampValue(
  input: ClampInput,
  viewportPx: number
): number {
  const num = parseFloat(input.value || "0")
  if (isNaN(num)) return 0
  switch (input.unit) {
    case "vw":
      return (num * viewportPx) / 100
    case "vh":
      return (num * 900) / 100
    case "%":
      return (num * viewportPx) / 100
    case "rem":
    case "em":
      return num * 16
    default:
      return num
  }
}

function evaluateClamp(
  min: ClampInput,
  preferred: ClampInput,
  max: ClampInput,
  viewportPx: number
): number {
  const minVal = clampValue(min, viewportPx)
  const maxVal = clampValue(max, viewportPx)
  let prefVal: number

  // Parse preferred — could be a calc expression like "1rem + 2.5vw"
  const parts = (preferred.value || "").split(/\s*\+\s*/)
  prefVal = 0
  for (const part of parts) {
    const trimmed = (part || "").trim()
    const match = trimmed.match(/^([\d.]+)(rem|em|px|vw|vh|%)?$/i)
    if (match) {
      const pUnit = (match[2] || "px") as Unit
      prefVal += clampValue({ value: match[1] || "0", unit: pUnit }, viewportPx)
    }
  }

  return Math.min(maxVal, Math.max(minVal, prefVal))
}

function generatePreferred(
  config: ViewportConfig,
  unit: Unit
): string {
  const minSize = parseFloat(config.minSize || "0")
  const maxSize = parseFloat(config.maxSize || "0")
  const vpMin = parseFloat(config.minWidth || "0")
  const vpMax = parseFloat(config.maxWidth || "0")

  if (isNaN(minSize) || isNaN(maxSize) || isNaN(vpMin) || isNaN(vpMax)) return ""
  if (vpMax === vpMin) return ""

  const diff = maxSize - minSize
  const vpDiff = vpMax - vpMin
  const vwSlope = (diff / vpDiff) * 100

  if (unit === "px") {
    const minPx = minSize
    return `${minPx}px + ${vwSlope.toFixed(2)}vw`
  }
  // For rem/em: convert min to rem
  const minRem = (minSize / 16).toFixed(3)
  return `${minRem}rem + ${vwSlope.toFixed(2)}vw`
}

// ─── Unit Input Component ───────────────────────────────────────────────────

function UnitInput({
  label,
  value,
  unit,
  onValueChange,
  onUnitChange,
  tooltip,
}: {
  label: string
  value: string
  unit: Unit
  onValueChange: (v: string) => void
  onUnitChange: (u: Unit) => void
  tooltip?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium">{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help text-xs text-muted-foreground">
                  (?)
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="flex-1"
          placeholder="0"
        />
        <Select value={unit} onValueChange={(v) => onUnitChange(v as Unit)}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UNITS.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function CSSClampGenerator() {
  // Direct input mode state
  const [min, setMin] = useState<ClampInput>({ value: "1", unit: "rem" })
  const [preferred, setPreferred] = useState<ClampInput>({ value: "1rem + 1.5vw", unit: "rem" })
  const [max, setMax] = useState<ClampInput>({ value: "2.5", unit: "rem" })

  // Viewport calc mode state
  const [viewportConfig, setViewportConfig] = useState<ViewportConfig>({
    minSize: "16",
    maxSize: "24",
    minWidth: "375",
    maxWidth: "1440",
  })

  const [activeTab, setActiveTab] = useState<string>("direct")
  const [copied, setCopied] = useState(false)

  // The preferred unit used in viewport calc mode
  const [vpUnit, setVpUnit] = useState<Unit>("rem")

  // ─── Computed Values ────────────────────────────────────────────────────

  const cssOutput = useMemo(() => {
    const minStr = `${min.value || "0"}${min.unit}`
    const maxStr = `${max.value || "0"}${max.unit}`
    const prefStr = preferred.unit === "rem" || preferred.unit === "em"
      ? preferred.value || "0"
      : `${preferred.value || "0"}${preferred.unit}`
    return `clamp(${minStr}, ${prefStr}, ${maxStr})`
  }, [min, preferred, max])

  const cssProperty = useMemo(() => {
    return `font-size: ${cssOutput};`
  }, [cssOutput])

  // Preview sizes at three viewport widths
  const previews = useMemo(() => {
    const viewports = [
      { label: "Mobile", width: 375, icon: Smartphone, color: "text-blue-500" },
      { label: "Tablet", width: 768, icon: Tablet, color: "text-emerald-500" },
      { label: "Desktop", width: 1440, icon: Monitor, color: "text-orange-500" },
    ]
    return viewports.map((vp) => {
      const px = evaluateClamp(min, preferred, max, vp.width)
      return { ...vp, fontSize: px }
    })
  }, [min, preferred, max])

  // Formula display
  const formulaDisplay = useMemo(() => {
    const minPx = convertToPx(min.value, min.unit)
    const maxPx = convertToPx(max.value, max.unit)
    const vpMin = parseFloat(viewportConfig.minWidth || "375")
    const vpMax = parseFloat(viewportConfig.maxWidth || "1440")
    const slope = (maxPx - minPx) / (vpMax - vpMin)
    const intercept = minPx - slope * vpMin
    return {
      minPx: minPx.toFixed(1),
      maxPx: maxPx.toFixed(1),
      slope: slope.toFixed(4),
      intercept: intercept.toFixed(2),
      vpMin,
      vpMax,
    }
  }, [min, max, viewportConfig])

  // ─── Handlers ──────────────────────────────────────────────────────────

  const handleApplyViewportCalc = useCallback(() => {
    const newPreferred = generatePreferred(viewportConfig, vpUnit)
    if (newPreferred) {
      setPreferred({ value: newPreferred, unit: vpUnit })
    }
  }, [viewportConfig, vpUnit])

  const handleApplyPreset = useCallback((preset: Preset) => {
    setMin({ value: preset.min, unit: preset.unit })
    setPreferred({ value: preset.preferred, unit: preset.unit })
    setMax({ value: preset.max, unit: preset.unit })
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssProperty).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [cssProperty])

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="direct" className="gap-2">
            <Ruler className="size-4" />
            Direct Input
          </TabsTrigger>
          <TabsTrigger value="viewport" className="gap-2">
            <Maximize2 className="size-4" />
            Calculate from Viewport
          </TabsTrigger>
        </TabsList>

        {/* ── Direct Input Tab ─────────────────────────────────────────── */}
        <TabsContent value="direct" className="space-y-6 mt-6">
          <Card className="p-6 space-y-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <UnitInput
                label="Minimum Value"
                value={min.value}
                unit={min.unit}
                onValueChange={(v) => setMin((s) => ({ ...s, value: v }))}
                onUnitChange={(u) => setMin((s) => ({ ...s, unit: u }))}
                tooltip="The smallest value. Below this, the value will not shrink."
              />
              <UnitInput
                label="Preferred Value"
                value={preferred.value}
                unit={preferred.unit}
                onValueChange={(v) => setPreferred((s) => ({ ...s, value: v }))}
                onUnitChange={(u) => setPreferred((s) => ({ ...s, unit: u }))}
                tooltip="The ideal value. Can include calc expressions like '1rem + 1.5vw'."
              />
              <UnitInput
                label="Maximum Value"
                value={max.value}
                unit={max.unit}
                onValueChange={(v) => setMax((s) => ({ ...s, value: v }))}
                onUnitChange={(u) => setMax((s) => ({ ...s, unit: u }))}
                tooltip="The largest value. Above this, the value will not grow."
              />
            </div>
          </Card>
        </TabsContent>

        {/* ── Calculate from Viewport Tab ──────────────────────────────── */}
        <TabsContent value="viewport" className="space-y-6 mt-6">
          <Card className="p-6 space-y-6">
            <p className="text-sm text-muted-foreground">
              Define the minimum and maximum font sizes at specific viewport widths. The
              tool will auto-calculate the preferred value for smooth scaling.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4 rounded-lg border border-dashed border-border p-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="size-4 text-blue-500" />
                  <span className="text-sm font-medium">Small Screen</span>
                </div>
                <UnitInput
                  label="Font Size"
                  value={viewportConfig.minSize}
                  unit="px"
                  onValueChange={(v) =>
                    setViewportConfig((s) => ({ ...s, minSize: v }))
                  }
                  onUnitChange={() => {}}
                />
                <UnitInput
                  label="Viewport Width"
                  value={viewportConfig.minWidth}
                  unit="px"
                  onValueChange={(v) =>
                    setViewportConfig((s) => ({ ...s, minWidth: v }))
                  }
                  onUnitChange={() => {}}
                />
              </div>
              <div className="space-y-4 rounded-lg border border-dashed border-border p-4">
                <div className="flex items-center gap-2">
                  <Monitor className="size-4 text-orange-500" />
                  <span className="text-sm font-medium">Large Screen</span>
                </div>
                <UnitInput
                  label="Font Size"
                  value={viewportConfig.maxSize}
                  unit="px"
                  onValueChange={(v) =>
                    setViewportConfig((s) => ({ ...s, maxSize: v }))
                  }
                  onUnitChange={() => {}}
                />
                <UnitInput
                  label="Viewport Width"
                  value={viewportConfig.maxWidth}
                  unit="px"
                  onValueChange={(v) =>
                    setViewportConfig((s) => ({ ...s, maxWidth: v }))
                  }
                  onUnitChange={() => {}}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label className="text-sm font-medium shrink-0">Output Unit</Label>
              <Select value={vpUnit} onValueChange={(v) => setVpUnit(v as Unit)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rem">rem</SelectItem>
                  <SelectItem value="px">px</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleApplyViewportCalc} className="ml-auto gap-2">
                <Type className="size-4" />
                Apply to Generator
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* ── Presets ────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Quick Presets</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs text-muted-foreground">Typography</Badge>
          {TYPOGRAPHY_PRESETS.map((p) => (
            <Button
              key={p.label}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => handleApplyPreset(p)}
            >
              {p.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs text-muted-foreground">Spacing</Badge>
          {SPACING_PRESETS.map((p) => (
            <Button
              key={p.label}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => handleApplyPreset(p)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Preview ────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Maximize2 className="size-4" />
          Live Preview
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {previews.map((p) => {
            const IconComp = p.icon
            return (
              <Card key={p.label} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComp className={`size-4 ${p.color}`} />
                    <span className="text-sm font-medium">{p.label}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">
                    {p.width}px
                  </Badge>
                </div>
                <div
                  className="rounded-lg border border-border bg-muted/30 flex items-center justify-center min-h-[80px] p-4"
                >
                  <span
                    style={{ fontSize: `${p.fontSize}px` }}
                    className="text-center font-medium leading-tight text-foreground transition-all duration-200"
                  >
                    The quick brown fox
                  </span>
                </div>
                <p className="text-center text-xs text-muted-foreground font-mono">
                  {p.fontSize.toFixed(1)}px
                </p>
              </Card>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* ── Generated CSS ──────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Ruler className="size-4" />
          Generated CSS
        </h3>
        <Card className="relative p-5 bg-muted/30">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-3 top-3 gap-1.5 text-xs h-7"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>
          <pre className="text-sm font-mono whitespace-pre-wrap break-all pr-16">
            <code>{cssProperty}</code>
          </pre>
        </Card>
      </div>

      <Separator />

      {/* ── Formula Display ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Type className="size-4" />
          Mathematical Formula
        </h3>
        <Card className="p-5 space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm text-center space-y-2">
            <p className="text-muted-foreground">preferred = min + (max - min) × (viewport - viewportMin) / (viewportMax - viewportMin)</p>
            <Separator />
            <p className="text-foreground">
              preferred = {formulaDisplay.minPx}px + ({formulaDisplay.maxPx}px - {formulaDisplay.minPx}px) × (100vw - {formulaDisplay.vpMin}px) / ({formulaDisplay.vpMax}px - {formulaDisplay.vpMin}px)
            </p>
            <Separator />
            <p className="text-muted-foreground text-xs">
              Slope: {formulaDisplay.slope}px/px &nbsp;|&nbsp; Intercept: {formulaDisplay.intercept}px
            </p>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              This linear interpolation ensures the value scales proportionally between the minimum and maximum across the specified viewport range.
            </p>
            <p>
              At {formulaDisplay.vpMin}px viewport: <code className="font-mono text-foreground">{formulaDisplay.minPx}px</code> (minimum)
            </p>
            <p>
              At {formulaDisplay.vpMax}px viewport: <code className="font-mono text-foreground">{formulaDisplay.maxPx}px</code> (maximum)
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
