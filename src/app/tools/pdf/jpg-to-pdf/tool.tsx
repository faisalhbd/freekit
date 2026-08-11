"use client"

import { useState, useRef, useCallback, type DragEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  ImagePlus,
  FileText,
  Loader2,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Trash2,
  Settings,
} from "lucide-react"

interface ImageEntry {
  id: string
  file: File
  name: string
  size: number
  width: number
  height: number
  thumbnail: string
  type: "jpg" | "png" | "webp"
}

type PageSize = "a4" | "letter" | "legal" | "fit"
type Orientation = "portrait" | "landscape"
type MarginSize = "none" | "small" | "medium" | "large"
type ImageFit = "fit" | "stretch" | "center"

const PAGE_SIZES: Record<string, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
  legal: [612, 1008],
}

const MARGINS: Record<MarginSize, number> = {
  none: 0,
  small: 18,
  medium: 36,
  large: 72,
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function getImageType(file: File): "jpg" | "png" | "webp" {
  const name = file.name.toLowerCase()
  if (name.endsWith(".png")) return "png"
  if (name.endsWith(".webp")) return "webp"
  return "jpg"
}

function loadImageDimensions(file: File): Promise<{ width: number; height: number; thumbnail: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      // Create thumbnail
      const canvas = document.createElement("canvas")
      const maxThumbSize = 80
      const scale = Math.min(maxThumbSize / img.width, maxThumbSize / img.height, 1)
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      const thumbnail = canvas.toDataURL("image/jpeg", 0.7)
      URL.revokeObjectURL(url)
      resolve({ width: img.width, height: img.height, thumbnail })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load image"))
    }
    img.src = url
  })
}

function webpToPngBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error("Failed to get canvas context"))
        return
      }
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          if (blob) resolve(blob)
          else reject(new Error("Failed to convert WebP to PNG"))
        },
        "image/png"
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load WebP image"))
    }
    img.src = url
  })
}

