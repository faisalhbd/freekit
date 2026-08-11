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
  Upload,
  Layers,
  Eye,
  CircleOff,
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

// ─── Types ──────────────────────────────────────────────────────────────────

type BgType = "solid" | "gradient"
type OverlayType = "none" | "dark-gradient" | "vignette"
type TextAlign = "left" | "center" | "right"

// ─── Component ──────────────────────────────────────────────────────────────

export function YouTubeThumbnailMakerTool() {
  // Background state
  const [bgType, setBgType] = useState<BgType>("gradient")
  const [bgColor, setBgColor] = useState("#1a1a2e")
  const [gradientColor2, setGradientColor2] = useState("#e94560")
  const [gradientAngle, setGradientAngle] = useState(135)

  // Image upload
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Text state
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [titleSize, setTitleSize] = useState(56)
  const [subtitleSize, setSubtitleSize] = useState(24)
  const [textColor, setTextColor] = useState("#ffffff")
  const [textAlign, setTextAlign] = useState<TextAlign>("center")

  // Text effects
  const [strokeEnabled, setStrokeEnabled] = useState(true)
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [shadowEnabled, setShadowEnabled] = useState(true)

  // Overlay
  const [overlay, setOverlay] = useState<OverlayType>("dark-gradient")

  // ── File Upload ──────────────────────────────────────────────────────
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => setBgImage(img)
      img.src = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [])

  const clearImage = useCallback(() => {
    setBgImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  // ── Reset ───────────────────────────────────────────────────────────
  const resetToDefault = useCallback(() => {
    setBgType("gradient")
    setBgColor("#1a1a2e")
    setGradientColor2("#e94560")
    setGradientAngle(135)
    setBgImage(null)
    setTitle("")
    setSubtitle("")
    setTitleSize(56)
    setSubtitleSize(24)
    setTextColor("#ffffff")
    setTextAlign("center")
    setStrokeEnabled(true)
    setStrokeColor("#000000")
    setShadowEnabled(true)
    setOverlay("dark-gradient")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  // ── Preview Background ─────────────────────────────────────────────
  const getBackgroundCSS = (): string => {
    if (bgImage) return ""
    if (bgType === "solid") return bgColor
    return `linear-gradient(${gradientAngle}deg, ${bgColor}, ${gradientColor2})`
  }

  const getOverlayCSS = (): string => {
    switch (overlay) {
      case "dark-gradient":
        return "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)"
      case "vignette":
        return "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)"
      case "none":
        return ""
      default:
        return ""
    }
  }

  // ── Text Alignment Classes ──────────────────────────────────────────
  const getAlignClass = (): string => {
    switch (textAlign) {
      case "left": return "items-start text-left"
      case "right": return "items-end text-right"
      case "center":
      default:
        return "items-center text-center"
    }
  }

  const getStrokeStyle = (fontSize: number): React.CSSProperties => {
    if (!strokeEnabled) return {}
    return {
      WebkitTextStroke: `2px ${strokeColor}`,
      paintOrder: "stroke fill",
    }
  }

  const getShadowStyle = (): React.CSSProperties => {
    if (!shadowEnabled) return {}
    return {
      textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)",
    }
  }

  // ── Download ────────────────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    const canvas = document.createElement("canvas")
    const W = 1280
    const H = 720
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw background
    if (bgImage) {
      // Cover-fit the image
      const imgRatio = bgImage.width / bgImage.height
      const canvasRatio = W / H
      let sx = 0, sy = 0, sw = bgImage.width, sh = bgImage.height
      if (imgRatio > canvasRatio) {
        sw = bgImage.height * canvasRatio
        sx = (bgImage.width - sw) / 2
      } else {
        sh = bgImage.width / canvasRatio
        sy = (bgImage.height - sh) / 2
      }
      ctx.drawImage(bgImage, sx, sy, sw, sh, 0, 0, W, H)
    } else if (bgType === "solid") {
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

    // Draw overlay
    if (overlay === "dark-gradient") {
      const grad = ctx.createLinearGradient(0, H, 0, 0)
      grad.addColorStop(0, "rgba(0,0,0,0.75)")
      grad.addColorStop(0.5, "rgba(0,0,0,0.15)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    } else if (overlay === "vignette") {
      const grad = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.75)
      grad.addColorStop(0, "rgba(0,0,0,0)")
      grad.addColorStop(1, "rgba(0,0,0,0.65)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    }

    // Font setup
    const fontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    const padding = 60
    const maxWidth = W - padding * 2
    const scale = W / 640

    // Draw subtitle
    const scaledSubtitleSize = subtitleSize * scale
    if (subtitle) {
      ctx.font = `bold ${scaledSubtitleSize}px ${fontStack}`
      ctx.textAlign = textAlign
      const subX = textAlign === "center" ? W / 2 : textAlign === "right" ? W - padding : padding
      const subLines = wrapText(ctx, subtitle, maxWidth * 0.85)
      const subTotalH = subLines.length * scaledSubtitleSize * 1.35
      const subY = H - padding - (subTotalH - scaledSubtitleSize)

      subLines.forEach((line, i) => {
        const y = subY + i * scaledSubtitleSize * 1.35
        if (shadowEnabled) {
          ctx.shadowColor = "rgba(0,0,0,0.8)"
          ctx.shadowBlur = 16
          ctx.shadowOffsetX = 3
          ctx.shadowOffsetY = 3
        }
        if (strokeEnabled) {
          ctx.strokeStyle = strokeColor
          ctx.lineWidth = scale * 3
          ctx.lineJoin = "round"
          ctx.strokeText(line, subX, y)
        }
        ctx.fillStyle = textColor
        ctx.fillText(line, subX, y)
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      })
    }

    // Draw title
    const scaledTitleSize = titleSize * scale
    if (title) {
      ctx.font = `900 ${scaledTitleSize}px ${fontStack}`
      ctx.textAlign = textAlign
      const titleX = textAlign === "center" ? W / 2 : textAlign === "right" ? W - padding : padding
      const titleLines = wrapText(ctx, title, maxWidth * 0.9)
      const titleTotalH = titleLines.length * scaledTitleSize * 1.15

      let titleY: number
      if (subtitle) {
        const subLines = wrapText(ctx, subtitle, maxWidth * 0.85)
        const subTotalH = subLines.length * scaledSubtitleSize * 1.35
        titleY = H - padding - subTotalH - titleTotalH - 20 * scale
      } else {
        titleY = (H - titleTotalH) / 2 + scaledTitleSize * 0.85
      }

      titleLines.forEach((line, i) => {
        const y = titleY + i * scaledTitleSize * 1.15
        if (shadowEnabled) {
          ctx.shadowColor = "rgba(0,0,0,0.8)"
          ctx.shadowBlur = 20
          ctx.shadowOffsetX = 4
          ctx.shadowOffsetY = 4
        }
        if (strokeEnabled) {
          ctx.strokeStyle = strokeColor
          ctx.lineWidth = scale * 4
          ctx.lineJoin = "round"
          ctx.strokeText(line, titleX, y)
        }
        ctx.fillStyle = textColor
        ctx.fillText(line, titleX, y)
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      })
    }

    // Download
    const link = document.createElement("a")
    link.download = "youtube-thumbnail.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [bgImage, bgType, bgColor, gradientColor2, gradientAngle, overlay, title, subtitle, titleSize, subtitleSize, textColor, textAlign, strokeEnabled, strokeColor, shadowEnabled])

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ── Preview Area ── */}
        <Card className="overflow-hidden p-4">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Eye className="size-3.5" />
              Preview (1280 × 720)
            </Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">
                Recommended: 1280×720px
              </Badge>
              {bgImage && (
                <Badge variant="outline" className="text-[10px]">
                  Image uploaded
                </Badge>
              )}
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden shadow-lg relative" style={{ aspectRatio: "1280 / 720" }}>
            {bgImage ? (
              <img
                src={bgImage.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ background: getBackgroundCSS() }}
              />
            )}
            {/* Overlay */}
            {overlay !== "none" && (
              <div className="absolute inset-0" style={{ background: getOverlayCSS() }} />
            )}
            {/* Text Content */}
            <div className={`absolute inset-0 flex flex-col justify-end px-[6%] pb-[8%] ${getAlignClass()}`}>
              {title && (
                <h2
                  className="font-black leading-[1.1] break-words max-w-[90%]"
                  style={{
                    color: textColor,
                    fontSize: titleSize,
                    ...getStrokeStyle(titleSize),
                    ...getShadowStyle(),
                  }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className="mt-2 font-bold leading-tight break-words max-w-[85%]"
                  style={{
                    color: textColor,
                    fontSize: subtitleSize,
                    ...getStrokeStyle(subtitleSize),
                    ...getShadowStyle(),
                    opacity: 0.95,
                  }}
                >
                  {subtitle}
                </p>
              )}
              {!title && !subtitle && (
                <p className="text-white/40 text-lg">Your text will appear here...</p>
              )}
            </div>
          </div>
        </Card>

        {/* ── Controls ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Text & Effects */}
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
                  {(title || "").length} / 50
                </span>
              </div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                placeholder="Enter your thumbnail title..."
                className="text-sm font-semibold"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Subtitle</Label>
                <span className="text-[11px] text-muted-foreground">
                  {(subtitle || "").length} / 80
                </span>
              </div>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value.slice(0, 80))}
                placeholder="Enter a subtitle or description..."
                className="text-sm"
              />
            </div>

            <Separator />

            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Palette className="size-4" />
              Text Styling
            </h3>

            {/* Text Alignment */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Text Alignment</Label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: "left" as TextAlign, icon: AlignLeft, label: "Left" },
                    { value: "center" as TextAlign, icon: AlignCenter, label: "Center" },
                    { value: "right" as TextAlign, icon: AlignRight, label: "Right" },
                  ] as const
                ).map((opt) => (
                  <Button
                    key={opt.value}
                    variant={textAlign === opt.value ? "default" : "outline"}
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setTextAlign(opt.value)}
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
                min={28}
                max={80}
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
                min={14}
                max={40}
                step={2}
                value={subtitleSize}
                onChange={(e) => setSubtitleSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

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
                  <div className="size-full rounded-md" style={{ backgroundColor: textColor }} />
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

            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Layers className="size-4" />
              Text Effects
            </h3>

            {/* Stroke Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Text Outline / Stroke</Label>
              <Button
                variant={strokeEnabled ? "default" : "outline"}
                size="sm"
                className="text-xs h-7 px-3"
                onClick={() => setStrokeEnabled(!strokeEnabled)}
              >
                {strokeEnabled ? "On" : "Off"}
              </Button>
            </div>

            {/* Stroke Color */}
            {strokeEnabled && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Stroke Color</Label>
                <div className="flex items-center gap-3">
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="absolute inset-0 size-full cursor-pointer opacity-0"
                      aria-label="Stroke color"
                    />
                    <div className="size-full rounded-md" style={{ backgroundColor: strokeColor }} />
                  </div>
                  <Input
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="w-28 font-mono text-xs"
                    maxLength={7}
                  />
                </div>
              </div>
            )}

            {/* Shadow Toggle */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Text Shadow</Label>
              <Button
                variant={shadowEnabled ? "default" : "outline"}
                size="sm"
                className="text-xs h-7 px-3"
                onClick={() => setShadowEnabled(!shadowEnabled)}
              >
                {shadowEnabled ? "On" : "Off"}
              </Button>
            </div>
          </Card>

          {/* Right: Background & Overlay & Actions */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <ImageIcon className="size-4" />
              Background
            </h3>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Background Image</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="size-3.5" />
                  {bgImage ? "Change Image" : "Upload Image"}
                </Button>
                {bgImage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-3"
                    onClick={clearImage}
                  >
                    <CircleOff className="size-3.5 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                aria-label="Upload background image"
              />
            </div>

            {/* Background Type (when no image) */}
            {!bgImage && (
              <>
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
                      <div className="size-full rounded-md" style={{ backgroundColor: bgColor }} />
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
                          <div className="size-full rounded-md" style={{ backgroundColor: gradientColor2 }} />
                        </div>
                        <Input
                          value={gradientColor2}
                          onChange={(e) => setGradientColor2(e.target.value)}
                          className="w-28 font-mono text-xs"
                          maxLength={7}
                        />
                      </div>
                    </div>

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
              </>
            )}

            <Separator />

            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Layers className="size-4" />
              Overlay Effect
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { value: "none" as OverlayType, label: "None", icon: CircleOff },
                  { value: "dark-gradient" as OverlayType, label: "Dark Gradient", icon: Layers },
                  { value: "vignette" as OverlayType, label: "Vignette", icon: Eye },
                ] as const
              ).map((opt) => (
                <Button
                  key={opt.value}
                  variant={overlay === opt.value ? "default" : "outline"}
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setOverlay(opt.value)}
                >
                  <opt.icon className="size-3.5" />
                  {opt.label}
                </Button>
              ))}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 gap-2" onClick={handleDownload}>
                <Download className="size-4" />
                Download PNG
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={resetToDefault}>
                    <RotateCcw className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset to defaults</TooltipContent>
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
