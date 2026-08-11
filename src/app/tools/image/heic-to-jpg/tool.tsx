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
  ArrowRight,
  Smartphone,
  Settings2,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageFile {
  id: string
  file: File
  originalUrl?: string
  convertedUrl?: string
  convertedBlob?: Blob
  originalSize: number
  originalWidth?: number
  originalHeight?: number
  convertedSize?: number
  status: "pending" | "converting" | "done" | "error"
  error?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

const ACCEPT_STRING = ".heic,.heif,image/heic,image/heif"

const HEIC_EXTENSIONS = [".heic", ".heif"]

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

function isHeicFile(file: File): boolean {
  const name = (file.name || "").toLowerCase()
  return HEIC_EXTENSIONS.some((ext) => name.endsWith(ext))
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

// ─── Dynamic import for heic2any ────────────────────────────────────────────

async function convertHeicToJpg(file: File, quality: number): Promise<{ blob: Blob; url: string }> {
  const heic2any = (await import("heic2any")).default

  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality,
  })

  // heic2any returns a Blob or Blob[] depending on the input
  const blob = Array.isArray(result) ? result[0] : result
  return { blob, url: URL.createObjectURL(blob) }
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function HeicToJpgTool() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [globalStatus, setGlobalStatus] = useState<"idle" | "converting">("idle")
  const [quality, setQuality] = useState(0.9)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ─── Convert Functions ──────────────────────────────────

  const convertAll = useCallback(async () => {
    setGlobalStatus("converting")

    const currentImages = [...images]
    for (const image of currentImages) {
      if (image.convertedUrl) URL.revokeObjectURL(image.convertedUrl)

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? { ...img, status: "converting", convertedUrl: undefined, convertedBlob: undefined, convertedSize: undefined, error: undefined }
            : img
        )
      )

      try {
        const result = await convertHeicToJpg(image.file, quality)

        // Get dimensions from converted image
        let width: number | undefined
        let height: number | undefined
        try {
          const img = await loadImage(result.url)
          width = img.naturalWidth
          height = img.naturalHeight
        } catch {
          // dimension detection is best-effort
        }

        setImages((prev) =>
          prev.map((i) =>
            i.id === image.id
              ? {
                  ...i,
                  convertedUrl: result.url,
                  convertedBlob: result.blob,
                  convertedSize: result.blob.size,
                  originalWidth: i.originalWidth ?? width,
                  originalHeight: i.originalHeight ?? height,
                  status: "done",
                }
              : i
          )
        )
      } catch (err) {
        const message = err instanceof Error ? (err.message || "") : ""
        const errorMsg = message.includes("heic2any")
          ? "HEIC conversion not supported in this browser"
          : "Failed to convert this HEIC file"
        setImages((prev) =>
          prev.map((i) =>
            i.id === image.id
              ? { ...i, status: "error", error: errorMsg }
              : i
          )
        )
      }
    }

    setGlobalStatus("idle")
  }, [images, quality])

  // ─── File Management ──────────────────────────────────

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: ImageFile[] = []

    for (const file of Array.from(files)) {
      if (!isHeicFile(file)) {
        toast.error(`"${(file.name || "").split(".").pop()?.toUpperCase()}" is not a HEIC/HEIF file`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 50MB limit`)
        continue
      }

      newImages.push({
        id: crypto.randomUUID(),
        file,
        originalSize: file.size,
        status: "pending",
      })
    }

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages])
    }
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) {
        if (img.originalUrl) URL.revokeObjectURL(img.originalUrl)
        if (img.convertedUrl) URL.revokeObjectURL(img.convertedUrl)
      }
      return prev.filter((i) => i.id !== id)
    })
  }, [])

  const clearAll = useCallback(() => {
    images.forEach((img) => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl)
      if (img.convertedUrl) URL.revokeObjectURL(img.convertedUrl)
    })
    setImages([])
  }, [images])

  const downloadImage = useCallback((image: ImageFile) => {
    if (!image.convertedBlob || !image.convertedUrl) return
    const baseName = image.file.name.replace(/\.[^.]+$/, "")
    const a = document.createElement("a")
    a.href = image.convertedUrl
    a.download = `${baseName}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [])

  const downloadAll = useCallback(() => {
    images.filter((i) => i.status === "done").forEach((img) => downloadImage(img))
  }, [images, downloadImage])

  // ─── Computed Stats ──────────────────────────────────

  const totalOriginalSize = images.reduce((sum, i) => sum + i.originalSize, 0)
  const totalConvertedSize = images
    .filter((i) => i.status === "done")
    .reduce((sum, i) => sum + (i.convertedSize ?? 0), 0)
  const doneCount = images.filter((i) => i.status === "done").length
  const canConvert = images.length > 0 && globalStatus !== "converting"

  // ─── Drag & Drop Handlers ─────────────────────────────

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files)
    },
    [addFiles]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files)
        e.target.value = ""
      }
    },
    [addFiles]
  )

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
              : images.length > 0
                ? "border-primary/30 bg-primary/[0.02] hover:border-primary/50"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Upload HEIC images by drag and drop or click"
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
                  Drag & drop HEIC/HEIF files here, or <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  iPhone & iPad photos — up to 50MB each
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">
                  {images.length} HEIC file{images.length !== 1 ? "s" : ""} added —{" "}
                  <span className="text-primary">click to add more</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  or drag & drop more HEIC/HEIF files here
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

        {/* 2. Quality Settings */}
        {images.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Settings2 className="size-4 text-muted-foreground" />
              Output Quality
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="heic-quality">JPG Quality</Label>
                <span className="text-sm font-medium tabular-nums">{Math.round(quality * 100)}%</span>
              </div>
              <Slider
                id="heic-quality"
                min={50}
                max={100}
                step={5}
                value={[Math.round(quality * 100)]}
                onValueChange={([v]) => setQuality(v / 100)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller file</span>
                <span>Best quality</span>
              </div>
              <div className="flex gap-2">
                {[50, 70, 85, 90, 95, 100].map((q) => (
                  <Button
                    key={q}
                    variant={Math.round(quality * 100) === q ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs px-2"
                    onClick={() => setQuality(q / 100)}
                  >
                    {q}%
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Convert Button */}
        {images.length > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="text-sm">
              <span className="font-medium">{images.length} HEIC</span>
              <span className="text-muted-foreground"> file{images.length !== 1 ? "s" : ""} ready</span>
              {doneCount > 0 && (
                <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-medium">
                  ({doneCount} converted)
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
                <TooltipContent>Remove all files</TooltipContent>
              </Tooltip>
              {images.length === 1 ? (
                <Button size="sm" onClick={convertAll} disabled={!canConvert}>
                  {globalStatus === "converting" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Smartphone className="size-3.5" />
                      Convert Now
                    </>
                  )}
                </Button>
              ) : (
                <Button size="sm" onClick={convertAll} disabled={!canConvert}>
                  {globalStatus === "converting" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Smartphone className="size-3.5" />
                      Convert All ({images.length})
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
                  HEIC: {formatFileSize(totalOriginalSize)}
                </span>
              )}
              {doneCount > 0 && totalConvertedSize > 0 && (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  JPG: {formatFileSize(totalConvertedSize)}
                  {totalConvertedSize !== totalOriginalSize && (
                    <span className="ml-1">
                      (+{Math.abs(getSizeChangePercent(totalOriginalSize, totalConvertedSize))}%{" "}
                      {totalConvertedSize > totalOriginalSize ? "larger" : "smaller"})
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
                <TooltipContent>Add more HEIC files</TooltipContent>
              </Tooltip>

              {doneCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={downloadAll}>
                      <Download className="size-3.5" />
                      Download All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download all JPG files</TooltipContent>
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
                    aria-label="Remove file"
                  >
                    <X className="size-3.5 text-muted-foreground" />
                  </button>

                  {/* Preview — Side by Side */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      <div className="flex size-full flex-col items-center justify-center gap-1">
                        <Smartphone className="size-5 text-muted-foreground/50" />
                        <span className="text-[10px] text-muted-foreground">HEIC</span>
                      </div>
                      <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        HEIC {formatFileSize(image.originalSize)}
                      </span>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      {image.status === "done" && image.convertedUrl ? (
                        <>
                          <img
                            src={image.convertedUrl}
                            alt="Converted JPG"
                            className="size-full object-contain"
                          />
                          <span className="absolute bottom-1 left-1 rounded bg-emerald-500/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            JPG {formatFileSize(image.convertedSize!)}
                          </span>
                        </>
                      ) : image.status === "converting" ? (
                        <div className="flex size-full items-center justify-center">
                          <Loader2 className="size-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : image.status === "error" ? (
                        <div className="flex size-full flex-col items-center justify-center gap-1">
                          <Info className="size-4 text-destructive" />
                          <span className="text-[10px] text-destructive">{(image.error || "Error")}</span>
                        </div>
                      ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-1">
                          <ArrowRight className="size-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">JPG</span>
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
                      {image.originalWidth && image.originalHeight && (
                        <span>{image.originalWidth}×{image.originalHeight}</span>
                      )}
                      {image.status === "done" && image.convertedSize !== undefined && (
                        <>
                          <ArrowRight className="size-3 text-muted-foreground" />
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            {formatFileSize(image.convertedSize)}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 font-medium ${
                              image.convertedSize > image.originalSize
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {image.convertedSize > image.originalSize ? "+" : "-"}
                            {Math.abs(getSizeChangePercent(image.originalSize, image.convertedSize))}%
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
                      Download JPG
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
