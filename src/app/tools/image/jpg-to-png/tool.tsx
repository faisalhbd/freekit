"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, Download, X, ImagePlus, RotateCcw, Loader2, Info, FileImage, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageFile {
  id: string
  file: File
  originalUrl: string
  convertedUrl?: string
  convertedBlob?: Blob
  originalSize: number
  originalWidth: number
  originalHeight: number
  convertedSize?: number
  status: "pending" | "converting" | "done" | "error"
  error?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg"]

const ACCEPT_STRING = "image/jpeg,image/jpg"

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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

// ─── Core Conversion Function ─────────────────────────────────────────────────
// PNG is lossless — no quality parameter needed

function convertToPNG(
  img: HTMLImageElement
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      reject(new Error("Canvas context not available"))
      return
    }

    // High quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("PNG conversion failed"))
          return
        }
        resolve({ blob, url: URL.createObjectURL(blob) })
      },
      "image/png"
      // No quality parameter — PNG is lossless
    )
  })
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function JpgToPngTool() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [globalStatus, setGlobalStatus] = useState<"idle" | "converting">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ─── Convert Functions ──────────────────────────────────────────────────

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
        const img = await loadImage(image.originalUrl)
        const result = await convertToPNG(img)
        setImages((prev) =>
          prev.map((i) =>
            i.id === image.id
              ? {
                  ...i,
                  convertedUrl: result.url,
                  convertedBlob: result.blob,
                  convertedSize: result.blob.size,
                  status: "done",
                }
              : i
          )
        )
      } catch {
        setImages((prev) =>
          prev.map((i) =>
            i.id === image.id
              ? { ...i, status: "error", error: "Failed to convert this image" }
              : i
          )
        )
      }
    }

    setGlobalStatus("idle")
  }, [images])

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
    a.download = `${baseName}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [])

  const downloadAll = useCallback(() => {
    images.filter((i) => i.status === "done").forEach((img) => downloadImage(img))
  }, [images, downloadImage])

  // ─── Computed Stats ───────────────────────────────────────────────────

  const totalOriginalSize = images.reduce((sum, i) => sum + i.originalSize, 0)
  const totalConvertedSize = images
    .filter((i) => i.status === "done")
    .reduce((sum, i) => sum + (i.convertedSize ?? 0), 0)
  const doneCount = images.filter((i) => i.status === "done").length

  const canConvert = images.length > 0 && globalStatus !== "converting"

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
          aria-label="Upload JPG images by drag and drop or click"
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
                  Drag & drop JPG images here, or <span className="text-primary">browse</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  JPG/JPEG files up to 50MB each
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium">
                  {images.length} image{images.length !== 1 ? "s" : ""} added — <span className="text-primary">click to add more</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  or drag & drop more JPG files here
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

        {/* 2. Info Banner — Lossless notice */}
        {images.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Lossless Conversion</p>
                <p className="text-sm text-muted-foreground">
                  JPG to PNG is a lossless conversion — every pixel from your original image is preserved exactly.
                  PNG supports transparency and produces no compression artifacts. Note: PNG files are typically larger than JPG since they store all pixel data without compression loss.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Convert Button */}
        {images.length > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="text-sm">
              <span className="font-medium">{images.length} JPG</span>
              <span className="text-muted-foreground"> image{images.length !== 1 ? "s" : ""} ready</span>
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
                <TooltipContent>Remove all images</TooltipContent>
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
                      <FileImage className="size-3.5" />
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
                      <FileImage className="size-3.5" />
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
                  Original: {formatFileSize(totalOriginalSize)}
                </span>
              )}
              {doneCount > 0 && totalConvertedSize > 0 && (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  PNG: {formatFileSize(totalConvertedSize)}
                  {totalConvertedSize > totalOriginalSize && (
                    <span className="ml-1">
                      (+{Math.round(((totalConvertedSize - totalOriginalSize) / totalOriginalSize) * 100)}% larger — lossless)
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
                <TooltipContent>Add more JPG images</TooltipContent>
              </Tooltip>

              {doneCount > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={downloadAll}>
                      <Download className="size-3.5" />
                      Download All
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download all PNG images</TooltipContent>
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
                        alt="Original JPG"
                        className="size-full object-contain"
                      />
                      <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        JPG {formatFileSize(image.originalSize)}
                      </span>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                      {image.status === "done" && image.convertedUrl ? (
                        <>
                          <img
                            src={image.convertedUrl}
                            alt="Converted PNG"
                            className="size-full object-contain"
                          />
                          <span className="absolute bottom-1 left-1 rounded bg-emerald-500/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            PNG {formatFileSize(image.convertedSize!)}
                          </span>
                        </>
                      ) : image.status === "converting" ? (
                        <div className="flex size-full items-center justify-center">
                          <Loader2 className="size-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : image.status === "error" ? (
                        <div className="flex size-full flex-col items-center justify-center gap-1">
                          <Info className="size-4 text-destructive" />
                          <span className="text-[10px] text-destructive">{image.error}</span>
                        </div>
                      ) : (
                        <div className="flex size-full flex-col items-center justify-center gap-1">
                          <ArrowRight className="size-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">PNG</span>
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
                      <span>{image.originalWidth}×{image.originalHeight}</span>
                      <span>{formatFileSize(image.originalSize)}</span>
                      {image.status === "done" && image.convertedSize !== undefined && (
                        <>
                          <ArrowRight className="size-3 text-muted-foreground" />
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            {formatFileSize(image.convertedSize)}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 font-medium ${
                            image.convertedSize > image.originalSize
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {image.convertedSize > image.originalSize ? "+" : "-"}{Math.abs(getSizeChangePercent(image.originalSize, image.convertedSize))}%
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
                      Download PNG
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
