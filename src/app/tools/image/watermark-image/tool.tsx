"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import {
  Upload,
  Download,
  RotateCcw,
  Stamp,
  Settings2,
  Type,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
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
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// ─── Types ────────────────────────────────────────────────────────────────────

type PositionMode = "center" | "tiled" | "corners"

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 50 * 1024 * 1024

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"]

const ACCEPT_STRING = "image/png,image/jpeg,image/jpg,image/webp"

// ─── Utility Functions ───────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function getOutputMime(file: File): string {
  if (file.type === "image/png") return "image/png"
  if (file.type === "image/webp") return "image/webp"
  return "image/jpeg"
}

function getOutputExt(file: File): string {
  const ext = (file.name || "").split(".").pop()?.toLowerCase() || ""
  if (ext === "png") return "png"
  if (ext === "webp") return "webp"
  return "jpg"
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

// ─── Watermark Drawing ────────────────────────────────────────────────────────

function drawWatermark(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  text: string,
  options: {
    fontSize: number
    color: string
    opacity: number
    rotation: number
    position: PositionMode
  }
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height)

  if (!text) return

  const { fontSize, color, opacity, rotation, position } = options

  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.font = `bold ${fontSize}px sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  if (position === "center") {
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.fillText(text, 0, 0)
  } else if (position === "tiled") {
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const textHeight = fontSize
    const paddingX = textWidth * 0.8
    const paddingY = textHeight * 1.5
    const stepX = textWidth + paddingX
    const stepY = textHeight + paddingY

    // Draw extra area to cover rotated edges
    const diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)
    const startX = -diagonal / 2
    const startY = -diagonal / 2
    const endX = canvas.width + diagonal / 2
    const endY = canvas.height + diagonal / 2

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)

    for (let y = startY; y < endY; y += stepY) {
      for (let x = startX; x < endX; x += stepX) {
        ctx.fillText(text, x, y)
      }
    }
  } else if (position === "corners") {
    const margin = fontSize * 0.8
    const positions = [
      { x: margin + text.length * fontSize * 0.3, y: margin + fontSize / 2 },
      { x: canvas.width - margin - text.length * fontSize * 0.3, y: margin + fontSize / 2 },
      { x: margin + text.length * fontSize * 0.3, y: canvas.height - margin - fontSize / 2 },
      { x: canvas.width - margin - text.length * fontSize * 0.3, y: canvas.height - margin - fontSize / 2 },
    ]

    positions.forEach((pos) => {
      ctx.save()
      ctx.translate(pos.x, pos.y)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.fillText(text, 0, 0)
      ctx.restore()
    })
  }

  ctx.restore()
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function WatermarkImageTool() {
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [watermarkText, setWatermarkText] = useState("")
  const [fontSize, setFontSize] = useState(48)
  const [color, setColor] = useState("#ffffff")
  const [opacity, setOpacity] = useState(0.3)
  const [rotation, setRotation] = useState(-30)
  const [position, setPosition] = useState<PositionMode>("tiled")
  const [imageDimensions, setImageDimensions] = useState<{ w: number; h: number } | null>(null)
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ─── Live Preview ───────────────────────────────────

  useEffect(() => {
    if (!canvasRef.current || !imgElement) return
    drawWatermark(canvasRef.current, imgElement, watermarkText, {
      fontSize,
      color,
      opacity,
      rotation,
      position,
    })
  }, [imgElement, watermarkText, fontSize, color, opacity, rotation, position])

  // ─── File Handling ───────────────────────────────────

  const handleFile = useCallback(async (f: File) => {
    if (f.size > MAX_FILE_SIZE) {
      toast.error("File exceeds 50MB limit")
      return
    }

    if (originalUrl) URL.revokeObjectURL(originalUrl)

    const url = URL.createObjectURL(f)
    setFile(f)
    setOriginalUrl(url)

    try {
      const img = await loadImage(url)
      setImgElement(img)
      setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight })
    } catch {
      toast.error("Failed to load image")
    }
  }, [originalUrl])

  const addFile = useCallback((files: FileList | File[]) => {
    if (files.length > 0) handleFile(files[0])
  }, [handleFile])

  const clearAll = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    setFile(null)
    setOriginalUrl("")
    setImgElement(null)
    setImageDimensions(null)
    setWatermarkText("")
  }, [originalUrl])

  // ─── Download ────────────────────────────────────────

  const downloadResult = useCallback(() => {
    if (!canvasRef.current || !file) return

    const mime = getOutputMime(file)
    const quality = mime === "image/jpeg" ? 1.0 : undefined

    canvasRef.current.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Failed to generate image")
          return
        }
        const ext = getOutputExt(file)
        const baseName = file.name.replace(/\.[^.]+$/, "")
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${baseName}-watermarked.${ext}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
      mime,
      quality
    )
  }, [file])

  // ─── Drag & Drop ─────────────────────────────────────

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) addFile(e.dataTransfer.files)
  }, [addFile])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFile(e.target.files)
      e.target.value = ""
    }
  }, [addFile])

  // ─── Render ──────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* 1. Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 sm:p-12 cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : file
                ? "border-primary/30 bg-primary/[0.02] hover:border-primary/50"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload an image by drag and drop or click"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/15">
            <Upload className="size-6 text-primary" aria-hidden="true" />
          </div>
          <div className="text-center">
            {!file ? (
              <>
                <p className="text-base font-medium">
                  Drag & drop an image here, or <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  PNG, JPG, or WebP — up to 50MB
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">
                  Image loaded — <span className="text-primary">click to replace</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {imageDimensions && `${imageDimensions.w}×${imageDimensions.h} — `}
                  {file.name} ({formatFileSize(file.size)})
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_STRING}
            className="hidden"
            onChange={handleFileInput}
            aria-hidden="true"
          />
        </div>

        {/* 2. Watermark Settings */}
        {file && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Settings2 className="size-4 text-muted-foreground" />
              Watermark Settings
            </div>
            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Watermark Text */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="watermark-text" className="flex items-center gap-1.5">
                  <Type className="size-3.5" />
                  Watermark Text
                </Label>
                <Input
                  id="watermark-text"
                  placeholder="e.g. © 2025 Your Name"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="watermark-position">Position</Label>
                <Select
                  value={position}
                  onValueChange={(v) => setPosition(v as PositionMode)}
                >
                  <SelectTrigger id="watermark-position" className="w-full">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="tiled">Tiled (Repeated)</SelectItem>
                    <SelectItem value="corners">Four Corners</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Picker */}
              <div className="space-y-2">
                <Label htmlFor="watermark-color">Text Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="watermark-color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-md border border-input"
                  />
                  <div className="flex gap-1.5">
                    {["#ffffff", "#000000", "#ff0000", "#0066ff"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`h-7 w-7 rounded-md border-2 transition-colors ${
                          color === c ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                        }`}
                        style={{ backgroundColor: c }}
                        aria-label={`Color ${c}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="wm-fontsize">Font Size</Label>
                  <span className="text-sm font-medium tabular-nums">{fontSize}px</span>
                </div>
                <Slider
                  id="wm-fontsize"
                  min={12}
                  max={200}
                  step={2}
                  value={[fontSize]}
                  onValueChange={([v]) => setFontSize(v)}
                  className="w-full"
                />
              </div>

              {/* Opacity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="wm-opacity">Opacity</Label>
                  <span className="text-sm font-medium tabular-nums">{Math.round(opacity * 100)}%</span>
                </div>
                <Slider
                  id="wm-opacity"
                  min={5}
                  max={100}
                  step={5}
                  value={[Math.round(opacity * 100)]}
                  onValueChange={([v]) => setOpacity(v / 100)}
                  className="w-full"
                />
              </div>

              {/* Rotation */}
              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="wm-rotation">Rotation Angle</Label>
                  <span className="text-sm font-medium tabular-nums">{rotation}°</span>
                </div>
                <Slider
                  id="wm-rotation"
                  min={-180}
                  max={180}
                  step={5}
                  value={[rotation]}
                  onValueChange={([v]) => setRotation(v)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>-180°</span>
                  <span>0°</span>
                  <span>180°</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <Separator />
            <div className="flex items-center justify-between">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    <RotateCcw className="size-3.5" />
                    Reset
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear image and settings</TooltipContent>
              </Tooltip>
              <Button size="sm" onClick={downloadResult} disabled={!file || !imgElement}>
                <Download className="size-3.5" />
                Download Watermarked Image
              </Button>
            </div>
          </div>
        )}

        {/* 3. Live Preview Canvas */}
        {file && imgElement && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Live Preview</h3>
              <span className="text-xs text-muted-foreground">
                {imageDimensions?.w}×{imageDimensions?.h} — Preview updates in real time
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-muted">
              <canvas
                ref={canvasRef}
                className="mx-auto max-h-[600px] w-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* 4. Empty State Hint */}
        {!file && (
          <div className="flex flex-col items-center gap-3 py-8 text-center text-muted-foreground">
            <Stamp className="size-8 opacity-30" />
            <p className="text-sm">Upload an image above to start adding a watermark</p>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
