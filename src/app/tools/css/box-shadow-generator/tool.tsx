"use client"

import { useState, useCallback, useMemo } from "react"
import {
  Copy,
  Check,
  Plus,
  Trash2,
  Square,
  Eye,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ──────────────────────────────────────────────────────────────────

interface ShadowLayer {
  id: string
  x: number
  y: number
  blur: number
  spread: number
  color: string
  opacity: number
  inset: boolean
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MAX_LAYERS = 3

const DEFAULT_SHADOW: Omit<ShadowLayer, "id"> = {
  x: 0,
  y: 4,
  blur: 6,
  spread: -1,
  color: "#000000",
  opacity: 10,
  inset: false,
}

const PRESETS: {
  name: string
  layers: Omit<ShadowLayer, "id">[]
}[] = [
  {
    name: "Subtle",
    layers: [
      { x: 0, y: 1, blur: 3, spread: 0, color: "#000000", opacity: 12, inset: false },
    ],
  },
  {
    name: "Medium",
    layers: [
      { x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 10, inset: false },
    ],
  },
  {
    name: "Dramatic",
    layers: [
      { x: 0, y: 10, blur: 25, spread: -5, color: "#000000", opacity: 15, inset: false },
    ],
  },
  {
    name: "Neon Glow",
    layers: [
      { x: 0, y: 0, blur: 10, spread: 0, color: "#00ff88", opacity: 50, inset: false },
      { x: 0, y: 0, blur: 40, spread: 0, color: "#00ff88", opacity: 20, inset: false },
    ],
  },
  {
    name: "Soft Float",
    layers: [
      { x: 0, y: 20, blur: 60, spread: -15, color: "#000000", opacity: 20, inset: false },
    ],
  },
  {
    name: "Sharp",
    layers: [
      { x: 4, y: 4, blur: 0, spread: 0, color: "#000000", opacity: 20, inset: false },
    ],
  },
  {
    name: "Inset Press",
    layers: [
      { x: 0, y: 2, blur: 4, spread: 0, color: "#000000", opacity: 15, inset: true },
    ],
  },
  {
    name: "Layered",
    layers: [
      { x: 0, y: 1, blur: 2, spread: 0, color: "#000000", opacity: 5, inset: false },
      { x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 10, inset: false },
      { x: 0, y: 10, blur: 20, spread: -5, color: "#000000", opacity: 8, inset: false },
    ],
  },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function hexToRgba(hex: string, opacity: number): string {
  const h = (hex || "#000000").replace("#", "")
  const r = parseInt(h.substring(0, 2) || "0", 16)
  const g = parseInt(h.substring(2, 4) || "0", 16)
  const b = parseInt(h.substring(4, 6) || "0", 16)
  const a = Math.max(0, Math.min(100, opacity)) / 100
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function buildShadowCSS(layers: ShadowLayer[]): string {
  return layers
    .map((layer) => {
      const inset = layer.inset ? "inset " : ""
      const color = hexToRgba(layer.color, layer.opacity)
      return `${inset}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${color}`
    })
    .join(", ")
}

function createLayer(overrides?: Partial<Omit<ShadowLayer, "id">>): ShadowLayer {
  return { ...DEFAULT_SHADOW, ...overrides, id: generateId() }
}

function highlightCSS(css: string): string {
  return (css || "")
    .replace(
      /(box-shadow|inset)/g,
      '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>'
    )
    .replace(
      /(\d+px)/g,
      '<span class="text-amber-600 dark:text-amber-400">$1</span>'
    )
    .replace(
      /(rgba\([^)]+\))/g,
      '<span class="text-emerald-600 dark:text-emerald-400">$1</span>'
    )
}

// ─── Component ──────────────────────────────────────────────────────────────

export function BoxShadowGeneratorTool() {
  const [layers, setLayers] = useState<ShadowLayer[]>([createLayer()])
  const [activeLayerId, setActiveLayerId] = useState<string>(layers[0].id)
  const [copied, setCopied] = useState(false)

  const activeLayer = useMemo(
    () => layers.find((l) => l.id === activeLayerId) || layers[0] || createLayer(),
    [layers, activeLayerId]
  )

  const boxShadowCSS = useMemo(() => buildShadowCSS(layers), [layers])

  const previewStyle = useMemo(
    () => ({ boxShadow: boxShadowCSS }),
    [boxShadowCSS]
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadowCSS};`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [boxShadowCSS])

  const updateLayer = useCallback(
    (id: string, field: keyof ShadowLayer, value: number | string | boolean) => {
      setLayers((prev) =>
        prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
      )
    },
    []
  )

  const addLayer = useCallback(() => {
    if (layers.length >= MAX_LAYERS) return
    const newLayer = createLayer({ y: layers.length * 4 + 4, blur: layers.length * 4 + 6 })
    setLayers((prev) => [...prev, newLayer])
    setActiveLayerId(newLayer.id)
  }, [layers.length])

  const removeLayer = useCallback((id: string) => {
    setLayers((prev) => {
      if (prev.length <= 1) return prev
      const next = prev.filter((l) => l.id !== id)
      setActiveLayerId((cur) => (cur === id ? (next[0] ? next[0].id : "") : cur))
      return next
    })
  }, [])

  const applyPreset = useCallback((preset: (typeof PRESETS)[number]) => {
    const newLayers = preset.layers.map((l) => createLayer(l))
    setLayers(newLayers)
    setActiveLayerId(newLayers[0] ? newLayers[0].id : "")
  }, [])

  const resetAll = useCallback(() => {
    const fresh = createLayer()
    setLayers([fresh])
    setActiveLayerId(fresh.id)
  }, [])

  const highlightedCSS = useMemo(() => highlightCSS(`box-shadow: ${boxShadowCSS};`), [boxShadowCSS])

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Preset Shadows ── */}
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
            {PRESETS.map((preset) => {
              const presetCSS = buildShadowCSS(
                preset.layers.map((l) => ({ ...l, id: "" })) as ShadowLayer[]
              )
              return (
                <Tooltip key={preset.name}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => applyPreset(preset)}
                      className="group flex flex-col items-center gap-1.5 rounded-lg border border-border p-2 transition-all hover:scale-105 hover:border-primary/50 hover:bg-accent/50"
                      aria-label={`Apply ${preset.name} preset`}
                    >
                      <div
                        className="size-10 rounded-md bg-white dark:bg-zinc-800 transition-shadow"
                        style={{ boxShadow: presetCSS }}
                      />
                      <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {preset.name}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{preset.name} shadow preset</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </Card>

        {/* ── Preview + Controls ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Preview Area ── */}
          <Card className="p-6 flex flex-col items-center justify-center min-h-[320px]">
            <div
              className="w-40 h-40 rounded-2xl bg-white dark:bg-zinc-100 flex items-center justify-center transition-shadow duration-150"
              style={previewStyle}
            >
              <Square className="size-10 text-zinc-300 dark:text-zinc-400" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Live preview</p>
          </Card>

          {/* ── Controls Panel ── */}
          <Card className="p-6 space-y-5">
            {/* Layer Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Shadow Layers</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs"
                      onClick={addLayer}
                      disabled={layers.length >= MAX_LAYERS}
                    >
                      <Plus className="size-3" />
                      Add Layer
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {layers.length >= MAX_LAYERS
                      ? `Maximum ${MAX_LAYERS} layers`
                      : "Add shadow layer"}
                  </TooltipContent>
                </Tooltip>
              </div>

              <Tabs
                value={activeLayerId}
                onValueChange={setActiveLayerId}
              >
                <TabsList className="w-full">
                  {layers.map((layer, idx) => (
                    <TabsTrigger
                      key={layer.id}
                      value={layer.id}
                      className="gap-1.5 text-xs flex-1"
                    >
                      <Eye className="size-3" />
                      Layer {idx + 1}
                      {layers.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeLayer(layer.id)
                          }}
                          className="ml-1 p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors"
                          aria-label={`Remove layer ${idx + 1}`}
                        >
                          <Trash2 className="size-2.5" />
                        </button>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {layers.map((layer) => (
                  <TabsContent key={layer.id} value={layer.id} className="mt-4 space-y-4">
                    {/* X Offset */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium">X Offset</Label>
                        <Input
                          type="number"
                          value={layer.x}
                          onChange={(e) =>
                            updateLayer(
                              layer.id,
                              "x",
                              Math.max(-50, Math.min(50, Number(e.target.value) || 0))
                            )
                          }
                          className="w-20 text-center text-xs font-mono"
                          min={-50}
                          max={50}
                        />
                      </div>
                      <Slider
                        value={[layer.x]}
                        onValueChange={([v]) => updateLayer(layer.id, "x", v)}
                        min={-50}
                        max={50}
                        step={1}
                      />
                    </div>

                    {/* Y Offset */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium">Y Offset</Label>
                        <Input
                          type="number"
                          value={layer.y}
                          onChange={(e) =>
                            updateLayer(
                              layer.id,
                              "y",
                              Math.max(-50, Math.min(50, Number(e.target.value) || 0))
                            )
                          }
                          className="w-20 text-center text-xs font-mono"
                          min={-50}
                          max={50}
                        />
                      </div>
                      <Slider
                        value={[layer.y]}
                        onValueChange={([v]) => updateLayer(layer.id, "y", v)}
                        min={-50}
                        max={50}
                        step={1}
                      />
                    </div>

                    {/* Blur */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium">Blur Radius</Label>
                        <Input
                          type="number"
                          value={layer.blur}
                          onChange={(e) =>
                            updateLayer(
                              layer.id,
                              "blur",
                              Math.max(0, Math.min(100, Number(e.target.value) || 0))
                            )
                          }
                          className="w-20 text-center text-xs font-mono"
                          min={0}
                          max={100}
                        />
                      </div>
                      <Slider
                        value={[layer.blur]}
                        onValueChange={([v]) => updateLayer(layer.id, "blur", v)}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>

                    {/* Spread */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium">Spread Radius</Label>
                        <Input
                          type="number"
                          value={layer.spread}
                          onChange={(e) =>
                            updateLayer(
                              layer.id,
                              "spread",
                              Math.max(-50, Math.min(50, Number(e.target.value) || 0))
                            )
                          }
                          className="w-20 text-center text-xs font-mono"
                          min={-50}
                          max={50}
                        />
                      </div>
                      <Slider
                        value={[layer.spread]}
                        onValueChange={([v]) => updateLayer(layer.id, "spread", v)}
                        min={-50}
                        max={50}
                        step={1}
                      />
                    </div>

                    <Separator />

                    {/* Color Picker */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Shadow Color</Label>
                      <div className="flex items-center gap-3">
                        <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                          <input
                            type="color"
                            value={layer.color}
                            onChange={(e) => updateLayer(layer.id, "color", e.target.value)}
                            className="absolute inset-0 size-full cursor-pointer opacity-0"
                            aria-label="Shadow color"
                          />
                          <div
                            className="size-full rounded-md"
                            style={{ backgroundColor: layer.color }}
                          />
                        </div>
                        <Input
                          value={(layer.color || "#000000")}
                          onChange={(e) => updateLayer(layer.id, "color", e.target.value)}
                          className="w-28 font-mono text-xs"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    {/* Opacity Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium">Opacity</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={layer.opacity}
                            onChange={(e) =>
                              updateLayer(
                                layer.id,
                                "opacity",
                                Math.max(0, Math.min(100, Number(e.target.value) || 0))
                              )
                            }
                            className="w-16 text-center text-xs font-mono"
                            min={0}
                            max={100}
                          />
                          <Badge variant="secondary" className="text-[10px] px-1.5">
                            %
                          </Badge>
                        </div>
                      </div>
                      <Slider
                        value={[layer.opacity]}
                        onValueChange={([v]) => updateLayer(layer.id, "opacity", v)}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>

                    <Separator />

                    {/* Inset Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-xs font-medium">Inset Shadow</Label>
                        <p className="text-[10px] text-muted-foreground">
                          Renders shadow inside the element
                        </p>
                      </div>
                      <Switch
                        checked={layer.inset}
                        onCheckedChange={(checked) => updateLayer(layer.id, "inset", checked)}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </Card>
        </div>

        {/* ── CSS Output ── */}
        <Card className="p-6 space-y-4">
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
            className="h-16 rounded-lg bg-white dark:bg-zinc-100 mx-auto w-40 transition-shadow duration-150"
            style={previewStyle}
          />

          {/* Code Block */}
          <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code
                className="text-foreground"
                dangerouslySetInnerHTML={{ __html: highlightedCSS }}
              />
            </pre>
          </div>

          {/* Individual Layer Values */}
          {layers.length > 1 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">Individual Layers</p>
              {layers.map((layer, idx) => {
                const layerCSS = buildShadowCSS([layer])
                return (
                  <div
                    key={layer.id}
                    className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2"
                  >
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      L{idx + 1}
                    </Badge>
                    <code className="text-xs font-mono text-muted-foreground flex-1 truncate">
                      {layerCSS}
                    </code>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </TooltipProvider>
  )
}
