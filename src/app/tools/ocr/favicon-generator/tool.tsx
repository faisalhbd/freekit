"use client"

import { useState, useRef, useCallback } from "react"
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
import {
  Upload,
  Download,
  Globe,
  Loader2,
  RotateCcw,
  ImageIcon,
  Package,
} from "lucide-react"

const FAVICON_SIZES = [16, 32, 48, 64, 128, 256] as const

type BgMode = "transparent" | "color"
type ShapeMode = "square" | "rounded" | "circle"

interface GeneratedFavicon {
  size: number
  blob: Blob
  url: string
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number
) {
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.closePath()
}

async function generateFavicon(
  img: HTMLImageElement,
  size: number,
  bgMode: BgMode,
  bgColor: string,
  paddingPct: number,
  shape: ShapeMode
): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  // Draw shape clip
  const pad = (size * paddingPct) / 100
  const drawArea = size - pad * 2

  if (shape === "rounded" || shape === "circle") {
    if (shape === "rounded") {
      const radius = size * 0.2
      drawRoundedRect(ctx, 0, 0, size, size, radius)
    } else {
      drawCircle(ctx, size / 2, size / 2, size / 2)
    }
    ctx.clip()
  }

  // Background
  if (bgMode === "color") {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, size, size)
  }
  // transparent: do nothing (canvas is already transparent)

  // Draw image centered with padding, maintaining aspect ratio
  const imgAspect = img.naturalWidth / img.naturalHeight
  let dw: number
  let dh: number
  if (imgAspect >= 1) {
    dw = drawArea
    dh = drawArea / imgAspect
  } else {
    dh = drawArea
    dw = drawArea * imgAspect
  }
  const dx = pad + (drawArea - dw) / 2
  const dy = pad + (drawArea - dh) / 2

  ctx.drawImage(img, dx, dy, dw, dh)

  // Return as PNG blob
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), "image/png")
  })
}

export function FaviconGeneratorTool() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [bgMode, setBgMode] = useState<BgMode>("transparent")
  const [bgColor, setBgColor] = useState<string>("#ffffff")
  const [padding, setPadding] = useState<string>("10")
  const [shape, setShape] = useState<ShapeMode>("square")
  const [generated, setGenerated] = useState<GeneratedFavicon[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    setFileName(file.name || "image")
    setImageUrl(url)
    setGenerated([])

    const img = new Image()
    img.onload = () => {
      setImageEl(img)
    }
    img.src = url
  }, [])

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

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) loadImage(file)
    },
    [loadImage]
  )

  const handleGenerate = useCallback(async () => {
    if (!imageEl) return
    setIsGenerating(true)
    setGenerated([])

    const paddingPct = parseInt(padding, 10)
    const results: GeneratedFavicon[] = []

    // Slight delay so UI can show loading state
    await new Promise((r) => setTimeout(r, 50))

    for (const size of FAVICON_SIZES) {
      const blob = await generateFavicon(
        imageEl,
        size,
        bgMode,
        bgColor,
        paddingPct,
        shape
      )
      const url = URL.createObjectURL(blob)
      results.push({ size, blob, url })
    }

    setGenerated(results)
    setIsGenerating(false)
  }, [imageEl, bgMode, bgColor, padding, shape])

  const handleDownloadSingle = useCallback((fav: GeneratedFavicon) => {
    const a = document.createElement("a")
    a.href = fav.url
    a.download = `favicon-${fav.size}x${fav.size}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [])

  const handleDownloadZip = useCallback(async () => {
    if (generated.length === 0) return
    const JSZip = (await import("jszip")).default
    const zip = new JSZip()
    for (const fav of generated) {
      zip.file(`favicon-${fav.size}x${fav.size}.png`, fav.blob)
    }
    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement("a")
    a.href = url
    a.download = "favicons.zip"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [generated])

  const handleReset = useCallback(() => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    for (const g of generated) {
      URL.revokeObjectURL(g.url)
    }
    setImageUrl(null)
    setImageEl(null)
    setFileName("")
    setGenerated([])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [imageUrl, generated])

  // Upload area
  if (!imageUrl || !imageEl) {
    return (
      <Card>
        <CardContent className="p-8">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Globe className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-lg font-medium mb-1">
              Drop your image here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse — upload a logo or icon (512×512 recommended)
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

  return (
    <div className="space-y-4">
      {/* Settings bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Original preview (small) */}
            <div className="hidden sm:flex items-center gap-2">
              <img
                src={imageUrl}
                alt="Source image preview"
                className="h-9 w-9 rounded border border-border object-contain"
              />
              <span className="text-xs text-muted-foreground max-w-[120px] truncate">
                {fileName}
              </span>
            </div>

            {/* Background */}
            <div className="flex items-center gap-2">
              <Select
                value={bgMode}
                onValueChange={(v) => setBgMode(v as BgMode)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transparent">Transparent</SelectItem>
                  <SelectItem value="color">Custom Color</SelectItem>
                </SelectContent>
              </Select>
              {bgMode === "color" && (
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-9 w-9 cursor-pointer rounded border border-border"
                />
              )}
            </div>

            {/* Padding */}
            <Select value={padding} onValueChange={setPadding}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Padding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% padding</SelectItem>
                <SelectItem value="5">5% padding</SelectItem>
                <SelectItem value="10">10% padding</SelectItem>
                <SelectItem value="15">15% padding</SelectItem>
                <SelectItem value="20">20% padding</SelectItem>
              </SelectContent>
            </Select>

            {/* Shape */}
            <Select value={shape} onValueChange={(v) => setShape(v as ShapeMode)}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Reset
              </Button>
              <Button size="sm" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Globe className="mr-1.5 h-3.5 w-3.5" />
                )}
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated favicons grid */}
      {generated.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Generated Favicons</h3>
              <Button variant="outline" size="sm" onClick={handleDownloadZip}>
                <Package className="mr-1.5 h-3.5 w-3.5" />
                Download All as ZIP
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {generated.map((fav) => (
                <div
                  key={fav.size}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3"
                >
                  <div
                    className="flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')]"
                    style={{
                      width: Math.min(fav.size * 2, 80),
                      height: Math.min(fav.size * 2, 80),
                    }}
                  >
                    <img
                      src={fav.url}
                      alt={`Favicon ${fav.size}x${fav.size} preview`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {fav.size}×{fav.size}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleDownloadSingle(fav)}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    {fav.size}px
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              <strong>Note:</strong> All favicons are downloaded as PNG files.
              Modern browsers (Chrome, Firefox, Safari, Edge) fully support PNG
              favicons. For legacy ICO support, use an online converter on the
              48×48 or 64×64 PNG.
            </p>
          </CardContent>
        </Card>
      )}

      {/* No results yet */}
      {generated.length === 0 && !isGenerating && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <Upload className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">
              Adjust settings above and click <strong>Generate</strong> to create
              favicons in all required sizes.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {isGenerating && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <Loader2 className="mx-auto h-8 w-8 mb-2 animate-spin" />
            <p className="text-sm">Generating favicons…</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}