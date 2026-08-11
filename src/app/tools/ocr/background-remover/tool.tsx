"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Upload,
  Download,
  Eraser,
  Loader2,
  RotateCcw,
  Image as ImageIcon,
  Pipette,
} from "lucide-react"

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/gif",
]

const CHECKERBOARD_BG =
  "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50% / 16px 16px"

function sampleBackgroundColor(
  img: HTMLImageElement
): [number, number, number] {
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext("2d")!
  ctx.drawImage(img, 0, 0)

  const corners: [number, number][] = [
    [0, 0],
    [img.width - 1, 0],
    [0, img.height - 1],
    [img.width - 1, img.height - 1],
  ]

  let totalR = 0
  let totalG = 0
  let totalB = 0
  for (const [cx, cy] of corners) {
    const pixel = ctx.getImageData(cx, cy, 1, 1).data
    totalR += pixel[0]
    totalG += pixel[1]
    totalB += pixel[2]
  }
  return [Math.round(totalR / 4), Math.round(totalG / 4), Math.round(totalB / 4)]
}

function removeBackground(
  imageData: ImageData,
  bgColor: [number, number, number],
  tolerance: number
): ImageData {
  const data = new Uint8ClampedArray(imageData.data)
  const maxDist = tolerance * 4.41 // sqrt(3) * 255/100, so tolerance 100 = max distance
  const featherRange = maxDist * 0.2 // 20% of max distance for feathering

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2]
    const diff = Math.sqrt(
      (r - bgColor[0]) ** 2 + (g - bgColor[1]) ** 2 + (b - bgColor[2]) ** 2
    )

    if (diff <= maxDist - featherRange) {
      // Fully transparent — well within tolerance
      data[i + 3] = 0
    } else if (diff <= maxDist) {
      // Feathering zone — smooth alpha transition
      const featherDiff = diff - (maxDist - featherRange)
      const alpha = Math.round((featherDiff / featherRange) * 255)
      data[i + 3] = Math.min(255, Math.max(0, alpha))
    }
    // else: keep original alpha (subject pixel)
  }

  return new ImageData(data, imageData.width, imageData.height)
}

