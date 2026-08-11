"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, Download, X, ImagePlus, RotateCcw, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
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

interface ImageFile {
  id: string
  file: File
  originalUrl: string
  compressedUrl?: string
  compressedBlob?: Blob
  originalSize: number
  compressedSize?: number
  status: "pending" | "compressing" | "done" | "error"
  error?: string
}

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]

type OutputFormat = "image/jpeg" | "image/png" | "image/webp"

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function getCompressionPercent(original: number, compressed: number): number {
  if (original === 0) return 0
  return Math.round(((original - compressed) / original) * 100)
}

function getFileExtension(format: OutputFormat): string {
  switch (format) {
    case "image/jpeg": return ".jpg"
    case "image/png": return ".png"
    case "image/webp": return ".webp"
  }
}

export function ImageCompressorTool() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [quality, setQuality] = useState(80)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [globalStatus, setGlobalStatus] = useState<"idle" | "compressing">("idle")

  const compressImage = useCallback(async (
    file: File,
    qualityVal: number,
    format: OutputFormat
  ): Promise<{ blob: Blob; url: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)

      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          URL.revokeObjectURL(url)
          reject(new Error("Canvas context not available"))
          return
        }

        // For JPEG output, fill white background (no transparency)
        if (format === "image/jpeg") {
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx.drawImage(img, 0, 0)
        URL.revokeObjectURL(url)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Compression failed"))
              return
            }
            const blobUrl = URL.createObjectURL(blob)
            resolve({ blob, url: blobUrl })
          },
          format,
          qualityVal / 100
        )
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error("Failed to load image"))
      }

      img.src = url
    })
  }, [])

  const compressAll = useCallback(async () => {
    setGlobalStatus("compressing")

    for (const image of images) {
      if (image.status === "done") continue

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: "compressing" } : img
        )
      )

      try {
        const { blob, url } = await compressImage(image.file, quality, outputFormat)
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  compressedUrl: url,
                  compressedBlob: blob,
                  compressedSize: blob.size,
                  status: "done",
                }
              : img
          )
        )
      } catch {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? { ...img, status: "error", error: "Failed to compress this image" }
              : img
          )
        )
      }
    }

    setGlobalStatus("idle")
  }, [images, quality, outputFormat, compressImage])

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: ImageFile[] = []

    for (const file of Array.from(files)) {
      if (!ACCEPTED_TYPES.includes(file.type)) continue
      if (file.size > MAX_FILE_SIZE) continue

      newImages.push({
        id: crypto.randomUUID(),
        file,
        originalUrl: URL.createObjectURL(file),
        originalSize: file.size,
        status: "pending",
      })
    }

    setImages((prev) => [...prev, ...newImages])
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) {
        if (img.originalUrl) URL.revokeObjectURL(img.originalUrl)
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl)
      }
      return prev.filter((i) => i.id !== id)
    })
  }, [])

  const clearAll = useCallback(() => {
    images.forEach((img) => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl)
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl)
    })
    setImages([])
  }, [images])

  const downloadImage = useCallback((image: ImageFile) => {
    if (!image.compressedBlob || !image.compressedUrl) return

    const ext = getFileExtension(outputFormat)
    const baseName = image.file.name.replace(/\.[^.]+$/, "")
    const a = document.createElement("a")
    a.href = image.compressedUrl
    a.download = `${baseName}-compressed${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [outputFormat])

  const downloadAll = useCallback(() => {
    const doneImages = images.filter((i) => i.status === "done")
    doneImages.forEach((img) => downloadImage(img))
  }, [images, downloadImage])

  const totalOriginalSize = images.reduce((sum, i) => sum + i.originalSize, 0)
  const totalCompressedSize = images
    .filter((i) => i.status === "done")
    .reduce((sum, i) => sum + (i.compressedSize ?? 0), 0)
  const doneCount = images.filter((i) => i.status === "done").length
  const hasPending = images.some((i) => i.status === "pending")

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
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files)
    }
  }, [addFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files)
      e.target.value = ""
    }
  }, [addFiles])

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* Settings Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between rounded-xl border border-border bg-card p-4 sm:p-5">
          {/* Quality Slider */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Quality</label>
              <span className="text-sm font-semibold text-primary">{quality}%</span>
            </div>
            <Slider
              value={[quality]}
              onValueChange={(v) => setQuality(v[0])}
              min={1}
              max={100}
              step={1}
              aria-label="Compression quality"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Smallest file</span>
              <span>Best quality</span>
            </div>
          </div>

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

        {/* Drop Zone */}
        {images.length === 0 && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-10 sm:p-14 cursor-pointer transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
            role="button"
            tabIndex={0}
            aria-label="Upload images by drag and drop or click"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click()
            }}
          >
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary/15">
              <Upload className="size-8 text-primary" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-base font-medium">
                Drag & drop images here, or <span className="text-primary">browse</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                PNG, JPG, WebP up to 50MB each
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              onChange={handleFileInput}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Image List */}
        {images.length > 0 && (
          <div className="space-y-4">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted-foreground">
                {images.length} image{images.length !== 1 ? "s" : ""}
              </span>
              {totalOriginalSize > 0 && (
                <span className="text-muted-foreground">
                  Original: {formatFileSize(totalOriginalSize)}
                </span>
              )}
              {doneCount > 0 && totalCompressedSize > 0 && (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  Compressed: {formatFileSize(totalCompressedSize)} ({getCompressionPercent(totalOriginalSize, totalCompressedSize)}% smaller)
                </span>
              )}
              <div className="flex-1" />
              {/* Actions */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus className="size-3.5" />
                    Add More
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add more images</TooltipContent>
              </Tooltip>

              {hasPending && globalStatus !== "compressing" && (
                <Button size="sm" onClick={compressAll} disabled={images.length === 0}>
                  {globalStatus === "compressing" ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="size-3.5" />
                      Compress All
                    </>
                  )}
                </Button>
              )}

              {doneCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={downloadAll}>
                      <Download className="size-3.5" />
                      Download All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download all compressed images</TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={clearAll}>
                    <RotateCcw className="size-3.5" />
                    Clear
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Remove all images</TooltipContent>
              </Tooltip>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                className="hidden"
                onChange={handleFileInput}
                aria-hidden="true"
              />
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

                  {/* Image Preview */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      <img
                        src={image.originalUrl}
                        alt="Original"
                        className="size-full object-contain"
                      />
                      <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        Original
                      </span>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      {image.status === "done" && image.compressedUrl ? (
                        <>
                          <img
                            src={image.compressedUrl}
                            alt="Compressed"
                            className="size-full object-contain"
                          />
                          <span className="absolute bottom-1 left-1 rounded bg-emerald-500/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            Compressed
                          </span>
                        </>
                      ) : image.status === "compressing" ? (
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
                      {image.status === "done" && image.compressedSize !== undefined && (
                        <>
                          <span>→</span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            {formatFileSize(image.compressedSize)}
                          </span>
                          <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                            -{getCompressionPercent(image.originalSize, image.compressedSize)}%
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

        {/* Empty state message */}
        {images.length === 0 && (
          <div className="hidden" />
        )}
      </div>
    </TooltipProvider>
  )
}
