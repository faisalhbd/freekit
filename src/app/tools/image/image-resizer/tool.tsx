"use client"

import { useState, useCallback, useRef } from "react"
import {
  Upload,
  Download,
  X,
  ImagePlus,
  RotateCcw,
  Loader2,
  Info,
  Lock,
  Unlock,
  Ruler,
  File,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageFile {
  id: string
  file: File
  originalUrl: string
  resizedUrl?: string
  resizedBlob?: Blob
  originalWidth: number
  originalHeight: number
  originalSize: number
  resizedWidth?: number
  resizedHeight?: number
  resizedSize?: number
  status: "pending" | "resizing" | "done" | "error"
  error?: string
}

type ResizeMode = "dimensions" | "filesize"
type OutputFormat = "image/jpeg" | "image/png" | "image/webp"

interface DimensionPreset {
  label: string
  width: number
  height: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
  "image/tiff",
]

const ACCEPT_STRING = "image/*"

const DIMENSION_PRESETS: DimensionPreset[] = [
  { label: "Custom", width: 0, height: 0 },
  { label: "100 × 100", width: 100, height: 100 },
  { label: "200 × 200", width: 200, height: 200 },
  { label: "300 × 300", width: 300, height: 300 },
  { label: "500 × 500", width: 500, height: 500 },
  { label: "1000 × 1000", width: 1000, height: 1000 },
  { label: "1280 × 720 (HD)", width: 1280, height: 720 },
  { label: "1920 × 1080 (Full HD)", width: 1920, height: 1080 },
  { label: "2560 × 1440 (2K)", width: 2560, height: 1440 },
  { label: "3840 × 2160 (4K)", width: 3840, height: 2160 },
  { label: "Facebook Profile (170×170)", width: 170, height: 170 },
  { label: "Facebook Cover (820×312)", width: 820, height: 312 },
  { label: "Instagram Post (1080×1080)", width: 1080, height: 1080 },
  { label: "Instagram Story (1080×1920)", width: 1080, height: 1920 },
  { label: "Twitter Header (1500×500)", width: 1500, height: 500 },
  { label: "YouTube Thumb (1280×720)", width: 1280, height: 720 },
  { label: "LinkedIn Banner (1584×396)", width: 1584, height: 396 },
  { label: "Passport Photo (600×600)", width: 600, height: 600 },
]

const FILE_SIZE_PRESETS = [
  { label: "Custom", value: 0 },
  { label: "10 KB", value: 10 },
  { label: "25 KB", value: 25 },
  { label: "50 KB", value: 50 },
  { label: "100 KB", value: 100 },
  { label: "200 KB", value: 200 },
  { label: "500 KB", value: 500 },
  { label: "1 MB", value: 1024 },
  { label: "2 MB", value: 2048 },
  { label: "5 MB", value: 5120 },
]

// ─── Utility Functions ───────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function getFileExtension(format: OutputFormat): string {
  switch (format) {
    case "image/jpeg": return ".jpg"
    case "image/png": return ".png"
    case "image/webp": return ".webp"
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

// ─── Core Resize Functions ────────────────────────────────────────────────────

/** Multi-step upscaling: scales in 2× increments for higher quality when enlarging */
function createResizedCanvas(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  format: OutputFormat
): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext("2d")

  if (!ctx) throw new Error("Canvas context not available")

  // White background for JPEG (no transparency)
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const origW = img.naturalWidth
  const origH = img.naturalHeight
  const isUpscaling = targetWidth > origW || targetHeight > origH

  if (!isUpscaling) {
    // Downscaling — draw directly with best quality
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, 0, 0, origW, origH, 0, 0, targetWidth, targetHeight)
  } else {
    // Upscaling — multi-step 2× increments for much sharper results
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    let currentW = origW
    let currentH = origH
    let source: HTMLCanvasElement | HTMLImageElement = img

    while (Math.round(currentW / 2) >= targetWidth || Math.round(currentH / 2) >= targetHeight) {
      currentW = Math.max(targetWidth, Math.round(currentW / 2))
      currentH = Math.max(targetHeight, Math.round(currentH / 2))
    }

    // Build up in steps of at most 2×
    const stepCanvas = document.createElement("canvas")
    let lastW = origW
    let lastH = origH
    let lastSource: HTMLCanvasElement | HTMLImageElement = img

    while (lastW < targetWidth || lastH < targetHeight) {
      const stepW = Math.min(targetWidth, lastW * 2)
      const stepH = Math.min(targetHeight, lastH * 2)

      stepCanvas.width = stepW
      stepCanvas.height = stepH
      const stepCtx = stepCanvas.getContext("2d")
      if (!stepCtx) throw new Error("Canvas context not available")
      stepCtx.imageSmoothingEnabled = true
      stepCtx.imageSmoothingQuality = "high"
      stepCtx.drawImage(lastSource, 0, 0, lastW, lastH, 0, 0, stepW, stepH)

      lastW = stepW
      lastH = stepH
      // Keep using the step canvas as source for next iteration
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = stepW
      tempCanvas.height = stepH
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) throw new Error("Canvas context not available")
      tempCtx.drawImage(stepCanvas, 0, 0)
      lastSource = tempCanvas
    }

    // Final draw onto the output canvas
    ctx.drawImage(lastSource, 0, 0, lastW, lastH, 0, 0, targetWidth, targetHeight)
  }

  return canvas
}

