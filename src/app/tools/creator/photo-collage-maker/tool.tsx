"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Download,
  RotateCcw,
  Upload,
  LayoutGrid,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Layout Definitions ──────────────────────────────────────────────────

interface SlotRect {
  x: number
  y: number
  w: number
  h: number
}

interface LayoutDef {
  id: string
  label: string
  photoCount: number
  slots: SlotRect[]
}

// Layouts defined in 0-1 normalized coordinates (relative to canvas)
const LAYOUTS: LayoutDef[] = [
  // 2 photos
  {
    id: "2-side",
    label: "Side by Side",
    photoCount: 2,
    slots: [
      { x: 0, y: 0, w: 0.5, h: 1 },
      { x: 0.5, y: 0, w: 0.5, h: 1 },
    ],
  },
  {
    id: "2-stack",
    label: "Top / Bottom",
    photoCount: 2,
    slots: [
      { x: 0, y: 0, w: 1, h: 0.5 },
      { x: 0, y: 0.5, w: 1, h: 0.5 },
    ],
  },
  // 3 photos
  {
    id: "3-1plus2",
    label: "1 Large + 2 Right",
    photoCount: 3,
    slots: [
      { x: 0, y: 0, w: 0.5, h: 1 },
      { x: 0.5, y: 0, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0.5, w: 0.5, h: 0.5 },
    ],
  },
  {
    id: "3-row",
    label: "3 in a Row",
    photoCount: 3,
    slots: [
      { x: 0, y: 0, w: 1 / 3, h: 1 },
      { x: 1 / 3, y: 0, w: 1 / 3, h: 1 },
      { x: (2 / 3), y: 0, w: 1 / 3, h: 1 },
    ],
  },
  {
    id: "3-2plus1",
    label: "2 Top + 1 Bottom",
    photoCount: 3,
    slots: [
      { x: 0, y: 0, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0, w: 0.5, h: 0.5 },
      { x: 0, y: 0.5, w: 1, h: 0.5 },
    ],
  },
  // 4 photos
  {
    id: "4-grid",
    label: "2×2 Grid",
    photoCount: 4,
    slots: [
      { x: 0, y: 0, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0, w: 0.5, h: 0.5 },
      { x: 0, y: 0.5, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0.5, w: 0.5, h: 0.5 },
    ],
  },
  {
    id: "4-1plus3",
    label: "1 Large + 3 Right",
    photoCount: 4,
    slots: [
      { x: 0, y: 0, w: 0.5, h: 1 },
      { x: 0.5, y: 0, w: 0.5, h: 1 / 3 },
      { x: 0.5, y: 1 / 3, w: 0.5, h: 1 / 3 },
      { x: 0.5, y: (2 / 3), w: 0.5, h: 1 / 3 },
    ],
  },
  {
    id: "4-3plus1",
    label: "3 Top + 1 Bottom",
    photoCount: 4,
    slots: [
      { x: 0, y: 0, w: 1 / 3, h: 0.5 },
      { x: 1 / 3, y: 0, w: 1 / 3, h: 0.5 },
      { x: (2 / 3), y: 0, w: 1 / 3, h: 0.5 },
      { x: 0, y: 0.5, w: 1, h: 0.5 },
    ],
  },
  // 6 photos
  {
    id: "6-2x3",
    label: "2×3 Grid",
    photoCount: 6,
    slots: [
      { x: 0, y: 0, w: 0.5, h: 1 / 3 },
      { x: 0.5, y: 0, w: 0.5, h: 1 / 3 },
      { x: 0, y: 1 / 3, w: 0.5, h: 1 / 3 },
      { x: 0.5, y: 1 / 3, w: 0.5, h: 1 / 3 },
      { x: 0, y: (2 / 3), w: 0.5, h: 1 / 3 },
      { x: 0.5, y: (2 / 3), w: 0.5, h: 1 / 3 },
    ],
  },
  {
    id: "6-3x2",
    label: "3×2 Grid",
    photoCount: 6,
    slots: [
      { x: 0, y: 0, w: 1 / 3, h: 0.5 },
      { x: 1 / 3, y: 0, w: 1 / 3, h: 0.5 },
      { x: (2 / 3), y: 0, w: 1 / 3, h: 0.5 },
      { x: 0, y: 0.5, w: 1 / 3, h: 0.5 },
      { x: 1 / 3, y: 0.5, w: 1 / 3, h: 0.5 },
      { x: (2 / 3), y: 0.5, w: 1 / 3, h: 0.5 },
    ],
  },
]

