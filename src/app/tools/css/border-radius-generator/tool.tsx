"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Copy,
  Check,
  Link,
  Unlink,
  RectangleHorizontal,
  RotateCcw,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ──────────────────────────────────────────────────────────────────

type CornerKey = "topLeft" | "topRight" | "bottomRight" | "bottomLeft"

interface CornerValues {
  topLeft: number
  topRight: number
  bottomRight: number
  bottomLeft: number
}

// ─── Constants ──────────────────────────────────────────────────────────────

const CORNER_LABELS: Record<CornerKey, string> = {
  topLeft: "Top Left",
  topRight: "Top Right",
  bottomRight: "Bottom Right",
  bottomLeft: "Bottom Left",
}

const CORNER_CSS_KEYS: Record<CornerKey, string> = {
  topLeft: "border-top-left-radius",
  topRight: "border-top-right-radius",
  bottomRight: "border-bottom-right-radius",
  bottomLeft: "border-bottom-left-radius",
}

const DEFAULT_VALUES: CornerValues = {
  topLeft: 12,
  topRight: 12,
  bottomRight: 12,
  bottomLeft: 12,
}

const PRESETS: { name: string; values: CornerValues }[] = [
  { name: "Rounded", values: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 } },
  { name: "Pill", values: { topLeft: 9999, topRight: 9999, bottomRight: 9999, bottomLeft: 9999 } },
  { name: "Circle", values: { topLeft: 150, topRight: 150, bottomRight: 150, bottomLeft: 150 } },
  { name: "Squircle", values: { topLeft: 32, topRight: 32, bottomRight: 32, bottomLeft: 32 } },
  { name: "Blob", values: { topLeft: 60, topRight: 20, bottomRight: 60, bottomLeft: 20 } },
  { name: "Leaf", values: { topLeft: 80, topRight: 0, bottomRight: 80, bottomLeft: 0 } },
  { name: "Ticket", values: { topLeft: 16, topRight: 4, bottomRight: 4, bottomLeft: 16 } },
  { name: "Sharp", values: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 } },
]

const CORNERS: CornerKey[] = ["topLeft", "topRight", "bottomRight", "bottomLeft"]

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatValue(v: number): string {
  return v >= 9999 ? "9999px" : `${v}px`
}

function buildShorthand(values: CornerValues): string {
  const { topLeft, topRight, bottomRight, bottomLeft } = values
  if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
    return formatValue(topLeft)
  }
  if (topLeft === bottomRight && topRight === bottomLeft) {
    return `${formatValue(topLeft)} ${formatValue(topRight)}`
  }
  if (topRight === bottomLeft) {
    return `${formatValue(topLeft)} ${formatValue(topRight)} ${formatValue(bottomRight)}`
  }
  return `${formatValue(topLeft)} ${formatValue(topRight)} ${formatValue(bottomRight)} ${formatValue(bottomLeft)}`
}

function buildIndividualCSS(values: CornerValues): string {
  return CORNERS.map((key) => `${CORNER_CSS_KEYS[key]}: ${formatValue(values[key])};`).join("\n")
}

function highlightCSS(css: string): string {
  return (css || "")
    .replace(
      /(border-radius|border-top-left-radius|border-top-right-radius|border-bottom-right-radius|border-bottom-left-radius)/g,
      '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>'
    )
    .replace(
      /(\d+px)/g,
      '<span class="text-amber-600 dark:text-amber-400">$1</span>'
    )
}

// ─── Component ──────────────────────────────────────────────────────────────

