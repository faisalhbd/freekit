"use client"

import { useState, useRef, useCallback, useEffect, type DragEvent } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Download,
  Camera,
  FileText,
  Loader2,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Trash2,
  ImagePlus,
} from "lucide-react"

interface ImageEntry {
  id: string
  name: string
  size: number
  width: number
  height: number
  thumbnail: string
  type: "jpg" | "png" | "webp"
  blob: Blob
}

type PageSize = "a4" | "letter" | "fit"
type Orientation = "portrait" | "landscape"

const PAGE_SIZES: Record<string, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function detectImageType(blob: Blob): "jpg" | "png" | "webp" {
  if (blob.type === "image/png") return "png"
  if (blob.type === "image/webp") return "webp"
  return "jpg"
}

function getImageType(file: File): "jpg" | "png" | "webp" {
  const name = file.name.toLowerCase()
  if (name.endsWith(".png")) return "png"
  if (name.endsWith(".webp")) return "webp"
  return "jpg"
}

function loadImageInfo(file: File): Promise<{ width: number; height: number; thumbnail: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
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

function webpToPngBlob(file: Blob): Promise<Blob> {
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

export function ScanToPdfTool() {
  const [images, setImages] = useState<ImageEntry[]>([])
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [pdfFileName, setPdfFileName] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [activeTab, setActiveTab] = useState("camera")

  // Settings
  const [pageSize, setPageSize] = useState<PageSize>("a4")
  const [orientation, setOrientation] = useState<Orientation>("portrait")

  // Camera state
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const captureCountRef = useRef(0)

  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ]

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      })
      setCameraStream(stream)
      setCameraActive(true)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      if (message.includes("NotAllowed") || message.includes("Permission")) {
        setCameraError("Camera access was denied. Please allow camera permissions in your browser settings and try again.")
      } else if (message.includes("NotFound") || message.includes("DevicesNotFound")) {
        setCameraError("No camera was found on your device. Please use the Upload tab to add existing scanned images.")
      } else {
        setCameraError("Unable to access the camera. Please make sure your browser supports camera access, or switch to the Upload tab.")
      }
    }
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
    setCameraActive(false)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [cameraStream])

  // Start/stop camera on tab change
  useEffect(() => {
    if (activeTab === "camera" && !cameraActive && !cameraError) {
      startCamera()
    } else if (activeTab !== "camera" && cameraActive) {
      stopCamera()
    }
  }, [activeTab, cameraActive, cameraError, startCamera, stopCamera])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraStream])

  // Capture frame from video
  const captureFrame = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        captureCountRef.current += 1
        const type = detectImageType(blob)

        // Create thumbnail
        const thumbCanvas = document.createElement("canvas")
        const maxThumbSize = 80
        const scale = Math.min(maxThumbSize / canvas.width, maxThumbSize / canvas.height, 1)
        thumbCanvas.width = canvas.width * scale
        thumbCanvas.height = canvas.height * scale
        const thumbCtx = thumbCanvas.getContext("2d")
        const thumbnail = thumbCtx
          ? thumbCtx.canvas.toDataURL("image/jpeg", 0.7)
          : ""

        const entry: ImageEntry = {
          id: crypto.randomUUID(),
          name: `scan-${captureCountRef.current}.jpg`,
          size: blob.size,
          width: canvas.width,
          height: canvas.height,
          thumbnail,
          type,
          blob,
        }

        setImages((prev) => [...prev, entry])
        setPdfUrl(null)
      },
      "image/jpeg",
      0.92
    )
  }, [])

  // Process uploaded files
  const processFiles = useCallback(async (fileList: FileList | File[]) => {
    const imageFiles = Array.from(fileList).filter(
      (f) =>
        ACCEPTED_TYPES.includes(f.type) ||
        f.name.toLowerCase().endsWith(".jpg") ||
        f.name.toLowerCase().endsWith(".jpeg") ||
        f.name.toLowerCase().endsWith(".png") ||
        f.name.toLowerCase().endsWith(".webp")
    )

    for (const file of imageFiles) {
      try {
        const { width, height, thumbnail } = await loadImageInfo(file)
        const entry: ImageEntry = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          width,
          height,
          thumbnail,
          type: getImageType(file),
          blob: file,
        }
        setImages((prev) => [...prev, entry])
        setPdfUrl(null)
      } catch {
        // Skip files that cannot be loaded
      }
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
    captureCountRef.current = 0
  }, [pdfUrl])

  const generatePdf = useCallback(async () => {
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

      for (let i = 0; i < images.length; i++) {
        const entry = images[i]

        let imageBytes: Uint8Array
        let embedFn: "embedJpg" | "embedPng"

        if (entry.type === "webp") {
          const pngBlob = await webpToPngBlob(entry.blob)
          imageBytes = new Uint8Array(await pngBlob.arrayBuffer())
          embedFn = "embedPng"
        } else if (entry.type === "png") {
          imageBytes = new Uint8Array(await entry.blob.arrayBuffer())
          embedFn = "embedPng"
        } else {
          imageBytes = new Uint8Array(await entry.blob.arrayBuffer())
          embedFn = "embedJpg"
        }

        const embeddedImage = await pdfDoc[embedFn](imageBytes)
        const imgWidth = embeddedImage.width
        const imgHeight = embeddedImage.height

        let pageW: number
        let pageH: number

        if (pageSize === "fit") {
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

        // Fit image to page while maintaining aspect ratio
        const scaleX = pageW / imgWidth
        const scaleY = pageH / imgHeight
        const scale = Math.min(scaleX, scaleY)
        const drawW = imgWidth * scale
        const drawH = imgHeight * scale
        const offsetX = (pageW - drawW) / 2
        const offsetY = (pageH - drawH) / 2

        page.drawImage(embeddedImage, {
          x: offsetX,
          y: offsetY,
          width: drawW,
          height: drawH,
        })

        setProgress(Math.round(((i + 1) / images.length) * 100))
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      setPdfUrl(url)
      setPdfFileName("scanned-document.pdf")
    } catch {
      // Error handled silently — user can retry
    } finally {
      setConverting(false)
    }
  }, [images, converting, pdfUrl, pageSize, orientation])

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
      {/* Hidden canvas for capture + file input */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Tabs: Camera / Upload */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="camera" className="gap-2">
            <Camera className="w-4 h-4" />
            Camera
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Images
          </TabsTrigger>
        </TabsList>

        {/* Camera Tab */}
        <TabsContent value="camera" className="mt-4">
          <Card className="p-0 overflow-hidden">
            {cameraError ? (
              <div className="flex flex-col items-center justify-center gap-3 p-8 sm:p-12 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10">
                  <Camera className="w-6 h-6 text-destructive" />
                </div>
                <p className="font-medium text-foreground">Camera Not Available</p>
                <p className="text-sm text-muted-foreground max-w-md">{cameraError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCameraError(null)
                    startCamera()
                  }}
                  className="mt-2"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Retry
                </Button>
              </div>
            ) : (
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Button
                    size="lg"
                    onClick={captureFrame}
                    disabled={!cameraActive}
                    className="gap-2 rounded-full px-8 shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                    Capture
                  </Button>
                </div>
              </div>
            )}
          </Card>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Point your camera at a document and tap Capture. Each capture adds a new page.
          </p>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="mt-4">
          <Card className="p-0 overflow-hidden">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={
                "relative flex flex-col items-center justify-center gap-3 p-8 sm:p-12 cursor-pointer transition-colors border-2 border-dashed rounded-xl m-0 "
              }
              style={{
                borderColor: isDragOver ? "hsl(var(--primary))" : "hsl(var(--border))",
                backgroundColor: isDragOver ? "hsl(var(--primary) / 0.05)" : "transparent",
              }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">
                  {isDragOver ? "Drop your scanned images here" : "Drag & drop scanned images here"}
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
        </TabsContent>
      </Tabs>

      {/* Image List + Settings */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-foreground">
                Scanned Pages ({images.length})
              </h3>
              <span className="text-sm text-muted-foreground">
                {formatFileSize(totalSize)}
              </span>
            </div>
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

          {/* Settings */}
          <Card className="p-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Page Size</label>
                <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageSize)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
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

              <div className="flex items-end">
                <Button
                  onClick={generatePdf}
                  size="lg"
                  disabled={converting}
                  className="w-full gap-2"
                >
                  {converting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  {converting ? "Generating..." : "Generate PDF"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Image List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card transition-all hover:border-primary/50"
              >
                {/* Page Number + Thumbnail */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={img.thumbnail}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Info */}
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
                    onClick={() => moveImage(index, "up")}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={index === images.length - 1}
                    onClick={() => moveImage(index, "down")}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => removeImage(img.id)}
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
              Generating PDF from {images.length} {images.length === 1 ? "page" : "pages"}…
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

      {/* Empty state prompt */}
      {images.length === 0 && !converting && (
        <div className="text-center py-6">
          <ImagePlus className="w-10 h-10 mx-auto text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Capture images with your camera or upload scanned photos to get started.
          </p>
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
              <p className="font-semibold text-foreground">PDF Generated Successfully!</p>
              <p className="text-sm text-muted-foreground">
                {images.length} {images.length === 1 ? "page" : "pages"} combined into {pdfFileName}
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
