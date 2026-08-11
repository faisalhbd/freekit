"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Crop, RotateCcw, Lock, Unlock, ImageIcon } from "lucide-react"

interface CropRect {
  x: number
  y: number
  width: number
  height: number
}

type HandlePosition =
  | "nw"
  | "n"
  | "ne"
  | "e"
  | "se"
  | "s"
  | "sw"
  | "w"

const ASPECT_RATIOS: Record<string, number | null> = {
  free: null,
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "3:2": 3 / 2,
  "2:3": 2 / 3,
  "9:16": 9 / 16,
}

const HANDLE_SIZE = 10

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

export function ImageCropperTool() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [cropRect, setCropRect] = useState<CropRect | null>(null)
  const [aspectRatio, setAspectRatio] = useState<string>("free")
  const [outputFormat, setOutputFormat] = useState<string>("png")
  const [jpgQuality, setJpgQuality] = useState<number>(90)
  const [isDragging, setIsDragging] = useState(false)
  const [dragTarget, setDragTarget] = useState<
    | { type: "move" }
    | { type: "resize"; handle: HandlePosition }
    | null
  >(null)
  const [dragStart, setDragStart] = useState<{ x: number; y: number; rect: CropRect } | null>(null)
  const [displayScale, setDisplayScale] = useState(1)

  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getRatio = useCallback(() => {
    return ASPECT_RATIOS[aspectRatio] ?? null
  }, [aspectRatio])

  // Load image
  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    setFileName(file.name || "image")
    setImageUrl(url)
    setCropRect(null)

    const img = new Image()
    img.onload = () => {
      setImageEl(img)
    }
    img.src = url
  }, [])

  // Initialize crop rect when image loads
  useEffect(() => {
    if (!imageEl || !containerRef.current) return
    const container = containerRef.current
    const containerW = container.clientWidth
    const scale = Math.min(containerW / imageEl.naturalWidth, 600 / imageEl.naturalHeight, 1)
    setDisplayScale(scale)

    const dispW = imageEl.naturalWidth * scale
    const dispH = imageEl.naturalHeight * scale

    const ratio = getRatio()
    let cropW = dispW * 0.8
    let cropH = dispH * 0.8

    if (ratio) {
      if (cropW / cropH > ratio) {
        cropW = cropH * ratio
      } else {
        cropH = cropW / ratio
      }
    }

    setCropRect({
      x: (dispW - cropW) / 2,
      y: (dispH - cropH) / 2,
      width: cropW,
      height: cropH,
    })
  }, [imageEl, getRatio])

  // Reset crop when aspect ratio changes
  useEffect(() => {
    if (!imageEl || !containerRef.current || !cropRect) return
    const container = containerRef.current
    const containerW = container.clientWidth
    const scale = Math.min(containerW / imageEl.naturalWidth, 600 / imageEl.naturalHeight, 1)
    setDisplayScale(scale)

    const dispW = imageEl.naturalWidth * scale
    const dispH = imageEl.naturalHeight * scale

    const ratio = getRatio()
    if (ratio) {
      let newW = cropRect.width
      let newH = newW / ratio
      if (newH > dispH) {
        newH = dispH * 0.8
        newW = newH * ratio
      }
      if (newW > dispW) {
        newW = dispW * 0.8
        newH = newW / ratio
      }
      setCropRect({
        x: (dispW - newW) / 2,
        y: (dispH - newH) / 2,
        width: newW,
        height: newH,
      })
    }
  }, [aspectRatio, imageEl, cropRect, getRatio, displayScale])

  // Drag & drop handlers
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
    const file = e.dataTransfer.files[0]
    if (file) loadImage(file)
  }, [loadImage])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadImage(file)
  }, [loadImage])

  // Mouse/touch position helper
  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    if (!containerRef.current) return { x: 0, y: 0 }
    const rect = containerRef.current.getBoundingClientRect()
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  // Detect which handle is under the cursor
  const getHandle = useCallback(
    (pos: { x: number; y: number }, rect: CropRect): HandlePosition | "move" | null => {
      const hs = HANDLE_SIZE
      const handles: { pos: HandlePosition; x: number; y: number }[] = [
        { pos: "nw", x: rect.x, y: rect.y },
        { pos: "n", x: rect.x + rect.width / 2, y: rect.y },
        { pos: "ne", x: rect.x + rect.width, y: rect.y },
        { pos: "e", x: rect.x + rect.width, y: rect.y + rect.height / 2 },
        { pos: "se", x: rect.x + rect.width, y: rect.y + rect.height },
        { pos: "s", x: rect.x + rect.width / 2, y: rect.y + rect.height },
        { pos: "sw", x: rect.x, y: rect.y + rect.height },
        { pos: "w", x: rect.x, y: rect.y + rect.height / 2 },
      ]
      for (const h of handles) {
        if (Math.abs(pos.x - h.x) <= hs && Math.abs(pos.y - h.y) <= hs) {
          return h.pos
        }
      }
      if (
        pos.x >= rect.x &&
        pos.x <= rect.x + rect.width &&
        pos.y >= rect.y &&
        pos.y <= rect.y + rect.height
      ) {
        return "move"
      }
      return null
    },
    []
  )

  const getCursor = useCallback((target: HandlePosition | "move" | null): string => {
    if (!target) return "crosshair"
    if (target === "move") return "move"
    const map: Record<HandlePosition, string> = {
      nw: "nw-resize",
      n: "n-resize",
      ne: "ne-resize",
      e: "e-resize",
      se: "se-resize",
      s: "s-resize",
      sw: "sw-resize",
      w: "w-resize",
    }
    return map[target]
  }, [])

  // Start interaction
  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!cropRect || !imageEl) return
      e.preventDefault()
      const pos = getPos(e)
      const target = getHandle(pos, cropRect)
      if (target) {
        setDragTarget(target === "move" ? { type: "move" } : { type: "resize", handle: target })
        setDragStart({ x: pos.x, y: pos.y, rect: { ...cropRect } })
      }
    },
    [cropRect, imageEl, getPos, getHandle]
  )

  // Move interaction
  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragStart || !dragTarget || !imageEl || !cropRect) return
      e.preventDefault()
      const pos = getPos(e)
      const dx = pos.x - dragStart.x
      const dy = pos.y - dragStart.y
      const r = dragStart.rect
      const ratio = getRatio()
      const dispW = imageEl.naturalWidth * displayScale
      const dispH = imageEl.naturalHeight * displayScale

      if (dragTarget.type === "move") {
        let newX = r.x + dx
        let newY = r.y + dy
        newX = clamp(newX, 0, dispW - r.width)
        newY = clamp(newY, 0, dispH - r.height)
        setCropRect({ x: newX, y: newY, width: r.width, height: r.height })
      } else if (dragTarget.type === "resize") {
        const h = dragTarget.handle
        let newX = r.x
        let newY = r.y
        let newW = r.width
        let newH = r.height

        if (h.includes("w")) {
          newW = r.width - dx
          newX = r.x + dx
        }
        if (h.includes("e")) {
          newW = r.width + dx
        }
        if (h.includes("n")) {
          newH = r.height - dy
          newY = r.y + dy
        }
        if (h.includes("s")) {
          newH = r.height + dy
        }

        // Enforce aspect ratio
        if (ratio) {
          const isCorner = h.length === 2
          if (isCorner) {
            // Use width as primary, adjust height
            if (newW / ratio < newH) {
              newH = newW / ratio
            } else {
              newW = newH * ratio
            }
            // Recalculate x/y for left/top handles
            if (h.includes("w")) {
              newX = r.x + r.width - newW
            }
            if (h.includes("n")) {
              newY = r.y + r.height - newH
            }
          } else if (h === "e" || h === "w") {
            newH = newW / ratio
            if (h.includes("n")) {
              newY = r.y + r.height - newH
            }
          } else {
            newW = newH * ratio
            if (h.includes("w")) {
              newX = r.x + r.width - newW
            }
          }
        }

        // Enforce minimum size
        const MIN = 20
        if (newW < MIN) {
          newW = MIN
          if (h.includes("w")) newX = r.x + r.width - MIN
        }
        if (newH < MIN) {
          newH = MIN
          if (h.includes("n")) newY = r.y + r.height - MIN
        }

        // Enforce bounds
        if (newX < 0) {
          if (h.includes("w")) {
            newW = newW + newX
            newX = 0
          } else {
            newX = 0
          }
        }
        if (newY < 0) {
          if (h.includes("n")) {
            newH = newH + newY
            newY = 0
          } else {
            newY = 0
          }
        }
        if (newX + newW > dispW) {
          newW = dispW - newX
        }
        if (newY + newH > dispH) {
          newH = dispH - newY
        }

        if (newW >= MIN && newH >= MIN) {
          setCropRect({ x: newX, y: newY, width: newW, height: newH })
        }
      }
    },
    [dragStart, dragTarget, imageEl, cropRect, getPos, getRatio, displayScale]
  )

  const handlePointerUp = useCallback(() => {
    setDragTarget(null)
    setDragStart(null)
  }, [])

  // Crop and download
  const handleCropDownload = useCallback(() => {
    if (!imageEl || !cropRect) return
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const srcX = cropRect.x / displayScale
    const srcY = cropRect.y / displayScale
    const srcW = cropRect.width / displayScale
    const srcH = cropRect.height / displayScale

    canvas.width = Math.round(srcW)
    canvas.height = Math.round(srcH)
    ctx.drawImage(imageEl, srcX, srcY, srcW, srcH, 0, 0, canvas.width, canvas.height)

    const mimeType = outputFormat === "jpg" ? "image/jpeg" : "image/png"
    const quality = outputFormat === "jpg" ? jpgQuality / 100 : undefined
    const ext = outputFormat === "jpg" ? "jpg" : "png"

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        const baseName = fileName?.replace(/\.[^.]+$/, "") || "cropped-image"
        a.download = `${baseName}-cropped.${ext}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      },
      mimeType,
      quality
    )
  }, [imageEl, cropRect, displayScale, outputFormat, jpgQuality, fileName])

  // Estimate file size
  const estimateFileSize = useCallback((): string => {
    if (!cropRect) return "—"
    const realW = Math.round(cropRect.width / displayScale)
    const realH = Math.round(cropRect.height / displayScale)
    const pixels = realW * realH
    if (outputFormat === "png") {
      const bytes = pixels * 3.5
      if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      return `${(bytes / 1024).toFixed(0)} KB`
    }
    const bytes = (pixels * 3 * (jpgQuality / 100)) / 3
    if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    return `${(bytes / 1024).toFixed(0)} KB`
  }, [cropRect, displayScale, outputFormat, jpgQuality])

  const handleReset = useCallback(() => {
    setCropRect(null)
    setImageUrl(null)
    setImageEl(null)
    setFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  // Upload area
  if (!imageUrl) {
    return (
      <Card>
        <CardContent className="p-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium mb-1">Drop your image here</p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse — JPG, PNG, WebP, BMP, GIF
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Choose Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  const realW = cropRect ? Math.round(cropRect.width / displayScale) : 0
  const realH = cropRect ? Math.round(cropRect.height / displayScale) : 0
  const ratioLocked = aspectRatio !== "free"

  return (
    <div className="space-y-4">
      {/* Controls bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Aspect Ratio */}
            <div className="flex items-center gap-2">
              {ratioLocked ? (
                <Lock className="h-4 w-4 text-primary" />
              ) : (
                <Unlock className="h-4 w-4 text-muted-foreground" />
              )}
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Ratio" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(ASPECT_RATIOS).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key === "free" ? "Free" : key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Format */}
            <div className="flex items-center gap-2">
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger className="w-[90px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* JPG Quality */}
            {outputFormat === "jpg" && (
              <div className="flex items-center gap-2 min-w-[180px]">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Quality: {jpgQuality}%
                </span>
                <Slider
                  value={[jpgQuality]}
                  onValueChange={(v) => setJpgQuality(v[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="w-[100px]"
                />
              </div>
            )}

            <div className="ml-auto flex items-center gap-2">
              {/* Crop info */}
              {cropRect && (
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">
                    {realW} × {realH} px
                  </Badge>
                  <span className="text-xs">~{estimateFileSize()}</span>
                </div>
              )}

              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Reset
              </Button>
              <Button size="sm" onClick={handleCropDownload} disabled={!cropRect}>
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Crop &amp; Download
              </Button>
            </div>
          </div>
          {/* Mobile crop info */}
          {cropRect && (
            <div className="flex sm:hidden items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Badge variant="secondary">
                {realW} × {realH} px
              </Badge>
              <span className="text-xs">~{estimateFileSize()}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Crop area */}
      <Card>
        <CardContent className="p-4">
          <div
            ref={containerRef}
            className="relative mx-auto overflow-hidden select-none"
            style={{
              maxWidth: imageEl ? imageEl.naturalWidth * displayScale : "100%",
              cursor: dragTarget
                ? getCursor(dragTarget.type === "move" ? "move" : dragTarget.handle)
                : "default",
            }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            {/* Image */}
            <img
              src={imageUrl}
              alt="Source image for cropping"
              className="block w-full h-auto"
              draggable={false}
            />

            {/* Dark overlay */}
            {cropRect && (
              <>
                {/* Top */}
                <div
                  className="absolute top-0 left-0 right-0 bg-black/50"
                  style={{ height: cropRect.y }}
                />
                {/* Bottom */}
                <div
                  className="absolute left-0 right-0 bg-black/50"
                  style={{
                    top: cropRect.y + cropRect.height,
                    height: `calc(100% - ${cropRect.y + cropRect.height}px)`,
                  }}
                />
                {/* Left */}
                <div
                  className="absolute top-0 bg-black/50"
                  style={{
                    left: 0,
                    width: cropRect.x,
                    top: cropRect.y,
                    height: cropRect.height,
                  }}
                />
                {/* Right */}
                <div
                  className="absolute top-0 bg-black/50"
                  style={{
                    left: cropRect.x + cropRect.width,
                    width: `calc(100% - ${cropRect.x + cropRect.width}px)`,
                    top: cropRect.y,
                    height: cropRect.height,
                  }}
                />

                {/* Crop border */}
                <div
                  className="absolute border-2 border-white pointer-events-none"
                  style={{
                    left: cropRect.x,
                    top: cropRect.y,
                    width: cropRect.width,
                    height: cropRect.height,
                  }}
                />

                {/* Rule of thirds grid */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: cropRect.x,
                    top: cropRect.y,
                    width: cropRect.width,
                    height: cropRect.height,
                  }}
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="border border-white/30" />
                    ))}
                  </div>
                </div>

                {/* Handles */}
                {(
                  [
                    ["nw", cropRect.x, cropRect.y],
                    ["n", cropRect.x + cropRect.width / 2, cropRect.y],
                    ["ne", cropRect.x + cropRect.width, cropRect.y],
                    ["e", cropRect.x + cropRect.width, cropRect.y + cropRect.height / 2],
                    ["se", cropRect.x + cropRect.width, cropRect.y + cropRect.height],
                    ["s", cropRect.x + cropRect.width / 2, cropRect.y + cropRect.height],
                    ["sw", cropRect.x, cropRect.y + cropRect.height],
                    ["w", cropRect.x, cropRect.y + cropRect.height / 2],
                  ] as const
                ).map(([pos, hx, hy]) => (
                  <div
                    key={pos}
                    className="absolute bg-white border border-gray-800 rounded-sm pointer-events-none"
                    style={{
                      left: hx - HANDLE_SIZE / 2,
                      top: hy - HANDLE_SIZE / 2,
                      width: HANDLE_SIZE,
                      height: HANDLE_SIZE,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}