export function BorderRadiusGeneratorTool() {
  const [values, setValues] = useState<CornerValues>({ ...DEFAULT_VALUES })
  const [linked, setLinked] = useState(true)
  const [copied, setCopied] = useState(false)
  const [bgColor, setBgColor] = useState("#f97316")
  const [borderColor, setBorderColor] = useState("#1e293b")
  const [borderWidth, setBorderWidth] = useState(3)
  const [copiedFormat, setCopiedFormat] = useState<"shorthand" | "individual">("shorthand")

  const borderRadiusStyle = useMemo(() => ({
    borderTopLeftRadius: formatValue(values.topLeft),
    borderTopRightRadius: formatValue(values.topRight),
    borderBottomRightRadius: formatValue(values.bottomRight),
    borderBottomLeftRadius: formatValue(values.bottomLeft),
  }), [values])

  const shorthandCSS = useMemo(() => buildShorthand(values), [values])
  const individualCSS = useMemo(() => buildIndividualCSS(values), [values])

  const shorthandHighlighted = useMemo(
    () => highlightCSS(`border-radius: ${shorthandCSS};`),
    [shorthandCSS]
  )

  const individualHighlighted = useMemo(
    () => highlightCSS(individualCSS),
    [individualCSS]
  )

  const updateCorner = useCallback(
    (corner: CornerKey, newValue: number) => {
      setValues((prev) => {
        if (linked) {
          return { topLeft: newValue, topRight: newValue, bottomRight: newValue, bottomLeft: newValue }
        }
        return { ...prev, [corner]: newValue }
      })
    },
    [linked]
  )

  const applyPreset = useCallback((preset: (typeof PRESETS)[number]) => {
    setValues({ ...preset.values })
  }, [])

  const resetAll = useCallback(() => {
    setValues({ ...DEFAULT_VALUES })
    setBgColor("#f97316")
    setBorderColor("#1e293b")
    setBorderWidth(3)
  }, [])

  const handleCopy = useCallback(
    (format: "shorthand" | "individual") => {
      const text =
        format === "shorthand"
          ? `border-radius: ${shorthandCSS};`
          : individualCSS
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setCopiedFormat(format)
        setTimeout(() => setCopied(false), 2000)
      })
    },
    [shorthandCSS, individualCSS]
  )

  // Diagram positions for corner labels
  const diagramCorners: { key: CornerKey; x: string; y: string; align: string }[] = [
    { key: "topLeft", x: "left-3", y: "top-3", align: "items-start justify-start" },
    { key: "topRight", x: "right-3", y: "top-3", align: "items-end justify-start" },
    { key: "bottomRight", x: "right-3", y: "bottom-3", align: "items-end justify-end" },
    { key: "bottomLeft", x: "left-3", y: "bottom-3", align: "items-start justify-end" },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Presets ── */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Presets</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8" onClick={resetAll}>
                  <RotateCcw className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset to default</TooltipContent>
            </Tooltip>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PRESETS.map((preset) => (
              <Tooltip key={preset.name}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => applyPreset(preset)}
                    className="group flex flex-col items-center gap-1.5 rounded-lg border border-border p-2 transition-all hover:scale-105 hover:border-primary/50 hover:bg-accent/50"
                    aria-label={`Apply ${preset.name} preset`}
                  >
                    <div
                      className="size-10 bg-orange-500 transition-all"
                      style={{
                        borderTopLeftRadius: formatValue(preset.values.topLeft),
                        borderTopRightRadius: formatValue(preset.values.topRight),
                        borderBottomRightRadius: formatValue(preset.values.bottomRight),
                        borderBottomLeftRadius: formatValue(preset.values.bottomLeft),
                      }}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {preset.name}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{preset.name} border radius preset</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Card>

        {/* ── Preview + Controls ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Preview Area ── */}
          <Card className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div
              className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center transition-all duration-150"
              style={{
                ...borderRadiusStyle,
                backgroundColor: bgColor,
                border: `${borderWidth}px solid ${borderColor}`,
              }}
            >
              <RectangleHorizontal className="size-12 text-white/70" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Live preview</p>
          </Card>

          {/* ── Controls Panel ── */}
          <Card className="p-6 space-y-5">
            {/* Link All Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {linked ? (
                  <Link className="size-4 text-primary" />
                ) : (
                  <Unlink className="size-4 text-muted-foreground" />
                )}
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Link All Corners</Label>
                  <p className="text-[10px] text-muted-foreground">
                    {linked ? "Changing one corner updates all four" : "Adjust each corner independently"}
                  </p>
                </div>
              </div>
              <Switch checked={linked} onCheckedChange={setLinked} />
            </div>

            <Separator />

            {/* Corner Controls */}
            <div className="space-y-4">
              {CORNERS.map((corner) => (
                <div key={corner} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">{CORNER_LABELS[corner]}</Label>
                    <Input
                      type="number"
                      value={values[corner] >= 9999 ? 9999 : values[corner]}
                      onChange={(e) =>
                        updateCorner(corner, Math.max(0, Math.min(9999, Number(e.target.value) || 0)))
                      }
                      className="w-20 text-center text-xs font-mono"
                      min={0}
                      max={9999}
                    />
                  </div>
                  <Slider
                    value={[values[corner] >= 9999 ? 150 : values[corner]]}
                    onValueChange={([v]) => updateCorner(corner, v)}
                    min={0}
                    max={150}
                    step={1}
                  />
                </div>
              ))}
            </div>

            <Separator />

            {/* Color Customization */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="size-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Preview Colors</Label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Background</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                        aria-label="Background color"
                      />
                      <div className="size-full rounded-md" style={{ backgroundColor: bgColor }} />
                    </div>
                    <Input
                      value={(bgColor || "#f97316")}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-24 font-mono text-xs"
                      placeholder="#f97316"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Border</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border">
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                        aria-label="Border color"
                      />
                      <div className="size-full rounded-md" style={{ backgroundColor: borderColor }} />
                    </div>
                    <Input
                      value={(borderColor || "#1e293b")}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-24 font-mono text-xs"
                      placeholder="#1e293b"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Border Width</Label>
                  <Input
                    type="number"
                    value={borderWidth}
                    onChange={(e) =>
                      setBorderWidth(Math.max(0, Math.min(20, Number(e.target.value) || 0)))
                    }
                    className="w-20 text-center text-xs font-mono"
                    min={0}
                    max={20}
                  />
                </div>
                <Slider
                  value={[borderWidth]}
                  onValueChange={([v]) => setBorderWidth(v)}
                  min={0}
                  max={20}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* ── Visual Corner Diagram ── */}
        <Card className="p-6">
          <Label className="text-sm font-medium mb-4 block">Corner Values Diagram</Label>
          <div className="relative mx-auto w-64 h-48 sm:w-80 sm:h-56">
            {/* Box outline */}
            <div
              className="absolute inset-0 border-2 border-primary/30"
              style={borderRadiusStyle}
            />
            {/* Fill */}
            <div
              className="absolute inset-0 bg-primary/5"
              style={borderRadiusStyle}
            />
            {/* Corner labels */}
            {diagramCorners.map(({ key, x, y, align }) => (
              <div
                key={key}
                className={`absolute ${x} ${y} flex flex-col ${align} pointer-events-none`}
              >
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {formatValue(values[key])}
                </Badge>
                <span className="text-[9px] text-muted-foreground mt-0.5">{CORNER_LABELS[key]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── CSS Output ── */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Generated CSS</Label>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={copied && copiedFormat === "shorthand" ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => handleCopy("shorthand")}
                  >
                    {copied && copiedFormat === "shorthand" ? (
                      <>
                        <Check className="size-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        Copy Shorthand
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy shorthand border-radius</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={copied && copiedFormat === "individual" ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => handleCopy("individual")}
                  >
                    {copied && copiedFormat === "individual" ? (
                      <>
                        <Check className="size-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        Copy Individual
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy individual corner properties</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Mini Preview */}
          <div className="flex justify-center">
            <div
              className="w-32 h-24 transition-all duration-150"
              style={{
                ...borderRadiusStyle,
                backgroundColor: bgColor,
                border: `${borderWidth}px solid ${borderColor}`,
              }}
            />
          </div>

          {/* Shorthand CSS */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Shorthand</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: shorthandHighlighted }}
                />
              </pre>
            </div>
          </div>

          {/* Individual CSS */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Individual Properties</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: individualHighlighted }}
                />
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
