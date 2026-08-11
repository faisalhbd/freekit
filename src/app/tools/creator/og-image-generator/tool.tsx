"use client"

import { useState, useCallback, useRef } from "react"
import {
  Download,
  RotateCcw,
  Type,
  AlignCenter,
  AlignLeft,
  AlignRight,
  ImageIcon,
  Palette,
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
import { Textarea } from "@/components/ui/textarea"

// ─── Types ──────────────────────────────────────────────────────────────────

type TemplateType = "blog" | "product" | "article" | "event" | "custom"
type BgType = "solid" | "gradient"
type LayoutType = "centered" | "left-aligned" | "bottom-heavy"

interface TemplatePreset {
  type: TemplateType
  label: string
  title: string
  subtitle: string
  brand: string
  bgColor: string
  textColor: string
  bgType: BgType
  gradientColor2: string
  gradientAngle: number
  layout: LayoutType
  titleSize: number
  subtitleSize: number
}

// ─── Template Presets ────────────────────────────────────────────────────────

const TEMPLATES: Record<TemplateType, TemplatePreset> = {
  blog: {
    type: "blog",
    label: "Blog Post",
    title: "10 Tips for Better Web Design",
    subtitle: "Learn how to create beautiful, user-friendly websites that convert.",
    brand: "Your Blog",
    bgColor: "#1a1a2e",
    textColor: "#ffffff",
    bgType: "gradient",
    gradientColor2: "#16213e",
    gradientAngle: 135,
    layout: "centered",
    titleSize: 52,
    subtitleSize: 20,
  },
  product: {
    type: "product",
    label: "Product",
    title: "Introducing Product X",
    subtitle: "The all-in-one solution you have been waiting for.",
    brand: "BrandName",
    bgColor: "#0f3460",
    textColor: "#ffffff",
    bgType: "gradient",
    gradientColor2: "#e94560",
    gradientAngle: 135,
    layout: "bottom-heavy",
    titleSize: 56,
    subtitleSize: 22,
  },
  article: {
    type: "article",
    label: "Article",
    title: "The Future of AI in 2025",
    subtitle: "An in-depth look at how artificial intelligence is reshaping industries.",
    brand: "TechDaily",
    bgColor: "#2d3436",
    textColor: "#ffffff",
    bgType: "solid",
    gradientColor2: "#636e72",
    gradientAngle: 135,
    layout: "left-aligned",
    titleSize: 48,
    subtitleSize: 18,
  },
  event: {
    type: "event",
    label: "Event",
    title: "Developer Conference 2025",
    subtitle: "Join 500+ developers for 3 days of talks, workshops, and networking.",
    brand: "DevConf",
    bgColor: "#6c5ce7",
    textColor: "#ffffff",
    bgType: "gradient",
    gradientColor2: "#a29bfe",
    gradientAngle: 135,
    layout: "centered",
    titleSize: 50,
    subtitleSize: 20,
  },
  custom: {
    type: "custom",
    label: "Custom",
    title: "",
    subtitle: "",
    brand: "",
    bgColor: "#1e293b",
    textColor: "#ffffff",
    bgType: "solid",
    gradientColor2: "#334155",
    gradientAngle: 135,
    layout: "centered",
    titleSize: 52,
    subtitleSize: 20,
  },
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getBackgroundStyle(bgType: BgType, bgColor: string, gradientColor2: string, gradientAngle: number): string {
  if (bgType === "solid") return bgColor
  return `linear-gradient(${gradientAngle}deg, ${bgColor}, ${gradientColor2})`
}

function getLayoutClasses(layout: LayoutType): string {
  switch (layout) {
    case "centered":
      return "flex flex-col items-center justify-center text-center"
    case "left-aligned":
      return "flex flex-col items-start justify-center text-left"
    case "bottom-heavy":
      return "flex flex-col items-start justify-end text-left"
    default:
      return "flex flex-col items-center justify-center text-center"
  }
}

// ─── Component ──────────────────────────────────────────────────────────────

export function OGImageGeneratorTool() {
  const [template, setTemplate] = useState<TemplateType>("blog")
  const [title, setTitle] = useState(TEMPLATES.blog.title)
  const [subtitle, setSubtitle] = useState(TEMPLATES.blog.subtitle)
  const [brand, setBrand] = useState(TEMPLATES.blog.brand)
  const [bgColor, setBgColor] = useState(TEMPLATES.blog.bgColor)
  const [bgType, setBgType] = useState<BgType>(TEMPLATES.blog.bgType)
  const [gradientColor2, setGradientColor2] = useState(TEMPLATES.blog.gradientColor2)
  const [gradientAngle, setGradientAngle] = useState(TEMPLATES.blog.gradientAngle)
  const [textColor, setTextColor] = useState(TEMPLATES.blog.textColor)
  const [titleSize, setTitleSize] = useState(TEMPLATES.blog.titleSize)
  const [subtitleSize, setSubtitleSize] = useState(TEMPLATES.blog.subtitleSize)
  const [layout, setLayout] = useState<LayoutType>(TEMPLATES.blog.layout)
  const previewRef = useRef<HTMLDivElement>(null)

  const applyTemplate = useCallback((t: TemplateType) => {
    const preset = TEMPLATES[t]
    setTemplate(t)
    setTitle(preset.title)
    setSubtitle(preset.subtitle)
    setBrand(preset.brand)
    setBgColor(preset.bgColor)
    setBgType(preset.bgType)
    setGradientColor2(preset.gradientColor2)
    setGradientAngle(preset.gradientAngle)
    setTextColor(preset.textColor)
    setTitleSize(preset.titleSize)
    setSubtitleSize(preset.subtitleSize)
    setLayout(preset.layout)
  }, [])

  const resetToDefault = useCallback(() => {
    applyTemplate(template)
  }, [applyTemplate, template])

  const backgroundCSS = getBackgroundStyle(bgType, bgColor, gradientColor2, gradientAngle)
  const layoutClasses = getLayoutClasses(layout)

  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas")
    const W = 1200
    const H = 630
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw background
    if (bgType === "solid") {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, W, H)
    } else {
      const angleRad = (gradientAngle * Math.PI) / 180
      const cx = W / 2
      const cy = H / 2
      const len = Math.sqrt(W * W + H * H) / 2
      const x1 = cx - Math.cos(angleRad) * len
      const y1 = cy - Math.sin(angleRad) * len
      const x2 = cx + Math.cos(angleRad) * len
      const y2 = cy + Math.sin(angleRad) * len
      const grad = ctx.createLinearGradient(x1, y1, x2, y2)
      grad.addColorStop(0, bgColor)
      grad.addColorStop(1, gradientColor2)
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    }

    ctx.fillStyle = textColor
    const padding = 80
    const maxWidth = W - padding * 2

    // Draw brand name at top
    if (brand) {
      ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      ctx.globalAlpha = 0.7
      if (layout === "left-aligned" || layout === "bottom-heavy") {
        ctx.textAlign = "left"
        ctx.fillText(brand, padding, 50)
      } else {
        ctx.textAlign = "center"
        ctx.fillText(brand, W / 2, 50)
      }
      ctx.globalAlpha = 1
    }

    // Title
    const scale = W / 600 // scale factor (preview is ~600px, canvas is 1200px)
    const scaledTitleSize = titleSize * scale
    const scaledSubtitleSize = subtitleSize * scale

    ctx.font = `bold ${scaledTitleSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    ctx.fillStyle = textColor

    // Word wrap title
    const titleLines = wrapText(ctx, title || "", maxWidth)
    let titleY: number
    if (layout === "bottom-heavy") {
      const totalTitleHeight = titleLines.length * (scaledTitleSize * 1.2)
      const subtitleLines = wrapText(ctx, subtitle || "", maxWidth)
      const totalSubtitleHeight = subtitleLines.length * (scaledSubtitleSize * 1.4)
      titleY = H - padding - totalSubtitleHeight - totalTitleHeight - 20
    } else {
      const totalTitleHeight = titleLines.length * (scaledTitleSize * 1.2)
      titleY = (H - totalTitleHeight) / 2 + scaledTitleSize * 0.8
    }

    titleLines.forEach((line, i) => {
      const x =
        layout === "centered" ? W / 2 : padding
      ctx.textAlign = layout === "centered" ? "center" : "left"
      ctx.fillText(line, x, titleY + i * scaledTitleSize * 1.2)
    })

    // Subtitle
    ctx.font = `${scaledSubtitleSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    ctx.globalAlpha = 0.85
    const subtitleLines = wrapText(ctx, subtitle || "", maxWidth)
    const subtitleY = titleY + titleLines.length * scaledTitleSize * 1.2 + 16
    subtitleLines.forEach((line, i) => {
      const x =
        layout === "centered" ? W / 2 : padding
      ctx.textAlign = layout === "centered" ? "center" : "left"
      ctx.fillText(line, x, subtitleY + i * scaledSubtitleSize * 1.4)
    })
    ctx.globalAlpha = 1

    // Download
    const link = document.createElement("a")
    link.download = "og-image.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [bgType, bgColor, gradientColor2, gradientAngle, textColor, title, subtitle, brand, titleSize, subtitleSize, layout])

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Template Selector ── */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Template</Label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(Object.keys(TEMPLATES) as TemplateType[]).map((key) => (
              <Button
                key={key}
                variant={template === key ? "default" : "outline"}
                size="sm"
                className="text-xs w-full"
                onClick={() => applyTemplate(key)}
              >
                {TEMPLATES[key].label}
              </Button>
            ))}
          </div>
        </Card>

        {/* ── Preview Area ── */}
        <Card className="overflow-hidden p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <ImageIcon className="size-3.5" />
              Preview (1200 × 630)
            </Label>
            <Badge variant="secondary" className="text-[10px]">
              {bgType === "gradient" ? "Gradient" : "Solid"}
            </Badge>
          </div>
          <div
            ref={previewRef}
            className="w-full rounded-lg overflow-hidden shadow-lg"
            style={{ aspectRatio: "1200 / 630" }}
          >
            <div
              className={`${layoutClasses} w-full h-full px-[8%] py-[6%] relative`}
              style={{ background: backgroundCSS }}
            >
              {/* Brand */}
              {brand && (
                <span
                  className="absolute top-[6%] left-[8%] text-sm font-semibold tracking-wider uppercase"
                  style={{ color: textColor, opacity: 0.6, fontSize: 14 }}
                >
                  {brand}
                </span>
              )}

              {/* Title */}
              <h2
                className="font-bold leading-tight max-w-full break-words"
                style={{
                  color: textColor,
                  fontSize: titleSize,
                  lineHeight: 1.15,
                }}
              >
                {title || "Your Title Here"}
              </h2>

              {/* Subtitle */}
              {(subtitle || "") && (
                <p
                  className="mt-3 max-w-full break-words"
                  style={{
                    color: textColor,
                    fontSize: subtitleSize,
                    opacity: 0.85,
                    lineHeight: 1.4,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* ── Controls ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Text Controls */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Type className="size-4" />
              Text Content
            </h3>

            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Title</Label>
                <span className="text-[11px] text-muted-foreground">
                  {(title || "").length} / 60
                </span>
              </div>
              <Textarea
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 60))}
                placeholder="Enter your OG image title..."
                className="min-h-[72px] text-sm resize-none"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Subtitle / Description</Label>
                <span className="text-[11px] text-muted-foreground">
                  {(subtitle || "").length} / 120
                </span>
              </div>
              <Textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value.slice(0, 120))}
                placeholder="Enter a description..."
                className="min-h-[60px] text-sm resize-none"
              />
            </div>

            {/* Brand */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Brand / Website</Label>
              <Input
                value={brand}
                onChange={(e) => setBrand(e.target.value.slice(0, 40))}
                placeholder="Your brand name"
                className="text-sm"
              />
            </div>

            <Separator />

            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Palette className="size-4" />
              Styling
            </h3>

            {/* Layout */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Layout</Label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: "centered", icon: AlignCenter, label: "Centered" },
                    { value: "left-aligned", icon: AlignLeft, label: "Left" },
                    { value: "bottom-heavy", icon: AlignRight, label: "Bottom" },
                  ] as const
                ).map((opt) => (
                  <Button
                    key={opt.value}
                    variant={layout === opt.value ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setLayout(opt.value)}
                  >
                    <opt.icon className="size-3.5" />
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Title Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Title Size</Label>
                <Badge variant="secondary" className="text-[10px]">
                  {titleSize}px
                </Badge>
              </div>
              <Input
                type="range"
                min={24}
                max={72}
                step={2}
                value={titleSize}
                onChange={(e) => setTitleSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Subtitle Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Subtitle Size</Label>
                <Badge variant="secondary" className="text-[10px]">
                  {subtitleSize}px
                </Badge>
              </div>
              <Input
                type="range"
                min={12}
                max={36}
                step={2}
                value={subtitleSize}
                onChange={(e) => setSubtitleSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </Card>

          {/* Right: Color & Background Controls */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Palette className="size-4" />
              Colors & Background
            </h3>

            {/* Background Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Background Type</Label>
              <Tabs
                value={bgType}
                onValueChange={(v) => setBgType(v as BgType)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="solid" className="text-xs">
                    Solid
                  </TabsTrigger>
                  <TabsTrigger value="gradient" className="text-xs">
                    Gradient
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Background Color 1 */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                {bgType === "gradient" ? "Start Color" : "Background Color"}
              </Label>
              <div className="flex items-center gap-3">
                <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                    aria-label="Background color"
                  />
                  <div
                    className="size-full rounded-md"
                    style={{ backgroundColor: bgColor }}
                  />
                </div>
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-28 font-mono text-xs"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Gradient Controls */}
            {bgType === "gradient" && (
              <>
                {/* Gradient Color 2 */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">End Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                      <input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                        aria-label="Gradient end color"
                      />
                      <div
                        className="size-full rounded-md"
                        style={{ backgroundColor: gradientColor2 }}
                      />
                    </div>
                    <Input
                      value={gradientColor2}
                      onChange={(e) => setGradientColor2(e.target.value)}
                      className="w-28 font-mono text-xs"
                      maxLength={7}
                    />
                  </div>
                </div>

                {/* Gradient Angle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Gradient Angle</Label>
                    <Badge variant="secondary" className="text-[10px]">
                      {gradientAngle}°
                    </Badge>
                  </div>
                  <Input
                    type="range"
                    min={0}
                    max={360}
                    step={15}
                    value={gradientAngle}
                    onChange={(e) => setGradientAngle(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </>
            )}

            <Separator />

            {/* Text Color */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Text Color</Label>
              <div className="flex items-center gap-3">
                <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                    aria-label="Text color"
                  />
                  <div
                    className="size-full rounded-md"
                    style={{ backgroundColor: textColor }}
                  />
                </div>
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-28 font-mono text-xs"
                  maxLength={7}
                />
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2"
                onClick={handleDownload}
              >
                <Download className="size-4" />
                Download PNG
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={resetToDefault}>
                    <RotateCcw className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset to template defaults</TooltipContent>
              </Tooltip>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

// ─── Word Wrap Helper ───────────────────────────────────────────────────────

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return []
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) {
    lines.push(currentLine)
  }
  return lines
}
