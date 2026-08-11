"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import {
  Upload,
  Download,
  RotateCcw,
  Loader2,
  ArrowLeftRight,
  Settings2,
  AlertTriangle,
  Info,
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
import { Badge } from "@/components/ui/badge"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConvertedResult {
  blob: Blob
  url: string
  width: number
  height: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 50 * 1024 * 1024

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"]

const ACCEPT_STRING = "image/png,image/jpeg,image/jpg,image/webp,image/avif"

const OUTPUT_FORMATS = [
  { value: "image/png", label: "PNG", ext: "png", lossy: false, mime: "image/png" },
  { value: "image/jpeg", label: "JPG", ext: "jpg", lossy: true, mime: "image/jpeg" },
  { value: "image/webp", label: "WebP", ext: "webp", lossy: true, mime: "image/webp" },
  { value: "image/avif", label: "AVIF", ext: "avif", lossy: true, mime: "image/avif" },
]

// ─── Utility Functions ───────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function getSizeChangePercent(original: number, converted: number): number {
  if (original === 0) return 0
  return Math.round(((converted - original) / original) * 100)
}

function detectFormat(file: File): { label: string; ext: string } {
  const ext = (file.name || "").split(".").pop()?.toLowerCase() || ""
  if (ext === "jpg" || ext === "jpeg") return { label: "JPG", ext }
  if (ext === "png") return { label: "PNG", ext }
  if (ext === "webp") return { label: "WebP", ext }
  if (ext === "avif") return { label: "AVIF", ext }
  if (file.type === "image/jpeg") return { label: "JPG", ext: "jpg" }
  if (file.type === "image/png") return { label: "PNG", ext: "png" }
  if (file.type === "image/webp") return { label: "WebP", ext: "webp" }
  if (file.type === "image/avif") return { label: "AVIF", ext: "avif" }
  return { label: "Unknown", ext: "" }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

function checkAvifSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    canvas.toBlob(
      (blob) => resolve(blob !== null && blob.type === "image/avif"),
      "image/avif"
    )
  })
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ImageFormatConverterTool() {
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [outputFormat, setOutputFormat] = useState("image/webp")
  const [quality, setQuality] = useState(0.85)
  const [sourceFormat, setSourceFormat] = useState<{ label: string; ext: string } | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ w: number; h: number } | null>(null)
  const [result, setResult] = useState<ConvertedResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [avifSupported, setAvifSupported] = useState<boolean | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const selectedFormat = OUTPUT_FORMATS.find((f) => f.value === outputFormat)
  const isLossy = selectedFormat?.lossy ?? false

  // Check AVIF support on mount
  useEffect(() => {
    checkAvifSupport().then(setAvifSupported)
  }, [])

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl)
      if (result?.url) URL.revokeObjectURL(result.url)
    }
  }, [])

  // ─── File Handling ───────────────────────────────────

  const handleFile = useCallback(async (f: File) => {
    if (f.size > MAX_FILE_SIZE) {
      toast.error("File exceeds 50MB limit")
      return
    }
    if (!ACCEPTED_TYPES.includes(f.type) && !ACCEPTED_TYPES.some(t => f.type.startsWith(t.split("/")[0] + "/"))) {
      const ext = (f.name || "").split(".").pop()?.toLowerCase() || ""
      const validExts = ["png", "jpg", "jpeg", "webp", "avif"]
      if (!validExts.includes(ext)) {
        toast.error("Unsupported format. Use JPG, PNG, WebP, or AVIF.")
        return
      }
    }

    // Cleanup previous
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (result?.url) URL.revokeObjectURL(result.url)

    const url = URL.createObjectURL(f)
    setFile(f)
    setOriginalUrl(url)
    setResult(null)
    setError(null)

    const fmt = detectFormat(f)
    setSourceFormat(fmt)

    try {
      const img = await loadImage(url)
      setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight })
    } catch {
      toast.error("Failed to load image")
    }
  }, [originalUrl, result])

  const addFile = useCallback((files: FileList | File[]) => {
    if (files.length > 0) handleFile(files[0])
  }, [handleFile])

  const clearAll = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (result?.url) URL.revokeObjectURL(result.url)
    setFile(null)
    setOriginalUrl("")
    setResult(null)
    setError(null)
    setSourceFormat(null)
    setImageDimensions(null)
  }, [originalUrl, result])

  // ─── Convert ──────────────────────────────────────────

  const convertImage = useCallback(async () => {
    if (!file || !originalUrl) return
    setIsConverting(true)
    setError(null)

    if (result?.url) URL.revokeObjectURL(result.url)

    try {
      const img = await loadImage(originalUrl)
      const canvas = canvasRef.current || document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Canvas context not available")
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // White bg for JPEG
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height)

      const qualityParam = isLossy ? quality : undefined

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, outputFormat, qualityParam)
      })

      if (!blob) {
        if (outputFormat === "image/avif" && avifSupported === false) {
          throw new Error("AVIF is not supported in your browser. Try Chrome or Edge, or choose WebP instead.")
        }
        throw new Error(`Conversion to ${selectedFormat?.label} failed. Your browser may not support this format.`)
      }

      setResult({
        blob,
        url: URL.createObjectURL(blob),
        width: canvas.width,
        height: canvas.height,
      })
    } catch (err) {
      const message = err instanceof Error ? (err.message || "") : "Conversion failed"
      setError(message)
    } finally {
      setIsConverting(false)
    }
  }, [file, originalUrl, outputFormat, quality, isLossy, selectedFormat, result, avifSupported])

  // ─── Download ────────────────────────────────────────

  const downloadResult = useCallback(() => {
    if (!result || !file) return
    const baseName = file.name.replace(/\.[^.]+$/, "")
    const ext = selectedFormat?.ext || "png"
    const a = document.createElement("a")
    a.href = result.url
    a.download = `${baseName}.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [result, file, selectedFormat])

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
      <canvas ref={canvasRef} className="hidden" />
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
                  JPG, PNG, WebP, or AVIF — up to 50MB
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">
                  {sourceFormat?.label} image loaded — <span className="text-primary">click to replace</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {imageDimensions && `${imageDimensions.w}×${imageDimensions.h} — `}
                  {file.name}
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

        {/* 2. Settings */}
        {file && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Settings2 className="size-4 text-muted-foreground" />
              Conversion Settings
            </div>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="target-format">Target Format</Label>
                <Select value={outputFormat} onValueChange={(v) => { setOutputFormat(v); setResult(null); setError(null) }}>
                  <SelectTrigger id="target-format" className="w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTPUT_FORMATS.map((fmt) => (
                      <SelectItem key={fmt.value} value={fmt.value}>
                        {fmt.label}
                        {fmt.lossy ? " (lossy)" : " (lossless)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {outputFormat === "image/avif" && avifSupported === false && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3">
                    <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      AVIF is not supported in your browser. Try Chrome or Edge, or choose WebP instead.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fmt-quality">
                    Quality
                    {!isLossy && (
                      <span className="ml-1 text-xs text-muted-foreground font-normal">
                        (N/A for {selectedFormat?.label})
                      </span>
                    )}
                  </Label>
                  {isLossy && (
                    <span className="text-sm font-medium tabular-nums">{Math.round(quality * 100)}%</span>
                  )}
                </div>
                <Slider
                  id="fmt-quality"
                  min={10}
                  max={100}
                  step={5}
                  value={[Math.round(quality * 100)]}
                  onValueChange={([v]) => setQuality(v / 100)}
                  disabled={!isLossy}
                  className="w-full"
                />
                {isLossy && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Smaller file</span>
                    <span>Best quality</span>
                  </div>
                )}
              </div>
            </div>

            {/* Convert Button */}
            <div className="flex items-center justify-between pt-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    <RotateCcw className="size-3.5" />
                    Clear
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset and start over</TooltipContent>
              </Tooltip>
              <Button size="sm" onClick={convertImage} disabled={isConverting || (outputFormat === "image/avif" && avifSupported === false)}>
                {isConverting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <ArrowLeftRight className="size-3.5" />
                    Convert to {selectedFormat?.label}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* 3. Error Display */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-destructive/50 bg-destructive/5 p-4">
            <Info className="size-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Conversion Error</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* 4. Side-by-Side Comparison */}
        {file && originalUrl && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Comparison</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Original */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <span className="text-sm font-medium">Original</span>
                  <Badge variant="secondary" className="text-xs">
                    {sourceFormat?.label || "Unknown"}
                  </Badge>
                </div>
                <div className="relative aspect-video bg-muted">
                  <img
                    src={originalUrl}
                    alt="Original image"
                    className="size-full object-contain"
                  />
                </div>
                <div className="px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between">
                  <span>{imageDimensions ? `${imageDimensions.w}×${imageDimensions.h}` : ""}</span>
                  <span className="font-medium">{formatFileSize(file.size)}</span>
                </div>
              </div>

              {/* Converted */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <span className="text-sm font-medium">Converted</span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedFormat?.label}
                  </Badge>
                </div>
                <div className="relative aspect-video bg-muted">
                  {result ? (
                    <img
                      src={result.url}
                      alt={`Converted ${selectedFormat?.label}`}
                      className="size-full object-contain"
                    />
                  ) : isConverting ? (
                    <div className="flex size-full items-center justify-center">
                      <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
                      <ArrowLeftRight className="size-5 opacity-40" />
                      <span className="text-xs">Click &quot;Convert&quot; to see result</span>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between">
                  <span>{result ? `${result.width}×${result.height}` : ""}</span>
                  {result ? (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{formatFileSize(result.blob.size)}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-medium ${
                          result.blob.size > file.size
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        }`
                      }
                      >
                        {result.blob.size > file.size ? "+" : "-"}
                        {Math.abs(getSizeChangePercent(file.size, result.blob.size))}%
                      </span>
                    </div>
                  ) : (
                    <span>—</span>
                  )}
                </div>
              </div>
            </div>

            {/* Download Button */}
            {result && (
              <Button className="w-full sm:w-auto" onClick={downloadResult}>
                <Download className="size-4" />
                Download {selectedFormat?.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