// ─── Photo Item ──────────────────────────────────────────────────────────

interface PhotoItem {
  id: string
  img: HTMLImageElement
  name: string
}

let _photoIdCounter = 0
function nextPhotoId() {
  return `photo-${++_photoIdCounter}`
}

// ─── Layout Preview Mini Component ───────────────────────────────────────

function LayoutPreviewMini({
  layout,
  selected,
  onClick,
}: {
  layout: LayoutDef
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-2 p-2 transition-all hover:shadow-md ${
        selected ? "border-primary shadow-md bg-primary/5" : "border-border hover:border-primary/50"
      }`}
      title={layout.label}
    >
      <div className="relative w-full aspect-square bg-muted rounded">
        {layout.slots.map((slot, i) => (
          <div
            key={i}
            className="absolute border-2 border-primary/40 rounded-sm bg-primary/10"
            style={{
              left: `${slot.x * 100}%`,
              top: `${slot.y * 100}%`,
              width: `${slot.w * 100}%`,
              height: `${slot.h * 100}%`,
            }}
          />
        ))}
      </div>
      <p className="text-[10px] text-center mt-1 text-muted-foreground truncate">
        {layout.label}
      </p>
    </button>
  )
}

// ─── Canvas Drawing ───────────────────────────────────────────────────────

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  borderRadius: number
) {
  ctx.save()
  if (borderRadius > 0) {
    ctx.beginPath()
    ctx.roundRect(dx, dy, dw, dh, borderRadius)
    ctx.clip()
  }

  const imgRatio = img.width / img.height
  const slotRatio = dw / dh
  let sx = 0
  let sy = 0
  let sw = img.width
  let sh = img.height

  if (imgRatio > slotRatio) {
    sw = img.height * slotRatio
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / slotRatio
    sy = (img.height - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.restore()
}

// ─── Main Component ───────────────────────────────────────────────────────

export function PhotoCollageMakerTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [selectedLayout, setSelectedLayout] = useState<LayoutDef>(LAYOUTS[0])
  const [borderWidth, setBorderWidth] = useState(4)
  const [borderColor, setBorderColor] = useState("#ffffff")
  const [borderRadius, setBorderRadius] = useState(8)
  const [gap, setGap] = useState(8)
  const [bgColor, setBgColor] = useState("#1e293b")

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, W, H)

    const layout = selectedLayout
    const gapPx = gap
    const borderPx = borderWidth
    const radius = borderRadius

    // For each slot, compute pixel position with gap
    layout.slots.forEach((slot, i) => {
      // Slot position with gap (gap distributed as padding around slots)
      const slotW = slot.w * W - gapPx
      const slotH = slot.h * H - gapPx
      const slotX = slot.x * W + gapPx / 2
      const slotY = slot.y * H + gapPx / 2

      // Draw border rectangle
      if (borderPx > 0) {
        ctx.fillStyle = borderColor
        if (radius > 0) {
          ctx.beginPath()
          ctx.roundRect(slotX, slotY, slotW, slotH, radius)
          ctx.fill()
        } else {
          ctx.fillRect(slotX, slotY, slotW, slotH)
        }
      }

      // Inner area (image area, inset by border)
 const innerX = slotX + borderPx
      const innerY = slotY + borderPx
      const innerW = slotW - borderPx * 2
      const innerH = slotH - borderPx * 2

      if (innerW <= 0 || innerH <= 0) return

      if (i < photos.length && photos[i]) {
        drawImageCover(ctx, photos[i].img, innerX, innerY, innerW, innerH, radius)
      } else {
        // Empty slot placeholder
        ctx.fillStyle = "rgba(255,255,255,0.08)"
        if (radius > 0) {
          ctx.beginPath()
          ctx.roundRect(innerX, innerY, innerW, innerH, Math.max(0, radius - borderPx))
          ctx.fill()
        } else {
          ctx.fillRect(innerX, innerY, innerW, innerH)
        }
        // Plus icon
        ctx.fillStyle = "rgba(255,255,255,0.25)"
        ctx.font = `bold ${Math.min(innerW, innerH) * 0.2}px sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("+", innerX + innerW / 2, innerY + innerH / 2)
      }
    })
  }, [photos, selectedLayout, borderWidth, borderColor, borderRadius, gap, bgColor])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // File upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPhotos: PhotoItem[] = []
    let loaded = 0
    const toLoad = Array.from(files).slice(0, 6 - photos.length)

    if (toLoad.length === 0) return

    toLoad.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const img = new Image()
        img.onload = () => {
          newPhotos.push({
            id: nextPhotoId(),
            img,
            name: (file.name || `Photo ${photos.length + loaded + 1}`),
          })
          loaded++
          if (loaded === toLoad.length) {
            setPhotos((prev) => [...prev, ...newPhotos])
          }
        }
        img.src = (ev.target?.result || "") as string
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Remove photo
  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  // Move photo
  const movePhoto = (index: number, direction: "up" | "down") => {
    setPhotos((prev) => {
      const next = [...prev]
      const target = direction === "up" ? index - 1 : index + 1
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  // Download
  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "collage.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  // Reset
  const handleReset = () => {
    setPhotos([])
    setSelectedLayout(LAYOUTS[0])
    setBorderWidth(4)
    setBorderColor("#ffffff")
    setBorderRadius(8)
    setGap(8)
    setBgColor("#1e293b")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Filter layouts by photo count
  const availableLayouts = photos.length > 0
    ? LAYOUTS.filter((l) => l.photoCount === photos.length)
    : LAYOUTS

  // Auto-switch layout when photo count changes
  useEffect(() => {
    if (photos.length > 0) {
      const exact = LAYOUTS.find((l) => l.photoCount === photos.length)
      if (exact && selectedLayout.photoCount !== photos.length) {
        setSelectedLayout(exact)
      }
    }
  }, [photos.length])

  return (
    <TooltipProvider>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Panel - Controls */}
        <div className="space-y-5">
          {/* Layout Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LayoutGrid className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Layout</h3>
              {photos.length > 0 && (
                <Badge variant="secondary" className="text-[10px]">
                  {photos.length} photo{photos.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
              {availableLayouts.map((layout) => (
                <LayoutPreviewMini
                  key={layout.id}
                  layout={layout}
                  selected={selectedLayout.id === layout.id}
                  onClick={() => setSelectedLayout(layout)}
                />
              ))}
            </div>
          </div>

          <Separator />

          {/* Photo Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Photos</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {photos.length}/6
              </span>
            </div>

            <Card
              className="flex flex-col items-center justify-center gap-2 border-dashed border-2 p-4 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                if (photos.length < 6) fileInputRef.current?.click()
              }}
            >
              <Plus className="size-6 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {photos.length < 6 ? "Click to add photos" : "Max 6 photos reached"}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                disabled={photos.length >= 6}
              />
            </Card>

            {/* Photo thumbnails with reorder / remove */}
            {photos.length > 0 && (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {photos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className="flex items-center gap-2 rounded-lg border p-1.5"
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded bg-muted">
                      <img
                        src={photo.img.src}
                        alt={(photo.name || "").split(".")[0] || `Photo ${i + 1}`}
                        className="size-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 bg-black/60 text-white text-[9px] px-1 rounded-tr font-mono">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-xs truncate flex-1 text-muted-foreground">
                      {(photo.name || "").split(".")[0] || `Photo ${i + 1}`}
                    </span>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6"
                            disabled={i === 0}
                            onClick={() => movePhoto(i, "up")}
                          >
                            <ChevronUp className="size-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move up</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6"
                            disabled={i === photos.length - 1}
                            onClick={() => movePhoto(i, "down")}
                          >
                            <ChevronDown className="size-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move down</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6 text-destructive hover:text-destructive"
                            onClick={() => removePhoto(i)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remove</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Style Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Style</h3>
            </div>

            {/* Border Width */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Border Width</Label>
                <span className="text-xs text-muted-foreground">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0px</span>
                <span>20px</span>
              </div>
            </div>

            {/* Border Color */}
            <div className="space-y-2">
              <Label>Border Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="size-8 rounded border cursor-pointer"
                />
                <Input
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="flex-1 font-mono text-xs h-8"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Border Radius</Label>
                <span className="text-xs text-muted-foreground">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0px</span>
                <span>30px</span>
              </div>
            </div>

            {/* Gap / Spacing */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Gap / Spacing</Label>
                <span className="text-xs text-muted-foreground">{gap}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0px</span>
                <span>20px</span>
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="size-8 rounded border cursor-pointer"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 font-mono text-xs h-8"
                  maxLength={7}
                />
              </div>
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
              <TooltipContent>Download your collage as PNG</TooltipContent>
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
            Your collage renders at 800 × 600 pixels. All processing happens in your browser — no photos are uploaded to any server.
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}
