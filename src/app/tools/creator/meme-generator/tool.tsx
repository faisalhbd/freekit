"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Download,
  RotateCcw,
  Upload,
  ImageIcon,
  Type,
  SmilePlus,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Meme Template Definitions ─────────────────────────────────────────────

interface MemeTemplate {
  name: string
  bgColor: string
  pattern: string
}

const MEME_TEMPLATES: MemeTemplate[] = [
  { name: "Drake Hotline Bling", bgColor: "#f59e0b", pattern: "drake" },
  { name: "Distracted Boyfriend", bgColor: "#ef4444", pattern: "distracted" },
  { name: "Two Buttons", bgColor: "#8b5cf6", pattern: "buttons" },
  { name: "Change My Mind", bgColor: "#22c55e", pattern: "changemind" },
  { name: "Expanding Brain", bgColor: "#3b82f6", pattern: "brain" },
  { name: "This Is Fine", bgColor: "#f97316", pattern: "thisisfine" },
  { name: "One Does Not Simply", bgColor: "#64748b", pattern: "simply" },
  { name: "Success Kid", bgColor: "#14b8a6", pattern: "success" },
  { name: "Bad Luck Brian", bgColor: "#eab308", pattern: "badluck" },
  { name: "Woman Yelling at Cat", bgColor: "#ec4899", pattern: "yelling" },
]

// ─── Canvas Drawing Helpers ────────────────────────────────────────────────

function drawTemplatePlaceholder(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  template: MemeTemplate
) {
  // Background
  ctx.fillStyle = template.bgColor
  ctx.fillRect(0, 0, w, h)

  // Draw pattern based on template
  ctx.globalAlpha = 0.15
  ctx.fillStyle = "#000000"
  ctx.font = `bold ${Math.min(w, h) * 0.08}px Impact, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  switch (template.pattern) {
    case "drake": {
      // Two panels top/bottom
      ctx.globalAlpha = 0.1
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h / 2 - 2)
      ctx.fillRect(0, h / 2 + 2, w, h / 2 - 2)
      ctx.globalAlpha = 0.3
      ctx.fillStyle = "#fff"
      ctx.font = `bold ${Math.min(w, h) * 0.07}px Impact, sans-serif`
      ctx.fillText("NO", w / 2, h * 0.25)
      ctx.fillText("YES", w / 2, h * 0.75)
      break
    }
    case "distracted": {
      // Three figures suggestion
      ctx.globalAlpha = 0.15
      ctx.beginPath()
      ctx.arc(w * 0.3, h * 0.5, h * 0.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(w * 0.7, h * 0.35, h * 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(w * 0.8, h * 0.65, h * 0.12, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case "buttons": {
      ctx.globalAlpha = 0.15
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.roundRect(w * 0.2 - 60, h * 0.6 - 30, 120, 60, 10)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(w * 0.8 - 60, h * 0.6 - 30, 120, 60, 10)
      ctx.fill()
      // Sweat drops
      ctx.globalAlpha = 0.2
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.arc(w * 0.3 + i * 15, h * 0.35 + (i % 2) * 10, 4, 0, Math.PI * 2)
        ctx.fill()
      }
      break
    }
    case "changemind": {
      // Table suggestion
      ctx.globalAlpha = 0.12
      ctx.fillStyle = "#000"
      ctx.fillRect(w * 0.2, h * 0.4, w * 0.6, h * 0.05)
      ctx.fillRect(w * 0.35, h * 0.45, w * 0.05, h * 0.3)
      ctx.fillRect(w * 0.6, h * 0.45, w * 0.05, h * 0.3)
      break
    }
    case "brain": {
      // Expanding brains - circles of increasing size
      ctx.globalAlpha = 0.1
      ctx.fillStyle = "#000"
      const sizes = [0.08, 0.12, 0.16, 0.22]
      const xs = [0.15, 0.38, 0.62, 0.85]
      sizes.forEach((s, i) => {
        ctx.beginPath()
        ctx.arc(w * xs[i], h * 0.5, h * s, 0, Math.PI * 2)
        ctx.fill()
      })
      break
    }
    case "thisisfine": {
      // Fire suggestion at bottom
      ctx.globalAlpha = 0.15
      ctx.fillStyle = "#ff6600"
      for (let i = 0; i < 7; i++) {
        const fx = w * 0.2 + i * (w * 0.08)
        const fh = h * (0.15 + Math.sin(i * 1.2) * 0.08)
        ctx.beginPath()
        ctx.ellipse(fx, h - 10, 12, fh, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      // Simple dog face
      ctx.fillStyle = "#000"
      ctx.globalAlpha = 0.12
      ctx.beginPath()
      ctx.arc(w * 0.5, h * 0.35, h * 0.18, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case "simply": {
      // Map suggestion
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(w * 0.2, h * 0.2 + i * (h * 0.2))
        ctx.lineTo(w * 0.8, h * 0.2 + i * (h * 0.2))
        ctx.stroke()
      }
      break
    }
    case "success": {
      // Fist / success pose
      ctx.globalAlpha = 0.12
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(w * 0.5, h * 0.5, h * 0.2, 0, Math.PI * 2)
      ctx.fill()
      // Sand
      ctx.fillRect(0, h * 0.85, w, h * 0.15)
      break
    }
    case "badluck": {
      // Plaid shirt pattern
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      for (let i = 0; i < w; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, h)
        ctx.stroke()
      }
      for (let i = 0; i < h; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(w, i)
        ctx.stroke()
      }
      break
    }
    case "yelling": {
      // Two panels
      ctx.globalAlpha = 0.1
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w / 2 - 2, h)
      ctx.fillRect(w / 2 + 2, 0, w / 2 - 2, h)
      // Anger lines on left
      ctx.globalAlpha = 0.15
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        const sx = w * 0.1 + i * 15
        const sy = h * 0.15
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(sx + 8, sy - 12)
        ctx.stroke()
      }
      break
    }
  }

  ctx.globalAlpha = 1.0

  // Template name watermark at bottom center
  ctx.fillStyle = "rgba(255,255,255,0.4)"
  ctx.font = `bold ${Math.max(14, Math.min(w, h) * 0.04)}px Impact, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "bottom"
  ctx.fillText(template.name.toUpperCase(), w / 2, h - 10)
}

