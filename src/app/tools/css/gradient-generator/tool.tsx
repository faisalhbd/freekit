"use client"

import { useState, useCallback, useMemo } from "react"
import { Copy, Check, Plus, Trash2, Blend, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ──────────────────────────────────────────────────────────────────

type GradientType = "linear" | "radial" | "conic"

interface ColorStop {
  id: string
  color: string
  position: number
}

type RadialPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "bottom"
  | "left"
  | "right"

const RADIAL_POSITIONS: { label: string; value: RadialPosition }[] = [
  { label: "Center", value: "center" },
  { label: "Top Left", value: "top-left" },
  { label: "Top Right", value: "top-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
]

function radialPositionToCSS(pos: RadialPosition): string {
  const map: Record<RadialPosition, string> = {
    center: "center",
    "top-left": "top left",
    "top-right": "top right",
    "bottom-left": "bottom left",
    "bottom-right": "bottom right",
    top: "top center",
    bottom: "bottom center",
    left: "left center",
    right: "right center",
  }
  return map[pos] || "center"
}

const PRESET_COLORS = [
  { name: "Sunset", stops: ["#ff6b6b", "#feca57", "#ff9ff3"] },
  { name: "Ocean", stops: ["#0abde3", "#48dbfb", "#dff9fb"] },
  { name: "Forest", stops: ["#2d3436", "#00b894", "#55efc4"] },
  { name: "Berry", stops: ["#6c5ce7", "#a29bfe", "#fd79a8"] },
  { name: "Fire", stops: ["#e17055", "#d63031", "#fdcb6e"] },
  { name: "Night", stops: ["#0c0c1d", "#1a1a2e", "#16213e"] },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function createDefaultStops(): ColorStop[] {
  return [
    { id: generateId(), color: "#ff6b6b", position: 0 },
    { id: generateId(), color: "#feca57", position: 50 },
    { id: generateId(), color: "#48dbfb", position: 100 },
  ]
}

// ─── CSS Generation ─────────────────────────────────────────────────────────

function buildGradientCSS(
  type: GradientType,
  angle: number,
  radialPosition: RadialPosition,
  conicFromAngle: number,
  stops: ColorStop[]
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position)
  const colorList = sorted.map((s) => `${s.color} ${s.position}%`).join(", ")

  switch (type) {
    case "linear":
      return `linear-gradient(${angle}deg, ${colorList})`
    case "radial":
      return `radial-gradient(circle at ${radialPositionToCSS(radialPosition)}, ${colorList})`
    case "conic":
      return `conic-gradient(from ${conicFromAngle}deg, ${colorList})`
    default:
      return `linear-gradient(${angle}deg, ${colorList})`
  }
}

// ─── Syntax Highlighting ────────────────────────────────────────────────────

function highlightCSS(css: string): string {
  return (css || "")
    .replace(
      /(linear-gradient|radial-gradient|conic-gradient|circle|from|to)/g,
      '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>'
    )
    .replace(
      /(\d+deg|\d+%)/g,
      '<span class="text-amber-600 dark:text-amber-400">$1</span>'
    )
    .replace(
      /(#[0-9a-fA-F]{3,8})/g,
      '<span class="text-emerald-600 dark:text-emerald-400">$1</span>'
    )
}

// ─── Component ──────────────────────────────────────────────────────────────

export function GradientGeneratorTool() {
  const [gradientType, setGradientType] = useState<GradientType>("linear")
  const [angle, setAngle] = useState(135)
  const [radialPosition, setRadialPosition] = useState<RadialPosition>("center")
  const [conicFromAngle, setConicFromAngle] = useState(0)
  const [colorStops, setColorStops] = useState<ColorStop[]>(createDefaultStops)
  const [copied, setCopied] = useState(false)

  const gradientCSS = useMemo(
    () => buildGradientCSS(gradientType, angle, radialPosition, conicFromAngle, colorStops),
    [gradientType, angle, radialPosition, conicFromAngle, colorStops]
  )

  const inlineStyle = useMemo(
    () => ({
      background: gradientCSS,
    }),
    [gradientCSS]
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [gradientCSS])

  const addColorStop = useCallback(() => {
    if (colorStops.length >= 5) return
    setColorStops((prev) => {
      const lastPos = prev[prev.length - 1]?.position || 100
      const newPos = Math.min(100, lastPos)
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
      return [...prev, { id: generateId(), color: randomColor, position: newPos }]
    })
  }, [colorStops.length])

  const removeColorStop = useCallback((id: string) => {
    setColorStops((prev) => {
      if (prev.length <= 2) return prev
      return prev.filter((s) => s.id !== id)
    })
  }, [])

  const updateColorStop = useCallback((id: string, field: "color" | "position", value: string | number) => {
    setColorStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }, [])

  const randomizeStops = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 2 // 2-4 stops
    const newStops: ColorStop[] = []
    for (let i = 0; i < count; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`
      const position = Math.round((i / (count - 1)) * 100)
      newStops.push({ id: generateId(), color, position })
    }
    setColorStops(newStops)
  }, [])

  const applyPreset = useCallback((stops: string[]) => {
    const newColorStops: ColorStop[] = stops.map((color, i) => ({
      id: generateId(),
      color,
      position: Math.round((i / Math.max(stops.length - 1, 1)) * 100),
    }))
    setColorStops(newColorStops)
  }, [])

  const highlightedCSS = useMemo(() => highlightCSS(gradientCSS), [gradientCSS])

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Gradient Type Selector ── */}
        <Card className="p-4">
          <Tabs
            value={gradientType}
            onValueChange={(v) => setGradientType(v as GradientType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="linear" className="gap-1.5 text-sm">
                <Blend className="size-3.5" />
                Linear
              </TabsTrigger>
              <TabsTrigger value="radial" className="gap-1.5 text-sm">
                <Blend className="size-3.5" />
                Radial
              </TabsTrigger>
              <TabsTrigger value="conic" className="gap-1.5 text-sm">
                <Blend className="size-3.5" />
                Conic
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* ── Preview Area ── */}
        <Card className="overflow-hidden">
          <div
            className="flex h-[280px] items-center justify-center rounded-lg m-4 shadow-inner"
            style={inlineStyle}
          >
            <span className="text-sm font-medium text-white drop-shadow-lg px-3 py-1 rounded-md bg-black/20 backdrop-blur-sm">
              Preview
            </span>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Controls Panel ── */}
          <Card className="p-6 space-y-6">
            {/* Angle / Direction Controls */}
            {gradientType === "linear" && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Angle</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[angle]}
                    onValueChange={([v]) => setAngle(v)}
                    min={0}
                    max={360}
                    step={1}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(Math.max(0, Math.min(360, Number(e.target.value) || 0)))}
                    className="w-20 text-center"
                    min={0}
                    max={360}
                  />
                  <Badge variant="secondary" className="shrink-0">deg</Badge>
                </div>
              </div>
            )}

            {gradientType === "radial" && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Position</Label>
                <div className="grid grid-cols-3 gap-2">
                  {RADIAL_POSITIONS.map((pos) => (
                    <Button
                      key={pos.value}
                      variant={radialPosition === pos.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRadialPosition(pos.value)}
                      className="text-xs"
                    >
                      {pos.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {gradientType === "conic" && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">From Angle</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[conicFromAngle]}
                    onValueChange={([v]) => setConicFromAngle(v)}
                    min={0}
                    max={360}
                    step={1}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={conicFromAngle}
                    onChange={(e) => setConicFromAngle(Math.max(0, Math.min(360, Number(e.target.value) || 0)))}
                    className="w-20 text-center"
                    min={0}
                    max={360}
                  />
                  <Badge variant="secondary" className="shrink-0">deg</Badge>
                </div>
              </div>
            )}

            <Separator />

            {/* Color Stops */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Color Stops</Label>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8" onClick={randomizeStops}>
                        <RefreshCw className="size-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Randomize colors</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs"
                        onClick={addColorStop}
                        disabled={colorStops.length >= 5}
                      >
                        <Plus className="size-3" />
                        Add
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {colorStops.length >= 5 ? "Maximum 5 stops" : "Add color stop"}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="space-y-3">
                {colorStops
                  .sort((a, b) => a.position - b.position)
                  .map((stop) => (
                    <div key={stop.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      {/* Color Picker */}
                      <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border">
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                          className="absolute inset-0 size-full cursor-pointer opacity-0"
                          aria-label={`Color stop color`}
                        />
                        <div
                          className="size-full rounded-md"
                          style={{ backgroundColor: stop.color }}
                        />
                      </div>

                      {/* Hex Input */}
                      <Input
                        value={(stop.color || "#000000")}
                        onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                        className="w-24 font-mono text-xs"
                        placeholder="#000000"
                      />

                      {/* Position Slider */}
                      <div className="flex flex-1 items-center gap-2">
                        <Slider
                          value={[stop.position]}
                          onValueChange={([v]) => updateColorStop(stop.id, "position", v)}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={stop.position}
                          onChange={(e) =>
                            updateColorStop(stop.id, "position", Math.max(0, Math.min(100, Number(e.target.value) || 0)))
                          }
                          className="w-16 text-center font-mono text-xs"
                          min={0}
                          max={100}
                        />
                        <span className="text-xs text-muted-foreground w-3">%</span>
                      </div>

                      {/* Remove Button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeColorStop(stop.id)}
                            disabled={colorStops.length <= 2}
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {colorStops.length <= 2 ? "Minimum 2 stops" : "Remove color stop"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            {/* Preset Gradients */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Presets</Label>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_COLORS.map((preset) => {
                  const presetCSS = `linear-gradient(135deg, ${preset.stops.join(", ")})`
                  return (
                    <Tooltip key={preset.name}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => applyPreset(preset.stops)}
                          className="group relative flex h-12 items-end rounded-lg border border-border overflow-hidden transition-all hover:scale-105 hover:shadow-md"
                          style={{ background: presetCSS }}
                          aria-label={`Apply ${preset.name} preset`}
                        >
                          <span className="relative z-10 w-full text-center text-[10px] font-medium text-white drop-shadow-md pb-0.5 bg-black/20">
                            {preset.name}
                          </span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{preset.name} gradient preset</TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* ── CSS Output Panel ── */}
          <Card className="p-6 space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Generated CSS</Label>
              <Button
                variant={copied ? "default" : "outline"}
                size="sm"
                className="gap-1.5 text-xs"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy CSS
                  </>
                )}
              </Button>
            </div>

            {/* Mini Preview */}
            <div
              className="h-20 rounded-lg shadow-inner"
              style={inlineStyle}
            />

            {/* Code Block */}
            <div className="flex-1 rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: highlightedCSS }}
                />
              </pre>
            </div>

            {/* Full Property */}
            <div className="rounded-lg border border-border bg-background p-4 overflow-x-auto">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Full CSS Property</p>
              <pre className="text-sm font-mono leading-relaxed">
                <code className="text-foreground">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">background</span>
                  <span className="text-muted-foreground">: </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightCSS(gradientCSS),
                    }}
                  />
                  <span className="text-muted-foreground">;</span>
                </code>
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