export function BackgroundRemoverTool() {
  const [file, setFile] = useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = useState<string | null>(null)
  const [processedPreview, setProcessedPreview] = useState<string | null>(null)
  const [tolerance, setTolerance] = useState([40])
  const [bgColor, setBgColor] = useState<[number, number, number] | null>(null)
  const [isPickingColor, setIsPickingColor] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const originalCanvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((f: File) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return
    }
    setFile(f)
    setProcessedPreview(null)
    setBgColor(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setOriginalPreview(dataUrl)

      // Auto-detect background color from corners
      const img = new Image()
      img.onload = () => {
        const detected = sampleBackgroundColor(img)
        setBgColor(detected)
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(f)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) handleFile(droppedFile)
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isPickingColor || !originalCanvasRef.current) return
      const canvas = originalCanvasRef.current
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = Math.floor((e.clientX - rect.left) * scaleX)
      const y = Math.floor((e.clientY - rect.top) * scaleY)
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const pixel = ctx.getImageData(x, y, 1, 1).data
      setBgColor([pixel[0], pixel[1], pixel[2]])
      setIsPickingColor(false)
    },
    [isPickingColor]
  )

  // Draw original image to canvas for color picking
  useEffect(() => {
    if (!originalPreview || !originalCanvasRef.current) return
    const img = new Image()
    img.onload = () => {
      const canvas = originalCanvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
    }
    img.src = originalPreview
  }, [originalPreview])

  const handleRemoveBg = async () => {
    if (!originalPreview || !bgColor) return
    setIsProcessing(true)
    try {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const processed = removeBackground(imageData, bgColor, tolerance[0])
        ctx.putImageData(processed, 0, 0)
        setProcessedPreview(canvas.toDataURL("image/png"))
        setIsProcessing(false)
      }
      img.onerror = () => {
        setIsProcessing(false)
      }
      img.src = originalPreview
    } catch {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!processedPreview) return
    const a = document.createElement("a")
    a.href = processedPreview
    a.download = "background-removed.png"
    a.click()
  }

  const handleReset = () => {
    setFile(null)
    setOriginalPreview(null)
    setProcessedPreview(null)
    setTolerance([40])
    setBgColor(null)
    setIsPickingColor(false)
    setIsProcessing(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!originalPreview && (
        <Card>
          <CardContent className="p-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <Upload className="size-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">
                Drop your image here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports JPG, PNG, WebP, BMP, and GIF
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.bmp,.gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tool Interface */}
      {originalPreview && (
        <div className="space-y-6">
          {/* Controls */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium truncate max-w-48">
                    {file?.name}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="size-4 mr-1" />
                  Reset
                </Button>
              </div>

              {/* Background Color Picker */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Button
                    variant={isPickingColor ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsPickingColor(!isPickingColor)}
                    className="gap-2"
                  >
                    <Pipette className="size-4" />
                    {isPickingColor ? "Click image to sample..." : "Pick Color"}
                  </Button>
                  {bgColor && (
                    <div className="flex items-center gap-2">
                      <div
                        className="size-6 rounded border border-border"
                        style={{
                          backgroundColor: `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`,
                        }}
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        RGB({bgColor[0]}, {bgColor[1]}, {bgColor[2]})
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Auto-detected
                      </Badge>
                    </div>
                  )}
                </div>
                {isPickingColor && (
                  <p className="text-xs text-muted-foreground">
                    <Pipette className="size-3 inline mr-1" />
                    Click anywhere on the original image to sample the background
                    color
                  </p>
                )}
              </div>

              {/* Tolerance Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Tolerance</label>
                  <span className="text-sm font-mono text-muted-foreground">
                    {tolerance[0]}
                  </span>
                </div>
                <Slider
                  value={tolerance}
                  onValueChange={setTolerance}
                  min={0}
                  max={100}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Low values remove only exact matches. High values remove a
                  wider color range.
                </p>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleRemoveBg}
                disabled={isProcessing || !bgColor}
                className="w-full gap-2"
              >
                {isProcessing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Eraser className="size-4" />
                )}
                {isProcessing ? "Processing..." : "Remove Background"}
              </Button>

              {/* Note about limitations */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30 p-3">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> For complex backgrounds (gradients,
                  patterns, or detailed scenes), consider using a dedicated AI
                  background remover. This tool works best with solid or uniform
                  backgrounds.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Side by Side Preview */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Original Image */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Original</h3>
                  {isPickingColor && (
                    <Badge variant="outline" className="text-xs">
                      <Pipette className="size-3 mr-1" />
                      Picking
                    </Badge>
                  )}
                </div>
                <div
                  className={`rounded-lg border border-border overflow-hidden bg-muted/30 relative ${isPickingColor ? "cursor-crosshair" : ""}`}
                >
                  <canvas
                    ref={originalCanvasRef}
                    onClick={handleCanvasClick}
                    className="w-full h-auto max-h-80 object-contain"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Processed Image */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Result</h3>
                  {processedPreview && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="gap-1 text-xs"
                    >
                      <Download className="size-3" />
                      Download PNG
                    </Button>
                  )}
                </div>
                <div
                  className="rounded-lg border border-border overflow-hidden"
                  style={{
                    backgroundImage: processedPreview
                      ? CHECKERBOARD_BG
                      : "none",
                    backgroundColor: processedPreview ? "" : "hsl(var(--muted) / 0.3)",
                  }}
                >
                  {processedPreview ? (
                    <img
                      src={processedPreview}
                      alt="Processed image with transparent background"
                      className="w-full h-auto max-h-80 object-contain"
                    />
                  ) : isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <Loader2 className="size-8 animate-spin mb-2" />
                      <p className="text-sm">Removing background...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                      <Eraser className="size-8 mb-2 opacity-40" />
                      <p className="text-sm">
                        Click &quot;Remove Background&quot; to see the result
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