function drawMemeText(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  text: string,
  position: "top" | "bottom",
  fontSize: number,
  fontFamily: string,
  fillColor: string,
  strokeOn: boolean,
  strokeColor: string
) {
  if (!text) return

  const displayText = text.toUpperCase()
  ctx.font = `bold ${fontSize}px ${fontFamily}, Impact, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = position === "top" ? "top" : "bottom"
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = Math.max(2, fontSize / 12)
  ctx.lineJoin = "round"

  const y = position === "top" ? 20 + fontSize : h - 20
  const maxWidth = w - 40

  // Word wrap
  const words = displayText.split(" ")
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
  if (currentLine) lines.push(currentLine)

  const lineHeight = fontSize * 1.15
  const totalHeight = lines.length * lineHeight
  const startY =
    position === "top" ? 20 : h - 20 - totalHeight + lineHeight

  lines.forEach((line, idx) => {
    const ly = startY + idx * lineHeight
    if (strokeOn) {
      ctx.strokeText(line, w / 2, ly)
    }
    ctx.fillText(line, w / 2, ly)
  })
}

// ─── Component ──────────────────────────────────────────────────────────────

export function MemeGeneratorTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null)
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null)
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [fontSize, setFontSize] = useState(42)
  const [fontFamily, setFontFamily] = useState("Impact")
  const [textColor, setTextColor] = useState("white")
  const [strokeOn, setStrokeOn] = useState(true)

  const textColorMap: Record<string, string> = { white: "#FFFFFF", black: "#000000", yellow: "#FFD700" }
  const strokeColorMap: Record<string, string> = { white: "#000000", black: "#FFFFFF", yellow: "#000000" }

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Clear
    ctx.clearRect(0, 0, w, h)

    if (uploadedImage) {
      // Draw uploaded image with cover-fit
      const imgRatio = uploadedImage.width / uploadedImage.height
      const canvasRatio = w / h
      let sx = 0
      let sy = 0
      let sw = uploadedImage.width
      let sh = uploadedImage.height

      if (imgRatio > canvasRatio) {
        sw = uploadedImage.height * canvasRatio
        sx = (uploadedImage.width - sw) / 2
      } else {
        sh = uploadedImage.width / canvasRatio
        sy = (uploadedImage.height - sh) / 2
      }

      ctx.drawImage(uploadedImage, sx, sy, sw, sh, 0, 0, w, h)
    } else if (selectedTemplate) {
      drawTemplatePlaceholder(ctx, w, h, selectedTemplate)
    } else {
      // Default empty state
      ctx.fillStyle = "#1e293b"
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = "rgba(255,255,255,0.3)"
      ctx.font = `bold ${Math.min(w, h) * 0.06}px Impact, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("SELECT A TEMPLATE OR UPLOAD AN IMAGE", w / 2, h / 2)
    }

    // Draw text
    const fill = textColorMap[textColor] || "#FFFFFF"
    const stroke = strokeColorMap[textColor] || "#000000"

    drawMemeText(ctx, w, h, topText, "top", fontSize, fontFamily, fill, strokeOn, stroke)
    drawMemeText(ctx, w, h, bottomText, "bottom", fontSize, fontFamily, fill, strokeOn, stroke)
  }, [uploadedImage, selectedTemplate, topText, bottomText, fontSize, fontFamily, textColor, strokeOn])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        setUploadedImage(img)
        setSelectedTemplate(null)
      }
      img.src = (ev.target?.result || "") as string
    }
    reader.readAsDataURL(file)
  }

  // Download
  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "meme.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  // Reset
  const handleReset = () => {
    setSelectedTemplate(null)
    setUploadedImage(null)
    setTopText("")
    setBottomText("")
    setFontSize(42)
    setFontFamily("Impact")
    setTextColor("white")
    setStrokeOn(true)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <TooltipProvider>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Panel - Controls */}
        <div className="space-y-5">
          <Tabs defaultValue="templates">
            <TabsList className="w-full">
              <TabsTrigger value="templates" className="flex-1">
                <SmilePlus className="mr-1.5 size-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex-1">
                <Upload className="mr-1.5 size-4" />
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="mt-4">
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {MEME_TEMPLATES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setSelectedTemplate(t)
                      setUploadedImage(null)
                    }}
                    className={`relative rounded-lg p-3 text-left transition-all hover:ring-2 hover:ring-primary ${
                      selectedTemplate?.name === t.name
                        ? "ring-2 ring-primary shadow-md"
                        : "ring-1 ring-border"
                    }`}
                    style={{ backgroundColor: t.bgColor }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-md leading-tight block">
                      {t.name}
                    </span>
                    {selectedTemplate?.name === t.name && (
                      <Badge className="absolute top-1 right-1 bg-white text-black text-[10px] px-1.5 py-0">
                        Active
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
              <Card
                className="flex flex-col items-center justify-center gap-3 border-dashed border-2 p-8 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="size-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload an image</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP, GIF</p>
                </div>
                {uploadedImage && (
                  <Badge variant="secondary" className="mt-1">
                    Image loaded
                  </Badge>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Text Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Type className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Text</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="top-text">Top Text</Label>
              <Input
                id="top-text"
                placeholder="WHEN YOU...
"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                maxLength={120}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bottom-text">Bottom Text</Label>
              <Input
                id="bottom-text"
                placeholder="...BUT THEN..."
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                maxLength={120}
              />
            </div>
          </div>

          <Separator />

          {/* Style Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Style</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Font Size</Label>
                <span className="text-xs text-muted-foreground">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={24}
                max={72}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>24px</span>
                <span>72px</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Impact">Impact (Classic)</SelectItem>
                  <SelectItem value="Arial Black">Arial Black</SelectItem>
                  <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="flex gap-2">
                {[
                  { key: "white", label: "White", bg: "#FFFFFF", border: "#d4d4d4" },
                  { key: "black", label: "Black", bg: "#000000", border: "#525252" },
                  { key: "yellow", label: "Yellow", bg: "#FFD700", border: "#ca8a04" },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setTextColor(c.key)}
                    className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
                      textColor === c.key
                        ? "ring-2 ring-primary"
                        : "hover:ring-1 hover:ring-muted-foreground/30"
                    }`}
                    style={{
                      backgroundColor: c.bg,
                      borderColor: textColor === c.key ? "hsl(var(--primary))" : c.border,
                      color: c.key === "yellow" ? "#000" : c.key === "black" ? "#fff" : "#000",
                    }}
                  >
                    <span
                      className="size-3 rounded-full border"
                      style={{ backgroundColor: c.bg, borderColor: c.border }}
                    />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Text Stroke</p>
                <p className="text-xs text-muted-foreground">
                  {textColor === "black" ? "White outline" : "Black outline"}
                </p>
              </div>
              <button
                onClick={() => setStrokeOn(!strokeOn)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  strokeOn ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                    strokeOn ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex-1" onClick={handleReset}>
                  <RotateCcw className="mr-1.5 size-4" />
                  Reset
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset all settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="flex-1" onClick={handleDownload}>
                  <Download className="mr-1.5 size-4" />
                  Download PNG
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download your meme as PNG</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Right Panel - Canvas Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Preview</h3>
            <Badge variant="outline" className="text-[10px]">
              800 × 600
            </Badge>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-center bg-muted/30 p-2">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full max-w-[800px] rounded-md"
                style={{ imageRendering: "auto" }}
              />
            </div>
          </Card>
          <p className="text-xs text-muted-foreground text-center">
            Your meme renders at 800 × 600 pixels. All processing happens in your browser — no images are uploaded to any server.
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}