export function JpgToPdfTool() {
  const [images, setImages] = useState<ImageEntry[]>([])
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfFileName, setPdfFileName] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Settings
  const [pageSize, setPageSize] = useState<PageSize>("a4")
  const [orientation, setOrientation] = useState<Orientation>("portrait")
  const [margin, setMargin] = useState<MarginSize>("small")
  const [imageFit, setImageFit] = useState<ImageFit>("fit")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ]

  const processFiles = useCallback(async (fileList: FileList | File[]) => {
    const imageFiles = Array.from(fileList).filter(
      (f) =>
        ACCEPTED_TYPES.includes(f.type) ||
        f.name.toLowerCase().endsWith(".jpg") ||
        f.name.toLowerCase().endsWith(".jpeg") ||
        f.name.toLowerCase().endsWith(".png") ||
        f.name.toLowerCase().endsWith(".webp")
    )

    const newEntries: ImageEntry[] = []

    for (const file of imageFiles) {
      try {
        const { width, height, thumbnail } = await loadImageDimensions(file)
        newEntries.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          size: file.size,
          width,
          height,
          thumbnail,
          type: getImageType(file),
        })
      } catch {
        // Skip files that cannot be loaded
      }
    }

    if (newEntries.length > 0) {
      setImages((prev) => [...prev, ...newEntries])
      setPdfUrl(null)
    }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles]
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files)
        e.target.value = ""
      }
    },
    [processFiles]
  )

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((f) => f.id !== id))
    setPdfUrl(null)
  }, [])

  const moveImage = useCallback((index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const next = [...prev]
      const newIndex = direction === "up" ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= next.length) return prev
      ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
      return next
    })
    setPdfUrl(null)
  }, [])

  const clearAll = useCallback(() => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }
    setImages([])
    setPdfUrl(null)
    setPdfFileName("")
    setProgress(0)
  }, [pdfUrl])

  const convertToPdf = useCallback(async () => {
    if (images.length === 0 || converting) return

    setConverting(true)
    setProgress(0)
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
      setPdfUrl(null)
    }

    try {
      const { PDFDocument } = await import("pdf-lib")
      const pdfDoc = await PDFDocument.create()
      const marginValue = MARGINS[margin]

      for (let i = 0; i < images.length; i++) {
        const entry = images[i]

        let embedFn: "embedJpg" | "embedPng"
        let imageBytes: ArrayBuffer | Uint8Array

        if (entry.type === "webp") {
          // Convert WebP to PNG first
          const pngBlob = await webpToPngBlob(entry.file)
          imageBytes = new Uint8Array(await pngBlob.arrayBuffer())
          embedFn = "embedPng"
        } else if (entry.type === "png") {
          imageBytes = await entry.file.arrayBuffer()
          embedFn = "embedPng"
        } else {
          imageBytes = await entry.file.arrayBuffer()
          embedFn = "embedJpg"
        }

        const embeddedImage = await pdfDoc[embedFn](imageBytes)
        const imgWidth = embeddedImage.width
        const imgHeight = embeddedImage.height

        let pageW: number
        let pageH: number

        if (pageSize === "fit") {
          // Fit page to image dimensions (convert px to PDF points at 72 DPI)
          pageW = imgWidth
          pageH = imgHeight
        } else {
          const [baseW, baseH] = PAGE_SIZES[pageSize]
          if (orientation === "landscape") {
            pageW = baseH
            pageH = baseW
          } else {
            pageW = baseW
            pageH = baseH
          }
        }

        const page = pdfDoc.addPage([pageW, pageH])

        // Calculate available area after margins
        const availW = pageW - marginValue * 2
        const availH = pageH - marginValue * 2

        if (imageFit === "stretch") {
          // Stretch to fill the available area
          page.drawImage(embeddedImage, {
            x: marginValue,
            y: marginValue,
            width: availW,
            height: availH,
          })
        } else if (imageFit === "center") {
          // Center at original size (scale down if larger than page)
          const scaleX = availW / imgWidth
          const scaleY = availH / imgHeight
          const scale = Math.min(scaleX, scaleY, 1)
          const drawW = imgWidth * scale
          const drawH = imgHeight * scale
          const offsetX = marginValue + (availW - drawW) / 2
          const offsetY = marginValue + (availH - drawH) / 2
          page.drawImage(embeddedImage, {
            x: offsetX,
            y: offsetY,
            width: drawW,
            height: drawH,
          })
        } else {
          // Fit to page: scale to fill while maintaining aspect ratio
          const scaleX = availW / imgWidth
          const scaleY = availH / imgHeight
          const scale = Math.min(scaleX, scaleY)
          const drawW = imgWidth * scale
          const drawH = imgHeight * scale
          const offsetX = marginValue + (availW - drawW) / 2
          const offsetY = marginValue + (availH - drawH) / 2
          page.drawImage(embeddedImage, {
            x: offsetX,
            y: offsetY,
            width: drawW,
            height: drawH,
          })
        }

        setProgress(Math.round(((i + 1) / images.length) * 100))
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      setPdfUrl(url)
      setPdfFileName("converted-images.pdf")
    } catch {
      // Error handled silently — user can retry
    } finally {
      setConverting(false)
    }
  }, [images, converting, pdfUrl, pageSize, orientation, margin, imageFit])

  const downloadPdf = useCallback(() => {
    if (!pdfUrl) return
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = pdfFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [pdfUrl, pdfFileName])

  const totalSize = images.reduce((sum, img) => sum + img.size, 0)

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card className="p-0 overflow-hidden">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={
            `relative flex flex-col items-center justify-center gap-3 p-8 sm:p-12 cursor-pointer transition-colors border-2 border-dashed rounded-xl m-0 `
          }
          style={{
            borderColor: isDragOver ? "hsl(var(--primary))" : "hsl(var(--border))",
            backgroundColor: isDragOver ? "hsl(var(--primary) / 0.05)" : "transparent",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">
              {isDragOver ? "Drop your images here" : "Drag & drop images here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse from your device
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            JPG, PNG, WebP supported
          </Badge>
        </div>
      </Card>

      {/* Image List + Settings */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground">
                Images ({images.length})
              </h3>
              <span className="text-sm text-muted-foreground">
                {formatFileSize(totalSize)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="gap-1.5"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Settings Panel */}
          {settingsOpen && (
            <Card className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Page Size</label>
                  <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageSize)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="fit">Fit to Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Orientation</label>
                  <Select
                    value={orientation}
                    onValueChange={(v) => setOrientation(v as Orientation)}
                    disabled={pageSize === "fit"}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Margin</label>
                  <Select value={margin} onValueChange={(v) => setMargin(v as MarginSize)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Image Fit</label>
                  <Select value={imageFit} onValueChange={(v) => setImageFit(v as ImageFit)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fit">Fit to Page</SelectItem>
                      <SelectItem value="stretch">Stretch to Fill</SelectItem>
                      <SelectItem value="center">Center with Original Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}

          {/* Image List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all hover:border-primary/50"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                  <img
                    src={img.thumbnail}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {img.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {img.width} × {img.height} px · {formatFileSize(img.size)} · {img.type.toUpperCase()}
                  </p>
                </div>

                {/* Reorder Buttons */}
                <div className="flex items-center gap-0.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation()
                      moveImage(index, "up")
                    }}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === images.length - 1}
                    onClick={(e) => {
                      e.stopPropagation()
                      moveImage(index, "down")
                    }}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(img.id)
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {converting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Converting images to PDF…
            </span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Convert Button */}
      {images.length > 0 && !converting && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={convertToPdf}
            size="lg"
            className="flex-1 gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            Convert {images.length} {images.length === 1 ? "Image" : "Images"} to PDF
          </Button>
        </div>
      )}

      {/* Download Result */}
      {pdfUrl && !converting && (
        <Card className="p-4 border-primary/30 bg-primary/5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 shrink-0">
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-foreground">Conversion Complete!</p>
              <p className="text-sm text-muted-foreground">
                {images.length} {images.length === 1 ? "image" : "images"} converted to {pdfFileName}
              </p>
            </div>
            <Button onClick={downloadPdf} className="gap-2 shrink-0">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </Card>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--border));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  )
}