function resizeByDimensions(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  format: OutputFormat
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = createResizedCanvas(img, targetWidth, targetHeight, format)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Resize failed"))
            return
          }
          resolve({ blob, url: URL.createObjectURL(blob) })
        },
        format,
        1.0 // MAXIMUM quality — no quality drop
      )
    } catch (err) {
      reject(err)
    }
  })
}

function resizeToTargetSize(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  targetKB: number,
  format: OutputFormat,
  maxIterations = 20
): Promise<{ blob: Blob; url: string }> {
  const targetBytes = targetKB * 1024

  return new Promise(async (resolve, reject) => {
    try {
      // Use multi-step upscaling for better quality
      const canvas = createResizedCanvas(img, targetWidth, targetHeight, format)

      // Check if already within target at max quality
      const maxBlob = await canvasToBlob(canvas, format, 1.0)
      if (maxBlob && maxBlob.size <= targetBytes) {
        resolve({ blob: maxBlob, url: URL.createObjectURL(maxBlob) })
        return
      }

      // Binary search for the right quality
      let low = 0.01
      let high = 1.0
      let bestBlob = maxBlob

      for (let i = 0; i < maxIterations; i++) {
        const mid = (low + high) / 2
        const blob = await canvasToBlob(canvas, format, mid)

        if (!blob) break

        if (blob.size <= targetBytes) {
          bestBlob = blob
          low = mid
        } else {
          high = mid
        }

        if (bestBlob && Math.abs(bestBlob.size - targetBytes) / targetBytes < 0.05) {
          break
        }
      }

      if (bestBlob) {
        resolve({ blob: bestBlob, url: URL.createObjectURL(bestBlob) })
      } else {
        reject(new Error("Could not reach target file size"))
      }
    } catch (err) {
      reject(err)
    }
  })
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: OutputFormat,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), format, quality)
  })
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ImageResizerTool() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [resizeMode, setResizeMode] = useState<ResizeMode>("dimensions")
  const [widthStr, setWidthStr] = useState("")
  const [heightStr, setHeightStr] = useState("")
  const [lockAspect, setLockAspect] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState("Custom")
  const [targetSizeStr, setTargetSizeStr] = useState("100")
  const [targetSizePreset, setTargetSizePreset] = useState("100 KB")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg")
  const [isDragging, setIsDragging] = useState(false)
  const [globalStatus, setGlobalStatus] = useState<"idle" | "resizing">("idle")
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Parse dimensions from input strings
  const getWidth = useCallback(() => {
    const v = parseInt(widthStr)
    return isNaN(v) || v < 1 ? 0 : v
  }, [widthStr])

  const getHeight = useCallback(() => {
    const v = parseInt(heightStr)
    return isNaN(v) || v < 1 ? 0 : v
  }, [heightStr])

  const getTargetKB = useCallback(() => {
    const v = parseInt(targetSizeStr)
    return isNaN(v) || v < 1 ? 0 : v
  }, [targetSizeStr])

  // Sync dimensions when width changes with locked aspect
  const handleWidthChange = useCallback((val: string) => {
    setWidthStr(val)
    setSelectedPreset("Custom")
    const num = parseInt(val)
    if (!isNaN(num) && num > 0 && lockAspect && aspectRatio) {
      setHeightStr(String(Math.round(num / aspectRatio)))
    }
  }, [lockAspect, aspectRatio])

  // Sync dimensions when height changes with locked aspect
  const handleHeightChange = useCallback((val: string) => {
    setHeightStr(val)
    setSelectedPreset("Custom")
    const num = parseInt(val)
    if (!isNaN(num) && num > 0 && lockAspect && aspectRatio) {
      setWidthStr(String(Math.round(num * aspectRatio)))
    }
  }, [lockAspect, aspectRatio])

  // Apply preset
  const applyPreset = useCallback((presetLabel: string) => {
    setSelectedPreset(presetLabel)
    const preset = DIMENSION_PRESETS.find((p) => p.label === presetLabel)
    if (preset && preset.width > 0) {
      setWidthStr(String(preset.width))
      setHeightStr(String(preset.height))
      if (lockAspect) {
        setAspectRatio(preset.width / preset.height)
      }
    } else {
      setWidthStr("")
      setHeightStr("")
    }
  }, [lockAspect])

  // ─── Resize Functions ──────────────────────────────────────────────────

  const resizeImage = useCallback(async (
    imageFile: ImageFile,
    targetW: number,
    targetH: number,
    mode: ResizeMode,
    targetKB: number,
    format: OutputFormat,
    maintainAspect: boolean
  ): Promise<{ blob: Blob; url: string; width: number; height: number }> => {
    const img = await loadImage(imageFile.originalUrl)
    const origW = img.naturalWidth
    const origH = img.naturalHeight

    let finalW = targetW
    let finalH = targetH

    if (maintainAspect && targetW > 0 && targetH > 0) {
      // Check if user's entered ratio is close to image aspect — if so use exact values
      const targetAspect = targetW / targetH
      const origAspect = origW / origH
      if (Math.abs(targetAspect - origAspect) > 0.01) {
        // Ratio doesn't match — use the last-changed dimension as primary
        // Always use width as primary, derive height from original aspect
        finalW = targetW
        finalH = Math.round(targetW / origAspect)
      }
    }

    // Clamp minimums
    finalW = Math.max(1, finalW)
    finalH = Math.max(1, finalH)

    if (mode === "filesize") {
      const result = await resizeToTargetSize(img, finalW, finalH, targetKB, format)
      return { ...result, width: finalW, height: finalH }
    } else {
      const result = await resizeByDimensions(img, finalW, finalH, format)
      return { ...result, width: finalW, height: finalH }
    }
  }, [])

  const resizeAll = useCallback(async () => {
    const w = getWidth()
    const h = getHeight()
    const kb = getTargetKB()

    if (resizeMode === "dimensions" && (w < 1 || h < 1)) return
    if (resizeMode === "filesize" && (w < 1 || h < 1 || kb < 1)) return

    setGlobalStatus("resizing")

    // Get current images snapshot
    const currentImages = [...images]
    for (const image of currentImages) {
      // Revoke old resized URL if re-processing
      if (image.resizedUrl) URL.revokeObjectURL(image.resizedUrl)

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: "resizing", resizedUrl: undefined, resizedBlob: undefined, resizedWidth: undefined, resizedHeight: undefined, resizedSize: undefined, error: undefined } : img
        )
      )

      try {
        const result = await resizeImage(image, w, h, resizeMode, kb, outputFormat, lockAspect)
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  resizedUrl: result.url,
                  resizedBlob: result.blob,
                  resizedWidth: result.width,
                  resizedHeight: result.height,
                  resizedSize: result.blob.size,
                  status: "done",
                }
              : img
          )
        )
      } catch {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? { ...img, status: "error", error: "Failed to resize this image" }
              : img
          )
        )
      }
    }

    setGlobalStatus("idle")
  }, [images, getWidth, getHeight, getTargetKB, resizeMode, outputFormat, lockAspect, resizeImage])

  // ─── File Management ──────────────────────────────────────────────────

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const newImages: ImageFile[] = []

    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) continue
      if (file.size > MAX_FILE_SIZE) continue

      const url = URL.createObjectURL(file)
      try {
        const img = await loadImage(url)
        newImages.push({
          id: crypto.randomUUID(),
          file,
          originalUrl: url,
          originalWidth: img.naturalWidth,
          originalHeight: img.naturalHeight,
          originalSize: file.size,
          status: "pending",
        })
      } catch {
        URL.revokeObjectURL(url)
      }
    }

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages])
      // Auto-set aspect ratio from first uploaded image
      const first = newImages[0]
      setAspectRatio(first.originalWidth / first.originalHeight)
      // If no dimensions set yet, don't auto-fill — keep empty
    }
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) {
        if (img.originalUrl) URL.revokeObjectURL(img.originalUrl)
        if (img.resizedUrl) URL.revokeObjectURL(img.resizedUrl)
      }
      return prev.filter((i) => i.id !== id)
    })
  }, [])

  const clearAll = useCallback(() => {
    images.forEach((img) => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl)
      if (img.resizedUrl) URL.revokeObjectURL(img.resizedUrl)
    })
    setImages([])
  }, [images])

  const downloadImage = useCallback((image: ImageFile) => {
    if (!image.resizedBlob || !image.resizedUrl) return
    const ext = getFileExtension(outputFormat)
    const baseName = image.file.name.replace(/\.[^.]+$/, "")
    const a = document.createElement("a")
    a.href = image.resizedUrl
    a.download = `${baseName}-resized${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [outputFormat])

  const downloadAll = useCallback(() => {
    images.filter((i) => i.status === "done").forEach((img) => downloadImage(img))
  }, [images, downloadImage])

  // ─── Computed Stats ───────────────────────────────────────────────────

  const totalOriginalSize = images.reduce((sum, i) => sum + i.originalSize, 0)
  const totalResizedSize = images
    .filter((i) => i.status === "done")
    .reduce((sum, i) => sum + (i.resizedSize ?? 0), 0)
  const doneCount = images.filter((i) => i.status === "done").length
  const hasPending = images.some((i) => i.status === "pending")

  const canResize = (() => {
    if (images.length === 0 || globalStatus === "resizing") return false
    if (resizeMode === "dimensions") return getWidth() > 0 && getHeight() > 0
    return getWidth() > 0 && getHeight() > 0 && getTargetKB() > 0
  })()

  // ─── Drag & Drop Handlers ─────────────────────────────────────────────

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
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files)
  }, [addFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files)
      e.target.value = ""
    }
  }, [addFiles])

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* 1. Drop Zone — Always on top */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 sm:p-12 cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : images.length > 0
                ? "border-primary/30 bg-primary/[0.02] hover:border-primary/50"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload images by drag and drop or click"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/15">
            <Upload className="size-6 text-primary" aria-hidden="true" />
          </div>
          <div className="text-center">
            {images.length === 0 ? (
              <>
                <p className="text-base font-medium">
                  Drag & drop images here, or <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  PNG, JPG, WebP, GIF, BMP, SVG — up to 50MB each
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">
                  {images.length} image{images.length !== 1 ? "s" : ""} added — <span className="text-primary">click to add more</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  or drag & drop more files here
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_STRING}
            multiple
            className="hidden"
            onChange={handleFileInput}
            aria-hidden="true"
          />
        </div>

        {/* 2. Settings Panel */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <Tabs
            value={resizeMode}
            onValueChange={(v) => setResizeMode(v as ResizeMode)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Mode Tabs */}
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="dimensions" className="gap-1.5">
                  <Ruler className="size-3.5" />
                  By Dimensions
                </TabsTrigger>
                <TabsTrigger value="filesize" className="gap-1.5">
                  <File className="size-3.5" />
                  By File Size
                </TabsTrigger>
              </TabsList>

              {/* Output Format */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Output Format</label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image/jpeg">JPEG (.jpg)</SelectItem>
                    <SelectItem value="image/png">PNG (.png)</SelectItem>
                    <SelectItem value="image/webp">WebP (.webp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dimensions Mode */}
            <TabsContent value="dimensions" className="mt-4 space-y-4">
              {/* Preset Selector */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Quick Presets</label>
                <Select value={selectedPreset} onValueChange={applyPreset}>
                  <SelectTrigger className="w-full sm:w-72">
                    <SelectValue placeholder="Select a preset..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DIMENSION_PRESETS.map((preset) => (
                      <SelectItem key={preset.label} value={preset.label}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Width / Height — Empty by default */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Width (pixels)</label>
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    placeholder="e.g. 300"
                    value={widthStr}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Height (pixels)</label>
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    placeholder="e.g. 300"
                    value={heightStr}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Aspect Ratio Lock */}
              <div className="flex items-center gap-3">
                <Button
                  variant={lockAspect ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLockAspect(!lockAspect)}
                  className="gap-1.5"
                >
                  {lockAspect ? (
                    <Lock className="size-3.5" />
                  ) : (
                    <Unlock className="size-3.5" />
                  )}
                  {lockAspect ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                </Button>
                {lockAspect && aspectRatio && (
                  <span className="text-xs text-muted-foreground">
                    Ratio: {aspectRatio.toFixed(2)}:1 (from uploaded image)
                  </span>
                )}
              </div>
            </TabsContent>

            {/* File Size Mode */}
            <TabsContent value="filesize" className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Set your target file size and max dimensions. The tool will resize your image and then
                optimize quality to meet your size target.
              </p>

              {/* Target Size Preset */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Target File Size</label>
                <div className="flex gap-2">
                  <Select
                    value={targetSizePreset}
                    onValueChange={(v) => {
                      setTargetSizePreset(v)
                      const preset = FILE_SIZE_PRESETS.find((p) => p.label === v)
                      if (preset && preset.value > 0) setTargetSizeStr(String(preset.value))
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FILE_SIZE_PRESETS.map((preset) => (
                        <SelectItem key={preset.label} value={preset.label}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="number"
                      min={1}
                      max={51200}
                      placeholder="e.g. 50"
                      value={targetSizeStr}
                      onChange={(e) => {
                        setTargetSizeStr(e.target.value)
                        setTargetSizePreset("Custom")
                      }}
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">KB</span>
                  </div>
                </div>
              </div>

              {/* Max Dimensions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Dimensions (pixels)</label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    placeholder="Width"
                    value={widthStr}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    placeholder="Height"
                    value={heightStr}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>
                <Button
                  variant={lockAspect ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLockAspect(!lockAspect)}
                  className="gap-1.5"
                >
                  {lockAspect ? <Lock className="size-3.5" /> : <Unlock className="size-3.5" />}
                  {lockAspect ? "Locked" : "Unlocked"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 3. Resize Button — Single or Bulk */}
        {images.length > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="text-sm">
              <span className="font-medium">{images.length} image{images.length !== 1 ? "s" : ""}</span>
              <span className="text-muted-foreground"> ready to resize</span>
              {getWidth() > 0 && getHeight() > 0 && (
                <span className="ml-2 text-muted-foreground">
                  → {getWidth()} × {getHeight()}px
                  {resizeMode === "filesize" && getTargetKB() > 0 && (
                    <span>, max {getTargetKB() >= 1024 ? `${(getTargetKB() / 1024).toFixed(1)} MB` : `${getTargetKB()} KB`}</span>
                  )}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    <RotateCcw className="size-3.5" />
                    Clear
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove all images</TooltipContent>
              </Tooltip>
              {images.length === 1 ? (
                <Button
                  size="sm"
                  onClick={resizeAll}
                  disabled={!canResize}
                >
                  {globalStatus === "resizing" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Resizing...
                    </>
                  ) : (
                    <>
                      <Ruler className="size-3.5" />
                      Resize Now
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={resizeAll}
                  disabled={!canResize}
                >
                  {globalStatus === "resizing" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Resizing...
                    </>
                  ) : (
                    <>
                      <Ruler className="size-3.5" />
                      Resize All ({images.length})
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 4. Image List / Results */}
        {images.length > 0 && (
          <div className="space-y-4">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {totalOriginalSize > 0 && (
                <span className="text-muted-foreground">
                  Original: {formatFileSize(totalOriginalSize)}
                </span>
              )}
              {doneCount > 0 && totalResizedSize > 0 && (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  Resized: {formatFileSize(totalResizedSize)}
                  {totalResizedSize < totalOriginalSize && (
                    <span className="ml-1">
                      ({Math.round(((totalOriginalSize - totalResizedSize) / totalOriginalSize) * 100)}% smaller)
                    </span>
                  )}
                </span>
              )}
              <div className="flex-1" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus className="size-3.5" />
                    Add More
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add more images</TooltipContent>
              </Tooltip>

              {doneCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={downloadAll}>
                      <Download className="size-3.5" />
                      Download All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download all resized images</TooltipContent>
                </Tooltip>
              )}

            </div>

            {/* Image Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute right-2 top-2 z-10 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10"
                    aria-label="Remove image"
                  >
                    <X className="size-3.5 text-muted-foreground" />
                  </button>

                  {/* Image Preview — Side by Side */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      <img
                        src={image.originalUrl}
                        alt="Original"
                        className="size-full object-contain"
                      />
                      <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {image.originalWidth}×{image.originalHeight}
                      </span>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      {image.status === "done" && image.resizedUrl ? (
                        <>
                          <img
                            src={image.resizedUrl}
                            alt="Resized"
                            className="size-full object-contain"
                          />
                          <span className="absolute bottom-1 left-1 rounded bg-emerald-500/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            {image.resizedWidth}×{image.resizedHeight}
                          </span>
                        </>
                      ) : image.status === "resizing" ? (
                        <div className="flex size-full items-center justify-center">
                          <Loader2 className="size-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : image.status === "error" ? (
                        <div className="flex size-full flex-col items-center justify-center gap-1">
                          <Info className="size-4 text-destructive" />
                          <span className="text-[10px] text-destructive">{image.error}</span>
                        </div>
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <span className="text-xs text-muted-foreground">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="space-y-1">
                    <p className="truncate text-sm font-medium" title={image.file.name}>
                      {image.file.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(image.originalSize)}</span>
                      <span>({image.originalWidth}×{image.originalHeight})</span>
                      {image.status === "done" && image.resizedSize !== undefined && (
                        <>
                          <span>→</span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            {formatFileSize(image.resizedSize)}
                          </span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            ({image.resizedWidth}×{image.resizedHeight})
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Download Button */}
                  {image.status === "done" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => downloadImage(image)}
                    >
                      <Download className="size-3.5" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
